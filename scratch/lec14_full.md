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
`

`python
In [2]:
`

Lecture 14 – Linear Regression¶DSC 80, Summer 2026¶

`python
Lecture 14 – Linear Regression¶DSC 80, Summer 2026¶
`

Lecture 14 – Linear Regression¶DSC 80, Summer 2026¶

`python
Lecture 14 – Linear Regression¶DSC 80, Summer 2026¶
`

Lecture 14 – Linear Regression¶DSC 80, Summer 2026¶

`python

`

Agenda 📆¶
Modeling.
Case study: Restaurant tips 🧑‍🍳.
Regression in sklearn.

Conceptually, today will mostly be review from DSC 40A, but we'll introduce a few new practical tools that we'll build upon next class.

`python
Agenda 📆¶
Modeling.
Case study: Restaurant tips 🧑‍🍳.
Regression in sklearn.

Conceptually, today will mostly be review from DSC 40A, but we'll introduce a few new practical tools that we'll build upon next class.
`

Agenda 📆¶
Modeling.
Case study: Restaurant tips 🧑‍🍳.
Regression in sklearn.

Conceptually, today will mostly be review from DSC 40A, but we'll introduce a few new practical tools that we'll build upon next class.

`python
Agenda 📆¶
Modeling.
Case study: Restaurant tips 🧑‍🍳.
Regression in sklearn.

Conceptually, today will mostly be review from DSC 40A, but we'll introduce a few new practical tools that we'll build upon next class.
`

Agenda 📆¶
Modeling.
Case study: Restaurant tips 🧑‍🍳.
Regression in sklearn.

Conceptually, today will mostly be review from DSC 40A, but we'll introduce a few new practical tools that we'll build upon next class.

`python

`

Question 🤔

From the Fall 23 final:
Consider the following corpus:
Document number Content
1               yesterday rainy today sunny
2               yesterday sunny today sunny
3               today rainy yesterday today
4               yesterday yesterday today today

    

Using a bag-of-words representation, which two documents have the largest dot product?
Using a bag-of-words representation, what is the cosine similarity between documents 2 and 3?
Which words have a TF-IDF score of 0 for all four documents?

`python
Question 🤔

From the Fall 23 final:
Consider the following corpus:
Document number Content
1               yesterday rainy today sunny
2               yesterday sunny today sunny
3               today rainy yesterday today
4               yesterday yesterday today today

    

Using a bag-of-words representation, which two documents have the largest dot product?
Using a bag-of-words representation, what is the cosine similarity between documents 2 and 3?
Which words have a TF-IDF score of 0 for all four documents?
`

Question 🤔

From the Fall 23 final:
Consider the following corpus:
Document number Content
1               yesterday rainy today sunny
2               yesterday sunny today sunny
3               today rainy yesterday today
4               yesterday yesterday today today

    

Using a bag-of-words representation, which two documents have the largest dot product?
Using a bag-of-words representation, what is the cosine similarity between documents 2 and 3?
Which words have a TF-IDF score of 0 for all four documents?

`python
Question 🤔

From the Fall 23 final:
Consider the following corpus:
Document number Content
1               yesterday rainy today sunny
2               yesterday sunny today sunny
3               today rainy yesterday today
4               yesterday yesterday today today

    

Using a bag-of-words representation, which two documents have the largest dot product?
Using a bag-of-words representation, what is the cosine similarity between documents 2 and 3?
Which words have a TF-IDF score of 0 for all four documents?
`

Question 🤔

From the Fall 23 final:
Consider the following corpus:
Document number Content
1               yesterday rainy today sunny
2               yesterday sunny today sunny
3               today rainy yesterday today
4               yesterday yesterday today today

    

Using a bag-of-words representation, which two documents have the largest dot product?
Using a bag-of-words representation, what is the cosine similarity between documents 2 and 3?
Which words have a TF-IDF score of 0 for all four documents?

`python

`

Modeling¶

`python
Modeling¶
`

Modeling¶

`python
Modeling¶
`

Modeling¶

`python

`

Reflection¶So far this quarter, we've learned how to:

Extract information from tabular data using pandas and regular expressions.

Clean data so that it best represents an underlying data generating process.

Missingness analyses and imputation.


Collect data from the internet through scraping and APIs, and parse it using BeautifulSoup.

Perform exploratory data analysis through aggregation, visualization, and the computation of summary statistics like TF-IDF.

Infer about the relationships between samples and populations through hypothesis and permutation testing.

Now, let's make predictions.

`python
Reflection¶So far this quarter, we've learned how to:

Extract information from tabular data using pandas and regular expressions.

Clean data so that it best represents an underlying data generating process.

Missingness analyses and imputation.


Collect data from the internet through scraping and APIs, and parse it using BeautifulSoup.

Perform exploratory data analysis through aggregation, visualization, and the computation of summary statistics like TF-IDF.

Infer about the relationships between samples and populations through hypothesis and permutation testing.

Now, let's make predictions.
`

Reflection¶So far this quarter, we've learned how to:

Extract information from tabular data using pandas and regular expressions.

Clean data so that it best represents an underlying data generating process.

Missingness analyses and imputation.


Collect data from the internet through scraping and APIs, and parse it using BeautifulSoup.

Perform exploratory data analysis through aggregation, visualization, and the computation of summary statistics like TF-IDF.

Infer about the relationships between samples and populations through hypothesis and permutation testing.

Now, let's make predictions.

`python
Reflection¶So far this quarter, we've learned how to:

Extract information from tabular data using pandas and regular expressions.

Clean data so that it best represents an underlying data generating process.

Missingness analyses and imputation.


Collect data from the internet through scraping and APIs, and parse it using BeautifulSoup.

Perform exploratory data analysis through aggregation, visualization, and the computation of summary statistics like TF-IDF.

Infer about the relationships between samples and populations through hypothesis and permutation testing.

Now, let's make predictions.
`

Reflection¶So far this quarter, we've learned how to:

Extract information from tabular data using pandas and regular expressions.

Clean data so that it best represents an underlying data generating process.

Missingness analyses and imputation.


Collect data from the internet through scraping and APIs, and parse it using BeautifulSoup.

Perform exploratory data analysis through aggregation, visualization, and the computation of summary statistics like TF-IDF.

Infer about the relationships between samples and populations through hypothesis and permutation testing.

Now, let's make predictions.

`python

`



`python

`



`python

`



`python

`

Modeling¶
A model is a set of assumptions about how data were generated.

George Box, a famous statistician, once said "All models are wrong, but some are useful." What did he mean?

`python
Modeling¶
A model is a set of assumptions about how data were generated.

George Box, a famous statistician, once said "All models are wrong, but some are useful." What did he mean?
`

Modeling¶
A model is a set of assumptions about how data were generated.

George Box, a famous statistician, once said "All models are wrong, but some are useful." What did he mean?

`python
Modeling¶
A model is a set of assumptions about how data were generated.

George Box, a famous statistician, once said "All models are wrong, but some are useful." What did he mean?
`

Modeling¶
A model is a set of assumptions about how data were generated.

George Box, a famous statistician, once said "All models are wrong, but some are useful." What did he mean?

`python

`

Philosophy¶

`python
Philosophy¶
`

Philosophy¶

`python
Philosophy¶
`

Philosophy¶

`python

`

"It has been said that "all models are wrong but some models are useful." In other words, any model is at best a useful fiction—there never was, or ever will be, an exactly normal distribution or an exact linear relationship. Nevertheless, enormous progress has been made by entertaining such fictions and using them as approximations."

`python
"It has been said that "all models are wrong but some models are useful." In other words, any model is at best a useful fiction—there never was, or ever will be, an exactly normal distribution or an exact linear relationship. Nevertheless, enormous progress has been made by entertaining such fictions and using them as approximations."
`

"It has been said that "all models are wrong but some models are useful." In other words, any model is at best a useful fiction—there never was, or ever will be, an exactly normal distribution or an exact linear relationship. Nevertheless, enormous progress has been made by entertaining such fictions and using them as approximations."

`python
"It has been said that "all models are wrong but some models are useful." In other words, any model is at best a useful fiction—there never was, or ever will be, an exactly normal distribution or an exact linear relationship. Nevertheless, enormous progress has been made by entertaining such fictions and using them as approximations."
`

"It has been said that "all models are wrong but some models are useful." In other words, any model is at best a useful fiction—there never was, or ever will be, an exactly normal distribution or an exact linear relationship. Nevertheless, enormous progress has been made by entertaining such fictions and using them as approximations."

`python

`

"Since all models are wrong the scientist cannot obtain a "correct" one by excessive elaboration. On the contrary following William of Occam he should seek an economical description of natural phenomena. Just as the ability to devise simple but evocative models is the signature of the great scientist so overelaboration and overparameterization is often the mark of mediocrity."

`python
"Since all models are wrong the scientist cannot obtain a "correct" one by excessive elaboration. On the contrary following William of Occam he should seek an economical description of natural phenomena. Just as the ability to devise simple but evocative models is the signature of the great scientist so overelaboration and overparameterization is often the mark of mediocrity."
`

"Since all models are wrong the scientist cannot obtain a "correct" one by excessive elaboration. On the contrary following William of Occam he should seek an economical description of natural phenomena. Just as the ability to devise simple but evocative models is the signature of the great scientist so overelaboration and overparameterization is often the mark of mediocrity."

`python
"Since all models are wrong the scientist cannot obtain a "correct" one by excessive elaboration. On the contrary following William of Occam he should seek an economical description of natural phenomena. Just as the ability to devise simple but evocative models is the signature of the great scientist so overelaboration and overparameterization is often the mark of mediocrity."
`

"Since all models are wrong the scientist cannot obtain a "correct" one by excessive elaboration. On the contrary following William of Occam he should seek an economical description of natural phenomena. Just as the ability to devise simple but evocative models is the signature of the great scientist so overelaboration and overparameterization is often the mark of mediocrity."

`python

`

Goals of modeling¶

`python
Goals of modeling¶
`

Goals of modeling¶

`python
Goals of modeling¶
`

Goals of modeling¶

`python

`

To make inferences about complex phenomena in nature.

Is there a linear relationship between the heights of children and the heights of their biological mothers?
The weights of smoking and non-smoking mothers' babies babies in my sample are different – how confident am I that this difference exists in the population?

`python
To make inferences about complex phenomena in nature.

Is there a linear relationship between the heights of children and the heights of their biological mothers?
The weights of smoking and non-smoking mothers' babies babies in my sample are different – how confident am I that this difference exists in the population?
`

To make inferences about complex phenomena in nature.

Is there a linear relationship between the heights of children and the heights of their biological mothers?
The weights of smoking and non-smoking mothers' babies babies in my sample are different – how confident am I that this difference exists in the population?

`python
To make inferences about complex phenomena in nature.

Is there a linear relationship between the heights of children and the heights of their biological mothers?
The weights of smoking and non-smoking mothers' babies babies in my sample are different – how confident am I that this difference exists in the population?
`

To make inferences about complex phenomena in nature.

Is there a linear relationship between the heights of children and the heights of their biological mothers?
The weights of smoking and non-smoking mothers' babies babies in my sample are different – how confident am I that this difference exists in the population?

`python

`

To make accurate predictions regarding unseen data.

Given this dataset of past UCSD data science students' salaries, can we predict your future salary? (regression)
Given this dataset of images, can we predict if this new image is of a dog, cat, or zebra? (classification)

`python
To make accurate predictions regarding unseen data.

Given this dataset of past UCSD data science students' salaries, can we predict your future salary? (regression)
Given this dataset of images, can we predict if this new image is of a dog, cat, or zebra? (classification)
`

To make accurate predictions regarding unseen data.

Given this dataset of past UCSD data science students' salaries, can we predict your future salary? (regression)
Given this dataset of images, can we predict if this new image is of a dog, cat, or zebra? (classification)

`python
To make accurate predictions regarding unseen data.

Given this dataset of past UCSD data science students' salaries, can we predict your future salary? (regression)
Given this dataset of images, can we predict if this new image is of a dog, cat, or zebra? (classification)
`

To make accurate predictions regarding unseen data.

Given this dataset of past UCSD data science students' salaries, can we predict your future salary? (regression)
Given this dataset of images, can we predict if this new image is of a dog, cat, or zebra? (classification)

`python

`



`python

`



`python

`



`python

`

Of the two focuses of models, we will focus on prediction.

In the above taxonomy, we will focus on supervised learning.

We'll start with regression before moving to classification.

`python
Of the two focuses of models, we will focus on prediction.

In the above taxonomy, we will focus on supervised learning.

We'll start with regression before moving to classification.
`

Of the two focuses of models, we will focus on prediction.

In the above taxonomy, we will focus on supervised learning.

We'll start with regression before moving to classification.

`python
Of the two focuses of models, we will focus on prediction.

In the above taxonomy, we will focus on supervised learning.

We'll start with regression before moving to classification.
`

Of the two focuses of models, we will focus on prediction.

In the above taxonomy, we will focus on supervised learning.

We'll start with regression before moving to classification.

`python

`

Features¶
A feature is a measurable property of a phenomenon being observed.

Other terms for "feature" include "(explanatory) variable" and "attribute".
Typically, features are the inputs to models.


In DataFrames, features typically correspond to columns, while rows typically correspond to different individuals.

Some features come as part of a dataset, e.g. weight and height, but others we need to create given existing features, for example:
$$\text{BMI} = \frac{\text{weight (kg)}}{\text{[height (m)]}^2}$$

Example: TF-IDF creates features that summarize documents!

`python
Features¶
A feature is a measurable property of a phenomenon being observed.

Other terms for "feature" include "(explanatory) variable" and "attribute".
Typically, features are the inputs to models.


In DataFrames, features typically correspond to columns, while rows typically correspond to different individuals.

Some features come as part of a dataset, e.g. weight and height, but others we need to create given existing features, for example:
$$\text{BMI} = \frac{\text{weight (kg)}}{\text{[height (m)]}^2}$$

Example: TF-IDF creates features that summarize documents!
`

Features¶
A feature is a measurable property of a phenomenon being observed.

Other terms for "feature" include "(explanatory) variable" and "attribute".
Typically, features are the inputs to models.


In DataFrames, features typically correspond to columns, while rows typically correspond to different individuals.

Some features come as part of a dataset, e.g. weight and height, but others we need to create given existing features, for example:
$$\text{BMI} = \frac{\text{weight (kg)}}{\text{[height (m)]}^2}$$

Example: TF-IDF creates features that summarize documents!

`python
Features¶
A feature is a measurable property of a phenomenon being observed.

Other terms for "feature" include "(explanatory) variable" and "attribute".
Typically, features are the inputs to models.


In DataFrames, features typically correspond to columns, while rows typically correspond to different individuals.

Some features come as part of a dataset, e.g. weight and height, but others we need to create given existing features, for example:
$$\text{BMI} = \frac{\text{weight (kg)}}{\text{[height (m)]}^2}$$

Example: TF-IDF creates features that summarize documents!
`

Features¶
A feature is a measurable property of a phenomenon being observed.

Other terms for "feature" include "(explanatory) variable" and "attribute".
Typically, features are the inputs to models.


In DataFrames, features typically correspond to columns, while rows typically correspond to different individuals.

Some features come as part of a dataset, e.g. weight and height, but others we need to create given existing features, for example:
$$\text{BMI} = \frac{\text{weight (kg)}}{\text{[height (m)]}^2}$$

Example: TF-IDF creates features that summarize documents!

`python

`

Example: Restaurant tips 🧑‍🍳¶

`python
Example: Restaurant tips 🧑‍🍳¶
`

Example: Restaurant tips 🧑‍🍳¶

`python
Example: Restaurant tips 🧑‍🍳¶
`

Example: Restaurant tips 🧑‍🍳¶

`python

`

About the data¶What features does the dataset contain? Is this likely a recent dataset, or an older one?

`python
About the data¶What features does the dataset contain? Is this likely a recent dataset, or an older one?
`

About the data¶What features does the dataset contain? Is this likely a recent dataset, or an older one?

`python
About the data¶What features does the dataset contain? Is this likely a recent dataset, or an older one?
`

About the data¶What features does the dataset contain? Is this likely a recent dataset, or an older one?

`python

`

`python
In [3]:


# The dataset is built into plotly!
tips = px.data.tips()
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
In [3]:


# The dataset is built into plotly!
tips = px.data.tips()
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

Predicting tips¶

`python
Predicting tips¶
`

Predicting tips¶

`python
Predicting tips¶
`

Predicting tips¶

`python

`

Goal: Given various information about a table at a restaurant, we want to predict the tip that a server will earn.

`python
Goal: Given various information about a table at a restaurant, we want to predict the tip that a server will earn.
`

Goal: Given various information about a table at a restaurant, we want to predict the tip that a server will earn.

`python
Goal: Given various information about a table at a restaurant, we want to predict the tip that a server will earn.
`

Goal: Given various information about a table at a restaurant, we want to predict the tip that a server will earn.

`python

`

Why might a server be interested in doing this?
To determine which tables are likely to tip the most (inference).
To predict earnings over the next month (prediction).

`python
Why might a server be interested in doing this?
To determine which tables are likely to tip the most (inference).
To predict earnings over the next month (prediction).
`

Why might a server be interested in doing this?
To determine which tables are likely to tip the most (inference).
To predict earnings over the next month (prediction).

`python
Why might a server be interested in doing this?
To determine which tables are likely to tip the most (inference).
To predict earnings over the next month (prediction).
`

Why might a server be interested in doing this?
To determine which tables are likely to tip the most (inference).
To predict earnings over the next month (prediction).

`python

`

Exploratory data analysis¶

`python
Exploratory data analysis¶
`

Exploratory data analysis¶

`python
Exploratory data analysis¶
`

Exploratory data analysis¶

`python

`

The most natural feature to look at first is total bills.

`python
The most natural feature to look at first is total bills.
`

The most natural feature to look at first is total bills.

`python
The most natural feature to look at first is total bills.
`

The most natural feature to look at first is total bills.

`python

`

As such, we should explore the relationship between total bills and tips. Moving forward:
$x$: Total bills.
$y$: Tips.

`python
As such, we should explore the relationship between total bills and tips. Moving forward:
$x$: Total bills.
$y$: Tips.
`

As such, we should explore the relationship between total bills and tips. Moving forward:
$x$: Total bills.
$y$: Tips.

`python
As such, we should explore the relationship between total bills and tips. Moving forward:
$x$: Total bills.
$y$: Tips.
`

As such, we should explore the relationship between total bills and tips. Moving forward:
$x$: Total bills.
$y$: Tips.

`python

`

`python
In [4]:


fig = tips.plot(kind='scatter', x='total_bill', y='tip', title='Tip vs. Total Bill')
fig.update_layout(xaxis_title='Total Bill', yaxis_title='Tip')
`

`python
In [4]:
`

Model #1: Constant¶

`python
Model #1: Constant¶
`

Model #1: Constant¶

`python
Model #1: Constant¶
`

Model #1: Constant¶

`python

`

Let's start simple, by ignoring all features. Suppose our model assumes every tip is given by a constant dollar amount:

$$\text{tip} = h^{\text{true}}$$

`python
Let's start simple, by ignoring all features. Suppose our model assumes every tip is given by a constant dollar amount:

$$\text{tip} = h^{\text{true}}$$
`

Let's start simple, by ignoring all features. Suppose our model assumes every tip is given by a constant dollar amount:

$$\text{tip} = h^{\text{true}}$$

`python
Let's start simple, by ignoring all features. Suppose our model assumes every tip is given by a constant dollar amount:

$$\text{tip} = h^{\text{true}}$$
`

Let's start simple, by ignoring all features. Suppose our model assumes every tip is given by a constant dollar amount:

$$\text{tip} = h^{\text{true}}$$

`python

`

Model: There is a single tip amount $h^{\text{true}}$ that all customers pay.
Correct? No!
Useful? Perhaps. An estimate of $h^{\text{true}}$, denoted by $h^*$, can allow us to predict future tips.

`python
Model: There is a single tip amount $h^{\text{true}}$ that all customers pay.
Correct? No!
Useful? Perhaps. An estimate of $h^{\text{true}}$, denoted by $h^*$, can allow us to predict future tips.
`

Model: There is a single tip amount $h^{\text{true}}$ that all customers pay.
Correct? No!
Useful? Perhaps. An estimate of $h^{\text{true}}$, denoted by $h^*$, can allow us to predict future tips.

`python
Model: There is a single tip amount $h^{\text{true}}$ that all customers pay.
Correct? No!
Useful? Perhaps. An estimate of $h^{\text{true}}$, denoted by $h^*$, can allow us to predict future tips.
`

Model: There is a single tip amount $h^{\text{true}}$ that all customers pay.
Correct? No!
Useful? Perhaps. An estimate of $h^{\text{true}}$, denoted by $h^*$, can allow us to predict future tips.

`python

`



`python

`



`python

`



`python

`

Looking at the data¶Our estimate for $h^{\text{true}}$ should be a good summary statistic of the distribution of tips.

`python
Looking at the data¶Our estimate for $h^{\text{true}}$ should be a good summary statistic of the distribution of tips.
`

Looking at the data¶Our estimate for $h^{\text{true}}$ should be a good summary statistic of the distribution of tips.

`python
Looking at the data¶Our estimate for $h^{\text{true}}$ should be a good summary statistic of the distribution of tips.
`

Looking at the data¶Our estimate for $h^{\text{true}}$ should be a good summary statistic of the distribution of tips.

`python

`

`python
In [5]:


fig = tips.plot(kind='hist', x='tip', title='Distribution of Tip', nbins=20)
fig.update_layout(xaxis_title='Tip', yaxis_title='Frequency')
`

`python
In [5]:
`

Empirical risk minimization¶

`python
Empirical risk minimization¶
`

Empirical risk minimization¶

`python
Empirical risk minimization¶
`

Empirical risk minimization¶

`python

`

In DSC 40A, we established a framework for estimating model parameters:
Choose a loss function, which measures how "good" a single prediction is.
Minimize empirical risk, to find the best estimate for the dataset that we have.

`python
In DSC 40A, we established a framework for estimating model parameters:
Choose a loss function, which measures how "good" a single prediction is.
Minimize empirical risk, to find the best estimate for the dataset that we have.
`

In DSC 40A, we established a framework for estimating model parameters:
Choose a loss function, which measures how "good" a single prediction is.
Minimize empirical risk, to find the best estimate for the dataset that we have.

`python
In DSC 40A, we established a framework for estimating model parameters:
Choose a loss function, which measures how "good" a single prediction is.
Minimize empirical risk, to find the best estimate for the dataset that we have.
`

In DSC 40A, we established a framework for estimating model parameters:
Choose a loss function, which measures how "good" a single prediction is.
Minimize empirical risk, to find the best estimate for the dataset that we have.

`python

`

Depending on which loss function we choose, we will end up with different $h^*$ (which are estimates of $h^{\text{true}})$.

`python
Depending on which loss function we choose, we will end up with different $h^*$ (which are estimates of $h^{\text{true}})$.
`

Depending on which loss function we choose, we will end up with different $h^*$ (which are estimates of $h^{\text{true}})$.

`python
Depending on which loss function we choose, we will end up with different $h^*$ (which are estimates of $h^{\text{true}})$.
`

Depending on which loss function we choose, we will end up with different $h^*$ (which are estimates of $h^{\text{true}})$.

`python

`

If we choose squared loss, then our empirical risk is mean squared error:

$$\text{MSE} = \frac{1}{n} \sum_{i = 1}^n ( y_i - h )^2 \overset{\text{calculus}}\implies h^* = \text{mean}(y)$$

Remember, tips are our $y$ variable.

`python
If we choose squared loss, then our empirical risk is mean squared error:

$$\text{MSE} = \frac{1}{n} \sum_{i = 1}^n ( y_i - h )^2 \overset{\text{calculus}}\implies h^* = \text{mean}(y)$$

Remember, tips are our $y$ variable.
`

If we choose squared loss, then our empirical risk is mean squared error:

$$\text{MSE} = \frac{1}{n} \sum_{i = 1}^n ( y_i - h )^2 \overset{\text{calculus}}\implies h^* = \text{mean}(y)$$

Remember, tips are our $y$ variable.

`python
If we choose squared loss, then our empirical risk is mean squared error:

$$\text{MSE} = \frac{1}{n} \sum_{i = 1}^n ( y_i - h )^2 \overset{\text{calculus}}\implies h^* = \text{mean}(y)$$

Remember, tips are our $y$ variable.
`

If we choose squared loss, then our empirical risk is mean squared error:

$$\text{MSE} = \frac{1}{n} \sum_{i = 1}^n ( y_i - h )^2 \overset{\text{calculus}}\implies h^* = \text{mean}(y)$$

Remember, tips are our $y$ variable.

`python

`

If we choose absolute loss, then our empirical risk is mean absolute error:

$$\text{MAE} = \frac{1}{n} \sum_{i = 1}^n | y_i - h | \overset{\text{algebra}}\implies h^* = \text{median}(y)$$

`python
If we choose absolute loss, then our empirical risk is mean absolute error:

$$\text{MAE} = \frac{1}{n} \sum_{i = 1}^n | y_i - h | \overset{\text{algebra}}\implies h^* = \text{median}(y)$$
`

If we choose absolute loss, then our empirical risk is mean absolute error:

$$\text{MAE} = \frac{1}{n} \sum_{i = 1}^n | y_i - h | \overset{\text{algebra}}\implies h^* = \text{median}(y)$$

`python
If we choose absolute loss, then our empirical risk is mean absolute error:

$$\text{MAE} = \frac{1}{n} \sum_{i = 1}^n | y_i - h | \overset{\text{algebra}}\implies h^* = \text{median}(y)$$
`

If we choose absolute loss, then our empirical risk is mean absolute error:

$$\text{MAE} = \frac{1}{n} \sum_{i = 1}^n | y_i - h | \overset{\text{algebra}}\implies h^* = \text{median}(y)$$

`python

`

The mean tip¶Let's suppose we choose squared loss, meaning that $h^* = \text{mean}(y)$.

`python
The mean tip¶Let's suppose we choose squared loss, meaning that $h^* = \text{mean}(y)$.
`

The mean tip¶Let's suppose we choose squared loss, meaning that $h^* = \text{mean}(y)$.

`python
The mean tip¶Let's suppose we choose squared loss, meaning that $h^* = \text{mean}(y)$.
`

The mean tip¶Let's suppose we choose squared loss, meaning that $h^* = \text{mean}(y)$.

`python

`

`python
In [6]:


mean_tip = tips['tip'].mean()
mean_tip
`

Output:
Out[6]:

2.99827868852459

`python
In [6]:


mean_tip = tips['tip'].mean()
mean_tip
`

`python
In [6]:
`

Output:
Out[6]:

2.99827868852459

Output:
Out[6]:

2.99827868852459

$h^* = 2.998$ is our fit model – it was fit to our training data (the data we have available to learn from).

`python
$h^* = 2.998$ is our fit model – it was fit to our training data (the data we have available to learn from).
`

$h^* = 2.998$ is our fit model – it was fit to our training data (the data we have available to learn from).

`python
$h^* = 2.998$ is our fit model – it was fit to our training data (the data we have available to learn from).
`

$h^* = 2.998$ is our fit model – it was fit to our training data (the data we have available to learn from).

`python

`

Let's visualize this prediction.

`python
Let's visualize this prediction.
`

Let's visualize this prediction.

`python
Let's visualize this prediction.
`

Let's visualize this prediction.

`python

`

`python
In [7]:


fig = px.scatter(tips, x='total_bill', y='tip')
fig.add_hline(mean_tip, line_width=3, line_color='orange', opacity=1)
fig.update_layout(title='Tip vs. Total Bill',
                  xaxis_title='Total Bill', yaxis_title='Tip')
`

`python
In [7]:
`

Note that to make predictions, this model ignores total bill (and all other features), and predicts the same tip for all tables.

`python
Note that to make predictions, this model ignores total bill (and all other features), and predicts the same tip for all tables.
`

Note that to make predictions, this model ignores total bill (and all other features), and predicts the same tip for all tables.

`python
Note that to make predictions, this model ignores total bill (and all other features), and predicts the same tip for all tables.
`

Note that to make predictions, this model ignores total bill (and all other features), and predicts the same tip for all tables.

`python

`

The quality of predictions¶

`python
The quality of predictions¶
`

The quality of predictions¶

`python
The quality of predictions¶
`

The quality of predictions¶

`python

`

Question: How can we quantify how good this constant prediction is at predicting tips in our training data – that is, the data we used to fit the model?

`python
Question: How can we quantify how good this constant prediction is at predicting tips in our training data – that is, the data we used to fit the model?
`

Question: How can we quantify how good this constant prediction is at predicting tips in our training data – that is, the data we used to fit the model?

`python
Question: How can we quantify how good this constant prediction is at predicting tips in our training data – that is, the data we used to fit the model?
`

Question: How can we quantify how good this constant prediction is at predicting tips in our training data – that is, the data we used to fit the model?

`python

`

One answer: use the mean squared error. If $y_i$ represents the $i$th actual value and $H(x_i)$ represents the $i$th predicted value, then:

$$\text{MSE} = \frac{1}{n} \sum_{i = 1}^n \big( y_i - H(x_i) \big)^2$$

`python
One answer: use the mean squared error. If $y_i$ represents the $i$th actual value and $H(x_i)$ represents the $i$th predicted value, then:

$$\text{MSE} = \frac{1}{n} \sum_{i = 1}^n \big( y_i - H(x_i) \big)^2$$
`

One answer: use the mean squared error. If $y_i$ represents the $i$th actual value and $H(x_i)$ represents the $i$th predicted value, then:

$$\text{MSE} = \frac{1}{n} \sum_{i = 1}^n \big( y_i - H(x_i) \big)^2$$

`python
One answer: use the mean squared error. If $y_i$ represents the $i$th actual value and $H(x_i)$ represents the $i$th predicted value, then:

$$\text{MSE} = \frac{1}{n} \sum_{i = 1}^n \big( y_i - H(x_i) \big)^2$$
`

One answer: use the mean squared error. If $y_i$ represents the $i$th actual value and $H(x_i)$ represents the $i$th predicted value, then:

$$\text{MSE} = \frac{1}{n} \sum_{i = 1}^n \big( y_i - H(x_i) \big)^2$$

`python

`

`python
In [8]:


np.mean((tips['tip'] - mean_tip) ** 2)
`

Output:
Out[8]:

1.9066085124966412

`python
In [8]:


np.mean((tips['tip'] - mean_tip) ** 2)
`

`python
In [8]:
`

Output:
Out[8]:

1.9066085124966412

Output:
Out[8]:

1.9066085124966412

`python
In [9]:


# The same! A fact from 40A.
np.var(tips['tip'])
`

Output:
Out[9]:

1.9066085124966412

`python
In [9]:


# The same! A fact from 40A.
np.var(tips['tip'])
`

`python
In [9]:
`

Output:
Out[9]:

1.9066085124966412

Output:
Out[9]:

1.9066085124966412

Issue: The units of MSE are "dollars squared", which are a little hard to interpret.

`python
Issue: The units of MSE are "dollars squared", which are a little hard to interpret.
`

Issue: The units of MSE are "dollars squared", which are a little hard to interpret.

`python
Issue: The units of MSE are "dollars squared", which are a little hard to interpret.
`

Issue: The units of MSE are "dollars squared", which are a little hard to interpret.

`python

`

Root mean squared error¶

`python
Root mean squared error¶
`

Root mean squared error¶

`python
Root mean squared error¶
`

Root mean squared error¶

`python

`

Often, to measure the quality of a regression model's predictions, we will use the root mean squared error (RMSE):

$$\text{RMSE} = \sqrt{\frac{1}{n} \sum_{i = 1}^n \big( y_i - H(x_i) \big)^2}$$

`python
Often, to measure the quality of a regression model's predictions, we will use the root mean squared error (RMSE):

$$\text{RMSE} = \sqrt{\frac{1}{n} \sum_{i = 1}^n \big( y_i - H(x_i) \big)^2}$$
`

Often, to measure the quality of a regression model's predictions, we will use the root mean squared error (RMSE):

$$\text{RMSE} = \sqrt{\frac{1}{n} \sum_{i = 1}^n \big( y_i - H(x_i) \big)^2}$$

`python
Often, to measure the quality of a regression model's predictions, we will use the root mean squared error (RMSE):

$$\text{RMSE} = \sqrt{\frac{1}{n} \sum_{i = 1}^n \big( y_i - H(x_i) \big)^2}$$
`

Often, to measure the quality of a regression model's predictions, we will use the root mean squared error (RMSE):

$$\text{RMSE} = \sqrt{\frac{1}{n} \sum_{i = 1}^n \big( y_i - H(x_i) \big)^2}$$

`python

`

The units of the RMSE are the same as the units of the original $y$ values – dollars, in this case.

`python
The units of the RMSE are the same as the units of the original $y$ values – dollars, in this case.
`

The units of the RMSE are the same as the units of the original $y$ values – dollars, in this case.

`python
The units of the RMSE are the same as the units of the original $y$ values – dollars, in this case.
`

The units of the RMSE are the same as the units of the original $y$ values – dollars, in this case.

`python

`

Important: Minimizing MSE is the same as minimizing RMSE; the constant tip $h^*$ that minimizes MSE is the same $h^*$ that minimizes RMSE. (Why?)

`python
Important: Minimizing MSE is the same as minimizing RMSE; the constant tip $h^*$ that minimizes MSE is the same $h^*$ that minimizes RMSE. (Why?)
`

Important: Minimizing MSE is the same as minimizing RMSE; the constant tip $h^*$ that minimizes MSE is the same $h^*$ that minimizes RMSE. (Why?)

`python
Important: Minimizing MSE is the same as minimizing RMSE; the constant tip $h^*$ that minimizes MSE is the same $h^*$ that minimizes RMSE. (Why?)
`

Important: Minimizing MSE is the same as minimizing RMSE; the constant tip $h^*$ that minimizes MSE is the same $h^*$ that minimizes RMSE. (Why?)

`python

`

Computing and storing the RMSE¶Since we'll compute the RMSE for our future models too, we'll define a function that can compute it for us.

`python
Computing and storing the RMSE¶Since we'll compute the RMSE for our future models too, we'll define a function that can compute it for us.
`

Computing and storing the RMSE¶Since we'll compute the RMSE for our future models too, we'll define a function that can compute it for us.

`python
Computing and storing the RMSE¶Since we'll compute the RMSE for our future models too, we'll define a function that can compute it for us.
`

Computing and storing the RMSE¶Since we'll compute the RMSE for our future models too, we'll define a function that can compute it for us.

`python

`

`python
In [10]:


def rmse(actual, pred):
    return np.sqrt(np.mean((actual - pred) ** 2))
`

`python
In [10]:
`

Let's compute the RMSE of our constant tip's predictions, and store it in a dictionary that we can refer to later on.

`python
Let's compute the RMSE of our constant tip's predictions, and store it in a dictionary that we can refer to later on.
`

Let's compute the RMSE of our constant tip's predictions, and store it in a dictionary that we can refer to later on.

`python
Let's compute the RMSE of our constant tip's predictions, and store it in a dictionary that we can refer to later on.
`

Let's compute the RMSE of our constant tip's predictions, and store it in a dictionary that we can refer to later on.

`python

`

`python
In [11]:


rmse(tips['tip'], mean_tip)
`

Output:
Out[11]:

1.3807999538298954

`python
In [11]:


rmse(tips['tip'], mean_tip)
`

`python
In [11]:
`

Output:
Out[11]:

1.3807999538298954

Output:
Out[11]:

1.3807999538298954

`python
In [12]:


rmse_dict = {}
rmse_dict['constant tip amount'] = rmse(tips['tip'], mean_tip)
rmse_dict
`

Output:
Out[12]:

{'constant tip amount': 1.3807999538298954}

`python
In [12]:


rmse_dict = {}
rmse_dict['constant tip amount'] = rmse(tips['tip'], mean_tip)
rmse_dict
`

`python
In [12]:
`

Output:
Out[12]:

{'constant tip amount': 1.3807999538298954}

Output:
Out[12]:

{'constant tip amount': 1.3807999538298954}

Key idea: Since the mean minimizes RMSE for the constant model, it is impossible to change the mean_tip argument above to another number and yield a lower RMSE.

`python
Key idea: Since the mean minimizes RMSE for the constant model, it is impossible to change the mean_tip argument above to another number and yield a lower RMSE.
`

Key idea: Since the mean minimizes RMSE for the constant model, it is impossible to change the mean_tip argument above to another number and yield a lower RMSE.

`python
Key idea: Since the mean minimizes RMSE for the constant model, it is impossible to change the mean_tip argument above to another number and yield a lower RMSE.
`

Key idea: Since the mean minimizes RMSE for the constant model, it is impossible to change the mean_tip argument above to another number and yield a lower RMSE.

`python

`

Model #2: Simple linear regression using total bill¶

`python
Model #2: Simple linear regression using total bill¶
`

Model #2: Simple linear regression using total bill¶

`python
Model #2: Simple linear regression using total bill¶
`

Model #2: Simple linear regression using total bill¶

`python

`

We haven't yet used any of the features in the dataset. The first natural feature to look at is 'total_bill'.

`python
We haven't yet used any of the features in the dataset. The first natural feature to look at is 'total_bill'.
`

We haven't yet used any of the features in the dataset. The first natural feature to look at is 'total_bill'.

`python
We haven't yet used any of the features in the dataset. The first natural feature to look at is 'total_bill'.
`

We haven't yet used any of the features in the dataset. The first natural feature to look at is 'total_bill'.

`python

`

`python
In [13]:


tips.head()
`

Output:
Out[13]:







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
In [13]:


tips.head()
`

`python
In [13]:
`

Output:
Out[13]:







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
Out[13]:







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

We can fit a simple linear model to predict tips as a function of total bills:

$$\text{predicted tip} = w_0 + w_1 \cdot \text{total bill}$$

`python
We can fit a simple linear model to predict tips as a function of total bills:

$$\text{predicted tip} = w_0 + w_1 \cdot \text{total bill}$$
`

We can fit a simple linear model to predict tips as a function of total bills:

$$\text{predicted tip} = w_0 + w_1 \cdot \text{total bill}$$

`python
We can fit a simple linear model to predict tips as a function of total bills:

$$\text{predicted tip} = w_0 + w_1 \cdot \text{total bill}$$
`

We can fit a simple linear model to predict tips as a function of total bills:

$$\text{predicted tip} = w_0 + w_1 \cdot \text{total bill}$$

`python

`

This is a reasonable thing to do, because total bills and tips appeared to be linearly associated when we visualized them on a scatter plot a few slides ago.

`python
This is a reasonable thing to do, because total bills and tips appeared to be linearly associated when we visualized them on a scatter plot a few slides ago.
`

This is a reasonable thing to do, because total bills and tips appeared to be linearly associated when we visualized them on a scatter plot a few slides ago.

`python
This is a reasonable thing to do, because total bills and tips appeared to be linearly associated when we visualized them on a scatter plot a few slides ago.
`

This is a reasonable thing to do, because total bills and tips appeared to be linearly associated when we visualized them on a scatter plot a few slides ago.

`python

`

Recap: Simple linear regression¶A simple linear regression model is a linear model with a single feature, as we have here. For any total bill $x_i$, the predicted tip $H(x_i)$ is given by
$$H(x_i) = w_0 + w_1x_i$$

`python
Recap: Simple linear regression¶A simple linear regression model is a linear model with a single feature, as we have here. For any total bill $x_i$, the predicted tip $H(x_i)$ is given by
$$H(x_i) = w_0 + w_1x_i$$
`

Recap: Simple linear regression¶A simple linear regression model is a linear model with a single feature, as we have here. For any total bill $x_i$, the predicted tip $H(x_i)$ is given by
$$H(x_i) = w_0 + w_1x_i$$

`python
Recap: Simple linear regression¶A simple linear regression model is a linear model with a single feature, as we have here. For any total bill $x_i$, the predicted tip $H(x_i)$ is given by
$$H(x_i) = w_0 + w_1x_i$$
`

Recap: Simple linear regression¶A simple linear regression model is a linear model with a single feature, as we have here. For any total bill $x_i$, the predicted tip $H(x_i)$ is given by
$$H(x_i) = w_0 + w_1x_i$$

`python

`

Question: How do we determine which intercept, $w_0$, and slope, $w_1$, to use?

`python
Question: How do we determine which intercept, $w_0$, and slope, $w_1$, to use?
`

Question: How do we determine which intercept, $w_0$, and slope, $w_1$, to use?

`python
Question: How do we determine which intercept, $w_0$, and slope, $w_1$, to use?
`

Question: How do we determine which intercept, $w_0$, and slope, $w_1$, to use?

`python

`

One answer: Pick the $w_0$ and $w_1$ that minimize mean squared error. If $x_i$ and $y_i$ correspond to the $i$th total bill and tip, respectively, then:

$$\begin{align*}\text{MSE} &= \frac{1}{n} \sum_{i = 1}^n \big( y_i - H(x_i) \big)^2
\\ &= \frac{1}{n} \sum_{i = 1}^n \big( y_i - w_0 - w_1x_i \big)^2\end{align*}$$

`python
One answer: Pick the $w_0$ and $w_1$ that minimize mean squared error. If $x_i$ and $y_i$ correspond to the $i$th total bill and tip, respectively, then:

$$\begin{align*}\text{MSE} &= \frac{1}{n} \sum_{i = 1}^n \big( y_i - H(x_i) \big)^2
\\ &= \frac{1}{n} \sum_{i = 1}^n \big( y_i - w_0 - w_1x_i \big)^2\end{align*}$$
`

One answer: Pick the $w_0$ and $w_1$ that minimize mean squared error. If $x_i$ and $y_i$ correspond to the $i$th total bill and tip, respectively, then:

$$\begin{align*}\text{MSE} &= \frac{1}{n} \sum_{i = 1}^n \big( y_i - H(x_i) \big)^2
\\ &= \frac{1}{n} \sum_{i = 1}^n \big( y_i - w_0 - w_1x_i \big)^2\end{align*}$$

`python
One answer: Pick the $w_0$ and $w_1$ that minimize mean squared error. If $x_i$ and $y_i$ correspond to the $i$th total bill and tip, respectively, then:

$$\begin{align*}\text{MSE} &= \frac{1}{n} \sum_{i = 1}^n \big( y_i - H(x_i) \big)^2
\\ &= \frac{1}{n} \sum_{i = 1}^n \big( y_i - w_0 - w_1x_i \big)^2\end{align*}$$
`

One answer: Pick the $w_0$ and $w_1$ that minimize mean squared error. If $x_i$ and $y_i$ correspond to the $i$th total bill and tip, respectively, then:

$$\begin{align*}\text{MSE} &= \frac{1}{n} \sum_{i = 1}^n \big( y_i - H(x_i) \big)^2
\\ &= \frac{1}{n} \sum_{i = 1}^n \big( y_i - w_0 - w_1x_i \big)^2\end{align*}$$

`python

`

Key idea: The lower the MSE on our training data is, the "better" the model fits the training data.
Lower MSE = better predictions.
But lower MSE ≠ more reflective of reality!

`python
Key idea: The lower the MSE on our training data is, the "better" the model fits the training data.
Lower MSE = better predictions.
But lower MSE ≠ more reflective of reality!
`

Key idea: The lower the MSE on our training data is, the "better" the model fits the training data.
Lower MSE = better predictions.
But lower MSE ≠ more reflective of reality!

`python
Key idea: The lower the MSE on our training data is, the "better" the model fits the training data.
Lower MSE = better predictions.
But lower MSE ≠ more reflective of reality!
`

Key idea: The lower the MSE on our training data is, the "better" the model fits the training data.
Lower MSE = better predictions.
But lower MSE ≠ more reflective of reality!

`python

`

Empirical risk minimization, by hand¶$$\begin{align*}\text{MSE} &= \frac{1}{n} \sum_{i = 1}^n \big( y_i - w_0 - w_1x_i \big)^2\end{align*}$$

`python
Empirical risk minimization, by hand¶$$\begin{align*}\text{MSE} &= \frac{1}{n} \sum_{i = 1}^n \big( y_i - w_0 - w_1x_i \big)^2\end{align*}$$
`

Empirical risk minimization, by hand¶$$\begin{align*}\text{MSE} &= \frac{1}{n} \sum_{i = 1}^n \big( y_i - w_0 - w_1x_i \big)^2\end{align*}$$

`python
Empirical risk minimization, by hand¶$$\begin{align*}\text{MSE} &= \frac{1}{n} \sum_{i = 1}^n \big( y_i - w_0 - w_1x_i \big)^2\end{align*}$$
`

Empirical risk minimization, by hand¶$$\begin{align*}\text{MSE} &= \frac{1}{n} \sum_{i = 1}^n \big( y_i - w_0 - w_1x_i \big)^2\end{align*}$$

`python

`

In DSC 40A, you found the formulas for the best intercept, $w_0^*$, and the best slope, $w_1^*$, through calculus.
The resulting line, $H(x_i) = w_0^* + w_1^* x_i$, is called the line of best fit, or the regression line.

`python
In DSC 40A, you found the formulas for the best intercept, $w_0^*$, and the best slope, $w_1^*$, through calculus.
The resulting line, $H(x_i) = w_0^* + w_1^* x_i$, is called the line of best fit, or the regression line.
`

In DSC 40A, you found the formulas for the best intercept, $w_0^*$, and the best slope, $w_1^*$, through calculus.
The resulting line, $H(x_i) = w_0^* + w_1^* x_i$, is called the line of best fit, or the regression line.

`python
In DSC 40A, you found the formulas for the best intercept, $w_0^*$, and the best slope, $w_1^*$, through calculus.
The resulting line, $H(x_i) = w_0^* + w_1^* x_i$, is called the line of best fit, or the regression line.
`

In DSC 40A, you found the formulas for the best intercept, $w_0^*$, and the best slope, $w_1^*$, through calculus.
The resulting line, $H(x_i) = w_0^* + w_1^* x_i$, is called the line of best fit, or the regression line.

`python

`

Specifically, if $r$ is the correlation coefficient, $\sigma_x$ and $\sigma_y$ are the standard deviations of $x$ and $y$, and $\bar{x}$ and $\bar{y}$ are the means of $x$ and $y$, then:

$$w_1^* = r \cdot \frac{\sigma_y}{\sigma_x}$$
$$w_0^* = \bar{y} - w_1^* \bar{x}$$

`python
Specifically, if $r$ is the correlation coefficient, $\sigma_x$ and $\sigma_y$ are the standard deviations of $x$ and $y$, and $\bar{x}$ and $\bar{y}$ are the means of $x$ and $y$, then:

$$w_1^* = r \cdot \frac{\sigma_y}{\sigma_x}$$
$$w_0^* = \bar{y} - w_1^* \bar{x}$$
`

Specifically, if $r$ is the correlation coefficient, $\sigma_x$ and $\sigma_y$ are the standard deviations of $x$ and $y$, and $\bar{x}$ and $\bar{y}$ are the means of $x$ and $y$, then:

$$w_1^* = r \cdot \frac{\sigma_y}{\sigma_x}$$
$$w_0^* = \bar{y} - w_1^* \bar{x}$$

`python
Specifically, if $r$ is the correlation coefficient, $\sigma_x$ and $\sigma_y$ are the standard deviations of $x$ and $y$, and $\bar{x}$ and $\bar{y}$ are the means of $x$ and $y$, then:

$$w_1^* = r \cdot \frac{\sigma_y}{\sigma_x}$$
$$w_0^* = \bar{y} - w_1^* \bar{x}$$
`

Specifically, if $r$ is the correlation coefficient, $\sigma_x$ and $\sigma_y$ are the standard deviations of $x$ and $y$, and $\bar{x}$ and $\bar{y}$ are the means of $x$ and $y$, then:

$$w_1^* = r \cdot \frac{\sigma_y}{\sigma_x}$$
$$w_0^* = \bar{y} - w_1^* \bar{x}$$

`python

`

Regression in sklearn¶

`python
Regression in sklearn¶
`

Regression in sklearn¶

`python
Regression in sklearn¶
`

Regression in sklearn¶

`python

`

sklearn¶

`python
sklearn¶
`

sklearn¶

`python
sklearn¶
`

sklearn¶

`python

`

sklearn (scikit-learn) implements many common steps in the feature and model creation pipeline.
It is widely used throughout industry and academia.

`python
sklearn (scikit-learn) implements many common steps in the feature and model creation pipeline.
It is widely used throughout industry and academia.
`

sklearn (scikit-learn) implements many common steps in the feature and model creation pipeline.
It is widely used throughout industry and academia.

`python
sklearn (scikit-learn) implements many common steps in the feature and model creation pipeline.
It is widely used throughout industry and academia.
`

sklearn (scikit-learn) implements many common steps in the feature and model creation pipeline.
It is widely used throughout industry and academia.

`python

`

It interfaces with numpy arrays, and to an extent, pandas DataFrames.

`python
It interfaces with numpy arrays, and to an extent, pandas DataFrames.
`

It interfaces with numpy arrays, and to an extent, pandas DataFrames.

`python
It interfaces with numpy arrays, and to an extent, pandas DataFrames.
`

It interfaces with numpy arrays, and to an extent, pandas DataFrames.

`python

`

Huge benefit: the documentation online is excellent.

`python
Huge benefit: the documentation online is excellent.
`

Huge benefit: the documentation online is excellent.

`python
Huge benefit: the documentation online is excellent.
`

Huge benefit: the documentation online is excellent.

`python

`

The LinearRegression class¶

`python
The LinearRegression class¶
`

The LinearRegression class¶

`python
The LinearRegression class¶
`

The LinearRegression class¶

`python

`

sklearn comes with several subpackages, including linear_model and tree, each of which contains several classes of models.

`python
sklearn comes with several subpackages, including linear_model and tree, each of which contains several classes of models.
`

sklearn comes with several subpackages, including linear_model and tree, each of which contains several classes of models.

`python
sklearn comes with several subpackages, including linear_model and tree, each of which contains several classes of models.
`

sklearn comes with several subpackages, including linear_model and tree, each of which contains several classes of models.

`python

`

We'll start with the LinearRegression class from linear_model.

`python
We'll start with the LinearRegression class from linear_model.
`

We'll start with the LinearRegression class from linear_model.

`python
We'll start with the LinearRegression class from linear_model.
`

We'll start with the LinearRegression class from linear_model.

`python

`

`python
In [14]:


from sklearn.linear_model import LinearRegression
`

`python
In [14]:
`

Important: From the documentation, we have:


LinearRegression fits a linear model with coefficients w = (w1, …, wp) to minimize the residual sum of squares between the observed targets in the dataset, and the targets predicted by the linear approximation.

In other words, **`LinearRegression` minimizes mean squared error by default**! (Per the documentation, it also includes an intercept term by default.)

`python
Important: From the documentation, we have:


LinearRegression fits a linear model with coefficients w = (w1, …, wp) to minimize the residual sum of squares between the observed targets in the dataset, and the targets predicted by the linear approximation.

In other words, **`LinearRegression` minimizes mean squared error by default**! (Per the documentation, it also includes an intercept term by default.)
`

Important: From the documentation, we have:


LinearRegression fits a linear model with coefficients w = (w1, …, wp) to minimize the residual sum of squares between the observed targets in the dataset, and the targets predicted by the linear approximation.

In other words, **`LinearRegression` minimizes mean squared error by default**! (Per the documentation, it also includes an intercept term by default.)

`python
Important: From the documentation, we have:


LinearRegression fits a linear model with coefficients w = (w1, …, wp) to minimize the residual sum of squares between the observed targets in the dataset, and the targets predicted by the linear approximation.

In other words, **`LinearRegression` minimizes mean squared error by default**! (Per the documentation, it also includes an intercept term by default.)
`

Important: From the documentation, we have:


LinearRegression fits a linear model with coefficients w = (w1, …, wp) to minimize the residual sum of squares between the observed targets in the dataset, and the targets predicted by the linear approximation.

In other words, **`LinearRegression` minimizes mean squared error by default**! (Per the documentation, it also includes an intercept term by default.)

`python

`

`python
In [15]:


LinearRegression?
`

`python
In [15]:
`

Fitting a simple linear model¶

`python
Fitting a simple linear model¶
`

Fitting a simple linear model¶

`python
Fitting a simple linear model¶
`

Fitting a simple linear model¶

`python

`

First, we must instantiate a LinearRegression object and fit it. By calling fit, we are saying "minimize mean squared error on this dataset and find $w^*$."

`python
First, we must instantiate a LinearRegression object and fit it. By calling fit, we are saying "minimize mean squared error on this dataset and find $w^*$."
`

First, we must instantiate a LinearRegression object and fit it. By calling fit, we are saying "minimize mean squared error on this dataset and find $w^*$."

`python
First, we must instantiate a LinearRegression object and fit it. By calling fit, we are saying "minimize mean squared error on this dataset and find $w^*$."
`

First, we must instantiate a LinearRegression object and fit it. By calling fit, we are saying "minimize mean squared error on this dataset and find $w^*$."

`python

`

`python
In [16]:


model = LinearRegression()
model
`

Output:
Out[16]:

LinearRegression()In a Jupyter environment, please rerun this cell to show the HTML representation or trust the notebook. On GitHub, the HTML representation is unable to render, please try loading this page with nbviewer.org.  LinearRegression?Documentation for LinearRegressioniNot fittedLinearRegression()

`python
In [16]:


model = LinearRegression()
model
`

`python
In [16]:
`

Output:
Out[16]:

LinearRegression()In a Jupyter environment, please rerun this cell to show the HTML representation or trust the notebook. On GitHub, the HTML representation is unable to render, please try loading this page with nbviewer.org.  LinearRegression?Documentation for LinearRegressioniNot fittedLinearRegression()

Output:
Out[16]:

LinearRegression()In a Jupyter environment, please rerun this cell to show the HTML representation or trust the notebook. On GitHub, the HTML representation is unable to render, please try loading this page with nbviewer.org.  LinearRegression?Documentation for LinearRegressioniNot fittedLinearRegression()

`python
In [17]:


# Note that there are two arguments to fit – X and y!
# (It is not necessary to write X= and y=)
model.fit(X=tips[['total_bill']], y=tips['tip'])
`

Output:
Out[17]:

LinearRegression()In a Jupyter environment, please rerun this cell to show the HTML representation or trust the notebook. On GitHub, the HTML representation is unable to render, please try loading this page with nbviewer.org.  LinearRegression?Documentation for LinearRegressioniFittedLinearRegression()

`python
In [17]:


# Note that there are two arguments to fit – X and y!
# (It is not necessary to write X= and y=)
model.fit(X=tips[['total_bill']], y=tips['tip'])
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

After fitting, we can access $w^*$ – that is, the best slope and intercept.

`python
After fitting, we can access $w^*$ – that is, the best slope and intercept.
`

After fitting, we can access $w^*$ – that is, the best slope and intercept.

`python
After fitting, we can access $w^*$ – that is, the best slope and intercept.
`

After fitting, we can access $w^*$ – that is, the best slope and intercept.

`python

`

`python
In [18]:


model.intercept_, model.coef_[0]
`

Output:
Out[18]:

(0.9202696135546735, 0.10502451738435335)

`python
In [18]:


model.intercept_, model.coef_[0]
`

`python
In [18]:
`

Output:
Out[18]:

(0.9202696135546735, 0.10502451738435335)

Output:
Out[18]:

(0.9202696135546735, 0.10502451738435335)

These coefficients tell us that the "best way" (according to squared loss) to make tip predictions using a linear model is using:
$$\text{predicted tip} = 0.92 + 0.105 \cdot \text{total bill}$$

`python
These coefficients tell us that the "best way" (according to squared loss) to make tip predictions using a linear model is using:
$$\text{predicted tip} = 0.92 + 0.105 \cdot \text{total bill}$$
`

These coefficients tell us that the "best way" (according to squared loss) to make tip predictions using a linear model is using:
$$\text{predicted tip} = 0.92 + 0.105 \cdot \text{total bill}$$

`python
These coefficients tell us that the "best way" (according to squared loss) to make tip predictions using a linear model is using:
$$\text{predicted tip} = 0.92 + 0.105 \cdot \text{total bill}$$
`

These coefficients tell us that the "best way" (according to squared loss) to make tip predictions using a linear model is using:
$$\text{predicted tip} = 0.92 + 0.105 \cdot \text{total bill}$$

`python

`

This model predicts that people tip by:

Tipping a constant 92 cents.
Tipping 10.5% for every dollar spent.

`python
This model predicts that people tip by:

Tipping a constant 92 cents.
Tipping 10.5% for every dollar spent.
`

This model predicts that people tip by:

Tipping a constant 92 cents.
Tipping 10.5% for every dollar spent.

`python
This model predicts that people tip by:

Tipping a constant 92 cents.
Tipping 10.5% for every dollar spent.
`

This model predicts that people tip by:

Tipping a constant 92 cents.
Tipping 10.5% for every dollar spent.

`python

`

This is the best "linear" pattern in the dataset – it doesn't mean this is actually how people tip!

`python
This is the best "linear" pattern in the dataset – it doesn't mean this is actually how people tip!
`

This is the best "linear" pattern in the dataset – it doesn't mean this is actually how people tip!

`python
This is the best "linear" pattern in the dataset – it doesn't mean this is actually how people tip!
`

This is the best "linear" pattern in the dataset – it doesn't mean this is actually how people tip!

`python

`

Let's visualize this model, along with our previous model.

`python
Let's visualize this model, along with our previous model.
`

Let's visualize this model, along with our previous model.

`python
Let's visualize this model, along with our previous model.
`

Let's visualize this model, along with our previous model.

`python

`

`python
In [19]:


line_pts = pd.DataFrame({'total_bill': [0, 60]})

fig = px.scatter(tips, x='total_bill', y='tip')
fig.add_trace(go.Scatter(
    x=line_pts['total_bill'],
    y=[mean_tip, mean_tip],
    mode='lines',
    name='Constant Model (Mean Tip)'
))
fig.add_trace(go.Scatter(
    x=line_pts['total_bill'],
    y=model.predict(line_pts),
    mode='lines',
    name='Linear Model: Total Bill Only'
))
fig.update_layout(title='Tip vs. Total Bill',
                  xaxis_title='Total Bill', 
                  yaxis_title='Tip')
`

`python
In [19]:
`

Visually, our linear model seems to be a better fit for our dataset than our constant model.
Can we quantify whether or not it is better?

`python
Visually, our linear model seems to be a better fit for our dataset than our constant model.
Can we quantify whether or not it is better?
`

Visually, our linear model seems to be a better fit for our dataset than our constant model.
Can we quantify whether or not it is better?

`python
Visually, our linear model seems to be a better fit for our dataset than our constant model.
Can we quantify whether or not it is better?
`

Visually, our linear model seems to be a better fit for our dataset than our constant model.
Can we quantify whether or not it is better?

`python

`

Making predictions¶Fit LinearRegression objects also have a predict method, which can be used to predict tips for any total bill, new or old.

`python
Making predictions¶Fit LinearRegression objects also have a predict method, which can be used to predict tips for any total bill, new or old.
`

Making predictions¶Fit LinearRegression objects also have a predict method, which can be used to predict tips for any total bill, new or old.

`python
Making predictions¶Fit LinearRegression objects also have a predict method, which can be used to predict tips for any total bill, new or old.
`

Making predictions¶Fit LinearRegression objects also have a predict method, which can be used to predict tips for any total bill, new or old.

`python

`

`python
In [20]:


model.predict([[15]])
`

Output:
/Users/msgol/ENTER/envs/dsc80/lib/python3.12/site-packages/sklearn/base.py:493: UserWarning:

X does not have valid feature names, but LinearRegression was fitted with feature names





Out[20]:

array([2.5])

`python
In [20]:


model.predict([[15]])
`

`python
In [20]:
`

Output:
/Users/msgol/ENTER/envs/dsc80/lib/python3.12/site-packages/sklearn/base.py:493: UserWarning:

X does not have valid feature names, but LinearRegression was fitted with feature names





Out[20]:

array([2.5])

Output:
/Users/msgol/ENTER/envs/dsc80/lib/python3.12/site-packages/sklearn/base.py:493: UserWarning:

X does not have valid feature names, but LinearRegression was fitted with feature names

`python
In [21]:


# Since we trained on a DataFrame, the input to model.predict should also
# be a DataFrame. To avoid having to do this, we can use .to_numpy()
# when specifying X= and y= in model.fit.
test_points = pd.DataFrame({'total_bill': [15, 4, 100]})
model.predict(test_points)
`

Output:
Out[21]:

array([ 2.5 ,  1.34, 11.42])

`python
In [21]:


# Since we trained on a DataFrame, the input to model.predict should also
# be a DataFrame. To avoid having to do this, we can use .to_numpy()
# when specifying X= and y= in model.fit.
test_points = pd.DataFrame({'total_bill': [15, 4, 100]})
model.predict(test_points)
`

`python
In [21]:
`

Output:
Out[21]:

array([ 2.5 ,  1.34, 11.42])

Output:
Out[21]:

array([ 2.5 ,  1.34, 11.42])

Comparing models¶If we want to compute the RMSE of our model on the training data, we need to find its predictions on every row in the training data, tips.

`python
Comparing models¶If we want to compute the RMSE of our model on the training data, we need to find its predictions on every row in the training data, tips.
`

Comparing models¶If we want to compute the RMSE of our model on the training data, we need to find its predictions on every row in the training data, tips.

`python
Comparing models¶If we want to compute the RMSE of our model on the training data, we need to find its predictions on every row in the training data, tips.
`

Comparing models¶If we want to compute the RMSE of our model on the training data, we need to find its predictions on every row in the training data, tips.

`python

`

`python
In [22]:


all_preds = model.predict(tips[['total_bill']])
`

`python
In [22]:
`

`python
In [23]:


rmse_dict['one feature: total bill'] = rmse(tips['tip'], all_preds)
rmse_dict
`

Output:
Out[23]:

{'constant tip amount': 1.3807999538298954,
 'one feature: total bill': 1.0178504025697377}

`python
In [23]:


rmse_dict['one feature: total bill'] = rmse(tips['tip'], all_preds)
rmse_dict
`

`python
In [23]:
`

Output:
Out[23]:

{'constant tip amount': 1.3807999538298954,
 'one feature: total bill': 1.0178504025697377}

Output:
Out[23]:

{'constant tip amount': 1.3807999538298954,
 'one feature: total bill': 1.0178504025697377}

The RMSE of our simple linear model is lower than that of our constant model, which means it does a better job at predicting tips in our training data than our constant model.

`python
The RMSE of our simple linear model is lower than that of our constant model, which means it does a better job at predicting tips in our training data than our constant model.
`

The RMSE of our simple linear model is lower than that of our constant model, which means it does a better job at predicting tips in our training data than our constant model.

`python
The RMSE of our simple linear model is lower than that of our constant model, which means it does a better job at predicting tips in our training data than our constant model.
`

The RMSE of our simple linear model is lower than that of our constant model, which means it does a better job at predicting tips in our training data than our constant model.

`python

`

Theory tells us it's impossible for the RMSE on the training data to increase as we add more features to the same model. However, the RMSE may increase on unseen data by adding more features; we'll discuss this idea more soon.

`python
Theory tells us it's impossible for the RMSE on the training data to increase as we add more features to the same model. However, the RMSE may increase on unseen data by adding more features; we'll discuss this idea more soon.
`

Theory tells us it's impossible for the RMSE on the training data to increase as we add more features to the same model. However, the RMSE may increase on unseen data by adding more features; we'll discuss this idea more soon.

`python
Theory tells us it's impossible for the RMSE on the training data to increase as we add more features to the same model. However, the RMSE may increase on unseen data by adding more features; we'll discuss this idea more soon.
`

Theory tells us it's impossible for the RMSE on the training data to increase as we add more features to the same model. However, the RMSE may increase on unseen data by adding more features; we'll discuss this idea more soon.

`python

`

Model #3: Multiple linear regression using total bill and table size¶

`python
Model #3: Multiple linear regression using total bill and table size¶
`

Model #3: Multiple linear regression using total bill and table size¶

`python
Model #3: Multiple linear regression using total bill and table size¶
`

Model #3: Multiple linear regression using total bill and table size¶

`python

`

There are still many features in tips we haven't touched:

`python
There are still many features in tips we haven't touched:
`

There are still many features in tips we haven't touched:

`python
There are still many features in tips we haven't touched:
`

There are still many features in tips we haven't touched:

`python

`

`python
In [24]:


tips.head()
`

Output:
Out[24]:







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
In [24]:


tips.head()
`

`python
In [24]:
`

Output:
Out[24]:







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
Out[24]:







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

Let's try using another feature – table size. Such a model would predict tips using:

$$\text{predicted tip} = w_0 + w_1 \cdot \text{total bill} + w_2 \cdot \text{table size}$$

`python
Let's try using another feature – table size. Such a model would predict tips using:

$$\text{predicted tip} = w_0 + w_1 \cdot \text{total bill} + w_2 \cdot \text{table size}$$
`

Let's try using another feature – table size. Such a model would predict tips using:

$$\text{predicted tip} = w_0 + w_1 \cdot \text{total bill} + w_2 \cdot \text{table size}$$

`python
Let's try using another feature – table size. Such a model would predict tips using:

$$\text{predicted tip} = w_0 + w_1 \cdot \text{total bill} + w_2 \cdot \text{table size}$$
`

Let's try using another feature – table size. Such a model would predict tips using:

$$\text{predicted tip} = w_0 + w_1 \cdot \text{total bill} + w_2 \cdot \text{table size}$$

`python

`

Multiple linear regression¶To find the optimal parameters $w^*$, we will again use sklearn's LinearRegression class. The code is not all that different!

`python
Multiple linear regression¶To find the optimal parameters $w^*$, we will again use sklearn's LinearRegression class. The code is not all that different!
`

Multiple linear regression¶To find the optimal parameters $w^*$, we will again use sklearn's LinearRegression class. The code is not all that different!

`python
Multiple linear regression¶To find the optimal parameters $w^*$, we will again use sklearn's LinearRegression class. The code is not all that different!
`

Multiple linear regression¶To find the optimal parameters $w^*$, we will again use sklearn's LinearRegression class. The code is not all that different!

`python

`

`python
In [25]:


model_two = LinearRegression()
model_two.fit(X=tips[['total_bill', 'size']], y=tips['tip'])
`

Output:
Out[25]:

LinearRegression()In a Jupyter environment, please rerun this cell to show the HTML representation or trust the notebook. On GitHub, the HTML representation is unable to render, please try loading this page with nbviewer.org.  LinearRegression?Documentation for LinearRegressioniFittedLinearRegression()

`python
In [25]:


model_two = LinearRegression()
model_two.fit(X=tips[['total_bill', 'size']], y=tips['tip'])
`

`python
In [25]:
`

Output:
Out[25]:

LinearRegression()In a Jupyter environment, please rerun this cell to show the HTML representation or trust the notebook. On GitHub, the HTML representation is unable to render, please try loading this page with nbviewer.org.  LinearRegression?Documentation for LinearRegressioniFittedLinearRegression()

Output:
Out[25]:

LinearRegression()In a Jupyter environment, please rerun this cell to show the HTML representation or trust the notebook. On GitHub, the HTML representation is unable to render, please try loading this page with nbviewer.org.  LinearRegression?Documentation for LinearRegressioniFittedLinearRegression()

`python
In [26]:


model_two.intercept_, model_two.coef_
`

Output:
Out[26]:

(0.6689447408125031, array([0.09, 0.19]))

`python
In [26]:


model_two.intercept_, model_two.coef_
`

`python
In [26]:
`

Output:
Out[26]:

(0.6689447408125031, array([0.09, 0.19]))

Output:
Out[26]:

(0.6689447408125031, array([0.09, 0.19]))

`python
In [27]:


test_pts = pd.DataFrame({'total_bill': [25], 'size': [4]})
model_two.predict(test_pts)
`

Output:
Out[27]:

array([3.76])

`python
In [27]:


test_pts = pd.DataFrame({'total_bill': [25], 'size': [4]})
model_two.predict(test_pts)
`

`python
In [27]:
`

Output:
Out[27]:

array([3.76])

Output:
Out[27]:

array([3.76])

What does this model look like?

`python
What does this model look like?
`

What does this model look like?

`python
What does this model look like?
`

What does this model look like?

`python

`

Plane of best fit ✈️¶Here, we must draw a 3D scatter plot and plane, with one axis for total bill, one axis for table size, and one axis for tip. The code below does this.

`python
Plane of best fit ✈️¶Here, we must draw a 3D scatter plot and plane, with one axis for total bill, one axis for table size, and one axis for tip. The code below does this.
`

Plane of best fit ✈️¶Here, we must draw a 3D scatter plot and plane, with one axis for total bill, one axis for table size, and one axis for tip. The code below does this.

`python
Plane of best fit ✈️¶Here, we must draw a 3D scatter plot and plane, with one axis for total bill, one axis for table size, and one axis for tip. The code below does this.
`

Plane of best fit ✈️¶Here, we must draw a 3D scatter plot and plane, with one axis for total bill, one axis for table size, and one axis for tip. The code below does this.

`python

`

`python
In [28]:


XX, YY = np.mgrid[0:50:2, 0:8:1]
Z = model_two.intercept_ + model_two.coef_[0] * XX + model_two.coef_[1] * YY
plane = go.Surface(x=XX, y=YY, z=Z, colorscale='Oranges')

fig = go.Figure(data=[plane])
fig.add_trace(go.Scatter3d(x=tips['total_bill'], 
                           y=tips['size'], 
                           z=tips['tip'], mode='markers',
                           marker={'color': '#656DF1', 'size': 5}))

fig.update_layout(scene=dict(xaxis_title='Total Bill',
                             yaxis_title='Table Size',
                             zaxis_title='Tip'),
                  title='Tip vs. Total Bill and Table Size',
                  width=500, height=500)
`

`python
In [28]:
`

Comparing models, again¶How does our two-feature linear model stack up to our single feature linear model and our constant model?

`python
Comparing models, again¶How does our two-feature linear model stack up to our single feature linear model and our constant model?
`

Comparing models, again¶How does our two-feature linear model stack up to our single feature linear model and our constant model?

`python
Comparing models, again¶How does our two-feature linear model stack up to our single feature linear model and our constant model?
`

Comparing models, again¶How does our two-feature linear model stack up to our single feature linear model and our constant model?

`python

`

`python
In [29]:


rmse_dict['two features'] = rmse(
    tips['tip'], model_two.predict(tips[['total_bill', 'size']])
)
`

`python
In [29]:
`

`python
In [30]:


pd.DataFrame({'rmse': rmse_dict.values()}, index=rmse_dict.keys())
`

Output:
Out[30]:







rmse




constant tip amount
1.38


one feature: total bill
1.02


two features
1.01

`python
In [30]:


pd.DataFrame({'rmse': rmse_dict.values()}, index=rmse_dict.keys())
`

`python
In [30]:
`

Output:
Out[30]:







rmse




constant tip amount
1.38


one feature: total bill
1.02


two features
1.01

Output:
Out[30]:







rmse




constant tip amount
1.38


one feature: total bill
1.02


two features
1.01

The RMSE of our two-feature model is the lowest of the three models we've looked at so far, but not by much. We didn't gain much by adding table size to our linear model.

`python
The RMSE of our two-feature model is the lowest of the three models we've looked at so far, but not by much. We didn't gain much by adding table size to our linear model.
`

The RMSE of our two-feature model is the lowest of the three models we've looked at so far, but not by much. We didn't gain much by adding table size to our linear model.

`python
The RMSE of our two-feature model is the lowest of the three models we've looked at so far, but not by much. We didn't gain much by adding table size to our linear model.
`

The RMSE of our two-feature model is the lowest of the three models we've looked at so far, but not by much. We didn't gain much by adding table size to our linear model.

`python

`

It's also not clear whether table sizes are practically useful in predicting tips.
We already have the total amount the table spent; why do we need to know how many people were there?

`python
It's also not clear whether table sizes are practically useful in predicting tips.
We already have the total amount the table spent; why do we need to know how many people were there?
`

It's also not clear whether table sizes are practically useful in predicting tips.
We already have the total amount the table spent; why do we need to know how many people were there?

`python
It's also not clear whether table sizes are practically useful in predicting tips.
We already have the total amount the table spent; why do we need to know how many people were there?
`

It's also not clear whether table sizes are practically useful in predicting tips.
We already have the total amount the table spent; why do we need to know how many people were there?

`python

`

Residual plots¶

`python
Residual plots¶
`

Residual plots¶

`python
Residual plots¶
`

Residual plots¶

`python

`

From DSC 10: one important technique for diagnosing model fit is the residual plot.

`python
From DSC 10: one important technique for diagnosing model fit is the residual plot.
`

From DSC 10: one important technique for diagnosing model fit is the residual plot.

`python
From DSC 10: one important technique for diagnosing model fit is the residual plot.
`

From DSC 10: one important technique for diagnosing model fit is the residual plot.

`python

`

The $i$th residual is $ y_i - H(x_i) $.

`python
The $i$th residual is $ y_i - H(x_i) $.
`

The $i$th residual is $ y_i - H(x_i) $.

`python
The $i$th residual is $ y_i - H(x_i) $.
`

The $i$th residual is $ y_i - H(x_i) $.

`python

`

A residual plot has
predicted values $H(x)$ on the $x$-axis, and
residuals $ y - H(x) $ on the $y$-axis.

`python
A residual plot has
predicted values $H(x)$ on the $x$-axis, and
residuals $ y - H(x) $ on the $y$-axis.
`

A residual plot has
predicted values $H(x)$ on the $x$-axis, and
residuals $ y - H(x) $ on the $y$-axis.

`python
A residual plot has
predicted values $H(x)$ on the $x$-axis, and
residuals $ y - H(x) $ on the $y$-axis.
`

A residual plot has
predicted values $H(x)$ on the $x$-axis, and
residuals $ y - H(x) $ on the $y$-axis.

`python

`

`python
In [31]:


# Let's start with the single-variable model:
with_resid = tips.assign(**{
    'Predicted Tip': model.predict(tips[['total_bill']]),
    'Residual': tips['tip'] - model.predict(tips[['total_bill']]),
})
fig = px.scatter(with_resid, x='Predicted Tip', y='Residual')
fig.add_hline(0, line_width=2, opacity=1).update_layout(title='Residual Plot (Simple Linear Model)')
`

`python
In [31]:
`

If all assumptions about linear regression hold, then residual plot should look randomly scattered around the horizontal line $y = 0$.

`python
If all assumptions about linear regression hold, then residual plot should look randomly scattered around the horizontal line $y = 0$.
`

If all assumptions about linear regression hold, then residual plot should look randomly scattered around the horizontal line $y = 0$.

`python
If all assumptions about linear regression hold, then residual plot should look randomly scattered around the horizontal line $y = 0$.
`

If all assumptions about linear regression hold, then residual plot should look randomly scattered around the horizontal line $y = 0$.

`python

`

Here, we see that the model makes bigger mistakes for larger predicted values. But overall, there's no apparent trend, so a linear model seems appropriate.

`python
Here, we see that the model makes bigger mistakes for larger predicted values. But overall, there's no apparent trend, so a linear model seems appropriate.
`

Here, we see that the model makes bigger mistakes for larger predicted values. But overall, there's no apparent trend, so a linear model seems appropriate.

`python
Here, we see that the model makes bigger mistakes for larger predicted values. But overall, there's no apparent trend, so a linear model seems appropriate.
`

Here, we see that the model makes bigger mistakes for larger predicted values. But overall, there's no apparent trend, so a linear model seems appropriate.

`python

`

`python
In [32]:


# What about the two-variable model?
with_resid = tips.assign(**{
    'Predicted Tip': model_two.predict(tips[['total_bill', 'size']]),
    'Residual': tips['tip'] - model_two.predict(tips[['total_bill', 'size']]),
})
fig = px.scatter(with_resid, x='Predicted Tip', y='Residual')
fig.add_hline(0, line_width=2, opacity=1).update_layout(title='Residual Plot (Multiple Regression)')
`

`python
In [32]:
`

Looks about the same as the previous plot!

`python
Looks about the same as the previous plot!
`

Looks about the same as the previous plot!

`python
Looks about the same as the previous plot!
`

Looks about the same as the previous plot!

`python

`

The .score method of a LinearRegression object¶Model objects in sklearn that have already been fit have a score method.

`python
The .score method of a LinearRegression object¶Model objects in sklearn that have already been fit have a score method.
`

The .score method of a LinearRegression object¶Model objects in sklearn that have already been fit have a score method.

`python
The .score method of a LinearRegression object¶Model objects in sklearn that have already been fit have a score method.
`

The .score method of a LinearRegression object¶Model objects in sklearn that have already been fit have a score method.

`python

`

`python
In [33]:


model_two.score(tips[['total_bill', 'size']], tips['tip'])
`

Output:
Out[33]:

0.46786930879612587

`python
In [33]:


model_two.score(tips[['total_bill', 'size']], tips['tip'])
`

`python
In [33]:
`

Output:
Out[33]:

0.46786930879612587

Output:
Out[33]:

0.46786930879612587

That doesn't look like the RMSE... what is it? 🤔

`python
That doesn't look like the RMSE... what is it? 🤔
`

That doesn't look like the RMSE... what is it? 🤔

`python
That doesn't look like the RMSE... what is it? 🤔
`

That doesn't look like the RMSE... what is it? 🤔

`python

`

Aside: $R^2$¶

`python
Aside: $R^2$¶
`

Aside: $R^2$¶

`python
Aside: $R^2$¶
`

Aside: $R^2$¶

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

Calculating $R^2$¶Let's calculate the $R^2$ for model_two's predictions in three different ways.

`python
Calculating $R^2$¶Let's calculate the $R^2$ for model_two's predictions in three different ways.
`

Calculating $R^2$¶Let's calculate the $R^2$ for model_two's predictions in three different ways.

`python
Calculating $R^2$¶Let's calculate the $R^2$ for model_two's predictions in three different ways.
`

Calculating $R^2$¶Let's calculate the $R^2$ for model_two's predictions in three different ways.

`python

`

`python
In [34]:


pred = tips.assign(predicted=model_two.predict(tips[['total_bill', 'size']]))
pred
`

Output:
Out[34]:







total_bill
tip
sex
smoker
day
time
size
predicted




0
16.99
1.01
Female
No
Sun
Dinner
2
2.63


1
10.34
1.66
Male
No
Sun
Dinner
3
2.21


2
21.01
3.50
Male
No
Sun
Dinner
3
3.19


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
22.67
2.00
Male
Yes
Sat
Dinner
2
3.16


242
17.82
1.75
Male
No
Sat
Dinner
2
2.71


243
18.78
3.00
Female
No
Thur
Dinner
2
2.80



244 rows × 8 columns

`python
In [34]:


pred = tips.assign(predicted=model_two.predict(tips[['total_bill', 'size']]))
pred
`

`python
In [34]:
`

Output:
Out[34]:







total_bill
tip
sex
smoker
day
time
size
predicted




0
16.99
1.01
Female
No
Sun
Dinner
2
2.63


1
10.34
1.66
Male
No
Sun
Dinner
3
2.21


2
21.01
3.50
Male
No
Sun
Dinner
3
3.19


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
22.67
2.00
Male
Yes
Sat
Dinner
2
3.16


242
17.82
1.75
Male
No
Sat
Dinner
2
2.71


243
18.78
3.00
Female
No
Thur
Dinner
2
2.80



244 rows × 8 columns

Output:
Out[34]:







total_bill
tip
sex
smoker
day
time
size
predicted




0
16.99
1.01
Female
No
Sun
Dinner
2
2.63


1
10.34
1.66
Male
No
Sun
Dinner
3
2.21


2
21.01
3.50
Male
No
Sun
Dinner
3
3.19


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
22.67
2.00
Male
Yes
Sat
Dinner
2
3.16


242
17.82
1.75
Male
No
Sat
Dinner
2
2.71


243
18.78
3.00
Female
No
Thur
Dinner
2
2.80



244 rows × 8 columns

Method 1: $R^2 = \frac{\text{var}(\text{predicted $y$ values})}{\text{var}(\text{actual $y$ values})}$

`python
Method 1: $R^2 = \frac{\text{var}(\text{predicted $y$ values})}{\text{var}(\text{actual $y$ values})}$
`

Method 1: $R^2 = \frac{\text{var}(\text{predicted $y$ values})}{\text{var}(\text{actual $y$ values})}$

`python
Method 1: $R^2 = \frac{\text{var}(\text{predicted $y$ values})}{\text{var}(\text{actual $y$ values})}$
`

Method 1: $R^2 = \frac{\text{var}(\text{predicted $y$ values})}{\text{var}(\text{actual $y$ values})}$

`python

`

`python
In [35]:


np.var(pred['predicted']) / np.var(pred['tip'])
`

Output:
Out[35]:

0.46786930879612515

`python
In [35]:


np.var(pred['predicted']) / np.var(pred['tip'])
`

`python
In [35]:
`

Output:
Out[35]:

0.46786930879612515

Output:
Out[35]:

0.46786930879612515

Method 2: $R^2 = \left[ \text{correlation}(\text{predicted $y$ values}, \text{actual $y$ values}) \right]^2$
Note: By correlation here, we are referring to $r$, the same correlation coefficient you saw in DSC 10.

`python
Method 2: $R^2 = \left[ \text{correlation}(\text{predicted $y$ values}, \text{actual $y$ values}) \right]^2$
Note: By correlation here, we are referring to $r$, the same correlation coefficient you saw in DSC 10.
`

Method 2: $R^2 = \left[ \text{correlation}(\text{predicted $y$ values}, \text{actual $y$ values}) \right]^2$
Note: By correlation here, we are referring to $r$, the same correlation coefficient you saw in DSC 10.

`python
Method 2: $R^2 = \left[ \text{correlation}(\text{predicted $y$ values}, \text{actual $y$ values}) \right]^2$
Note: By correlation here, we are referring to $r$, the same correlation coefficient you saw in DSC 10.
`

Method 2: $R^2 = \left[ \text{correlation}(\text{predicted $y$ values}, \text{actual $y$ values}) \right]^2$
Note: By correlation here, we are referring to $r$, the same correlation coefficient you saw in DSC 10.

`python

`

`python
In [36]:


pred[['predicted', 'tip']].corr().loc['predicted', 'tip'] ** 2
`

Output:
Out[36]:

0.4678693087961257

`python
In [36]:


pred[['predicted', 'tip']].corr().loc['predicted', 'tip'] ** 2
`

`python
In [36]:
`

Output:
Out[36]:

0.4678693087961257

Output:
Out[36]:

0.4678693087961257

Method 3: LinearRegression.score

`python
Method 3: LinearRegression.score
`

Method 3: LinearRegression.score

`python
Method 3: LinearRegression.score
`

Method 3: LinearRegression.score

`python

`

`python
In [37]:


model_two.score(tips[['total_bill', 'size']], tips['tip'])
`

Output:
Out[37]:

0.46786930879612587

`python
In [37]:


model_two.score(tips[['total_bill', 'size']], tips['tip'])
`

`python
In [37]:
`

Output:
Out[37]:

0.46786930879612587

Output:
Out[37]:

0.46786930879612587

All three methods provide the same result!

`python
All three methods provide the same result!
`

All three methods provide the same result!

`python
All three methods provide the same result!
`

All three methods provide the same result!

`python

`

Relationship between $R^2$ and RMSE¶For linear models with an intercept term,
$$R^2 = 1 - \frac{\text{RMSE}^2}{\text{var}(\text{actual $y$ values})}$$

`python
Relationship between $R^2$ and RMSE¶For linear models with an intercept term,
$$R^2 = 1 - \frac{\text{RMSE}^2}{\text{var}(\text{actual $y$ values})}$$
`

Relationship between $R^2$ and RMSE¶For linear models with an intercept term,
$$R^2 = 1 - \frac{\text{RMSE}^2}{\text{var}(\text{actual $y$ values})}$$

`python
Relationship between $R^2$ and RMSE¶For linear models with an intercept term,
$$R^2 = 1 - \frac{\text{RMSE}^2}{\text{var}(\text{actual $y$ values})}$$
`

Relationship between $R^2$ and RMSE¶For linear models with an intercept term,
$$R^2 = 1 - \frac{\text{RMSE}^2}{\text{var}(\text{actual $y$ values})}$$

`python

`

`python
In [38]:


1 - rmse(pred['tip'], pred['predicted']) ** 2 / np.var(pred['tip'])
`

Output:
Out[38]:

0.46786930879612565

`python
In [38]:


1 - rmse(pred['tip'], pred['predicted']) ** 2 / np.var(pred['tip'])
`

`python
In [38]:
`

Output:
Out[38]:

0.46786930879612565

Output:
Out[38]:

0.46786930879612565

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
We built three models:
A constant model: $\text{predicted tip} = h^*$.
A simple linear regression model: $\text{predicted tip} = w_0^* + w_1^* \cdot \text{total bill}$.
A multiple linear regression model: $\text{predicted tip} = w_0^* + w_1^* \cdot \text{total bill} + w_2^* \cdot \text{table size}$.


As we added more features, our RMSEs decreased.
This was guaranteed to happen, since we were only looking at our training data.


It is not clear that the final linear model is actually "better"; it doesn't seem to reflect reality better than the previous models.

`python
Summary¶
We built three models:
A constant model: $\text{predicted tip} = h^*$.
A simple linear regression model: $\text{predicted tip} = w_0^* + w_1^* \cdot \text{total bill}$.
A multiple linear regression model: $\text{predicted tip} = w_0^* + w_1^* \cdot \text{total bill} + w_2^* \cdot \text{table size}$.


As we added more features, our RMSEs decreased.
This was guaranteed to happen, since we were only looking at our training data.


It is not clear that the final linear model is actually "better"; it doesn't seem to reflect reality better than the previous models.
`

Summary¶
We built three models:
A constant model: $\text{predicted tip} = h^*$.
A simple linear regression model: $\text{predicted tip} = w_0^* + w_1^* \cdot \text{total bill}$.
A multiple linear regression model: $\text{predicted tip} = w_0^* + w_1^* \cdot \text{total bill} + w_2^* \cdot \text{table size}$.


As we added more features, our RMSEs decreased.
This was guaranteed to happen, since we were only looking at our training data.


It is not clear that the final linear model is actually "better"; it doesn't seem to reflect reality better than the previous models.

`python
Summary¶
We built three models:
A constant model: $\text{predicted tip} = h^*$.
A simple linear regression model: $\text{predicted tip} = w_0^* + w_1^* \cdot \text{total bill}$.
A multiple linear regression model: $\text{predicted tip} = w_0^* + w_1^* \cdot \text{total bill} + w_2^* \cdot \text{table size}$.


As we added more features, our RMSEs decreased.
This was guaranteed to happen, since we were only looking at our training data.


It is not clear that the final linear model is actually "better"; it doesn't seem to reflect reality better than the previous models.
`

Summary¶
We built three models:
A constant model: $\text{predicted tip} = h^*$.
A simple linear regression model: $\text{predicted tip} = w_0^* + w_1^* \cdot \text{total bill}$.
A multiple linear regression model: $\text{predicted tip} = w_0^* + w_1^* \cdot \text{total bill} + w_2^* \cdot \text{table size}$.


As we added more features, our RMSEs decreased.
This was guaranteed to happen, since we were only looking at our training data.


It is not clear that the final linear model is actually "better"; it doesn't seem to reflect reality better than the previous models.

`python

`

LinearRegression summary¶


Property
Example
Description




Initialize model parameters
lr = LinearRegression()
Create (empty) linear regression model


Fit the model to the data
lr.fit(X, y)
Determines regression coefficients


Use model for prediction
lr.predict(X_new)
Uses regression line to make predictions


Evaluate the model
lr.score(X, y)
Calculates the $R^2$ of the LR model


Access model attributes
lr.coef_, lr.intercept_
Accesses the regression coefficients and intercept

`python
LinearRegression summary¶


Property
Example
Description




Initialize model parameters
lr = LinearRegression()
Create (empty) linear regression model


Fit the model to the data
lr.fit(X, y)
Determines regression coefficients


Use model for prediction
lr.predict(X_new)
Uses regression line to make predictions


Evaluate the model
lr.score(X, y)
Calculates the $R^2$ of the LR model


Access model attributes
lr.coef_, lr.intercept_
Accesses the regression coefficients and intercept
`

LinearRegression summary¶


Property
Example
Description




Initialize model parameters
lr = LinearRegression()
Create (empty) linear regression model


Fit the model to the data
lr.fit(X, y)
Determines regression coefficients


Use model for prediction
lr.predict(X_new)
Uses regression line to make predictions


Evaluate the model
lr.score(X, y)
Calculates the $R^2$ of the LR model


Access model attributes
lr.coef_, lr.intercept_
Accesses the regression coefficients and intercept

`python
LinearRegression summary¶


Property
Example
Description




Initialize model parameters
lr = LinearRegression()
Create (empty) linear regression model


Fit the model to the data
lr.fit(X, y)
Determines regression coefficients


Use model for prediction
lr.predict(X_new)
Uses regression line to make predictions


Evaluate the model
lr.score(X, y)
Calculates the $R^2$ of the LR model


Access model attributes
lr.coef_, lr.intercept_
Accesses the regression coefficients and intercept
`

LinearRegression summary¶


Property
Example
Description




Initialize model parameters
lr = LinearRegression()
Create (empty) linear regression model


Fit the model to the data
lr.fit(X, y)
Determines regression coefficients


Use model for prediction
lr.predict(X_new)
Uses regression line to make predictions


Evaluate the model
lr.score(X, y)
Calculates the $R^2$ of the LR model


Access model attributes
lr.coef_, lr.intercept_
Accesses the regression coefficients and intercept

`python

`

Next time¶

`python
Next time¶
`

Next time¶

`python
Next time¶
`

Next time¶

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
Out[39]:







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