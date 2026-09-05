import pandas as pd
import numpy as np
from scipy import stats
import sys

sys.stdout.reconfigure(encoding='utf-8')

# Load and clean
df_raw = pd.read_excel('data/outage.xlsx', sheet_name='Masterdata', header=5)
df = df_raw.iloc[1:].reset_index(drop=True)
if 'variables' in df.columns:
    df = df.drop(columns=['variables'])

# Numeric conversions
numeric_cols = ['YEAR', 'MONTH', 'ANOMALY.LEVEL', 'OUTAGE.DURATION', 'DEMAND.LOSS.MW', 'CUSTOMERS.AFFECTED',
                'RES.PRICE', 'COM.PRICE', 'IND.PRICE', 'TOTAL.PRICE', 'RES.SALES', 'COM.SALES', 'IND.SALES', 'TOTAL.SALES',
                'POPULATION', 'POPPCT_URBAN', 'POPDEN_URBAN', 'POPDEN_RURAL', 'PC.REALGSP.STATE']
for col in numeric_cols:
    df[col] = pd.to_numeric(df[col], errors='coerce')

# Clean timestamps
def clean_datetime_col(df, date_col, time_col, out_col):
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
    df[out_col] = pd.Series(combined, dtype='datetime64[ns]')
    return df

df = clean_datetime_col(df, 'OUTAGE.START.DATE', 'OUTAGE.START.TIME', 'OUTAGE.START')
df = clean_datetime_col(df, 'OUTAGE.RESTORATION.DATE', 'OUTAGE.RESTORATION.TIME', 'OUTAGE.RESTORATION')

# ==========================================
# 1. MISSINGNESS PERMUTATION TESTS
# ==========================================
print("=== 1. MISSINGNESS ANALYSIS ===")
# A. Missingness of CUSTOMERS.AFFECTED vs CAUSE.CATEGORY (Categorical -> TVD)
df['cust_missing'] = df['CUSTOMERS.AFFECTED'].isnull()

def tvd(dist1, dist2):
    return 0.5 * np.sum(np.abs(dist1 - dist2))

dist_table = df.pivot_table(index='CAUSE.CATEGORY', columns='cust_missing', aggfunc='size', fill_value=0)
dist_table_prop = dist_table / dist_table.sum(axis=0)
obs_tvd = tvd(dist_table_prop[False], dist_table_prop[True])

np.random.seed(42)
tvd_sims = []
for _ in range(5000):
    shuffled_missing = np.random.permutation(df['cust_missing'])
    shuffled_table = df.assign(shuffled_missing=shuffled_missing).pivot_table(
        index='CAUSE.CATEGORY', columns='shuffled_missing', aggfunc='size', fill_value=0
    )
    shuffled_prop = shuffled_table / shuffled_table.sum(axis=0)
    tvd_sims.append(tvd(shuffled_prop[False], shuffled_prop[True]))

p_val_cust_cause = np.mean(np.array(tvd_sims) >= obs_tvd)
print(f"CUSTOMERS.AFFECTED missingness vs CAUSE.CATEGORY: Obs TVD = {obs_tvd:.4f}, p-value = {p_val_cust_cause:.4f} (DEPENDENT / MAR)")

# B. Missingness of CUSTOMERS.AFFECTED vs ANOMALY.LEVEL (Quantitative -> Difference in Means)
obs_mean_diff = np.abs(df.groupby('cust_missing')['ANOMALY.LEVEL'].mean().diff().iloc[-1])
mean_diff_sims = []
valid_anom = df[['cust_missing', 'ANOMALY.LEVEL']].dropna(subset=['ANOMALY.LEVEL'])
for _ in range(5000):
    shuffled = np.random.permutation(valid_anom['cust_missing'])
    mean_diff_sims.append(np.abs(valid_anom.assign(shuffled=shuffled).groupby('shuffled')['ANOMALY.LEVEL'].mean().diff().iloc[-1]))

p_val_cust_anom = np.mean(np.array(mean_diff_sims) >= obs_mean_diff)
print(f"CUSTOMERS.AFFECTED missingness vs ANOMALY.LEVEL: Obs Diff = {obs_mean_diff:.4f}, p-value = {p_val_cust_anom:.4f} (NOT DEPENDENT / MCAR-like)")

# ==========================================
# 2. STEP 4 HYPOTHESIS TESTING
# ==========================================
print("\n=== 2. STEP 4 HYPOTHESIS TESTING ===")
# Question: Do Severe Weather outages have a significantly longer duration than Intentional Attack / Equipment Failure outages?
# Subset to non-null durations
weather_df = df[df['CAUSE.CATEGORY'] == 'severe weather']['OUTAGE.DURATION'].dropna()
non_weather_df = df[df['CAUSE.CATEGORY'].isin(['intentional attack', 'equipment failure'])]['OUTAGE.DURATION'].dropna()

print(f"Severe Weather n={len(weather_df)}, mean={weather_df.mean():.1f} mins, median={weather_df.median():.1f} mins")
print(f"Intentional Attack / Equip Failure n={len(non_weather_df)}, mean={non_weather_df.mean():.1f} mins, median={non_weather_df.median():.1f} mins")

# Test statistic: Difference in mean log-duration or difference in means
subset = df[df['CAUSE.CATEGORY'].isin(['severe weather', 'intentional attack', 'equipment failure'])].dropna(subset=['OUTAGE.DURATION']).copy()
subset['is_severe_weather'] = subset['CAUSE.CATEGORY'] == 'severe weather'

obs_diff_means = subset.groupby('is_severe_weather')['OUTAGE.DURATION'].mean()[True] - subset.groupby('is_severe_weather')['OUTAGE.DURATION'].mean()[False]
print(f"Observed Difference in Mean Duration: {obs_diff_means:.2f} minutes ({obs_diff_means/60:.2f} hours)")

perm_diffs = []
for _ in range(5000):
    shuffled_labels = np.random.permutation(subset['is_severe_weather'])
    d = subset.assign(shuffled=shuffled_labels).groupby('shuffled')['OUTAGE.DURATION'].mean()
    perm_diffs.append(d[True] - d[False])

p_val_hyp = np.mean(np.array(perm_diffs) >= obs_diff_means)
print(f"Hypothesis Test p-value: {p_val_hyp:.5f}")
