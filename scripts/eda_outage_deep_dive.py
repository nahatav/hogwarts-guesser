import pandas as pd
import numpy as np
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

# Load dataset
df_raw = pd.read_excel('data/outage.xlsx', sheet_name='Masterdata', header=5)
units = df_raw.iloc[0].to_dict()
df = df_raw.iloc[1:].reset_index(drop=True)

if 'variables' in df.columns:
    df = df.drop(columns=['variables'])

print("Initial shape:", df.shape)

# Let's inspect data cleaning
# 1. Combining start date and start time
# OUTAGE.START.DATE is datetime or string, OUTAGE.START.TIME is datetime.time or string
print("Sample start dates:", df['OUTAGE.START.DATE'].head(3))
print("Sample start times:", df['OUTAGE.START.TIME'].head(3))
print("Sample resto dates:", df['OUTAGE.RESTORATION.DATE'].head(3))
print("Sample resto times:", df['OUTAGE.RESTORATION.TIME'].head(3))

# Let's clean datetime
def combine_date_time(date_col, time_col):
    dates = pd.to_datetime(date_col)
    # time_col might be datetime.time or str or NaT
    times = pd.to_timedelta(time_col.astype(str))
    # Let's check how time is formatted
    return dates

# Check Cause Categories
print("\nCause Categories value counts:")
print(df['CAUSE.CATEGORY'].value_counts(dropna=False))

# Check Climate Regions
print("\nClimate Regions value counts:")
print(df['CLIMATE.REGION'].value_counts(dropna=False))

# Check Missing Values
print("\nMissing values count per column:")
missing = df.isnull().sum()
print(missing[missing > 0].sort_values(ascending=False))

# Check Outage Duration
durations = pd.to_numeric(df['OUTAGE.DURATION'], errors='coerce')
print("\nOutage Duration (mins) summary:")
print(durations.describe())

# Check Customers Affected
cust = pd.to_numeric(df['CUSTOMERS.AFFECTED'], errors='coerce')
print("\nCustomers Affected summary:")
print(cust.describe())

# Check Demand Loss
dem = pd.to_numeric(df['DEMAND.LOSS.MW'], errors='coerce')
print("\nDemand Loss (MW) summary:")
print(dem.describe())

# Check Anomaly Level
anom = pd.to_numeric(df['ANOMALY.LEVEL'], errors='coerce')
print("\nAnomaly Level summary:")
print(anom.describe())
