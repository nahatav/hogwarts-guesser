import pandas as pd
import numpy as np

df_raw = pd.read_excel('data/outage.xlsx', sheet_name='Masterdata', header=5)
df = df_raw.iloc[1:].reset_index(drop=True)
if 'variables' in df.columns:
    df = df.drop(columns=['variables'])

# Convert time columns to strings and combine with dates
def clean_datetime_col(df, date_col, time_col, out_col):
    dates = pd.to_datetime(df[date_col], errors='coerce')
    # time_col might be datetime.time object
    times = df[time_col].apply(lambda t: str(t) if pd.notnull(t) else np.nan)
    # create combined datetime
    combined = []
    for d, t in zip(dates, times):
        if pd.isnull(d) or pd.isnull(t):
            combined.append(pd.NaT)
        else:
            try:
                # if t is string like '17:00:00'
                dt_str = f"{d.strftime('%Y-%m-%d')} {t}"
                combined.append(pd.to_datetime(dt_str))
            except Exception:
                combined.append(pd.NaT)
    df[out_col] = pd.Series(combined, dtype='datetime64[ns]')
    return df

df = clean_datetime_col(df, 'OUTAGE.START.DATE', 'OUTAGE.START.TIME', 'OUTAGE.START')
df = clean_datetime_col(df, 'OUTAGE.RESTORATION.DATE', 'OUTAGE.RESTORATION.TIME', 'OUTAGE.RESTORATION')

print("OUTAGE.START non-null:", df['OUTAGE.START'].notnull().sum())
print("OUTAGE.RESTORATION non-null:", df['OUTAGE.RESTORATION'].notnull().sum())
print("Sample combined rows:")
print(df[['OUTAGE.START.DATE', 'OUTAGE.START.TIME', 'OUTAGE.START', 'OUTAGE.RESTORATION', 'OUTAGE.DURATION']].head())

# Check calculated duration vs OUTAGE.DURATION column
calc_duration = (df['OUTAGE.RESTORATION'] - df['OUTAGE.START']).dt.total_seconds() / 60
print("\nDifference between calculated duration and OUTAGE.DURATION:")
diff = (calc_duration - df['OUTAGE.DURATION'].astype(float)).dropna()
print(diff.describe())
