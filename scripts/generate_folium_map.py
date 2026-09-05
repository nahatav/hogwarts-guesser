import pandas as pd
import numpy as np
import folium
from folium.plugins import MarkerCluster

# State Centroids dictionary for continental US states
state_coords = {
    'AL': (32.806671, -86.791130), 'AZ': (33.729759, -111.431221), 'AR': (34.969704, -92.373123),
    'CA': (36.116203, -119.681564), 'CO': (39.059811, -105.311104), 'CT': (41.597782, -72.755371),
    'DE': (39.318523, -75.507141), 'FL': (27.766279, -81.686783), 'GA': (33.040619, -83.643074),
    'ID': (44.240459, -114.478828), 'IL': (40.349457, -88.986137), 'IN': (39.849426, -86.258278),
    'IA': (42.011539, -93.210526), 'KS': (38.526600, -96.726486), 'KY': (37.668140, -84.670067),
    'LA': (31.169546, -91.867805), 'ME': (44.693947, -69.381927), 'MD': (39.063946, -76.802101),
    'MA': (42.230171, -71.530106), 'MI': (43.326618, -84.536095), 'MN': (45.694454, -93.900192),
    'MS': (32.741646, -89.678696), 'MO': (38.456085, -92.288368), 'MT': (46.921925, -110.454353),
    'NE': (41.125370, -98.268082), 'NV': (38.313515, -117.055374), 'NH': (43.452492, -71.563896),
    'NJ': (40.298904, -74.521011), 'NM': (34.840515, -106.248482), 'NY': (42.165726, -74.948051),
    'NC': (35.630066, -79.806419), 'ND': (47.528912, -99.784012), 'OH': (40.388783, -82.764915),
    'OK': (35.565342, -96.928917), 'OR': (44.572021, -122.070938), 'PA': (40.590752, -77.209755),
    'RI': (41.680893, -71.511780), 'SC': (33.856892, -80.945007), 'SD': (44.299782, -99.438828),
    'TN': (35.747845, -86.692345), 'TX': (31.054487, -97.563461), 'UT': (40.150032, -111.862434),
    'VT': (44.045876, -72.710686), 'VA': (37.769337, -78.169968), 'WA': (47.400902, -121.490494),
    'WV': (38.491226, -80.954453), 'WI': (44.268543, -89.616508), 'WY': (42.755966, -107.302490)
}

df_raw = pd.read_excel('data/outage.xlsx', sheet_name='Masterdata', header=5)
df = df_raw.iloc[1:].reset_index(drop=True)

# Aggregate state outages
state_stats = df.groupby('POSTAL.CODE').agg(
    total_outages=('OBS', 'count'),
    mean_duration_hrs=('OUTAGE.DURATION', lambda x: pd.to_numeric(x, errors='coerce').mean() / 60.0),
    total_customers=('CUSTOMERS.AFFECTED', lambda x: pd.to_numeric(x, errors='coerce').sum()),
    top_cause=('CAUSE.CATEGORY', lambda x: x.mode()[0] if not x.empty else 'N/A')
).reset_index()

m = folium.Map(location=[38.5, -96.5], zoom_start=4, tiles='CartoDB positron')

cause_colors = {
    'severe weather': '#d62728',
    'intentional attack': '#ff7f0e',
    'system operability disruption': '#1f77b4',
    'equipment failure': '#9467bd',
    'public appeal': '#2ca02c',
    'fuel supply emergency': '#8c564b',
    'islanding': '#e377c2'
}

for _, row in state_stats.iterrows():
    st = row['POSTAL.CODE']
    if st in state_coords:
        lat, lon = state_coords[st]
        outages = row['total_outages']
        mean_dur = row['mean_duration_hrs']
        top_c = row['top_cause']
        cust = row['total_customers']
        
        radius = np.sqrt(outages) * 3.5
        color = cause_colors.get(top_c, '#333333')
        
        popup_html = f"""
        <div style="font-family: Arial; font-size: 12px; width: 200px;">
            <h4 style="margin: 0 0 5px 0; color: #111;"><b>State: {st}</b></h4>
            <b>Total Outages:</b> {outages}<br>
            <b>Mean Duration:</b> {mean_dur:.1f} hrs<br>
            <b>Total Customers Affected:</b> {int(cust):,}<br>
            <b>Top Cause:</b> <span style="color:{color};"><b>{top_c}</b></span>
        </div>
        """
        
        folium.CircleMarker(
            location=[lat, lon],
            radius=max(radius, 5),
            color=color,
            fill=True,
            fill_color=color,
            fill_opacity=0.6,
            popup=folium.Popup(popup_html, max_width=250),
            tooltip=f"{st}: {outages} outages (Top: {top_c})"
        ).add_to(m)

m.save('assets/power_outages_geospatial_map.html')
print("Saved assets/power_outages_geospatial_map.html successfully!")
