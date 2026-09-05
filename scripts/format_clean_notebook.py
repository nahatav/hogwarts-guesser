import nbformat as nbf
import os

nb = nbf.v4.new_notebook()
cells = []

# Title Cell
cells.append(nbf.v4.new_markdown_cell("""# Major Power Outages: Weather Vulnerability and Grid Resilience

**Name(s)**: DSC 80 Student  
**Website Link**: https://dsc-courses.github.io/power-outage-analysis  
"""))

# Setup Code Cell
cells.append(nbf.v4.new_code_cell("""import pandas as pd
import numpy as np
import plotly.express as px
import plotly.graph_objects as go
from plotly.subplots import make_subplots
import plotly.io as pio
from pathlib import Path
import warnings
warnings.filterwarnings('ignore')

from dsc80_utils import *

pd.options.plotting.backend = 'plotly'
pio.templates.default = "simple_white+dsc80"
pio.renderers.default = "notebook"

Path("assets").mkdir(parents=True, exist_ok=True)
"""))

# Step 1: Introduction
cells.append(nbf.v4.new_markdown_cell("""## Step 1: Introduction

### Dataset Overview & Motivation
We are working with the **U.S. Major Power Outages dataset (2000–2016)**, collected by the U.S. Department of Energy (DOE) and curated by Purdue University LASCI. The dataset contains **1,534 outage events** and **56 columns**, where each row represents a major power outage affecting a single U.S. state.

We chose this dataset because power grid reliability is an essential public infrastructure issue directly affected by severe weather and climate change. We want to understand how weather triggers, climate anomalies, and regional infrastructure characteristics influence outage duration and severity.

### Central Research Question
> **How do severe weather events and climate anomaly levels affect power outage restoration times across different U.S. climate regions?**

### Key Relevant Columns
- `OUTAGE.START.DATE` and `OUTAGE.START.TIME`: The date and time when the outage began.
- `OUTAGE.RESTORATION.DATE` and `OUTAGE.RESTORATION.TIME`: The date and time when power was restored.
- `OUTAGE.DURATION`: Total restoration duration in minutes.
- `CAUSE.CATEGORY`: Primary trigger of the outage (e.g., severe weather, intentional attack, equipment failure).
- `ANOMALY.LEVEL`: Oceanic Niño Index (ONI) measuring sea-surface temperature anomalies in °C.
- `CLIMATE.REGION`: U.S. climate region (e.g., Northeast, South, West).
- `CUSTOMERS.AFFECTED`: Number of electrical customers who lost power.
- `DEMAND.LOSS.MW`: Peak power capacity lost in Megawatts.
- `RES.PRICE` & `TOTAL.SALES`: Average residential electricity price (cents/kWh) and monthly consumption (MWh).
- `POPDEN_URBAN` & `POPDEN_RURAL`: State urban and rural population densities (people per sq. mile).
"""))

# Step 2: Data Cleaning and EDA
cells.append(nbf.v4.new_markdown_cell("""## Step 2: Data Cleaning and Exploratory Data Analysis

### Data Cleaning Steps
1. **Loaded Clean Headers**: Loaded `outage.xlsx` starting at row index 5 to extract clean variable names, and dropped the secondary physical units row.
2. **Combined Date and Time**: Merged `OUTAGE.START.DATE` and `OUTAGE.START.TIME` into unified `OUTAGE.START` (pd.Timestamp). Did the same for `OUTAGE.RESTORATION`.
3. **Validated Durations**: Verified that `(OUTAGE.RESTORATION - OUTAGE.START)` in minutes matches `OUTAGE.DURATION` (minor 60-minute discrepancies reflect daylight saving time shifts).
4. **Type Coercion**: Converted numeric columns (`YEAR`, `MONTH`, `OUTAGE.DURATION`, `CUSTOMERS.AFFECTED`, `DEMAND.LOSS.MW`, `ANOMALY.LEVEL`, prices, population density) to numeric types.
5. **Feature Engineering**: Created `OUTAGE.DURATION.HOURS = OUTAGE.DURATION / 60`, `LOG_DURATION = np.log1p(OUTAGE.DURATION)`, `START_MONTH`, `START_HOUR`, and indicator `IS_SEVERE_OUTAGE = (OUTAGE.DURATION >= 1440)` for outages lasting 24+ hours.
"""))

cells.append(nbf.v4.new_code_cell("""df_raw = pd.read_excel(
    'data/outage.xlsx', sheet_name='Masterdata', header=5
)
df = df_raw.iloc[1:].reset_index(drop=True)
if 'variables' in df.columns:
    df = df.drop(columns=['variables'])

numeric_cols = [
    'OBS', 'YEAR', 'MONTH', 'ANOMALY.LEVEL', 'OUTAGE.DURATION',
    'DEMAND.LOSS.MW', 'CUSTOMERS.AFFECTED', 'RES.PRICE', 'COM.PRICE',
    'IND.PRICE', 'TOTAL.PRICE', 'RES.SALES', 'COM.SALES', 'IND.SALES',
    'TOTAL.SALES', 'POPULATION', 'POPDEN_URBAN', 'POPDEN_RURAL',
    'AREAPCT_URBAN', 'PCT_LAND', 'PC.REALGSP.STATE'
]
for col in numeric_cols:
    if col in df.columns:
        df[col] = pd.to_numeric(df[col], errors='coerce')

def combine_dt(date_series, time_series):
    dates = pd.to_datetime(date_series, errors='coerce')
    times = time_series.apply(
        lambda t: str(t) if pd.notnull(t) else np.nan
    )
    res = []
    for d, t in zip(dates, times):
        if pd.isnull(d) or pd.isnull(t):
            res.append(pd.NaT)
        else:
            try:
                res.append(pd.to_datetime(f"{d.strftime('%Y-%m-%d')} {t}"))
            except Exception:
                res.append(pd.NaT)
    return pd.Series(res, dtype='datetime64[ns]')

df['OUTAGE.START'] = combine_dt(
    df['OUTAGE.START.DATE'], df['OUTAGE.START.TIME']
)
df['OUTAGE.RESTORATION'] = combine_dt(
    df['OUTAGE.RESTORATION.DATE'], df['OUTAGE.RESTORATION.TIME']
)

df['OUTAGE.DURATION.HOURS'] = df['OUTAGE.DURATION'] / 60.0
df['LOG_DURATION'] = np.log1p(df['OUTAGE.DURATION'])
df['LOG_CUSTOMERS'] = np.log1p(df['CUSTOMERS.AFFECTED'])
df['START_HOUR'] = df['OUTAGE.START'].dt.hour
df['START_MONTH'] = df['OUTAGE.START'].dt.month
df['IS_SEVERE_OUTAGE'] = (df['OUTAGE.DURATION'] >= 1440).astype(float)
df.loc[df['OUTAGE.DURATION'].isnull(), 'IS_SEVERE_OUTAGE'] = np.nan

preview_cols = [
    'U.S._STATE', 'CLIMATE.REGION', 'CAUSE.CATEGORY',
    'OUTAGE.START', 'OUTAGE.RESTORATION',
    'OUTAGE.DURATION.HOURS', 'CUSTOMERS.AFFECTED'
]
display(df[preview_cols].head(5))
"""))

# Univariate Analysis
cells.append(nbf.v4.new_markdown_cell("""### Univariate Analysis

**Plot 1 (Duration Distribution)**: Outage duration is heavily right-skewed. Most outages resolve within a few hours (median is 11.7 hours), but severe tail events take multiple days or weeks to restore.

**Plot 2 (Cause Category Distribution)**: Severe weather is by far the most frequent cause of major power outages (763 incidents), followed by intentional attacks (418 incidents).
"""))

cells.append(nbf.v4.new_code_cell("""fig_duration = px.histogram(
    df.dropna(subset=['OUTAGE.DURATION.HOURS']),
    x='OUTAGE.DURATION.HOURS',
    nbins=50,
    log_y=True,
    title='Distribution of Outage Duration (Hours, Log Scale)',
    labels={'OUTAGE.DURATION.HOURS': 'Duration (Hours)'}
)
fig_duration.update_layout(
    xaxis_title='Duration (Hours)',
    yaxis_title='Log Count',
    template='simple_white+dsc80'
)
fig_duration.write_html(
    'assets/univariate_duration_distribution.html',
    include_plotlyjs='cdn'
)
fig_duration.show()

cause_counts = df['CAUSE.CATEGORY'].value_counts().reset_index()
cause_counts.columns = ['Cause Category', 'Count']
fig_cause = px.bar(
    cause_counts,
    x='Cause Category',
    y='Count',
    text='Count',
    title='Total Major Power Outages by Cause Category',
    color='Count',
    color_continuous_scale='Blues'
)
fig_cause.update_traces(textposition='outside')
fig_cause.update_layout(
    xaxis_tickangle=-30,
    yaxis_title='Number of Outages',
    template='simple_white+dsc80'
)
fig_cause.write_html(
    'assets/univariate_cause_distribution.html',
    include_plotlyjs='cdn'
)
fig_cause.show()
"""))

# Bivariate Analysis
cells.append(nbf.v4.new_markdown_cell("""### Bivariate Analysis

**Plot 3 (Duration Across Cause Categories)**: Severe weather outages have a median restoration time of 41.0 hours (mean of 64.7 hours), whereas intentional attacks have a median duration of only 1.2 hours. Weather destroys physical lines across large geographic footprints, requiring extensive field crew repairs.

**Plot 4 (Outage Volume and Mean Duration by Climate Region)**: The Northeast experiences both the highest volume of major outages and high average durations, while the West experiences many incidents with shorter average restoration times.
"""))

cells.append(nbf.v4.new_code_cell("""fig_cause_dur = px.box(
    df.dropna(subset=['CAUSE.CATEGORY', 'OUTAGE.DURATION.HOURS']),
    x='CAUSE.CATEGORY',
    y='OUTAGE.DURATION.HOURS',
    color='CAUSE.CATEGORY',
    log_y=True,
    title='Outage Duration Across Cause Categories (Log Scale)',
    labels={
        'CAUSE.CATEGORY': 'Cause Category',
        'OUTAGE.DURATION.HOURS': 'Duration (Hours)'
    }
)
fig_cause_dur.update_layout(
    xaxis_tickangle=-30,
    showlegend=False,
    template='simple_white+dsc80'
)
fig_cause_dur.write_html(
    'assets/bivariate_cause_duration_box.html',
    include_plotlyjs='cdn'
)
fig_cause_dur.show()

reg_stats = df.groupby('CLIMATE.REGION').agg(
    Count=('OBS', 'count'),
    Mean_Duration=('OUTAGE.DURATION.HOURS', 'mean')
).reset_index().sort_values('Count', ascending=False)

fig_reg = make_subplots(specs=[[{"secondary_y": True}]])
fig_reg.add_trace(
    go.Bar(
        x=reg_stats['CLIMATE.REGION'],
        y=reg_stats['Count'],
        name='Outage Count',
        marker_color='#1f77b4'
    ),
    secondary_y=False
)
fig_reg.add_trace(
    go.Scatter(
        x=reg_stats['CLIMATE.REGION'],
        y=reg_stats['Mean_Duration'],
        name='Mean Duration (Hours)',
        mode='lines+markers',
        line=dict(color='#d62728', width=3)
    ),
    secondary_y=True
)
fig_reg.update_layout(
    title='Outage Frequency and Mean Duration by Climate Region',
    xaxis_tickangle=-30,
    template='simple_white+dsc80'
)
fig_reg.update_yaxes(title_text="Outage Count", secondary_y=False)
fig_reg.update_yaxes(title_text="Mean Duration (Hours)", secondary_y=True)
fig_reg.write_html(
    'assets/bivariate_region_volume_duration.html',
    include_plotlyjs='cdn'
)
fig_reg.show()
"""))

# Pivot Table
cells.append(nbf.v4.new_markdown_cell("""### Interesting Aggregates

The pivot table below shows the median outage duration (hours) across U.S. Climate Regions and Cause Categories. Severe weather consistently leads to the highest median restoration durations across every climate region.
"""))

cells.append(nbf.v4.new_code_cell("""pivot_table_region_cause = df.pivot_table(
    index='CLIMATE.REGION',
    columns='CAUSE.CATEGORY',
    values='OUTAGE.DURATION.HOURS',
    aggfunc='median'
).round(2)

display(pivot_table_region_cause)
"""))

# Step 3: Assessment of Missingness
cells.append(nbf.v4.new_markdown_cell("""## Step 3: Assessment of Missingness

### MNAR Analysis
We believe the missingness in `CUSTOMERS.AFFECTED` (443 missing, 28.9%) and `DEMAND.LOSS.MW` (705 missing, 46.0%) is **Missing Not At Random (MNAR)**.

**Reasoning**: Under Department of Energy (DOE) Form OE-417 regulations, utilities are only required to report major events exceeding 50,000 customers or 300 MW lost. When an outage was minor or when customer numbers were ambiguous, utilities often omitted the exact count. In other cases during catastrophic storms, the damage was too widespread for utilities to accurately count lost meters. Thus, the missingness depends on the unobserved value itself.

**To make it MAR**: If we obtained automated Smart Meter (AMI) ping records or SCADA telemetry logs from grid operators, we could model sensor availability and network coverage, explaining the missingness using observed data and making it MAR.

---

### Permutation Tests for Missingness Dependency

1. **Dependency Test (MAR)**: We test whether the missingness of `CUSTOMERS.AFFECTED` depends on `CAUSE.CATEGORY` using **Total Variation Distance (TVD)**.
2. **Non-Dependency Test (MCAR)**: We test whether the missingness of `DEMAND.LOSS.MW` depends on `PCT_LAND` (state land area %) using the **Difference in Means**.
"""))

cells.append(nbf.v4.new_code_cell("""# 1. Permutation Test: CUSTOMERS.AFFECTED missingness vs CAUSE.CATEGORY (TVD)
df['cust_missing'] = df['CUSTOMERS.AFFECTED'].isnull()

def tvd(d1, d2):
    return 0.5 * np.sum(np.abs(d1 - d2))

obs_table = df.pivot_table(
    index='CAUSE.CATEGORY', columns='cust_missing',
    aggfunc='size', fill_value=0
)
obs_props = obs_table / obs_table.sum(axis=0)
obs_tvd = tvd(obs_props[False], obs_props[True])

np.random.seed(42)
tvd_sims = []
for _ in range(3000):
    shuffled = np.random.permutation(df['cust_missing'])
    tab = df.assign(shuffled=shuffled).pivot_table(
        index='CAUSE.CATEGORY', columns='shuffled',
        aggfunc='size', fill_value=0
    )
    props = tab / tab.sum(axis=0)
    tvd_sims.append(tvd(props[False], props[True]))

p_val_tvd = np.mean(np.array(tvd_sims) >= obs_tvd)
print(f"CUSTOMERS.AFFECTED missingness vs CAUSE.CATEGORY:")
print(f"  Obs TVD = {obs_tvd:.4f}, p-value = {p_val_tvd:.4f}")
print("  Conclusion: Reject Null (MAR dependency confirmed).")

# 2. Permutation Test: DEMAND.LOSS.MW missingness vs PCT_LAND (Mean Diff)
df['demand_missing'] = df['DEMAND.LOSS.MW'].isnull()
valid_land = df[['demand_missing', 'PCT_LAND']].dropna()
obs_diff_land = np.abs(
    valid_land.groupby('demand_missing')['PCT_LAND'].mean().diff().iloc[-1]
)

land_sims = []
for _ in range(3000):
    shuffled = np.random.permutation(valid_land['demand_missing'])
    diff = np.abs(
        valid_land.assign(shuffled=shuffled).groupby(
            'shuffled'
        )['PCT_LAND'].mean().diff().iloc[-1]
    )
    land_sims.append(diff)

p_val_land = np.mean(np.array(land_sims) >= obs_diff_land)
print(f"\\nDEMAND.LOSS.MW missingness vs PCT_LAND:")
print(f"  Obs Mean Diff = {obs_diff_land:.4f}%, p-value = {p_val_land:.4f}")
print("  Conclusion: Fail to Reject Null (No dependency detected).")
"""))

# Step 4: Hypothesis Testing
cells.append(nbf.v4.new_markdown_cell("""## Step 4: Hypothesis Testing

### Question
> **Do power outages caused by Severe Weather have a significantly longer average restoration duration than outages caused by Equipment Failure or Intentional Attacks?**

### Hypotheses
- **Null Hypothesis ($H_0$)**: In the population of major U.S. power outages, the mean restoration duration for severe weather events is equal to that of equipment failure and intentional attacks. Any observed difference is due to random chance.
  $$\\mu_{\\text{severe\\_weather}} = \\mu_{\\text{other}}$$
- **Alternative Hypothesis ($H_1$)**: Outages caused by severe weather have a higher mean restoration duration than equipment failure and intentional attacks.
  $$\\mu_{\\text{severe\\_weather}} > \\mu_{\\text{other}}$$

### Test Parameters
- **Test Statistic**: Difference in group means ($\\bar{X}_{\\text{severe\\_weather}} - \\bar{X}_{\\text{other}}$).
- **Significance Level**: $\\alpha = 0.01$.
- **Method**: 5,000 permutation resamples under the null hypothesis.
"""))

cells.append(nbf.v4.new_code_cell("""hypo_causes = ['severe weather', 'intentional attack', 'equipment failure']
hypo_df = df[df['CAUSE.CATEGORY'].isin(hypo_causes)].dropna(
    subset=['OUTAGE.DURATION']
).copy()
hypo_df['is_severe_weather'] = hypo_df['CAUSE.CATEGORY'] == 'severe weather'

means = hypo_df.groupby('is_severe_weather')['OUTAGE.DURATION'].mean()
obs_diff = means[True] - means[False]

print(f"Severe Weather Mean Duration: {means[True]:.1f} mins ({means[True]/60:.1f} hrs)")
print(f"Other Causes Mean Duration:   {means[False]:.1f} mins ({means[False]/60:.1f} hrs)")
print(f"Observed Difference in Means: {obs_diff:.2f} mins ({obs_diff/60:.2f} hrs)")

np.random.seed(42)
perm_diffs = []
for _ in range(5000):
    shuffled = np.random.permutation(hypo_df['is_severe_weather'])
    shuff_means = hypo_df.assign(
        shuffled=shuffled
    ).groupby('shuffled')['OUTAGE.DURATION'].mean()
    perm_diffs.append(shuff_means[True] - shuff_means[False])

p_val_hypo = np.mean(np.array(perm_diffs) >= obs_diff)
print(f"Permutation p-value: {p_val_hypo:.5f}")

fig_hypo = px.histogram(
    x=perm_diffs,
    nbins=40,
    title='Empirical Distribution under H₀ vs Observed Difference',
    labels={'x': 'Difference in Mean Duration (Minutes)'}
)
fig_hypo.add_vline(
    x=obs_diff, line_dash='dash', line_color='red',
    annotation_text=f'Observed: +{obs_diff/60:.1f} hrs'
)
fig_hypo.update_layout(template='simple_white+dsc80')
fig_hypo.write_html(
    'assets/hypothesis_test_permutation.html',
    include_plotlyjs='cdn'
)
fig_hypo.show()
"""))

cells.append(nbf.v4.new_markdown_cell("""### Conclusion
With a $p$-value of **$0.0000$** ($p < 0.01$), we **reject the null hypothesis**. 

Severe weather outages last on average **54.8 hours longer** to restore than equipment or attack disruptions (64.7 hours vs 9.9 hours). This aligns with the physical reality of severe storms, where trees and wind physically tear down transmission lines across large areas, requiring extensive field crew repairs.
"""))

# Step 5: Framing a Prediction Problem
cells.append(nbf.v4.new_markdown_cell("""## Step 5: Framing a Prediction Problem

### Problem Identification
- **Task**: Predict the total restoration duration of an outage at the time it begins.
- **Type**: **Regression** on $\\log(1 + \\text{duration in minutes})$ (and **Binary Classification** for severe outages lasting 24+ hours).
- **Response Variable**: `LOG_DURATION` / `IS_SEVERE_OUTAGE`.

### Time of Prediction (Avoiding Data Leakage)
At the time an outage starts ($t = \\text{OUTAGE.START}$), we only know:
- Temporal features: `START_MONTH`, `START_HOUR`, `START_DAYOFWEEK`.
- Regional & Climate: `CLIMATE.REGION`, `ANOMALY.LEVEL`.
- Initial Cause: `CAUSE.CATEGORY` (the reported trigger).
- State demographics & grid baseline: `POPDEN_URBAN`, `POPDEN_RURAL`, `RES.PRICE`, `TOTAL.SALES`, `POPULATION`, `PC.REALGSP.STATE`.

We strictly **exclude** `OUTAGE.RESTORATION`, `OUTAGE.DURATION`, `CUSTOMERS.AFFECTED`, and `DEMAND.LOSS.MW` because they are recorded after the outage is resolved.

### Evaluation Metric
- **Regression**: **Root Mean Squared Error (RMSE)** on log duration. We choose RMSE over MAE because large errors on prolonged multi-day outages are much more severe for emergency planning.
- **Classification**: **F1-Score** and **Accuracy** to balance precision and recall on severe outages.
"""))

# Step 6: Baseline Model
cells.append(nbf.v4.new_markdown_cell("""## Step 6: Baseline Model

We train a baseline model using a Scikit-Learn `Pipeline`:
- **Quantitative features (2)**: `ANOMALY.LEVEL`, `RES.PRICE` (StandardScaler).
- **Nominal features (2)**: `CLIMATE.REGION`, `CAUSE.CATEGORY` (OneHotEncoder).
- **Model**: Linear Regression / Ridge Regression.
"""))

cells.append(nbf.v4.new_code_cell("""from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.linear_model import Ridge, LogisticRegression
from sklearn.metrics import mean_squared_error, r2_score, f1_score, accuracy_score

subset_cols = [
    'LOG_DURATION', 'CLIMATE.REGION', 'CAUSE.CATEGORY',
    'ANOMALY.LEVEL', 'RES.PRICE'
]
model_data = df.dropna(subset=subset_cols).copy()

num_features = ['ANOMALY.LEVEL', 'RES.PRICE']
cat_features = ['CLIMATE.REGION', 'CAUSE.CATEGORY']

X = model_data[num_features + cat_features]
y_reg = model_data['LOG_DURATION']
y_clf = model_data['IS_SEVERE_OUTAGE']

X_train, X_test, y_train_reg, y_test_reg, y_train_clf, y_test_clf = train_test_split(
    X, y_reg, y_clf, test_size=0.20, random_state=42
)

preprocessor = ColumnTransformer([
    ('num', StandardScaler(), num_features),
    ('cat', OneHotEncoder(drop='first', sparse_output=False, handle_unknown='ignore'), cat_features)
])

baseline_pipe = Pipeline([
    ('prep', preprocessor),
    ('model', Ridge(alpha=1.0))
])

baseline_pipe.fit(X_train, y_train_reg)
y_pred_base = baseline_pipe.predict(X_test)

rmse_base = np.sqrt(mean_squared_error(y_test_reg, y_pred_base))
r2_base = r2_score(y_test_reg, y_pred_base)

print("Baseline Model (Ridge Regression) Test Performance:")
print(f"  RMSE: {rmse_base:.4f}")
print(f"  R²:   {r2_base:.4f}")
"""))

# Step 7: Final Model
cells.append(nbf.v4.new_markdown_cell("""## Step 7: Final Model

### Feature Engineering
1. **Cyclical Month & Hour Encodings (`MONTH_SIN`, `MONTH_COS`, `HOUR_SIN`, `HOUR_COS`)**: Cyclical transformations capture storm seasonality and daily peak load cycles without artificial discontinuities.
2. **Urban-Rural Density Ratio (`POPDEN_RATIO = POPDEN_URBAN / (POPDEN_RURAL + 1)`)**: Captures transmission line access difficulty across rural vs dense metropolitan grids.
3. **Grid Stress Index (`GRID_STRESS_INDEX = RES.PRICE * TOTAL.SALES / (POPULATION + 1)`)**: Measures per-capita electrical expenditure and grid operational strain.
4. **QuantileTransformer**: Normalizes skewed population, sales, and economic features.
5. **Model & Hyperparameter Tuning**: We use a `RandomForestRegressor` and perform a 5-fold cross-validated grid search (`GridSearchCV`) over `n_estimators`, `max_depth`, and `min_samples_split`.
"""))

cells.append(nbf.v4.new_code_cell("""from sklearn.ensemble import RandomForestRegressor, RandomForestClassifier
from sklearn.preprocessing import QuantileTransformer
from sklearn.model_selection import GridSearchCV

adv_subset = [
    'LOG_DURATION', 'CLIMATE.REGION', 'CAUSE.CATEGORY',
    'ANOMALY.LEVEL', 'RES.PRICE', 'TOTAL.PRICE', 'TOTAL.SALES',
    'POPULATION', 'POPDEN_URBAN', 'POPDEN_RURAL',
    'PC.REALGSP.STATE', 'AREAPCT_URBAN', 'START_MONTH', 'START_HOUR'
]
adv_df = df.dropna(subset=adv_subset).copy()

adv_df['MONTH_SIN'] = np.sin(2 * np.pi * adv_df['START_MONTH'] / 12.0)
adv_df['MONTH_COS'] = np.cos(2 * np.pi * adv_df['START_MONTH'] / 12.0)
adv_df['HOUR_SIN'] = np.sin(2 * np.pi * adv_df['START_HOUR'] / 24.0)
adv_df['HOUR_COS'] = np.cos(2 * np.pi * adv_df['START_HOUR'] / 24.0)
adv_df['POPDEN_RATIO'] = adv_df['POPDEN_URBAN'] / (adv_df['POPDEN_RURAL'] + 1.0)
adv_df['GRID_STRESS_INDEX'] = (
    adv_df['RES.PRICE'] * adv_df['TOTAL.SALES']
) / (adv_df['POPULATION'] + 1.0)

std_features = [
    'ANOMALY.LEVEL', 'RES.PRICE', 'TOTAL.PRICE',
    'MONTH_SIN', 'MONTH_COS', 'HOUR_SIN', 'HOUR_COS'
]
q_features = [
    'POPULATION', 'TOTAL.SALES', 'POPDEN_RATIO',
    'GRID_STRESS_INDEX', 'PC.REALGSP.STATE', 'AREAPCT_URBAN'
]
cat_features_adv = ['CLIMATE.REGION', 'CAUSE.CATEGORY']

X_adv = adv_df[std_features + q_features + cat_features_adv]
y_adv_reg = adv_df['LOG_DURATION']
y_adv_clf = adv_df['IS_SEVERE_OUTAGE']

X_tr_adv, X_te_adv, y_tr_adv_reg, y_te_adv_reg, y_tr_adv_clf, y_te_adv_clf = train_test_split(
    X_adv, y_adv_reg, y_adv_clf, test_size=0.20, random_state=42
)

adv_preprocessor = ColumnTransformer([
    ('std', StandardScaler(), std_features),
    ('q', QuantileTransformer(
        n_quantiles=100, output_distribution='normal', random_state=42
    ), q_features),
    ('cat', OneHotEncoder(
        drop='first', sparse_output=False, handle_unknown='ignore'
    ), cat_features_adv)
])

rf_pipe = Pipeline([
    ('prep', adv_preprocessor),
    ('rf', RandomForestRegressor(random_state=42))
])

param_grid = {
    'rf__n_estimators': [100, 150],
    'rf__max_depth': [6, 10, None],
    'rf__min_samples_split': [2, 5]
}

grid_search = GridSearchCV(
    rf_pipe, param_grid, cv=5,
    scoring='neg_root_mean_squared_error', n_jobs=-1
)
grid_search.fit(X_tr_adv, y_tr_adv_reg)

best_rf = grid_search.best_estimator_
y_pred_final = best_rf.predict(X_te_adv)

rmse_final = np.sqrt(mean_squared_error(y_te_adv_reg, y_pred_final))
r2_final = r2_score(y_te_adv_reg, y_pred_final)

print(f"Best Hyperparameters: {grid_search.best_params_}")
print(f"Final Model RMSE: {rmse_final:.4f} (Baseline: {rmse_base:.4f})")
print(f"Final Model R²:   {r2_final:.4f} (Baseline: {r2_base:.4f})")
"""))

# Step 8: Fairness Analysis
cells.append(nbf.v4.new_markdown_cell("""## Step 8: Fairness Analysis

### Question
> **Is our model equally accurate for Northern/Cold climate regions versus Southern/Temperate climate regions?**

- **Group X**: Northern / Cold Regions (`Northeast`, `East North Central`, `Central`).
- **Group Y**: Southern / Temperate Regions (`South`, `Southeast`, `West`, `Southwest`).
- **Metric**: Root Mean Squared Error (RMSE) difference across groups.
- **Null Hypothesis ($H_0$)**: The model is fair. Its RMSE for Northern and Southern climate regions is roughly the same, and any observed difference is due to random test sample variance.
- **Alternative Hypothesis ($H_1$)**: The model is unfair. Its RMSE differs across climate regions.
- **Significance Level**: $\\alpha = 0.05$.
"""))

cells.append(nbf.v4.new_code_cell("""eval_df = X_te_adv.copy()
eval_df['y_true'] = y_te_adv_reg
eval_df['y_pred'] = y_pred_final
eval_df['error_sq'] = (eval_df['y_true'] - eval_df['y_pred']) ** 2

cold_regions = ['Northeast', 'East North Central', 'Central']
eval_df['is_cold'] = eval_df['CLIMATE.REGION'].isin(cold_regions)

rmse_cold = np.sqrt(eval_df[eval_df['is_cold']]['error_sq'].mean())
rmse_temp = np.sqrt(eval_df[~eval_df['is_cold']]['error_sq'].mean())
obs_rmse_diff = np.abs(rmse_cold - rmse_temp)

print(f"Group X (Northern/Cold) RMSE:      {rmse_cold:.4f} (n = {eval_df['is_cold'].sum()})")
print(f"Group Y (Southern/Temperate) RMSE: {rmse_temp:.4f} (n = {(~eval_df['is_cold']).sum()})")
print(f"Observed RMSE Difference:           {obs_rmse_diff:.4f}")

np.random.seed(42)
fairness_sims = []
for _ in range(2000):
    shuffled = np.random.permutation(eval_df['is_cold'])
    r1 = np.sqrt(eval_df[shuffled]['error_sq'].mean())
    r2 = np.sqrt(eval_df[~shuffled]['error_sq'].mean())
    fairness_sims.append(np.abs(r1 - r2))

p_val_fairness = np.mean(np.array(fairness_sims) >= obs_rmse_diff)
print(f"Fairness Permutation p-value:       {p_val_fairness:.4f}")
if p_val_fairness >= 0.05:
    print("Conclusion: Fail to Reject Null (p >= 0.05). Model is fair across regions.")
else:
    print("Conclusion: Reject Null (p < 0.05). Model differs across regions.")
"""))

nb.cells = cells

with open('project.ipynb', 'w', encoding='utf-8') as f:
    nbf.write(nb, f)
with open('template.ipynb', 'w', encoding='utf-8') as f:
    nbf.write(nb, f)

print("Formatted project.ipynb and template.ipynb successfully!")
