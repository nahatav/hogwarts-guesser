`python
In [1]:


from dsc80_utils import *
`

`python
In [1]:
`

`python
In [2]:


# The dataset is built into plotly (and seaborn)!
# We shuffle here so that the head of the DataFrame contains rows 
# where smoker is Yes and smoker is No, purely for illustration purposes.
np.random.seed(1)
tips = px.data.tips().sample(frac=1).reset_index(drop=True)
`

`python
In [2]:
`

Lecture 15 – Feature Engineering¶DSC 80, Summer 2026¶

`python
Lecture 15 – Feature Engineering¶DSC 80, Summer 2026¶
`

Lecture 15 – Feature Engineering¶DSC 80, Summer 2026¶

`python
Lecture 15 – Feature Engineering¶DSC 80, Summer 2026¶
`

Lecture 15 – Feature Engineering¶DSC 80, Summer 2026¶

`python

`

Agenda 📆¶
Review: Predicting tips 🧑‍🍳.
Feature engineering.
Example: Predicting tips 🧑‍🍳.
One hot encoding.


Example: Predicting ratings ⭐️.
Dropping features.
Ordinal encoding.


Example: Horsepower 🚗.
Quantitative scaling.




Feature engineering in sklearn.
Transformer classes.

`python
Agenda 📆¶
Review: Predicting tips 🧑‍🍳.
Feature engineering.
Example: Predicting tips 🧑‍🍳.
One hot encoding.


Example: Predicting ratings ⭐️.
Dropping features.
Ordinal encoding.


Example: Horsepower 🚗.
Quantitative scaling.




Feature engineering in sklearn.
Transformer classes.
`

Agenda 📆¶
Review: Predicting tips 🧑‍🍳.
Feature engineering.
Example: Predicting tips 🧑‍🍳.
One hot encoding.


Example: Predicting ratings ⭐️.
Dropping features.
Ordinal encoding.


Example: Horsepower 🚗.
Quantitative scaling.




Feature engineering in sklearn.
Transformer classes.

`python
Agenda 📆¶
Review: Predicting tips 🧑‍🍳.
Feature engineering.
Example: Predicting tips 🧑‍🍳.
One hot encoding.


Example: Predicting ratings ⭐️.
Dropping features.
Ordinal encoding.


Example: Horsepower 🚗.
Quantitative scaling.




Feature engineering in sklearn.
Transformer classes.
`

Agenda 📆¶
Review: Predicting tips 🧑‍🍳.
Feature engineering.
Example: Predicting tips 🧑‍🍳.
One hot encoding.


Example: Predicting ratings ⭐️.
Dropping features.
Ordinal encoding.


Example: Horsepower 🚗.
Quantitative scaling.




Feature engineering in sklearn.
Transformer classes.

`python

`

Review: Predicting tips 🧑‍🍳¶

`python
Review: Predicting tips 🧑‍🍳¶
`

Review: Predicting tips 🧑‍🍳¶

`python
Review: Predicting tips 🧑‍🍳¶
`

Review: Predicting tips 🧑‍🍳¶

`python

`

`python
In [3]:


tips
`

Output:
Out[3]:







total_bill
tip
sex
smoker
day
time
size




0
3.07
1.00
Female
Yes
Sat
Dinner
1


1
18.78
3.00
Female
No
Thur
Dinner
2


2
26.59
3.41
Male
Yes
Sat
Dinner
3


...
...
...
...
...
...
...
...


241
17.47
3.50
Female
No
Thur
Lunch
2


242
10.07
1.25
Male
No
Sat
Dinner
2


243
16.93
3.07
Female
No
Sat
Dinner
3



244 rows × 7 columns

`python
In [3]:


tips
`

`python
In [3]:
`

Output:
Out[3]:







total_bill
tip
sex
smoker
day
time
size




0
3.07
1.00
Female
Yes
Sat
Dinner
1


1
18.78
3.00
Female
No
Thur
Dinner
2


2
26.59
3.41
Male
Yes
Sat
Dinner
3


...
...
...
...
...
...
...
...


241
17.47
3.50
Female
No
Thur
Lunch
2


242
10.07
1.25
Male
No
Sat
Dinner
2


243
16.93
3.07
Female
No
Sat
Dinner
3



244 rows × 7 columns

Output:
Out[3]:







total_bill
tip
sex
smoker
day
time
size




0
3.07
1.00
Female
Yes
Sat
Dinner
1


1
18.78
3.00
Female
No
Thur
Dinner
2


2
26.59
3.41
Male
Yes
Sat
Dinner
3


...
...
...
...
...
...
...
...


241
17.47
3.50
Female
No
Thur
Lunch
2


242
10.07
1.25
Male
No
Sat
Dinner
2


243
16.93
3.07
Female
No
Sat
Dinner
3



244 rows × 7 columns

Linear models¶Last time, we fit three linear models to predict restaurant tips:

Constant model: $\text{predicted tip} = h$.
Simple linear regression: $\text{predicted tip} = w_0 + w_1 \cdot \text{total bill}$.
Multiple linear regression: $\text{predicted tip} = w_0 + w_1 \cdot \text{total bill} + w_2 \cdot \text{table size}$.

`python
Linear models¶Last time, we fit three linear models to predict restaurant tips:

Constant model: $\text{predicted tip} = h$.
Simple linear regression: $\text{predicted tip} = w_0 + w_1 \cdot \text{total bill}$.
Multiple linear regression: $\text{predicted tip} = w_0 + w_1 \cdot \text{total bill} + w_2 \cdot \text{table size}$.
`

Linear models¶Last time, we fit three linear models to predict restaurant tips:

Constant model: $\text{predicted tip} = h$.
Simple linear regression: $\text{predicted tip} = w_0 + w_1 \cdot \text{total bill}$.
Multiple linear regression: $\text{predicted tip} = w_0 + w_1 \cdot \text{total bill} + w_2 \cdot \text{table size}$.

`python
Linear models¶Last time, we fit three linear models to predict restaurant tips:

Constant model: $\text{predicted tip} = h$.
Simple linear regression: $\text{predicted tip} = w_0 + w_1 \cdot \text{total bill}$.
Multiple linear regression: $\text{predicted tip} = w_0 + w_1 \cdot \text{total bill} + w_2 \cdot \text{table size}$.
`

Linear models¶Last time, we fit three linear models to predict restaurant tips:

Constant model: $\text{predicted tip} = h$.
Simple linear regression: $\text{predicted tip} = w_0 + w_1 \cdot \text{total bill}$.
Multiple linear regression: $\text{predicted tip} = w_0 + w_1 \cdot \text{total bill} + w_2 \cdot \text{table size}$.

`python

`

In the constant model case, we know that the optimal model parameter, when using squared loss, is $h^* = \text{mean tip}$.

`python
In the constant model case, we know that the optimal model parameter, when using squared loss, is $h^* = \text{mean tip}$.
`

In the constant model case, we know that the optimal model parameter, when using squared loss, is $h^* = \text{mean tip}$.

`python
In the constant model case, we know that the optimal model parameter, when using squared loss, is $h^* = \text{mean tip}$.
`

In the constant model case, we know that the optimal model parameter, when using squared loss, is $h^* = \text{mean tip}$.

`python

`

`python
In [4]:


mean_tip = tips['tip'].mean()
`

`python
In [4]:
`

`python
In [5]:


mean_tip
`

Output:
Out[5]:

2.99827868852459

`python
In [5]:


mean_tip
`

`python
In [5]:
`

Output:
Out[5]:

2.99827868852459

Output:
Out[5]:

2.99827868852459

In the other two cases, we used the LinearRegression class from sklearn to help us find optimal model parameters, again using squared loss.

`python
In the other two cases, we used the LinearRegression class from sklearn to help us find optimal model parameters, again using squared loss.
`

In the other two cases, we used the LinearRegression class from sklearn to help us find optimal model parameters, again using squared loss.

`python
In the other two cases, we used the LinearRegression class from sklearn to help us find optimal model parameters, again using squared loss.
`

In the other two cases, we used the LinearRegression class from sklearn to help us find optimal model parameters, again using squared loss.

`python

`

`python
In [6]:


from sklearn.linear_model import LinearRegression

model = LinearRegression()
model.fit(tips[['total_bill']], y=tips['tip'])
model.intercept_, model.coef_
`

Output:
Out[6]:

(0.9202696135546717, array([0.105]))

`python
In [6]:


from sklearn.linear_model import LinearRegression

model = LinearRegression()
model.fit(tips[['total_bill']], y=tips['tip'])
model.intercept_, model.coef_
`

`python
In [6]:
`

Output:
Out[6]:

(0.9202696135546717, array([0.105]))

Output:
Out[6]:

(0.9202696135546717, array([0.105]))

`python
In [7]:


model_two = LinearRegression()
model_two.fit(tips[['total_bill', 'size']], y=tips['tip'])
model_two.intercept_, model_two.coef_
`

Output:
Out[7]:

(0.6689447408125013, array([0.093, 0.193]))

`python
In [7]:


model_two = LinearRegression()
model_two.fit(tips[['total_bill', 'size']], y=tips['tip'])
model_two.intercept_, model_two.coef_
`

`python
In [7]:
`

Output:
Out[7]:

(0.6689447408125013, array([0.093, 0.193]))

Output:
Out[7]:

(0.6689447408125013, array([0.093, 0.193]))

Our fitted models are approximately:

Constant model: $\text{predicted tip} = 3.00$.
Simple linear regression: $\text{predicted tip} = 0.92 + 0.105 \cdot \text{total bill}$.
Multiple linear regression: $\text{predicted tip} = 0.67 + 0.093 \cdot \text{total bill} + 0.193 \cdot \text{table size}$.

`python
Our fitted models are approximately:

Constant model: $\text{predicted tip} = 3.00$.
Simple linear regression: $\text{predicted tip} = 0.92 + 0.105 \cdot \text{total bill}$.
Multiple linear regression: $\text{predicted tip} = 0.67 + 0.093 \cdot \text{total bill} + 0.193 \cdot \text{table size}$.
`

Our fitted models are approximately:

Constant model: $\text{predicted tip} = 3.00$.
Simple linear regression: $\text{predicted tip} = 0.92 + 0.105 \cdot \text{total bill}$.
Multiple linear regression: $\text{predicted tip} = 0.67 + 0.093 \cdot \text{total bill} + 0.193 \cdot \text{table size}$.

`python
Our fitted models are approximately:

Constant model: $\text{predicted tip} = 3.00$.
Simple linear regression: $\text{predicted tip} = 0.92 + 0.105 \cdot \text{total bill}$.
Multiple linear regression: $\text{predicted tip} = 0.67 + 0.093 \cdot \text{total bill} + 0.193 \cdot \text{table size}$.
`

Our fitted models are approximately:

Constant model: $\text{predicted tip} = 3.00$.
Simple linear regression: $\text{predicted tip} = 0.92 + 0.105 \cdot \text{total bill}$.
Multiple linear regression: $\text{predicted tip} = 0.67 + 0.093 \cdot \text{total bill} + 0.193 \cdot \text{table size}$.

`python

`

Root mean squared error¶To compare the performance of different models, we used the root mean squared error (RMSE).
$$\text{RMSE} = \sqrt{\frac{1}{n} \sum_{i = 1}^n \big( y_i - H(x_i) \big)^2}$$

`python
Root mean squared error¶To compare the performance of different models, we used the root mean squared error (RMSE).
$$\text{RMSE} = \sqrt{\frac{1}{n} \sum_{i = 1}^n \big( y_i - H(x_i) \big)^2}$$
`

Root mean squared error¶To compare the performance of different models, we used the root mean squared error (RMSE).
$$\text{RMSE} = \sqrt{\frac{1}{n} \sum_{i = 1}^n \big( y_i - H(x_i) \big)^2}$$

`python
Root mean squared error¶To compare the performance of different models, we used the root mean squared error (RMSE).
$$\text{RMSE} = \sqrt{\frac{1}{n} \sum_{i = 1}^n \big( y_i - H(x_i) \big)^2}$$
`

Root mean squared error¶To compare the performance of different models, we used the root mean squared error (RMSE).
$$\text{RMSE} = \sqrt{\frac{1}{n} \sum_{i = 1}^n \big( y_i - H(x_i) \big)^2}$$

`python

`

`python
In [8]:


def rmse(actual, pred):
    return np.sqrt(np.mean((actual - pred) ** 2))

rmse_dict = {}
rmse_dict['constant tip amount'] = rmse(tips['tip'], mean_tip)

rmse_dict['one feature: total bill'] = rmse(tips['tip'], model.predict(tips[['total_bill']]))

rmse_dict['two features'] = rmse(tips['tip'], model_two.predict(tips[['total_bill', 'size']]))

pd.DataFrame({'rmse': rmse_dict.values()}, index=rmse_dict.keys())
`

Output:
Out[8]:







rmse




constant tip amount
1.38


one feature: total bill
1.02


two features
1.01

`python
In [8]:


def rmse(actual, pred):
    return np.sqrt(np.mean((actual - pred) ** 2))

rmse_dict = {}
rmse_dict['constant tip amount'] = rmse(tips['tip'], mean_tip)

rmse_dict['one feature: total bill'] = rmse(tips['tip'], model.predict(tips[['total_bill']]))

rmse_dict['two features'] = rmse(tips['tip'], model_two.predict(tips[['total_bill', 'size']]))

pd.DataFrame({'rmse': rmse_dict.values()}, index=rmse_dict.keys())
`

`python
In [8]:
`

Output:
Out[8]:







rmse




constant tip amount
1.38


one feature: total bill
1.02


two features
1.01

Output:
Out[8]:







rmse




constant tip amount
1.38


one feature: total bill
1.02


two features
1.01

Another way of assessing the quality of the model: $R^2$¶

`python
Another way of assessing the quality of the model: $R^2$¶
`

Another way of assessing the quality of the model: $R^2$¶

`python
Another way of assessing the quality of the model: $R^2$¶
`

Another way of assessing the quality of the model: $R^2$¶

`python

`

$R^2$, or the coefficient of determination, is a measure of the quality of a linear fit.

`python
$R^2$, or the coefficient of determination, is a measure of the quality of a linear fit.
`

$R^2$, or the coefficient of determination, is a measure of the quality of a linear fit.

`python
$R^2$, or the coefficient of determination, is a measure of the quality of a linear fit.
`

$R^2$, or the coefficient of determination, is a measure of the quality of a linear fit.

`python

`

There are a few equivalent ways of computing it, assuming your model is linear and has an intercept term:

$$R^2 = \frac{\text{var}(\text{predicted $y$ values})}{\text{var}(\text{actual $y$ values})}$$
$$R^2 = \left[ \text{correlation}(\text{predicted $y$ values}, \text{actual $y$ values}) \right]^2$$

`python
There are a few equivalent ways of computing it, assuming your model is linear and has an intercept term:

$$R^2 = \frac{\text{var}(\text{predicted $y$ values})}{\text{var}(\text{actual $y$ values})}$$
$$R^2 = \left[ \text{correlation}(\text{predicted $y$ values}, \text{actual $y$ values}) \right]^2$$
`

There are a few equivalent ways of computing it, assuming your model is linear and has an intercept term:

$$R^2 = \frac{\text{var}(\text{predicted $y$ values})}{\text{var}(\text{actual $y$ values})}$$
$$R^2 = \left[ \text{correlation}(\text{predicted $y$ values}, \text{actual $y$ values}) \right]^2$$

`python
There are a few equivalent ways of computing it, assuming your model is linear and has an intercept term:

$$R^2 = \frac{\text{var}(\text{predicted $y$ values})}{\text{var}(\text{actual $y$ values})}$$
$$R^2 = \left[ \text{correlation}(\text{predicted $y$ values}, \text{actual $y$ values}) \right]^2$$
`

There are a few equivalent ways of computing it, assuming your model is linear and has an intercept term:

$$R^2 = \frac{\text{var}(\text{predicted $y$ values})}{\text{var}(\text{actual $y$ values})}$$
$$R^2 = \left[ \text{correlation}(\text{predicted $y$ values}, \text{actual $y$ values}) \right]^2$$

`python

`

Interpretation: $R^2$ is the proportion of variance in $y$ that the linear model explains.

`python
Interpretation: $R^2$ is the proportion of variance in $y$ that the linear model explains.
`

Interpretation: $R^2$ is the proportion of variance in $y$ that the linear model explains.

`python
Interpretation: $R^2$ is the proportion of variance in $y$ that the linear model explains.
`

Interpretation: $R^2$ is the proportion of variance in $y$ that the linear model explains.

`python

`

In the simple linear regression case, it is the square of the correlation coefficient, $r$.

`python
In the simple linear regression case, it is the square of the correlation coefficient, $r$.
`

In the simple linear regression case, it is the square of the correlation coefficient, $r$.

`python
In the simple linear regression case, it is the square of the correlation coefficient, $r$.
`

In the simple linear regression case, it is the square of the correlation coefficient, $r$.

`python

`

Key idea: $R^2$ ranges from 0 to 1. The closer it is to 1, the better the linear fit is.
$R^2$ has no units of measurement, unlike RMSE.

`python
Key idea: $R^2$ ranges from 0 to 1. The closer it is to 1, the better the linear fit is.
$R^2$ has no units of measurement, unlike RMSE.
`

Key idea: $R^2$ ranges from 0 to 1. The closer it is to 1, the better the linear fit is.
$R^2$ has no units of measurement, unlike RMSE.

`python
Key idea: $R^2$ ranges from 0 to 1. The closer it is to 1, the better the linear fit is.
$R^2$ has no units of measurement, unlike RMSE.
`

Key idea: $R^2$ ranges from 0 to 1. The closer it is to 1, the better the linear fit is.
$R^2$ has no units of measurement, unlike RMSE.

`python

`

The score method of a fitted LinearRegression object gives the $R^2$ for the model.

`python
The score method of a fitted LinearRegression object gives the $R^2$ for the model.
`

The score method of a fitted LinearRegression object gives the $R^2$ for the model.

`python
The score method of a fitted LinearRegression object gives the $R^2$ for the model.
`

The score method of a fitted LinearRegression object gives the $R^2$ for the model.

`python

`

`python
In [9]:


model.score(tips[['total_bill']], tips['tip'])
`

Output:
Out[9]:

0.45661658635167623

`python
In [9]:


model.score(tips[['total_bill']], tips['tip'])
`

`python
In [9]:
`

Output:
Out[9]:

0.45661658635167623

Output:
Out[9]:

0.45661658635167623

`python
In [10]:


model_two.score(tips[['total_bill', 'size']], tips['tip'])
`

Output:
Out[10]:

0.46786930879612565

`python
In [10]:


model_two.score(tips[['total_bill', 'size']], tips['tip'])
`

`python
In [10]:
`

Output:
Out[10]:

0.46786930879612565

Output:
Out[10]:

0.46786930879612565

Next up: incorporating categorical variables¶

`python
Next up: incorporating categorical variables¶
`

Next up: incorporating categorical variables¶

`python
Next up: incorporating categorical variables¶
`

Next up: incorporating categorical variables¶

`python

`

`python
In [11]:


tips.head()
`

Output:
Out[11]:







total_bill
tip
sex
smoker
day
time
size




0
3.07
1.00
Female
Yes
Sat
Dinner
1


1
18.78
3.00
Female
No
Thur
Dinner
2


2
26.59
3.41
Male
Yes
Sat
Dinner
3


3
14.26
2.50
Male
No
Thur
Lunch
2


4
21.16
3.00
Male
No
Thur
Lunch
2

`python
In [11]:


tips.head()
`

`python
In [11]:
`

Output:
Out[11]:







total_bill
tip
sex
smoker
day
time
size




0
3.07
1.00
Female
Yes
Sat
Dinner
1


1
18.78
3.00
Female
No
Thur
Dinner
2


2
26.59
3.41
Male
Yes
Sat
Dinner
3


3
14.26
2.50
Male
No
Thur
Lunch
2


4
21.16
3.00
Male
No
Thur
Lunch
2

Output:
Out[11]:







total_bill
tip
sex
smoker
day
time
size




0
3.07
1.00
Female
Yes
Sat
Dinner
1


1
18.78
3.00
Female
No
Thur
Dinner
2


2
26.59
3.41
Male
Yes
Sat
Dinner
3


3
14.26
2.50
Male
No
Thur
Lunch
2


4
21.16
3.00
Male
No
Thur
Lunch
2

So far, in our journey to predict 'tip', we've only used the existing numerical features in our dataset, 'total_bill' and 'size'.

There's a lot of information in tips that we didn't use – 'sex', 'smoker', 'day', and 'time', for example. We can't use these features in their current form, because they're non-numeric.

How do we use categorical features in a regression model?

`python
So far, in our journey to predict 'tip', we've only used the existing numerical features in our dataset, 'total_bill' and 'size'.

There's a lot of information in tips that we didn't use – 'sex', 'smoker', 'day', and 'time', for example. We can't use these features in their current form, because they're non-numeric.

How do we use categorical features in a regression model?
`

So far, in our journey to predict 'tip', we've only used the existing numerical features in our dataset, 'total_bill' and 'size'.

There's a lot of information in tips that we didn't use – 'sex', 'smoker', 'day', and 'time', for example. We can't use these features in their current form, because they're non-numeric.

How do we use categorical features in a regression model?

`python
So far, in our journey to predict 'tip', we've only used the existing numerical features in our dataset, 'total_bill' and 'size'.

There's a lot of information in tips that we didn't use – 'sex', 'smoker', 'day', and 'time', for example. We can't use these features in their current form, because they're non-numeric.

How do we use categorical features in a regression model?
`

So far, in our journey to predict 'tip', we've only used the existing numerical features in our dataset, 'total_bill' and 'size'.

There's a lot of information in tips that we didn't use – 'sex', 'smoker', 'day', and 'time', for example. We can't use these features in their current form, because they're non-numeric.

How do we use categorical features in a regression model?

`python

`

Feature engineering ⚙️¶

`python
Feature engineering ⚙️¶
`

Feature engineering ⚙️¶

`python
Feature engineering ⚙️¶
`

Feature engineering ⚙️¶

`python

`

The goal of feature engineering¶

`python
The goal of feature engineering¶
`

The goal of feature engineering¶

`python
The goal of feature engineering¶
`

The goal of feature engineering¶

`python

`

Feature engineering is the act of finding transformations that transform data into effective quantitative variables.

`python
Feature engineering is the act of finding transformations that transform data into effective quantitative variables.
`

Feature engineering is the act of finding transformations that transform data into effective quantitative variables.

`python
Feature engineering is the act of finding transformations that transform data into effective quantitative variables.
`

Feature engineering is the act of finding transformations that transform data into effective quantitative variables.

`python

`

A "good" choice of features depends on many factors:
The kind of data, i.e. quantitative, ordinal, or nominal.
The relationship(s) being modeled.
The model type, e.g. linear models, decision tree models, neural networks.

`python
A "good" choice of features depends on many factors:
The kind of data, i.e. quantitative, ordinal, or nominal.
The relationship(s) being modeled.
The model type, e.g. linear models, decision tree models, neural networks.
`

A "good" choice of features depends on many factors:
The kind of data, i.e. quantitative, ordinal, or nominal.
The relationship(s) being modeled.
The model type, e.g. linear models, decision tree models, neural networks.

`python
A "good" choice of features depends on many factors:
The kind of data, i.e. quantitative, ordinal, or nominal.
The relationship(s) being modeled.
The model type, e.g. linear models, decision tree models, neural networks.
`

A "good" choice of features depends on many factors:
The kind of data, i.e. quantitative, ordinal, or nominal.
The relationship(s) being modeled.
The model type, e.g. linear models, decision tree models, neural networks.

`python

`

To introduce different transformations, we'll look at several different example datasets.

`python
To introduce different transformations, we'll look at several different example datasets.
`

To introduce different transformations, we'll look at several different example datasets.

`python
To introduce different transformations, we'll look at several different example datasets.
`

To introduce different transformations, we'll look at several different example datasets.

`python

`

One hot encoding¶

`python
One hot encoding¶
`

One hot encoding¶

`python
One hot encoding¶
`

One hot encoding¶

`python

`

One hot encoding is a transformation that turns a categorical feature into several binary features.

`python
One hot encoding is a transformation that turns a categorical feature into several binary features.
`

One hot encoding is a transformation that turns a categorical feature into several binary features.

`python
One hot encoding is a transformation that turns a categorical feature into several binary features.
`

One hot encoding is a transformation that turns a categorical feature into several binary features.

`python

`

Suppose a column has $N$ unique values, $A_1$, $A_2$, ..., $A_N$. For each unique value $A_i$, we define the following feature function:

$$\phi_i(x) = \left\{\begin{array}{ll}1 & {\rm if\ } x = A_i \\ 0 &  {\rm if\ } x\neq A_i \\ \end{array}\right. $$

`python
Suppose a column has $N$ unique values, $A_1$, $A_2$, ..., $A_N$. For each unique value $A_i$, we define the following feature function:

$$\phi_i(x) = \left\{\begin{array}{ll}1 & {\rm if\ } x = A_i \\ 0 &  {\rm if\ } x\neq A_i \\ \end{array}\right. $$
`

Suppose a column has $N$ unique values, $A_1$, $A_2$, ..., $A_N$. For each unique value $A_i$, we define the following feature function:

$$\phi_i(x) = \left\{\begin{array}{ll}1 & {\rm if\ } x = A_i \\ 0 &  {\rm if\ } x\neq A_i \\ \end{array}\right. $$

`python
Suppose a column has $N$ unique values, $A_1$, $A_2$, ..., $A_N$. For each unique value $A_i$, we define the following feature function:

$$\phi_i(x) = \left\{\begin{array}{ll}1 & {\rm if\ } x = A_i \\ 0 &  {\rm if\ } x\neq A_i \\ \end{array}\right. $$
`

Suppose a column has $N$ unique values, $A_1$, $A_2$, ..., $A_N$. For each unique value $A_i$, we define the following feature function:

$$\phi_i(x) = \left\{\begin{array}{ll}1 & {\rm if\ } x = A_i \\ 0 &  {\rm if\ } x\neq A_i \\ \end{array}\right. $$

`python

`

Note that 1 means "yes" and 0 means "no".

`python
Note that 1 means "yes" and 0 means "no".
`

Note that 1 means "yes" and 0 means "no".

`python
Note that 1 means "yes" and 0 means "no".
`

Note that 1 means "yes" and 0 means "no".

`python

`

One hot encoding is also called "dummy encoding", and $\phi_i(x)$ may also be referred to as an "indicator variable".

`python
One hot encoding is also called "dummy encoding", and $\phi_i(x)$ may also be referred to as an "indicator variable".
`

One hot encoding is also called "dummy encoding", and $\phi_i(x)$ may also be referred to as an "indicator variable".

`python
One hot encoding is also called "dummy encoding", and $\phi_i(x)$ may also be referred to as an "indicator variable".
`

One hot encoding is also called "dummy encoding", and $\phi_i(x)$ may also be referred to as an "indicator variable".

`python

`

Example: One hot encoding 'smoker'¶For each unique value of 'smoker' in our dataset, we must create a column for just that 'smoker'. (Remember, 'smoker' is 'Yes' when the table was in the smoking section of the restaurant and 'No' otherwise.)

`python
Example: One hot encoding 'smoker'¶For each unique value of 'smoker' in our dataset, we must create a column for just that 'smoker'. (Remember, 'smoker' is 'Yes' when the table was in the smoking section of the restaurant and 'No' otherwise.)
`

Example: One hot encoding 'smoker'¶For each unique value of 'smoker' in our dataset, we must create a column for just that 'smoker'. (Remember, 'smoker' is 'Yes' when the table was in the smoking section of the restaurant and 'No' otherwise.)

`python
Example: One hot encoding 'smoker'¶For each unique value of 'smoker' in our dataset, we must create a column for just that 'smoker'. (Remember, 'smoker' is 'Yes' when the table was in the smoking section of the restaurant and 'No' otherwise.)
`

Example: One hot encoding 'smoker'¶For each unique value of 'smoker' in our dataset, we must create a column for just that 'smoker'. (Remember, 'smoker' is 'Yes' when the table was in the smoking section of the restaurant and 'No' otherwise.)

`python

`

`python
In [12]:


tips.head()
`

Output:
Out[12]:







total_bill
tip
sex
smoker
day
time
size




0
3.07
1.00
Female
Yes
Sat
Dinner
1


1
18.78
3.00
Female
No
Thur
Dinner
2


2
26.59
3.41
Male
Yes
Sat
Dinner
3


3
14.26
2.50
Male
No
Thur
Lunch
2


4
21.16
3.00
Male
No
Thur
Lunch
2

`python
In [12]:


tips.head()
`

`python
In [12]:
`

Output:
Out[12]:







total_bill
tip
sex
smoker
day
time
size




0
3.07
1.00
Female
Yes
Sat
Dinner
1


1
18.78
3.00
Female
No
Thur
Dinner
2


2
26.59
3.41
Male
Yes
Sat
Dinner
3


3
14.26
2.50
Male
No
Thur
Lunch
2


4
21.16
3.00
Male
No
Thur
Lunch
2

Output:
Out[12]:







total_bill
tip
sex
smoker
day
time
size




0
3.07
1.00
Female
Yes
Sat
Dinner
1


1
18.78
3.00
Female
No
Thur
Dinner
2


2
26.59
3.41
Male
Yes
Sat
Dinner
3


3
14.26
2.50
Male
No
Thur
Lunch
2


4
21.16
3.00
Male
No
Thur
Lunch
2

`python
In [13]:


tips['smoker'].value_counts()
`

Output:
Out[13]:

smoker
No     151
Yes     93
Name: count, dtype: int64

`python
In [13]:


tips['smoker'].value_counts()
`

`python
In [13]:
`

Output:
Out[13]:

smoker
No     151
Yes     93
Name: count, dtype: int64

Output:
Out[13]:

smoker
No     151
Yes     93
Name: count, dtype: int64

`python
In [14]:


(tips['smoker'] == 'Yes').astype(int).head()
`

Output:
Out[14]:

0    1
1    0
2    1
3    0
4    0
Name: smoker, dtype: int64

`python
In [14]:


(tips['smoker'] == 'Yes').astype(int).head()
`

`python
In [14]:
`

Output:
Out[14]:

0    1
1    0
2    1
3    0
4    0
Name: smoker, dtype: int64

Output:
Out[14]:

0    1
1    0
2    1
3    0
4    0
Name: smoker, dtype: int64

`python
In [15]:


# Later we'll see an easier way to do one hot encoding using sklearn.
for val in tips['smoker'].unique():
    tips[f'smoker == {val}'] = (tips['smoker'] == val).astype(int)
`

`python
In [15]:
`

`python
In [16]:


tips.head()
`

Output:
Out[16]:







total_bill
tip
sex
smoker
...
time
size
smoker == Yes
smoker == No




0
3.07
1.00
Female
Yes
...
Dinner
1
1
0


1
18.78
3.00
Female
No
...
Dinner
2
0
1


2
26.59
3.41
Male
Yes
...
Dinner
3
1
0


3
14.26
2.50
Male
No
...
Lunch
2
0
1


4
21.16
3.00
Male
No
...
Lunch
2
0
1



5 rows × 9 columns

`python
In [16]:


tips.head()
`

`python
In [16]:
`

Output:
Out[16]:







total_bill
tip
sex
smoker
...
time
size
smoker == Yes
smoker == No




0
3.07
1.00
Female
Yes
...
Dinner
1
1
0


1
18.78
3.00
Female
No
...
Dinner
2
0
1


2
26.59
3.41
Male
Yes
...
Dinner
3
1
0


3
14.26
2.50
Male
No
...
Lunch
2
0
1


4
21.16
3.00
Male
No
...
Lunch
2
0
1



5 rows × 9 columns

Output:
Out[16]:







total_bill
tip
sex
smoker
...
time
size
smoker == Yes
smoker == No




0
3.07
1.00
Female
Yes
...
Dinner
1
1
0


1
18.78
3.00
Female
No
...
Dinner
2
0
1


2
26.59
3.41
Male
Yes
...
Dinner
3
1
0


3
14.26
2.50
Male
No
...
Lunch
2
0
1


4
21.16
3.00
Male
No
...
Lunch
2
0
1



5 rows × 9 columns

Multiple linear regression using total bill, table size, and smoker status¶Now that we've converted 'smoker' to a numerical variable, we can use it as input in a regression model. Here's the model we'll try to fit:
$$\text{predicted tip} = w_0 + w_1 \cdot \text{total bill} + w_2 \cdot \text{table size} + w_3 \cdot \text{smoker == Yes}$$

`python
Multiple linear regression using total bill, table size, and smoker status¶Now that we've converted 'smoker' to a numerical variable, we can use it as input in a regression model. Here's the model we'll try to fit:
$$\text{predicted tip} = w_0 + w_1 \cdot \text{total bill} + w_2 \cdot \text{table size} + w_3 \cdot \text{smoker == Yes}$$
`

Multiple linear regression using total bill, table size, and smoker status¶Now that we've converted 'smoker' to a numerical variable, we can use it as input in a regression model. Here's the model we'll try to fit:
$$\text{predicted tip} = w_0 + w_1 \cdot \text{total bill} + w_2 \cdot \text{table size} + w_3 \cdot \text{smoker == Yes}$$

`python
Multiple linear regression using total bill, table size, and smoker status¶Now that we've converted 'smoker' to a numerical variable, we can use it as input in a regression model. Here's the model we'll try to fit:
$$\text{predicted tip} = w_0 + w_1 \cdot \text{total bill} + w_2 \cdot \text{table size} + w_3 \cdot \text{smoker == Yes}$$
`

Multiple linear regression using total bill, table size, and smoker status¶Now that we've converted 'smoker' to a numerical variable, we can use it as input in a regression model. Here's the model we'll try to fit:
$$\text{predicted tip} = w_0 + w_1 \cdot \text{total bill} + w_2 \cdot \text{table size} + w_3 \cdot \text{smoker == Yes}$$

`python

`

Note: There's no need to use both 'smoker == No' and 'smoker == Yes'. If we know the value of one, we already know the value of the other, so using both does not add any new information. We can use either one.

`python
Note: There's no need to use both 'smoker == No' and 'smoker == Yes'. If we know the value of one, we already know the value of the other, so using both does not add any new information. We can use either one.
`

Note: There's no need to use both 'smoker == No' and 'smoker == Yes'. If we know the value of one, we already know the value of the other, so using both does not add any new information. We can use either one.

`python
Note: There's no need to use both 'smoker == No' and 'smoker == Yes'. If we know the value of one, we already know the value of the other, so using both does not add any new information. We can use either one.
`

Note: There's no need to use both 'smoker == No' and 'smoker == Yes'. If we know the value of one, we already know the value of the other, so using both does not add any new information. We can use either one.

`python

`

`python
In [17]:


model_three = LinearRegression()
model_three.fit(tips[['total_bill', 'size', 'smoker == Yes']], tips['tip'])
`

Output:
Out[17]:

LinearRegression()In a Jupyter environment, please rerun this cell to show the HTML representation or trust the notebook. On GitHub, the HTML representation is unable to render, please try loading this page with nbviewer.org.  LinearRegression?Documentation for LinearRegressioniFittedLinearRegression()

`python
In [17]:


model_three = LinearRegression()
model_three.fit(tips[['total_bill', 'size', 'smoker == Yes']], tips['tip'])
`

`python
In [17]:
`

Output:
Out[17]:

LinearRegression()In a Jupyter environment, please rerun this cell to show the HTML representation or trust the notebook. On GitHub, the HTML representation is unable to render, please try loading this page with nbviewer.org.  LinearRegression?Documentation for LinearRegressioniFittedLinearRegression()

Output:
Out[17]:

LinearRegression()In a Jupyter environment, please rerun this cell to show the HTML representation or trust the notebook. On GitHub, the HTML representation is unable to render, please try loading this page with nbviewer.org.  LinearRegression?Documentation for LinearRegressioniFittedLinearRegression()

`python
In [18]:


model_three.intercept_, model_three.coef_
`

Output:
Out[18]:

(0.7090155167346044, array([ 0.094,  0.18 , -0.083]))

`python
In [18]:


model_three.intercept_, model_three.coef_
`

`python
In [18]:
`

Output:
Out[18]:

(0.7090155167346044, array([ 0.094,  0.18 , -0.083]))

Output:
Out[18]:

(0.7090155167346044, array([ 0.094,  0.18 , -0.083]))

Question 🤔 `

Interpret the meaning of the coefficients in the fitted model:

$$\text{predicted tip} = 0.709 + 0.094 \cdot \text{total bill} + 0.180 \cdot \text{table size} - 0.083 \cdot \text{smoker == Yes}$$

`python
Question 🤔 `

Interpret the meaning of the coefficients in the fitted model:

$$\text{predicted tip} = 0.709 + 0.094 \cdot \text{total bill} + 0.180 \cdot \text{table size} - 0.083 \cdot \text{smoker == Yes}$$
`

Question 🤔 `

Interpret the meaning of the coefficients in the fitted model:

$$\text{predicted tip} = 0.709 + 0.094 \cdot \text{total bill} + 0.180 \cdot \text{table size} - 0.083 \cdot \text{smoker == Yes}$$

`python
Question 🤔 `

Interpret the meaning of the coefficients in the fitted model:

$$\text{predicted tip} = 0.709 + 0.094 \cdot \text{total bill} + 0.180 \cdot \text{table size} - 0.083 \cdot \text{smoker == Yes}$$
`

Question 🤔 `

Interpret the meaning of the coefficients in the fitted model:

$$\text{predicted tip} = 0.709 + 0.094 \cdot \text{total bill} + 0.180 \cdot \text{table size} - 0.083 \cdot \text{smoker == Yes}$$

`python

`

Visualizing the model¶Our new fit model is:
$$\text{predicted tip} = 0.709 + 0.094 \cdot \text{total bill} + 0.180 \cdot \text{table size} - 0.083 \cdot \text{smoker == Yes}$$
To visualize our data and linear model, we'd need 4 dimensions:

One for total bill
One for table size
One for 'smoker == Yes'.
One for tip.

Humans can't visualize in 4D, but there may be a solution. We know that 'smoker == Yes' only has two possible values, 1 or 0, so let's look at those cases separately.

`python
Visualizing the model¶Our new fit model is:
$$\text{predicted tip} = 0.709 + 0.094 \cdot \text{total bill} + 0.180 \cdot \text{table size} - 0.083 \cdot \text{smoker == Yes}$$
To visualize our data and linear model, we'd need 4 dimensions:

One for total bill
One for table size
One for 'smoker == Yes'.
One for tip.

Humans can't visualize in 4D, but there may be a solution. We know that 'smoker == Yes' only has two possible values, 1 or 0, so let's look at those cases separately.
`

Visualizing the model¶Our new fit model is:
$$\text{predicted tip} = 0.709 + 0.094 \cdot \text{total bill} + 0.180 \cdot \text{table size} - 0.083 \cdot \text{smoker == Yes}$$
To visualize our data and linear model, we'd need 4 dimensions:

One for total bill
One for table size
One for 'smoker == Yes'.
One for tip.

Humans can't visualize in 4D, but there may be a solution. We know that 'smoker == Yes' only has two possible values, 1 or 0, so let's look at those cases separately.

`python
Visualizing the model¶Our new fit model is:
$$\text{predicted tip} = 0.709 + 0.094 \cdot \text{total bill} + 0.180 \cdot \text{table size} - 0.083 \cdot \text{smoker == Yes}$$
To visualize our data and linear model, we'd need 4 dimensions:

One for total bill
One for table size
One for 'smoker == Yes'.
One for tip.

Humans can't visualize in 4D, but there may be a solution. We know that 'smoker == Yes' only has two possible values, 1 or 0, so let's look at those cases separately.
`

Visualizing the model¶Our new fit model is:
$$\text{predicted tip} = 0.709 + 0.094 \cdot \text{total bill} + 0.180 \cdot \text{table size} - 0.083 \cdot \text{smoker == Yes}$$
To visualize our data and linear model, we'd need 4 dimensions:

One for total bill
One for table size
One for 'smoker == Yes'.
One for tip.

Humans can't visualize in 4D, but there may be a solution. We know that 'smoker == Yes' only has two possible values, 1 or 0, so let's look at those cases separately.

`python

`

Case 1: 'smoker == Yes' is 1, meaning that the table was in the smoking section.
$$\begin{align*} \text{predicted tip} &= 0.709 + 0.094 \cdot \text{total bill} + 0.180 \cdot \text{table size} - 0.083 \cdot 1 \\ &= 0.626 + 0.094 \cdot \text{total bill} + 0.180 \cdot \text{table size}  \end{align*}$$

`python
Case 1: 'smoker == Yes' is 1, meaning that the table was in the smoking section.
$$\begin{align*} \text{predicted tip} &= 0.709 + 0.094 \cdot \text{total bill} + 0.180 \cdot \text{table size} - 0.083 \cdot 1 \\ &= 0.626 + 0.094 \cdot \text{total bill} + 0.180 \cdot \text{table size}  \end{align*}$$
`

Case 1: 'smoker == Yes' is 1, meaning that the table was in the smoking section.
$$\begin{align*} \text{predicted tip} &= 0.709 + 0.094 \cdot \text{total bill} + 0.180 \cdot \text{table size} - 0.083 \cdot 1 \\ &= 0.626 + 0.094 \cdot \text{total bill} + 0.180 \cdot \text{table size}  \end{align*}$$

`python
Case 1: 'smoker == Yes' is 1, meaning that the table was in the smoking section.
$$\begin{align*} \text{predicted tip} &= 0.709 + 0.094 \cdot \text{total bill} + 0.180 \cdot \text{table size} - 0.083 \cdot 1 \\ &= 0.626 + 0.094 \cdot \text{total bill} + 0.180 \cdot \text{table size}  \end{align*}$$
`

Case 1: 'smoker == Yes' is 1, meaning that the table was in the smoking section.
$$\begin{align*} \text{predicted tip} &= 0.709 + 0.094 \cdot \text{total bill} + 0.180 \cdot \text{table size} - 0.083 \cdot 1 \\ &= 0.626 + 0.094 \cdot \text{total bill} + 0.180 \cdot \text{table size}  \end{align*}$$

`python

`

Case 2: 'smoker == Yes' is 0, meaning that the table was not in the smoking section.
$$\begin{align*} \text{predicted tip} &= 0.709 + 0.094 \cdot \text{total bill} + 0.180 \cdot \text{table size} - 0.083 \cdot 0 \\ &= 0.709 + 0.094 \cdot \text{total bill} + 0.180 \cdot \text{table size}  \end{align*}$$

`python
Case 2: 'smoker == Yes' is 0, meaning that the table was not in the smoking section.
$$\begin{align*} \text{predicted tip} &= 0.709 + 0.094 \cdot \text{total bill} + 0.180 \cdot \text{table size} - 0.083 \cdot 0 \\ &= 0.709 + 0.094 \cdot \text{total bill} + 0.180 \cdot \text{table size}  \end{align*}$$
`

Case 2: 'smoker == Yes' is 0, meaning that the table was not in the smoking section.
$$\begin{align*} \text{predicted tip} &= 0.709 + 0.094 \cdot \text{total bill} + 0.180 \cdot \text{table size} - 0.083 \cdot 0 \\ &= 0.709 + 0.094 \cdot \text{total bill} + 0.180 \cdot \text{table size}  \end{align*}$$

`python
Case 2: 'smoker == Yes' is 0, meaning that the table was not in the smoking section.
$$\begin{align*} \text{predicted tip} &= 0.709 + 0.094 \cdot \text{total bill} + 0.180 \cdot \text{table size} - 0.083 \cdot 0 \\ &= 0.709 + 0.094 \cdot \text{total bill} + 0.180 \cdot \text{table size}  \end{align*}$$
`

Case 2: 'smoker == Yes' is 0, meaning that the table was not in the smoking section.
$$\begin{align*} \text{predicted tip} &= 0.709 + 0.094 \cdot \text{total bill} + 0.180 \cdot \text{table size} - 0.083 \cdot 0 \\ &= 0.709 + 0.094 \cdot \text{total bill} + 0.180 \cdot \text{table size}  \end{align*}$$

`python

`

Key idea: These are two parallel planes in 3D, with different $z$-intercepts!

`python
Key idea: These are two parallel planes in 3D, with different $z$-intercepts!
`

Key idea: These are two parallel planes in 3D, with different $z$-intercepts!

`python
Key idea: These are two parallel planes in 3D, with different $z$-intercepts!
`

Key idea: These are two parallel planes in 3D, with different $z$-intercepts!

`python

`

Note that the two planes are very close to one another – you'll have to zoom in to see the difference.

`python
Note that the two planes are very close to one another – you'll have to zoom in to see the difference.
`

Note that the two planes are very close to one another – you'll have to zoom in to see the difference.

`python
Note that the two planes are very close to one another – you'll have to zoom in to see the difference.
`

Note that the two planes are very close to one another – you'll have to zoom in to see the difference.

`python

`

`python
In [19]:


# pio.renderers.default = 'plotly_mimetype+notebook' # If it doesn't render, try uncommenting this.

XX, YY = np.mgrid[0:50:2, 0:8:1]
Z_0 = model_three.intercept_ + model_three.coef_[0] * XX + model_three.coef_[1] * YY + model_three.coef_[2] * 0
Z_1 = model_three.intercept_ + model_three.coef_[0] * XX + model_three.coef_[1] * YY + model_three.coef_[2] * 1
plane_0 = go.Surface(x=XX, y=YY, z=Z_0, colorscale='Greens')
plane_1 = go.Surface(x=XX, y=YY, z=Z_1, colorscale='Purples')

fig = go.Figure(data=[plane_0, plane_1])

tips_0 = tips[tips['smoker'] == 'No']
tips_1 = tips[tips['smoker'] == 'Yes']

fig.add_trace(go.Scatter3d(x=tips_0['total_bill'], 
                           y=tips_0['size'], 
                           z=tips_0['tip'], mode='markers', marker = {'color': 'green'}))

fig.add_trace(go.Scatter3d(x=tips_1['total_bill'], 
                           y=tips_1['size'], 
                           z=tips_1['tip'], mode='markers', marker = {'color': 'purple'}))

fig.update_layout(scene = dict(
    xaxis_title='Total Bill',
    yaxis_title='Table Size',
    zaxis_title='Tip'),
  title='Tip vs. Total Bill and Table Size (by Smoking)',
   width=500, height=400,
    showlegend=False)
`

`python
In [19]:
`

If we want to visualize in 2D, we need to pick a single feature to place on the $x$-axis.

`python
If we want to visualize in 2D, we need to pick a single feature to place on the $x$-axis.
`

If we want to visualize in 2D, we need to pick a single feature to place on the $x$-axis.

`python
If we want to visualize in 2D, we need to pick a single feature to place on the $x$-axis.
`

If we want to visualize in 2D, we need to pick a single feature to place on the $x$-axis.

`python

`

`python
In [20]:


fig = go.Figure()
fig.add_trace(go.Scatter(x=tips['total_bill'], y=tips['tip'], 
                         mode='markers', name='Original Data'))
fig.add_trace(go.Scatter(x=tips['total_bill'], y=model_three.predict(tips[['total_bill', 'size', 'smoker == Yes']]), 
                         mode='markers', name='Predicted Tips using Total Bill, <br>Table Size, and Smoker Status'))

fig.update_layout(showlegend=True, title='Tip vs. Total Bill',
                  xaxis_title='Total Bill', yaxis_title='Tip')
`

`python
In [20]:
`

Despite being a linear model, why doesn't this model look like a straight line?

`python
Despite being a linear model, why doesn't this model look like a straight line?
`

Despite being a linear model, why doesn't this model look like a straight line?

`python
Despite being a linear model, why doesn't this model look like a straight line?
`

Despite being a linear model, why doesn't this model look like a straight line?

`python

`

Comparing the new model to earlier models¶

`python
Comparing the new model to earlier models¶
`

Comparing the new model to earlier models¶

`python
Comparing the new model to earlier models¶
`

Comparing the new model to earlier models¶

`python

`

`python
In [21]:


rmse_dict['three features'] = rmse(tips['tip'], 
                                   model_three.predict(tips[['total_bill', 'size', 'smoker == Yes']]))
rmse_dict
`

Output:
Out[21]:

{'constant tip amount': 1.3807999538298952,
 'one feature: total bill': 1.0178504025697377,
 'two features': 1.007256127114662,
 'three features': 1.0064899786822128}

`python
In [21]:


rmse_dict['three features'] = rmse(tips['tip'], 
                                   model_three.predict(tips[['total_bill', 'size', 'smoker == Yes']]))
rmse_dict
`

`python
In [21]:
`

Output:
Out[21]:

{'constant tip amount': 1.3807999538298952,
 'one feature: total bill': 1.0178504025697377,
 'two features': 1.007256127114662,
 'three features': 1.0064899786822128}

Output:
Out[21]:

{'constant tip amount': 1.3807999538298952,
 'one feature: total bill': 1.0178504025697377,
 'two features': 1.007256127114662,
 'three features': 1.0064899786822128}

Adding 'smoker == Yes' decreased the training RMSE of our model, but barely.

`python
Adding 'smoker == Yes' decreased the training RMSE of our model, but barely.
`

Adding 'smoker == Yes' decreased the training RMSE of our model, but barely.

`python
Adding 'smoker == Yes' decreased the training RMSE of our model, but barely.
`

Adding 'smoker == Yes' decreased the training RMSE of our model, but barely.

`python

`

Question 🤔

(Fa23 Final Q9.1)
Every week, Lauren goes to her local grocery store and buys a varying amount of vegetable but always buys exactly one pound of meat (either beef, fish, or chicken). We use a linear regression model to predict her total grocery bill. We’ve collected a dataset containing the pounds of vegetables bought, the type of meat bought, and the total bill. Below we display the first few rows of the dataset and two plots generated using the entire training set.

Suppose we fit the following linear regression models to predict
total. Based on the data and visualizations shown above, determine
whether the fitted model weights are positive (+), negative (-), exactly
0, or impossible to determine. The notation meat=beef refers to the one-hot encoded meat
column with value 1 if the original value in the meat column was
beef and 0 otherwise. Likewise, meat=chicken and
meat=fish are the one-hot encoded meat columns for
chicken and fish, respectively.

$H(x) = w_0 $
$H(x) = w_0 + w_1 \cdot \text{veg} $
$H(x) = w_0 + w_1 \cdot (\text{meat=chicken})  $
$H(x) = w_0 + w_1 \cdot (\text{meat=beef}) + w_2 \cdot (\text{meat=chicken}) $
$H(x) = w_0 + w_1 \cdot (\text{meat=beef}) + w_2 \cdot (\text{meat=chicken}) + w_3 \cdot (\text{meat=fish}) $

Feel free to use the template below to fill in your answer for each weight.

`python
Question 🤔

(Fa23 Final Q9.1)
Every week, Lauren goes to her local grocery store and buys a varying amount of vegetable but always buys exactly one pound of meat (either beef, fish, or chicken). We use a linear regression model to predict her total grocery bill. We’ve collected a dataset containing the pounds of vegetables bought, the type of meat bought, and the total bill. Below we display the first few rows of the dataset and two plots generated using the entire training set.

Suppose we fit the following linear regression models to predict
total. Based on the data and visualizations shown above, determine
whether the fitted model weights are positive (+), negative (-), exactly
0, or impossible to determine. The notation meat=beef refers to the one-hot encoded meat
column with value 1 if the original value in the meat column was
beef and 0 otherwise. Likewise, meat=chicken and
meat=fish are the one-hot encoded meat columns for
chicken and fish, respectively.

$H(x) = w_0 $
$H(x) = w_0 + w_1 \cdot \text{veg} $
$H(x) = w_0 + w_1 \cdot (\text{meat=chicken})  $
$H(x) = w_0 + w_1 \cdot (\text{meat=beef}) + w_2 \cdot (\text{meat=chicken}) $
$H(x) = w_0 + w_1 \cdot (\text{meat=beef}) + w_2 \cdot (\text{meat=chicken}) + w_3 \cdot (\text{meat=fish}) $

Feel free to use the template below to fill in your answer for each weight.
`

Question 🤔

(Fa23 Final Q9.1)
Every week, Lauren goes to her local grocery store and buys a varying amount of vegetable but always buys exactly one pound of meat (either beef, fish, or chicken). We use a linear regression model to predict her total grocery bill. We’ve collected a dataset containing the pounds of vegetables bought, the type of meat bought, and the total bill. Below we display the first few rows of the dataset and two plots generated using the entire training set.

Suppose we fit the following linear regression models to predict
total. Based on the data and visualizations shown above, determine
whether the fitted model weights are positive (+), negative (-), exactly
0, or impossible to determine. The notation meat=beef refers to the one-hot encoded meat
column with value 1 if the original value in the meat column was
beef and 0 otherwise. Likewise, meat=chicken and
meat=fish are the one-hot encoded meat columns for
chicken and fish, respectively.

$H(x) = w_0 $
$H(x) = w_0 + w_1 \cdot \text{veg} $
$H(x) = w_0 + w_1 \cdot (\text{meat=chicken})  $
$H(x) = w_0 + w_1 \cdot (\text{meat=beef}) + w_2 \cdot (\text{meat=chicken}) $
$H(x) = w_0 + w_1 \cdot (\text{meat=beef}) + w_2 \cdot (\text{meat=chicken}) + w_3 \cdot (\text{meat=fish}) $

Feel free to use the template below to fill in your answer for each weight.

`python
Question 🤔

(Fa23 Final Q9.1)
Every week, Lauren goes to her local grocery store and buys a varying amount of vegetable but always buys exactly one pound of meat (either beef, fish, or chicken). We use a linear regression model to predict her total grocery bill. We’ve collected a dataset containing the pounds of vegetables bought, the type of meat bought, and the total bill. Below we display the first few rows of the dataset and two plots generated using the entire training set.

Suppose we fit the following linear regression models to predict
total. Based on the data and visualizations shown above, determine
whether the fitted model weights are positive (+), negative (-), exactly
0, or impossible to determine. The notation meat=beef refers to the one-hot encoded meat
column with value 1 if the original value in the meat column was
beef and 0 otherwise. Likewise, meat=chicken and
meat=fish are the one-hot encoded meat columns for
chicken and fish, respectively.

$H(x) = w_0 $
$H(x) = w_0 + w_1 \cdot \text{veg} $
$H(x) = w_0 + w_1 \cdot (\text{meat=chicken})  $
$H(x) = w_0 + w_1 \cdot (\text{meat=beef}) + w_2 \cdot (\text{meat=chicken}) $
$H(x) = w_0 + w_1 \cdot (\text{meat=beef}) + w_2 \cdot (\text{meat=chicken}) + w_3 \cdot (\text{meat=fish}) $

Feel free to use the template below to fill in your answer for each weight.
`

Question 🤔

(Fa23 Final Q9.1)
Every week, Lauren goes to her local grocery store and buys a varying amount of vegetable but always buys exactly one pound of meat (either beef, fish, or chicken). We use a linear regression model to predict her total grocery bill. We’ve collected a dataset containing the pounds of vegetables bought, the type of meat bought, and the total bill. Below we display the first few rows of the dataset and two plots generated using the entire training set.

Suppose we fit the following linear regression models to predict
total. Based on the data and visualizations shown above, determine
whether the fitted model weights are positive (+), negative (-), exactly
0, or impossible to determine. The notation meat=beef refers to the one-hot encoded meat
column with value 1 if the original value in the meat column was
beef and 0 otherwise. Likewise, meat=chicken and
meat=fish are the one-hot encoded meat columns for
chicken and fish, respectively.

$H(x) = w_0 $
$H(x) = w_0 + w_1 \cdot \text{veg} $
$H(x) = w_0 + w_1 \cdot (\text{meat=chicken})  $
$H(x) = w_0 + w_1 \cdot (\text{meat=beef}) + w_2 \cdot (\text{meat=chicken}) $
$H(x) = w_0 + w_1 \cdot (\text{meat=beef}) + w_2 \cdot (\text{meat=chicken}) + w_3 \cdot (\text{meat=fish}) $

Feel free to use the template below to fill in your answer for each weight.

`python

`

1. 
w0: ?

2.
w0: ?
w1: ?

3.
w0: ?
w1: ?

4.
w0: ?
w1: ?
w2: ?

5.
w0: ?
w1: ?
w2: ?
w3: ?

`python
1. 
w0: ?

2.
w0: ?
w1: ?

3.
w0: ?
w1: ?

4.
w0: ?
w1: ?
w2: ?

5.
w0: ?
w1: ?
w2: ?
w3: ?
`

1. 
w0: ?

2.
w0: ?
w1: ?

3.
w0: ?
w1: ?

4.
w0: ?
w1: ?
w2: ?

5.
w0: ?
w1: ?
w2: ?
w3: ?

`python
1. 
w0: ?

2.
w0: ?
w1: ?

3.
w0: ?
w1: ?

4.
w0: ?
w1: ?
w2: ?

5.
w0: ?
w1: ?
w2: ?
w3: ?
`

1. 
w0: ?

2.
w0: ?
w1: ?

3.
w0: ?
w1: ?

4.
w0: ?
w1: ?
w2: ?

5.
w0: ?
w1: ?
w2: ?
w3: ?

`python

`

Example: Predicting ratings ⭐️¶

`python
Example: Predicting ratings ⭐️¶
`

Example: Predicting ratings ⭐️¶

`python
Example: Predicting ratings ⭐️¶
`

Example: Predicting ratings ⭐️¶

`python

`

Example: Predicting ratings ⭐️¶


UID
AGE
STATE
HAS_BOUGHT
REVIEW
|
RATING




74
32
NY
True
"Meh."
|
✩✩


42
50
WA
True
"Worked out of the box..."
|
✩✩✩✩


57
16
CA
NULL
"Cheap materials..."
|
✩


...
...
...
...
...
|
...


(int)
(int)
(str)
(bool)
(str)
|
(str)

`python
Example: Predicting ratings ⭐️¶


UID
AGE
STATE
HAS_BOUGHT
REVIEW
|
RATING




74
32
NY
True
"Meh."
|
✩✩


42
50
WA
True
"Worked out of the box..."
|
✩✩✩✩


57
16
CA
NULL
"Cheap materials..."
|
✩


...
...
...
...
...
|
...


(int)
(int)
(str)
(bool)
(str)
|
(str)
`

Example: Predicting ratings ⭐️¶


UID
AGE
STATE
HAS_BOUGHT
REVIEW
|
RATING




74
32
NY
True
"Meh."
|
✩✩


42
50
WA
True
"Worked out of the box..."
|
✩✩✩✩


57
16
CA
NULL
"Cheap materials..."
|
✩


...
...
...
...
...
|
...


(int)
(int)
(str)
(bool)
(str)
|
(str)

`python
Example: Predicting ratings ⭐️¶


UID
AGE
STATE
HAS_BOUGHT
REVIEW
|
RATING




74
32
NY
True
"Meh."
|
✩✩


42
50
WA
True
"Worked out of the box..."
|
✩✩✩✩


57
16
CA
NULL
"Cheap materials..."
|
✩


...
...
...
...
...
|
...


(int)
(int)
(str)
(bool)
(str)
|
(str)
`

Example: Predicting ratings ⭐️¶


UID
AGE
STATE
HAS_BOUGHT
REVIEW
|
RATING




74
32
NY
True
"Meh."
|
✩✩


42
50
WA
True
"Worked out of the box..."
|
✩✩✩✩


57
16
CA
NULL
"Cheap materials..."
|
✩


...
...
...
...
...
|
...


(int)
(int)
(str)
(bool)
(str)
|
(str)

`python

`

We want to build a classifier that predicts 'RATING' using the above features.

`python
We want to build a classifier that predicts 'RATING' using the above features.
`

We want to build a classifier that predicts 'RATING' using the above features.

`python
We want to build a classifier that predicts 'RATING' using the above features.
`

We want to build a classifier that predicts 'RATING' using the above features.

`python

`

Why can't we build a model right away? What must we do so that we can build a model?

`python
Why can't we build a model right away? What must we do so that we can build a model?
`

Why can't we build a model right away? What must we do so that we can build a model?

`python
Why can't we build a model right away? What must we do so that we can build a model?
`

Why can't we build a model right away? What must we do so that we can build a model?

`python

`

Some issues: missing values, emojis and strings instead of numbers, irrelevant columns.

`python
Some issues: missing values, emojis and strings instead of numbers, irrelevant columns.
`

Some issues: missing values, emojis and strings instead of numbers, irrelevant columns.

`python
Some issues: missing values, emojis and strings instead of numbers, irrelevant columns.
`

Some issues: missing values, emojis and strings instead of numbers, irrelevant columns.

`python

`

Uninformative features¶

`python
Uninformative features¶
`

Uninformative features¶

`python
Uninformative features¶
`

Uninformative features¶

`python

`

'UID' was likely used to join the user information (e.g., 'AGE' and 'STATE') with some reviews dataset.

`python
'UID' was likely used to join the user information (e.g., 'AGE' and 'STATE') with some reviews dataset.
`

'UID' was likely used to join the user information (e.g., 'AGE' and 'STATE') with some reviews dataset.

`python
'UID' was likely used to join the user information (e.g., 'AGE' and 'STATE') with some reviews dataset.
`

'UID' was likely used to join the user information (e.g., 'AGE' and 'STATE') with some reviews dataset.

`python

`

Even though 'UID's are stored as numbers, the numerical value of a user's 'UID' won't help us predict their 'RATING'.

`python
Even though 'UID's are stored as numbers, the numerical value of a user's 'UID' won't help us predict their 'RATING'.
`

Even though 'UID's are stored as numbers, the numerical value of a user's 'UID' won't help us predict their 'RATING'.

`python
Even though 'UID's are stored as numbers, the numerical value of a user's 'UID' won't help us predict their 'RATING'.
`

Even though 'UID's are stored as numbers, the numerical value of a user's 'UID' won't help us predict their 'RATING'.

`python

`

If we include the 'UID' feature, our model will find whatever patterns it can between 'UID's and 'RATING's in the training (observed data).
This will lead to a lower training RMSE.

`python
If we include the 'UID' feature, our model will find whatever patterns it can between 'UID's and 'RATING's in the training (observed data).
This will lead to a lower training RMSE.
`

If we include the 'UID' feature, our model will find whatever patterns it can between 'UID's and 'RATING's in the training (observed data).
This will lead to a lower training RMSE.

`python
If we include the 'UID' feature, our model will find whatever patterns it can between 'UID's and 'RATING's in the training (observed data).
This will lead to a lower training RMSE.
`

If we include the 'UID' feature, our model will find whatever patterns it can between 'UID's and 'RATING's in the training (observed data).
This will lead to a lower training RMSE.

`python

`

However, since there is truly no relationship between 'UID' and 'RATING', this will lead to worse model performance on unseen data.

`python
However, since there is truly no relationship between 'UID' and 'RATING', this will lead to worse model performance on unseen data.
`

However, since there is truly no relationship between 'UID' and 'RATING', this will lead to worse model performance on unseen data.

`python
However, since there is truly no relationship between 'UID' and 'RATING', this will lead to worse model performance on unseen data.
`

However, since there is truly no relationship between 'UID' and 'RATING', this will lead to worse model performance on unseen data.

`python

`

Dropping features¶There are certain scenarios where manually dropping features might be helpful:

When the features do not contain information associated with the prediction task.
When the feature is not available at prediction time.

`python
Dropping features¶There are certain scenarios where manually dropping features might be helpful:

When the features do not contain information associated with the prediction task.
When the feature is not available at prediction time.
`

Dropping features¶There are certain scenarios where manually dropping features might be helpful:

When the features do not contain information associated with the prediction task.
When the feature is not available at prediction time.

`python
Dropping features¶There are certain scenarios where manually dropping features might be helpful:

When the features do not contain information associated with the prediction task.
When the feature is not available at prediction time.
`

Dropping features¶There are certain scenarios where manually dropping features might be helpful:

When the features do not contain information associated with the prediction task.
When the feature is not available at prediction time.

`python

`

The goal of building a model to predict 'RATING's is so that we can predict 'RATING's for users who haven't actually made a 'RATING' yet.

`python
The goal of building a model to predict 'RATING's is so that we can predict 'RATING's for users who haven't actually made a 'RATING' yet.
`

The goal of building a model to predict 'RATING's is so that we can predict 'RATING's for users who haven't actually made a 'RATING' yet.

`python
The goal of building a model to predict 'RATING's is so that we can predict 'RATING's for users who haven't actually made a 'RATING' yet.
`

The goal of building a model to predict 'RATING's is so that we can predict 'RATING's for users who haven't actually made a 'RATING' yet.

`python

`

As such, our model should only depend on features that we would know before the user makes their 'RATING'. This depends on how the rating system is set up.

`python
As such, our model should only depend on features that we would know before the user makes their 'RATING'. This depends on how the rating system is set up.
`

As such, our model should only depend on features that we would know before the user makes their 'RATING'. This depends on how the rating system is set up.

`python
As such, our model should only depend on features that we would know before the user makes their 'RATING'. This depends on how the rating system is set up.
`

As such, our model should only depend on features that we would know before the user makes their 'RATING'. This depends on how the rating system is set up.

`python

`

For instance, if a user only enters a 'REVIEW' after entering a 'RATING', we shouldn't use their 'REVIEW' to predict their 'RATING'.

`python
For instance, if a user only enters a 'REVIEW' after entering a 'RATING', we shouldn't use their 'REVIEW' to predict their 'RATING'.
`

For instance, if a user only enters a 'REVIEW' after entering a 'RATING', we shouldn't use their 'REVIEW' to predict their 'RATING'.

`python
For instance, if a user only enters a 'REVIEW' after entering a 'RATING', we shouldn't use their 'REVIEW' to predict their 'RATING'.
`

For instance, if a user only enters a 'REVIEW' after entering a 'RATING', we shouldn't use their 'REVIEW' to predict their 'RATING'.

`python

`

Encoding ordinal features¶


UID
AGE
STATE
HAS_BOUGHT
REVIEW
|
RATING




74
32
NY
True
"Meh."
|
✩✩


42
50
WA
True
"Worked out of the box..."
|
✩✩✩✩


57
16
CA
NULL
"Cheap materials..."
|
✩


...
...
...
...
...
|
...


(int)
(int)
(str)
(bool)
(str)
|
(str)



How do we encode the 'RATING' column, an ordinal variable, as a quantitative variable?

`python
Encoding ordinal features¶


UID
AGE
STATE
HAS_BOUGHT
REVIEW
|
RATING




74
32
NY
True
"Meh."
|
✩✩


42
50
WA
True
"Worked out of the box..."
|
✩✩✩✩


57
16
CA
NULL
"Cheap materials..."
|
✩


...
...
...
...
...
|
...


(int)
(int)
(str)
(bool)
(str)
|
(str)



How do we encode the 'RATING' column, an ordinal variable, as a quantitative variable?
`

Encoding ordinal features¶


UID
AGE
STATE
HAS_BOUGHT
REVIEW
|
RATING




74
32
NY
True
"Meh."
|
✩✩


42
50
WA
True
"Worked out of the box..."
|
✩✩✩✩


57
16
CA
NULL
"Cheap materials..."
|
✩


...
...
...
...
...
|
...


(int)
(int)
(str)
(bool)
(str)
|
(str)



How do we encode the 'RATING' column, an ordinal variable, as a quantitative variable?

`python
Encoding ordinal features¶


UID
AGE
STATE
HAS_BOUGHT
REVIEW
|
RATING




74
32
NY
True
"Meh."
|
✩✩


42
50
WA
True
"Worked out of the box..."
|
✩✩✩✩


57
16
CA
NULL
"Cheap materials..."
|
✩


...
...
...
...
...
|
...


(int)
(int)
(str)
(bool)
(str)
|
(str)



How do we encode the 'RATING' column, an ordinal variable, as a quantitative variable?
`

Encoding ordinal features¶


UID
AGE
STATE
HAS_BOUGHT
REVIEW
|
RATING




74
32
NY
True
"Meh."
|
✩✩


42
50
WA
True
"Worked out of the box..."
|
✩✩✩✩


57
16
CA
NULL
"Cheap materials..."
|
✩


...
...
...
...
...
|
...


(int)
(int)
(str)
(bool)
(str)
|
(str)



How do we encode the 'RATING' column, an ordinal variable, as a quantitative variable?

`python

`

Transformation: Replace "number of ✩" with "number".
This is an ordinal encoding, a transformation that maps ordinal values to the positive integers in a way that preserves order.
Example: (freshman, sophomore, junior, senior) -> (0, 1, 2, 3) or (1, 2, 3, 4).
Important: This transformation preserves "distances" between ratings.

`python
Transformation: Replace "number of ✩" with "number".
This is an ordinal encoding, a transformation that maps ordinal values to the positive integers in a way that preserves order.
Example: (freshman, sophomore, junior, senior) -> (0, 1, 2, 3) or (1, 2, 3, 4).
Important: This transformation preserves "distances" between ratings.
`

Transformation: Replace "number of ✩" with "number".
This is an ordinal encoding, a transformation that maps ordinal values to the positive integers in a way that preserves order.
Example: (freshman, sophomore, junior, senior) -> (0, 1, 2, 3) or (1, 2, 3, 4).
Important: This transformation preserves "distances" between ratings.

`python
Transformation: Replace "number of ✩" with "number".
This is an ordinal encoding, a transformation that maps ordinal values to the positive integers in a way that preserves order.
Example: (freshman, sophomore, junior, senior) -> (0, 1, 2, 3) or (1, 2, 3, 4).
Important: This transformation preserves "distances" between ratings.
`

Transformation: Replace "number of ✩" with "number".
This is an ordinal encoding, a transformation that maps ordinal values to the positive integers in a way that preserves order.
Example: (freshman, sophomore, junior, senior) -> (0, 1, 2, 3) or (1, 2, 3, 4).
Important: This transformation preserves "distances" between ratings.

`python

`

`python
In [22]:


ordinal_enc = {
    '✩': 1,
    '✩✩': 2,
    '✩✩✩': 3,
    '✩✩✩✩': 4,
    '✩✩✩✩✩': 5,
}
ordinal_enc
`

Output:
Out[22]:

{'✩': 1, '✩✩': 2, '✩✩✩': 3, '✩✩✩✩': 4, '✩✩✩✩✩': 5}

`python
In [22]:


ordinal_enc = {
    '✩': 1,
    '✩✩': 2,
    '✩✩✩': 3,
    '✩✩✩✩': 4,
    '✩✩✩✩✩': 5,
}
ordinal_enc
`

`python
In [22]:
`

Output:
Out[22]:

{'✩': 1, '✩✩': 2, '✩✩✩': 3, '✩✩✩✩': 4, '✩✩✩✩✩': 5}

Output:
Out[22]:

{'✩': 1, '✩✩': 2, '✩✩✩': 3, '✩✩✩✩': 4, '✩✩✩✩✩': 5}

`python
In [23]:


ratings = pd.DataFrame().assign(rating=['✩', '✩✩', '✩✩✩', '✩✩', '✩✩✩', '✩', '✩✩✩', '✩✩✩✩', '✩✩✩✩✩'])
ratings
`

Output:
Out[23]:







rating




0
✩


1
✩✩


2
✩✩✩


...
...


6
✩✩✩


7
✩✩✩✩


8
✩✩✩✩✩



9 rows × 1 columns

`python
In [23]:


ratings = pd.DataFrame().assign(rating=['✩', '✩✩', '✩✩✩', '✩✩', '✩✩✩', '✩', '✩✩✩', '✩✩✩✩', '✩✩✩✩✩'])
ratings
`

`python
In [23]:
`

Output:
Out[23]:







rating




0
✩


1
✩✩


2
✩✩✩


...
...


6
✩✩✩


7
✩✩✩✩


8
✩✩✩✩✩



9 rows × 1 columns

Output:
Out[23]:







rating




0
✩


1
✩✩


2
✩✩✩


...
...


6
✩✩✩


7
✩✩✩✩


8
✩✩✩✩✩



9 rows × 1 columns

`python
In [24]:


ratings['rating'].map(ordinal_enc)
`

Output:
Out[24]:

0    1
1    2
2    3
    ..
6    3
7    4
8    5
Name: rating, Length: 9, dtype: int64

`python
In [24]:


ratings['rating'].map(ordinal_enc)
`

`python
In [24]:
`

Output:
Out[24]:

0    1
1    2
2    3
    ..
6    3
7    4
8    5
Name: rating, Length: 9, dtype: int64

Output:
Out[24]:

0    1
1    2
2    3
    ..
6    3
7    4
8    5
Name: rating, Length: 9, dtype: int64

Encoding nominal features¶


UID
AGE
STATE
HAS_BOUGHT
REVIEW
|
RATING




74
32
NY
True
"Meh."
|
✩✩


42
50
WA
True
"Worked out of the box..."
|
✩✩✩✩


57
16
CA
NULL
"Cheap materials..."
|
✩


...
...
...
...
...
|
...


(int)
(int)
(str)
(bool)
(str)
|
(str)



How do we encode the 'STATE' column, a nominal variable, as a quantitative variable? In other words, how do we turn 'STATE's into meaningful numbers?

`python
Encoding nominal features¶


UID
AGE
STATE
HAS_BOUGHT
REVIEW
|
RATING




74
32
NY
True
"Meh."
|
✩✩


42
50
WA
True
"Worked out of the box..."
|
✩✩✩✩


57
16
CA
NULL
"Cheap materials..."
|
✩


...
...
...
...
...
|
...


(int)
(int)
(str)
(bool)
(str)
|
(str)



How do we encode the 'STATE' column, a nominal variable, as a quantitative variable? In other words, how do we turn 'STATE's into meaningful numbers?
`

Encoding nominal features¶


UID
AGE
STATE
HAS_BOUGHT
REVIEW
|
RATING




74
32
NY
True
"Meh."
|
✩✩


42
50
WA
True
"Worked out of the box..."
|
✩✩✩✩


57
16
CA
NULL
"Cheap materials..."
|
✩


...
...
...
...
...
|
...


(int)
(int)
(str)
(bool)
(str)
|
(str)



How do we encode the 'STATE' column, a nominal variable, as a quantitative variable? In other words, how do we turn 'STATE's into meaningful numbers?

`python
Encoding nominal features¶


UID
AGE
STATE
HAS_BOUGHT
REVIEW
|
RATING




74
32
NY
True
"Meh."
|
✩✩


42
50
WA
True
"Worked out of the box..."
|
✩✩✩✩


57
16
CA
NULL
"Cheap materials..."
|
✩


...
...
...
...
...
|
...


(int)
(int)
(str)
(bool)
(str)
|
(str)



How do we encode the 'STATE' column, a nominal variable, as a quantitative variable? In other words, how do we turn 'STATE's into meaningful numbers?
`

Encoding nominal features¶


UID
AGE
STATE
HAS_BOUGHT
REVIEW
|
RATING




74
32
NY
True
"Meh."
|
✩✩


42
50
WA
True
"Worked out of the box..."
|
✩✩✩✩


57
16
CA
NULL
"Cheap materials..."
|
✩


...
...
...
...
...
|
...


(int)
(int)
(str)
(bool)
(str)
|
(str)



How do we encode the 'STATE' column, a nominal variable, as a quantitative variable? In other words, how do we turn 'STATE's into meaningful numbers?

`python

`

Question: Why can't we use an ordinal encoding, e.g. NY -> 0, WA -> 1?

`python
Question: Why can't we use an ordinal encoding, e.g. NY -> 0, WA -> 1?
`

Question: Why can't we use an ordinal encoding, e.g. NY -> 0, WA -> 1?

`python
Question: Why can't we use an ordinal encoding, e.g. NY -> 0, WA -> 1?
`

Question: Why can't we use an ordinal encoding, e.g. NY -> 0, WA -> 1?

`python

`

Answer: There is no inherent ordering to states, e.g. WA is not inherently "more" of anything than NY.

`python
Answer: There is no inherent ordering to states, e.g. WA is not inherently "more" of anything than NY.
`

Answer: There is no inherent ordering to states, e.g. WA is not inherently "more" of anything than NY.

`python
Answer: There is no inherent ordering to states, e.g. WA is not inherently "more" of anything than NY.
`

Answer: There is no inherent ordering to states, e.g. WA is not inherently "more" of anything than NY.

`python

`

We've already seen the correct strategy: one hot encoding.

`python
We've already seen the correct strategy: one hot encoding.
`

We've already seen the correct strategy: one hot encoding.

`python
We've already seen the correct strategy: one hot encoding.
`

We've already seen the correct strategy: one hot encoding.

`python

`

Example: Horsepower 🚗¶

`python
Example: Horsepower 🚗¶
`

Example: Horsepower 🚗¶

`python
Example: Horsepower 🚗¶
`

Example: Horsepower 🚗¶

`python

`

The following dataset, built into the seaborn plotting library, contains various information about (older) cars.

`python
The following dataset, built into the seaborn plotting library, contains various information about (older) cars.
`

The following dataset, built into the seaborn plotting library, contains various information about (older) cars.

`python
The following dataset, built into the seaborn plotting library, contains various information about (older) cars.
`

The following dataset, built into the seaborn plotting library, contains various information about (older) cars.

`python

`

`python
In [25]:


mpg = sns.load_dataset('mpg').dropna()
mpg.head()
`

Output:
Out[25]:







mpg
cylinders
displacement
horsepower
...
acceleration
model_year
origin
name




0
18.0
8
307.0
130.0
...
12.0
70
usa
chevrolet chevelle malibu


1
15.0
8
350.0
165.0
...
11.5
70
usa
buick skylark 320


2
18.0
8
318.0
150.0
...
11.0
70
usa
plymouth satellite


3
16.0
8
304.0
150.0
...
12.0
70
usa
amc rebel sst


4
17.0
8
302.0
140.0
...
10.5
70
usa
ford torino



5 rows × 9 columns

`python
In [25]:


mpg = sns.load_dataset('mpg').dropna()
mpg.head()
`

`python
In [25]:
`

Output:
Out[25]:







mpg
cylinders
displacement
horsepower
...
acceleration
model_year
origin
name




0
18.0
8
307.0
130.0
...
12.0
70
usa
chevrolet chevelle malibu


1
15.0
8
350.0
165.0
...
11.5
70
usa
buick skylark 320


2
18.0
8
318.0
150.0
...
11.0
70
usa
plymouth satellite


3
16.0
8
304.0
150.0
...
12.0
70
usa
amc rebel sst


4
17.0
8
302.0
140.0
...
10.5
70
usa
ford torino



5 rows × 9 columns

Output:
Out[25]:







mpg
cylinders
displacement
horsepower
...
acceleration
model_year
origin
name




0
18.0
8
307.0
130.0
...
12.0
70
usa
chevrolet chevelle malibu


1
15.0
8
350.0
165.0
...
11.5
70
usa
buick skylark 320


2
18.0
8
318.0
150.0
...
11.0
70
usa
plymouth satellite


3
16.0
8
304.0
150.0
...
12.0
70
usa
amc rebel sst


4
17.0
8
302.0
140.0
...
10.5
70
usa
ford torino



5 rows × 9 columns

We really do mean old:

`python
We really do mean old:
`

We really do mean old:

`python
We really do mean old:
`

We really do mean old:

`python

`

`python
In [26]:


mpg['model_year'].value_counts()
`

Output:
Out[26]:

model_year
73    40
78    36
76    34
      ..
71    27
80    27
74    26
Name: count, Length: 13, dtype: int64

`python
In [26]:


mpg['model_year'].value_counts()
`

`python
In [26]:
`

Output:
Out[26]:

model_year
73    40
78    36
76    34
      ..
71    27
80    27
74    26
Name: count, Length: 13, dtype: int64

Output:
Out[26]:

model_year
73    40
78    36
76    34
      ..
71    27
80    27
74    26
Name: count, Length: 13, dtype: int64

The relationship between 'horsepower' and 'mpg'¶

`python
The relationship between 'horsepower' and 'mpg'¶
`

The relationship between 'horsepower' and 'mpg'¶

`python
The relationship between 'horsepower' and 'mpg'¶
`

The relationship between 'horsepower' and 'mpg'¶

`python

`

`python
In [27]:


px.scatter(mpg, x='horsepower', y='mpg')
`

`python
In [27]:
`

It appears that there is a negative association between 'horsepower' and 'mpg', though it's not quite linear.

`python
It appears that there is a negative association between 'horsepower' and 'mpg', though it's not quite linear.
`

It appears that there is a negative association between 'horsepower' and 'mpg', though it's not quite linear.

`python
It appears that there is a negative association between 'horsepower' and 'mpg', though it's not quite linear.
`

It appears that there is a negative association between 'horsepower' and 'mpg', though it's not quite linear.

`python

`

Let's see what happens if we were to fit a simple linear model.

`python
Let's see what happens if we were to fit a simple linear model.
`

Let's see what happens if we were to fit a simple linear model.

`python
Let's see what happens if we were to fit a simple linear model.
`

Let's see what happens if we were to fit a simple linear model.

`python

`

Predicting 'mpg' using 'horsepower'¶

`python
Predicting 'mpg' using 'horsepower'¶
`

Predicting 'mpg' using 'horsepower'¶

`python
Predicting 'mpg' using 'horsepower'¶
`

Predicting 'mpg' using 'horsepower'¶

`python

`

`python
In [28]:


car_model = LinearRegression()
car_model.fit(mpg[['horsepower']], mpg['mpg'])
`

Output:
Out[28]:

LinearRegression()In a Jupyter environment, please rerun this cell to show the HTML representation or trust the notebook. On GitHub, the HTML representation is unable to render, please try loading this page with nbviewer.org.  LinearRegression?Documentation for LinearRegressioniFittedLinearRegression()

`python
In [28]:


car_model = LinearRegression()
car_model.fit(mpg[['horsepower']], mpg['mpg'])
`

`python
In [28]:
`

Output:
Out[28]:

LinearRegression()In a Jupyter environment, please rerun this cell to show the HTML representation or trust the notebook. On GitHub, the HTML representation is unable to render, please try loading this page with nbviewer.org.  LinearRegression?Documentation for LinearRegressioniFittedLinearRegression()

Output:
Out[28]:

LinearRegression()In a Jupyter environment, please rerun this cell to show the HTML representation or trust the notebook. On GitHub, the HTML representation is unable to render, please try loading this page with nbviewer.org.  LinearRegression?Documentation for LinearRegressioniFittedLinearRegression()

What do our predictions look like?

`python
What do our predictions look like?
`

What do our predictions look like?

`python
What do our predictions look like?
`

What do our predictions look like?

`python

`

`python
In [29]:


hp_points = pd.DataFrame({'horsepower': [25, 225]})
fig = px.scatter(mpg, x='horsepower', y='mpg')
fig.add_trace(go.Scatter(
    x=hp_points['horsepower'],
    y=car_model.predict(hp_points),
    mode='lines',
    name='Predicted MPG using Horsepower'
))
`

`python
In [29]:
`

Our regression line doesn't capture the curvature in the relationship between 'horsepower' and 'mpg'.
We can see this in the residual plot:

`python
Our regression line doesn't capture the curvature in the relationship between 'horsepower' and 'mpg'.
We can see this in the residual plot:
`

Our regression line doesn't capture the curvature in the relationship between 'horsepower' and 'mpg'.
We can see this in the residual plot:

`python
Our regression line doesn't capture the curvature in the relationship between 'horsepower' and 'mpg'.
We can see this in the residual plot:
`

Our regression line doesn't capture the curvature in the relationship between 'horsepower' and 'mpg'.
We can see this in the residual plot:

`python

`

`python
In [30]:


res = mpg.assign(
    Predictions=car_model.predict(mpg[['horsepower']]),
    Residuals=mpg['mpg'] - car_model.predict(mpg[['horsepower']]),
)
fig = px.scatter(res, x='Predictions', y='Residuals')
fig.add_hline(0, line_width=3, opacity=1)
`

`python
In [30]:
`

`python
In [31]:


car_model.score(mpg[['horsepower']], mpg['mpg'])
`

Output:
Out[31]:

0.6059482578894348

`python
In [31]:


car_model.score(mpg[['horsepower']], mpg['mpg'])
`

`python
In [31]:
`

Output:
Out[31]:

0.6059482578894348

Output:
Out[31]:

0.6059482578894348

Linearization¶The Tukey Mosteller Bulge Diagram helps us pick which transformations to apply to data in order to linearize it.

`python
Linearization¶The Tukey Mosteller Bulge Diagram helps us pick which transformations to apply to data in order to linearize it.
`

Linearization¶The Tukey Mosteller Bulge Diagram helps us pick which transformations to apply to data in order to linearize it.

`python
Linearization¶The Tukey Mosteller Bulge Diagram helps us pick which transformations to apply to data in order to linearize it.
`

Linearization¶The Tukey Mosteller Bulge Diagram helps us pick which transformations to apply to data in order to linearize it.

`python

`

The bottom-left quadrant appears to match the shape of the scatter plot between 'horsepower' and 'mpg' the best. The diagram suggests many transformations we might try: $\log X, \sqrt X, \sqrt Y, \log Y$. Let's arbitrarily choose to take the $\log$ of 'horsepower' ($\log X$).

`python
The bottom-left quadrant appears to match the shape of the scatter plot between 'horsepower' and 'mpg' the best. The diagram suggests many transformations we might try: $\log X, \sqrt X, \sqrt Y, \log Y$. Let's arbitrarily choose to take the $\log$ of 'horsepower' ($\log X$).
`

The bottom-left quadrant appears to match the shape of the scatter plot between 'horsepower' and 'mpg' the best. The diagram suggests many transformations we might try: $\log X, \sqrt X, \sqrt Y, \log Y$. Let's arbitrarily choose to take the $\log$ of 'horsepower' ($\log X$).

`python
The bottom-left quadrant appears to match the shape of the scatter plot between 'horsepower' and 'mpg' the best. The diagram suggests many transformations we might try: $\log X, \sqrt X, \sqrt Y, \log Y$. Let's arbitrarily choose to take the $\log$ of 'horsepower' ($\log X$).
`

The bottom-left quadrant appears to match the shape of the scatter plot between 'horsepower' and 'mpg' the best. The diagram suggests many transformations we might try: $\log X, \sqrt X, \sqrt Y, \log Y$. Let's arbitrarily choose to take the $\log$ of 'horsepower' ($\log X$).

`python

`

`python
In [32]:


mpg['log hp'] = np.log(mpg['horsepower'])
`

`python
In [32]:
`

What does our data look like now?

`python
What does our data look like now?
`

What does our data look like now?

`python
What does our data look like now?
`

What does our data look like now?

`python

`

`python
In [33]:


px.scatter(mpg, x='log hp', y='mpg')
`

`python
In [33]:
`

Predicting 'mpg' using 'log hp'¶Let's fit another linear model using our new feature.

`python
Predicting 'mpg' using 'log hp'¶Let's fit another linear model using our new feature.
`

Predicting 'mpg' using 'log hp'¶Let's fit another linear model using our new feature.

`python
Predicting 'mpg' using 'log hp'¶Let's fit another linear model using our new feature.
`

Predicting 'mpg' using 'log hp'¶Let's fit another linear model using our new feature.

`python

`

`python
In [34]:


car_model_log = LinearRegression()
car_model_log.fit(mpg[['log hp']], mpg['mpg'])
`

Output:
Out[34]:

LinearRegression()In a Jupyter environment, please rerun this cell to show the HTML representation or trust the notebook. On GitHub, the HTML representation is unable to render, please try loading this page with nbviewer.org.  LinearRegression?Documentation for LinearRegressioniFittedLinearRegression()

`python
In [34]:


car_model_log = LinearRegression()
car_model_log.fit(mpg[['log hp']], mpg['mpg'])
`

`python
In [34]:
`

Output:
Out[34]:

LinearRegression()In a Jupyter environment, please rerun this cell to show the HTML representation or trust the notebook. On GitHub, the HTML representation is unable to render, please try loading this page with nbviewer.org.  LinearRegression?Documentation for LinearRegressioniFittedLinearRegression()

Output:
Out[34]:

LinearRegression()In a Jupyter environment, please rerun this cell to show the HTML representation or trust the notebook. On GitHub, the HTML representation is unable to render, please try loading this page with nbviewer.org.  LinearRegression?Documentation for LinearRegressioniFittedLinearRegression()

What do our predictions look like now?

`python
What do our predictions look like now?
`

What do our predictions look like now?

`python
What do our predictions look like now?
`

What do our predictions look like now?

`python

`

`python
In [35]:


fig = px.scatter(mpg, x='log hp', y='mpg')
log_hp_points = pd.DataFrame({'log hp': [3.7, 5.5]})
fig = px.scatter(mpg, x='log hp', y='mpg')
fig.add_trace(go.Scatter(
    x=log_hp_points['log hp'],
    y=car_model_log.predict(log_hp_points),
    mode='lines',
    name='Predicted MPG using log(Horsepower)'
))
`

`python
In [35]:
`

The fit looks better! How about the $R^2$?

`python
The fit looks better! How about the $R^2$?
`

The fit looks better! How about the $R^2$?

`python
The fit looks better! How about the $R^2$?
`

The fit looks better! How about the $R^2$?

`python

`

`python
In [36]:


car_model_log.score(mpg[['log hp']], mpg['mpg'])
`

Output:
Out[36]:

0.6683347641192137

`python
In [36]:


car_model_log.score(mpg[['log hp']], mpg['mpg'])
`

`python
In [36]:
`

Output:
Out[36]:

0.6683347641192137

Output:
Out[36]:

0.6683347641192137

Also better!

`python
Also better!
`

Also better!

`python
Also better!
`

Also better!

`python

`

What do our predictions look like on the original, non-transformed scatter plot? Let's see:

`python
What do our predictions look like on the original, non-transformed scatter plot? Let's see:
`

What do our predictions look like on the original, non-transformed scatter plot? Let's see:

`python
What do our predictions look like on the original, non-transformed scatter plot? Let's see:
`

What do our predictions look like on the original, non-transformed scatter plot? Let's see:

`python

`

`python
In [37]:


fig = px.scatter(mpg, x='horsepower', y='mpg')
fig.add_trace(
    go.Scatter(
        x=mpg['horsepower'], 
        y=car_model_log.intercept_ + car_model_log.coef_[0] * np.log(mpg['horsepower']),  
        mode='markers', name='Predicted MPG using log(Horsepower)'
    )
)
fig
`

`python
In [37]:
`

Our predictions that used $\log(\text{Horsepower})$ as an input don't fall on a straight line. We shouldn't expect them to; the orange dots come from:
$$\text{Predicted MPG} = 108.700 - 18.582 \cdot \log(\text{Horsepower})$$

`python
Our predictions that used $\log(\text{Horsepower})$ as an input don't fall on a straight line. We shouldn't expect them to; the orange dots come from:
$$\text{Predicted MPG} = 108.700 - 18.582 \cdot \log(\text{Horsepower})$$
`

Our predictions that used $\log(\text{Horsepower})$ as an input don't fall on a straight line. We shouldn't expect them to; the orange dots come from:
$$\text{Predicted MPG} = 108.700 - 18.582 \cdot \log(\text{Horsepower})$$

`python
Our predictions that used $\log(\text{Horsepower})$ as an input don't fall on a straight line. We shouldn't expect them to; the orange dots come from:
$$\text{Predicted MPG} = 108.700 - 18.582 \cdot \log(\text{Horsepower})$$
`

Our predictions that used $\log(\text{Horsepower})$ as an input don't fall on a straight line. We shouldn't expect them to; the orange dots come from:
$$\text{Predicted MPG} = 108.700 - 18.582 \cdot \log(\text{Horsepower})$$

`python

`

`python
In [38]:


car_model_log.intercept_, car_model_log.coef_
`

Output:
Out[38]:

(108.69970699574482, array([-18.582]))

`python
In [38]:


car_model_log.intercept_, car_model_log.coef_
`

`python
In [38]:
`

Output:
Out[38]:

(108.69970699574482, array([-18.582]))

Output:
Out[38]:

(108.69970699574482, array([-18.582]))

Quantitative scaling¶Until now, feature transformations we've discussed so far have involved converting categorical variables into quantitative variables. However, our log transformation was an example of transforming a quantitative variable into a new quantitative variable; this practice is called quantitative scaling.

Standardization: $x_i \rightarrow \frac{x_i - \bar{x}}{\sigma_x}$.
Linearization via a non-linear transformation: e.g. $\text{log}$ and $\text{sqrt}$. See Lab 8 for more.
Discretization: Convert data into percentiles (or more generally, quantiles).

`python
Quantitative scaling¶Until now, feature transformations we've discussed so far have involved converting categorical variables into quantitative variables. However, our log transformation was an example of transforming a quantitative variable into a new quantitative variable; this practice is called quantitative scaling.

Standardization: $x_i \rightarrow \frac{x_i - \bar{x}}{\sigma_x}$.
Linearization via a non-linear transformation: e.g. $\text{log}$ and $\text{sqrt}$. See Lab 8 for more.
Discretization: Convert data into percentiles (or more generally, quantiles).
`

Quantitative scaling¶Until now, feature transformations we've discussed so far have involved converting categorical variables into quantitative variables. However, our log transformation was an example of transforming a quantitative variable into a new quantitative variable; this practice is called quantitative scaling.

Standardization: $x_i \rightarrow \frac{x_i - \bar{x}}{\sigma_x}$.
Linearization via a non-linear transformation: e.g. $\text{log}$ and $\text{sqrt}$. See Lab 8 for more.
Discretization: Convert data into percentiles (or more generally, quantiles).

`python
Quantitative scaling¶Until now, feature transformations we've discussed so far have involved converting categorical variables into quantitative variables. However, our log transformation was an example of transforming a quantitative variable into a new quantitative variable; this practice is called quantitative scaling.

Standardization: $x_i \rightarrow \frac{x_i - \bar{x}}{\sigma_x}$.
Linearization via a non-linear transformation: e.g. $\text{log}$ and $\text{sqrt}$. See Lab 8 for more.
Discretization: Convert data into percentiles (or more generally, quantiles).
`

Quantitative scaling¶Until now, feature transformations we've discussed so far have involved converting categorical variables into quantitative variables. However, our log transformation was an example of transforming a quantitative variable into a new quantitative variable; this practice is called quantitative scaling.

Standardization: $x_i \rightarrow \frac{x_i - \bar{x}}{\sigma_x}$.
Linearization via a non-linear transformation: e.g. $\text{log}$ and $\text{sqrt}$. See Lab 8 for more.
Discretization: Convert data into percentiles (or more generally, quantiles).

`python

`

The modeling process¶

`python
The modeling process¶
`

The modeling process¶

`python
The modeling process¶
`

The modeling process¶

`python

`

The modeling process¶

`python
The modeling process¶
`

The modeling process¶

`python
The modeling process¶
`

The modeling process¶

`python

`

Create, or engineer, features to best reflect the "meaning" behind data.

`python
Create, or engineer, features to best reflect the "meaning" behind data.
`

Create, or engineer, features to best reflect the "meaning" behind data.

`python
Create, or engineer, features to best reflect the "meaning" behind data.
`

Create, or engineer, features to best reflect the "meaning" behind data.

`python

`

Choose a model that is appropriate to capture the relationships between features ($X$) and the target/response ($y$).

`python
Choose a model that is appropriate to capture the relationships between features ($X$) and the target/response ($y$).
`

Choose a model that is appropriate to capture the relationships between features ($X$) and the target/response ($y$).

`python
Choose a model that is appropriate to capture the relationships between features ($X$) and the target/response ($y$).
`

Choose a model that is appropriate to capture the relationships between features ($X$) and the target/response ($y$).

`python

`

Choose a loss function, e.g. squared loss.

`python
Choose a loss function, e.g. squared loss.
`

Choose a loss function, e.g. squared loss.

`python
Choose a loss function, e.g. squared loss.
`

Choose a loss function, e.g. squared loss.

`python

`

Fit the model: that is, minimize empirical risk to find optimal model parameters $w^*$.

`python
Fit the model: that is, minimize empirical risk to find optimal model parameters $w^*$.
`

Fit the model: that is, minimize empirical risk to find optimal model parameters $w^*$.

`python
Fit the model: that is, minimize empirical risk to find optimal model parameters $w^*$.
`

Fit the model: that is, minimize empirical risk to find optimal model parameters $w^*$.

`python

`

Evaluate the model, e.g. using RMSE or $R^2$.

`python
Evaluate the model, e.g. using RMSE or $R^2$.
`

Evaluate the model, e.g. using RMSE or $R^2$.

`python
Evaluate the model, e.g. using RMSE or $R^2$.
`

Evaluate the model, e.g. using RMSE or $R^2$.

`python

`

We can perform all of the above directly in sklearn!

`python
We can perform all of the above directly in sklearn!
`

We can perform all of the above directly in sklearn!

`python
We can perform all of the above directly in sklearn!
`

We can perform all of the above directly in sklearn!

`python

`



`python

`



`python

`



`python

`

preprocessing and linear_models¶

`python
preprocessing and linear_models¶
`

preprocessing and linear_models¶

`python
preprocessing and linear_models¶
`

preprocessing and linear_models¶

`python

`

For the feature engineering step of the modeling pipeline, we will use sklearn's preprocessing module.

`python
For the feature engineering step of the modeling pipeline, we will use sklearn's preprocessing module.
`

For the feature engineering step of the modeling pipeline, we will use sklearn's preprocessing module.

`python
For the feature engineering step of the modeling pipeline, we will use sklearn's preprocessing module.
`

For the feature engineering step of the modeling pipeline, we will use sklearn's preprocessing module.

`python

`

For the model creation step of the modeling pipeline, we will use sklearn's linear_model module, as we've already seen. linear_model.LinearRegression is an example of an estimator class. Later, we'll learn about other estimator classes that allow us to implement other models besides linear regression.

`python
For the model creation step of the modeling pipeline, we will use sklearn's linear_model module, as we've already seen. linear_model.LinearRegression is an example of an estimator class. Later, we'll learn about other estimator classes that allow us to implement other models besides linear regression.
`

For the model creation step of the modeling pipeline, we will use sklearn's linear_model module, as we've already seen. linear_model.LinearRegression is an example of an estimator class. Later, we'll learn about other estimator classes that allow us to implement other models besides linear regression.

`python
For the model creation step of the modeling pipeline, we will use sklearn's linear_model module, as we've already seen. linear_model.LinearRegression is an example of an estimator class. Later, we'll learn about other estimator classes that allow us to implement other models besides linear regression.
`

For the model creation step of the modeling pipeline, we will use sklearn's linear_model module, as we've already seen. linear_model.LinearRegression is an example of an estimator class. Later, we'll learn about other estimator classes that allow us to implement other models besides linear regression.

`python

`

Transformers in sklearn¶

`python
Transformers in sklearn¶
`

Transformers in sklearn¶

`python
Transformers in sklearn¶
`

Transformers in sklearn¶

`python

`

Transformer classes¶

`python
Transformer classes¶
`

Transformer classes¶

`python
Transformer classes¶
`

Transformer classes¶

`python

`

Transformers take in "raw" data and output "processed" data. They are used for creating features.

`python
Transformers take in "raw" data and output "processed" data. They are used for creating features.
`

Transformers take in "raw" data and output "processed" data. They are used for creating features.

`python
Transformers take in "raw" data and output "processed" data. They are used for creating features.
`

Transformers take in "raw" data and output "processed" data. They are used for creating features.

`python

`

The input to a transformer should be a multi-dimensional numpy array.
Inputs can be DataFrames, but sklearn only looks at the values (i.e. it calls to_numpy() on input DataFrames).

`python
The input to a transformer should be a multi-dimensional numpy array.
Inputs can be DataFrames, but sklearn only looks at the values (i.e. it calls to_numpy() on input DataFrames).
`

The input to a transformer should be a multi-dimensional numpy array.
Inputs can be DataFrames, but sklearn only looks at the values (i.e. it calls to_numpy() on input DataFrames).

`python
The input to a transformer should be a multi-dimensional numpy array.
Inputs can be DataFrames, but sklearn only looks at the values (i.e. it calls to_numpy() on input DataFrames).
`

The input to a transformer should be a multi-dimensional numpy array.
Inputs can be DataFrames, but sklearn only looks at the values (i.e. it calls to_numpy() on input DataFrames).

`python

`

The output of a transformer is a numpy array (never a DataFrame or Series).

`python
The output of a transformer is a numpy array (never a DataFrame or Series).
`

The output of a transformer is a numpy array (never a DataFrame or Series).

`python
The output of a transformer is a numpy array (never a DataFrame or Series).
`

The output of a transformer is a numpy array (never a DataFrame or Series).

`python

`

Transformers, like most relevant features of sklearn, are classes, not functions, meaning you need to instantiate them and call their methods.

`python
Transformers, like most relevant features of sklearn, are classes, not functions, meaning you need to instantiate them and call their methods.
`

Transformers, like most relevant features of sklearn, are classes, not functions, meaning you need to instantiate them and call their methods.

`python
Transformers, like most relevant features of sklearn, are classes, not functions, meaning you need to instantiate them and call their methods.
`

Transformers, like most relevant features of sklearn, are classes, not functions, meaning you need to instantiate them and call their methods.

`python

`

Example: Predicting tips 🧑‍🍳¶Let's return to our trusty tips dataset.

`python
Example: Predicting tips 🧑‍🍳¶Let's return to our trusty tips dataset.
`

Example: Predicting tips 🧑‍🍳¶Let's return to our trusty tips dataset.

`python
Example: Predicting tips 🧑‍🍳¶Let's return to our trusty tips dataset.
`

Example: Predicting tips 🧑‍🍳¶Let's return to our trusty tips dataset.

`python

`

`python
In [39]:


tips.head()
`

Output:
Out[39]:







total_bill
tip
sex
smoker
...
time
size
smoker == Yes
smoker == No




0
3.07
1.00
Female
Yes
...
Dinner
1
1
0


1
18.78
3.00
Female
No
...
Dinner
2
0
1


2
26.59
3.41
Male
Yes
...
Dinner
3
1
0


3
14.26
2.50
Male
No
...
Lunch
2
0
1


4
21.16
3.00
Male
No
...
Lunch
2
0
1



5 rows × 9 columns

`python
In [39]:


tips.head()
`

`python
In [39]:
`

Output:
Out[39]:







total_bill
tip
sex
smoker
...
time
size
smoker == Yes
smoker == No




0
3.07
1.00
Female
Yes
...
Dinner
1
1
0


1
18.78
3.00
Female
No
...
Dinner
2
0
1


2
26.59
3.41
Male
Yes
...
Dinner
3
1
0


3
14.26
2.50
Male
No
...
Lunch
2
0
1


4
21.16
3.00
Male
No
...
Lunch
2
0
1



5 rows × 9 columns

Output:
Out[39]:







total_bill
tip
sex
smoker
...
time
size
smoker == Yes
smoker == No




0
3.07
1.00
Female
Yes
...
Dinner
1
1
0


1
18.78
3.00
Female
No
...
Dinner
2
0
1


2
26.59
3.41
Male
Yes
...
Dinner
3
1
0


3
14.26
2.50
Male
No
...
Lunch
2
0
1


4
21.16
3.00
Male
No
...
Lunch
2
0
1



5 rows × 9 columns

Example transformer: Binarizer¶The Binarizer transformer allows us to map a quantitative sequence to a sequence of 1s and 0s, depending on whether values are above or below a threshold.



Property
Example
Description




Initialize with parameters
binar = Binarizer(thresh)
Set x=1 if x > thresh, else set x=0


Transform data in a dataset
feat = binar.transform(data)
Binarize all columns in data

`python
Example transformer: Binarizer¶The Binarizer transformer allows us to map a quantitative sequence to a sequence of 1s and 0s, depending on whether values are above or below a threshold.



Property
Example
Description




Initialize with parameters
binar = Binarizer(thresh)
Set x=1 if x > thresh, else set x=0


Transform data in a dataset
feat = binar.transform(data)
Binarize all columns in data
`

Example transformer: Binarizer¶The Binarizer transformer allows us to map a quantitative sequence to a sequence of 1s and 0s, depending on whether values are above or below a threshold.



Property
Example
Description




Initialize with parameters
binar = Binarizer(thresh)
Set x=1 if x > thresh, else set x=0


Transform data in a dataset
feat = binar.transform(data)
Binarize all columns in data

`python
Example transformer: Binarizer¶The Binarizer transformer allows us to map a quantitative sequence to a sequence of 1s and 0s, depending on whether values are above or below a threshold.



Property
Example
Description




Initialize with parameters
binar = Binarizer(thresh)
Set x=1 if x > thresh, else set x=0


Transform data in a dataset
feat = binar.transform(data)
Binarize all columns in data
`

Example transformer: Binarizer¶The Binarizer transformer allows us to map a quantitative sequence to a sequence of 1s and 0s, depending on whether values are above or below a threshold.



Property
Example
Description




Initialize with parameters
binar = Binarizer(thresh)
Set x=1 if x > thresh, else set x=0


Transform data in a dataset
feat = binar.transform(data)
Binarize all columns in data

`python

`

First, we need to import the relevant class from sklearn.preprocessing. (Tip: import just the relevant classes you need from sklearn.)

`python
First, we need to import the relevant class from sklearn.preprocessing. (Tip: import just the relevant classes you need from sklearn.)
`

First, we need to import the relevant class from sklearn.preprocessing. (Tip: import just the relevant classes you need from sklearn.)

`python
First, we need to import the relevant class from sklearn.preprocessing. (Tip: import just the relevant classes you need from sklearn.)
`

First, we need to import the relevant class from sklearn.preprocessing. (Tip: import just the relevant classes you need from sklearn.)

`python

`

`python
In [40]:


from sklearn.preprocessing import Binarizer
`

`python
In [40]:
`

Let's try binarizing 'total_bill'. We'll say a "large" bill is one that is strictly greater than $20.

`python
Let's try binarizing 'total_bill'. We'll say a "large" bill is one that is strictly greater than $20.
`

Let's try binarizing 'total_bill'. We'll say a "large" bill is one that is strictly greater than $20.

`python
Let's try binarizing 'total_bill'. We'll say a "large" bill is one that is strictly greater than $20.
`

Let's try binarizing 'total_bill'. We'll say a "large" bill is one that is strictly greater than $20.

`python

`

`python
In [41]:


tips['total_bill'].head()
`

Output:
Out[41]:

0     3.07
1    18.78
2    26.59
3    14.26
4    21.16
Name: total_bill, dtype: float64

`python
In [41]:


tips['total_bill'].head()
`

`python
In [41]:
`

Output:
Out[41]:

0     3.07
1    18.78
2    26.59
3    14.26
4    21.16
Name: total_bill, dtype: float64

Output:
Out[41]:

0     3.07
1    18.78
2    26.59
3    14.26
4    21.16
Name: total_bill, dtype: float64

First, we initialize a Binarizer object with the threshold we want.

`python
First, we initialize a Binarizer object with the threshold we want.
`

First, we initialize a Binarizer object with the threshold we want.

`python
First, we initialize a Binarizer object with the threshold we want.
`

First, we initialize a Binarizer object with the threshold we want.

`python

`

`python
In [42]:


bi = Binarizer(threshold=20)
`

`python
In [42]:
`

Then, we call bi's transform method and pass it the data we'd like to transform. Note that its input and output are both 2D.

`python
Then, we call bi's transform method and pass it the data we'd like to transform. Note that its input and output are both 2D.
`

Then, we call bi's transform method and pass it the data we'd like to transform. Note that its input and output are both 2D.

`python
Then, we call bi's transform method and pass it the data we'd like to transform. Note that its input and output are both 2D.
`

Then, we call bi's transform method and pass it the data we'd like to transform. Note that its input and output are both 2D.

`python

`

`python
In [43]:


transformed_bills = bi.transform(tips[['total_bill']]) # Must be a 2D array or DataFrame.
transformed_bills[:5]
`

Output:
C:\Users\janin\miniforge3\envs\dsc80\Lib\site-packages\sklearn\base.py:486: UserWarning:

X has feature names, but Binarizer was fitted without feature names





Out[43]:

array([[0.],
       [0.],
       [1.],
       [0.],
       [1.]])

`python
In [43]:


transformed_bills = bi.transform(tips[['total_bill']]) # Must be a 2D array or DataFrame.
transformed_bills[:5]
`

`python
In [43]:
`

Output:
C:\Users\janin\miniforge3\envs\dsc80\Lib\site-packages\sklearn\base.py:486: UserWarning:

X has feature names, but Binarizer was fitted without feature names





Out[43]:

array([[0.],
       [0.],
       [1.],
       [0.],
       [1.]])

Output:
C:\Users\janin\miniforge3\envs\dsc80\Lib\site-packages\sklearn\base.py:486: UserWarning:

X has feature names, but Binarizer was fitted without feature names

Example transformer: StandardScaler¶

`python
Example transformer: StandardScaler¶
`

Example transformer: StandardScaler¶

`python
Example transformer: StandardScaler¶
`

Example transformer: StandardScaler¶

`python

`

StandardScaler standardizes data using the mean and standard deviation of the data.

$$z(x_i) = \frac{x_i - \text{mean of } x}{\text{SD of } x}$$

`python
StandardScaler standardizes data using the mean and standard deviation of the data.

$$z(x_i) = \frac{x_i - \text{mean of } x}{\text{SD of } x}$$
`

StandardScaler standardizes data using the mean and standard deviation of the data.

$$z(x_i) = \frac{x_i - \text{mean of } x}{\text{SD of } x}$$

`python
StandardScaler standardizes data using the mean and standard deviation of the data.

$$z(x_i) = \frac{x_i - \text{mean of } x}{\text{SD of } x}$$
`

StandardScaler standardizes data using the mean and standard deviation of the data.

$$z(x_i) = \frac{x_i - \text{mean of } x}{\text{SD of } x}$$

`python

`

Unlike Binarizer, StandardScaler requires some knowledge (mean and SD) of the dataset before transforming.

`python
Unlike Binarizer, StandardScaler requires some knowledge (mean and SD) of the dataset before transforming.
`

Unlike Binarizer, StandardScaler requires some knowledge (mean and SD) of the dataset before transforming.

`python
Unlike Binarizer, StandardScaler requires some knowledge (mean and SD) of the dataset before transforming.
`

Unlike Binarizer, StandardScaler requires some knowledge (mean and SD) of the dataset before transforming.

`python

`

As such, we need to fit a StandardScaler transformer before we can use the transform method.

`python
As such, we need to fit a StandardScaler transformer before we can use the transform method.
`

As such, we need to fit a StandardScaler transformer before we can use the transform method.

`python
As such, we need to fit a StandardScaler transformer before we can use the transform method.
`

As such, we need to fit a StandardScaler transformer before we can use the transform method.

`python

`

Typical usage: fit transformer on a sample, use that fit transformer to transform future data.

`python
Typical usage: fit transformer on a sample, use that fit transformer to transform future data.
`

Typical usage: fit transformer on a sample, use that fit transformer to transform future data.

`python
Typical usage: fit transformer on a sample, use that fit transformer to transform future data.
`

Typical usage: fit transformer on a sample, use that fit transformer to transform future data.

`python

`

Example transformer: StandardScaler¶It only makes sense to standardize the already-quantitative features of tips, so let's select just those.

`python
Example transformer: StandardScaler¶It only makes sense to standardize the already-quantitative features of tips, so let's select just those.
`

Example transformer: StandardScaler¶It only makes sense to standardize the already-quantitative features of tips, so let's select just those.

`python
Example transformer: StandardScaler¶It only makes sense to standardize the already-quantitative features of tips, so let's select just those.
`

Example transformer: StandardScaler¶It only makes sense to standardize the already-quantitative features of tips, so let's select just those.

`python

`

`python
In [44]:


tips_quant = tips[['total_bill', 'size']]
tips_quant.head()
`

Output:
Out[44]:







total_bill
size




0
3.07
1


1
18.78
2


2
26.59
3


3
14.26
2


4
21.16
2

`python
In [44]:


tips_quant = tips[['total_bill', 'size']]
tips_quant.head()
`

`python
In [44]:
`

Output:
Out[44]:







total_bill
size




0
3.07
1


1
18.78
2


2
26.59
3


3
14.26
2


4
21.16
2

Output:
Out[44]:







total_bill
size




0
3.07
1


1
18.78
2


2
26.59
3


3
14.26
2


4
21.16
2

Let's initialize a StandardScaler object.

`python
Let's initialize a StandardScaler object.
`

Let's initialize a StandardScaler object.

`python
Let's initialize a StandardScaler object.
`

Let's initialize a StandardScaler object.

`python

`

`python
In [45]:


from sklearn.preprocessing import StandardScaler
`

`python
In [45]:
`

`python
In [46]:


stdscaler = StandardScaler()
`

`python
In [46]:
`

Note that the following does not work! The error message is very helpful.

`python
Note that the following does not work! The error message is very helpful.
`

Note that the following does not work! The error message is very helpful.

`python
Note that the following does not work! The error message is very helpful.
`

Note that the following does not work! The error message is very helpful.

`python

`

`python
In [47]:


stdscaler.transform(tips_quant)
`

`python
In [47]:
`

Instead, we need to first call the fit method on stdscaler.

`python
Instead, we need to first call the fit method on stdscaler.
`

Instead, we need to first call the fit method on stdscaler.

`python
Instead, we need to first call the fit method on stdscaler.
`

Instead, we need to first call the fit method on stdscaler.

`python

`

`python
In [48]:


# This is like saying "determine the mean and SD of each column in tips_quant".
stdscaler.fit(tips_quant)
`

Output:
Out[48]:

StandardScaler()In a Jupyter environment, please rerun this cell to show the HTML representation or trust the notebook. On GitHub, the HTML representation is unable to render, please try loading this page with nbviewer.org.  StandardScaler?Documentation for StandardScaleriFittedStandardScaler()

`python
In [48]:


# This is like saying "determine the mean and SD of each column in tips_quant".
stdscaler.fit(tips_quant)
`

`python
In [48]:
`

Output:
Out[48]:

StandardScaler()In a Jupyter environment, please rerun this cell to show the HTML representation or trust the notebook. On GitHub, the HTML representation is unable to render, please try loading this page with nbviewer.org.  StandardScaler?Documentation for StandardScaleriFittedStandardScaler()

Output:
Out[48]:

StandardScaler()In a Jupyter environment, please rerun this cell to show the HTML representation or trust the notebook. On GitHub, the HTML representation is unable to render, please try loading this page with nbviewer.org.  StandardScaler?Documentation for StandardScaleriFittedStandardScaler()

Now, transform will work.

`python
Now, transform will work.
`

Now, transform will work.

`python
Now, transform will work.
`

Now, transform will work.

`python

`

`python
In [49]:


# First column is 'total_bill', second column is 'size'.
tips_quant_z = stdscaler.transform(tips_quant)
tips_quant_z[:5]
`

Output:
Out[49]:

array([[-1.882, -1.654],
       [-0.113, -0.6  ],
       [ 0.766,  0.453],
       [-0.622, -0.6  ],
       [ 0.155, -0.6  ]])

`python
In [49]:


# First column is 'total_bill', second column is 'size'.
tips_quant_z = stdscaler.transform(tips_quant)
tips_quant_z[:5]
`

`python
In [49]:
`

Output:
Out[49]:

array([[-1.882, -1.654],
       [-0.113, -0.6  ],
       [ 0.766,  0.453],
       [-0.622, -0.6  ],
       [ 0.155, -0.6  ]])

Output:
Out[49]:

array([[-1.882, -1.654],
       [-0.113, -0.6  ],
       [ 0.766,  0.453],
       [-0.622, -0.6  ],
       [ 0.155, -0.6  ]])

We can also access the mean and variance that stdscaler computed for each column:

`python
We can also access the mean and variance that stdscaler computed for each column:
`

We can also access the mean and variance that stdscaler computed for each column:

`python
We can also access the mean and variance that stdscaler computed for each column:
`

We can also access the mean and variance that stdscaler computed for each column:

`python

`

`python
In [50]:


stdscaler.mean_
`

Output:
Out[50]:

array([19.786,  2.57 ])

`python
In [50]:


stdscaler.mean_
`

`python
In [50]:
`

Output:
Out[50]:

array([19.786,  2.57 ])

Output:
Out[50]:

array([19.786,  2.57 ])

`python
In [51]:


stdscaler.var_
`

Output:
Out[51]:

array([78.928,  0.901])

`python
In [51]:


stdscaler.var_
`

`python
In [51]:
`

Output:
Out[51]:

array([78.928,  0.901])

Output:
Out[51]:

array([78.928,  0.901])

Note that we can call transform on DataFrames other than tips_quant. We will do this often – fit a transformer on one dataset (training data) and use it to transform other datasets (test data).

`python
Note that we can call transform on DataFrames other than tips_quant. We will do this often – fit a transformer on one dataset (training data) and use it to transform other datasets (test data).
`

Note that we can call transform on DataFrames other than tips_quant. We will do this often – fit a transformer on one dataset (training data) and use it to transform other datasets (test data).

`python
Note that we can call transform on DataFrames other than tips_quant. We will do this often – fit a transformer on one dataset (training data) and use it to transform other datasets (test data).
`

Note that we can call transform on DataFrames other than tips_quant. We will do this often – fit a transformer on one dataset (training data) and use it to transform other datasets (test data).

`python

`

`python
In [52]:


stdscaler.transform(tips_quant.sample(5))
`

Output:
Out[52]:

array([[ 0.974, -0.6  ],
       [-0.279, -0.6  ],
       [ 1.195,  1.507],
       [-0.491, -0.6  ],
       [ 0.65 ,  1.507]])

`python
In [52]:


stdscaler.transform(tips_quant.sample(5))
`

`python
In [52]:
`

Output:
Out[52]:

array([[ 0.974, -0.6  ],
       [-0.279, -0.6  ],
       [ 1.195,  1.507],
       [-0.491, -0.6  ],
       [ 0.65 ,  1.507]])

Output:
Out[52]:

array([[ 0.974, -0.6  ],
       [-0.279, -0.6  ],
       [ 1.195,  1.507],
       [-0.491, -0.6  ],
       [ 0.65 ,  1.507]])

💡 Pro-Tip: Using .fit_transform¶The .fit_transform method will fit the transformer and then transform the data in one go.

`python
💡 Pro-Tip: Using .fit_transform¶The .fit_transform method will fit the transformer and then transform the data in one go.
`

💡 Pro-Tip: Using .fit_transform¶The .fit_transform method will fit the transformer and then transform the data in one go.

`python
💡 Pro-Tip: Using .fit_transform¶The .fit_transform method will fit the transformer and then transform the data in one go.
`

💡 Pro-Tip: Using .fit_transform¶The .fit_transform method will fit the transformer and then transform the data in one go.

`python

`

`python
In [53]:


stdscaler.fit_transform(tips_quant)
`

Output:
Out[53]:

array([[-1.882, -1.654],
       [-0.113, -0.6  ],
       [ 0.766,  0.453],
       ...,
       [-0.261, -0.6  ],
       [-1.094, -0.6  ],
       [-0.321,  0.453]])

`python
In [53]:


stdscaler.fit_transform(tips_quant)
`

`python
In [53]:
`

Output:
Out[53]:

array([[-1.882, -1.654],
       [-0.113, -0.6  ],
       [ 0.766,  0.453],
       ...,
       [-0.261, -0.6  ],
       [-1.094, -0.6  ],
       [-0.321,  0.453]])

Output:
Out[53]:

array([[-1.882, -1.654],
       [-0.113, -0.6  ],
       [ 0.766,  0.453],
       ...,
       [-0.261, -0.6  ],
       [-1.094, -0.6  ],
       [-0.321,  0.453]])

StandardScaler summary¶


Property
Example
Description




Initialize with parameters
stdscaler = StandardScaler()
z-score the data (no parameters)


Fit the transformer
stdscaler.fit(X)
Compute the mean and SD of X


Transform data in a dataset
feat = stdscaler.transform(X_new)
z-score X_new using mean and SD of X


Fit and transform
stdscaler.fit_transform(X)
Compute the mean and SD of X, then z-score X

`python
StandardScaler summary¶


Property
Example
Description




Initialize with parameters
stdscaler = StandardScaler()
z-score the data (no parameters)


Fit the transformer
stdscaler.fit(X)
Compute the mean and SD of X


Transform data in a dataset
feat = stdscaler.transform(X_new)
z-score X_new using mean and SD of X


Fit and transform
stdscaler.fit_transform(X)
Compute the mean and SD of X, then z-score X
`

StandardScaler summary¶


Property
Example
Description




Initialize with parameters
stdscaler = StandardScaler()
z-score the data (no parameters)


Fit the transformer
stdscaler.fit(X)
Compute the mean and SD of X


Transform data in a dataset
feat = stdscaler.transform(X_new)
z-score X_new using mean and SD of X


Fit and transform
stdscaler.fit_transform(X)
Compute the mean and SD of X, then z-score X

`python
StandardScaler summary¶


Property
Example
Description




Initialize with parameters
stdscaler = StandardScaler()
z-score the data (no parameters)


Fit the transformer
stdscaler.fit(X)
Compute the mean and SD of X


Transform data in a dataset
feat = stdscaler.transform(X_new)
z-score X_new using mean and SD of X


Fit and transform
stdscaler.fit_transform(X)
Compute the mean and SD of X, then z-score X
`

StandardScaler summary¶


Property
Example
Description




Initialize with parameters
stdscaler = StandardScaler()
z-score the data (no parameters)


Fit the transformer
stdscaler.fit(X)
Compute the mean and SD of X


Transform data in a dataset
feat = stdscaler.transform(X_new)
z-score X_new using mean and SD of X


Fit and transform
stdscaler.fit_transform(X)
Compute the mean and SD of X, then z-score X

`python

`

Example transformer: OneHotEncoder¶Let's keep just the categorical columns in tips.

`python
Example transformer: OneHotEncoder¶Let's keep just the categorical columns in tips.
`

Example transformer: OneHotEncoder¶Let's keep just the categorical columns in tips.

`python
Example transformer: OneHotEncoder¶Let's keep just the categorical columns in tips.
`

Example transformer: OneHotEncoder¶Let's keep just the categorical columns in tips.

`python

`

`python
In [54]:


tips_cat = tips[['sex', 'smoker', 'day', 'time']]
tips_cat.head()
`

Output:
Out[54]:







sex
smoker
day
time




0
Female
Yes
Sat
Dinner


1
Female
No
Thur
Dinner


2
Male
Yes
Sat
Dinner


3
Male
No
Thur
Lunch


4
Male
No
Thur
Lunch

`python
In [54]:


tips_cat = tips[['sex', 'smoker', 'day', 'time']]
tips_cat.head()
`

`python
In [54]:
`

Output:
Out[54]:







sex
smoker
day
time




0
Female
Yes
Sat
Dinner


1
Female
No
Thur
Dinner


2
Male
Yes
Sat
Dinner


3
Male
No
Thur
Lunch


4
Male
No
Thur
Lunch

Output:
Out[54]:







sex
smoker
day
time




0
Female
Yes
Sat
Dinner


1
Female
No
Thur
Dinner


2
Male
Yes
Sat
Dinner


3
Male
No
Thur
Lunch


4
Male
No
Thur
Lunch

Like StandardScaler, we will need to fit our OneHotEncoder transformer before it can transform anything.

`python
Like StandardScaler, we will need to fit our OneHotEncoder transformer before it can transform anything.
`

Like StandardScaler, we will need to fit our OneHotEncoder transformer before it can transform anything.

`python
Like StandardScaler, we will need to fit our OneHotEncoder transformer before it can transform anything.
`

Like StandardScaler, we will need to fit our OneHotEncoder transformer before it can transform anything.

`python

`

`python
In [55]:


from sklearn.preprocessing import OneHotEncoder
`

`python
In [55]:
`

`python
In [56]:


ohe = OneHotEncoder()
ohe.fit(tips_cat)
`

Output:
Out[56]:

OneHotEncoder()In a Jupyter environment, please rerun this cell to show the HTML representation or trust the notebook. On GitHub, the HTML representation is unable to render, please try loading this page with nbviewer.org.  OneHotEncoder?Documentation for OneHotEncoderiFittedOneHotEncoder()

`python
In [56]:


ohe = OneHotEncoder()
ohe.fit(tips_cat)
`

`python
In [56]:
`

Output:
Out[56]:

OneHotEncoder()In a Jupyter environment, please rerun this cell to show the HTML representation or trust the notebook. On GitHub, the HTML representation is unable to render, please try loading this page with nbviewer.org.  OneHotEncoder?Documentation for OneHotEncoderiFittedOneHotEncoder()

Output:
Out[56]:

OneHotEncoder()In a Jupyter environment, please rerun this cell to show the HTML representation or trust the notebook. On GitHub, the HTML representation is unable to render, please try loading this page with nbviewer.org.  OneHotEncoder?Documentation for OneHotEncoderiFittedOneHotEncoder()

When we try to transform, we get a result we might not expect.

`python
When we try to transform, we get a result we might not expect.
`

When we try to transform, we get a result we might not expect.

`python
When we try to transform, we get a result we might not expect.
`

When we try to transform, we get a result we might not expect.

`python

`

`python
In [57]:


ohe.transform(tips_cat)
`

Output:
Out[57]:

<Compressed Sparse Row sparse matrix of dtype 'float64'
	with 976 stored elements and shape (244, 10)>

`python
In [57]:


ohe.transform(tips_cat)
`

`python
In [57]:
`

Output:
Out[57]:

<Compressed Sparse Row sparse matrix of dtype 'float64'
	with 976 stored elements and shape (244, 10)>

Output:
Out[57]:

<Compressed Sparse Row sparse matrix of dtype 'float64'
	with 976 stored elements and shape (244, 10)>

Since the resulting matrix is sparse – most of its elements are 0 – sklearn uses a more efficient representation than a regular numpy array. We can convert to a regular (dense) array:

`python
Since the resulting matrix is sparse – most of its elements are 0 – sklearn uses a more efficient representation than a regular numpy array. We can convert to a regular (dense) array:
`

Since the resulting matrix is sparse – most of its elements are 0 – sklearn uses a more efficient representation than a regular numpy array. We can convert to a regular (dense) array:

`python
Since the resulting matrix is sparse – most of its elements are 0 – sklearn uses a more efficient representation than a regular numpy array. We can convert to a regular (dense) array:
`

Since the resulting matrix is sparse – most of its elements are 0 – sklearn uses a more efficient representation than a regular numpy array. We can convert to a regular (dense) array:

`python

`

`python
In [58]:


ohe.transform(tips_cat).toarray()
`

Output:
Out[58]:

array([[1., 0., 0., ..., 0., 1., 0.],
       [1., 0., 1., ..., 1., 1., 0.],
       [0., 1., 0., ..., 0., 1., 0.],
       ...,
       [1., 0., 1., ..., 1., 0., 1.],
       [0., 1., 1., ..., 0., 1., 0.],
       [1., 0., 1., ..., 0., 1., 0.]])

`python
In [58]:


ohe.transform(tips_cat).toarray()
`

`python
In [58]:
`

Output:
Out[58]:

array([[1., 0., 0., ..., 0., 1., 0.],
       [1., 0., 1., ..., 1., 1., 0.],
       [0., 1., 0., ..., 0., 1., 0.],
       ...,
       [1., 0., 1., ..., 1., 0., 1.],
       [0., 1., 1., ..., 0., 1., 0.],
       [1., 0., 1., ..., 0., 1., 0.]])

Output:
Out[58]:

array([[1., 0., 0., ..., 0., 1., 0.],
       [1., 0., 1., ..., 1., 1., 0.],
       [0., 1., 0., ..., 0., 1., 0.],
       ...,
       [1., 0., 1., ..., 1., 0., 1.],
       [0., 1., 1., ..., 0., 1., 0.],
       [1., 0., 1., ..., 0., 1., 0.]])

Notice that the column names from tips_cat are no longer stored anywhere (remember, fit converts the input to a numpy array before proceeding).
We can use the get_feature_names_out method on ohe to access the names of the one-hot-encoded columns, though:

`python
Notice that the column names from tips_cat are no longer stored anywhere (remember, fit converts the input to a numpy array before proceeding).
We can use the get_feature_names_out method on ohe to access the names of the one-hot-encoded columns, though:
`

Notice that the column names from tips_cat are no longer stored anywhere (remember, fit converts the input to a numpy array before proceeding).
We can use the get_feature_names_out method on ohe to access the names of the one-hot-encoded columns, though:

`python
Notice that the column names from tips_cat are no longer stored anywhere (remember, fit converts the input to a numpy array before proceeding).
We can use the get_feature_names_out method on ohe to access the names of the one-hot-encoded columns, though:
`

Notice that the column names from tips_cat are no longer stored anywhere (remember, fit converts the input to a numpy array before proceeding).
We can use the get_feature_names_out method on ohe to access the names of the one-hot-encoded columns, though:

`python

`

`python
In [59]:


ohe.get_feature_names_out() # x0, x1, x2, and x3 correspond to column names in tips_cat.
`

Output:
Out[59]:

array(['sex_Female', 'sex_Male', 'smoker_No', 'smoker_Yes', 'day_Fri',
       'day_Sat', 'day_Sun', 'day_Thur', 'time_Dinner', 'time_Lunch'],
      dtype=object)

`python
In [59]:


ohe.get_feature_names_out() # x0, x1, x2, and x3 correspond to column names in tips_cat.
`

`python
In [59]:
`

Output:
Out[59]:

array(['sex_Female', 'sex_Male', 'smoker_No', 'smoker_Yes', 'day_Fri',
       'day_Sat', 'day_Sun', 'day_Thur', 'time_Dinner', 'time_Lunch'],
      dtype=object)

Output:
Out[59]:

array(['sex_Female', 'sex_Male', 'smoker_No', 'smoker_Yes', 'day_Fri',
       'day_Sat', 'day_Sun', 'day_Thur', 'time_Dinner', 'time_Lunch'],
      dtype=object)

`python
In [60]:


pd.DataFrame(ohe.transform(tips_cat).toarray(), 
             columns=ohe.get_feature_names_out()) # If we need a DataFrame back, for some reason.
`

Output:
Out[60]:







sex_Female
sex_Male
smoker_No
smoker_Yes
...
day_Sun
day_Thur
time_Dinner
time_Lunch




0
1.0
0.0
0.0
1.0
...
0.0
0.0
1.0
0.0


1
1.0
0.0
1.0
0.0
...
0.0
1.0
1.0
0.0


2
0.0
1.0
0.0
1.0
...
0.0
0.0
1.0
0.0


...
...
...
...
...
...
...
...
...
...


241
1.0
0.0
1.0
0.0
...
0.0
1.0
0.0
1.0


242
0.0
1.0
1.0
0.0
...
0.0
0.0
1.0
0.0


243
1.0
0.0
1.0
0.0
...
0.0
0.0
1.0
0.0



244 rows × 10 columns

`python
In [60]:


pd.DataFrame(ohe.transform(tips_cat).toarray(), 
             columns=ohe.get_feature_names_out()) # If we need a DataFrame back, for some reason.
`

`python
In [60]:
`

Output:
Out[60]:







sex_Female
sex_Male
smoker_No
smoker_Yes
...
day_Sun
day_Thur
time_Dinner
time_Lunch




0
1.0
0.0
0.0
1.0
...
0.0
0.0
1.0
0.0


1
1.0
0.0
1.0
0.0
...
0.0
1.0
1.0
0.0


2
0.0
1.0
0.0
1.0
...
0.0
0.0
1.0
0.0


...
...
...
...
...
...
...
...
...
...


241
1.0
0.0
1.0
0.0
...
0.0
1.0
0.0
1.0


242
0.0
1.0
1.0
0.0
...
0.0
0.0
1.0
0.0


243
1.0
0.0
1.0
0.0
...
0.0
0.0
1.0
0.0



244 rows × 10 columns

Output:
Out[60]:







sex_Female
sex_Male
smoker_No
smoker_Yes
...
day_Sun
day_Thur
time_Dinner
time_Lunch




0
1.0
0.0
0.0
1.0
...
0.0
0.0
1.0
0.0


1
1.0
0.0
1.0
0.0
...
0.0
1.0
1.0
0.0


2
0.0
1.0
0.0
1.0
...
0.0
0.0
1.0
0.0


...
...
...
...
...
...
...
...
...
...


241
1.0
0.0
1.0
0.0
...
0.0
1.0
0.0
1.0


242
0.0
1.0
1.0
0.0
...
0.0
0.0
1.0
0.0


243
1.0
0.0
1.0
0.0
...
0.0
0.0
1.0
0.0



244 rows × 10 columns

Summary, next time¶

`python
Summary, next time¶
`

Summary, next time¶

`python
Summary, next time¶
`

Summary, next time¶

`python

`

Summary¶
To transform a categorical nominal variable into a quantitative variable, use one hot encoding.
To transform a categorical ordinal variable into a quantitative variable, use an ordinal encoding.
Quantitative feature transformations allow us to use linear models to model non-linear data.

`python
Summary¶
To transform a categorical nominal variable into a quantitative variable, use one hot encoding.
To transform a categorical ordinal variable into a quantitative variable, use an ordinal encoding.
Quantitative feature transformations allow us to use linear models to model non-linear data.
`

Summary¶
To transform a categorical nominal variable into a quantitative variable, use one hot encoding.
To transform a categorical ordinal variable into a quantitative variable, use an ordinal encoding.
Quantitative feature transformations allow us to use linear models to model non-linear data.

`python
Summary¶
To transform a categorical nominal variable into a quantitative variable, use one hot encoding.
To transform a categorical ordinal variable into a quantitative variable, use an ordinal encoding.
Quantitative feature transformations allow us to use linear models to model non-linear data.
`

Summary¶
To transform a categorical nominal variable into a quantitative variable, use one hot encoding.
To transform a categorical ordinal variable into a quantitative variable, use an ordinal encoding.
Quantitative feature transformations allow us to use linear models to model non-linear data.

`python

`

Next time¶
Pipelines that allow us to easily combine these steps
Multicollinearity.
Generalization.

`python
Next time¶
Pipelines that allow us to easily combine these steps
Multicollinearity.
Generalization.
`

Next time¶
Pipelines that allow us to easily combine these steps
Multicollinearity.
Generalization.

`python
Next time¶
Pipelines that allow us to easily combine these steps
Multicollinearity.
Generalization.
`

Next time¶
Pipelines that allow us to easily combine these steps
Multicollinearity.
Generalization.

`python

`