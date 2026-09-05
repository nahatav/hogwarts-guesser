`python
In [1]:


import plotly.io as pio
pio.renderers.default = "png"
`

`python
In [1]:
`

`python
In [2]:


from dsc80_utils import *
import lec16_util as util
`

`python
In [2]:
`

Lecture 16 – Pipelines, Multicollinearity, and Generalization¶DSC 80, Summer 2026¶

`python
Lecture 16 – Pipelines, Multicollinearity, and Generalization¶DSC 80, Summer 2026¶
`

Lecture 16 – Pipelines, Multicollinearity, and Generalization¶DSC 80, Summer 2026¶

`python
Lecture 16 – Pipelines, Multicollinearity, and Generalization¶DSC 80, Summer 2026¶
`

Lecture 16 – Pipelines, Multicollinearity, and Generalization¶DSC 80, Summer 2026¶

`python

`

Agenda 📆¶
Review: transformers.
Pipelines.
Multicollinearity.
Generalization.
Bias and variance.
Train-test splits.

`python
Agenda 📆¶
Review: transformers.
Pipelines.
Multicollinearity.
Generalization.
Bias and variance.
Train-test splits.
`

Agenda 📆¶
Review: transformers.
Pipelines.
Multicollinearity.
Generalization.
Bias and variance.
Train-test splits.

`python
Agenda 📆¶
Review: transformers.
Pipelines.
Multicollinearity.
Generalization.
Bias and variance.
Train-test splits.
`

Agenda 📆¶
Review: transformers.
Pipelines.
Multicollinearity.
Generalization.
Bias and variance.
Train-test splits.

`python

`

Review: transformers¶

`python
Review: transformers¶
`

Review: transformers¶

`python
Review: transformers¶
`

Review: transformers¶

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
In [3]:


tips = px.data.tips()
tips.head()
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
16.99
1.01
Female
No
Sun
Dinner
2


1
10.34
1.66
Male
No
Sun
Dinner
3


2
21.01
3.50
Male
No
Sun
Dinner
3


3
23.68
3.31
Male
No
Sun
Dinner
2


4
24.59
3.61
Female
No
Sun
Dinner
4

`python
In [3]:


tips = px.data.tips()
tips.head()
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
16.99
1.01
Female
No
Sun
Dinner
2


1
10.34
1.66
Male
No
Sun
Dinner
3


2
21.01
3.50
Male
No
Sun
Dinner
3


3
23.68
3.31
Male
No
Sun
Dinner
2


4
24.59
3.61
Female
No
Sun
Dinner
4

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
16.99
1.01
Female
No
Sun
Dinner
2


1
10.34
1.66
Male
No
Sun
Dinner
3


2
21.01
3.50
Male
No
Sun
Dinner
3


3
23.68
3.31
Male
No
Sun
Dinner
2


4
24.59
3.61
Female
No
Sun
Dinner
4

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

`python
In [4]:


from sklearn.preprocessing import Binarizer
bi = Binarizer(threshold=20)
`

`python
In [4]:
`

`python
In [5]:


transformed_bills = bi.transform(tips[['total_bill']].to_numpy()) 
transformed_bills[:5]
`

Output:
Out[5]:

array([[0.],
       [0.],
       [1.],
       [1.],
       [1.]])

`python
In [5]:


transformed_bills = bi.transform(tips[['total_bill']].to_numpy()) 
transformed_bills[:5]
`

`python
In [5]:
`

Output:
Out[5]:

array([[0.],
       [0.],
       [1.],
       [1.],
       [1.]])

Output:
Out[5]:

array([[0.],
       [0.],
       [1.],
       [1.],
       [1.]])

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
In [6]:


tips_quant = tips[['total_bill', 'size']]
tips_quant.head()
`

Output:
Out[6]:







total_bill
size




0
16.99
2


1
10.34
3


2
21.01
3


3
23.68
2


4
24.59
4

`python
In [6]:


tips_quant = tips[['total_bill', 'size']]
tips_quant.head()
`

`python
In [6]:
`

Output:
Out[6]:







total_bill
size




0
16.99
2


1
10.34
3


2
21.01
3


3
23.68
2


4
24.59
4

Output:
Out[6]:







total_bill
size




0
16.99
2


1
10.34
3


2
21.01
3


3
23.68
2


4
24.59
4

`python
In [7]:


from sklearn.preprocessing import StandardScaler
stdscaler = StandardScaler()
`

`python
In [7]:
`

`python
In [8]:


# This is like saying "determine the mean and SD of each column in tips_quant".
stdscaler.fit(tips_quant)
`

Output:
Out[8]:

StandardScaler()In a Jupyter environment, please rerun this cell to show the HTML representation or trust the notebook. On GitHub, the HTML representation is unable to render, please try loading this page with nbviewer.org.  StandardScaler?Documentation for StandardScaleriFittedStandardScaler()

`python
In [8]:


# This is like saying "determine the mean and SD of each column in tips_quant".
stdscaler.fit(tips_quant)
`

`python
In [8]:
`

Output:
Out[8]:

StandardScaler()In a Jupyter environment, please rerun this cell to show the HTML representation or trust the notebook. On GitHub, the HTML representation is unable to render, please try loading this page with nbviewer.org.  StandardScaler?Documentation for StandardScaleriFittedStandardScaler()

Output:
Out[8]:

StandardScaler()In a Jupyter environment, please rerun this cell to show the HTML representation or trust the notebook. On GitHub, the HTML representation is unable to render, please try loading this page with nbviewer.org.  StandardScaler?Documentation for StandardScaleriFittedStandardScaler()

`python
In [9]:


# First column is 'total_bill', second column is 'size'.
tips_quant_z = stdscaler.transform(tips_quant)
tips_quant_z[:5]
`

Output:
Out[9]:

array([[-0.31, -0.6 ],
       [-1.06,  0.45],
       [ 0.14,  0.45],
       [ 0.44, -0.6 ],
       [ 0.54,  1.51]])

`python
In [9]:


# First column is 'total_bill', second column is 'size'.
tips_quant_z = stdscaler.transform(tips_quant)
tips_quant_z[:5]
`

`python
In [9]:
`

Output:
Out[9]:

array([[-0.31, -0.6 ],
       [-1.06,  0.45],
       [ 0.14,  0.45],
       [ 0.44, -0.6 ],
       [ 0.54,  1.51]])

Output:
Out[9]:

array([[-0.31, -0.6 ],
       [-1.06,  0.45],
       [ 0.14,  0.45],
       [ 0.44, -0.6 ],
       [ 0.54,  1.51]])

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
In [10]:


stdscaler.mean_
`

Output:
Out[10]:

array([19.79,  2.57])

`python
In [10]:


stdscaler.mean_
`

`python
In [10]:
`

Output:
Out[10]:

array([19.79,  2.57])

Output:
Out[10]:

array([19.79,  2.57])

`python
In [11]:


stdscaler.var_
`

Output:
Out[11]:

array([78.93,  0.9 ])

`python
In [11]:


stdscaler.var_
`

`python
In [11]:
`

Output:
Out[11]:

array([78.93,  0.9 ])

Output:
Out[11]:

array([78.93,  0.9 ])

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
In [12]:


stdscaler.transform(tips_quant.sample(5))
`

Output:
Out[12]:

array([[-1.04, -0.6 ],
       [ 1.63,  3.61],
       [-0.73, -0.6 ],
       [-0.49, -0.6 ],
       [-0.72, -0.6 ]])

`python
In [12]:


stdscaler.transform(tips_quant.sample(5))
`

`python
In [12]:
`

Output:
Out[12]:

array([[-1.04, -0.6 ],
       [ 1.63,  3.61],
       [-0.73, -0.6 ],
       [-0.49, -0.6 ],
       [-0.72, -0.6 ]])

Output:
Out[12]:

array([[-1.04, -0.6 ],
       [ 1.63,  3.61],
       [-0.73, -0.6 ],
       [-0.49, -0.6 ],
       [-0.72, -0.6 ]])

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
In [13]:


stdscaler.fit_transform(tips_quant)
`

Output:
Out[13]:

array([[-0.31, -0.6 ],
       [-1.06,  0.45],
       [ 0.14,  0.45],
       ...,
       [ 0.32, -0.6 ],
       [-0.22, -0.6 ],
       [-0.11, -0.6 ]])

`python
In [13]:


stdscaler.fit_transform(tips_quant)
`

`python
In [13]:
`

Output:
Out[13]:

array([[-0.31, -0.6 ],
       [-1.06,  0.45],
       [ 0.14,  0.45],
       ...,
       [ 0.32, -0.6 ],
       [-0.22, -0.6 ],
       [-0.11, -0.6 ]])

Output:
Out[13]:

array([[-0.31, -0.6 ],
       [-1.06,  0.45],
       [ 0.14,  0.45],
       ...,
       [ 0.32, -0.6 ],
       [-0.22, -0.6 ],
       [-0.11, -0.6 ]])

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
In [14]:


tips_cat = tips[['sex', 'smoker', 'day', 'time']]
tips_cat.head()
`

Output:
Out[14]:







sex
smoker
day
time




0
Female
No
Sun
Dinner


1
Male
No
Sun
Dinner


2
Male
No
Sun
Dinner


3
Male
No
Sun
Dinner


4
Female
No
Sun
Dinner

`python
In [14]:


tips_cat = tips[['sex', 'smoker', 'day', 'time']]
tips_cat.head()
`

`python
In [14]:
`

Output:
Out[14]:







sex
smoker
day
time




0
Female
No
Sun
Dinner


1
Male
No
Sun
Dinner


2
Male
No
Sun
Dinner


3
Male
No
Sun
Dinner


4
Female
No
Sun
Dinner

Output:
Out[14]:







sex
smoker
day
time




0
Female
No
Sun
Dinner


1
Male
No
Sun
Dinner


2
Male
No
Sun
Dinner


3
Male
No
Sun
Dinner


4
Female
No
Sun
Dinner

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
In [15]:


from sklearn.preprocessing import OneHotEncoder
ohe = OneHotEncoder()
ohe.fit(tips_cat)
`

Output:
Out[15]:

OneHotEncoder()In a Jupyter environment, please rerun this cell to show the HTML representation or trust the notebook. On GitHub, the HTML representation is unable to render, please try loading this page with nbviewer.org.  OneHotEncoder?Documentation for OneHotEncoderiFittedOneHotEncoder()

`python
In [15]:


from sklearn.preprocessing import OneHotEncoder
ohe = OneHotEncoder()
ohe.fit(tips_cat)
`

`python
In [15]:
`

Output:
Out[15]:

OneHotEncoder()In a Jupyter environment, please rerun this cell to show the HTML representation or trust the notebook. On GitHub, the HTML representation is unable to render, please try loading this page with nbviewer.org.  OneHotEncoder?Documentation for OneHotEncoderiFittedOneHotEncoder()

Output:
Out[15]:

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
In [16]:


ohe.transform(tips_cat)
`

Output:
Out[16]:

<Compressed Sparse Row sparse matrix of dtype 'float64'
	with 976 stored elements and shape (244, 10)>

`python
In [16]:


ohe.transform(tips_cat)
`

`python
In [16]:
`

Output:
Out[16]:

<Compressed Sparse Row sparse matrix of dtype 'float64'
	with 976 stored elements and shape (244, 10)>

Output:
Out[16]:

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
In [17]:


ohe.transform(tips_cat).toarray()
`

Output:
Out[17]:

array([[1., 0., 1., ..., 0., 1., 0.],
       [0., 1., 1., ..., 0., 1., 0.],
       [0., 1., 1., ..., 0., 1., 0.],
       ...,
       [0., 1., 0., ..., 0., 1., 0.],
       [0., 1., 1., ..., 0., 1., 0.],
       [1., 0., 1., ..., 1., 1., 0.]])

`python
In [17]:


ohe.transform(tips_cat).toarray()
`

`python
In [17]:
`

Output:
Out[17]:

array([[1., 0., 1., ..., 0., 1., 0.],
       [0., 1., 1., ..., 0., 1., 0.],
       [0., 1., 1., ..., 0., 1., 0.],
       ...,
       [0., 1., 0., ..., 0., 1., 0.],
       [0., 1., 1., ..., 0., 1., 0.],
       [1., 0., 1., ..., 1., 1., 0.]])

Output:
Out[17]:

array([[1., 0., 1., ..., 0., 1., 0.],
       [0., 1., 1., ..., 0., 1., 0.],
       [0., 1., 1., ..., 0., 1., 0.],
       ...,
       [0., 1., 0., ..., 0., 1., 0.],
       [0., 1., 1., ..., 0., 1., 0.],
       [1., 0., 1., ..., 1., 1., 0.]])

Notice that the column names from tips_cat are no longer stored anywhere (remember, fit converts the input to a numpy array before proceeding). This makes it hard to interpret the meaning of the 1's and 0's in the array.
We can use the get_feature_names_out method on ohe to access the names of the one-hot-encoded columns:

`python
Notice that the column names from tips_cat are no longer stored anywhere (remember, fit converts the input to a numpy array before proceeding). This makes it hard to interpret the meaning of the 1's and 0's in the array.
We can use the get_feature_names_out method on ohe to access the names of the one-hot-encoded columns:
`

Notice that the column names from tips_cat are no longer stored anywhere (remember, fit converts the input to a numpy array before proceeding). This makes it hard to interpret the meaning of the 1's and 0's in the array.
We can use the get_feature_names_out method on ohe to access the names of the one-hot-encoded columns:

`python
Notice that the column names from tips_cat are no longer stored anywhere (remember, fit converts the input to a numpy array before proceeding). This makes it hard to interpret the meaning of the 1's and 0's in the array.
We can use the get_feature_names_out method on ohe to access the names of the one-hot-encoded columns:
`

Notice that the column names from tips_cat are no longer stored anywhere (remember, fit converts the input to a numpy array before proceeding). This makes it hard to interpret the meaning of the 1's and 0's in the array.
We can use the get_feature_names_out method on ohe to access the names of the one-hot-encoded columns:

`python

`

`python
In [18]:


ohe.get_feature_names_out()
`

Output:
Out[18]:

array(['sex_Female', 'sex_Male', 'smoker_No', 'smoker_Yes', 'day_Fri',
       'day_Sat', 'day_Sun', 'day_Thur', 'time_Dinner', 'time_Lunch'],
      dtype=object)

`python
In [18]:


ohe.get_feature_names_out()
`

`python
In [18]:
`

Output:
Out[18]:

array(['sex_Female', 'sex_Male', 'smoker_No', 'smoker_Yes', 'day_Fri',
       'day_Sat', 'day_Sun', 'day_Thur', 'time_Dinner', 'time_Lunch'],
      dtype=object)

Output:
Out[18]:

array(['sex_Female', 'sex_Male', 'smoker_No', 'smoker_Yes', 'day_Fri',
       'day_Sat', 'day_Sun', 'day_Thur', 'time_Dinner', 'time_Lunch'],
      dtype=object)

`python
In [19]:


pd.DataFrame(ohe.transform(tips_cat).toarray(), 
             columns=ohe.get_feature_names_out())
`

Output:
Out[19]:







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
1.0
0.0
...
1.0
0.0
1.0
0.0


1
0.0
1.0
1.0
0.0
...
1.0
0.0
1.0
0.0


2
0.0
1.0
1.0
0.0
...
1.0
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
0.0
1.0
0.0
1.0
...
0.0
0.0
1.0
0.0


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
1.0
1.0
0.0



244 rows × 10 columns

`python
In [19]:


pd.DataFrame(ohe.transform(tips_cat).toarray(), 
             columns=ohe.get_feature_names_out())
`

`python
In [19]:
`

Output:
Out[19]:







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
1.0
0.0
...
1.0
0.0
1.0
0.0


1
0.0
1.0
1.0
0.0
...
1.0
0.0
1.0
0.0


2
0.0
1.0
1.0
0.0
...
1.0
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
0.0
1.0
0.0
1.0
...
0.0
0.0
1.0
0.0


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
1.0
1.0
0.0



244 rows × 10 columns

Output:
Out[19]:







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
1.0
0.0
...
1.0
0.0
1.0
0.0


1
0.0
1.0
1.0
0.0
...
1.0
0.0
1.0
0.0


2
0.0
1.0
1.0
0.0
...
1.0
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
0.0
1.0
0.0
1.0
...
0.0
0.0
1.0
0.0


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
1.0
1.0
0.0



244 rows × 10 columns

Example transformer: FunctionTransformer¶A FunctionTransformer enables you to use your own functions on entire columns. Think of it as the sklearn equivalent of apply.

`python
Example transformer: FunctionTransformer¶A FunctionTransformer enables you to use your own functions on entire columns. Think of it as the sklearn equivalent of apply.
`

Example transformer: FunctionTransformer¶A FunctionTransformer enables you to use your own functions on entire columns. Think of it as the sklearn equivalent of apply.

`python
Example transformer: FunctionTransformer¶A FunctionTransformer enables you to use your own functions on entire columns. Think of it as the sklearn equivalent of apply.
`

Example transformer: FunctionTransformer¶A FunctionTransformer enables you to use your own functions on entire columns. Think of it as the sklearn equivalent of apply.

`python

`

`python
In [20]:


from sklearn.preprocessing import FunctionTransformer
f = FunctionTransformer(np.sqrt)
f.transform([1, 2, 3])
`

Output:
Out[20]:

array([1.  , 1.41, 1.73])

`python
In [20]:


from sklearn.preprocessing import FunctionTransformer
f = FunctionTransformer(np.sqrt)
f.transform([1, 2, 3])
`

`python
In [20]:
`

Output:
Out[20]:

array([1.  , 1.41, 1.73])

Output:
Out[20]:

array([1.  , 1.41, 1.73])

`python
In [21]:


# Same result, using numpy only.
np.sqrt([1, 2, 3])
`

Output:
Out[21]:

array([1.  , 1.41, 1.73])

`python
In [21]:


# Same result, using numpy only.
np.sqrt([1, 2, 3])
`

`python
In [21]:
`

Output:
Out[21]:

array([1.  , 1.41, 1.73])

Output:
Out[21]:

array([1.  , 1.41, 1.73])

We didn't really need sklearn for that! But using FunctionTransformer allows us to easily incorporate this step with other sklearn encoding steps.

`python
We didn't really need sklearn for that! But using FunctionTransformer allows us to easily incorporate this step with other sklearn encoding steps.
`

We didn't really need sklearn for that! But using FunctionTransformer allows us to easily incorporate this step with other sklearn encoding steps.

`python
We didn't really need sklearn for that! But using FunctionTransformer allows us to easily incorporate this step with other sklearn encoding steps.
`

We didn't really need sklearn for that! But using FunctionTransformer allows us to easily incorporate this step with other sklearn encoding steps.

`python

`

Pipelines¶

`python
Pipelines¶
`

Pipelines¶

`python
Pipelines¶
`

Pipelines¶

`python

`

So far, we've used transformers for feature engineering and models for prediction. We can combine these steps into a single Pipeline.

`python
So far, we've used transformers for feature engineering and models for prediction. We can combine these steps into a single Pipeline.
`

So far, we've used transformers for feature engineering and models for prediction. We can combine these steps into a single Pipeline.

`python
So far, we've used transformers for feature engineering and models for prediction. We can combine these steps into a single Pipeline.
`

So far, we've used transformers for feature engineering and models for prediction. We can combine these steps into a single Pipeline.

`python

`

Pipelines in sklearn¶

`python
Pipelines in sklearn¶
`

Pipelines in sklearn¶

`python
Pipelines in sklearn¶
`

Pipelines in sklearn¶

`python

`

Pipeline allows you to sequentially apply a list of transformers to preprocess the data and, if desired, conclude the sequence with a final predictor for predictive modeling.

`python
Pipeline allows you to sequentially apply a list of transformers to preprocess the data and, if desired, conclude the sequence with a final predictor for predictive modeling.
`

Pipeline allows you to sequentially apply a list of transformers to preprocess the data and, if desired, conclude the sequence with a final predictor for predictive modeling.

`python
Pipeline allows you to sequentially apply a list of transformers to preprocess the data and, if desired, conclude the sequence with a final predictor for predictive modeling.
`

Pipeline allows you to sequentially apply a list of transformers to preprocess the data and, if desired, conclude the sequence with a final predictor for predictive modeling.

`python

`

General template: pl = Pipeline([trans_1, trans_2, ..., model])
Note that the model is optional.

`python
General template: pl = Pipeline([trans_1, trans_2, ..., model])
Note that the model is optional.
`

General template: pl = Pipeline([trans_1, trans_2, ..., model])
Note that the model is optional.

`python
General template: pl = Pipeline([trans_1, trans_2, ..., model])
Note that the model is optional.
`

General template: pl = Pipeline([trans_1, trans_2, ..., model])
Note that the model is optional.

`python

`

Once a Pipeline is instantiated, you can fit all steps (transformers and model) using pl.fit(X, y).

`python
Once a Pipeline is instantiated, you can fit all steps (transformers and model) using pl.fit(X, y).
`

Once a Pipeline is instantiated, you can fit all steps (transformers and model) using pl.fit(X, y).

`python
Once a Pipeline is instantiated, you can fit all steps (transformers and model) using pl.fit(X, y).
`

Once a Pipeline is instantiated, you can fit all steps (transformers and model) using pl.fit(X, y).

`python

`

To make predictions using raw, untransformed data, use pl.predict(X).

`python
To make predictions using raw, untransformed data, use pl.predict(X).
`

To make predictions using raw, untransformed data, use pl.predict(X).

`python
To make predictions using raw, untransformed data, use pl.predict(X).
`

To make predictions using raw, untransformed data, use pl.predict(X).

`python

`

Pipeline takes as input a list of 2-tuples, where:
The first element is a "name" that we choose for the step. It can be anything!
The second element is an instance of a transformer or estimator (model) class.

`python
Pipeline takes as input a list of 2-tuples, where:
The first element is a "name" that we choose for the step. It can be anything!
The second element is an instance of a transformer or estimator (model) class.
`

Pipeline takes as input a list of 2-tuples, where:
The first element is a "name" that we choose for the step. It can be anything!
The second element is an instance of a transformer or estimator (model) class.

`python
Pipeline takes as input a list of 2-tuples, where:
The first element is a "name" that we choose for the step. It can be anything!
The second element is an instance of a transformer or estimator (model) class.
`

Pipeline takes as input a list of 2-tuples, where:
The first element is a "name" that we choose for the step. It can be anything!
The second element is an instance of a transformer or estimator (model) class.

`python

`

Our first Pipeline¶Let's build a Pipeline that:

One hot encodes the categorical features in tips.
Fits a regression model on the one hot encoded data.

`python
Our first Pipeline¶Let's build a Pipeline that:

One hot encodes the categorical features in tips.
Fits a regression model on the one hot encoded data.
`

Our first Pipeline¶Let's build a Pipeline that:

One hot encodes the categorical features in tips.
Fits a regression model on the one hot encoded data.

`python
Our first Pipeline¶Let's build a Pipeline that:

One hot encodes the categorical features in tips.
Fits a regression model on the one hot encoded data.
`

Our first Pipeline¶Let's build a Pipeline that:

One hot encodes the categorical features in tips.
Fits a regression model on the one hot encoded data.

`python

`

`python
In [22]:


# Start with categorical features only.
tips_cat.head()
`

Output:
Out[22]:







sex
smoker
day
time




0
Female
No
Sun
Dinner


1
Male
No
Sun
Dinner


2
Male
No
Sun
Dinner


3
Male
No
Sun
Dinner


4
Female
No
Sun
Dinner

`python
In [22]:


# Start with categorical features only.
tips_cat.head()
`

`python
In [22]:
`

Output:
Out[22]:







sex
smoker
day
time




0
Female
No
Sun
Dinner


1
Male
No
Sun
Dinner


2
Male
No
Sun
Dinner


3
Male
No
Sun
Dinner


4
Female
No
Sun
Dinner

Output:
Out[22]:







sex
smoker
day
time




0
Female
No
Sun
Dinner


1
Male
No
Sun
Dinner


2
Male
No
Sun
Dinner


3
Male
No
Sun
Dinner


4
Female
No
Sun
Dinner

`python
In [23]:


from sklearn.pipeline import Pipeline
from sklearn.linear_model import LinearRegression

pl = Pipeline([
    ('one-hot', OneHotEncoder()),
    ('lin-reg', LinearRegression())
])
`

`python
In [23]:
`

Now that pl is instantiated, we fit it the same way we would fit the individual steps.

`python
Now that pl is instantiated, we fit it the same way we would fit the individual steps.
`

Now that pl is instantiated, we fit it the same way we would fit the individual steps.

`python
Now that pl is instantiated, we fit it the same way we would fit the individual steps.
`

Now that pl is instantiated, we fit it the same way we would fit the individual steps.

`python

`

`python
In [24]:


pl.fit(tips_cat, tips['tip'])
`

Output:
Out[24]:

Pipeline(steps=[('one-hot', OneHotEncoder()), ('lin-reg', LinearRegression())])In a Jupyter environment, please rerun this cell to show the HTML representation or trust the notebook. On GitHub, the HTML representation is unable to render, please try loading this page with nbviewer.org.  Pipeline?Documentation for PipelineiFittedPipeline(steps=[('one-hot', OneHotEncoder()), ('lin-reg', LinearRegression())])  OneHotEncoder?Documentation for OneHotEncoderOneHotEncoder()  LinearRegression?Documentation for LinearRegressionLinearRegression()

`python
In [24]:


pl.fit(tips_cat, tips['tip'])
`

`python
In [24]:
`

Output:
Out[24]:

Pipeline(steps=[('one-hot', OneHotEncoder()), ('lin-reg', LinearRegression())])In a Jupyter environment, please rerun this cell to show the HTML representation or trust the notebook. On GitHub, the HTML representation is unable to render, please try loading this page with nbviewer.org.  Pipeline?Documentation for PipelineiFittedPipeline(steps=[('one-hot', OneHotEncoder()), ('lin-reg', LinearRegression())])  OneHotEncoder?Documentation for OneHotEncoderOneHotEncoder()  LinearRegression?Documentation for LinearRegressionLinearRegression()

Output:
Out[24]:

Pipeline(steps=[('one-hot', OneHotEncoder()), ('lin-reg', LinearRegression())])In a Jupyter environment, please rerun this cell to show the HTML representation or trust the notebook. On GitHub, the HTML representation is unable to render, please try loading this page with nbviewer.org.  Pipeline?Documentation for PipelineiFittedPipeline(steps=[('one-hot', OneHotEncoder()), ('lin-reg', LinearRegression())])  OneHotEncoder?Documentation for OneHotEncoderOneHotEncoder()  LinearRegression?Documentation for LinearRegressionLinearRegression()

Now, to make predictions using raw data, all we need to do is use pl.predict:

`python
Now, to make predictions using raw data, all we need to do is use pl.predict:
`

Now, to make predictions using raw data, all we need to do is use pl.predict:

`python
Now, to make predictions using raw data, all we need to do is use pl.predict:
`

Now, to make predictions using raw data, all we need to do is use pl.predict:

`python

`

`python
In [25]:


pl.predict(tips_cat.iloc[:5])
`

Output:
Out[25]:

array([3.1 , 3.27, 3.27, 3.27, 3.1 ])

`python
In [25]:


pl.predict(tips_cat.iloc[:5])
`

`python
In [25]:
`

Output:
Out[25]:

array([3.1 , 3.27, 3.27, 3.27, 3.1 ])

Output:
Out[25]:

array([3.1 , 3.27, 3.27, 3.27, 3.1 ])

pl performs both feature transformation and prediction with just a single call to predict!

`python
pl performs both feature transformation and prediction with just a single call to predict!
`

pl performs both feature transformation and prediction with just a single call to predict!

`python
pl performs both feature transformation and prediction with just a single call to predict!
`

pl performs both feature transformation and prediction with just a single call to predict!

`python

`

We can access individual "steps" of a Pipeline through the named_steps attribute:

`python
We can access individual "steps" of a Pipeline through the named_steps attribute:
`

We can access individual "steps" of a Pipeline through the named_steps attribute:

`python
We can access individual "steps" of a Pipeline through the named_steps attribute:
`

We can access individual "steps" of a Pipeline through the named_steps attribute:

`python

`

`python
In [26]:


pl.named_steps
`

Output:
Out[26]:

{'one-hot': OneHotEncoder(), 'lin-reg': LinearRegression()}

`python
In [26]:


pl.named_steps
`

`python
In [26]:
`

Output:
Out[26]:

{'one-hot': OneHotEncoder(), 'lin-reg': LinearRegression()}

Output:
Out[26]:

{'one-hot': OneHotEncoder(), 'lin-reg': LinearRegression()}

`python
In [27]:


pl.named_steps['one-hot'].transform(tips_cat).toarray()
`

Output:
Out[27]:

array([[1., 0., 1., ..., 0., 1., 0.],
       [0., 1., 1., ..., 0., 1., 0.],
       [0., 1., 1., ..., 0., 1., 0.],
       ...,
       [0., 1., 0., ..., 0., 1., 0.],
       [0., 1., 1., ..., 0., 1., 0.],
       [1., 0., 1., ..., 1., 1., 0.]])

`python
In [27]:


pl.named_steps['one-hot'].transform(tips_cat).toarray()
`

`python
In [27]:
`

Output:
Out[27]:

array([[1., 0., 1., ..., 0., 1., 0.],
       [0., 1., 1., ..., 0., 1., 0.],
       [0., 1., 1., ..., 0., 1., 0.],
       ...,
       [0., 1., 0., ..., 0., 1., 0.],
       [0., 1., 1., ..., 0., 1., 0.],
       [1., 0., 1., ..., 1., 1., 0.]])

Output:
Out[27]:

array([[1., 0., 1., ..., 0., 1., 0.],
       [0., 1., 1., ..., 0., 1., 0.],
       [0., 1., 1., ..., 0., 1., 0.],
       ...,
       [0., 1., 0., ..., 0., 1., 0.],
       [0., 1., 1., ..., 0., 1., 0.],
       [1., 0., 1., ..., 1., 1., 0.]])

`python
In [28]:


pl.named_steps['one-hot'].get_feature_names_out()
`

Output:
Out[28]:

array(['sex_Female', 'sex_Male', 'smoker_No', 'smoker_Yes', 'day_Fri',
       'day_Sat', 'day_Sun', 'day_Thur', 'time_Dinner', 'time_Lunch'],
      dtype=object)

`python
In [28]:


pl.named_steps['one-hot'].get_feature_names_out()
`

`python
In [28]:
`

Output:
Out[28]:

array(['sex_Female', 'sex_Male', 'smoker_No', 'smoker_Yes', 'day_Fri',
       'day_Sat', 'day_Sun', 'day_Thur', 'time_Dinner', 'time_Lunch'],
      dtype=object)

Output:
Out[28]:

array(['sex_Female', 'sex_Male', 'smoker_No', 'smoker_Yes', 'day_Fri',
       'day_Sat', 'day_Sun', 'day_Thur', 'time_Dinner', 'time_Lunch'],
      dtype=object)

`python
In [29]:


pl.named_steps['lin-reg'].coef_
`

Output:
Out[29]:

array([-0.09,  0.09, -0.04,  0.04, -0.2 , -0.13,  0.14,  0.19,  0.25,
       -0.25])

`python
In [29]:


pl.named_steps['lin-reg'].coef_
`

`python
In [29]:
`

Output:
Out[29]:

array([-0.09,  0.09, -0.04,  0.04, -0.2 , -0.13,  0.14,  0.19,  0.25,
       -0.25])

Output:
Out[29]:

array([-0.09,  0.09, -0.04,  0.04, -0.2 , -0.13,  0.14,  0.19,  0.25,
       -0.25])

pl also has a score method, the same way a fit LinearRegression instance does:

`python
pl also has a score method, the same way a fit LinearRegression instance does:
`

pl also has a score method, the same way a fit LinearRegression instance does:

`python
pl also has a score method, the same way a fit LinearRegression instance does:
`

pl also has a score method, the same way a fit LinearRegression instance does:

`python

`

`python
In [30]:


# Why is this so low?
pl.score(tips_cat, tips['tip'])
`

Output:
Out[30]:

0.027496790201475663

`python
In [30]:


# Why is this so low?
pl.score(tips_cat, tips['tip'])
`

`python
In [30]:
`

Output:
Out[30]:

0.027496790201475663

Output:
Out[30]:

0.027496790201475663

More sophisticated Pipelines¶

`python
More sophisticated Pipelines¶
`

More sophisticated Pipelines¶

`python
More sophisticated Pipelines¶
`

More sophisticated Pipelines¶

`python

`

In the previous example, we one hot encoded every input column. What if we want to perform different transformations on different columns?

`python
In the previous example, we one hot encoded every input column. What if we want to perform different transformations on different columns?
`

In the previous example, we one hot encoded every input column. What if we want to perform different transformations on different columns?

`python
In the previous example, we one hot encoded every input column. What if we want to perform different transformations on different columns?
`

In the previous example, we one hot encoded every input column. What if we want to perform different transformations on different columns?

`python

`

Solution: Use a ColumnTransformer.
Instantiate a ColumnTransformer using a list of 3-tuples, where:
The first element is a "name" that we choose for the transformer. It can be anything!
The second element is a transformer instance (e.g. OneHotEncoder()).
The third element is a list of relevant column names.

`python
Solution: Use a ColumnTransformer.
Instantiate a ColumnTransformer using a list of 3-tuples, where:
The first element is a "name" that we choose for the transformer. It can be anything!
The second element is a transformer instance (e.g. OneHotEncoder()).
The third element is a list of relevant column names.
`

Solution: Use a ColumnTransformer.
Instantiate a ColumnTransformer using a list of 3-tuples, where:
The first element is a "name" that we choose for the transformer. It can be anything!
The second element is a transformer instance (e.g. OneHotEncoder()).
The third element is a list of relevant column names.

`python
Solution: Use a ColumnTransformer.
Instantiate a ColumnTransformer using a list of 3-tuples, where:
The first element is a "name" that we choose for the transformer. It can be anything!
The second element is a transformer instance (e.g. OneHotEncoder()).
The third element is a list of relevant column names.
`

Solution: Use a ColumnTransformer.
Instantiate a ColumnTransformer using a list of 3-tuples, where:
The first element is a "name" that we choose for the transformer. It can be anything!
The second element is a transformer instance (e.g. OneHotEncoder()).
The third element is a list of relevant column names.

`python

`

Planning our first ColumnTransformer¶

`python
Planning our first ColumnTransformer¶
`

Planning our first ColumnTransformer¶

`python
Planning our first ColumnTransformer¶
`

Planning our first ColumnTransformer¶

`python

`

`python
In [31]:


from sklearn.compose import ColumnTransformer
`

`python
In [31]:
`

Let's perform different transformations on the quantitative and categorical features of tips (note that we are not transforming the response variable, 'tip').

`python
Let's perform different transformations on the quantitative and categorical features of tips (note that we are not transforming the response variable, 'tip').
`

Let's perform different transformations on the quantitative and categorical features of tips (note that we are not transforming the response variable, 'tip').

`python
Let's perform different transformations on the quantitative and categorical features of tips (note that we are not transforming the response variable, 'tip').
`

Let's perform different transformations on the quantitative and categorical features of tips (note that we are not transforming the response variable, 'tip').

`python

`

`python
In [32]:


tips_features = tips.drop('tip', axis=1)
tips_features.head()
`

Output:
Out[32]:







total_bill
sex
smoker
day
time
size




0
16.99
Female
No
Sun
Dinner
2


1
10.34
Male
No
Sun
Dinner
3


2
21.01
Male
No
Sun
Dinner
3


3
23.68
Male
No
Sun
Dinner
2


4
24.59
Female
No
Sun
Dinner
4

`python
In [32]:


tips_features = tips.drop('tip', axis=1)
tips_features.head()
`

`python
In [32]:
`

Output:
Out[32]:







total_bill
sex
smoker
day
time
size




0
16.99
Female
No
Sun
Dinner
2


1
10.34
Male
No
Sun
Dinner
3


2
21.01
Male
No
Sun
Dinner
3


3
23.68
Male
No
Sun
Dinner
2


4
24.59
Female
No
Sun
Dinner
4

Output:
Out[32]:







total_bill
sex
smoker
day
time
size




0
16.99
Female
No
Sun
Dinner
2


1
10.34
Male
No
Sun
Dinner
3


2
21.01
Male
No
Sun
Dinner
3


3
23.68
Male
No
Sun
Dinner
2


4
24.59
Female
No
Sun
Dinner
4

We will leave the 'total_bill' column untouched.

`python
We will leave the 'total_bill' column untouched.
`

We will leave the 'total_bill' column untouched.

`python
We will leave the 'total_bill' column untouched.
`

We will leave the 'total_bill' column untouched.

`python

`

To the 'size' column, we will apply the Binarizer transformer with a threshold of 2 (big tables vs. small tables).

`python
To the 'size' column, we will apply the Binarizer transformer with a threshold of 2 (big tables vs. small tables).
`

To the 'size' column, we will apply the Binarizer transformer with a threshold of 2 (big tables vs. small tables).

`python
To the 'size' column, we will apply the Binarizer transformer with a threshold of 2 (big tables vs. small tables).
`

To the 'size' column, we will apply the Binarizer transformer with a threshold of 2 (big tables vs. small tables).

`python

`

To the categorical columns, we will apply the OneHotEncoder transformer.

`python
To the categorical columns, we will apply the OneHotEncoder transformer.
`

To the categorical columns, we will apply the OneHotEncoder transformer.

`python
To the categorical columns, we will apply the OneHotEncoder transformer.
`

To the categorical columns, we will apply the OneHotEncoder transformer.

`python

`

In essence, we will create a transformer that reproduces the following DataFrame:





size
sex_Female
sex_Male
smoker_No
smoker_Yes
day_Fri
day_Sat
day_Sun
day_Thur
time_Dinner
time_Lunch
total_bill




0
0
1.0
0.0
1.0
0.0
0.0
0.0
1.0
0.0
1.0
0.0
16.99


1
1
0.0
1.0
1.0
0.0
0.0
0.0
1.0
0.0
1.0
0.0
10.34


2
1
0.0
1.0
1.0
0.0
0.0
0.0
1.0
0.0
1.0
0.0
21.01


3
0
0.0
1.0
1.0
0.0
0.0
0.0
1.0
0.0
1.0
0.0
23.68


4
1
1.0
0.0
1.0
0.0
0.0
0.0
1.0
0.0
1.0
0.0
24.59

`python
In essence, we will create a transformer that reproduces the following DataFrame:





size
sex_Female
sex_Male
smoker_No
smoker_Yes
day_Fri
day_Sat
day_Sun
day_Thur
time_Dinner
time_Lunch
total_bill




0
0
1.0
0.0
1.0
0.0
0.0
0.0
1.0
0.0
1.0
0.0
16.99


1
1
0.0
1.0
1.0
0.0
0.0
0.0
1.0
0.0
1.0
0.0
10.34


2
1
0.0
1.0
1.0
0.0
0.0
0.0
1.0
0.0
1.0
0.0
21.01


3
0
0.0
1.0
1.0
0.0
0.0
0.0
1.0
0.0
1.0
0.0
23.68


4
1
1.0
0.0
1.0
0.0
0.0
0.0
1.0
0.0
1.0
0.0
24.59
`

In essence, we will create a transformer that reproduces the following DataFrame:





size
sex_Female
sex_Male
smoker_No
smoker_Yes
day_Fri
day_Sat
day_Sun
day_Thur
time_Dinner
time_Lunch
total_bill




0
0
1.0
0.0
1.0
0.0
0.0
0.0
1.0
0.0
1.0
0.0
16.99


1
1
0.0
1.0
1.0
0.0
0.0
0.0
1.0
0.0
1.0
0.0
10.34


2
1
0.0
1.0
1.0
0.0
0.0
0.0
1.0
0.0
1.0
0.0
21.01


3
0
0.0
1.0
1.0
0.0
0.0
0.0
1.0
0.0
1.0
0.0
23.68


4
1
1.0
0.0
1.0
0.0
0.0
0.0
1.0
0.0
1.0
0.0
24.59

`python
In essence, we will create a transformer that reproduces the following DataFrame:





size
sex_Female
sex_Male
smoker_No
smoker_Yes
day_Fri
day_Sat
day_Sun
day_Thur
time_Dinner
time_Lunch
total_bill




0
0
1.0
0.0
1.0
0.0
0.0
0.0
1.0
0.0
1.0
0.0
16.99


1
1
0.0
1.0
1.0
0.0
0.0
0.0
1.0
0.0
1.0
0.0
10.34


2
1
0.0
1.0
1.0
0.0
0.0
0.0
1.0
0.0
1.0
0.0
21.01


3
0
0.0
1.0
1.0
0.0
0.0
0.0
1.0
0.0
1.0
0.0
23.68


4
1
1.0
0.0
1.0
0.0
0.0
0.0
1.0
0.0
1.0
0.0
24.59
`

In essence, we will create a transformer that reproduces the following DataFrame:





size
sex_Female
sex_Male
smoker_No
smoker_Yes
day_Fri
day_Sat
day_Sun
day_Thur
time_Dinner
time_Lunch
total_bill




0
0
1.0
0.0
1.0
0.0
0.0
0.0
1.0
0.0
1.0
0.0
16.99


1
1
0.0
1.0
1.0
0.0
0.0
0.0
1.0
0.0
1.0
0.0
10.34


2
1
0.0
1.0
1.0
0.0
0.0
0.0
1.0
0.0
1.0
0.0
21.01


3
0
0.0
1.0
1.0
0.0
0.0
0.0
1.0
0.0
1.0
0.0
23.68


4
1
1.0
0.0
1.0
0.0
0.0
0.0
1.0
0.0
1.0
0.0
24.59

`python

`

Building a Pipeline using a ColumnTransformer¶Let's start by creating our ColumnTransformer.

`python
Building a Pipeline using a ColumnTransformer¶Let's start by creating our ColumnTransformer.
`

Building a Pipeline using a ColumnTransformer¶Let's start by creating our ColumnTransformer.

`python
Building a Pipeline using a ColumnTransformer¶Let's start by creating our ColumnTransformer.
`

Building a Pipeline using a ColumnTransformer¶Let's start by creating our ColumnTransformer.

`python

`

`python
In [33]:


preproc = ColumnTransformer(
    transformers=[
        ('size', Binarizer(threshold=2), ['size']),
        ('categorical_cols', OneHotEncoder(), ['sex', 'smoker', 'day', 'time'])
    ],
    # Specify what to do with all other columns ('total_bill' here).
    # Options are 'drop' or 'passthrough'.
    remainder='passthrough',
    # Keep original data types for remaining columns.
    force_int_remainder_cols=False
)
`

`python
In [33]:
`

Now, let's create a Pipeline using preproc as a transformer, and fit it:

`python
Now, let's create a Pipeline using preproc as a transformer, and fit it:
`

Now, let's create a Pipeline using preproc as a transformer, and fit it:

`python
Now, let's create a Pipeline using preproc as a transformer, and fit it:
`

Now, let's create a Pipeline using preproc as a transformer, and fit it:

`python

`

`python
In [34]:


pl = Pipeline([
    ('preprocessor', preproc), 
    ('lin-reg', LinearRegression())
])
`

`python
In [34]:
`

`python
In [35]:


pl.fit(tips_features, tips['tip'])
`

`python
In [35]:
`

Prediction is as easy as calling predict:

`python
Prediction is as easy as calling predict:
`

Prediction is as easy as calling predict:

`python
Prediction is as easy as calling predict:
`

Prediction is as easy as calling predict:

`python

`

`python
In [36]:


tips_features.head()
`

Output:
Out[36]:







total_bill
sex
smoker
day
time
size




0
16.99
Female
No
Sun
Dinner
2


1
10.34
Male
No
Sun
Dinner
3


2
21.01
Male
No
Sun
Dinner
3


3
23.68
Male
No
Sun
Dinner
2


4
24.59
Female
No
Sun
Dinner
4

`python
In [36]:


tips_features.head()
`

`python
In [36]:
`

Output:
Out[36]:







total_bill
sex
smoker
day
time
size




0
16.99
Female
No
Sun
Dinner
2


1
10.34
Male
No
Sun
Dinner
3


2
21.01
Male
No
Sun
Dinner
3


3
23.68
Male
No
Sun
Dinner
2


4
24.59
Female
No
Sun
Dinner
4

Output:
Out[36]:







total_bill
sex
smoker
day
time
size




0
16.99
Female
No
Sun
Dinner
2


1
10.34
Male
No
Sun
Dinner
3


2
21.01
Male
No
Sun
Dinner
3


3
23.68
Male
No
Sun
Dinner
2


4
24.59
Female
No
Sun
Dinner
4

`python
In [37]:


# Note that we fit the Pipeline using tips_features, not tips_features.head()!
pl.predict(tips_features.head())
`

Output:
Out[37]:

array([2.74, 2.32, 3.37, 3.37, 3.75])

`python
In [37]:


# Note that we fit the Pipeline using tips_features, not tips_features.head()!
pl.predict(tips_features.head())
`

`python
In [37]:
`

Output:
Out[37]:

array([2.74, 2.32, 3.37, 3.37, 3.75])

Output:
Out[37]:

array([2.74, 2.32, 3.37, 3.37, 3.75])

💡 Pro-Tip: Using make_pipeline and make_column_transformer¶Instead of using Pipeline and ColumnTransformer classes directly, sklearn provides shortcut methods make_pipeline and make_column_transformer. These methods are less verbose than using the constructors, as they determine the names of steps for you automatically.

`python
💡 Pro-Tip: Using make_pipeline and make_column_transformer¶Instead of using Pipeline and ColumnTransformer classes directly, sklearn provides shortcut methods make_pipeline and make_column_transformer. These methods are less verbose than using the constructors, as they determine the names of steps for you automatically.
`

💡 Pro-Tip: Using make_pipeline and make_column_transformer¶Instead of using Pipeline and ColumnTransformer classes directly, sklearn provides shortcut methods make_pipeline and make_column_transformer. These methods are less verbose than using the constructors, as they determine the names of steps for you automatically.

`python
💡 Pro-Tip: Using make_pipeline and make_column_transformer¶Instead of using Pipeline and ColumnTransformer classes directly, sklearn provides shortcut methods make_pipeline and make_column_transformer. These methods are less verbose than using the constructors, as they determine the names of steps for you automatically.
`

💡 Pro-Tip: Using make_pipeline and make_column_transformer¶Instead of using Pipeline and ColumnTransformer classes directly, sklearn provides shortcut methods make_pipeline and make_column_transformer. These methods are less verbose than using the constructors, as they determine the names of steps for you automatically.

`python

`

`python
In [38]:


# Old code

preproc = ColumnTransformer(
    transformers=[
        ('size', Binarizer(threshold=2), ['size']),
        ('categorical_cols', OneHotEncoder(), ['sex', 'smoker', 'day', 'time'])
    ],
    remainder='passthrough',
    force_int_remainder_cols=False
)

pl = Pipeline([
    ('preprocessor', preproc), 
    ('lin-reg', LinearRegression())
])
pl
`

`python
In [38]:
`

`python
In [39]:


# New code

from sklearn.pipeline import make_pipeline
from sklearn.compose import make_column_transformer

preproc = make_column_transformer(
    (Binarizer(threshold=2), ['size']),
    (OneHotEncoder(), ['sex', 'smoker', 'day', 'time']),
    remainder='passthrough',
)

pl = make_pipeline(preproc, LinearRegression())
# Notice that the steps are automatically named
pl
`

`python
In [39]:
`

An example Pipeline¶Let's build a Pipeline that:

Takes in the 'total_bill' and 'size' features of tips.
Standardizes those features.
Uses the resulting standardized features to fit a linear model that predicts 'tip'.

`python
An example Pipeline¶Let's build a Pipeline that:

Takes in the 'total_bill' and 'size' features of tips.
Standardizes those features.
Uses the resulting standardized features to fit a linear model that predicts 'tip'.
`

An example Pipeline¶Let's build a Pipeline that:

Takes in the 'total_bill' and 'size' features of tips.
Standardizes those features.
Uses the resulting standardized features to fit a linear model that predicts 'tip'.

`python
An example Pipeline¶Let's build a Pipeline that:

Takes in the 'total_bill' and 'size' features of tips.
Standardizes those features.
Uses the resulting standardized features to fit a linear model that predicts 'tip'.
`

An example Pipeline¶Let's build a Pipeline that:

Takes in the 'total_bill' and 'size' features of tips.
Standardizes those features.
Uses the resulting standardized features to fit a linear model that predicts 'tip'.

`python

`

`python
In [40]:


# Let's define these once, since we'll use them repeatedly.
X = tips[['total_bill', 'size']]
y = tips['tip']
`

`python
In [40]:
`

`python
In [41]:


from sklearn.preprocessing import StandardScaler

model_su = make_pipeline(
    StandardScaler(),
    LinearRegression(),
)

model_su.fit(X, y)
`

`python
In [41]:
`

How well does our model do? We can compute its $R^2$ and RMSE.

`python
How well does our model do? We can compute its $R^2$ and RMSE.
`

How well does our model do? We can compute its $R^2$ and RMSE.

`python
How well does our model do? We can compute its $R^2$ and RMSE.
`

How well does our model do? We can compute its $R^2$ and RMSE.

`python

`

`python
In [42]:


model_su.score(X, y)
`

Output:
Out[42]:

0.46786930879612587

`python
In [42]:


model_su.score(X, y)
`

`python
In [42]:
`

Output:
Out[42]:

0.46786930879612587

Output:
Out[42]:

0.46786930879612587

`python
In [43]:


from sklearn.metrics import root_mean_squared_error

root_mean_squared_error(y, model_su.predict(X))
`

Output:
Out[43]:

1.007256127114662

`python
In [43]:


from sklearn.metrics import root_mean_squared_error

root_mean_squared_error(y, model_su.predict(X))
`

`python
In [43]:
`

Output:
Out[43]:

1.007256127114662

Output:
Out[43]:

1.007256127114662

Does this model perform any better than one that doesn't standardize its features? Let's find out.

`python
Does this model perform any better than one that doesn't standardize its features? Let's find out.
`

Does this model perform any better than one that doesn't standardize its features? Let's find out.

`python
Does this model perform any better than one that doesn't standardize its features? Let's find out.
`

Does this model perform any better than one that doesn't standardize its features? Let's find out.

`python

`

`python
In [44]:


model_orig = LinearRegression()
model_orig.fit(X, y)
`

Output:
Out[44]:

LinearRegression()In a Jupyter environment, please rerun this cell to show the HTML representation or trust the notebook. On GitHub, the HTML representation is unable to render, please try loading this page with nbviewer.org.  LinearRegression?Documentation for LinearRegressioniFittedLinearRegression()

`python
In [44]:


model_orig = LinearRegression()
model_orig.fit(X, y)
`

`python
In [44]:
`

Output:
Out[44]:

LinearRegression()In a Jupyter environment, please rerun this cell to show the HTML representation or trust the notebook. On GitHub, the HTML representation is unable to render, please try loading this page with nbviewer.org.  LinearRegression?Documentation for LinearRegressioniFittedLinearRegression()

Output:
Out[44]:

LinearRegression()In a Jupyter environment, please rerun this cell to show the HTML representation or trust the notebook. On GitHub, the HTML representation is unable to render, please try loading this page with nbviewer.org.  LinearRegression?Documentation for LinearRegressioniFittedLinearRegression()

`python
In [45]:


model_orig.score(X, y)
`

Output:
Out[45]:

0.46786930879612587

`python
In [45]:


model_orig.score(X, y)
`

`python
In [45]:
`

Output:
Out[45]:

0.46786930879612587

Output:
Out[45]:

0.46786930879612587

`python
In [46]:


root_mean_squared_error(y, model_orig.predict(X))
`

Output:
Out[46]:

1.007256127114662

`python
In [46]:


root_mean_squared_error(y, model_orig.predict(X))
`

`python
In [46]:
`

Output:
Out[46]:

1.007256127114662

Output:
Out[46]:

1.007256127114662

No!

`python
No!
`

No!

`python
No!
`

No!

`python

`

The purpose of standardizing features¶
For linear regression, standardizing your features will not change your model's error.

`python
The purpose of standardizing features¶
For linear regression, standardizing your features will not change your model's error.
`

The purpose of standardizing features¶
For linear regression, standardizing your features will not change your model's error.

`python
The purpose of standardizing features¶
For linear regression, standardizing your features will not change your model's error.
`

The purpose of standardizing features¶
For linear regression, standardizing your features will not change your model's error.

`python

`

There are other models where standardizing your features will improve performance, or where the model requires features to be standardized.
Regularized linear regression (see DSC 140A).
PCA (assumes centered data, not necessarily standardized: see DSC 140B).
Clustering algorithms, e.g. $k$-means clustering (saw in DSC 40A).

`python
There are other models where standardizing your features will improve performance, or where the model requires features to be standardized.
Regularized linear regression (see DSC 140A).
PCA (assumes centered data, not necessarily standardized: see DSC 140B).
Clustering algorithms, e.g. $k$-means clustering (saw in DSC 40A).
`

There are other models where standardizing your features will improve performance, or where the model requires features to be standardized.
Regularized linear regression (see DSC 140A).
PCA (assumes centered data, not necessarily standardized: see DSC 140B).
Clustering algorithms, e.g. $k$-means clustering (saw in DSC 40A).

`python
There are other models where standardizing your features will improve performance, or where the model requires features to be standardized.
Regularized linear regression (see DSC 140A).
PCA (assumes centered data, not necessarily standardized: see DSC 140B).
Clustering algorithms, e.g. $k$-means clustering (saw in DSC 40A).
`

There are other models where standardizing your features will improve performance, or where the model requires features to be standardized.
Regularized linear regression (see DSC 140A).
PCA (assumes centered data, not necessarily standardized: see DSC 140B).
Clustering algorithms, e.g. $k$-means clustering (saw in DSC 40A).

`python

`

There is a benefit to standardizing features when performing linear regression, as we saw in DSC 40A: the features are brought to the same scale, so the coefficients can be compared directly.

`python
There is a benefit to standardizing features when performing linear regression, as we saw in DSC 40A: the features are brought to the same scale, so the coefficients can be compared directly.
`

There is a benefit to standardizing features when performing linear regression, as we saw in DSC 40A: the features are brought to the same scale, so the coefficients can be compared directly.

`python
There is a benefit to standardizing features when performing linear regression, as we saw in DSC 40A: the features are brought to the same scale, so the coefficients can be compared directly.
`

There is a benefit to standardizing features when performing linear regression, as we saw in DSC 40A: the features are brought to the same scale, so the coefficients can be compared directly.

`python

`

`python
In [47]:


# Total bill, table size.
model_orig.coef_
`

Output:
Out[47]:

array([0.09, 0.19])

`python
In [47]:


# Total bill, table size.
model_orig.coef_
`

`python
In [47]:
`

Output:
Out[47]:

array([0.09, 0.19])

Output:
Out[47]:

array([0.09, 0.19])

`python
In [48]:


# Standardized total bill, standardized table size.
model_su.named_steps['linearregression'].coef_
`

Output:
Out[48]:

array([0.82, 0.18])

`python
In [48]:


# Standardized total bill, standardized table size.
model_su.named_steps['linearregression'].coef_
`

`python
In [48]:
`

Output:
Out[48]:

array([0.82, 0.18])

Output:
Out[48]:

array([0.82, 0.18])

Multicollinearity¶

`python
Multicollinearity¶
`

Multicollinearity¶

`python
Multicollinearity¶
`

Multicollinearity¶

`python

`

Heights and weights¶We have a dataset containing the weights and heights of 25,000 18 year olds.

`python
Heights and weights¶We have a dataset containing the weights and heights of 25,000 18 year olds.
`

Heights and weights¶We have a dataset containing the weights and heights of 25,000 18 year olds.

`python
Heights and weights¶We have a dataset containing the weights and heights of 25,000 18 year olds.
`

Heights and weights¶We have a dataset containing the weights and heights of 25,000 18 year olds.

`python

`

`python
In [49]:


people_path = Path('data') / 'SOCR-HeightWeight.csv'
people = pd.read_csv(people_path).drop(columns=['Index'])
people.head()
`

Output:
Out[49]:







Height (Inches)
Weight (Pounds)




0
65.78
112.99


1
71.52
136.49


2
69.40
153.03


3
68.22
142.34


4
67.79
144.30

`python
In [49]:


people_path = Path('data') / 'SOCR-HeightWeight.csv'
people = pd.read_csv(people_path).drop(columns=['Index'])
people.head()
`

`python
In [49]:
`

Output:
Out[49]:







Height (Inches)
Weight (Pounds)




0
65.78
112.99


1
71.52
136.49


2
69.40
153.03


3
68.22
142.34


4
67.79
144.30

Output:
Out[49]:







Height (Inches)
Weight (Pounds)




0
65.78
112.99


1
71.52
136.49


2
69.40
153.03


3
68.22
142.34


4
67.79
144.30

`python
In [50]:


people.plot(kind='scatter', x='Height (Inches)', y='Weight (Pounds)', 
            title='Weight vs. Height for 25,000 18 Year Olds')
`

`python
In [50]:
`

Motivating example¶Suppose we fit a simple linear regression model that uses height in inches to predict weight in pounds.
$$\text{predicted weight (pounds)} = w_0 + w_1 \cdot \text{height (inches)}$$

`python
Motivating example¶Suppose we fit a simple linear regression model that uses height in inches to predict weight in pounds.
$$\text{predicted weight (pounds)} = w_0 + w_1 \cdot \text{height (inches)}$$
`

Motivating example¶Suppose we fit a simple linear regression model that uses height in inches to predict weight in pounds.
$$\text{predicted weight (pounds)} = w_0 + w_1 \cdot \text{height (inches)}$$

`python
Motivating example¶Suppose we fit a simple linear regression model that uses height in inches to predict weight in pounds.
$$\text{predicted weight (pounds)} = w_0 + w_1 \cdot \text{height (inches)}$$
`

Motivating example¶Suppose we fit a simple linear regression model that uses height in inches to predict weight in pounds.
$$\text{predicted weight (pounds)} = w_0 + w_1 \cdot \text{height (inches)}$$

`python

`

`python
In [51]:


X = people[['Height (Inches)']]
y = people['Weight (Pounds)']
`

`python
In [51]:
`

`python
In [52]:


lr_one_feat = LinearRegression()
lr_one_feat.fit(X, y)
`

Output:
Out[52]:

LinearRegression()In a Jupyter environment, please rerun this cell to show the HTML representation or trust the notebook. On GitHub, the HTML representation is unable to render, please try loading this page with nbviewer.org.  LinearRegression?Documentation for LinearRegressioniFittedLinearRegression()

`python
In [52]:


lr_one_feat = LinearRegression()
lr_one_feat.fit(X, y)
`

`python
In [52]:
`

Output:
Out[52]:

LinearRegression()In a Jupyter environment, please rerun this cell to show the HTML representation or trust the notebook. On GitHub, the HTML representation is unable to render, please try loading this page with nbviewer.org.  LinearRegression?Documentation for LinearRegressioniFittedLinearRegression()

Output:
Out[52]:

LinearRegression()In a Jupyter environment, please rerun this cell to show the HTML representation or trust the notebook. On GitHub, the HTML representation is unable to render, please try loading this page with nbviewer.org.  LinearRegression?Documentation for LinearRegressioniFittedLinearRegression()

$w_0^*$ and $w_1^*$ are shown below, along with the model's training set RMSE.

`python
$w_0^*$ and $w_1^*$ are shown below, along with the model's training set RMSE.
`

$w_0^*$ and $w_1^*$ are shown below, along with the model's training set RMSE.

`python
$w_0^*$ and $w_1^*$ are shown below, along with the model's training set RMSE.
`

$w_0^*$ and $w_1^*$ are shown below, along with the model's training set RMSE.

`python

`

`python
In [53]:


lr_one_feat.intercept_, lr_one_feat.coef_
`

Output:
Out[53]:

(-82.57574306454093, array([3.08]))

`python
In [53]:


lr_one_feat.intercept_, lr_one_feat.coef_
`

`python
In [53]:
`

Output:
Out[53]:

(-82.57574306454093, array([3.08]))

Output:
Out[53]:

(-82.57574306454093, array([3.08]))

`python
In [54]:


root_mean_squared_error(y, lr_one_feat.predict(X))
`

Output:
Out[54]:

10.079113675632819

`python
In [54]:


root_mean_squared_error(y, lr_one_feat.predict(X))
`

`python
In [54]:
`

Output:
Out[54]:

10.079113675632819

Output:
Out[54]:

10.079113675632819

Now, suppose we fit another regression model, that uses height in inches AND height in centimeters to predict weight.
$$\text{predicted weight (pounds)} = w_0 + w_1 \cdot \text{height (inches)} + w_2 \cdot \text{height (cm)}$$

`python
Now, suppose we fit another regression model, that uses height in inches AND height in centimeters to predict weight.
$$\text{predicted weight (pounds)} = w_0 + w_1 \cdot \text{height (inches)} + w_2 \cdot \text{height (cm)}$$
`

Now, suppose we fit another regression model, that uses height in inches AND height in centimeters to predict weight.
$$\text{predicted weight (pounds)} = w_0 + w_1 \cdot \text{height (inches)} + w_2 \cdot \text{height (cm)}$$

`python
Now, suppose we fit another regression model, that uses height in inches AND height in centimeters to predict weight.
$$\text{predicted weight (pounds)} = w_0 + w_1 \cdot \text{height (inches)} + w_2 \cdot \text{height (cm)}$$
`

Now, suppose we fit another regression model, that uses height in inches AND height in centimeters to predict weight.
$$\text{predicted weight (pounds)} = w_0 + w_1 \cdot \text{height (inches)} + w_2 \cdot \text{height (cm)}$$

`python

`

`python
In [55]:


people['Height (cm)'] = people['Height (Inches)'] * 2.54 # 1 inch = 2.54 cm
`

`python
In [55]:
`

`python
In [56]:


X2 = people[['Height (Inches)', 'Height (cm)']]
`

`python
In [56]:
`

`python
In [57]:


lr_two_feat = LinearRegression()
lr_two_feat.fit(X2, y)
`

Output:
Out[57]:

LinearRegression()In a Jupyter environment, please rerun this cell to show the HTML representation or trust the notebook. On GitHub, the HTML representation is unable to render, please try loading this page with nbviewer.org.  LinearRegression?Documentation for LinearRegressioniFittedLinearRegression()

`python
In [57]:


lr_two_feat = LinearRegression()
lr_two_feat.fit(X2, y)
`

`python
In [57]:
`

Output:
Out[57]:

LinearRegression()In a Jupyter environment, please rerun this cell to show the HTML representation or trust the notebook. On GitHub, the HTML representation is unable to render, please try loading this page with nbviewer.org.  LinearRegression?Documentation for LinearRegressioniFittedLinearRegression()

Output:
Out[57]:

LinearRegression()In a Jupyter environment, please rerun this cell to show the HTML representation or trust the notebook. On GitHub, the HTML representation is unable to render, please try loading this page with nbviewer.org.  LinearRegression?Documentation for LinearRegressioniFittedLinearRegression()

What are $w_0^*$, $w_1^*$, $w_2^*$, and the model's test RMSE?

`python
What are $w_0^*$, $w_1^*$, $w_2^*$, and the model's test RMSE?
`

What are $w_0^*$, $w_1^*$, $w_2^*$, and the model's test RMSE?

`python
What are $w_0^*$, $w_1^*$, $w_2^*$, and the model's test RMSE?
`

What are $w_0^*$, $w_1^*$, $w_2^*$, and the model's test RMSE?

`python

`

`python
In [58]:


lr_two_feat.intercept_, lr_two_feat.coef_
`

Output:
Out[58]:

(-82.57585227669999, array([ 3.38e+10, -1.33e+10]))

`python
In [58]:


lr_two_feat.intercept_, lr_two_feat.coef_
`

`python
In [58]:
`

Output:
Out[58]:

(-82.57585227669999, array([ 3.38e+10, -1.33e+10]))

Output:
Out[58]:

(-82.57585227669999, array([ 3.38e+10, -1.33e+10]))

`python
In [59]:


root_mean_squared_error(y, lr_two_feat.predict(X2))
`

Output:
Out[59]:

10.079113516358378

`python
In [59]:


root_mean_squared_error(y, lr_two_feat.predict(X2))
`

`python
In [59]:
`

Output:
Out[59]:

10.079113516358378

Output:
Out[59]:

10.079113516358378

Observation: The intercept is about the same as before, as is the RMSE. However, the coefficients on 'Height (Inches)' and 'Height (cm)' are massive in size!
What's going on?

`python
Observation: The intercept is about the same as before, as is the RMSE. However, the coefficients on 'Height (Inches)' and 'Height (cm)' are massive in size!
What's going on?
`

Observation: The intercept is about the same as before, as is the RMSE. However, the coefficients on 'Height (Inches)' and 'Height (cm)' are massive in size!
What's going on?

`python
Observation: The intercept is about the same as before, as is the RMSE. However, the coefficients on 'Height (Inches)' and 'Height (cm)' are massive in size!
What's going on?
`

Observation: The intercept is about the same as before, as is the RMSE. However, the coefficients on 'Height (Inches)' and 'Height (cm)' are massive in size!
What's going on?

`python

`

Redundant features¶Let's use simpler numbers for illustration. Suppose in the first model, $w_0^* = -82$ and $w_1^* = 3$.

`python
Redundant features¶Let's use simpler numbers for illustration. Suppose in the first model, $w_0^* = -82$ and $w_1^* = 3$.
`

Redundant features¶Let's use simpler numbers for illustration. Suppose in the first model, $w_0^* = -82$ and $w_1^* = 3$.

`python
Redundant features¶Let's use simpler numbers for illustration. Suppose in the first model, $w_0^* = -82$ and $w_1^* = 3$.
`

Redundant features¶Let's use simpler numbers for illustration. Suppose in the first model, $w_0^* = -82$ and $w_1^* = 3$.

`python

`

$$\text{predicted weight (pounds)} = -82 + 3 \cdot \text{height (inches)}$$

`python
$$\text{predicted weight (pounds)} = -82 + 3 \cdot \text{height (inches)}$$
`

$$\text{predicted weight (pounds)} = -82 + 3 \cdot \text{height (inches)}$$

`python
$$\text{predicted weight (pounds)} = -82 + 3 \cdot \text{height (inches)}$$
`

$$\text{predicted weight (pounds)} = -82 + 3 \cdot \text{height (inches)}$$

`python

`

In the second model, we have:
$$\begin{align*}\text{predicted weight (pounds)} &= w_0^* + w_1^* \cdot \text{height (inches)} + w_2^* \cdot \text{height (cm)} \\ &= w_0^* + w_1^* \cdot \text{height (inches)} + w_2^* \cdot \big( 2.54 \cdot \text{height (inches)} \big) \\ &= w_0^* + \left(w_1^* + 2.54 \cdot w_2^* \right) \cdot \text{height (inches)} \end{align*}$$

`python
In the second model, we have:
$$\begin{align*}\text{predicted weight (pounds)} &= w_0^* + w_1^* \cdot \text{height (inches)} + w_2^* \cdot \text{height (cm)} \\ &= w_0^* + w_1^* \cdot \text{height (inches)} + w_2^* \cdot \big( 2.54 \cdot \text{height (inches)} \big) \\ &= w_0^* + \left(w_1^* + 2.54 \cdot w_2^* \right) \cdot \text{height (inches)} \end{align*}$$
`

In the second model, we have:
$$\begin{align*}\text{predicted weight (pounds)} &= w_0^* + w_1^* \cdot \text{height (inches)} + w_2^* \cdot \text{height (cm)} \\ &= w_0^* + w_1^* \cdot \text{height (inches)} + w_2^* \cdot \big( 2.54 \cdot \text{height (inches)} \big) \\ &= w_0^* + \left(w_1^* + 2.54 \cdot w_2^* \right) \cdot \text{height (inches)} \end{align*}$$

`python
In the second model, we have:
$$\begin{align*}\text{predicted weight (pounds)} &= w_0^* + w_1^* \cdot \text{height (inches)} + w_2^* \cdot \text{height (cm)} \\ &= w_0^* + w_1^* \cdot \text{height (inches)} + w_2^* \cdot \big( 2.54 \cdot \text{height (inches)} \big) \\ &= w_0^* + \left(w_1^* + 2.54 \cdot w_2^* \right) \cdot \text{height (inches)} \end{align*}$$
`

In the second model, we have:
$$\begin{align*}\text{predicted weight (pounds)} &= w_0^* + w_1^* \cdot \text{height (inches)} + w_2^* \cdot \text{height (cm)} \\ &= w_0^* + w_1^* \cdot \text{height (inches)} + w_2^* \cdot \big( 2.54 \cdot \text{height (inches)} \big) \\ &= w_0^* + \left(w_1^* + 2.54 \cdot w_2^* \right) \cdot \text{height (inches)} \end{align*}$$

`python

`

In the first model, we already found the "best" intercept ($-82$) and slope ($3$) in a linear model that uses height in inches to predict weight.

`python
In the first model, we already found the "best" intercept ($-82$) and slope ($3$) in a linear model that uses height in inches to predict weight.
`

In the first model, we already found the "best" intercept ($-82$) and slope ($3$) in a linear model that uses height in inches to predict weight.

`python
In the first model, we already found the "best" intercept ($-82$) and slope ($3$) in a linear model that uses height in inches to predict weight.
`

In the first model, we already found the "best" intercept ($-82$) and slope ($3$) in a linear model that uses height in inches to predict weight.

`python

`

So, as long as $w_1^* + 2.54 \cdot w_2^* = 3$ in the second model, the second model's training predictions will be the same as the first, and hence they will also minimize RMSE.

`python
So, as long as $w_1^* + 2.54 \cdot w_2^* = 3$ in the second model, the second model's training predictions will be the same as the first, and hence they will also minimize RMSE.
`

So, as long as $w_1^* + 2.54 \cdot w_2^* = 3$ in the second model, the second model's training predictions will be the same as the first, and hence they will also minimize RMSE.

`python
So, as long as $w_1^* + 2.54 \cdot w_2^* = 3$ in the second model, the second model's training predictions will be the same as the first, and hence they will also minimize RMSE.
`

So, as long as $w_1^* + 2.54 \cdot w_2^* = 3$ in the second model, the second model's training predictions will be the same as the first, and hence they will also minimize RMSE.

`python

`

Infinitely many parameter choices¶

`python
Infinitely many parameter choices¶
`

Infinitely many parameter choices¶

`python
Infinitely many parameter choices¶
`

Infinitely many parameter choices¶

`python

`

Issue: There are an infinite number of $w_1^*$ and $w_2^*$ that satisfy $w_1^* + 2.54 \cdot w_2^* = 3$!

`python
Issue: There are an infinite number of $w_1^*$ and $w_2^*$ that satisfy $w_1^* + 2.54 \cdot w_2^* = 3$!
`

Issue: There are an infinite number of $w_1^*$ and $w_2^*$ that satisfy $w_1^* + 2.54 \cdot w_2^* = 3$!

`python
Issue: There are an infinite number of $w_1^*$ and $w_2^*$ that satisfy $w_1^* + 2.54 \cdot w_2^* = 3$!
`

Issue: There are an infinite number of $w_1^*$ and $w_2^*$ that satisfy $w_1^* + 2.54 \cdot w_2^* = 3$!

`python

`

$$\text{predicted weight} = -82 - 10 \cdot \text{height (inches)} + \frac{13}{2.54} \cdot \text{height (cm)}$$

`python
$$\text{predicted weight} = -82 - 10 \cdot \text{height (inches)} + \frac{13}{2.54} \cdot \text{height (cm)}$$
`

$$\text{predicted weight} = -82 - 10 \cdot \text{height (inches)} + \frac{13}{2.54} \cdot \text{height (cm)}$$

`python
$$\text{predicted weight} = -82 - 10 \cdot \text{height (inches)} + \frac{13}{2.54} \cdot \text{height (cm)}$$
`

$$\text{predicted weight} = -82 - 10 \cdot \text{height (inches)} + \frac{13}{2.54} \cdot \text{height (cm)}$$

`python

`

$$\text{predicted weight} = -82 + 10 \cdot \text{height (inches)} - \frac{7}{2.54} \cdot \text{height (cm)}$$

`python
$$\text{predicted weight} = -82 + 10 \cdot \text{height (inches)} - \frac{7}{2.54} \cdot \text{height (cm)}$$
`

$$\text{predicted weight} = -82 + 10 \cdot \text{height (inches)} - \frac{7}{2.54} \cdot \text{height (cm)}$$

`python
$$\text{predicted weight} = -82 + 10 \cdot \text{height (inches)} - \frac{7}{2.54} \cdot \text{height (cm)}$$
`

$$\text{predicted weight} = -82 + 10 \cdot \text{height (inches)} - \frac{7}{2.54} \cdot \text{height (cm)}$$

`python

`

`python
In [60]:


(-82 - 10 * people.iloc[:, 0] + (13 / 2.54) * people.iloc[:, 2]).head()
`

Output:
Out[60]:

0    115.35
1    132.55
2    126.20
3    122.65
4    121.36
dtype: float64

`python
In [60]:


(-82 - 10 * people.iloc[:, 0] + (13 / 2.54) * people.iloc[:, 2]).head()
`

`python
In [60]:
`

Output:
Out[60]:

0    115.35
1    132.55
2    126.20
3    122.65
4    121.36
dtype: float64

Output:
Out[60]:

0    115.35
1    132.55
2    126.20
3    122.65
4    121.36
dtype: float64

`python
In [61]:


(-82 + 10 * people.iloc[:, 0] - (7 / 2.54) * people.iloc[:, 2]).head()
`

Output:
Out[61]:

0    115.35
1    132.55
2    126.20
3    122.65
4    121.36
dtype: float64

`python
In [61]:


(-82 + 10 * people.iloc[:, 0] - (7 / 2.54) * people.iloc[:, 2]).head()
`

`python
In [61]:
`

Output:
Out[61]:

0    115.35
1    132.55
2    126.20
3    122.65
4    121.36
dtype: float64

Output:
Out[61]:

0    115.35
1    132.55
2    126.20
3    122.65
4    121.36
dtype: float64

Both prediction rules look very different, but actually make the same predictions.

`python
Both prediction rules look very different, but actually make the same predictions.
`

Both prediction rules look very different, but actually make the same predictions.

`python
Both prediction rules look very different, but actually make the same predictions.
`

Both prediction rules look very different, but actually make the same predictions.

`python

`

We might get either set of coefficients, or any other of the infinitely many options.

`python
We might get either set of coefficients, or any other of the infinitely many options.
`

We might get either set of coefficients, or any other of the infinitely many options.

`python
We might get either set of coefficients, or any other of the infinitely many options.
`

We might get either set of coefficients, or any other of the infinitely many options.

`python

`

But neither set of coefficients has any meaning!

`python
But neither set of coefficients has any meaning!
`

But neither set of coefficients has any meaning!

`python
But neither set of coefficients has any meaning!
`

But neither set of coefficients has any meaning!

`python

`

Multicollinearity¶

`python
Multicollinearity¶
`

Multicollinearity¶

`python
Multicollinearity¶
`

Multicollinearity¶

`python

`

Multicollinearity occurs when features in a regression model are highly correlated with one another.
In other words, multicollinearity occurs when a feature can be predicted using a linear combination of other features, fairly accurately.

`python
Multicollinearity occurs when features in a regression model are highly correlated with one another.
In other words, multicollinearity occurs when a feature can be predicted using a linear combination of other features, fairly accurately.
`

Multicollinearity occurs when features in a regression model are highly correlated with one another.
In other words, multicollinearity occurs when a feature can be predicted using a linear combination of other features, fairly accurately.

`python
Multicollinearity occurs when features in a regression model are highly correlated with one another.
In other words, multicollinearity occurs when a feature can be predicted using a linear combination of other features, fairly accurately.
`

Multicollinearity occurs when features in a regression model are highly correlated with one another.
In other words, multicollinearity occurs when a feature can be predicted using a linear combination of other features, fairly accurately.

`python

`

When multicollinearity is present in the features, the coefficients in the model are uninterpretable – they have no meaning.
A "slope" represents "the rate of change of $y$ with respect to a feature", when all other features are held constant – but if there's multicollinearity, you can't hold other features constant.

`python
When multicollinearity is present in the features, the coefficients in the model are uninterpretable – they have no meaning.
A "slope" represents "the rate of change of $y$ with respect to a feature", when all other features are held constant – but if there's multicollinearity, you can't hold other features constant.
`

When multicollinearity is present in the features, the coefficients in the model are uninterpretable – they have no meaning.
A "slope" represents "the rate of change of $y$ with respect to a feature", when all other features are held constant – but if there's multicollinearity, you can't hold other features constant.

`python
When multicollinearity is present in the features, the coefficients in the model are uninterpretable – they have no meaning.
A "slope" represents "the rate of change of $y$ with respect to a feature", when all other features are held constant – but if there's multicollinearity, you can't hold other features constant.
`

When multicollinearity is present in the features, the coefficients in the model are uninterpretable – they have no meaning.
A "slope" represents "the rate of change of $y$ with respect to a feature", when all other features are held constant – but if there's multicollinearity, you can't hold other features constant.

`python

`

Note: Multicollinearity doesn't impact a model's predictions!
It doesn't impact a model's ability to generalize to unseen data.
If features are multicollinear in the training data, they will probably be multicollinear in the test data too.

`python
Note: Multicollinearity doesn't impact a model's predictions!
It doesn't impact a model's ability to generalize to unseen data.
If features are multicollinear in the training data, they will probably be multicollinear in the test data too.
`

Note: Multicollinearity doesn't impact a model's predictions!
It doesn't impact a model's ability to generalize to unseen data.
If features are multicollinear in the training data, they will probably be multicollinear in the test data too.

`python
Note: Multicollinearity doesn't impact a model's predictions!
It doesn't impact a model's ability to generalize to unseen data.
If features are multicollinear in the training data, they will probably be multicollinear in the test data too.
`

Note: Multicollinearity doesn't impact a model's predictions!
It doesn't impact a model's ability to generalize to unseen data.
If features are multicollinear in the training data, they will probably be multicollinear in the test data too.

`python

`

Solutions:
Manually remove highly correlated features.
Use a dimensionality reduction technique (such as PCA) to automatically reduce dimensions.

`python
Solutions:
Manually remove highly correlated features.
Use a dimensionality reduction technique (such as PCA) to automatically reduce dimensions.
`

Solutions:
Manually remove highly correlated features.
Use a dimensionality reduction technique (such as PCA) to automatically reduce dimensions.

`python
Solutions:
Manually remove highly correlated features.
Use a dimensionality reduction technique (such as PCA) to automatically reduce dimensions.
`

Solutions:
Manually remove highly correlated features.
Use a dimensionality reduction technique (such as PCA) to automatically reduce dimensions.

`python

`

Example: One hot encoding¶A one hot encoding will result in multicollinearity unless you drop one of the one hot encoded features.

`python
Example: One hot encoding¶A one hot encoding will result in multicollinearity unless you drop one of the one hot encoded features.
`

Example: One hot encoding¶A one hot encoding will result in multicollinearity unless you drop one of the one hot encoded features.

`python
Example: One hot encoding¶A one hot encoding will result in multicollinearity unless you drop one of the one hot encoded features.
`

Example: One hot encoding¶A one hot encoding will result in multicollinearity unless you drop one of the one hot encoded features.

`python

`

Suppose we have the following fitted model:
$$
\begin{aligned}
H(x) = 1 + 2 \cdot (\text{smoker==Yes}) - 2 \cdot (\text{smoker==No})
\end{aligned}
$$

`python
Suppose we have the following fitted model:
$$
\begin{aligned}
H(x) = 1 + 2 \cdot (\text{smoker==Yes}) - 2 \cdot (\text{smoker==No})
\end{aligned}
$$
`

Suppose we have the following fitted model:
$$
\begin{aligned}
H(x) = 1 + 2 \cdot (\text{smoker==Yes}) - 2 \cdot (\text{smoker==No})
\end{aligned}
$$

`python
Suppose we have the following fitted model:
$$
\begin{aligned}
H(x) = 1 + 2 \cdot (\text{smoker==Yes}) - 2 \cdot (\text{smoker==No})
\end{aligned}
$$
`

Suppose we have the following fitted model:
$$
\begin{aligned}
H(x) = 1 + 2 \cdot (\text{smoker==Yes}) - 2 \cdot (\text{smoker==No})
\end{aligned}
$$

`python

`

This is equivalent to:
$$
\begin{aligned}
H(x) = 10 - 7 \cdot (\text{smoker==Yes}) - 11 \cdot (\text{smoker==No})
\end{aligned}
$$

`python
This is equivalent to:
$$
\begin{aligned}
H(x) = 10 - 7 \cdot (\text{smoker==Yes}) - 11 \cdot (\text{smoker==No})
\end{aligned}
$$
`

This is equivalent to:
$$
\begin{aligned}
H(x) = 10 - 7 \cdot (\text{smoker==Yes}) - 11 \cdot (\text{smoker==No})
\end{aligned}
$$

`python
This is equivalent to:
$$
\begin{aligned}
H(x) = 10 - 7 \cdot (\text{smoker==Yes}) - 11 \cdot (\text{smoker==No})
\end{aligned}
$$
`

This is equivalent to:
$$
\begin{aligned}
H(x) = 10 - 7 \cdot (\text{smoker==Yes}) - 11 \cdot (\text{smoker==No})
\end{aligned}
$$

`python

`

Solution: Drop one of the one hot encoded columns. The OneHotEncoder transformer has an option to do this.

`python
Solution: Drop one of the one hot encoded columns. The OneHotEncoder transformer has an option to do this.
`

Solution: Drop one of the one hot encoded columns. The OneHotEncoder transformer has an option to do this.

`python
Solution: Drop one of the one hot encoded columns. The OneHotEncoder transformer has an option to do this.
`

Solution: Drop one of the one hot encoded columns. The OneHotEncoder transformer has an option to do this.

`python

`

Example: Pipelines within Pipelines¶Suppose we want to:

One hot encode the 'day' column, but as either 'Weekday', 'Sat', or 'Sun'.
One hot encode the 'sex', 'smoker', and 'time' columns.
Binarize the 'size' column with a threshold of 2.
Leave the 'total_bill' column alone.
Fit a linear regression model using only non-redundant features.

Here's how we might do that:

`python
Example: Pipelines within Pipelines¶Suppose we want to:

One hot encode the 'day' column, but as either 'Weekday', 'Sat', or 'Sun'.
One hot encode the 'sex', 'smoker', and 'time' columns.
Binarize the 'size' column with a threshold of 2.
Leave the 'total_bill' column alone.
Fit a linear regression model using only non-redundant features.

Here's how we might do that:
`

Example: Pipelines within Pipelines¶Suppose we want to:

One hot encode the 'day' column, but as either 'Weekday', 'Sat', or 'Sun'.
One hot encode the 'sex', 'smoker', and 'time' columns.
Binarize the 'size' column with a threshold of 2.
Leave the 'total_bill' column alone.
Fit a linear regression model using only non-redundant features.

Here's how we might do that:

`python
Example: Pipelines within Pipelines¶Suppose we want to:

One hot encode the 'day' column, but as either 'Weekday', 'Sat', or 'Sun'.
One hot encode the 'sex', 'smoker', and 'time' columns.
Binarize the 'size' column with a threshold of 2.
Leave the 'total_bill' column alone.
Fit a linear regression model using only non-redundant features.

Here's how we might do that:
`

Example: Pipelines within Pipelines¶Suppose we want to:

One hot encode the 'day' column, but as either 'Weekday', 'Sat', or 'Sun'.
One hot encode the 'sex', 'smoker', and 'time' columns.
Binarize the 'size' column with a threshold of 2.
Leave the 'total_bill' column alone.
Fit a linear regression model using only non-redundant features.

Here's how we might do that:

`python

`

`python
In [62]:


tips
`

Output:
Out[62]:







total_bill
tip
sex
smoker
day
time
size




0
16.99
1.01
Female
No
Sun
Dinner
2


1
10.34
1.66
Male
No
Sun
Dinner
3


2
21.01
3.50
Male
No
Sun
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
22.67
2.00
Male
Yes
Sat
Dinner
2


242
17.82
1.75
Male
No
Sat
Dinner
2


243
18.78
3.00
Female
No
Thur
Dinner
2



244 rows × 7 columns

`python
In [62]:


tips
`

`python
In [62]:
`

Output:
Out[62]:







total_bill
tip
sex
smoker
day
time
size




0
16.99
1.01
Female
No
Sun
Dinner
2


1
10.34
1.66
Male
No
Sun
Dinner
3


2
21.01
3.50
Male
No
Sun
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
22.67
2.00
Male
Yes
Sat
Dinner
2


242
17.82
1.75
Male
No
Sat
Dinner
2


243
18.78
3.00
Female
No
Thur
Dinner
2



244 rows × 7 columns

Output:
Out[62]:







total_bill
tip
sex
smoker
day
time
size




0
16.99
1.01
Female
No
Sun
Dinner
2


1
10.34
1.66
Male
No
Sun
Dinner
3


2
21.01
3.50
Male
No
Sun
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
22.67
2.00
Male
Yes
Sat
Dinner
2


242
17.82
1.75
Male
No
Sat
Dinner
2


243
18.78
3.00
Female
No
Thur
Dinner
2



244 rows × 7 columns

If you want to apply multiple transformations to the same column in a dataset, you can create a Pipeline just for that column.

`python
If you want to apply multiple transformations to the same column in a dataset, you can create a Pipeline just for that column.
`

If you want to apply multiple transformations to the same column in a dataset, you can create a Pipeline just for that column.

`python
If you want to apply multiple transformations to the same column in a dataset, you can create a Pipeline just for that column.
`

If you want to apply multiple transformations to the same column in a dataset, you can create a Pipeline just for that column.

`python

`

`python
In [63]:


def is_weekend(s):
    # The input to is_weekend is a Series!
    return s.replace({'Thur': 'Weekday', 'Fri': 'Weekday'})
`

`python
In [63]:
`

`python
In [64]:


pl_day = make_pipeline(
    FunctionTransformer(is_weekend),
    OneHotEncoder(drop='first'),
)
`

`python
In [64]:
`

To do separate transformations for different columns, we use a ColumnTransformer. For the 'day' column, instead of specifying a transformer class, we use pl_day, the Pipeline we just created.

`python
To do separate transformations for different columns, we use a ColumnTransformer. For the 'day' column, instead of specifying a transformer class, we use pl_day, the Pipeline we just created.
`

To do separate transformations for different columns, we use a ColumnTransformer. For the 'day' column, instead of specifying a transformer class, we use pl_day, the Pipeline we just created.

`python
To do separate transformations for different columns, we use a ColumnTransformer. For the 'day' column, instead of specifying a transformer class, we use pl_day, the Pipeline we just created.
`

To do separate transformations for different columns, we use a ColumnTransformer. For the 'day' column, instead of specifying a transformer class, we use pl_day, the Pipeline we just created.

`python

`

`python
In [65]:


col_trans = make_column_transformer(
    (pl_day, ['day']),
    (OneHotEncoder(drop='first'), ['sex', 'smoker', 'time']),
    (Binarizer(threshold=2), ['size']),
    remainder='passthrough',
    force_int_remainder_cols=False
)
`

`python
In [65]:
`

`python
In [66]:


pl = make_pipeline(
    col_trans,
    LinearRegression(),
)

pl.fit(tips.drop('tip', axis=1), tips['tip'])
`

`python
In [66]:
`

Question

How many weights does this linear model have?

`python
Question

How many weights does this linear model have?
`

Question

How many weights does this linear model have?

`python
Question

How many weights does this linear model have?
`

Question

How many weights does this linear model have?

`python

`

`python
In [67]:


# pl.named_steps['linearregression'].coef_.shape[0]
`

`python
In [67]:
`

Key takeaways¶

`python
Key takeaways¶
`

Key takeaways¶

`python
Key takeaways¶
`

Key takeaways¶

`python

`

Multicollinearity is present in a linear model when one feature can be accurately predicted using one or more other features.
In other words, it is present when a feature is redundant.

`python
Multicollinearity is present in a linear model when one feature can be accurately predicted using one or more other features.
In other words, it is present when a feature is redundant.
`

Multicollinearity is present in a linear model when one feature can be accurately predicted using one or more other features.
In other words, it is present when a feature is redundant.

`python
Multicollinearity is present in a linear model when one feature can be accurately predicted using one or more other features.
In other words, it is present when a feature is redundant.
`

Multicollinearity is present in a linear model when one feature can be accurately predicted using one or more other features.
In other words, it is present when a feature is redundant.

`python

`

Multicollinearity doesn't pose an issue for prediction; it doesn't hinder a model's ability to generalize. Instead, it renders the coefficients of a linear model meaningless.

`python
Multicollinearity doesn't pose an issue for prediction; it doesn't hinder a model's ability to generalize. Instead, it renders the coefficients of a linear model meaningless.
`

Multicollinearity doesn't pose an issue for prediction; it doesn't hinder a model's ability to generalize. Instead, it renders the coefficients of a linear model meaningless.

`python
Multicollinearity doesn't pose an issue for prediction; it doesn't hinder a model's ability to generalize. Instead, it renders the coefficients of a linear model meaningless.
`

Multicollinearity doesn't pose an issue for prediction; it doesn't hinder a model's ability to generalize. Instead, it renders the coefficients of a linear model meaningless.

`python

`

Generalization¶

`python
Generalization¶
`

Generalization¶

`python
Generalization¶
`

Generalization¶

`python

`

Motivation¶

`python
Motivation¶
`

Motivation¶

`python
Motivation¶
`

Motivation¶

`python

`

You and your friend are studying for an upcoming exam. You both decide to test your understanding by taking a practice exam.
Your logic: If you do well on the practice exam, you should do well on the real exam.

`python
You and your friend are studying for an upcoming exam. You both decide to test your understanding by taking a practice exam.
Your logic: If you do well on the practice exam, you should do well on the real exam.
`

You and your friend are studying for an upcoming exam. You both decide to test your understanding by taking a practice exam.
Your logic: If you do well on the practice exam, you should do well on the real exam.

`python
You and your friend are studying for an upcoming exam. You both decide to test your understanding by taking a practice exam.
Your logic: If you do well on the practice exam, you should do well on the real exam.
`

You and your friend are studying for an upcoming exam. You both decide to test your understanding by taking a practice exam.
Your logic: If you do well on the practice exam, you should do well on the real exam.

`python

`

You each take the practice exam once and look at the solutions afterwards.

`python
You each take the practice exam once and look at the solutions afterwards.
`

You each take the practice exam once and look at the solutions afterwards.

`python
You each take the practice exam once and look at the solutions afterwards.
`

You each take the practice exam once and look at the solutions afterwards.

`python

`

Your strategy: Memorize the answers to all practice exam questions, e.g. "Question 1: A; Question 2: C; Question 3: A."

`python
Your strategy: Memorize the answers to all practice exam questions, e.g. "Question 1: A; Question 2: C; Question 3: A."
`

Your strategy: Memorize the answers to all practice exam questions, e.g. "Question 1: A; Question 2: C; Question 3: A."

`python
Your strategy: Memorize the answers to all practice exam questions, e.g. "Question 1: A; Question 2: C; Question 3: A."
`

Your strategy: Memorize the answers to all practice exam questions, e.g. "Question 1: A; Question 2: C; Question 3: A."

`python

`

Your friend's strategy: Learn high-level concepts from the solutions, e.g. "data are MNAR if the likelihood of missingness depends on the missing values themselves."

`python
Your friend's strategy: Learn high-level concepts from the solutions, e.g. "data are MNAR if the likelihood of missingness depends on the missing values themselves."
`

Your friend's strategy: Learn high-level concepts from the solutions, e.g. "data are MNAR if the likelihood of missingness depends on the missing values themselves."

`python
Your friend's strategy: Learn high-level concepts from the solutions, e.g. "data are MNAR if the likelihood of missingness depends on the missing values themselves."
`

Your friend's strategy: Learn high-level concepts from the solutions, e.g. "data are MNAR if the likelihood of missingness depends on the missing values themselves."

`python

`

Who will do better on the practice exam? Who will probably do better on the real exam? 🧐

`python
Who will do better on the practice exam? Who will probably do better on the real exam? 🧐
`

Who will do better on the practice exam? Who will probably do better on the real exam? 🧐

`python
Who will do better on the practice exam? Who will probably do better on the real exam? 🧐
`

Who will do better on the practice exam? Who will probably do better on the real exam? 🧐

`python

`

Evaluating the quality of a model¶

`python
Evaluating the quality of a model¶
`

Evaluating the quality of a model¶

`python
Evaluating the quality of a model¶
`

Evaluating the quality of a model¶

`python

`

So far, we've computed the RMSE (and $R^2$) of our fit regression models on the data that we used to fit them, i.e. the training data.

`python
So far, we've computed the RMSE (and $R^2$) of our fit regression models on the data that we used to fit them, i.e. the training data.
`

So far, we've computed the RMSE (and $R^2$) of our fit regression models on the data that we used to fit them, i.e. the training data.

`python
So far, we've computed the RMSE (and $R^2$) of our fit regression models on the data that we used to fit them, i.e. the training data.
`

So far, we've computed the RMSE (and $R^2$) of our fit regression models on the data that we used to fit them, i.e. the training data.

`python

`

We've said that Model A is better than Model B if Model A's RMSE is lower than Model B's RMSE.
Remember, our training data is a sample from some population.
Just because a model fits the training data well doesn't mean it will generalize and work well on similar, unseen samples from the same population!

`python
We've said that Model A is better than Model B if Model A's RMSE is lower than Model B's RMSE.
Remember, our training data is a sample from some population.
Just because a model fits the training data well doesn't mean it will generalize and work well on similar, unseen samples from the same population!
`

We've said that Model A is better than Model B if Model A's RMSE is lower than Model B's RMSE.
Remember, our training data is a sample from some population.
Just because a model fits the training data well doesn't mean it will generalize and work well on similar, unseen samples from the same population!

`python
We've said that Model A is better than Model B if Model A's RMSE is lower than Model B's RMSE.
Remember, our training data is a sample from some population.
Just because a model fits the training data well doesn't mean it will generalize and work well on similar, unseen samples from the same population!
`

We've said that Model A is better than Model B if Model A's RMSE is lower than Model B's RMSE.
Remember, our training data is a sample from some population.
Just because a model fits the training data well doesn't mean it will generalize and work well on similar, unseen samples from the same population!

`python

`

Example: Overfitting and underfitting¶Let's collect two samples $\{(x_i, y_i)\}$ from the same population.

`python
Example: Overfitting and underfitting¶Let's collect two samples $\{(x_i, y_i)\}$ from the same population.
`

Example: Overfitting and underfitting¶Let's collect two samples $\{(x_i, y_i)\}$ from the same population.

`python
Example: Overfitting and underfitting¶Let's collect two samples $\{(x_i, y_i)\}$ from the same population.
`

Example: Overfitting and underfitting¶Let's collect two samples $\{(x_i, y_i)\}$ from the same population.

`python

`

`python
In [68]:


np.random.seed(23) # For reproducibility.

def sample_from_pop(n=100):
    x = np.linspace(-2, 3, n)
    y = x ** 3 + (np.random.normal(0, 3, size=n))
    return pd.DataFrame({'x': x, 'y': y})

sample_1 = sample_from_pop()
sample_2 = sample_from_pop()
`

`python
In [68]:
`

For now, let's just look at Sample 1. The relationship between $x$ and $y$ is roughly cubic; that is, $y \approx x^3$ (remember, in reality, you won't get to see the population).

`python
For now, let's just look at Sample 1. The relationship between $x$ and $y$ is roughly cubic; that is, $y \approx x^3$ (remember, in reality, you won't get to see the population).
`

For now, let's just look at Sample 1. The relationship between $x$ and $y$ is roughly cubic; that is, $y \approx x^3$ (remember, in reality, you won't get to see the population).

`python
For now, let's just look at Sample 1. The relationship between $x$ and $y$ is roughly cubic; that is, $y \approx x^3$ (remember, in reality, you won't get to see the population).
`

For now, let's just look at Sample 1. The relationship between $x$ and $y$ is roughly cubic; that is, $y \approx x^3$ (remember, in reality, you won't get to see the population).

`python

`

`python
In [69]:


px.scatter(sample_1, x='x', y='y', title='Sample 1')
`

`python
In [69]:
`

Polynomial regression¶Let's fit three polynomial models on Sample 1:

Degree 1.
Degree 3.
Degree 25.

The PolynomialFeatures transformer will be helpful here.

`python
Polynomial regression¶Let's fit three polynomial models on Sample 1:

Degree 1.
Degree 3.
Degree 25.

The PolynomialFeatures transformer will be helpful here.
`

Polynomial regression¶Let's fit three polynomial models on Sample 1:

Degree 1.
Degree 3.
Degree 25.

The PolynomialFeatures transformer will be helpful here.

`python
Polynomial regression¶Let's fit three polynomial models on Sample 1:

Degree 1.
Degree 3.
Degree 25.

The PolynomialFeatures transformer will be helpful here.
`

Polynomial regression¶Let's fit three polynomial models on Sample 1:

Degree 1.
Degree 3.
Degree 25.

The PolynomialFeatures transformer will be helpful here.

`python

`

`python
In [70]:


from sklearn.preprocessing import PolynomialFeatures
d2 = PolynomialFeatures(3)
d2.fit_transform(np.array([1, 2, 3, 4, -2]).reshape(5, 1))
`

Output:
Out[70]:

array([[ 1.,  1.,  1.,  1.],
       [ 1.,  2.,  4.,  8.],
       [ 1.,  3.,  9., 27.],
       [ 1.,  4., 16., 64.],
       [ 1., -2.,  4., -8.]])

`python
In [70]:


from sklearn.preprocessing import PolynomialFeatures
d2 = PolynomialFeatures(3)
d2.fit_transform(np.array([1, 2, 3, 4, -2]).reshape(5, 1))
`

`python
In [70]:
`

Output:
Out[70]:

array([[ 1.,  1.,  1.,  1.],
       [ 1.,  2.,  4.,  8.],
       [ 1.,  3.,  9., 27.],
       [ 1.,  4., 16., 64.],
       [ 1., -2.,  4., -8.]])

Output:
Out[70]:

array([[ 1.,  1.,  1.,  1.],
       [ 1.,  2.,  4.,  8.],
       [ 1.,  3.,  9., 27.],
       [ 1.,  4., 16., 64.],
       [ 1., -2.,  4., -8.]])

Below, we look at our three models' predictions on Sample 1 (which they were trained on).

`python
Below, we look at our three models' predictions on Sample 1 (which they were trained on).
`

Below, we look at our three models' predictions on Sample 1 (which they were trained on).

`python
Below, we look at our three models' predictions on Sample 1 (which they were trained on).
`

Below, we look at our three models' predictions on Sample 1 (which they were trained on).

`python

`

`python
In [71]:


# Look at the definition of train_and_plot in lec15_util.py if you're curious as to how the plotting works.
fig = util.train_and_plot(train_sample=sample_1, test_sample=sample_1, degs=[1, 3, 25], data_name='Sample 1')
fig.update_layout(title='Trained on Sample 1, Performance on Sample 1')
`

`python
In [71]:
`

The degree 25 polynomial has the lowest RMSE on Sample 1.

`python
The degree 25 polynomial has the lowest RMSE on Sample 1.
`

The degree 25 polynomial has the lowest RMSE on Sample 1.

`python
The degree 25 polynomial has the lowest RMSE on Sample 1.
`

The degree 25 polynomial has the lowest RMSE on Sample 1.

`python

`

How do the same fit polynomials look on Sample 2?

`python
How do the same fit polynomials look on Sample 2?
`

How do the same fit polynomials look on Sample 2?

`python
How do the same fit polynomials look on Sample 2?
`

How do the same fit polynomials look on Sample 2?

`python

`

`python
In [72]:


fig = util.train_and_plot(train_sample=sample_1, test_sample=sample_2, degs=[1, 3, 25], data_name='Sample 2')
fig.update_layout(title='Trained on Sample 1, Performance on Sample 2')
`

`python
In [72]:
`

The degree 3 polynomial has the lowest RMSE on Sample 2.

`python
The degree 3 polynomial has the lowest RMSE on Sample 2.
`

The degree 3 polynomial has the lowest RMSE on Sample 2.

`python
The degree 3 polynomial has the lowest RMSE on Sample 2.
`

The degree 3 polynomial has the lowest RMSE on Sample 2.

`python

`

Note that we didn't get to see Sample 2 when fitting our models!

`python
Note that we didn't get to see Sample 2 when fitting our models!
`

Note that we didn't get to see Sample 2 when fitting our models!

`python
Note that we didn't get to see Sample 2 when fitting our models!
`

Note that we didn't get to see Sample 2 when fitting our models!

`python

`

As such, it seems that the degree 3 polynomial generalizes better to unseen data than the degree 25 polynomial does.

`python
As such, it seems that the degree 3 polynomial generalizes better to unseen data than the degree 25 polynomial does.
`

As such, it seems that the degree 3 polynomial generalizes better to unseen data than the degree 25 polynomial does.

`python
As such, it seems that the degree 3 polynomial generalizes better to unseen data than the degree 25 polynomial does.
`

As such, it seems that the degree 3 polynomial generalizes better to unseen data than the degree 25 polynomial does.

`python

`

What if we fit a degree 1, degree 3, and degree 25 polynomial on Sample 2 as well?

`python
What if we fit a degree 1, degree 3, and degree 25 polynomial on Sample 2 as well?
`

What if we fit a degree 1, degree 3, and degree 25 polynomial on Sample 2 as well?

`python
What if we fit a degree 1, degree 3, and degree 25 polynomial on Sample 2 as well?
`

What if we fit a degree 1, degree 3, and degree 25 polynomial on Sample 2 as well?

`python

`

`python
In [73]:


util.plot_multiple_models(sample_1, sample_2, degs=[1, 3, 25])
`

`python
In [73]:
`

Key idea: Degree 25 polynomials seem to vary more when trained on different samples than degree 3 and 1 polynomials do.

`python
Key idea: Degree 25 polynomials seem to vary more when trained on different samples than degree 3 and 1 polynomials do.
`

Key idea: Degree 25 polynomials seem to vary more when trained on different samples than degree 3 and 1 polynomials do.

`python
Key idea: Degree 25 polynomials seem to vary more when trained on different samples than degree 3 and 1 polynomials do.
`

Key idea: Degree 25 polynomials seem to vary more when trained on different samples than degree 3 and 1 polynomials do.

`python

`

Bias and variance¶The training data we have access to is a sample from the population. We are concerned with our model's ability to generalize and work well on different datasets drawn from the same population.
Suppose we fit a model $H$ (e.g. a degree 3 polynomial) on several different datasets from the same population. There are three sources of error that arise:

`python
Bias and variance¶The training data we have access to is a sample from the population. We are concerned with our model's ability to generalize and work well on different datasets drawn from the same population.
Suppose we fit a model $H$ (e.g. a degree 3 polynomial) on several different datasets from the same population. There are three sources of error that arise:
`

Bias and variance¶The training data we have access to is a sample from the population. We are concerned with our model's ability to generalize and work well on different datasets drawn from the same population.
Suppose we fit a model $H$ (e.g. a degree 3 polynomial) on several different datasets from the same population. There are three sources of error that arise:

`python
Bias and variance¶The training data we have access to is a sample from the population. We are concerned with our model's ability to generalize and work well on different datasets drawn from the same population.
Suppose we fit a model $H$ (e.g. a degree 3 polynomial) on several different datasets from the same population. There are three sources of error that arise:
`

Bias and variance¶The training data we have access to is a sample from the population. We are concerned with our model's ability to generalize and work well on different datasets drawn from the same population.
Suppose we fit a model $H$ (e.g. a degree 3 polynomial) on several different datasets from the same population. There are three sources of error that arise:

`python

`

⭐️ Bias: The expected deviation between a predicted value and an actual value.
In other words, for a given $x_i$, how far is $H(x_i)$ from the true $y_i$, on average?
Low bias is good! ✅
High bias is a sign of underfitting, i.e. that our model is too basic to capture the relationship between our features and response.

`python
⭐️ Bias: The expected deviation between a predicted value and an actual value.
In other words, for a given $x_i$, how far is $H(x_i)$ from the true $y_i$, on average?
Low bias is good! ✅
High bias is a sign of underfitting, i.e. that our model is too basic to capture the relationship between our features and response.
`

⭐️ Bias: The expected deviation between a predicted value and an actual value.
In other words, for a given $x_i$, how far is $H(x_i)$ from the true $y_i$, on average?
Low bias is good! ✅
High bias is a sign of underfitting, i.e. that our model is too basic to capture the relationship between our features and response.

`python
⭐️ Bias: The expected deviation between a predicted value and an actual value.
In other words, for a given $x_i$, how far is $H(x_i)$ from the true $y_i$, on average?
Low bias is good! ✅
High bias is a sign of underfitting, i.e. that our model is too basic to capture the relationship between our features and response.
`

⭐️ Bias: The expected deviation between a predicted value and an actual value.
In other words, for a given $x_i$, how far is $H(x_i)$ from the true $y_i$, on average?
Low bias is good! ✅
High bias is a sign of underfitting, i.e. that our model is too basic to capture the relationship between our features and response.

`python

`

⭐️ Model variance ("variance"): The variance of a model's predictions.
In other words, for a given $x_i$, how much does $H(x_i)$ vary across all datasets?
Low model variance is good! ✅
High model variance is a sign of overfitting, i.e. that our model is too complicated and is prone to fitting to the noise in our training data.

`python
⭐️ Model variance ("variance"): The variance of a model's predictions.
In other words, for a given $x_i$, how much does $H(x_i)$ vary across all datasets?
Low model variance is good! ✅
High model variance is a sign of overfitting, i.e. that our model is too complicated and is prone to fitting to the noise in our training data.
`

⭐️ Model variance ("variance"): The variance of a model's predictions.
In other words, for a given $x_i$, how much does $H(x_i)$ vary across all datasets?
Low model variance is good! ✅
High model variance is a sign of overfitting, i.e. that our model is too complicated and is prone to fitting to the noise in our training data.

`python
⭐️ Model variance ("variance"): The variance of a model's predictions.
In other words, for a given $x_i$, how much does $H(x_i)$ vary across all datasets?
Low model variance is good! ✅
High model variance is a sign of overfitting, i.e. that our model is too complicated and is prone to fitting to the noise in our training data.
`

⭐️ Model variance ("variance"): The variance of a model's predictions.
In other words, for a given $x_i$, how much does $H(x_i)$ vary across all datasets?
Low model variance is good! ✅
High model variance is a sign of overfitting, i.e. that our model is too complicated and is prone to fitting to the noise in our training data.

`python

`

Observation error: The error due to the random noise in the process we are trying to model (e.g. measurement error). We can't control this, without collecting more data!

`python
Observation error: The error due to the random noise in the process we are trying to model (e.g. measurement error). We can't control this, without collecting more data!
`

Observation error: The error due to the random noise in the process we are trying to model (e.g. measurement error). We can't control this, without collecting more data!

`python
Observation error: The error due to the random noise in the process we are trying to model (e.g. measurement error). We can't control this, without collecting more data!
`

Observation error: The error due to the random noise in the process we are trying to model (e.g. measurement error). We can't control this, without collecting more data!

`python

`

Here, suppose:

The red bulls-eye represents an actual tip 💲.
The dark blue darts represent predictions of the tip using different models that were fit on samples from the same data generating process.



We'd like our models to be in the top left, but in practice that's hard to achieve!

`python
Here, suppose:

The red bulls-eye represents an actual tip 💲.
The dark blue darts represent predictions of the tip using different models that were fit on samples from the same data generating process.



We'd like our models to be in the top left, but in practice that's hard to achieve!
`

Here, suppose:

The red bulls-eye represents an actual tip 💲.
The dark blue darts represent predictions of the tip using different models that were fit on samples from the same data generating process.



We'd like our models to be in the top left, but in practice that's hard to achieve!

`python
Here, suppose:

The red bulls-eye represents an actual tip 💲.
The dark blue darts represent predictions of the tip using different models that were fit on samples from the same data generating process.



We'd like our models to be in the top left, but in practice that's hard to achieve!
`

Here, suppose:

The red bulls-eye represents an actual tip 💲.
The dark blue darts represent predictions of the tip using different models that were fit on samples from the same data generating process.



We'd like our models to be in the top left, but in practice that's hard to achieve!

`python

`

Risk vs. empirical risk¶

`python
Risk vs. empirical risk¶
`

Risk vs. empirical risk¶

`python
Risk vs. empirical risk¶
`

Risk vs. empirical risk¶

`python

`

Key idea: A model that works well on past data should work well on future data, if future data looks like past data.

`python
Key idea: A model that works well on past data should work well on future data, if future data looks like past data.
`

Key idea: A model that works well on past data should work well on future data, if future data looks like past data.

`python
Key idea: A model that works well on past data should work well on future data, if future data looks like past data.
`

Key idea: A model that works well on past data should work well on future data, if future data looks like past data.

`python

`

What we really want is for the expected loss for a new data point $(x_{\text{new}}, y_{\text{new}})$, drawn from the same population as the training set, to be small. That is, we want
$$\mathbb{E}[y_{\text{new}} - H(x_{\text{new}})]^2$$
to be minimized. The quantity above is called risk.

`python
What we really want is for the expected loss for a new data point $(x_{\text{new}}, y_{\text{new}})$, drawn from the same population as the training set, to be small. That is, we want
$$\mathbb{E}[y_{\text{new}} - H(x_{\text{new}})]^2$$
to be minimized. The quantity above is called risk.
`

What we really want is for the expected loss for a new data point $(x_{\text{new}}, y_{\text{new}})$, drawn from the same population as the training set, to be small. That is, we want
$$\mathbb{E}[y_{\text{new}} - H(x_{\text{new}})]^2$$
to be minimized. The quantity above is called risk.

`python
What we really want is for the expected loss for a new data point $(x_{\text{new}}, y_{\text{new}})$, drawn from the same population as the training set, to be small. That is, we want
$$\mathbb{E}[y_{\text{new}} - H(x_{\text{new}})]^2$$
to be minimized. The quantity above is called risk.
`

What we really want is for the expected loss for a new data point $(x_{\text{new}}, y_{\text{new}})$, drawn from the same population as the training set, to be small. That is, we want
$$\mathbb{E}[y_{\text{new}} - H(x_{\text{new}})]^2$$
to be minimized. The quantity above is called risk.

`python

`

$\mathbb{E}$ is the expectation operator of a random variable: it computes the average value of the random variable across its entire distribution.

`python
$\mathbb{E}$ is the expectation operator of a random variable: it computes the average value of the random variable across its entire distribution.
`

$\mathbb{E}$ is the expectation operator of a random variable: it computes the average value of the random variable across its entire distribution.

`python
$\mathbb{E}$ is the expectation operator of a random variable: it computes the average value of the random variable across its entire distribution.
`

$\mathbb{E}$ is the expectation operator of a random variable: it computes the average value of the random variable across its entire distribution.

`python

`

In general, we don't know the entire population distribution of $x$s and $y$s, so we can't compute risk exactly. That's why we compute empirical risk!

$$\mathbb{E}[y_{\text{new}} - H(x_{\text{new}})]^2 \approx \frac{1}{n} \sum_{i = 1}^n \left( y_i - H(x_i) \right)^2$$

`python
In general, we don't know the entire population distribution of $x$s and $y$s, so we can't compute risk exactly. That's why we compute empirical risk!

$$\mathbb{E}[y_{\text{new}} - H(x_{\text{new}})]^2 \approx \frac{1}{n} \sum_{i = 1}^n \left( y_i - H(x_i) \right)^2$$
`

In general, we don't know the entire population distribution of $x$s and $y$s, so we can't compute risk exactly. That's why we compute empirical risk!

$$\mathbb{E}[y_{\text{new}} - H(x_{\text{new}})]^2 \approx \frac{1}{n} \sum_{i = 1}^n \left( y_i - H(x_i) \right)^2$$

`python
In general, we don't know the entire population distribution of $x$s and $y$s, so we can't compute risk exactly. That's why we compute empirical risk!

$$\mathbb{E}[y_{\text{new}} - H(x_{\text{new}})]^2 \approx \frac{1}{n} \sum_{i = 1}^n \left( y_i - H(x_i) \right)^2$$
`

In general, we don't know the entire population distribution of $x$s and $y$s, so we can't compute risk exactly. That's why we compute empirical risk!

$$\mathbb{E}[y_{\text{new}} - H(x_{\text{new}})]^2 \approx \frac{1}{n} \sum_{i = 1}^n \left( y_i - H(x_i) \right)^2$$

`python

`

The bias-variance decomposition¶Risk can be decomposed as follows:
$$\mathbb{E}[y_{\text{new}} - H(x_{\text{new}})]^2 = \text{model bias}^2 + \text{model variance} + \text{observation error}$$

`python
The bias-variance decomposition¶Risk can be decomposed as follows:
$$\mathbb{E}[y_{\text{new}} - H(x_{\text{new}})]^2 = \text{model bias}^2 + \text{model variance} + \text{observation error}$$
`

The bias-variance decomposition¶Risk can be decomposed as follows:
$$\mathbb{E}[y_{\text{new}} - H(x_{\text{new}})]^2 = \text{model bias}^2 + \text{model variance} + \text{observation error}$$

`python
The bias-variance decomposition¶Risk can be decomposed as follows:
$$\mathbb{E}[y_{\text{new}} - H(x_{\text{new}})]^2 = \text{model bias}^2 + \text{model variance} + \text{observation error}$$
`

The bias-variance decomposition¶Risk can be decomposed as follows:
$$\mathbb{E}[y_{\text{new}} - H(x_{\text{new}})]^2 = \text{model bias}^2 + \text{model variance} + \text{observation error}$$

`python

`

Remember, this expectation $\mathbb{E}$ is over the entire population of $x$s and $y$s: in real life, we don't know what this population distribution is, so we can't put actual numbers to this.

`python
Remember, this expectation $\mathbb{E}$ is over the entire population of $x$s and $y$s: in real life, we don't know what this population distribution is, so we can't put actual numbers to this.
`

Remember, this expectation $\mathbb{E}$ is over the entire population of $x$s and $y$s: in real life, we don't know what this population distribution is, so we can't put actual numbers to this.

`python
Remember, this expectation $\mathbb{E}$ is over the entire population of $x$s and $y$s: in real life, we don't know what this population distribution is, so we can't put actual numbers to this.
`

Remember, this expectation $\mathbb{E}$ is over the entire population of $x$s and $y$s: in real life, we don't know what this population distribution is, so we can't put actual numbers to this.

`python

`

If $H$ is too simple to capture the relationship between $x$s and $y$s in the population, $H$ will underfit to training sets and have high bias.

`python
If $H$ is too simple to capture the relationship between $x$s and $y$s in the population, $H$ will underfit to training sets and have high bias.
`

If $H$ is too simple to capture the relationship between $x$s and $y$s in the population, $H$ will underfit to training sets and have high bias.

`python
If $H$ is too simple to capture the relationship between $x$s and $y$s in the population, $H$ will underfit to training sets and have high bias.
`

If $H$ is too simple to capture the relationship between $x$s and $y$s in the population, $H$ will underfit to training sets and have high bias.

`python

`

If $H$ is overly complex, $H$ will overfit to training sets and have high variance, meaning it will change significantly from one training set to the next.

`python
If $H$ is overly complex, $H$ will overfit to training sets and have high variance, meaning it will change significantly from one training set to the next.
`

If $H$ is overly complex, $H$ will overfit to training sets and have high variance, meaning it will change significantly from one training set to the next.

`python
If $H$ is overly complex, $H$ will overfit to training sets and have high variance, meaning it will change significantly from one training set to the next.
`

If $H$ is overly complex, $H$ will overfit to training sets and have high variance, meaning it will change significantly from one training set to the next.

`python

`

Generally:
Training error reflects bias, not variance.
Test error reflects both bias and variance.

`python
Generally:
Training error reflects bias, not variance.
Test error reflects both bias and variance.
`

Generally:
Training error reflects bias, not variance.
Test error reflects both bias and variance.

`python
Generally:
Training error reflects bias, not variance.
Test error reflects both bias and variance.
`

Generally:
Training error reflects bias, not variance.
Test error reflects both bias and variance.

`python

`

Navigating the bias-variance tradeoff¶$$\mathbb{E}[y_{\text{new}} - H(x_{\text{new}})]^2 = \text{model bias}^2 + \text{model variance} + \text{observation error}$$

`python
Navigating the bias-variance tradeoff¶$$\mathbb{E}[y_{\text{new}} - H(x_{\text{new}})]^2 = \text{model bias}^2 + \text{model variance} + \text{observation error}$$
`

Navigating the bias-variance tradeoff¶$$\mathbb{E}[y_{\text{new}} - H(x_{\text{new}})]^2 = \text{model bias}^2 + \text{model variance} + \text{observation error}$$

`python
Navigating the bias-variance tradeoff¶$$\mathbb{E}[y_{\text{new}} - H(x_{\text{new}})]^2 = \text{model bias}^2 + \text{model variance} + \text{observation error}$$
`

Navigating the bias-variance tradeoff¶$$\mathbb{E}[y_{\text{new}} - H(x_{\text{new}})]^2 = \text{model bias}^2 + \text{model variance} + \text{observation error}$$

`python

`

As we collect more data points (i.e. as $n$ increases):
Model variance decreases.
If $H$ can exactly model the true population relationship between $x$ and $y$ (e.g. cubic), then model bias also decreases.
If $H$ can't exactly model the true population relationship between $x$ and $y$, then model bias will remain large.

`python
As we collect more data points (i.e. as $n$ increases):
Model variance decreases.
If $H$ can exactly model the true population relationship between $x$ and $y$ (e.g. cubic), then model bias also decreases.
If $H$ can't exactly model the true population relationship between $x$ and $y$, then model bias will remain large.
`

As we collect more data points (i.e. as $n$ increases):
Model variance decreases.
If $H$ can exactly model the true population relationship between $x$ and $y$ (e.g. cubic), then model bias also decreases.
If $H$ can't exactly model the true population relationship between $x$ and $y$, then model bias will remain large.

`python
As we collect more data points (i.e. as $n$ increases):
Model variance decreases.
If $H$ can exactly model the true population relationship between $x$ and $y$ (e.g. cubic), then model bias also decreases.
If $H$ can't exactly model the true population relationship between $x$ and $y$, then model bias will remain large.
`

As we collect more data points (i.e. as $n$ increases):
Model variance decreases.
If $H$ can exactly model the true population relationship between $x$ and $y$ (e.g. cubic), then model bias also decreases.
If $H$ can't exactly model the true population relationship between $x$ and $y$, then model bias will remain large.

`python

`

As we add more features (i.e. as $d$ increases):
Model variance increases, whether or not the feature was useful.
Adding a useful feature decreases model bias.
Adding a useless feature doesn't change model bias.

`python
As we add more features (i.e. as $d$ increases):
Model variance increases, whether or not the feature was useful.
Adding a useful feature decreases model bias.
Adding a useless feature doesn't change model bias.
`

As we add more features (i.e. as $d$ increases):
Model variance increases, whether or not the feature was useful.
Adding a useful feature decreases model bias.
Adding a useless feature doesn't change model bias.

`python
As we add more features (i.e. as $d$ increases):
Model variance increases, whether or not the feature was useful.
Adding a useful feature decreases model bias.
Adding a useless feature doesn't change model bias.
`

As we add more features (i.e. as $d$ increases):
Model variance increases, whether or not the feature was useful.
Adding a useful feature decreases model bias.
Adding a useless feature doesn't change model bias.

`python

`

Example: suppose the actual relationship between $x$ and $y$ in the population is linear, and we fit $H$ using simple linear regression.
Model bias = 0.
Model variance is proportional to $\frac{d}{n}$.
As $d$ increases, model variance increases.
As $n$ increases, model variance decreases.

`python
Example: suppose the actual relationship between $x$ and $y$ in the population is linear, and we fit $H$ using simple linear regression.
Model bias = 0.
Model variance is proportional to $\frac{d}{n}$.
As $d$ increases, model variance increases.
As $n$ increases, model variance decreases.
`

Example: suppose the actual relationship between $x$ and $y$ in the population is linear, and we fit $H$ using simple linear regression.
Model bias = 0.
Model variance is proportional to $\frac{d}{n}$.
As $d$ increases, model variance increases.
As $n$ increases, model variance decreases.

`python
Example: suppose the actual relationship between $x$ and $y$ in the population is linear, and we fit $H$ using simple linear regression.
Model bias = 0.
Model variance is proportional to $\frac{d}{n}$.
As $d$ increases, model variance increases.
As $n$ increases, model variance decreases.
`

Example: suppose the actual relationship between $x$ and $y$ in the population is linear, and we fit $H$ using simple linear regression.
Model bias = 0.
Model variance is proportional to $\frac{d}{n}$.
As $d$ increases, model variance increases.
As $n$ increases, model variance decreases.

`python

`

Read more here.

`python
Read more here.
`

Read more here.

`python
Read more here.
`

Read more here.

`python

`

Train-test splits¶

`python
Train-test splits¶
`

Train-test splits¶

`python
Train-test splits¶
`

Train-test splits¶

`python

`

Avoiding overfitting¶

`python
Avoiding overfitting¶
`

Avoiding overfitting¶

`python
Avoiding overfitting¶
`

Avoiding overfitting¶

`python

`

We won't know whether our model has overfit to our sample (training data) unless we get to see how well it performs on a new sample from the same population.

`python
We won't know whether our model has overfit to our sample (training data) unless we get to see how well it performs on a new sample from the same population.
`

We won't know whether our model has overfit to our sample (training data) unless we get to see how well it performs on a new sample from the same population.

`python
We won't know whether our model has overfit to our sample (training data) unless we get to see how well it performs on a new sample from the same population.
`

We won't know whether our model has overfit to our sample (training data) unless we get to see how well it performs on a new sample from the same population.

`python

`

💡Idea: Split our sample into a training set and test set.

`python
💡Idea: Split our sample into a training set and test set.
`

💡Idea: Split our sample into a training set and test set.

`python
💡Idea: Split our sample into a training set and test set.
`

💡Idea: Split our sample into a training set and test set.

`python

`

Use only the training set to fit the model (i.e. find $w^*$).

`python
Use only the training set to fit the model (i.e. find $w^*$).
`

Use only the training set to fit the model (i.e. find $w^*$).

`python
Use only the training set to fit the model (i.e. find $w^*$).
`

Use only the training set to fit the model (i.e. find $w^*$).

`python

`

Use the test set to evaluate the model's error (RMSE, $R^2$).

`python
Use the test set to evaluate the model's error (RMSE, $R^2$).
`

Use the test set to evaluate the model's error (RMSE, $R^2$).

`python
Use the test set to evaluate the model's error (RMSE, $R^2$).
`

Use the test set to evaluate the model's error (RMSE, $R^2$).

`python

`

The test set is like a new sample of data from the same population as the training data!

`python
The test set is like a new sample of data from the same population as the training data!
`

The test set is like a new sample of data from the same population as the training data!

`python
The test set is like a new sample of data from the same population as the training data!
`

The test set is like a new sample of data from the same population as the training data!

`python

`



`python

`



`python

`



`python

`

Train-test split 🚆¶sklearn.model_selection.train_test_split implements a train-test split for us! 🙏🏼

`python
Train-test split 🚆¶sklearn.model_selection.train_test_split implements a train-test split for us! 🙏🏼
`

Train-test split 🚆¶sklearn.model_selection.train_test_split implements a train-test split for us! 🙏🏼

`python
Train-test split 🚆¶sklearn.model_selection.train_test_split implements a train-test split for us! 🙏🏼
`

Train-test split 🚆¶sklearn.model_selection.train_test_split implements a train-test split for us! 🙏🏼

`python

`

If X is an array/DataFrame of features and y is an array/Series of responses,
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25)

randomly splits the features and responses into training and test sets, such that the test set contains 0.25 of the full dataset.

`python
If X is an array/DataFrame of features and y is an array/Series of responses,
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25)

randomly splits the features and responses into training and test sets, such that the test set contains 0.25 of the full dataset.
`

If X is an array/DataFrame of features and y is an array/Series of responses,
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25)

randomly splits the features and responses into training and test sets, such that the test set contains 0.25 of the full dataset.

`python
If X is an array/DataFrame of features and y is an array/Series of responses,
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25)

randomly splits the features and responses into training and test sets, such that the test set contains 0.25 of the full dataset.
`

If X is an array/DataFrame of features and y is an array/Series of responses,
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25)

randomly splits the features and responses into training and test sets, such that the test set contains 0.25 of the full dataset.

`python

`

`python
In [74]:


from sklearn.model_selection import train_test_split
`

`python
In [74]:
`

`python
In [75]:


# Read the documentation!
train_test_split?
`

`python
In [75]:
`

Let's perform a train/test split on our tips dataset.

`python
Let's perform a train/test split on our tips dataset.
`

Let's perform a train/test split on our tips dataset.

`python
Let's perform a train/test split on our tips dataset.
`

Let's perform a train/test split on our tips dataset.

`python

`

`python
In [76]:


X = tips.drop('tip', axis=1)
y = tips['tip']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2) # We don't have to choose 0.25.
X
`

Output:
Out[76]:







total_bill
sex
smoker
day
time
size




0
16.99
Female
No
Sun
Dinner
2


1
10.34
Male
No
Sun
Dinner
3


2
21.01
Male
No
Sun
Dinner
3


...
...
...
...
...
...
...


241
22.67
Male
Yes
Sat
Dinner
2


242
17.82
Male
No
Sat
Dinner
2


243
18.78
Female
No
Thur
Dinner
2



244 rows × 6 columns

`python
In [76]:


X = tips.drop('tip', axis=1)
y = tips['tip']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2) # We don't have to choose 0.25.
X
`

`python
In [76]:
`

Output:
Out[76]:







total_bill
sex
smoker
day
time
size




0
16.99
Female
No
Sun
Dinner
2


1
10.34
Male
No
Sun
Dinner
3


2
21.01
Male
No
Sun
Dinner
3


...
...
...
...
...
...
...


241
22.67
Male
Yes
Sat
Dinner
2


242
17.82
Male
No
Sat
Dinner
2


243
18.78
Female
No
Thur
Dinner
2



244 rows × 6 columns

Output:
Out[76]:







total_bill
sex
smoker
day
time
size




0
16.99
Female
No
Sun
Dinner
2


1
10.34
Male
No
Sun
Dinner
3


2
21.01
Male
No
Sun
Dinner
3


...
...
...
...
...
...
...


241
22.67
Male
Yes
Sat
Dinner
2


242
17.82
Male
No
Sat
Dinner
2


243
18.78
Female
No
Thur
Dinner
2



244 rows × 6 columns

Before proceeding, let's check the sizes of X_train and X_test.

`python
Before proceeding, let's check the sizes of X_train and X_test.
`

Before proceeding, let's check the sizes of X_train and X_test.

`python
Before proceeding, let's check the sizes of X_train and X_test.
`

Before proceeding, let's check the sizes of X_train and X_test.

`python

`

`python
In [77]:


print('Rows in X_train:', X_train.shape[0])
display(X_train.head())
print('Rows in X_test:', X_test.shape[0])
display(X_test.head())
`

Output:
Rows in X_train: 195












total_bill
sex
smoker
day
time
size




4
24.59
Female
No
Sun
Dinner
4


209
12.76
Female
Yes
Sat
Dinner
2


178
9.60
Female
Yes
Sun
Dinner
2


230
24.01
Male
Yes
Sat
Dinner
4


5
25.29
Male
No
Sun
Dinner
4









Rows in X_test: 49












total_bill
sex
smoker
day
time
size




146
18.64
Female
No
Thur
Lunch
3


224
13.42
Male
Yes
Fri
Lunch
2


134
18.26
Female
No
Thur
Lunch
2


131
20.27
Female
No
Thur
Lunch
2


147
11.87
Female
No
Thur
Lunch
2

`python
In [77]:


print('Rows in X_train:', X_train.shape[0])
display(X_train.head())
print('Rows in X_test:', X_test.shape[0])
display(X_test.head())
`

`python
In [77]:
`

Output:
Rows in X_train: 195












total_bill
sex
smoker
day
time
size




4
24.59
Female
No
Sun
Dinner
4


209
12.76
Female
Yes
Sat
Dinner
2


178
9.60
Female
Yes
Sun
Dinner
2


230
24.01
Male
Yes
Sat
Dinner
4


5
25.29
Male
No
Sun
Dinner
4









Rows in X_test: 49












total_bill
sex
smoker
day
time
size




146
18.64
Female
No
Thur
Lunch
3


224
13.42
Male
Yes
Fri
Lunch
2


134
18.26
Female
No
Thur
Lunch
2


131
20.27
Female
No
Thur
Lunch
2


147
11.87
Female
No
Thur
Lunch
2

Output:
Rows in X_train: 195

`python
In [78]:


X_train.shape[0] / tips.shape[0]
`

Output:
Out[78]:

0.7991803278688525

`python
In [78]:


X_train.shape[0] / tips.shape[0]
`

`python
In [78]:
`

Output:
Out[78]:

0.7991803278688525

Output:
Out[78]:

0.7991803278688525

Example train-test split¶Steps:

Fit a model on the training set.
Evaluate the model on the test set.

`python
Example train-test split¶Steps:

Fit a model on the training set.
Evaluate the model on the test set.
`

Example train-test split¶Steps:

Fit a model on the training set.
Evaluate the model on the test set.

`python
Example train-test split¶Steps:

Fit a model on the training set.
Evaluate the model on the test set.
`

Example train-test split¶Steps:

Fit a model on the training set.
Evaluate the model on the test set.

`python

`

`python
In [79]:


tips.head()
`

Output:
Out[79]:







total_bill
tip
sex
smoker
day
time
size




0
16.99
1.01
Female
No
Sun
Dinner
2


1
10.34
1.66
Male
No
Sun
Dinner
3


2
21.01
3.50
Male
No
Sun
Dinner
3


3
23.68
3.31
Male
No
Sun
Dinner
2


4
24.59
3.61
Female
No
Sun
Dinner
4

`python
In [79]:


tips.head()
`

`python
In [79]:
`

Output:
Out[79]:







total_bill
tip
sex
smoker
day
time
size




0
16.99
1.01
Female
No
Sun
Dinner
2


1
10.34
1.66
Male
No
Sun
Dinner
3


2
21.01
3.50
Male
No
Sun
Dinner
3


3
23.68
3.31
Male
No
Sun
Dinner
2


4
24.59
3.61
Female
No
Sun
Dinner
4

Output:
Out[79]:







total_bill
tip
sex
smoker
day
time
size




0
16.99
1.01
Female
No
Sun
Dinner
2


1
10.34
1.66
Male
No
Sun
Dinner
3


2
21.01
3.50
Male
No
Sun
Dinner
3


3
23.68
3.31
Male
No
Sun
Dinner
2


4
24.59
3.61
Female
No
Sun
Dinner
4

`python
In [80]:


X = tips[['total_bill', 'size']] # For this example, we'll use just the already-quantitative columns in tips.
y = tips['tip']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=1) # random_state is like np.random.seed.
`

`python
In [80]:
`

Here, we'll use a stand-alone LinearRegression model without a Pipeline, but this process would work the same if we were using a Pipeline.

`python
Here, we'll use a stand-alone LinearRegression model without a Pipeline, but this process would work the same if we were using a Pipeline.
`

Here, we'll use a stand-alone LinearRegression model without a Pipeline, but this process would work the same if we were using a Pipeline.

`python
Here, we'll use a stand-alone LinearRegression model without a Pipeline, but this process would work the same if we were using a Pipeline.
`

Here, we'll use a stand-alone LinearRegression model without a Pipeline, but this process would work the same if we were using a Pipeline.

`python

`

`python
In [81]:


lr = LinearRegression()
lr.fit(X_train, y_train)
`

Output:
Out[81]:

LinearRegression()In a Jupyter environment, please rerun this cell to show the HTML representation or trust the notebook. On GitHub, the HTML representation is unable to render, please try loading this page with nbviewer.org.  LinearRegression?Documentation for LinearRegressioniFittedLinearRegression()

`python
In [81]:


lr = LinearRegression()
lr.fit(X_train, y_train)
`

`python
In [81]:
`

Output:
Out[81]:

LinearRegression()In a Jupyter environment, please rerun this cell to show the HTML representation or trust the notebook. On GitHub, the HTML representation is unable to render, please try loading this page with nbviewer.org.  LinearRegression?Documentation for LinearRegressioniFittedLinearRegression()

Output:
Out[81]:

LinearRegression()In a Jupyter environment, please rerun this cell to show the HTML representation or trust the notebook. On GitHub, the HTML representation is unable to render, please try loading this page with nbviewer.org.  LinearRegression?Documentation for LinearRegressioniFittedLinearRegression()

Let's check our model's performance on the training set first.

`python
Let's check our model's performance on the training set first.
`

Let's check our model's performance on the training set first.

`python
Let's check our model's performance on the training set first.
`

Let's check our model's performance on the training set first.

`python

`

`python
In [82]:


pred_train = lr.predict(X_train)
rmse_train = root_mean_squared_error(y_train, pred_train)
rmse_train
`

Output:
Out[82]:

0.9803205287924737

`python
In [82]:


pred_train = lr.predict(X_train)
rmse_train = root_mean_squared_error(y_train, pred_train)
rmse_train
`

`python
In [82]:
`

Output:
Out[82]:

0.9803205287924737

Output:
Out[82]:

0.9803205287924737

And the test set:

`python
And the test set:
`

And the test set:

`python
And the test set:
`

And the test set:

`python

`

`python
In [83]:


pred_test = lr.predict(X_test)
rmse_test = root_mean_squared_error(y_test, pred_test)
rmse_test
`

Output:
Out[83]:

1.1381771291131255

`python
In [83]:


pred_test = lr.predict(X_test)
rmse_test = root_mean_squared_error(y_test, pred_test)
rmse_test
`

`python
In [83]:
`

Output:
Out[83]:

1.1381771291131255

Output:
Out[83]:

1.1381771291131255

Since rmse_train and rmse_test are similar, it doesn't seem like our model is overfitting to the training data. If rmse_test was much larger than rmse_train, it would be evidence that our model is unable to generalize well.

`python
Since rmse_train and rmse_test are similar, it doesn't seem like our model is overfitting to the training data. If rmse_test was much larger than rmse_train, it would be evidence that our model is unable to generalize well.
`

Since rmse_train and rmse_test are similar, it doesn't seem like our model is overfitting to the training data. If rmse_test was much larger than rmse_train, it would be evidence that our model is unable to generalize well.

`python
Since rmse_train and rmse_test are similar, it doesn't seem like our model is overfitting to the training data. If rmse_test was much larger than rmse_train, it would be evidence that our model is unable to generalize well.
`

Since rmse_train and rmse_test are similar, it doesn't seem like our model is overfitting to the training data. If rmse_test was much larger than rmse_train, it would be evidence that our model is unable to generalize well.

`python

`

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
We want to build models that generalize well to unseen data.
Models that have high bias are too simple to represent complex relationships in data, and underfit.
Models that have high variance are overly complex for the relationships in the data, and vary a lot when fit on different datasets. Such models overfit to the training data.

`python
Summary¶
We want to build models that generalize well to unseen data.
Models that have high bias are too simple to represent complex relationships in data, and underfit.
Models that have high variance are overly complex for the relationships in the data, and vary a lot when fit on different datasets. Such models overfit to the training data.
`

Summary¶
We want to build models that generalize well to unseen data.
Models that have high bias are too simple to represent complex relationships in data, and underfit.
Models that have high variance are overly complex for the relationships in the data, and vary a lot when fit on different datasets. Such models overfit to the training data.

`python
Summary¶
We want to build models that generalize well to unseen data.
Models that have high bias are too simple to represent complex relationships in data, and underfit.
Models that have high variance are overly complex for the relationships in the data, and vary a lot when fit on different datasets. Such models overfit to the training data.
`

Summary¶
We want to build models that generalize well to unseen data.
Models that have high bias are too simple to represent complex relationships in data, and underfit.
Models that have high variance are overly complex for the relationships in the data, and vary a lot when fit on different datasets. Such models overfit to the training data.

`python

`

Next time¶What are hyperparameters and how do we choose them?

`python
Next time¶What are hyperparameters and how do we choose them?
`

Next time¶What are hyperparameters and how do we choose them?

`python
Next time¶What are hyperparameters and how do we choose them?
`

Next time¶What are hyperparameters and how do we choose them?

`python

`