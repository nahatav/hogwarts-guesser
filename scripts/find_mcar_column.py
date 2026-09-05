import pandas as pd
import numpy as np
import sys

sys.stdout.reconfigure(encoding='utf-8')

# Load and clean
df_raw = pd.read_excel('data/outage.xlsx', sheet_name='Masterdata', header=5)
df = df_raw.iloc[1:].reset_index(drop=True)
if 'variables' in df.columns:
    df = df.drop(columns=['variables'])

for c in ['DEMAND.LOSS.MW', 'CUSTOMERS.AFFECTED', 'OUTAGE.DURATION', 'PCT_LAND', 'PCT_WATER_INLAND', 'MONTH', 'YEAR', 'POPDEN_RURAL']:
    df[c] = pd.to_numeric(df[c], errors='coerce')

df['cust_missing'] = df['CUSTOMERS.AFFECTED'].isnull()
df['duration_missing'] = df['OUTAGE.DURATION'].isnull()
df['demand_missing'] = df['DEMAND.LOSS.MW'].isnull()

print("Testing columns for missingness of DEMAND.LOSS.MW:")
for col in ['PCT_LAND', 'PCT_WATER_INLAND', 'MONTH', 'YEAR', 'POPDEN_RURAL']:
    valid = df[['demand_missing', col]].dropna()
    mean_diff = np.abs(valid.groupby('demand_missing')[col].mean().diff().iloc[-1])
    sims = []
    for _ in range(1000):
        shuffled = np.random.permutation(valid['demand_missing'])
        sims.append(np.abs(valid.assign(shuffled=shuffled).groupby('shuffled')[col].mean().diff().iloc[-1]))
    p_val = np.mean(np.array(sims) >= mean_diff)
    print(f"DEMAND.LOSS.MW missingness vs {col}: Obs Diff = {mean_diff:.4f}, p-val = {p_val:.4f}")

print("\nTesting columns for missingness of CUSTOMERS.AFFECTED:")
for col in ['PCT_LAND', 'PCT_WATER_INLAND', 'MONTH', 'YEAR', 'POPDEN_RURAL']:
    valid = df[['cust_missing', col]].dropna()
    mean_diff = np.abs(valid.groupby('cust_missing')[col].mean().diff().iloc[-1])
    sims = []
    for _ in range(1000):
        shuffled = np.random.permutation(valid['cust_missing'])
        sims.append(np.abs(valid.assign(shuffled=shuffled).groupby('shuffled')[col].mean().diff().iloc[-1]))
    p_val = np.mean(np.array(sims) >= mean_diff)
    print(f"CUSTOMERS.AFFECTED missingness vs {col}: Obs Diff = {mean_diff:.4f}, p-val = {p_val:.4f}")
