import pandas as pd
import numpy as np
np.set_printoptions(legacy='1.21')
import itertools
import plotly.express as px
import statsmodels.api as sm
from pathlib import Path
from sklearn.preprocessing import Binarizer, QuantileTransformer, FunctionTransformer

import warnings
warnings.filterwarnings('ignore')


def best_transformation():
    return 1


def create_ordinal(df):
    cut_map = {'Fair': 0, 'Good': 1, 'Very Good': 2, 'Premium': 3, 'Ideal': 4}
    color_map = {'J': 0, 'I': 1, 'H': 2, 'G': 3, 'F': 4, 'E': 5, 'D': 6}
    clarity_map = {'I1': 0, 'SI2': 1, 'SI1': 2, 'VS2': 3, 'VS1': 4, 'VVS2': 5, 'VVS1': 6, 'IF': 7}
    out = pd.DataFrame(index=df.index)
    if 'cut' in df:
        out['ordinal_cut'] = df['cut'].map(cut_map)
    if 'color' in df:
        out['ordinal_color'] = df['color'].map(color_map)
    if 'clarity' in df:
        out['ordinal_clarity'] = df['clarity'].map(clarity_map)
    return out


def create_one_hot(df):
    cols = df.select_dtypes(include=['object', 'category', 'string']).columns
    out = pd.DataFrame(index=df.index)
    for col in cols:
        for val in df[col].unique():
            out[f'one_hot_{col}_{val}'] = (df[col] == val).astype(int)
    return out


def create_proportions(df):
    cols = df.select_dtypes(include=['object', 'category', 'string']).columns
    out = pd.DataFrame(index=df.index)
    for col in cols:
        props = df[col].value_counts(normalize=True)
        out[f'proportion_{col}'] = df[col].map(props)
    return out


def create_quadratics(df):
    quant_cols = [c for c in df.select_dtypes(include=np.number).columns if c != 'price']
    out = pd.DataFrame(index=df.index)
    for c1, c2 in itertools.combinations(quant_cols, 2):
        out[f'{c1} * {c2}'] = df[c1] * df[c2]
    return out


def comparing_performance():
    return [
        0.8493305264354858,
        1548.5331930613177,
        'x',
        'carat * x',
        'ordinal_color',
        1434.8400089047336
    ]


class TransformDiamonds(object):
    
    def __init__(self, diamonds):
        self.data = diamonds
        
    def transform_carat(self, data):
        return Binarizer(threshold=1.0).fit_transform(data[['carat']])
    
    def transform_to_quantile(self, data):
        qt = QuantileTransformer(n_quantiles=100)
        qt.fit(self.data[['carat']])
        return qt.transform(data[['carat']])
    
    def transform_to_depth_pct(self, data):
        def calc_depth(arr):
            arr = np.asarray(arr)
            return 100 * 2 * arr[:, 2] / (arr[:, 0] + arr[:, 1])
        return FunctionTransformer(calc_depth).fit_transform(data[['x', 'y', 'z']])
