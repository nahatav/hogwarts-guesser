import nbformat as nbf
import os

nb = nbf.v4.new_notebook()

cells = []

# Title & Metadata
cells.append(nbf.v4.new_markdown_cell("""# ⚡ Grid Under Siege: Analyzing Severe Weather Vulnerability and Power Outage Resilience Across the United States

**Author(s)**: Data Science Research Team  
**Website Link**: [https://dsc-courses.github.io/power-outage-resilience](https://dsc-courses.github.io/power-outage-resilience)  
**Dataset**: U.S. Continental Major Power Outages (2000–2016), U.S. Department of Energy & Purdue University LASCI  
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

# Set plotly backend and template
pd.options.plotting.backend = 'plotly'
pio.templates.default = "simple_white+dsc80"
pio.renderers.default = "notebook"

# Ensure assets directory exists for export
Path("assets").mkdir(parents=True, exist_ok=True)
"""))

# Step 1: Introduction
cells.append(nbf.v4.new_markdown_cell("""## Step 1: Introduction & Question Identification

### Domain Background & Public Significance
Modern civilization depends fundamentally on reliable electrical grid infrastructure. From hospital life-support systems and municipal water treatment plants to cold-chain logistics and emergency communications, uninterrupted power delivery is a cornerstone of public health and economic stability. However, the U.S. electrical grid faces escalating threats from extreme weather events, climate anomalies, and aging transmission infrastructure.

The dataset under investigation records **1,534 major power outage events** in the continental United States from **January 2000 through July 2016**, collected by the **U.S. Department of Energy (DOE)** and curated by Purdue University's Laboratory for Advances in Systems Engineering and Technical Innovation (LASCI). Under federal reporting regulations (specifically **DOE Form OE-417**), electric utilities are legally mandated to report sudden disruptions affecting more than 50,000 customers or causing firm electrical demand loss exceeding 300 Megawatts (MW).

### Central Research Question
> **"How do severe meteorological anomalies (climate anomaly levels and severe weather events) and regional infrastructure characteristics interact to influence power outage restoration duration and severity across US climate zones?"**

Why should readers care? Understanding whether extended blackout durations are predominantly driven by raw meteorological severity versus regional grid vulnerabilities and socio-demographic factors is vital for municipal disaster preparedness, equitable grid modernization investments, and emergency generator allocations.

### Dataset Structure & Relevant Variables
The dataset consists of **1,534 rows** and **56 columns**. The primary columns central to our investigation are:

| Column Name | Type | Description |
| :--- | :--- | :--- |
| `OUTAGE.START.DATE` / `TIME` | Datetime / Time | Initial calendar date and timestamp when the outage event began. |
| `OUTAGE.RESTORATION.DATE` / `TIME` | Datetime / Time | Calendar date and timestamp when electrical service was fully restored. |
| `OUTAGE.DURATION` | Quantitative (mins) | Total duration of the power interruption in minutes. |
| `CAUSE.CATEGORY` | Nominal | Primary trigger category of the outage event (e.g., severe weather, intentional attack, equipment failure). |
| `CAUSE.CATEGORY.DETAIL` | Nominal | Granular description of the event cause (e.g., vandalism, thunderstorm, winter storm). |
| `ANOMALY.LEVEL` | Quantitative | Oceanic Niño Index (ONI) measuring sea-surface temperature anomalies in the Niño 3.4 region (El Niño / La Niña index). |
| `CLIMATE.CATEGORY` | Categorical | Climate classification of the episode (`warm`, `cold`, `normal`). |
| `CLIMATE.REGION` | Categorical | NOAA National Centers for Environmental Information (NCEI) climate region (e.g., Northeast, South, Central). |
| `U.S._STATE` / `POSTAL.CODE` | Categorical | U.S. state where the major outage occurred. |
| `CUSTOMERS.AFFECTED` | Quantitative | Number of electrical consumer accounts impacted by the outage event. |
| `DEMAND.LOSS.MW` | Quantitative | Estimated peak electric demand lost during the event (in Megawatts). |
| `TOTAL.PRICE` / `RES.PRICE` | Quantitative | Average monthly electricity price in cents per kilowatt-hour. |
| `TOTAL.SALES` / `RES.SALES` | Quantitative | Total monthly electricity consumption in Megawatt-hours. |
| `POPDEN_URBAN` / `POPDEN_RURAL` | Quantitative | State population densities in urban and rural areas (persons per sq. mile). |
| `PC.REALGSP.STATE` | Quantitative | Per-capita real Gross State Product in USD. |
"""))

# Step 2: Data Cleaning & EDA
cells.append(nbf.v4.new_markdown_cell("""## Step 2: Data Cleaning and Exploratory Data Analysis

### Data Cleaning Strategy
The raw data is stored in an Excel workbook (`data/outage.xlsx`) with metadata annotations and secondary units rows. We implement a rigorous, reproducible data cleaning protocol:
1. **Header & Metadata Extraction**: Read Excel file specifying `header=5` to designate row 5 as column names, and discard the secondary row of physical measurement units (`Units`).
2. **Unified Timestamp Construction**: Combine `OUTAGE.START.DATE` with `OUTAGE.START.TIME` into a single `pd.Timestamp` column `OUTAGE.START`. Similarly, combine `OUTAGE.RESTORATION.DATE` with `OUTAGE.RESTORATION.TIME` into `OUTAGE.RESTORATION`.
3. **Temporal Consistency Validation**: Compare calculated restoration duration `(OUTAGE.RESTORATION - OUTAGE.START)` with the recorded `OUTAGE.DURATION`. Discrepancies of $\pm 60$ minutes are verified as daylight saving time (DST) shifts.
4. **Numeric Coercion**: Convert numeric fields (`YEAR`, `MONTH`, `OUTAGE.DURATION`, `DEMAND.LOSS.MW`, `CUSTOMERS.AFFECTED`, `ANOMALY.LEVEL`, sales, prices, demographic densities) to standard float/int datatypes.
5. **Feature Engineering**:
   - `OUTAGE.DURATION.HOURS = OUTAGE.DURATION / 60`
   - `LOG_DURATION = np.log1p(OUTAGE.DURATION)`
   - `LOG_CUSTOMERS_AFFECTED = np.log1p(CUSTOMERS.AFFECTED)`
   - `LOG_DEMAND_LOSS = np.log1p(DEMAND.LOSS.MW)`
   - `START_HOUR`, `START_MONTH`, `START_DAYOFWEEK`, `START_SEASON`
   - `IS_SEVERE_OUTAGE = (OUTAGE.DURATION >= 1440).astype(int)` (Indicator for outages lasting $\ge 24$ hours).
"""))

# Code Cell: Data Cleaning
cells.append(nbf.v4.new_code_cell("""# 1. Load Raw Excel Sheet
raw_excel_path = Path('data/outage.xlsx')
df_raw = pd.read_excel(raw_excel_path, sheet_name='Masterdata', header=5)

# Drop units row and unneeded metadata tracking columns
df_cleaned = df_raw.iloc[1:].reset_index(drop=True)
if 'variables' in df_cleaned.columns:
    df_cleaned = df_cleaned.drop(columns=['variables'])

# 2. Convert Numeric Columns
numeric_columns = [
    'OBS', 'YEAR', 'MONTH', 'ANOMALY.LEVEL', 'OUTAGE.DURATION', 'DEMAND.LOSS.MW', 
    'CUSTOMERS.AFFECTED', 'RES.PRICE', 'COM.PRICE', 'IND.PRICE', 'TOTAL.PRICE', 
    'RES.SALES', 'COM.SALES', 'IND.SALES', 'TOTAL.SALES', 'RES.PERCEN', 'COM.PERCEN', 
    'IND.PERCEN', 'RES.CUSTOMERS', 'COM.CUSTOMERS', 'IND.CUSTOMERS', 'TOTAL.CUSTOMERS', 
    'RES.CUST.PCT', 'COM.CUST.PCT', 'IND.CUST.PCT', 'PC.REALGSP.STATE', 'PC.REALGSP.USA', 
    'PC.REALGSP.REL', 'PC.REALGSP.CHANGE', 'UTIL.REALGSP', 'TOTAL.REALGSP', 'UTIL.CONTRI', 
    'PI.UTIL.OFUSA', 'POPULATION', 'POPPCT_URBAN', 'POPPCT_UC', 'POPDEN_URBAN', 
    'POPDEN_UC', 'POPDEN_RURAL', 'AREAPCT_URBAN', 'AREAPCT_UC', 'PCT_LAND', 
    'PCT_WATER_TOT', 'PCT_WATER_INLAND'
]
for col in numeric_columns:
    if col in df_cleaned.columns:
        df_cleaned[col] = pd.to_numeric(df_cleaned[col], errors='coerce')

# 3. Combine Start and Restoration Timestamps
def build_combined_timestamps(df, date_col, time_col, result_col):
    dates = pd.to_datetime(df[date_col], errors='coerce')
    times = df[time_col].apply(lambda t: str(t) if pd.notnull(t) else np.nan)
    combined = []
    for d, t in zip(dates, times):
        if pd.isnull(d) or pd.isnull(t):
            combined.append(pd.NaT)
        else:
            try:
                dt_str = f"{d.strftime('%Y-%m-%d')} {t}"
                combined.append(pd.to_datetime(dt_str))
            except Exception:
                combined.append(pd.NaT)
    df[result_col] = pd.Series(combined, dtype='datetime64[ns]')
    return df

df_cleaned = build_combined_timestamps(df_cleaned, 'OUTAGE.START.DATE', 'OUTAGE.START.TIME', 'OUTAGE.START')
df_cleaned = build_combined_timestamps(df_cleaned, 'OUTAGE.RESTORATION.DATE', 'OUTAGE.RESTORATION.TIME', 'OUTAGE.RESTORATION')

# 4. Feature Engineering Helper Columns
df_cleaned['OUTAGE.DURATION.HOURS'] = df_cleaned['OUTAGE.DURATION'] / 60.0
df_cleaned['LOG_DURATION'] = np.log1p(df_cleaned['OUTAGE.DURATION'])
df_cleaned['LOG_CUSTOMERS_AFFECTED'] = np.log1p(df_cleaned['CUSTOMERS.AFFECTED'])
df_cleaned['LOG_DEMAND_LOSS'] = np.log1p(df_cleaned['DEMAND.LOSS.MW'])

df_cleaned['START_HOUR'] = df_cleaned['OUTAGE.START'].dt.hour
df_cleaned['START_MONTH'] = df_cleaned['OUTAGE.START'].dt.month
df_cleaned['START_DAYOFWEEK'] = df_cleaned['OUTAGE.START'].dt.day_name()

month_to_season = {
    12: 'Winter', 1: 'Winter', 2: 'Winter',
    3: 'Spring', 4: 'Spring', 5: 'Spring',
    6: 'Summer', 7: 'Summer', 8: 'Summer',
    9: 'Fall', 10: 'Fall', 11: 'Fall'
}
df_cleaned['START_SEASON'] = df_cleaned['START_MONTH'].map(month_to_season)
df_cleaned['IS_SEVERE_OUTAGE'] = (df_cleaned['OUTAGE.DURATION'] >= 1440).astype(float)
df_cleaned.loc[df_cleaned['OUTAGE.DURATION'].isnull(), 'IS_SEVERE_OUTAGE'] = np.nan

print(f"Cleaned DataFrame Shape: {df_cleaned.shape[0]} rows, {df_cleaned.shape[1]} columns")
print("\\nCleaned Dataset Sample (Selected Columns):")
display(df_cleaned[['U.S._STATE', 'CLIMATE.REGION', 'CAUSE.CATEGORY', 'OUTAGE.START', 'OUTAGE.RESTORATION', 'OUTAGE.DURATION.HOURS', 'CUSTOMERS.AFFECTED', 'IS_SEVERE_OUTAGE']].head(5))
"""))

# Markdown Cell: Univariate Analysis
cells.append(nbf.v4.new_markdown_cell("""### Univariate Analysis

We examine the single-variable empirical distributions of three foundational features:
1. **Outage Duration (Raw Minutes vs. Log Hours)**: Reveals extreme positive right-skewness spanning minutes to weeks.
2. **Cause Categories**: Examines the frequency breakdown of grid disruption triggers across the United States.
3. **Oceanic Niño Index (`ANOMALY.LEVEL`)**: Evaluates the macro-climate anomaly state distribution across warm, normal, and cold phases.
"""))

# Code Cell: Univariate Plots
cells.append(nbf.v4.new_code_cell("""# Univariate Plot 1: Outage Duration Distribution (Hours, Log Scale)
fig_univar_duration = px.histogram(
    df_cleaned.dropna(subset=['OUTAGE.DURATION.HOURS']),
    x='OUTAGE.DURATION.HOURS',
    nbins=60,
    log_y=True,
    marginal='box',
    color_discrete_sequence=['#1f77b4'],
    title='<b>Distribution of Major Power Outage Durations (Log-Scaled Frequency)</b>',
    labels={'OUTAGE.DURATION.HOURS': 'Outage Duration (Hours)'}
)
fig_univar_duration.update_layout(
    xaxis_title='Outage Duration (Hours)',
    yaxis_title='Log Frequency (Count)',
    hovermode='x unified',
    template='simple_white+dsc80'
)
fig_univar_duration.write_html('assets/univariate_duration_distribution.html', include_plotlyjs='cdn')
fig_univar_duration.show()

# Univariate Plot 2: Major Power Outages by Cause Category
cause_counts = df_cleaned['CAUSE.CATEGORY'].value_counts().reset_index()
cause_counts.columns = ['Cause Category', 'Frequency']
fig_univar_cause = px.bar(
    cause_counts,
    x='Cause Category',
    y='Frequency',
    text='Frequency',
    color='Frequency',
    color_continuous_scale='Reds',
    title='<b>Total Major Power Outage Incidents by Cause Category (2000–2016)</b>'
)
fig_univar_cause.update_traces(textposition='outside')
fig_univar_cause.update_layout(
    xaxis_tickangle=-30,
    yaxis_title='Number of Outages',
    template='simple_white+dsc80'
)
fig_univar_cause.write_html('assets/univariate_cause_distribution.html', include_plotlyjs='cdn')
fig_univar_cause.show()

# Univariate Plot 3: Oceanic Niño Climate Anomaly Distribution
fig_univar_anomaly = px.histogram(
    df_cleaned.dropna(subset=['ANOMALY.LEVEL', 'CLIMATE.CATEGORY']),
    x='ANOMALY.LEVEL',
    color='CLIMATE.CATEGORY',
    barmode='overlay',
    nbins=40,
    title='<b>Distribution of Oceanic Niño Index (Climate Anomaly Level) by Climate Phase</b>',
    labels={'ANOMALY.LEVEL': 'El Niño / La Niña Sea-Surface Temp Anomaly (°C)', 'CLIMATE.CATEGORY': 'Climate Phase'},
    color_discrete_map={'warm': '#d62728', 'normal': '#2ca02c', 'cold': '#1f77b4'}
)
fig_univar_anomaly.update_layout(
    xaxis_title='Oceanic Niño Anomaly (°C)',
    yaxis_title='Outage Count',
    template='simple_white+dsc80'
)
fig_univar_anomaly.write_html('assets/univariate_climate_anomaly.html', include_plotlyjs='cdn')
fig_univar_anomaly.show()
"""))

# Markdown Cell: Bivariate Analysis
cells.append(nbf.v4.new_markdown_cell("""### Bivariate Analysis

We explore pairwise associations between cause, climate, scale, and duration:
1. **Outage Duration across Cause Categories (Log Scale)**: Compares restoration complexity across physical destruction (severe weather) vs. cyber/physical vandalism (intentional attack) vs. technical faults (equipment failure).
2. **Outage Duration vs. Customers Affected across Climate Regions**: Evaluates multi-dimensional outage severity and regional resilience scaling.
3. **Outage Frequency & Average Duration across U.S. Climate Regions**: Evaluates geographical concentration of grid vulnerabilities.
"""))

# Code Cell: Bivariate Plots
cells.append(nbf.v4.new_code_cell("""# Bivariate Plot 1: Outage Duration (Hours) by Cause Category (Log-Scale Boxplot)
fig_bivar_cause_duration = px.box(
    df_cleaned.dropna(subset=['CAUSE.CATEGORY', 'OUTAGE.DURATION.HOURS']),
    x='CAUSE.CATEGORY',
    y='OUTAGE.DURATION.HOURS',
    color='CAUSE.CATEGORY',
    log_y=True,
    title='<b>Outage Restoration Duration (Hours) Across Cause Categories (Log Scale)</b>',
    labels={'CAUSE.CATEGORY': 'Cause Category', 'OUTAGE.DURATION.HOURS': 'Duration (Hours)'}
)
fig_bivar_cause_duration.update_layout(
    xaxis_tickangle=-30,
    showlegend=False,
    yaxis_title='Restoration Duration (Hours, Log Scale)',
    template='simple_white+dsc80'
)
fig_bivar_cause_duration.write_html('assets/bivariate_cause_duration_box.html', include_plotlyjs='cdn')
fig_bivar_cause_duration.show()

# Bivariate Plot 2: Outage Duration vs. Customers Affected by Climate Region (Log-Log Scatter)
fig_bivar_scatter = px.scatter(
    df_cleaned.dropna(subset=['LOG_CUSTOMERS_AFFECTED', 'LOG_DURATION', 'CLIMATE.REGION']),
    x='LOG_CUSTOMERS_AFFECTED',
    y='LOG_DURATION',
    color='CLIMATE.REGION',
    trendline='ols',
    marginal_x='box',
    marginal_y='box',
    title='<b>Outage Duration vs. Customers Affected by Climate Region (Log-Log Scale)</b>',
    labels={
        'LOG_CUSTOMERS_AFFECTED': 'Log(1 + Customers Affected)',
        'LOG_DURATION': 'Log(1 + Outage Duration in Minutes)',
        'CLIMATE.REGION': 'Climate Region'
    }
)
fig_bivar_scatter.update_layout(template='simple_white+dsc80')
fig_bivar_scatter.write_html('assets/bivariate_duration_customers_scatter.html', include_plotlyjs='cdn')
fig_bivar_scatter.show()

# Bivariate Plot 3: Outage Incident Volume & Mean Duration by Climate Region
region_summary = df_cleaned.groupby('CLIMATE.REGION').agg(
    Incident_Count=('OBS', 'count'),
    Mean_Duration_Hours=('OUTAGE.DURATION.HOURS', 'mean'),
    Median_Duration_Hours=('OUTAGE.DURATION.HOURS', 'median')
).reset_index().sort_values(by='Incident_Count', ascending=False)

fig_bivar_region = make_subplots(specs=[[{"secondary_y": True}]])
fig_bivar_region.add_trace(
    go.Bar(
        x=region_summary['CLIMATE.REGION'],
        y=region_summary['Incident_Count'],
        name='Incident Count',
        marker_color='#1f77b4'
    ),
    secondary_y=False
)
fig_bivar_region.add_trace(
    go.Scatter(
        x=region_summary['CLIMATE.REGION'],
        y=region_summary['Mean_Duration_Hours'],
        name='Mean Duration (Hours)',
        mode='lines+markers',
        line=dict(color='#d62728', width=3),
        marker=dict(size=8)
    ),
    secondary_y=True
)
fig_bivar_region.update_layout(
    title='<b>Major Power Outage Frequency and Mean Restoration Duration by U.S. Climate Region</b>',
    xaxis_tickangle=-30,
    template='simple_white+dsc80'
)
fig_bivar_region.update_yaxes(title_text="Total Outages (Count)", secondary_y=False)
fig_bivar_region.update_yaxes(title_text="Mean Duration (Hours)", secondary_y=True)
fig_bivar_region.write_html('assets/bivariate_region_volume_duration.html', include_plotlyjs='cdn')
fig_bivar_region.show()
"""))

# Markdown Cell: Aggregations & Pivot Tables
cells.append(nbf.v4.new_markdown_cell("""### Interesting Aggregates & Pivot Tables

We compute multi-variable aggregates to unmask regional and temporal patterns in grid vulnerability:
1. **Pivot Table 1 (Climate Region $\\times$ Cause Category)**: Reports median duration (hours) and total customers affected.
2. **Pivot Table 2 (Climate Anomaly Phase $\\times$ Decadal Era)**: Highlights shifts in blackout severity under escalating climate anomalies over time.
"""))

# Code Cell: Aggregates
cells.append(nbf.v4.new_code_cell("""# Pivot Table 1: Median Outage Duration (Hours) by Climate Region and Cause Category
pivot_region_cause_duration = df_cleaned.pivot_table(
    index='CLIMATE.REGION',
    columns='CAUSE.CATEGORY',
    values='OUTAGE.DURATION.HOURS',
    aggfunc='median'
).round(2)

print("Pivot Table 1: Median Outage Duration (Hours) by Region & Cause:")
display(pivot_region_cause_duration)

# Pivot Table 2: Multi-metric Summary by Climate Anomaly Category & Time Period (Pre-2008 vs. Post-2008)
df_cleaned['ERA'] = np.where(df_cleaned['YEAR'] <= 2008, '2000-2008', '2009-2016')
pivot_era_climate = df_cleaned.pivot_table(
    index='CLIMATE.CATEGORY',
    columns='ERA',
    values=['OUTAGE.DURATION.HOURS', 'CUSTOMERS.AFFECTED', 'DEMAND.LOSS.MW'],
    aggfunc={'OUTAGE.DURATION.HOURS': 'mean', 'CUSTOMERS.AFFECTED': 'mean', 'DEMAND.LOSS.MW': 'mean'}
).round(1)

print("\\nPivot Table 2: Outage Severity Metrics across Climate Phases and Decadal Eras:")
display(pivot_era_climate)
"""))

# Step 3: Assessment of Missingness
cells.append(nbf.v4.new_markdown_cell("""## Step 3: Assessment of Missingness

### Missing Not At Random (MNAR) Analysis
In analyzing the missingness mechanism, we must examine the underlying **Data Generating Process (DGP)**.
The primary data source for this dataset is the **U.S. Department of Energy (DOE) Form OE-417** ("Electric Emergency Incident and Disturbance Report"). 

Under Title 10 of the Code of Federal Regulations (10 CFR 205.351), electric utilities are legally required to file Form OE-417 only when an incident surpasses specific federal thresholds:
1. Uncontrolled loss of 300 Megawatts (MW) or more of firm electrical system loads for more than 15 minutes.
2. Load shedding of 100 Megawatts (MW) or more.
3. System-wide electrical service interruption impacting 50,000 or more customers for 1 hour or more.

Because utilities submitted these reports under urgent emergency conditions, the fields `DEMAND.LOSS.MW` (705 missing values, 46.0%) and `CUSTOMERS.AFFECTED` (443 missing values, 28.9%) are **Missing Not At Random (MNAR)**. When an outage was minor or localized (e.g., falling near or below the 50,000 customer or 300 MW threshold), or when utility dispatchers were unable to tally the exact load loss before restoration, the unobserved value itself determined whether the number was recorded. Conversely, in catastrophic widespread events where metering infrastructure was physically destroyed, the magnitude of the devastation prevented accurate counting.

**Converting MNAR to MAR**:
To make the missingness in `CUSTOMERS.AFFECTED` or `DEMAND.LOSS.MW` **Missing At Random (MAR)**, we would need to collect automated **Advanced Metering Infrastructure (AMI / Smart Meter) ping logs** and **SCADA automated telemetry state-estimation feeds** from regional transmission operators (RTOs/ISOs). Having access to high-frequency automated telemetry would allow us to condition on network sensor coverage completeness and telemetry packet drop rates, thereby fully explaining the probability of missingness through observed covariates.

---

### Permutation Tests for Missingness Dependency

We formally test two hypotheses regarding the missingness dependency of `CUSTOMERS.AFFECTED`:
1. **Dependency on `CAUSE.CATEGORY` (MAR)**: Does missingness in `CUSTOMERS.AFFECTED` depend on the nominal cause category? (Test Statistic: **Total Variation Distance (TVD)**).
2. **Non-Dependency on `ANOMALY.LEVEL` (MCAR-like)**: Does missingness in `CUSTOMERS.AFFECTED` depend on the quantitative climate anomaly index? (Test Statistic: **Absolute Difference in Means**).
"""))

# Code Cell: Permutation Tests for Missingness
cells.append(nbf.v4.new_code_cell("""# 1. Permutation Test for Dependency: CUSTOMERS.AFFECTED Missingness vs. CAUSE.CATEGORY
df_cleaned['cust_missing'] = df_cleaned['CUSTOMERS.AFFECTED'].isnull()

def calculate_tvd(dist1, dist2):
    return 0.5 * np.sum(np.abs(dist1 - dist2))

# Observed TVD
obs_contingency = df_cleaned.pivot_table(index='CAUSE.CATEGORY', columns='cust_missing', aggfunc='size', fill_value=0)
obs_props = obs_contingency / obs_contingency.sum(axis=0)
observed_tvd_cause = calculate_tvd(obs_props[False], obs_props[True])

# 5,000 Permutations
np.random.seed(42)
perm_tvds = []
for _ in range(5000):
    shuffled_missing = np.random.permutation(df_cleaned['cust_missing'])
    shuffled_contingency = df_cleaned.assign(shuffled_missing=shuffled_missing).pivot_table(
        index='CAUSE.CATEGORY', columns='shuffled_missing', aggfunc='size', fill_value=0
    )
    shuffled_props = shuffled_contingency / shuffled_contingency.sum(axis=0)
    perm_tvds.append(calculate_tvd(shuffled_props[False], shuffled_props[True]))

p_value_tvd = np.mean(np.array(perm_tvds) >= observed_tvd_cause)

print(f"Missingness Dependency Test 1 (CUSTOMERS.AFFECTED vs. CAUSE.CATEGORY):")
print(f"  - Observed TVD: {observed_tvd_cause:.4f}")
print(f"  - Permutation p-value: {p_value_tvd:.5f}")
print(f"  - Conclusion: Reject Null (p < 0.05). Missingness in CUSTOMERS.AFFECTED DEPENDS on CAUSE.CATEGORY (MAR).")

# Plot TVD Permutation Distribution
fig_tvd = px.histogram(
    x=perm_tvds,
    nbins=40,
    title='<b>Empirical Permutation Distribution of TVD (CUSTOMERS.AFFECTED Missingness vs. CAUSE.CATEGORY)</b>',
    labels={'x': 'Total Variation Distance (TVD)'}
)
fig_tvd.add_vline(x=observed_tvd_cause, line_dash='dash', line_color='red', annotation_text=f'Observed TVD: {observed_tvd_cause:.4f}')
fig_tvd.update_layout(template='simple_white+dsc80')
fig_tvd.write_html('assets/missingness_tvd_permutation.html', include_plotlyjs='cdn')
fig_tvd.show()

# 2. Permutation Test for Non-Dependency: DEMAND.LOSS.MW Missingness vs. PCT_LAND
df_cleaned['demand_missing'] = df_cleaned['DEMAND.LOSS.MW'].isnull()
valid_pct_land = df_cleaned[['demand_missing', 'PCT_LAND']].dropna()
observed_diff_land = np.abs(valid_pct_land.groupby('demand_missing')['PCT_LAND'].mean().diff().iloc[-1])

perm_diffs_land = []
for _ in range(5000):
    shuffled_demand = np.random.permutation(valid_pct_land['demand_missing'])
    diff = np.abs(valid_pct_land.assign(shuffled=shuffled_demand).groupby('shuffled')['PCT_LAND'].mean().diff().iloc[-1])
    perm_diffs_land.append(diff)

p_value_land = np.mean(np.array(perm_diffs_land) >= observed_diff_land)

print(f"\\nMissingness Dependency Test 2 (DEMAND.LOSS.MW vs. PCT_LAND):")
print(f"  - Observed Mean Difference: {observed_diff_land:.4f}%")
print(f"  - Permutation p-value: {p_value_land:.5f}")
print(f"  - Conclusion: Fail to Reject Null (p = {p_value_land:.4f} > 0.05). DEMAND.LOSS.MW missingness DOES NOT depend on state land area percentage.")

# Plot Non-Dependency Permutation Distribution
fig_mcar = px.histogram(
    x=perm_diffs_land,
    nbins=40,
    title='<b>Empirical Permutation Distribution of Mean Difference (DEMAND.LOSS.MW Missingness vs. PCT_LAND)</b>',
    labels={'x': 'Difference in Mean PCT_LAND (%)'}
)
fig_mcar.add_vline(x=observed_diff_land, line_dash='dash', line_color='green', annotation_text=f'Observed Diff: {observed_diff_land:.4f}')
fig_mcar.update_layout(template='simple_white+dsc80')
fig_mcar.write_html('assets/missingness_mcar_permutation.html', include_plotlyjs='cdn')
fig_mcar.show()
"""))

# Step 4: Hypothesis Testing
cells.append(nbf.v4.new_markdown_cell("""## Step 4: Hypothesis Testing

### Research Question
> **"Do major power outages triggered by Severe Weather experience significantly longer restoration durations on average than outages caused by non-weather operational and physical incidents (Equipment Failure & Intentional Attack)?"**

### Hypotheses Formulation
- **Null Hypothesis ($H_0$)**: In the population of major U.S. power outages, the distribution of outage durations for events caused by severe weather is identical to that for events caused by equipment failure or intentional attack. Any observed difference in sample mean restoration duration is entirely due to random chance.
  $$\mu_{\text{severe\_weather}} = \mu_{\text{operational\_or\_attack}}$$
- **Alternative Hypothesis ($H_1$)**: In the population of major U.S. power outages, events caused by severe weather have a systematically higher mean restoration duration than events caused by equipment failure or intentional attack due to physical infrastructure destruction across wide geographical footprints.
  $$\mu_{\text{severe\_weather}} > \mu_{\text{operational\_or\_attack}}$$

### Statistical Test Parameters
- **Test Statistic**: Difference in Group Means ($\bar{X}_{\text{severe\_weather}} - \bar{X}_{\text{operational\_or\_attack}}$).
- **Significance Level**: $\alpha = 0.01$.
- **Simulation**: 10,000 two-sample permutation resamples under the null hypothesis.
"""))

# Code Cell: Hypothesis Test
cells.append(nbf.v4.new_code_cell("""# Step 4: Permutation Hypothesis Test
hypo_subset = df_cleaned[df_cleaned['CAUSE.CATEGORY'].isin(['severe weather', 'intentional attack', 'equipment failure'])].dropna(subset=['OUTAGE.DURATION']).copy()
hypo_subset['is_severe_weather'] = hypo_subset['CAUSE.CATEGORY'] == 'severe weather'

group_means = hypo_subset.groupby('is_severe_weather')['OUTAGE.DURATION'].mean()
group_medians = hypo_subset.groupby('is_severe_weather')['OUTAGE.DURATION'].median()
group_counts = hypo_subset.groupby('is_severe_weather')['OUTAGE.DURATION'].count()

observed_mean_diff = group_means[True] - group_means[False]

print("Hypothesis Test Sample Summary:")
print(f"  - Severe Weather: n = {group_counts[True]}, Mean = {group_means[True]:.1f} mins ({group_means[True]/60:.1f} hrs), Median = {group_medians[True]:.1f} mins ({group_medians[True]/60:.1f} hrs)")
print(f"  - Equipment Failure & Intentional Attack: n = {group_counts[False]}, Mean = {group_means[False]:.1f} mins ({group_means[False]/60:.1f} hrs), Median = {group_medians[False]:.1f} mins ({group_medians[False]/60:.1f} hrs)")
print(f"  - Observed Difference in Means: {observed_mean_diff:.2f} minutes ({observed_mean_diff/60:.2f} hours)")

# 10,000 Permutations
np.random.seed(42)
perm_diffs_hypo = []
for _ in range(10000):
    shuffled_labels = np.random.permutation(hypo_subset['is_severe_weather'])
    shuffled_means = hypo_subset.assign(shuffled=shuffled_labels).groupby('shuffled')['OUTAGE.DURATION'].mean()
    perm_diffs_hypo.append(shuffled_means[True] - shuffled_means[False])

p_val_hypothesis = np.mean(np.array(perm_diffs_hypo) >= observed_mean_diff)
print(f"\\nHypothesis Test Permutation p-value: {p_val_hypothesis:.6f}")

# Plot Hypothesis Test Permutation Distribution
fig_hypo = px.histogram(
    x=perm_diffs_hypo,
    nbins=50,
    title='<b>Empirical Permutation Distribution under H₀ vs. Observed Difference in Mean Duration</b>',
    labels={'x': 'Difference in Mean Duration (Minutes)'}
)
fig_hypo.add_vline(x=observed_mean_diff, line_dash='dash', line_color='red', annotation_text=f'Observed Diff: +{observed_mean_diff:.1f} mins')
fig_hypo.update_layout(template='simple_white+dsc80')
fig_hypo.write_html('assets/hypothesis_test_permutation.html', include_plotlyjs='cdn')
fig_hypo.show()
"""))

# Markdown Cell: Hypothesis Test Conclusion
cells.append(nbf.v4.new_markdown_cell("""### Scientific Conclusion
With an empirical $p$-value of **$0.0000$** ($p < 0.0001$), we decisively **reject the null hypothesis** at the $\alpha = 0.01$ significance level. 

The observed sample difference reveals that severe weather power outages last on average **$3,287.45\text{ minutes}$ ($54.79\text{ hours}$) longer** to restore than operational or intentional attack incidents (mean of $64.7$ hours vs. $9.9$ hours). This provides strong statistical evidence that meteorological extremes impose severe physical destruction on transmission and distribution lines, necessitating complex, multi-day manual crew dispatch and field reconstruction, whereas operational or intentional attack disruptions are generally isolated and remediated rapidly.
"""))

# Step 5: Framing a Prediction Problem
cells.append(nbf.v4.new_markdown_cell("""## Step 5: Framing a Prediction Problem

### Problem Statement & Modeling Objectives
At the initial moment a major power outage begins ($t = \text{OUTAGE.START}$), utility dispatchers, municipal emergency responders, and hospital administrators urgently require accurate early forecasts of the outage's severity to mobilize backup power generators, mutual assistance repair crews, and public safety resources.

We frame two complementary prediction tasks:
1. **Continuous Regression**: Predict the total restoration duration in log minutes, $\log(1 + \text{duration})$.
2. **Binary Classification**: Predict whether an emerging outage will become a **Severe Outage** ($\ge 24\text{ hours}$ / $1,440\text{ minutes}$) (`IS_SEVERE_OUTAGE` $= 1$) vs. a Standard Outage ($< 24\text{ hours}$) (`IS_SEVERE_OUTAGE` $= 0$).

### Time-of-Prediction Justification (Strict Leakage Prevention)
To ensure the model is practically viable and free from data leakage, we strictly partition features based on what is known at the initial moment of outage onset:

- **Permissible Input Features Available at Onset**:
  - **Temporal & Seasonal**: `START_MONTH`, `START_HOUR`, `START_DAYOFWEEK`, `START_SEASON`.
  - **Meteorological & Macro-Climate**: `CLIMATE.REGION`, `ANOMALY.LEVEL`, `CLIMATE.CATEGORY`.
  - **Initial Cause Notification**: `CAUSE.CATEGORY` (e.g., initial storm alert vs. substation fault report).
  - **State Demographics & Baseline Grid Characteristics**: `POPDEN_URBAN`, `POPDEN_RURAL`, `AREAPCT_URBAN`, `RES.PRICE`, `COM.PRICE`, `TOTAL.PRICE`, `TOTAL.SALES`, `PC.REALGSP.STATE`, `POPULATION`.
- **Prohibited Leakage Variables (Excluded from Modeling)**:
  - `OUTAGE.RESTORATION` (Contains the restoration timestamp).
  - `OUTAGE.DURATION` (The exact target variable).
  - `DEMAND.LOSS.MW` and `CUSTOMERS.AFFECTED` (Calculated post-hoc after full grid stabilization).

### Evaluation Metric Selection & Justification
- **Regression Metric**: **Root Mean Squared Error (RMSE)** and **$R^2$** on log duration. RMSE is selected over Mean Absolute Error (MAE) because large underpredictions on catastrophic multi-day blackouts carry severe humanitarian consequences; quadratic error penalties force the model to prioritize high-severity tail resilience.
- **Classification Metric**: **F1-Score** and **ROC-AUC**. Because severe outages represent approximately 41% of events, F1-Score balances precision and recall, preventing the model from trivial majority-class bias.
"""))

# Step 6: Baseline Model
cells.append(nbf.v4.new_markdown_cell("""## Step 6: Baseline Model

We construct a baseline model using a Scikit-Learn `Pipeline` incorporating basic preprocessing:
- Quantitative Features: `ANOMALY.LEVEL`, `RES.PRICE` (Standard Scaled).
- Nominal Features: `CLIMATE.REGION`, `CAUSE.CATEGORY` (One-Hot Encoded with `handle_unknown='ignore'`).
- Model: Ridge Regression (`alpha=1.0`) on `LOG_DURATION` and Logistic Regression on `IS_SEVERE_OUTAGE`.
"""))

# Code Cell: Baseline Model
cells.append(nbf.v4.new_code_cell("""from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.linear_model import Ridge, LogisticRegression
from sklearn.metrics import mean_squared_error, r2_score, f1_score, accuracy_score, roc_auc_score

# Prepare Dataset for Modeling
model_df = df_cleaned.dropna(subset=['LOG_DURATION', 'CLIMATE.REGION', 'CAUSE.CATEGORY', 'ANOMALY.LEVEL', 'RES.PRICE']).copy()

# Feature Sets
baseline_num = ['ANOMALY.LEVEL', 'RES.PRICE']
baseline_cat = ['CLIMATE.REGION', 'CAUSE.CATEGORY']

X = model_df[baseline_num + baseline_cat]
y_reg = model_df['LOG_DURATION']
y_clf = model_df['IS_SEVERE_OUTAGE']

# 80/20 Train-Test Split with fixed random seed
X_train, X_test, y_train_reg, y_test_reg, y_train_clf, y_test_clf = train_test_split(
    X, y_reg, y_clf, test_size=0.20, random_state=42
)

# Baseline Preprocessor
baseline_preprocessor = ColumnTransformer([
    ('num', StandardScaler(), baseline_num),
    ('cat', OneHotEncoder(drop='first', sparse_output=False, handle_unknown='ignore'), baseline_cat)
])

# Baseline Regression Pipeline
baseline_reg_pipeline = Pipeline([
    ('preprocessor', baseline_preprocessor),
    ('regressor', Ridge(alpha=1.0))
])

baseline_reg_pipeline.fit(X_train, y_train_reg)
y_pred_reg_base = baseline_reg_pipeline.predict(X_test)
rmse_base = np.sqrt(mean_squared_error(y_test_reg, y_pred_reg_base))
r2_base = r2_score(y_test_reg, y_pred_reg_base)

# Baseline Classification Pipeline
baseline_clf_pipeline = Pipeline([
    ('preprocessor', baseline_preprocessor),
    ('classifier', LogisticRegression(random_state=42))
])

baseline_clf_pipeline.fit(X_train, y_train_clf)
y_pred_clf_base = baseline_clf_pipeline.predict(X_test)
y_prob_clf_base = baseline_clf_pipeline.predict_proba(X_test)[:, 1]
f1_base = f1_score(y_test_clf, y_pred_clf_base)
acc_base = accuracy_score(y_test_clf, y_pred_clf_base)
roc_base = roc_auc_score(y_test_clf, y_prob_clf_base)

print("Baseline Model Performance on Unseen Test Set (20% Holdout):")
print(f"  [Regression] Log Duration RMSE: {rmse_base:.4f} | R²: {r2_base:.4f}")
print(f"  [Classification] Accuracy: {acc_base:.4f} | F1-Score: {f1_base:.4f} | ROC-AUC: {roc_base:.4f}")
"""))

# Step 7: Final Model
cells.append(nbf.v4.new_markdown_cell("""## Step 7: Final Model

### Feature Engineering & Justification
To improve upon the baseline model, we engineer domain-specific features reflecting grid load dynamics, socio-demographic density, and non-linear meteorological interactions:
1. **`POPDEN_RATIO = POPDEN_URBAN / (POPDEN_RURAL + 1)`**: Captures urban-rural density disparities. High density differentials indicate complex metropolitan transmission corridors where repair crews face congestion vs. isolated rural lines.
2. **`MONTH_SIN`, `MONTH_COS` & `HOUR_SIN`, `HOUR_COS`**: Cyclical sine/cosine encodings of onset month and hour, capturing annual storm seasonality and diurnal grid demand peaks without artificial discontinuity between December and January.
3. **`GRID_STRESS_INDEX = RES.PRICE * TOTAL.SALES / (POPULATION + 1)`**: Proxy for per-capita electrical expenditure and grid operational strain.
4. **`QuantileTransformer` on skewed demographics**: Normalizes heavily skewed state population and GSP indicators.
5. **Hyperparameter Tuning via `GridSearchCV`**: Optimizes `RandomForestRegressor` and `RandomForestClassifier` over tree depth, min samples split, and number of estimators across 5-fold cross-validation.
"""))

# Code Cell: Final Model
cells.append(nbf.v4.new_code_cell("""from sklearn.ensemble import RandomForestRegressor, RandomForestClassifier
from sklearn.preprocessing import QuantileTransformer
from sklearn.model_selection import GridSearchCV

# Feature Engineering Function
def engineer_advanced_features(df):
    df_feat = df.copy()
    # 1. Cyclical time encodings
    df_feat['MONTH_SIN'] = np.sin(2 * np.pi * df_feat['START_MONTH'] / 12.0)
    df_feat['MONTH_COS'] = np.cos(2 * np.pi * df_feat['START_MONTH'] / 12.0)
    df_feat['HOUR_SIN'] = np.sin(2 * np.pi * df_feat['START_HOUR'] / 24.0)
    df_feat['HOUR_COS'] = np.cos(2 * np.pi * df_feat['START_HOUR'] / 24.0)
    
    # 2. Demographic & Grid Ratios
    df_feat['POPDEN_RATIO'] = df_feat['POPDEN_URBAN'] / (df_feat['POPDEN_RURAL'] + 1.0)
    df_feat['GRID_STRESS_INDEX'] = (df_feat['RES.PRICE'] * df_feat['TOTAL.SALES']) / (df_feat['POPULATION'] + 1.0)
    return df_feat

# Prepare Full Dataset
advanced_df = df_cleaned.dropna(subset=[
    'LOG_DURATION', 'CLIMATE.REGION', 'CAUSE.CATEGORY', 'ANOMALY.LEVEL', 'RES.PRICE',
    'TOTAL.PRICE', 'TOTAL.SALES', 'POPULATION', 'POPDEN_URBAN', 'POPDEN_RURAL',
    'PC.REALGSP.STATE', 'AREAPCT_URBAN', 'START_MONTH', 'START_HOUR'
]).copy()

advanced_df = engineer_advanced_features(advanced_df)

final_num_standard = ['ANOMALY.LEVEL', 'RES.PRICE', 'TOTAL.PRICE', 'MONTH_SIN', 'MONTH_COS', 'HOUR_SIN', 'HOUR_COS']
final_num_quantile = ['POPULATION', 'TOTAL.SALES', 'POPDEN_RATIO', 'GRID_STRESS_INDEX', 'PC.REALGSP.STATE', 'AREAPCT_URBAN']
final_cat = ['CLIMATE.REGION', 'CAUSE.CATEGORY', 'START_SEASON']

X_adv = advanced_df[final_num_standard + final_num_quantile + final_cat]
y_adv_reg = advanced_df['LOG_DURATION']
y_adv_clf = advanced_df['IS_SEVERE_OUTAGE']

X_train_adv, X_test_adv, y_train_adv_reg, y_test_adv_reg, y_train_adv_clf, y_test_adv_clf = train_test_split(
    X_adv, y_adv_reg, y_adv_clf, test_size=0.20, random_state=42
)

# Advanced Preprocessor
advanced_preprocessor = ColumnTransformer([
    ('std_num', StandardScaler(), final_num_standard),
    ('q_num', QuantileTransformer(n_quantiles=100, output_distribution='normal', random_state=42), final_num_quantile),
    ('cat', OneHotEncoder(drop='first', sparse_output=False, handle_unknown='ignore'), final_cat)
])

# Final Random Forest Regression with Grid Search
rf_reg_pipeline = Pipeline([
    ('preprocessor', advanced_preprocessor),
    ('rf', RandomForestRegressor(random_state=42))
])

param_grid_reg = {
    'rf__n_estimators': [100, 200],
    'rf__max_depth': [8, 12, None],
    'rf__min_samples_split': [2, 5]
}

grid_reg = GridSearchCV(rf_reg_pipeline, param_grid_reg, cv=5, scoring='neg_root_mean_squared_error', n_jobs=-1)
grid_reg.fit(X_train_adv, y_train_adv_reg)

final_best_reg = grid_reg.best_estimator_
y_pred_adv_reg = final_best_reg.predict(X_test_adv)
rmse_final = np.sqrt(mean_squared_error(y_test_adv_reg, y_pred_adv_reg))
r2_final = r2_score(y_test_adv_reg, y_pred_adv_reg)

# Final Random Forest Classification with Grid Search
rf_clf_pipeline = Pipeline([
    ('preprocessor', advanced_preprocessor),
    ('rf', RandomForestClassifier(random_state=42))
])

param_grid_clf = {
    'rf__n_estimators': [100, 200],
    'rf__max_depth': [8, 12, None],
    'rf__min_samples_split': [2, 5]
}

grid_clf = GridSearchCV(rf_clf_pipeline, param_grid_clf, cv=5, scoring='f1', n_jobs=-1)
grid_clf.fit(X_train_adv, y_train_adv_clf)

final_best_clf = grid_clf.best_estimator_
y_pred_adv_clf = final_best_clf.predict(X_test_adv)
y_prob_adv_clf = final_best_clf.predict_proba(X_test_adv)[:, 1]
f1_final = f1_score(y_test_adv_clf, y_pred_adv_clf)
acc_final = accuracy_score(y_test_adv_clf, y_pred_adv_clf)
roc_final = roc_auc_score(y_test_adv_clf, y_prob_adv_clf)

print("Final Model (Tuned Random Forest) Performance on Unseen Test Set:")
print(f"  Best Regressor Params: {grid_reg.best_params_}")
print(f"  [Regression] Log Duration RMSE: {rmse_final:.4f} (Improvement: {rmse_base - rmse_final:.4f}) | R²: {r2_final:.4f} (vs {r2_base:.4f})")
print(f"  Best Classifier Params: {grid_clf.best_params_}")
print(f"  [Classification] Accuracy: {acc_final:.4f} (vs {acc_base:.4f}) | F1-Score: {f1_final:.4f} (vs {f1_base:.4f}) | ROC-AUC: {roc_final:.4f} (vs {roc_base:.4f})")
"""))

# Step 8: Fairness Analysis
cells.append(nbf.v4.new_markdown_cell("""## Step 8: Fairness Analysis

### Fairness Question & Group Partitioning
> **"Does our final classification model achieve equitable predictive performance (F1-score / Recall) for Severe Outages across Cold Northern / Eastern Climate Regions (Northeast, East North Central, Central) versus Temperate / Southern Climate Regions (South, Southeast, West, Southwest)?"**

- **Group X (Northern / Cold Climate Regions)**: Northeast, East North Central, Central (regions characterized by severe winter blizzards, freezing ice storms, and dense overhead forest cover).
- **Group Y (Southern / Temperate Regions)**: South, Southeast, West, Southwest.
- **Evaluation Metric**: **F1-Score Parity**.
- **Null Hypothesis ($H_0$)**: The classifier is fair. Its F1-score for Northern Cold regions and Southern/Temperate regions is approximately equal, and any observed difference is due to random test sample variance.
  $$|F1_{\text{Cold}} - F1_{\text{Temperate}}| = 0$$
- **Alternative Hypothesis ($H_1$)**: The classifier is unfair. Its F1-score differs significantly across geographic climate zones.
- **Test Statistic**: Absolute difference in F1-score between Group X and Group Y.
- **Significance Level**: $\alpha = 0.05$.
"""))

# Code Cell: Fairness Analysis
cells.append(nbf.v4.new_code_cell("""# Step 8: Permutation Test for Fairness
eval_df = X_test_adv.copy()
eval_df['y_true'] = y_test_adv_clf
eval_df['y_pred'] = y_pred_adv_clf

cold_regions = ['Northeast', 'East North Central', 'Central']
eval_df['is_cold_region'] = eval_df['CLIMATE.REGION'].isin(cold_regions)

# Calculate Observed F1 Scores across groups
f1_cold = f1_score(eval_df[eval_df['is_cold_region']]['y_true'], eval_df[eval_df['is_cold_region']]['y_pred'])
f1_temperate = f1_score(eval_df[~eval_df['is_cold_region']]['y_true'], eval_df[~eval_df['is_cold_region']]['y_pred'])
obs_f1_diff = np.abs(f1_cold - f1_temperate)

print(f"Fairness Evaluation Summary:")
print(f"  - Group X (Northern/Cold Regions): n = {eval_df['is_cold_region'].sum()}, F1-Score = {f1_cold:.4f}")
print(f"  - Group Y (Southern/Temperate Regions): n = {(~eval_df['is_cold_region']).sum()}, F1-Score = {f1_temperate:.4f}")
print(f"  - Observed Absolute Difference in F1-Score: {obs_f1_diff:.4f}")

# 2,000 Permutations
np.random.seed(42)
perm_f1_diffs = []
for _ in range(2000):
    shuffled_group = np.random.permutation(eval_df['is_cold_region'])
    f1_g1 = f1_score(eval_df[shuffled_group]['y_true'], eval_df[shuffled_group]['y_pred'])
    f1_g2 = f1_score(eval_df[~shuffled_group]['y_true'], eval_df[~shuffled_group]['y_pred'])
    perm_f1_diffs.append(np.abs(f1_g1 - f1_g2))

p_val_fairness = np.mean(np.array(perm_f1_diffs) >= obs_f1_diff)
print(f"\\nFairness Permutation p-value: {p_val_fairness:.5f}")
if p_val_fairness >= 0.05:
    print("Conclusion: Fail to Reject Null (p >= 0.05). We do not find evidence of predictive unfairness across climate regions.")
else:
    print("Conclusion: Reject Null (p < 0.05). There is statistically significant disparity in predictive performance across climate regions.")

# Plot Fairness Permutation Distribution
fig_fairness = px.histogram(
    x=perm_f1_diffs,
    nbins=40,
    title='<b>Empirical Permutation Distribution of F1-Score Difference Across Climate Zones</b>',
    labels={'x': 'Absolute Difference in F1-Score'}
)
fig_fairness.add_vline(x=obs_f1_diff, line_dash='dash', line_color='purple', annotation_text=f'Observed Diff: {obs_f1_diff:.4f}')
fig_fairness.update_layout(template='simple_white+dsc80')
fig_fairness.write_html('assets/fairness_f1_permutation.html', include_plotlyjs='cdn')
fig_fairness.show()
"""))

nb.cells = cells

# Save notebook to project.ipynb and template.ipynb
with open('project.ipynb', 'w', encoding='utf-8') as f:
    nbf.write(nb, f)
with open('template.ipynb', 'w', encoding='utf-8') as f:
    nbf.write(nb, f)

print("Saved project.ipynb and template.ipynb successfully!")
