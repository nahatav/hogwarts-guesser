`python
In [1]:


from dsc80_utils import *
`

`python
In [1]:
`

Lecture 13 – Text Features¶DSC 80, Summer 2026¶

`python
Lecture 13 – Text Features¶DSC 80, Summer 2026¶
`

Lecture 13 – Text Features¶DSC 80, Summer 2026¶

`python
Lecture 13 – Text Features¶DSC 80, Summer 2026¶
`

Lecture 13 – Text Features¶DSC 80, Summer 2026¶

`python

`

Agenda 📆¶
Text features.
Bag of words.
Cosine similarity.
TF-IDF.
Example: Presidential inaugural addresses 🎤.

`python
Agenda 📆¶
Text features.
Bag of words.
Cosine similarity.
TF-IDF.
Example: Presidential inaugural addresses 🎤.
`

Agenda 📆¶
Text features.
Bag of words.
Cosine similarity.
TF-IDF.
Example: Presidential inaugural addresses 🎤.

`python
Agenda 📆¶
Text features.
Bag of words.
Cosine similarity.
TF-IDF.
Example: Presidential inaugural addresses 🎤.
`

Agenda 📆¶
Text features.
Bag of words.
Cosine similarity.
TF-IDF.
Example: Presidential inaugural addresses 🎤.

`python

`

Text features¶

`python
Text features¶
`

Text features¶

`python
Text features¶
`

Text features¶

`python

`



`python

`



`python

`



`python

`

Review: Regression and features¶

`python
Review: Regression and features¶
`

Review: Regression and features¶

`python
Review: Regression and features¶
`

Review: Regression and features¶

`python

`

In DSC 40A, our running example was to use regression to predict a data scientist's salary, given their GPA, years of experience, and years of education.

`python
In DSC 40A, our running example was to use regression to predict a data scientist's salary, given their GPA, years of experience, and years of education.
`

In DSC 40A, our running example was to use regression to predict a data scientist's salary, given their GPA, years of experience, and years of education.

`python
In DSC 40A, our running example was to use regression to predict a data scientist's salary, given their GPA, years of experience, and years of education.
`

In DSC 40A, our running example was to use regression to predict a data scientist's salary, given their GPA, years of experience, and years of education.

`python

`

After minimizing empirical risk to determine optimal parameters, $w_0^*, \dots, w_3^*$, we made predictions using:

$$\text{predicted salary} = w_0^* + w_1^* \cdot \text{GPA} + w_2^* \cdot \text{experience} + w_3^* \cdot \text{education}$$

`python
After minimizing empirical risk to determine optimal parameters, $w_0^*, \dots, w_3^*$, we made predictions using:

$$\text{predicted salary} = w_0^* + w_1^* \cdot \text{GPA} + w_2^* \cdot \text{experience} + w_3^* \cdot \text{education}$$
`

After minimizing empirical risk to determine optimal parameters, $w_0^*, \dots, w_3^*$, we made predictions using:

$$\text{predicted salary} = w_0^* + w_1^* \cdot \text{GPA} + w_2^* \cdot \text{experience} + w_3^* \cdot \text{education}$$

`python
After minimizing empirical risk to determine optimal parameters, $w_0^*, \dots, w_3^*$, we made predictions using:

$$\text{predicted salary} = w_0^* + w_1^* \cdot \text{GPA} + w_2^* \cdot \text{experience} + w_3^* \cdot \text{education}$$
`

After minimizing empirical risk to determine optimal parameters, $w_0^*, \dots, w_3^*$, we made predictions using:

$$\text{predicted salary} = w_0^* + w_1^* \cdot \text{GPA} + w_2^* \cdot \text{experience} + w_3^* \cdot \text{education}$$

`python

`

GPA, years of experience, and years of education are features – they represent a data scientist as a vector of numbers.
e.g. Your feature vector may be [3.5, 1, 7].

`python
GPA, years of experience, and years of education are features – they represent a data scientist as a vector of numbers.
e.g. Your feature vector may be [3.5, 1, 7].
`

GPA, years of experience, and years of education are features – they represent a data scientist as a vector of numbers.
e.g. Your feature vector may be [3.5, 1, 7].

`python
GPA, years of experience, and years of education are features – they represent a data scientist as a vector of numbers.
e.g. Your feature vector may be [3.5, 1, 7].
`

GPA, years of experience, and years of education are features – they represent a data scientist as a vector of numbers.
e.g. Your feature vector may be [3.5, 1, 7].

`python

`

This approach requires features to be numeric.

`python
This approach requires features to be numeric.
`

This approach requires features to be numeric.

`python
This approach requires features to be numeric.
`

This approach requires features to be numeric.

`python

`

Moving forward¶Suppose we'd like to predict the sentiment of a piece of text from 1 to 10.

10: Very positive (happy).
1: Very negative (sad, angry).

Example:

Input: "DSC 80 is a pretty good class."

Output: 7.

We can frame this as a regression problem, but we can't directly use what we learned in 40A, because here our inputs are text, not numbers.

`python
Moving forward¶Suppose we'd like to predict the sentiment of a piece of text from 1 to 10.

10: Very positive (happy).
1: Very negative (sad, angry).

Example:

Input: "DSC 80 is a pretty good class."

Output: 7.

We can frame this as a regression problem, but we can't directly use what we learned in 40A, because here our inputs are text, not numbers.
`

Moving forward¶Suppose we'd like to predict the sentiment of a piece of text from 1 to 10.

10: Very positive (happy).
1: Very negative (sad, angry).

Example:

Input: "DSC 80 is a pretty good class."

Output: 7.

We can frame this as a regression problem, but we can't directly use what we learned in 40A, because here our inputs are text, not numbers.

`python
Moving forward¶Suppose we'd like to predict the sentiment of a piece of text from 1 to 10.

10: Very positive (happy).
1: Very negative (sad, angry).

Example:

Input: "DSC 80 is a pretty good class."

Output: 7.

We can frame this as a regression problem, but we can't directly use what we learned in 40A, because here our inputs are text, not numbers.
`

Moving forward¶Suppose we'd like to predict the sentiment of a piece of text from 1 to 10.

10: Very positive (happy).
1: Very negative (sad, angry).

Example:

Input: "DSC 80 is a pretty good class."

Output: 7.

We can frame this as a regression problem, but we can't directly use what we learned in 40A, because here our inputs are text, not numbers.

`python

`

Text features¶

`python
Text features¶
`

Text features¶

`python
Text features¶
`

Text features¶

`python

`

Big question: How do we represent a text document as a feature vector of numbers?

`python
Big question: How do we represent a text document as a feature vector of numbers?
`

Big question: How do we represent a text document as a feature vector of numbers?

`python
Big question: How do we represent a text document as a feature vector of numbers?
`

Big question: How do we represent a text document as a feature vector of numbers?

`python

`

If we can do this, we can:
use a text document as input in a regression or classification model (in a few lectures).
quantify the similarity of two text documents (today).

`python
If we can do this, we can:
use a text document as input in a regression or classification model (in a few lectures).
quantify the similarity of two text documents (today).
`

If we can do this, we can:
use a text document as input in a regression or classification model (in a few lectures).
quantify the similarity of two text documents (today).

`python
If we can do this, we can:
use a text document as input in a regression or classification model (in a few lectures).
quantify the similarity of two text documents (today).
`

If we can do this, we can:
use a text document as input in a regression or classification model (in a few lectures).
quantify the similarity of two text documents (today).

`python

`

Example: San Diego employee salaries¶
Transparent California publishes the salaries of all City of San Diego employees.
Let's look at the 2024 data (most recent available).

`python
Example: San Diego employee salaries¶
Transparent California publishes the salaries of all City of San Diego employees.
Let's look at the 2024 data (most recent available).
`

Example: San Diego employee salaries¶
Transparent California publishes the salaries of all City of San Diego employees.
Let's look at the 2024 data (most recent available).

`python
Example: San Diego employee salaries¶
Transparent California publishes the salaries of all City of San Diego employees.
Let's look at the 2024 data (most recent available).
`

Example: San Diego employee salaries¶
Transparent California publishes the salaries of all City of San Diego employees.
Let's look at the 2024 data (most recent available).

`python

`

`python
In [2]:


salaries = pd.read_csv('https://transcal.s3.amazonaws.com/public/export/san-diego-2024.csv')
salaries['Employee Name'] = salaries['Employee Name'].str.split().str[0] + ' Xxxx'
`

`python
In [2]:
`

`python
In [3]:


salaries.head()
`

Output:
Out[3]:







Employee Name
Job Title
Base Pay
Overtime Pay
...
Year
Notes
Agency
Status




0
Carina Xxxx
Retirement Chief Investment Officer
402834.40
0.0
...
2024
NaN
San Diego
FT


1
Gregg Xxxx
Retirement Administrator
412903.58
0.0
...
2024
NaN
San Diego
FT


2
Eric Xxxx
Chief Operating Officer
400708.40
0.0
...
2024
NaN
San Diego
FT


3
Mara Xxxx
City Attorney
243583.77
0.0
...
2024
NaN
San Diego
FT


4
Todd Xxxx
Mayor
243583.77
0.0
...
2024
NaN
San Diego
FT



5 rows × 13 columns

`python
In [3]:


salaries.head()
`

`python
In [3]:
`

Output:
Out[3]:







Employee Name
Job Title
Base Pay
Overtime Pay
...
Year
Notes
Agency
Status




0
Carina Xxxx
Retirement Chief Investment Officer
402834.40
0.0
...
2024
NaN
San Diego
FT


1
Gregg Xxxx
Retirement Administrator
412903.58
0.0
...
2024
NaN
San Diego
FT


2
Eric Xxxx
Chief Operating Officer
400708.40
0.0
...
2024
NaN
San Diego
FT


3
Mara Xxxx
City Attorney
243583.77
0.0
...
2024
NaN
San Diego
FT


4
Todd Xxxx
Mayor
243583.77
0.0
...
2024
NaN
San Diego
FT



5 rows × 13 columns

Output:
Out[3]:







Employee Name
Job Title
Base Pay
Overtime Pay
...
Year
Notes
Agency
Status




0
Carina Xxxx
Retirement Chief Investment Officer
402834.40
0.0
...
2024
NaN
San Diego
FT


1
Gregg Xxxx
Retirement Administrator
412903.58
0.0
...
2024
NaN
San Diego
FT


2
Eric Xxxx
Chief Operating Officer
400708.40
0.0
...
2024
NaN
San Diego
FT


3
Mara Xxxx
City Attorney
243583.77
0.0
...
2024
NaN
San Diego
FT


4
Todd Xxxx
Mayor
243583.77
0.0
...
2024
NaN
San Diego
FT



5 rows × 13 columns

Aside on privacy and ethics¶

`python
Aside on privacy and ethics¶
`

Aside on privacy and ethics¶

`python
Aside on privacy and ethics¶
`

Aside on privacy and ethics¶

`python

`

Even though the data we downloaded is publicly available, employee names still correspond to real people.

`python
Even though the data we downloaded is publicly available, employee names still correspond to real people.
`

Even though the data we downloaded is publicly available, employee names still correspond to real people.

`python
Even though the data we downloaded is publicly available, employee names still correspond to real people.
`

Even though the data we downloaded is publicly available, employee names still correspond to real people.

`python

`

Be careful when dealing with PII (personably identifiable information).
Only work with the data that is needed for your analysis.
Even when data is public, people have a reasonable right to privacy.

`python
Be careful when dealing with PII (personably identifiable information).
Only work with the data that is needed for your analysis.
Even when data is public, people have a reasonable right to privacy.
`

Be careful when dealing with PII (personably identifiable information).
Only work with the data that is needed for your analysis.
Even when data is public, people have a reasonable right to privacy.

`python
Be careful when dealing with PII (personably identifiable information).
Only work with the data that is needed for your analysis.
Even when data is public, people have a reasonable right to privacy.
`

Be careful when dealing with PII (personably identifiable information).
Only work with the data that is needed for your analysis.
Even when data is public, people have a reasonable right to privacy.

`python

`

Remember to think about the impacts of your work outside of your Jupyter Notebook.

`python
Remember to think about the impacts of your work outside of your Jupyter Notebook.
`

Remember to think about the impacts of your work outside of your Jupyter Notebook.

`python
Remember to think about the impacts of your work outside of your Jupyter Notebook.
`

Remember to think about the impacts of your work outside of your Jupyter Notebook.

`python

`

Goal: Quantifying similarity¶

`python
Goal: Quantifying similarity¶
`

Goal: Quantifying similarity¶

`python
Goal: Quantifying similarity¶
`

Goal: Quantifying similarity¶

`python

`

Our goal is to describe, numerically, how similar two job titles are.

`python
Our goal is to describe, numerically, how similar two job titles are.
`

Our goal is to describe, numerically, how similar two job titles are.

`python
Our goal is to describe, numerically, how similar two job titles are.
`

Our goal is to describe, numerically, how similar two job titles are.

`python

`

For instance, our similarity metric should tell us that 'Deputy Fire Chief' and 'Fire Battalion Chief' are more similar than 'Deputy Fire Chief' and 'City Attorney'.

`python
For instance, our similarity metric should tell us that 'Deputy Fire Chief' and 'Fire Battalion Chief' are more similar than 'Deputy Fire Chief' and 'City Attorney'.
`

For instance, our similarity metric should tell us that 'Deputy Fire Chief' and 'Fire Battalion Chief' are more similar than 'Deputy Fire Chief' and 'City Attorney'.

`python
For instance, our similarity metric should tell us that 'Deputy Fire Chief' and 'Fire Battalion Chief' are more similar than 'Deputy Fire Chief' and 'City Attorney'.
`

For instance, our similarity metric should tell us that 'Deputy Fire Chief' and 'Fire Battalion Chief' are more similar than 'Deputy Fire Chief' and 'City Attorney'.

`python

`

Idea: Two job titles are similar if they contain shared words, regardless of order. So, to measure the similarity between two job titles, we could count the number of words they share in common.

`python
Idea: Two job titles are similar if they contain shared words, regardless of order. So, to measure the similarity between two job titles, we could count the number of words they share in common.
`

Idea: Two job titles are similar if they contain shared words, regardless of order. So, to measure the similarity between two job titles, we could count the number of words they share in common.

`python
Idea: Two job titles are similar if they contain shared words, regardless of order. So, to measure the similarity between two job titles, we could count the number of words they share in common.
`

Idea: Two job titles are similar if they contain shared words, regardless of order. So, to measure the similarity between two job titles, we could count the number of words they share in common.

`python

`

Before we do this, we need to be confident that the job titles are clean and consistent – let's explore.

`python
Before we do this, we need to be confident that the job titles are clean and consistent – let's explore.
`

Before we do this, we need to be confident that the job titles are clean and consistent – let's explore.

`python
Before we do this, we need to be confident that the job titles are clean and consistent – let's explore.
`

Before we do this, we need to be confident that the job titles are clean and consistent – let's explore.

`python

`

Exploring job titles¶

`python
Exploring job titles¶
`

Exploring job titles¶

`python
Exploring job titles¶
`

Exploring job titles¶

`python

`

`python
In [4]:


jobtitles = salaries['Job Title']
jobtitles.head()
`

Output:
Out[4]:

0    Retirement Chief Investment Officer
1               Retirement Administrator
2                Chief Operating Officer
3                          City Attorney
4                                  Mayor
Name: Job Title, dtype: object

`python
In [4]:


jobtitles = salaries['Job Title']
jobtitles.head()
`

`python
In [4]:
`

Output:
Out[4]:

0    Retirement Chief Investment Officer
1               Retirement Administrator
2                Chief Operating Officer
3                          City Attorney
4                                  Mayor
Name: Job Title, dtype: object

Output:
Out[4]:

0    Retirement Chief Investment Officer
1               Retirement Administrator
2                Chief Operating Officer
3                          City Attorney
4                                  Mayor
Name: Job Title, dtype: object

How many employees are in the dataset? How many unique job titles are there?

`python
How many employees are in the dataset? How many unique job titles are there?
`

How many employees are in the dataset? How many unique job titles are there?

`python
How many employees are in the dataset? How many unique job titles are there?
`

How many employees are in the dataset? How many unique job titles are there?

`python

`

`python
In [5]:


jobtitles.shape[0], jobtitles.nunique()
`

Output:
Out[5]:

(14570, 660)

`python
In [5]:


jobtitles.shape[0], jobtitles.nunique()
`

`python
In [5]:
`

Output:
Out[5]:

(14570, 660)

Output:
Out[5]:

(14570, 660)

What are the most common job titles?

`python
What are the most common job titles?
`

What are the most common job titles?

`python
What are the most common job titles?
`

What are the most common job titles?

`python

`

`python
In [6]:


jobtitles.value_counts().iloc[:10]
`

Output:
Out[6]:

Job Title
Police Officer Ii                1065
Management Intern                 384
Student Intern                    362
                                 ... 
Grounds Maintenance Worker Ii     286
Police Detective                  256
Fire Captain                      244
Name: count, Length: 10, dtype: int64

`python
In [6]:


jobtitles.value_counts().iloc[:10]
`

`python
In [6]:
`

Output:
Out[6]:

Job Title
Police Officer Ii                1065
Management Intern                 384
Student Intern                    362
                                 ... 
Grounds Maintenance Worker Ii     286
Police Detective                  256
Fire Captain                      244
Name: count, Length: 10, dtype: int64

Output:
Out[6]:

Job Title
Police Officer Ii                1065
Management Intern                 384
Student Intern                    362
                                 ... 
Grounds Maintenance Worker Ii     286
Police Detective                  256
Fire Captain                      244
Name: count, Length: 10, dtype: int64

Are there any missing job titles?

`python
Are there any missing job titles?
`

Are there any missing job titles?

`python
Are there any missing job titles?
`

Are there any missing job titles?

`python

`

`python
In [7]:


jobtitles.isna().sum()
`

Output:
Out[7]:

0

`python
In [7]:


jobtitles.isna().sum()
`

`python
In [7]:
`

Output:
Out[7]:

0

Output:
Out[7]:

0

Fortunately, no.

`python
Fortunately, no.
`

Fortunately, no.

`python
Fortunately, no.
`

Fortunately, no.

`python

`

Canonicalization¶Remember, our goal is ultimately to count the number of shared words between job titles. But before we start counting the number of shared words, we need to consider the following:

`python
Canonicalization¶Remember, our goal is ultimately to count the number of shared words between job titles. But before we start counting the number of shared words, we need to consider the following:
`

Canonicalization¶Remember, our goal is ultimately to count the number of shared words between job titles. But before we start counting the number of shared words, we need to consider the following:

`python
Canonicalization¶Remember, our goal is ultimately to count the number of shared words between job titles. But before we start counting the number of shared words, we need to consider the following:
`

Canonicalization¶Remember, our goal is ultimately to count the number of shared words between job titles. But before we start counting the number of shared words, we need to consider the following:

`python

`

Some job titles may have punctuation, like '-' and '&', which may count as words when they shouldn't.
'Assistant - Manager' and 'Assistant Manager' should count as the same job title.

`python
Some job titles may have punctuation, like '-' and '&', which may count as words when they shouldn't.
'Assistant - Manager' and 'Assistant Manager' should count as the same job title.
`

Some job titles may have punctuation, like '-' and '&', which may count as words when they shouldn't.
'Assistant - Manager' and 'Assistant Manager' should count as the same job title.

`python
Some job titles may have punctuation, like '-' and '&', which may count as words when they shouldn't.
'Assistant - Manager' and 'Assistant Manager' should count as the same job title.
`

Some job titles may have punctuation, like '-' and '&', which may count as words when they shouldn't.
'Assistant - Manager' and 'Assistant Manager' should count as the same job title.

`python

`

Some job titles may have "glue" words, like 'to' and 'the', which (we can argue) also shouldn't count as words.
'Assistant To The Manager' and 'Assistant Manager' should count as the same job title.

`python
Some job titles may have "glue" words, like 'to' and 'the', which (we can argue) also shouldn't count as words.
'Assistant To The Manager' and 'Assistant Manager' should count as the same job title.
`

Some job titles may have "glue" words, like 'to' and 'the', which (we can argue) also shouldn't count as words.
'Assistant To The Manager' and 'Assistant Manager' should count as the same job title.

`python
Some job titles may have "glue" words, like 'to' and 'the', which (we can argue) also shouldn't count as words.
'Assistant To The Manager' and 'Assistant Manager' should count as the same job title.
`

Some job titles may have "glue" words, like 'to' and 'the', which (we can argue) also shouldn't count as words.
'Assistant To The Manager' and 'Assistant Manager' should count as the same job title.

`python

`

If we just want to focus on the titles themselves, then perhaps roman numerals should be removed: that is, 'Police Officer Ii' and 'Police Officer I' should count as the same job title.

`python
If we just want to focus on the titles themselves, then perhaps roman numerals should be removed: that is, 'Police Officer Ii' and 'Police Officer I' should count as the same job title.
`

If we just want to focus on the titles themselves, then perhaps roman numerals should be removed: that is, 'Police Officer Ii' and 'Police Officer I' should count as the same job title.

`python
If we just want to focus on the titles themselves, then perhaps roman numerals should be removed: that is, 'Police Officer Ii' and 'Police Officer I' should count as the same job title.
`

If we just want to focus on the titles themselves, then perhaps roman numerals should be removed: that is, 'Police Officer Ii' and 'Police Officer I' should count as the same job title.

`python

`

Let's address the above issues. The process of converting job titles so that they are always represented the same way is called canonicalization.

`python
Let's address the above issues. The process of converting job titles so that they are always represented the same way is called canonicalization.
`

Let's address the above issues. The process of converting job titles so that they are always represented the same way is called canonicalization.

`python
Let's address the above issues. The process of converting job titles so that they are always represented the same way is called canonicalization.
`

Let's address the above issues. The process of converting job titles so that they are always represented the same way is called canonicalization.

`python

`

Punctuation¶Are there job titles with unnecessary punctuation that we can remove?

To find out, we can write a regular expression that looks for characters other than letters, numbers, and spaces.

We can use regular expressions with the .str methods we learned earlier in the quarter just by using regex=True.

`python
Punctuation¶Are there job titles with unnecessary punctuation that we can remove?

To find out, we can write a regular expression that looks for characters other than letters, numbers, and spaces.

We can use regular expressions with the .str methods we learned earlier in the quarter just by using regex=True.
`

Punctuation¶Are there job titles with unnecessary punctuation that we can remove?

To find out, we can write a regular expression that looks for characters other than letters, numbers, and spaces.

We can use regular expressions with the .str methods we learned earlier in the quarter just by using regex=True.

`python
Punctuation¶Are there job titles with unnecessary punctuation that we can remove?

To find out, we can write a regular expression that looks for characters other than letters, numbers, and spaces.

We can use regular expressions with the .str methods we learned earlier in the quarter just by using regex=True.
`

Punctuation¶Are there job titles with unnecessary punctuation that we can remove?

To find out, we can write a regular expression that looks for characters other than letters, numbers, and spaces.

We can use regular expressions with the .str methods we learned earlier in the quarter just by using regex=True.

`python

`

`python
In [8]:


# Uses character class negation.
jobtitles.str.contains(r'[^A-Za-z0-9 ]', regex=True).sum()
`

Output:
Out[8]:

1148

`python
In [8]:


# Uses character class negation.
jobtitles.str.contains(r'[^A-Za-z0-9 ]', regex=True).sum()
`

`python
In [8]:
`

Output:
Out[8]:

1148

Output:
Out[8]:

1148

`python
In [9]:


jobtitles[jobtitles.str.contains(r'[^A-Za-z0-9 ]', regex=True)].head()
`

Output:
Out[9]:

96          Park & Recreation Director
536    Associate Engineer - Mechanical
565       Associate Engineer - Traffic
670    Associate Engineer - Electrical
744         Associate Engineer - Civil
Name: Job Title, dtype: object

`python
In [9]:


jobtitles[jobtitles.str.contains(r'[^A-Za-z0-9 ]', regex=True)].head()
`

`python
In [9]:
`

Output:
Out[9]:

96          Park & Recreation Director
536    Associate Engineer - Mechanical
565       Associate Engineer - Traffic
670    Associate Engineer - Electrical
744         Associate Engineer - Civil
Name: Job Title, dtype: object

Output:
Out[9]:

96          Park & Recreation Director
536    Associate Engineer - Mechanical
565       Associate Engineer - Traffic
670    Associate Engineer - Electrical
744         Associate Engineer - Civil
Name: Job Title, dtype: object

It seems like we should replace these pieces of punctuation with a single space.

`python
It seems like we should replace these pieces of punctuation with a single space.
`

It seems like we should replace these pieces of punctuation with a single space.

`python
It seems like we should replace these pieces of punctuation with a single space.
`

It seems like we should replace these pieces of punctuation with a single space.

`python

`

"Glue" words¶Are there job titles with "glue" words in the middle, such as 'Assistant To The Manager'?

`python
"Glue" words¶Are there job titles with "glue" words in the middle, such as 'Assistant To The Manager'?
`

"Glue" words¶Are there job titles with "glue" words in the middle, such as 'Assistant To The Manager'?

`python
"Glue" words¶Are there job titles with "glue" words in the middle, such as 'Assistant To The Manager'?
`

"Glue" words¶Are there job titles with "glue" words in the middle, such as 'Assistant To The Manager'?

`python

`

To figure out if any titles contain the word 'to', we can't just do the following, because it will evaluate to True for job titles that have 'to' anywhere in them, even if not as a standalone word.

`python
To figure out if any titles contain the word 'to', we can't just do the following, because it will evaluate to True for job titles that have 'to' anywhere in them, even if not as a standalone word.
`

To figure out if any titles contain the word 'to', we can't just do the following, because it will evaluate to True for job titles that have 'to' anywhere in them, even if not as a standalone word.

`python
To figure out if any titles contain the word 'to', we can't just do the following, because it will evaluate to True for job titles that have 'to' anywhere in them, even if not as a standalone word.
`

To figure out if any titles contain the word 'to', we can't just do the following, because it will evaluate to True for job titles that have 'to' anywhere in them, even if not as a standalone word.

`python

`

`python
In [10]:


# Why are we converting to lowercase?
jobtitles.str.lower().str.contains('to').sum()
`

Output:
Out[10]:

1806

`python
In [10]:


# Why are we converting to lowercase?
jobtitles.str.lower().str.contains('to').sum()
`

`python
In [10]:
`

Output:
Out[10]:

1806

Output:
Out[10]:

1806

Instead, we need to look for 'to' separated by word boundaries.

`python
Instead, we need to look for 'to' separated by word boundaries.
`

Instead, we need to look for 'to' separated by word boundaries.

`python
Instead, we need to look for 'to' separated by word boundaries.
`

Instead, we need to look for 'to' separated by word boundaries.

`python

`

`python
In [11]:


jobtitles.str.lower().str.contains(r'\bto\b', regex=True).sum()
`

Output:
Out[11]:

13

`python
In [11]:


jobtitles.str.lower().str.contains(r'\bto\b', regex=True).sum()
`

`python
In [11]:
`

Output:
Out[11]:

13

Output:
Out[11]:

13

`python
In [12]:


jobtitles[jobtitles.str.lower().str.contains(r'\bto\b', regex=True)]
`

Output:
Out[12]:

1585     Assistant To The Water Department Director
2116                      Assistant To The Director
2449           Principal Assistant To City Attorney
                            ...                    
6904                      Assistant To The Director
8796       Assistant To The Chief Operating Officer
11101               Confidential Secretary To Mayor
Name: Job Title, Length: 13, dtype: object

`python
In [12]:


jobtitles[jobtitles.str.lower().str.contains(r'\bto\b', regex=True)]
`

`python
In [12]:
`

Output:
Out[12]:

1585     Assistant To The Water Department Director
2116                      Assistant To The Director
2449           Principal Assistant To City Attorney
                            ...                    
6904                      Assistant To The Director
8796       Assistant To The Chief Operating Officer
11101               Confidential Secretary To Mayor
Name: Job Title, Length: 13, dtype: object

Output:
Out[12]:

1585     Assistant To The Water Department Director
2116                      Assistant To The Director
2449           Principal Assistant To City Attorney
                            ...                    
6904                      Assistant To The Director
8796       Assistant To The Chief Operating Officer
11101               Confidential Secretary To Mayor
Name: Job Title, Length: 13, dtype: object

We can look for other filler words too, like 'the' and 'for'.

`python
We can look for other filler words too, like 'the' and 'for'.
`

We can look for other filler words too, like 'the' and 'for'.

`python
We can look for other filler words too, like 'the' and 'for'.
`

We can look for other filler words too, like 'the' and 'for'.

`python

`

`python
In [13]:


jobtitles[jobtitles.str.lower().str.contains(r'\bthe\b', regex=True)]
`

Output:
Out[13]:

1585    Assistant To The Water Department Director
2116                     Assistant To The Director
4763                     Assistant To The Director
6719                     Assistant To The Director
6904                     Assistant To The Director
8796      Assistant To The Chief Operating Officer
Name: Job Title, dtype: object

`python
In [13]:


jobtitles[jobtitles.str.lower().str.contains(r'\bthe\b', regex=True)]
`

`python
In [13]:
`

Output:
Out[13]:

1585    Assistant To The Water Department Director
2116                     Assistant To The Director
4763                     Assistant To The Director
6719                     Assistant To The Director
6904                     Assistant To The Director
8796      Assistant To The Chief Operating Officer
Name: Job Title, dtype: object

Output:
Out[13]:

1585    Assistant To The Water Department Director
2116                     Assistant To The Director
4763                     Assistant To The Director
6719                     Assistant To The Director
6904                     Assistant To The Director
8796      Assistant To The Chief Operating Officer
Name: Job Title, dtype: object

`python
In [14]:


jobtitles[jobtitles.str.lower().str.contains(r'\bfor\b', regex=True)]
`

Output:
Out[14]:

228     Assistant For Community Outreach
4507    Assistant For Community Outreach
Name: Job Title, dtype: object

`python
In [14]:


jobtitles[jobtitles.str.lower().str.contains(r'\bfor\b', regex=True)]
`

`python
In [14]:
`

Output:
Out[14]:

228     Assistant For Community Outreach
4507    Assistant For Community Outreach
Name: Job Title, dtype: object

Output:
Out[14]:

228     Assistant For Community Outreach
4507    Assistant For Community Outreach
Name: Job Title, dtype: object

We should probably remove these "glue" words.

`python
We should probably remove these "glue" words.
`

We should probably remove these "glue" words.

`python
We should probably remove these "glue" words.
`

We should probably remove these "glue" words.

`python

`

Roman numerals (e.g. "Ii")¶Lastly, let's try to identify job titles that have roman numerals at the end, like 'i' (1), 'ii' (2), 'iii' (3), or 'iv' (4). As before, we'll convert to lowercase first.

`python
Roman numerals (e.g. "Ii")¶Lastly, let's try to identify job titles that have roman numerals at the end, like 'i' (1), 'ii' (2), 'iii' (3), or 'iv' (4). As before, we'll convert to lowercase first.
`

Roman numerals (e.g. "Ii")¶Lastly, let's try to identify job titles that have roman numerals at the end, like 'i' (1), 'ii' (2), 'iii' (3), or 'iv' (4). As before, we'll convert to lowercase first.

`python
Roman numerals (e.g. "Ii")¶Lastly, let's try to identify job titles that have roman numerals at the end, like 'i' (1), 'ii' (2), 'iii' (3), or 'iv' (4). As before, we'll convert to lowercase first.
`

Roman numerals (e.g. "Ii")¶Lastly, let's try to identify job titles that have roman numerals at the end, like 'i' (1), 'ii' (2), 'iii' (3), or 'iv' (4). As before, we'll convert to lowercase first.

`python

`

`python
In [15]:


jobtitles[jobtitles.str.lower().str.contains(r'\bi+v?\b', regex=True)]
`

Output:
Out[15]:

14                 Police Officer Ii
20                 Police Officer Ii
34                 Police Officer Ii
                    ...             
14565    Water Systems Technician Iv
14568              Police Officer Ii
14569          Clerical Assistant Ii
Name: Job Title, Length: 6537, dtype: object

`python
In [15]:


jobtitles[jobtitles.str.lower().str.contains(r'\bi+v?\b', regex=True)]
`

`python
In [15]:
`

Output:
Out[15]:

14                 Police Officer Ii
20                 Police Officer Ii
34                 Police Officer Ii
                    ...             
14565    Water Systems Technician Iv
14568              Police Officer Ii
14569          Clerical Assistant Ii
Name: Job Title, Length: 6537, dtype: object

Output:
Out[15]:

14                 Police Officer Ii
20                 Police Officer Ii
34                 Police Officer Ii
                    ...             
14565    Water Systems Technician Iv
14568              Police Officer Ii
14569          Clerical Assistant Ii
Name: Job Title, Length: 6537, dtype: object

Let's get rid of those numbers, too.

`python
Let's get rid of those numbers, too.
`

Let's get rid of those numbers, too.

`python
Let's get rid of those numbers, too.
`

Let's get rid of those numbers, too.

`python

`

Fixing punctuation and removing "glue" words and roman numerals¶Let's put the preceeding three steps together and canonicalize job titles by:

converting to lowercase,
removing each occurrence of 'to', 'the', and 'for',
replacing each character that is not a letter, digit, or space with a single space,
replacing each sequence of roman numerals – either 'i', 'ii', 'iii', or 'iv' at the end with nothing, and
replacing each sequence of multiple spaces with a single space.

`python
Fixing punctuation and removing "glue" words and roman numerals¶Let's put the preceeding three steps together and canonicalize job titles by:

converting to lowercase,
removing each occurrence of 'to', 'the', and 'for',
replacing each character that is not a letter, digit, or space with a single space,
replacing each sequence of roman numerals – either 'i', 'ii', 'iii', or 'iv' at the end with nothing, and
replacing each sequence of multiple spaces with a single space.
`

Fixing punctuation and removing "glue" words and roman numerals¶Let's put the preceeding three steps together and canonicalize job titles by:

converting to lowercase,
removing each occurrence of 'to', 'the', and 'for',
replacing each character that is not a letter, digit, or space with a single space,
replacing each sequence of roman numerals – either 'i', 'ii', 'iii', or 'iv' at the end with nothing, and
replacing each sequence of multiple spaces with a single space.

`python
Fixing punctuation and removing "glue" words and roman numerals¶Let's put the preceeding three steps together and canonicalize job titles by:

converting to lowercase,
removing each occurrence of 'to', 'the', and 'for',
replacing each character that is not a letter, digit, or space with a single space,
replacing each sequence of roman numerals – either 'i', 'ii', 'iii', or 'iv' at the end with nothing, and
replacing each sequence of multiple spaces with a single space.
`

Fixing punctuation and removing "glue" words and roman numerals¶Let's put the preceeding three steps together and canonicalize job titles by:

converting to lowercase,
removing each occurrence of 'to', 'the', and 'for',
replacing each character that is not a letter, digit, or space with a single space,
replacing each sequence of roman numerals – either 'i', 'ii', 'iii', or 'iv' at the end with nothing, and
replacing each sequence of multiple spaces with a single space.

`python

`

`python
In [16]:


jobtitles = (
    jobtitles
    .str.lower()
    .str.replace(r'\bto\b|\bthe\b\|bfor\b', '', regex=True)
    .str.replace(r'[^A-Za-z0-9 ]', ' ', regex=True)
    .str.replace(r'\bi+v?\b', '', regex=True)
    .str.replace(r' +', ' ', regex=True)               # ' +' matches 1 or more occurrences of a space.
    .str.strip()                                       # Removes leading/trailing spaces if present.
)
`

`python
In [16]:
`

`python
In [17]:


jobtitles.sample(5)
`

Output:
Out[17]:

14308              pool guard
5990      plumbing supervisor
135      deputy city attorney
11094       library assistant
11610    power plant operator
Name: Job Title, dtype: object

`python
In [17]:


jobtitles.sample(5)
`

`python
In [17]:
`

Output:
Out[17]:

14308              pool guard
5990      plumbing supervisor
135      deputy city attorney
11094       library assistant
11610    power plant operator
Name: Job Title, dtype: object

Output:
Out[17]:

14308              pool guard
5990      plumbing supervisor
135      deputy city attorney
11094       library assistant
11610    power plant operator
Name: Job Title, dtype: object

`python
In [18]:


(jobtitles == 'police officer').sum()
`

Output:
Out[18]:

1268

`python
In [18]:


(jobtitles == 'police officer').sum()
`

`python
In [18]:
`

Output:
Out[18]:

1268

Output:
Out[18]:

1268

Bag of words 💰¶

`python
Bag of words 💰¶
`

Bag of words 💰¶

`python
Bag of words 💰¶
`

Bag of words 💰¶

`python

`

Text similarity¶Recall, our idea is to measure the similarity of two job titles by counting the number of shared words between the job titles. How do we actually do that, for all of the job titles we have?

`python
Text similarity¶Recall, our idea is to measure the similarity of two job titles by counting the number of shared words between the job titles. How do we actually do that, for all of the job titles we have?
`

Text similarity¶Recall, our idea is to measure the similarity of two job titles by counting the number of shared words between the job titles. How do we actually do that, for all of the job titles we have?

`python
Text similarity¶Recall, our idea is to measure the similarity of two job titles by counting the number of shared words between the job titles. How do we actually do that, for all of the job titles we have?
`

Text similarity¶Recall, our idea is to measure the similarity of two job titles by counting the number of shared words between the job titles. How do we actually do that, for all of the job titles we have?

`python

`

A counts matrix¶Let's create a "counts" matrix, such that:

there is 1 row per job title,
there is 1 column per unique word that is used in job titles, and
the value in row title and column word is the number of occurrences of word in title.

`python
A counts matrix¶Let's create a "counts" matrix, such that:

there is 1 row per job title,
there is 1 column per unique word that is used in job titles, and
the value in row title and column word is the number of occurrences of word in title.
`

A counts matrix¶Let's create a "counts" matrix, such that:

there is 1 row per job title,
there is 1 column per unique word that is used in job titles, and
the value in row title and column word is the number of occurrences of word in title.

`python
A counts matrix¶Let's create a "counts" matrix, such that:

there is 1 row per job title,
there is 1 column per unique word that is used in job titles, and
the value in row title and column word is the number of occurrences of word in title.
`

A counts matrix¶Let's create a "counts" matrix, such that:

there is 1 row per job title,
there is 1 column per unique word that is used in job titles, and
the value in row title and column word is the number of occurrences of word in title.

`python

`

Such a matrix might look like:




senior
lecturer
teaching
professor
assistant
associate




senior lecturer
1
1
0
0
0
0


assistant teaching professor
0
0
1
1
1
0


associate professor
0
0
0
1
0
1


senior assistant to the assistant professor
1
0
0
1
2
0



Then, we can make statements like: "assistant teaching professor" is more similar to "associate professor" than to "senior lecturer".

`python
Such a matrix might look like:




senior
lecturer
teaching
professor
assistant
associate




senior lecturer
1
1
0
0
0
0


assistant teaching professor
0
0
1
1
1
0


associate professor
0
0
0
1
0
1


senior assistant to the assistant professor
1
0
0
1
2
0



Then, we can make statements like: "assistant teaching professor" is more similar to "associate professor" than to "senior lecturer".
`

Such a matrix might look like:




senior
lecturer
teaching
professor
assistant
associate




senior lecturer
1
1
0
0
0
0


assistant teaching professor
0
0
1
1
1
0


associate professor
0
0
0
1
0
1


senior assistant to the assistant professor
1
0
0
1
2
0



Then, we can make statements like: "assistant teaching professor" is more similar to "associate professor" than to "senior lecturer".

`python
Such a matrix might look like:




senior
lecturer
teaching
professor
assistant
associate




senior lecturer
1
1
0
0
0
0


assistant teaching professor
0
0
1
1
1
0


associate professor
0
0
0
1
0
1


senior assistant to the assistant professor
1
0
0
1
2
0



Then, we can make statements like: "assistant teaching professor" is more similar to "associate professor" than to "senior lecturer".
`

Such a matrix might look like:




senior
lecturer
teaching
professor
assistant
associate




senior lecturer
1
1
0
0
0
0


assistant teaching professor
0
0
1
1
1
0


associate professor
0
0
0
1
0
1


senior assistant to the assistant professor
1
0
0
1
2
0



Then, we can make statements like: "assistant teaching professor" is more similar to "associate professor" than to "senior lecturer".

`python

`

Creating a counts matrix¶First, we need to determine all words that are used across all job titles.

`python
Creating a counts matrix¶First, we need to determine all words that are used across all job titles.
`

Creating a counts matrix¶First, we need to determine all words that are used across all job titles.

`python
Creating a counts matrix¶First, we need to determine all words that are used across all job titles.
`

Creating a counts matrix¶First, we need to determine all words that are used across all job titles.

`python

`

`python
In [19]:


jobtitles.str.split()
`

Output:
Out[19]:

0        [retirement, chief, investment, officer]
1                     [retirement, administrator]
2                     [chief, operating, officer]
                           ...                   
14567              [assistant, fleet, technician]
14568                           [police, officer]
14569                       [clerical, assistant]
Name: Job Title, Length: 14570, dtype: object

`python
In [19]:


jobtitles.str.split()
`

`python
In [19]:
`

Output:
Out[19]:

0        [retirement, chief, investment, officer]
1                     [retirement, administrator]
2                     [chief, operating, officer]
                           ...                   
14567              [assistant, fleet, technician]
14568                           [police, officer]
14569                       [clerical, assistant]
Name: Job Title, Length: 14570, dtype: object

Output:
Out[19]:

0        [retirement, chief, investment, officer]
1                     [retirement, administrator]
2                     [chief, operating, officer]
                           ...                   
14567              [assistant, fleet, technician]
14568                           [police, officer]
14569                       [clerical, assistant]
Name: Job Title, Length: 14570, dtype: object

`python
In [20]:


# The .explode method concatenates the lists together into a single Series.
all_words = jobtitles.str.split().explode()
all_words
`

Output:
Out[20]:

0        retirement
0             chief
0        investment
            ...    
14568       officer
14569      clerical
14569     assistant
Name: Job Title, Length: 34583, dtype: object

`python
In [20]:


# The .explode method concatenates the lists together into a single Series.
all_words = jobtitles.str.split().explode()
all_words
`

`python
In [20]:
`

Output:
Out[20]:

0        retirement
0             chief
0        investment
            ...    
14568       officer
14569      clerical
14569     assistant
Name: Job Title, Length: 34583, dtype: object

Output:
Out[20]:

0        retirement
0             chief
0        investment
            ...    
14568       officer
14569      clerical
14569     assistant
Name: Job Title, Length: 34583, dtype: object

Next, to determine the columns of our matrix, we need to find a list of all unique words used in titles. We can do this with np.unique, but value_counts shows us the distribution, which is interesting.

`python
Next, to determine the columns of our matrix, we need to find a list of all unique words used in titles. We can do this with np.unique, but value_counts shows us the distribution, which is interesting.
`

Next, to determine the columns of our matrix, we need to find a list of all unique words used in titles. We can do this with np.unique, but value_counts shows us the distribution, which is interesting.

`python
Next, to determine the columns of our matrix, we need to find a list of all unique words used in titles. We can do this with np.unique, but value_counts shows us the distribution, which is interesting.
`

Next, to determine the columns of our matrix, we need to find a list of all unique words used in titles. We can do this with np.unique, but value_counts shows us the distribution, which is interesting.

`python

`

`python
In [21]:


unique_words = all_words.value_counts()
unique_words
`

Output:
Out[21]:

Job Title
police         2174
officer        1570
assistant      1345
               ... 
ltd               1
termed            1
participant       1
Name: count, Length: 346, dtype: int64

`python
In [21]:


unique_words = all_words.value_counts()
unique_words
`

`python
In [21]:
`

Output:
Out[21]:

Job Title
police         2174
officer        1570
assistant      1345
               ... 
ltd               1
termed            1
participant       1
Name: count, Length: 346, dtype: int64

Output:
Out[21]:

Job Title
police         2174
officer        1570
assistant      1345
               ... 
ltd               1
termed            1
participant       1
Name: count, Length: 346, dtype: int64

Note that in unique_words.index, job titles are sorted by number of occurrences!

`python
Note that in unique_words.index, job titles are sorted by number of occurrences!
`

Note that in unique_words.index, job titles are sorted by number of occurrences!

`python
Note that in unique_words.index, job titles are sorted by number of occurrences!
`

Note that in unique_words.index, job titles are sorted by number of occurrences!

`python

`

For each of the unique words that are used in job titles, we can count the number of occurrences of the word in each job title.

'deputy fire chief' contains the word 'deputy' once, the word 'fire' once, and the word 'chief' once.
'assistant managers assistant' contains the word 'assistant' twice and the word 'managers' once.

`python
For each of the unique words that are used in job titles, we can count the number of occurrences of the word in each job title.

'deputy fire chief' contains the word 'deputy' once, the word 'fire' once, and the word 'chief' once.
'assistant managers assistant' contains the word 'assistant' twice and the word 'managers' once.
`

For each of the unique words that are used in job titles, we can count the number of occurrences of the word in each job title.

'deputy fire chief' contains the word 'deputy' once, the word 'fire' once, and the word 'chief' once.
'assistant managers assistant' contains the word 'assistant' twice and the word 'managers' once.

`python
For each of the unique words that are used in job titles, we can count the number of occurrences of the word in each job title.

'deputy fire chief' contains the word 'deputy' once, the word 'fire' once, and the word 'chief' once.
'assistant managers assistant' contains the word 'assistant' twice and the word 'managers' once.
`

For each of the unique words that are used in job titles, we can count the number of occurrences of the word in each job title.

'deputy fire chief' contains the word 'deputy' once, the word 'fire' once, and the word 'chief' once.
'assistant managers assistant' contains the word 'assistant' twice and the word 'managers' once.

`python

`

`python
In [22]:


# Created using a dictionary to avoid a "DataFrame is highly fragmented" warning.
counts_dict = {}
for word in unique_words.index:
    re_pat = fr'\b{word}\b'   
    counts_dict[word] = jobtitles.str.count(re_pat)
    
counts_df = pd.DataFrame(counts_dict).set_index(jobtitles)
`

`python
In [22]:
`

`python
In [23]:


counts_df.head()
`

Output:
Out[23]:







police
officer
assistant
engineer
...
warehouse
ltd
termed
participant


Job Title













retirement chief investment officer
0
1
0
0
...
0
0
0
0


retirement administrator
0
0
0
0
...
0
0
0
0


chief operating officer
0
1
0
0
...
0
0
0
0


city attorney
0
0
0
0
...
0
0
0
0


mayor
0
0
0
0
...
0
0
0
0



5 rows × 346 columns

`python
In [23]:


counts_df.head()
`

`python
In [23]:
`

Output:
Out[23]:







police
officer
assistant
engineer
...
warehouse
ltd
termed
participant


Job Title













retirement chief investment officer
0
1
0
0
...
0
0
0
0


retirement administrator
0
0
0
0
...
0
0
0
0


chief operating officer
0
1
0
0
...
0
0
0
0


city attorney
0
0
0
0
...
0
0
0
0


mayor
0
0
0
0
...
0
0
0
0



5 rows × 346 columns

Output:
Out[23]:







police
officer
assistant
engineer
...
warehouse
ltd
termed
participant


Job Title













retirement chief investment officer
0
1
0
0
...
0
0
0
0


retirement administrator
0
0
0
0
...
0
0
0
0


chief operating officer
0
1
0
0
...
0
0
0
0


city attorney
0
0
0
0
...
0
0
0
0


mayor
0
0
0
0
...
0
0
0
0



5 rows × 346 columns

`python
In [24]:


counts_df.shape
`

Output:
Out[24]:

(14570, 346)

`python
In [24]:


counts_df.shape
`

`python
In [24]:
`

Output:
Out[24]:

(14570, 346)

Output:
Out[24]:

(14570, 346)

counts_df has one row for each employee, and one column for each unique word that is used in a job title.

`python
counts_df has one row for each employee, and one column for each unique word that is used in a job title.
`

counts_df has one row for each employee, and one column for each unique word that is used in a job title.

`python
counts_df has one row for each employee, and one column for each unique word that is used in a job title.
`

counts_df has one row for each employee, and one column for each unique word that is used in a job title.

`python

`

Bag of words¶
The bag of words model represents texts (e.g. job titles, sentences, documents) as vectors of word counts.
The "counts" matrices we have worked with so far were created using the bag of words model.
The bag of words model defines a vector space in $\mathbb{R}^{\text{number of unique words}}$.
In the matrix on the previous slide, each row was a vector corresponding to a specific job title.


It is called "bag of words" because it doesn't consider order.


(source)

`python
Bag of words¶
The bag of words model represents texts (e.g. job titles, sentences, documents) as vectors of word counts.
The "counts" matrices we have worked with so far were created using the bag of words model.
The bag of words model defines a vector space in $\mathbb{R}^{\text{number of unique words}}$.
In the matrix on the previous slide, each row was a vector corresponding to a specific job title.


It is called "bag of words" because it doesn't consider order.


(source)
`

Bag of words¶
The bag of words model represents texts (e.g. job titles, sentences, documents) as vectors of word counts.
The "counts" matrices we have worked with so far were created using the bag of words model.
The bag of words model defines a vector space in $\mathbb{R}^{\text{number of unique words}}$.
In the matrix on the previous slide, each row was a vector corresponding to a specific job title.


It is called "bag of words" because it doesn't consider order.


(source)

`python
Bag of words¶
The bag of words model represents texts (e.g. job titles, sentences, documents) as vectors of word counts.
The "counts" matrices we have worked with so far were created using the bag of words model.
The bag of words model defines a vector space in $\mathbb{R}^{\text{number of unique words}}$.
In the matrix on the previous slide, each row was a vector corresponding to a specific job title.


It is called "bag of words" because it doesn't consider order.


(source)
`

Bag of words¶
The bag of words model represents texts (e.g. job titles, sentences, documents) as vectors of word counts.
The "counts" matrices we have worked with so far were created using the bag of words model.
The bag of words model defines a vector space in $\mathbb{R}^{\text{number of unique words}}$.
In the matrix on the previous slide, each row was a vector corresponding to a specific job title.


It is called "bag of words" because it doesn't consider order.


(source)

`python

`

Cosine similarity¶

`python
Cosine similarity¶
`

Cosine similarity¶

`python
Cosine similarity¶
`

Cosine similarity¶

`python

`

Question: Which job titles are most similar to 'deputy fire chief'?¶

`python
Question: Which job titles are most similar to 'deputy fire chief'?¶
`

Question: Which job titles are most similar to 'deputy fire chief'?¶

`python
Question: Which job titles are most similar to 'deputy fire chief'?¶
`

Question: Which job titles are most similar to 'deputy fire chief'?¶

`python

`

Remember, our idea was to count the number of shared words between two job titles.

`python
Remember, our idea was to count the number of shared words between two job titles.
`

Remember, our idea was to count the number of shared words between two job titles.

`python
Remember, our idea was to count the number of shared words between two job titles.
`

Remember, our idea was to count the number of shared words between two job titles.

`python

`

We now have access to counts_df, which contains a row vector for each job title.

`python
We now have access to counts_df, which contains a row vector for each job title.
`

We now have access to counts_df, which contains a row vector for each job title.

`python
We now have access to counts_df, which contains a row vector for each job title.
`

We now have access to counts_df, which contains a row vector for each job title.

`python

`

How can we use it to count the number of shared words between two job titles?

`python
How can we use it to count the number of shared words between two job titles?
`

How can we use it to count the number of shared words between two job titles?

`python
How can we use it to count the number of shared words between two job titles?
`

How can we use it to count the number of shared words between two job titles?

`python

`

Counting shared words¶To start, let's compare the row vectors for 'deputy fire chief' and 'fire battalion chief'.

`python
Counting shared words¶To start, let's compare the row vectors for 'deputy fire chief' and 'fire battalion chief'.
`

Counting shared words¶To start, let's compare the row vectors for 'deputy fire chief' and 'fire battalion chief'.

`python
Counting shared words¶To start, let's compare the row vectors for 'deputy fire chief' and 'fire battalion chief'.
`

Counting shared words¶To start, let's compare the row vectors for 'deputy fire chief' and 'fire battalion chief'.

`python

`

`python
In [25]:


dfc = counts_df.loc['deputy fire chief'].iloc[0]
dfc
`

Output:
Out[25]:

police         0
officer        0
assistant      0
              ..
ltd            0
termed         0
participant    0
Name: deputy fire chief, Length: 346, dtype: int64

`python
In [25]:


dfc = counts_df.loc['deputy fire chief'].iloc[0]
dfc
`

`python
In [25]:
`

Output:
Out[25]:

police         0
officer        0
assistant      0
              ..
ltd            0
termed         0
participant    0
Name: deputy fire chief, Length: 346, dtype: int64

Output:
Out[25]:

police         0
officer        0
assistant      0
              ..
ltd            0
termed         0
participant    0
Name: deputy fire chief, Length: 346, dtype: int64

`python
In [26]:


fbc = counts_df.loc['fire battalion chief'].iloc[0]
fbc
`

Output:
Out[26]:

police         0
officer        0
assistant      0
              ..
ltd            0
termed         0
participant    0
Name: fire battalion chief, Length: 346, dtype: int64

`python
In [26]:


fbc = counts_df.loc['fire battalion chief'].iloc[0]
fbc
`

`python
In [26]:
`

Output:
Out[26]:

police         0
officer        0
assistant      0
              ..
ltd            0
termed         0
participant    0
Name: fire battalion chief, Length: 346, dtype: int64

Output:
Out[26]:

police         0
officer        0
assistant      0
              ..
ltd            0
termed         0
participant    0
Name: fire battalion chief, Length: 346, dtype: int64

We can stack these two vectors horizontally.

`python
We can stack these two vectors horizontally.
`

We can stack these two vectors horizontally.

`python
We can stack these two vectors horizontally.
`

We can stack these two vectors horizontally.

`python

`

`python
In [27]:


pair_counts = (
    pd.concat([dfc, fbc], axis=1)
    .sort_values(by=['deputy fire chief', 'fire battalion chief'], ascending=False)
    .head(10)
    .T
)

pair_counts
`

Output:
Out[27]:







fire
chief
deputy
battalion
...
assistant
engineer
intern
civil




deputy fire chief
1
1
1
0
...
0
0
0
0


fire battalion chief
1
1
0
1
...
0
0
0
0



2 rows × 10 columns

`python
In [27]:


pair_counts = (
    pd.concat([dfc, fbc], axis=1)
    .sort_values(by=['deputy fire chief', 'fire battalion chief'], ascending=False)
    .head(10)
    .T
)

pair_counts
`

`python
In [27]:
`

Output:
Out[27]:







fire
chief
deputy
battalion
...
assistant
engineer
intern
civil




deputy fire chief
1
1
1
0
...
0
0
0
0


fire battalion chief
1
1
0
1
...
0
0
0
0



2 rows × 10 columns

Output:
Out[27]:







fire
chief
deputy
battalion
...
assistant
engineer
intern
civil




deputy fire chief
1
1
1
0
...
0
0
0
0


fire battalion chief
1
1
0
1
...
0
0
0
0



2 rows × 10 columns

'deputy fire chief' and 'fire battalion chief' have 2 shared words in common. One way to arrive at this result mathematically is by taking their dot product:

`python
'deputy fire chief' and 'fire battalion chief' have 2 shared words in common. One way to arrive at this result mathematically is by taking their dot product:
`

'deputy fire chief' and 'fire battalion chief' have 2 shared words in common. One way to arrive at this result mathematically is by taking their dot product:

`python
'deputy fire chief' and 'fire battalion chief' have 2 shared words in common. One way to arrive at this result mathematically is by taking their dot product:
`

'deputy fire chief' and 'fire battalion chief' have 2 shared words in common. One way to arrive at this result mathematically is by taking their dot product:

`python

`

`python
In [28]:


np.dot(pair_counts.iloc[0], pair_counts.iloc[1])
`

Output:
Out[28]:

2

`python
In [28]:


np.dot(pair_counts.iloc[0], pair_counts.iloc[1])
`

`python
In [28]:
`

Output:
Out[28]:

2

Output:
Out[28]:

2

Recall: The dot product¶

`python
Recall: The dot product¶
`

Recall: The dot product¶

`python
Recall: The dot product¶
`

Recall: The dot product¶

`python

`

Recall, if $\vec{a} = \begin{bmatrix} a_1 & a_2 & ... & a_n \end{bmatrix}^T$ and $\vec{b} = \begin{bmatrix} b_1 & b_2 & ... & b_n \end{bmatrix}^T$ are two vectors, then their dot product $\vec{a} \cdot \vec{b}$ is defined as:

$$\vec{a} \cdot \vec{b} = a_1b_1 + a_2b_2 + ... + a_nb_n$$

`python
Recall, if $\vec{a} = \begin{bmatrix} a_1 & a_2 & ... & a_n \end{bmatrix}^T$ and $\vec{b} = \begin{bmatrix} b_1 & b_2 & ... & b_n \end{bmatrix}^T$ are two vectors, then their dot product $\vec{a} \cdot \vec{b}$ is defined as:

$$\vec{a} \cdot \vec{b} = a_1b_1 + a_2b_2 + ... + a_nb_n$$
`

Recall, if $\vec{a} = \begin{bmatrix} a_1 & a_2 & ... & a_n \end{bmatrix}^T$ and $\vec{b} = \begin{bmatrix} b_1 & b_2 & ... & b_n \end{bmatrix}^T$ are two vectors, then their dot product $\vec{a} \cdot \vec{b}$ is defined as:

$$\vec{a} \cdot \vec{b} = a_1b_1 + a_2b_2 + ... + a_nb_n$$

`python
Recall, if $\vec{a} = \begin{bmatrix} a_1 & a_2 & ... & a_n \end{bmatrix}^T$ and $\vec{b} = \begin{bmatrix} b_1 & b_2 & ... & b_n \end{bmatrix}^T$ are two vectors, then their dot product $\vec{a} \cdot \vec{b}$ is defined as:

$$\vec{a} \cdot \vec{b} = a_1b_1 + a_2b_2 + ... + a_nb_n$$
`

Recall, if $\vec{a} = \begin{bmatrix} a_1 & a_2 & ... & a_n \end{bmatrix}^T$ and $\vec{b} = \begin{bmatrix} b_1 & b_2 & ... & b_n \end{bmatrix}^T$ are two vectors, then their dot product $\vec{a} \cdot \vec{b}$ is defined as:

$$\vec{a} \cdot \vec{b} = a_1b_1 + a_2b_2 + ... + a_nb_n$$

`python

`

The dot product also has a geometric interpretation. If $|\vec{a}|$ and $|\vec{b}|$ are the $L_2$ norms (lengths) of $\vec{a}$ and $\vec{b}$, and $\theta$ is the angle between $\vec{a}$ and $\vec{b}$, then:

$$\vec{a} \cdot \vec{b} = |\vec{a}| |\vec{b}| \cos \theta$$
(source)

`python
The dot product also has a geometric interpretation. If $|\vec{a}|$ and $|\vec{b}|$ are the $L_2$ norms (lengths) of $\vec{a}$ and $\vec{b}$, and $\theta$ is the angle between $\vec{a}$ and $\vec{b}$, then:

$$\vec{a} \cdot \vec{b} = |\vec{a}| |\vec{b}| \cos \theta$$
(source)
`

The dot product also has a geometric interpretation. If $|\vec{a}|$ and $|\vec{b}|$ are the $L_2$ norms (lengths) of $\vec{a}$ and $\vec{b}$, and $\theta$ is the angle between $\vec{a}$ and $\vec{b}$, then:

$$\vec{a} \cdot \vec{b} = |\vec{a}| |\vec{b}| \cos \theta$$
(source)

`python
The dot product also has a geometric interpretation. If $|\vec{a}|$ and $|\vec{b}|$ are the $L_2$ norms (lengths) of $\vec{a}$ and $\vec{b}$, and $\theta$ is the angle between $\vec{a}$ and $\vec{b}$, then:

$$\vec{a} \cdot \vec{b} = |\vec{a}| |\vec{b}| \cos \theta$$
(source)
`

The dot product also has a geometric interpretation. If $|\vec{a}|$ and $|\vec{b}|$ are the $L_2$ norms (lengths) of $\vec{a}$ and $\vec{b}$, and $\theta$ is the angle between $\vec{a}$ and $\vec{b}$, then:

$$\vec{a} \cdot \vec{b} = |\vec{a}| |\vec{b}| \cos \theta$$
(source)

`python

`

$\cos \theta$ is equal to its maximum value (1) when $\theta = 0$, i.e. when $\vec{a}$ and $\vec{b}$ point in the same direction.

`python
$\cos \theta$ is equal to its maximum value (1) when $\theta = 0$, i.e. when $\vec{a}$ and $\vec{b}$ point in the same direction.
`

$\cos \theta$ is equal to its maximum value (1) when $\theta = 0$, i.e. when $\vec{a}$ and $\vec{b}$ point in the same direction.

`python
$\cos \theta$ is equal to its maximum value (1) when $\theta = 0$, i.e. when $\vec{a}$ and $\vec{b}$ point in the same direction.
`

$\cos \theta$ is equal to its maximum value (1) when $\theta = 0$, i.e. when $\vec{a}$ and $\vec{b}$ point in the same direction.

`python

`

Cosine similarity and bag of words¶To measure the similarity between two word vectors, instead of just counting the number of shared words, we should compute their normalized dot product, also known as their cosine similarity.
$$\cos \theta = \boxed{\frac{\vec{a} \cdot \vec{b}}{|\vec{a}| | \vec{b}|}}$$

`python
Cosine similarity and bag of words¶To measure the similarity between two word vectors, instead of just counting the number of shared words, we should compute their normalized dot product, also known as their cosine similarity.
$$\cos \theta = \boxed{\frac{\vec{a} \cdot \vec{b}}{|\vec{a}| | \vec{b}|}}$$
`

Cosine similarity and bag of words¶To measure the similarity between two word vectors, instead of just counting the number of shared words, we should compute their normalized dot product, also known as their cosine similarity.
$$\cos \theta = \boxed{\frac{\vec{a} \cdot \vec{b}}{|\vec{a}| | \vec{b}|}}$$

`python
Cosine similarity and bag of words¶To measure the similarity between two word vectors, instead of just counting the number of shared words, we should compute their normalized dot product, also known as their cosine similarity.
$$\cos \theta = \boxed{\frac{\vec{a} \cdot \vec{b}}{|\vec{a}| | \vec{b}|}}$$
`

Cosine similarity and bag of words¶To measure the similarity between two word vectors, instead of just counting the number of shared words, we should compute their normalized dot product, also known as their cosine similarity.
$$\cos \theta = \boxed{\frac{\vec{a} \cdot \vec{b}}{|\vec{a}| | \vec{b}|}}$$

`python

`

If all elements in $\vec{a}$ and $\vec{b}$ are non-negative, then $\cos \theta$ ranges from 0 to 1.

`python
If all elements in $\vec{a}$ and $\vec{b}$ are non-negative, then $\cos \theta$ ranges from 0 to 1.
`

If all elements in $\vec{a}$ and $\vec{b}$ are non-negative, then $\cos \theta$ ranges from 0 to 1.

`python
If all elements in $\vec{a}$ and $\vec{b}$ are non-negative, then $\cos \theta$ ranges from 0 to 1.
`

If all elements in $\vec{a}$ and $\vec{b}$ are non-negative, then $\cos \theta$ ranges from 0 to 1.

`python

`

🚨 Key idea: The larger $\cos \theta$ is, the more similar the two vectors are!

`python
🚨 Key idea: The larger $\cos \theta$ is, the more similar the two vectors are!
`

🚨 Key idea: The larger $\cos \theta$ is, the more similar the two vectors are!

`python
🚨 Key idea: The larger $\cos \theta$ is, the more similar the two vectors are!
`

🚨 Key idea: The larger $\cos \theta$ is, the more similar the two vectors are!

`python

`

It is important to normalize by the lengths of the vectors, otherwise texts with more words will have artificially high similarities with other texts.

`python
It is important to normalize by the lengths of the vectors, otherwise texts with more words will have artificially high similarities with other texts.
`

It is important to normalize by the lengths of the vectors, otherwise texts with more words will have artificially high similarities with other texts.

`python
It is important to normalize by the lengths of the vectors, otherwise texts with more words will have artificially high similarities with other texts.
`

It is important to normalize by the lengths of the vectors, otherwise texts with more words will have artificially high similarities with other texts.

`python

`

Normalizing¶$$\cos \theta = \boxed{\frac{\vec{a} \cdot \vec{b}}{|\vec{a}| | \vec{b}|}}$$

`python
Normalizing¶$$\cos \theta = \boxed{\frac{\vec{a} \cdot \vec{b}}{|\vec{a}| | \vec{b}|}}$$
`

Normalizing¶$$\cos \theta = \boxed{\frac{\vec{a} \cdot \vec{b}}{|\vec{a}| | \vec{b}|}}$$

`python
Normalizing¶$$\cos \theta = \boxed{\frac{\vec{a} \cdot \vec{b}}{|\vec{a}| | \vec{b}|}}$$
`

Normalizing¶$$\cos \theta = \boxed{\frac{\vec{a} \cdot \vec{b}}{|\vec{a}| | \vec{b}|}}$$

`python

`

Why can't we just use the dot product – that is, why must we divide by $|\vec{a}| | \vec{b}|$?

`python
Why can't we just use the dot product – that is, why must we divide by $|\vec{a}| | \vec{b}|$?
`

Why can't we just use the dot product – that is, why must we divide by $|\vec{a}| | \vec{b}|$?

`python
Why can't we just use the dot product – that is, why must we divide by $|\vec{a}| | \vec{b}|$?
`

Why can't we just use the dot product – that is, why must we divide by $|\vec{a}| | \vec{b}|$?

`python

`

Consider the following example:





big
data
science




big big big big data
4
1
0


big data science
1
1
1


science big data
1
1
1

`python
Consider the following example:





big
data
science




big big big big data
4
1
0


big data science
1
1
1


science big data
1
1
1
`

Consider the following example:





big
data
science




big big big big data
4
1
0


big data science
1
1
1


science big data
1
1
1

`python
Consider the following example:





big
data
science




big big big big data
4
1
0


big data science
1
1
1


science big data
1
1
1
`

Consider the following example:





big
data
science




big big big big data
4
1
0


big data science
1
1
1


science big data
1
1
1

`python

`

Pair
Dot Product
Cosine Similarity




big data science and big big big big data
5
0.7001


big data science and science big data
3
1

`python
Pair
Dot Product
Cosine Similarity




big data science and big big big big data
5
0.7001


big data science and science big data
3
1
`

Pair
Dot Product
Cosine Similarity




big data science and big big big big data
5
0.7001


big data science and science big data
3
1

`python
Pair
Dot Product
Cosine Similarity




big data science and big big big big data
5
0.7001


big data science and science big data
3
1
`

Pair
Dot Product
Cosine Similarity




big data science and big big big big data
5
0.7001


big data science and science big data
3
1

`python

`

'big big big big data' has a large dot product with 'big data science' just because it has the word 'big' four times. But intuitively, 'big data science' and 'science big data' should be as similar as possible, since they're permutations of the same phrase.

`python
'big big big big data' has a large dot product with 'big data science' just because it has the word 'big' four times. But intuitively, 'big data science' and 'science big data' should be as similar as possible, since they're permutations of the same phrase.
`

'big big big big data' has a large dot product with 'big data science' just because it has the word 'big' four times. But intuitively, 'big data science' and 'science big data' should be as similar as possible, since they're permutations of the same phrase.

`python
'big big big big data' has a large dot product with 'big data science' just because it has the word 'big' four times. But intuitively, 'big data science' and 'science big data' should be as similar as possible, since they're permutations of the same phrase.
`

'big big big big data' has a large dot product with 'big data science' just because it has the word 'big' four times. But intuitively, 'big data science' and 'science big data' should be as similar as possible, since they're permutations of the same phrase.

`python

`

So, make sure to compute the cosine similarity – don't just use the dot product!

`python
So, make sure to compute the cosine similarity – don't just use the dot product!
`

So, make sure to compute the cosine similarity – don't just use the dot product!

`python
So, make sure to compute the cosine similarity – don't just use the dot product!
`

So, make sure to compute the cosine similarity – don't just use the dot product!

`python

`

Note: Sometimes, you will see the cosine distance being used. It is the complement of cosine similarity:
$$\text{dist}(\vec{a}, \vec{b}) = 1 - \cos \theta$$
If $\text{dist}(\vec{a}, \vec{b})$ is small, the two word vectors are similar.

`python
Note: Sometimes, you will see the cosine distance being used. It is the complement of cosine similarity:
$$\text{dist}(\vec{a}, \vec{b}) = 1 - \cos \theta$$
If $\text{dist}(\vec{a}, \vec{b})$ is small, the two word vectors are similar.
`

Note: Sometimes, you will see the cosine distance being used. It is the complement of cosine similarity:
$$\text{dist}(\vec{a}, \vec{b}) = 1 - \cos \theta$$
If $\text{dist}(\vec{a}, \vec{b})$ is small, the two word vectors are similar.

`python
Note: Sometimes, you will see the cosine distance being used. It is the complement of cosine similarity:
$$\text{dist}(\vec{a}, \vec{b}) = 1 - \cos \theta$$
If $\text{dist}(\vec{a}, \vec{b})$ is small, the two word vectors are similar.
`

Note: Sometimes, you will see the cosine distance being used. It is the complement of cosine similarity:
$$\text{dist}(\vec{a}, \vec{b}) = 1 - \cos \theta$$
If $\text{dist}(\vec{a}, \vec{b})$ is small, the two word vectors are similar.

`python

`

A recipe for computing similarities¶Given a set of documents, to find the most similar text to one document $d$ in particular:

`python
A recipe for computing similarities¶Given a set of documents, to find the most similar text to one document $d$ in particular:
`

A recipe for computing similarities¶Given a set of documents, to find the most similar text to one document $d$ in particular:

`python
A recipe for computing similarities¶Given a set of documents, to find the most similar text to one document $d$ in particular:
`

A recipe for computing similarities¶Given a set of documents, to find the most similar text to one document $d$ in particular:

`python

`

Use the bag of words model to create a counts matrix, in which:
there is 1 row per document,
there is 1 column per unique word that is used across documents, and
the value in row doc and column word is the number of occurrences of word in doc.

`python
Use the bag of words model to create a counts matrix, in which:
there is 1 row per document,
there is 1 column per unique word that is used across documents, and
the value in row doc and column word is the number of occurrences of word in doc.
`

Use the bag of words model to create a counts matrix, in which:
there is 1 row per document,
there is 1 column per unique word that is used across documents, and
the value in row doc and column word is the number of occurrences of word in doc.

`python
Use the bag of words model to create a counts matrix, in which:
there is 1 row per document,
there is 1 column per unique word that is used across documents, and
the value in row doc and column word is the number of occurrences of word in doc.
`

Use the bag of words model to create a counts matrix, in which:
there is 1 row per document,
there is 1 column per unique word that is used across documents, and
the value in row doc and column word is the number of occurrences of word in doc.

`python

`

Compute the cosine similarity between $d$'s row vector and all other documents' row vectors.

`python
Compute the cosine similarity between $d$'s row vector and all other documents' row vectors.
`

Compute the cosine similarity between $d$'s row vector and all other documents' row vectors.

`python
Compute the cosine similarity between $d$'s row vector and all other documents' row vectors.
`

Compute the cosine similarity between $d$'s row vector and all other documents' row vectors.

`python

`

The other document with the greatest cosine similarity is the most similar, under the bag of words model.

`python
The other document with the greatest cosine similarity is the most similar, under the bag of words model.
`

The other document with the greatest cosine similarity is the most similar, under the bag of words model.

`python
The other document with the greatest cosine similarity is the most similar, under the bag of words model.
`

The other document with the greatest cosine similarity is the most similar, under the bag of words model.

`python

`

Example: Global warming 🌎¶Consider the following three documents.

`python
Example: Global warming 🌎¶Consider the following three documents.
`

Example: Global warming 🌎¶Consider the following three documents.

`python
Example: Global warming 🌎¶Consider the following three documents.
`

Example: Global warming 🌎¶Consider the following three documents.

`python

`

`python
In [29]:


sentences = pd.Series([
    'I really really want global peace',
    'I must enjoy global warming',
    'We must solve climate change'
])

sentences
`

Output:
Out[29]:

0    I really really want global peace
1          I must enjoy global warming
2         We must solve climate change
dtype: object

`python
In [29]:


sentences = pd.Series([
    'I really really want global peace',
    'I must enjoy global warming',
    'We must solve climate change'
])

sentences
`

`python
In [29]:
`

Output:
Out[29]:

0    I really really want global peace
1          I must enjoy global warming
2         We must solve climate change
dtype: object

Output:
Out[29]:

0    I really really want global peace
1          I must enjoy global warming
2         We must solve climate change
dtype: object

Let's represent each document using the bag of words model.

`python
Let's represent each document using the bag of words model.
`

Let's represent each document using the bag of words model.

`python
Let's represent each document using the bag of words model.
`

Let's represent each document using the bag of words model.

`python

`

`python
In [30]:


unique_words = sentences.str.split().explode().value_counts()
unique_words
`

Output:
Out[30]:

I          2
really     2
global     2
          ..
solve      1
climate    1
change     1
Name: count, Length: 12, dtype: int64

`python
In [30]:


unique_words = sentences.str.split().explode().value_counts()
unique_words
`

`python
In [30]:
`

Output:
Out[30]:

I          2
really     2
global     2
          ..
solve      1
climate    1
change     1
Name: count, Length: 12, dtype: int64

Output:
Out[30]:

I          2
really     2
global     2
          ..
solve      1
climate    1
change     1
Name: count, Length: 12, dtype: int64

`python
In [31]:


counts_dict = {}
for word in unique_words.index:
    re_pat = fr'\b{word}\b'
    counts_dict[word] = sentences.str.count(re_pat)
    
counts_df = pd.DataFrame(counts_dict).set_index(sentences)
`

`python
In [31]:
`

`python
In [32]:


counts_df
`

Output:
Out[32]:







I
really
global
must
...
We
solve
climate
change




I really really want global peace
1
2
1
0
...
0
0
0
0


I must enjoy global warming
1
0
1
1
...
0
0
0
0


We must solve climate change
0
0
0
1
...
1
1
1
1



3 rows × 12 columns

`python
In [32]:


counts_df
`

`python
In [32]:
`

Output:
Out[32]:







I
really
global
must
...
We
solve
climate
change




I really really want global peace
1
2
1
0
...
0
0
0
0


I must enjoy global warming
1
0
1
1
...
0
0
0
0


We must solve climate change
0
0
0
1
...
1
1
1
1



3 rows × 12 columns

Output:
Out[32]:







I
really
global
must
...
We
solve
climate
change




I really really want global peace
1
2
1
0
...
0
0
0
0


I must enjoy global warming
1
0
1
1
...
0
0
0
0


We must solve climate change
0
0
0
1
...
1
1
1
1



3 rows × 12 columns

Let's now find the cosine similarity between each pair of documents.

`python
Let's now find the cosine similarity between each pair of documents.
`

Let's now find the cosine similarity between each pair of documents.

`python
Let's now find the cosine similarity between each pair of documents.
`

Let's now find the cosine similarity between each pair of documents.

`python

`

`python
In [33]:


counts_df
`

Output:
Out[33]:







I
really
global
must
...
We
solve
climate
change




I really really want global peace
1
2
1
0
...
0
0
0
0


I must enjoy global warming
1
0
1
1
...
0
0
0
0


We must solve climate change
0
0
0
1
...
1
1
1
1



3 rows × 12 columns

`python
In [33]:


counts_df
`

`python
In [33]:
`

Output:
Out[33]:







I
really
global
must
...
We
solve
climate
change




I really really want global peace
1
2
1
0
...
0
0
0
0


I must enjoy global warming
1
0
1
1
...
0
0
0
0


We must solve climate change
0
0
0
1
...
1
1
1
1



3 rows × 12 columns

Output:
Out[33]:







I
really
global
must
...
We
solve
climate
change




I really really want global peace
1
2
1
0
...
0
0
0
0


I must enjoy global warming
1
0
1
1
...
0
0
0
0


We must solve climate change
0
0
0
1
...
1
1
1
1



3 rows × 12 columns

`python
In [34]:


def sim_pair(s1, s2):
    return np.dot(s1, s2) / (np.linalg.norm(s1) * np.linalg.norm(s2))
`

`python
In [34]:
`

`python
In [35]:


# Look at the documentation of the .corr method to see how this works!
counts_df.T.corr(sim_pair)
`

Output:
Out[35]:







I really really want global peace
I must enjoy global warming
We must solve climate change




I really really want global peace
1.00
0.32
0.0


I must enjoy global warming
0.32
1.00
0.2


We must solve climate change
0.00
0.20
1.0

`python
In [35]:


# Look at the documentation of the .corr method to see how this works!
counts_df.T.corr(sim_pair)
`

`python
In [35]:
`

Output:
Out[35]:







I really really want global peace
I must enjoy global warming
We must solve climate change




I really really want global peace
1.00
0.32
0.0


I must enjoy global warming
0.32
1.00
0.2


We must solve climate change
0.00
0.20
1.0

Output:
Out[35]:







I really really want global peace
I must enjoy global warming
We must solve climate change




I really really want global peace
1.00
0.32
0.0


I must enjoy global warming
0.32
1.00
0.2


We must solve climate change
0.00
0.20
1.0

Issue: Bag of words only encodes the words that each document uses, not their meanings.

"I really really want global peace" and "We must solve climate change" have similar meanings, but have no shared words, and thus a low cosine similarity.
"I really really want global peace" and "I must enjoy global warming" have very different meanings, but a relatively high cosine similarity.

`python
Issue: Bag of words only encodes the words that each document uses, not their meanings.

"I really really want global peace" and "We must solve climate change" have similar meanings, but have no shared words, and thus a low cosine similarity.
"I really really want global peace" and "I must enjoy global warming" have very different meanings, but a relatively high cosine similarity.
`

Issue: Bag of words only encodes the words that each document uses, not their meanings.

"I really really want global peace" and "We must solve climate change" have similar meanings, but have no shared words, and thus a low cosine similarity.
"I really really want global peace" and "I must enjoy global warming" have very different meanings, but a relatively high cosine similarity.

`python
Issue: Bag of words only encodes the words that each document uses, not their meanings.

"I really really want global peace" and "We must solve climate change" have similar meanings, but have no shared words, and thus a low cosine similarity.
"I really really want global peace" and "I must enjoy global warming" have very different meanings, but a relatively high cosine similarity.
`

Issue: Bag of words only encodes the words that each document uses, not their meanings.

"I really really want global peace" and "We must solve climate change" have similar meanings, but have no shared words, and thus a low cosine similarity.
"I really really want global peace" and "I must enjoy global warming" have very different meanings, but a relatively high cosine similarity.

`python

`

Pitfalls of the bag of words model¶Remember, the key assumption underlying the bag of words model is that two documents are similar if they share many words in common.

`python
Pitfalls of the bag of words model¶Remember, the key assumption underlying the bag of words model is that two documents are similar if they share many words in common.
`

Pitfalls of the bag of words model¶Remember, the key assumption underlying the bag of words model is that two documents are similar if they share many words in common.

`python
Pitfalls of the bag of words model¶Remember, the key assumption underlying the bag of words model is that two documents are similar if they share many words in common.
`

Pitfalls of the bag of words model¶Remember, the key assumption underlying the bag of words model is that two documents are similar if they share many words in common.

`python

`

The bag of words model doesn't consider order.
The job titles 'deputy fire chief' and 'chief fire deputy' are treated as the same.

`python
The bag of words model doesn't consider order.
The job titles 'deputy fire chief' and 'chief fire deputy' are treated as the same.
`

The bag of words model doesn't consider order.
The job titles 'deputy fire chief' and 'chief fire deputy' are treated as the same.

`python
The bag of words model doesn't consider order.
The job titles 'deputy fire chief' and 'chief fire deputy' are treated as the same.
`

The bag of words model doesn't consider order.
The job titles 'deputy fire chief' and 'chief fire deputy' are treated as the same.

`python

`

The bag of words model doesn't consider the meaning of words.
'I love data science' and 'I hate data science' share 75% of their words, but have very different meanings.

`python
The bag of words model doesn't consider the meaning of words.
'I love data science' and 'I hate data science' share 75% of their words, but have very different meanings.
`

The bag of words model doesn't consider the meaning of words.
'I love data science' and 'I hate data science' share 75% of their words, but have very different meanings.

`python
The bag of words model doesn't consider the meaning of words.
'I love data science' and 'I hate data science' share 75% of their words, but have very different meanings.
`

The bag of words model doesn't consider the meaning of words.
'I love data science' and 'I hate data science' share 75% of their words, but have very different meanings.

`python

`

The bag of words model treats all words as being equally important.
'deputy' and 'fire' have the same importance, even though 'fire' is probably more important in describing someone's job title.
Let's address this point.

`python
The bag of words model treats all words as being equally important.
'deputy' and 'fire' have the same importance, even though 'fire' is probably more important in describing someone's job title.
Let's address this point.
`

The bag of words model treats all words as being equally important.
'deputy' and 'fire' have the same importance, even though 'fire' is probably more important in describing someone's job title.
Let's address this point.

`python
The bag of words model treats all words as being equally important.
'deputy' and 'fire' have the same importance, even though 'fire' is probably more important in describing someone's job title.
Let's address this point.
`

The bag of words model treats all words as being equally important.
'deputy' and 'fire' have the same importance, even though 'fire' is probably more important in describing someone's job title.
Let's address this point.

`python

`

TF-IDF¶

`python
TF-IDF¶
`

TF-IDF¶

`python
TF-IDF¶
`

TF-IDF¶

`python

`

The importance of words¶Issue: The bag of words model doesn't know which words are "important" in a document. Consider the following document:
"at the last game, the team scored basket after basket"
How do we determine which words are important?

Repetition of words indicates importance, but
the most common words ("the", "of", "at") often don't have much meaning!

Goal: Find a way of quantifying the importance of a word in a document by balancing the above two factors, i.e. find the word that best summarizes a document.

`python
The importance of words¶Issue: The bag of words model doesn't know which words are "important" in a document. Consider the following document:
"at the last game, the team scored basket after basket"
How do we determine which words are important?

Repetition of words indicates importance, but
the most common words ("the", "of", "at") often don't have much meaning!

Goal: Find a way of quantifying the importance of a word in a document by balancing the above two factors, i.e. find the word that best summarizes a document.
`

The importance of words¶Issue: The bag of words model doesn't know which words are "important" in a document. Consider the following document:
"at the last game, the team scored basket after basket"
How do we determine which words are important?

Repetition of words indicates importance, but
the most common words ("the", "of", "at") often don't have much meaning!

Goal: Find a way of quantifying the importance of a word in a document by balancing the above two factors, i.e. find the word that best summarizes a document.

`python
The importance of words¶Issue: The bag of words model doesn't know which words are "important" in a document. Consider the following document:
"at the last game, the team scored basket after basket"
How do we determine which words are important?

Repetition of words indicates importance, but
the most common words ("the", "of", "at") often don't have much meaning!

Goal: Find a way of quantifying the importance of a word in a document by balancing the above two factors, i.e. find the word that best summarizes a document.
`

The importance of words¶Issue: The bag of words model doesn't know which words are "important" in a document. Consider the following document:
"at the last game, the team scored basket after basket"
How do we determine which words are important?

Repetition of words indicates importance, but
the most common words ("the", "of", "at") often don't have much meaning!

Goal: Find a way of quantifying the importance of a word in a document by balancing the above two factors, i.e. find the word that best summarizes a document.

`python

`

Term frequency¶

`python
Term frequency¶
`

Term frequency¶

`python
Term frequency¶
`

Term frequency¶

`python

`

The term frequency of a word (term) $t$ in a document $d$, denoted $\text{tf}(t, d)$ is the proportion of words in document $d$ that are equal to $t$.

$$
\text{tf}(t, d)= \frac{\text{\# of occurrences of $t$ in $d$}}{\text{total \# of words in $d$}}
$$

`python
The term frequency of a word (term) $t$ in a document $d$, denoted $\text{tf}(t, d)$ is the proportion of words in document $d$ that are equal to $t$.

$$
\text{tf}(t, d)= \frac{\text{\# of occurrences of $t$ in $d$}}{\text{total \# of words in $d$}}
$$
`

The term frequency of a word (term) $t$ in a document $d$, denoted $\text{tf}(t, d)$ is the proportion of words in document $d$ that are equal to $t$.

$$
\text{tf}(t, d)= \frac{\text{\# of occurrences of $t$ in $d$}}{\text{total \# of words in $d$}}
$$

`python
The term frequency of a word (term) $t$ in a document $d$, denoted $\text{tf}(t, d)$ is the proportion of words in document $d$ that are equal to $t$.

$$
\text{tf}(t, d)= \frac{\text{\# of occurrences of $t$ in $d$}}{\text{total \# of words in $d$}}
$$
`

The term frequency of a word (term) $t$ in a document $d$, denoted $\text{tf}(t, d)$ is the proportion of words in document $d$ that are equal to $t$.

$$
\text{tf}(t, d)= \frac{\text{\# of occurrences of $t$ in $d$}}{\text{total \# of words in $d$}}
$$

`python

`

Example: What is the term frequency of "basket" in the following document?

"at the last game, the team scored basket after basket"

Answer: $\frac{2}{10} = \frac15$.

Intuition: Words that occur often within a document are important to the document's meaning.

If $\text{tf}(t, d)$ is large, then word $t$ occurs often in $d$.
If $\text{tf}(t, d)$ is small, then word $t$ does not occur often $d$.

`python
Example: What is the term frequency of "basket" in the following document?

"at the last game, the team scored basket after basket"

Answer: $\frac{2}{10} = \frac15$.

Intuition: Words that occur often within a document are important to the document's meaning.

If $\text{tf}(t, d)$ is large, then word $t$ occurs often in $d$.
If $\text{tf}(t, d)$ is small, then word $t$ does not occur often $d$.
`

Example: What is the term frequency of "basket" in the following document?

"at the last game, the team scored basket after basket"

Answer: $\frac{2}{10} = \frac15$.

Intuition: Words that occur often within a document are important to the document's meaning.

If $\text{tf}(t, d)$ is large, then word $t$ occurs often in $d$.
If $\text{tf}(t, d)$ is small, then word $t$ does not occur often $d$.

`python
Example: What is the term frequency of "basket" in the following document?

"at the last game, the team scored basket after basket"

Answer: $\frac{2}{10} = \frac15$.

Intuition: Words that occur often within a document are important to the document's meaning.

If $\text{tf}(t, d)$ is large, then word $t$ occurs often in $d$.
If $\text{tf}(t, d)$ is small, then word $t$ does not occur often $d$.
`

Example: What is the term frequency of "basket" in the following document?

"at the last game, the team scored basket after basket"

Answer: $\frac{2}{10} = \frac15$.

Intuition: Words that occur often within a document are important to the document's meaning.

If $\text{tf}(t, d)$ is large, then word $t$ occurs often in $d$.
If $\text{tf}(t, d)$ is small, then word $t$ does not occur often $d$.

`python

`

Issue: "the" also has a TF of $\frac15$, but it seems less important than "basket".

`python
Issue: "the" also has a TF of $\frac15$, but it seems less important than "basket".
`

Issue: "the" also has a TF of $\frac15$, but it seems less important than "basket".

`python
Issue: "the" also has a TF of $\frac15$, but it seems less important than "basket".
`

Issue: "the" also has a TF of $\frac15$, but it seems less important than "basket".

`python

`

Inverse document frequency¶

`python
Inverse document frequency¶
`

Inverse document frequency¶

`python
Inverse document frequency¶
`

Inverse document frequency¶

`python

`

The inverse document frequency of a word $t$ in a set of documents $d_1, d_2, ...$ is

$$\text{idf}(t) = \log \left(\frac{\text{total \# of documents}}{\text{\# of documents in which $t$ appears}} \right)$$

`python
The inverse document frequency of a word $t$ in a set of documents $d_1, d_2, ...$ is

$$\text{idf}(t) = \log \left(\frac{\text{total \# of documents}}{\text{\# of documents in which $t$ appears}} \right)$$
`

The inverse document frequency of a word $t$ in a set of documents $d_1, d_2, ...$ is

$$\text{idf}(t) = \log \left(\frac{\text{total \# of documents}}{\text{\# of documents in which $t$ appears}} \right)$$

`python
The inverse document frequency of a word $t$ in a set of documents $d_1, d_2, ...$ is

$$\text{idf}(t) = \log \left(\frac{\text{total \# of documents}}{\text{\# of documents in which $t$ appears}} \right)$$
`

The inverse document frequency of a word $t$ in a set of documents $d_1, d_2, ...$ is

$$\text{idf}(t) = \log \left(\frac{\text{total \# of documents}}{\text{\# of documents in which $t$ appears}} \right)$$

`python

`

Example: What is the inverse document frequency of "basket" in the following three documents?
"at the last game, the team scored basket after basket"
"our team is on fire"
"they only missed one basket"

`python
Example: What is the inverse document frequency of "basket" in the following three documents?
"at the last game, the team scored basket after basket"
"our team is on fire"
"they only missed one basket"
`

Example: What is the inverse document frequency of "basket" in the following three documents?
"at the last game, the team scored basket after basket"
"our team is on fire"
"they only missed one basket"

`python
Example: What is the inverse document frequency of "basket" in the following three documents?
"at the last game, the team scored basket after basket"
"our team is on fire"
"they only missed one basket"
`

Example: What is the inverse document frequency of "basket" in the following three documents?
"at the last game, the team scored basket after basket"
"our team is on fire"
"they only missed one basket"

`python

`

Answer: $\log \left(\frac{3}{2}\right) \approx 0.4055$.

`python
Answer: $\log \left(\frac{3}{2}\right) \approx 0.4055$.
`

Answer: $\log \left(\frac{3}{2}\right) \approx 0.4055$.

`python
Answer: $\log \left(\frac{3}{2}\right) \approx 0.4055$.
`

Answer: $\log \left(\frac{3}{2}\right) \approx 0.4055$.

`python

`

Intuition: If a word appears in every document (like "the", "of", "at"), it is probably not a good summary of any one document.
If $\text{idf}(t)$ is large, then $t$ is rarely found in documents.
If $\text{idf}(t)$ is small, then $t$ is commonly found in documents.
Think of $\text{idf}(t)$ as the "rarity factor" of $t$ across documents – the larger $\text{idf}(t)$ is, the more rare $t$ is.

`python
Intuition: If a word appears in every document (like "the", "of", "at"), it is probably not a good summary of any one document.
If $\text{idf}(t)$ is large, then $t$ is rarely found in documents.
If $\text{idf}(t)$ is small, then $t$ is commonly found in documents.
Think of $\text{idf}(t)$ as the "rarity factor" of $t$ across documents – the larger $\text{idf}(t)$ is, the more rare $t$ is.
`

Intuition: If a word appears in every document (like "the", "of", "at"), it is probably not a good summary of any one document.
If $\text{idf}(t)$ is large, then $t$ is rarely found in documents.
If $\text{idf}(t)$ is small, then $t$ is commonly found in documents.
Think of $\text{idf}(t)$ as the "rarity factor" of $t$ across documents – the larger $\text{idf}(t)$ is, the more rare $t$ is.

`python
Intuition: If a word appears in every document (like "the", "of", "at"), it is probably not a good summary of any one document.
If $\text{idf}(t)$ is large, then $t$ is rarely found in documents.
If $\text{idf}(t)$ is small, then $t$ is commonly found in documents.
Think of $\text{idf}(t)$ as the "rarity factor" of $t$ across documents – the larger $\text{idf}(t)$ is, the more rare $t$ is.
`

Intuition: If a word appears in every document (like "the", "of", "at"), it is probably not a good summary of any one document.
If $\text{idf}(t)$ is large, then $t$ is rarely found in documents.
If $\text{idf}(t)$ is small, then $t$ is commonly found in documents.
Think of $\text{idf}(t)$ as the "rarity factor" of $t$ across documents – the larger $\text{idf}(t)$ is, the more rare $t$ is.

`python

`

Intuition¶$$\text{tf}(t, d) = \frac{\text{\# of occurrences of $t$ in $d$}}{\text{total \# of words in $d$}}$$
$$\text{idf}(t) = \log \left(\frac{\text{total \# of documents}}{\text{\# of documents in which $t$ appears}} \right)$$
Goal: Quantify how well word $t$ summarizes document $d$.

`python
Intuition¶$$\text{tf}(t, d) = \frac{\text{\# of occurrences of $t$ in $d$}}{\text{total \# of words in $d$}}$$
$$\text{idf}(t) = \log \left(\frac{\text{total \# of documents}}{\text{\# of documents in which $t$ appears}} \right)$$
Goal: Quantify how well word $t$ summarizes document $d$.
`

Intuition¶$$\text{tf}(t, d) = \frac{\text{\# of occurrences of $t$ in $d$}}{\text{total \# of words in $d$}}$$
$$\text{idf}(t) = \log \left(\frac{\text{total \# of documents}}{\text{\# of documents in which $t$ appears}} \right)$$
Goal: Quantify how well word $t$ summarizes document $d$.

`python
Intuition¶$$\text{tf}(t, d) = \frac{\text{\# of occurrences of $t$ in $d$}}{\text{total \# of words in $d$}}$$
$$\text{idf}(t) = \log \left(\frac{\text{total \# of documents}}{\text{\# of documents in which $t$ appears}} \right)$$
Goal: Quantify how well word $t$ summarizes document $d$.
`

Intuition¶$$\text{tf}(t, d) = \frac{\text{\# of occurrences of $t$ in $d$}}{\text{total \# of words in $d$}}$$
$$\text{idf}(t) = \log \left(\frac{\text{total \# of documents}}{\text{\# of documents in which $t$ appears}} \right)$$
Goal: Quantify how well word $t$ summarizes document $d$.

`python

`

If $\text{tf}(t, d)$ is small, then $t$ doesn't occur very often in $d$, so $t$ can't be a good summary of $d$.

`python
If $\text{tf}(t, d)$ is small, then $t$ doesn't occur very often in $d$, so $t$ can't be a good summary of $d$.
`

If $\text{tf}(t, d)$ is small, then $t$ doesn't occur very often in $d$, so $t$ can't be a good summary of $d$.

`python
If $\text{tf}(t, d)$ is small, then $t$ doesn't occur very often in $d$, so $t$ can't be a good summary of $d$.
`

If $\text{tf}(t, d)$ is small, then $t$ doesn't occur very often in $d$, so $t$ can't be a good summary of $d$.

`python

`

If $\text{idf}(t)$ is small, then $t$ occurs often amongst all documents, and so it is not a good summary of any one document.

`python
If $\text{idf}(t)$ is small, then $t$ occurs often amongst all documents, and so it is not a good summary of any one document.
`

If $\text{idf}(t)$ is small, then $t$ occurs often amongst all documents, and so it is not a good summary of any one document.

`python
If $\text{idf}(t)$ is small, then $t$ occurs often amongst all documents, and so it is not a good summary of any one document.
`

If $\text{idf}(t)$ is small, then $t$ occurs often amongst all documents, and so it is not a good summary of any one document.

`python

`

If $\text{tf}(t, d)$ and $\text{idf}(t)$ are both large, then $t$ occurs often in $d$ but rarely overall. This makes $t$ a good summary of document $d$.

`python
If $\text{tf}(t, d)$ and $\text{idf}(t)$ are both large, then $t$ occurs often in $d$ but rarely overall. This makes $t$ a good summary of document $d$.
`

If $\text{tf}(t, d)$ and $\text{idf}(t)$ are both large, then $t$ occurs often in $d$ but rarely overall. This makes $t$ a good summary of document $d$.

`python
If $\text{tf}(t, d)$ and $\text{idf}(t)$ are both large, then $t$ occurs often in $d$ but rarely overall. This makes $t$ a good summary of document $d$.
`

If $\text{tf}(t, d)$ and $\text{idf}(t)$ are both large, then $t$ occurs often in $d$ but rarely overall. This makes $t$ a good summary of document $d$.

`python

`

Term frequency-inverse document frequency¶The term frequency-inverse document frequency (TF-IDF) of word $t$ in document $d$ is the product:
$$
\begin{align*}
\text{tfidf}(t, d) &=
    \text{tf}(t, d) \cdot \text{idf}(t) \\\
    &= \frac{\text{\# of occurrences of $t$ in $d$}}{\text{total \# of words in $d$}}
        \cdot \log \left(\frac{\text{total \# of documents}}{\text{\# of documents in which $t$ appears}} \right)
\end{align*}
$$

`python
Term frequency-inverse document frequency¶The term frequency-inverse document frequency (TF-IDF) of word $t$ in document $d$ is the product:
$$
\begin{align*}
\text{tfidf}(t, d) &=
    \text{tf}(t, d) \cdot \text{idf}(t) \\\
    &= \frac{\text{\# of occurrences of $t$ in $d$}}{\text{total \# of words in $d$}}
        \cdot \log \left(\frac{\text{total \# of documents}}{\text{\# of documents in which $t$ appears}} \right)
\end{align*}
$$
`

Term frequency-inverse document frequency¶The term frequency-inverse document frequency (TF-IDF) of word $t$ in document $d$ is the product:
$$
\begin{align*}
\text{tfidf}(t, d) &=
    \text{tf}(t, d) \cdot \text{idf}(t) \\\
    &= \frac{\text{\# of occurrences of $t$ in $d$}}{\text{total \# of words in $d$}}
        \cdot \log \left(\frac{\text{total \# of documents}}{\text{\# of documents in which $t$ appears}} \right)
\end{align*}
$$

`python
Term frequency-inverse document frequency¶The term frequency-inverse document frequency (TF-IDF) of word $t$ in document $d$ is the product:
$$
\begin{align*}
\text{tfidf}(t, d) &=
    \text{tf}(t, d) \cdot \text{idf}(t) \\\
    &= \frac{\text{\# of occurrences of $t$ in $d$}}{\text{total \# of words in $d$}}
        \cdot \log \left(\frac{\text{total \# of documents}}{\text{\# of documents in which $t$ appears}} \right)
\end{align*}
$$
`

Term frequency-inverse document frequency¶The term frequency-inverse document frequency (TF-IDF) of word $t$ in document $d$ is the product:
$$
\begin{align*}
\text{tfidf}(t, d) &=
    \text{tf}(t, d) \cdot \text{idf}(t) \\\
    &= \frac{\text{\# of occurrences of $t$ in $d$}}{\text{total \# of words in $d$}}
        \cdot \log \left(\frac{\text{total \# of documents}}{\text{\# of documents in which $t$ appears}} \right)
\end{align*}
$$

`python

`

If $\text{tfidf}(t, d)$ is large, then $t$ is a good summary of $d$, because $t$ occurs often in $d$ but rarely across all documents.

`python
If $\text{tfidf}(t, d)$ is large, then $t$ is a good summary of $d$, because $t$ occurs often in $d$ but rarely across all documents.
`

If $\text{tfidf}(t, d)$ is large, then $t$ is a good summary of $d$, because $t$ occurs often in $d$ but rarely across all documents.

`python
If $\text{tfidf}(t, d)$ is large, then $t$ is a good summary of $d$, because $t$ occurs often in $d$ but rarely across all documents.
`

If $\text{tfidf}(t, d)$ is large, then $t$ is a good summary of $d$, because $t$ occurs often in $d$ but rarely across all documents.

`python

`

TF-IDF is a heuristic – it has no probabilistic justification.

`python
TF-IDF is a heuristic – it has no probabilistic justification.
`

TF-IDF is a heuristic – it has no probabilistic justification.

`python
TF-IDF is a heuristic – it has no probabilistic justification.
`

TF-IDF is a heuristic – it has no probabilistic justification.

`python

`

To know if $\text{tfidf}(t, d)$ is large for one particular word $t$, we need to compare it to $\text{tfidf}(t_i, d)$, for several different words $t_i$.

`python
To know if $\text{tfidf}(t, d)$ is large for one particular word $t$, we need to compare it to $\text{tfidf}(t_i, d)$, for several different words $t_i$.
`

To know if $\text{tfidf}(t, d)$ is large for one particular word $t$, we need to compare it to $\text{tfidf}(t_i, d)$, for several different words $t_i$.

`python
To know if $\text{tfidf}(t, d)$ is large for one particular word $t$, we need to compare it to $\text{tfidf}(t_i, d)$, for several different words $t_i$.
`

To know if $\text{tfidf}(t, d)$ is large for one particular word $t$, we need to compare it to $\text{tfidf}(t_i, d)$, for several different words $t_i$.

`python

`

Computing TF-IDF¶Question: What is the TF-IDF of "global" in the second sentence?

`python
Computing TF-IDF¶Question: What is the TF-IDF of "global" in the second sentence?
`

Computing TF-IDF¶Question: What is the TF-IDF of "global" in the second sentence?

`python
Computing TF-IDF¶Question: What is the TF-IDF of "global" in the second sentence?
`

Computing TF-IDF¶Question: What is the TF-IDF of "global" in the second sentence?

`python

`

`python
In [36]:


sentences
`

Output:
Out[36]:

0    I really really want global peace
1          I must enjoy global warming
2         We must solve climate change
dtype: object

`python
In [36]:


sentences
`

`python
In [36]:
`

Output:
Out[36]:

0    I really really want global peace
1          I must enjoy global warming
2         We must solve climate change
dtype: object

Output:
Out[36]:

0    I really really want global peace
1          I must enjoy global warming
2         We must solve climate change
dtype: object

Answer:

`python
Answer:
`

Answer:

`python
Answer:
`

Answer:

`python

`

`python
In [37]:


tf = sentences.iloc[1].count('global') / len(sentences.iloc[1].split())
tf
`

Output:
Out[37]:

0.2

`python
In [37]:


tf = sentences.iloc[1].count('global') / len(sentences.iloc[1].split())
tf
`

`python
In [37]:
`

Output:
Out[37]:

0.2

Output:
Out[37]:

0.2

`python
In [38]:


idf = np.log(len(sentences) / sentences.str.contains('global').sum())
idf
`

Output:
Out[38]:

0.4054651081081644

`python
In [38]:


idf = np.log(len(sentences) / sentences.str.contains('global').sum())
idf
`

`python
In [38]:
`

Output:
Out[38]:

0.4054651081081644

Output:
Out[38]:

0.4054651081081644

`python
In [39]:


tf * idf
`

Output:
Out[39]:

0.08109302162163289

`python
In [39]:


tf * idf
`

`python
In [39]:
`

Output:
Out[39]:

0.08109302162163289

Output:
Out[39]:

0.08109302162163289

Question: Is this big or small? Is "global" the best summary of the second sentence?

`python
Question: Is this big or small? Is "global" the best summary of the second sentence?
`

Question: Is this big or small? Is "global" the best summary of the second sentence?

`python
Question: Is this big or small? Is "global" the best summary of the second sentence?
`

Question: Is this big or small? Is "global" the best summary of the second sentence?

`python

`

TF-IDF of all words in all documents¶On its own, the TF-IDF of a word in a document doesn't really tell us anything; we must compare it to TF-IDFs of other words in that same document.

`python
TF-IDF of all words in all documents¶On its own, the TF-IDF of a word in a document doesn't really tell us anything; we must compare it to TF-IDFs of other words in that same document.
`

TF-IDF of all words in all documents¶On its own, the TF-IDF of a word in a document doesn't really tell us anything; we must compare it to TF-IDFs of other words in that same document.

`python
TF-IDF of all words in all documents¶On its own, the TF-IDF of a word in a document doesn't really tell us anything; we must compare it to TF-IDFs of other words in that same document.
`

TF-IDF of all words in all documents¶On its own, the TF-IDF of a word in a document doesn't really tell us anything; we must compare it to TF-IDFs of other words in that same document.

`python

`

`python
In [40]:


sentences
`

Output:
Out[40]:

0    I really really want global peace
1          I must enjoy global warming
2         We must solve climate change
dtype: object

`python
In [40]:


sentences
`

`python
In [40]:
`

Output:
Out[40]:

0    I really really want global peace
1          I must enjoy global warming
2         We must solve climate change
dtype: object

Output:
Out[40]:

0    I really really want global peace
1          I must enjoy global warming
2         We must solve climate change
dtype: object

`python
In [41]:


unique_words = np.unique(sentences.str.split().explode())
unique_words
`

Output:
Out[41]:

array(['I', 'We', 'change', 'climate', 'enjoy', 'global', 'must', 'peace',
       'really', 'solve', 'want', 'warming'], dtype=object)

`python
In [41]:


unique_words = np.unique(sentences.str.split().explode())
unique_words
`

`python
In [41]:
`

Output:
Out[41]:

array(['I', 'We', 'change', 'climate', 'enjoy', 'global', 'must', 'peace',
       'really', 'solve', 'want', 'warming'], dtype=object)

Output:
Out[41]:

array(['I', 'We', 'change', 'climate', 'enjoy', 'global', 'must', 'peace',
       'really', 'solve', 'want', 'warming'], dtype=object)

`python
In [42]:


tfidf_dict = {}

for word in unique_words:
    re_pat = fr'\b{word}\b'
    tf = sentences.str.count(re_pat) / sentences.str.split().str.len()
    idf = np.log(len(sentences) / sentences.str.contains(re_pat).sum())
    tfidf_dict[word] = tf * idf
    
tfidf = pd.DataFrame(tfidf_dict).set_index(sentences)
`

`python
In [42]:
`

`python
In [43]:


tfidf
`

Output:
Out[43]:







I
We
change
climate
...
really
solve
want
warming




I really really want global peace
0.07
0.00
0.00
0.00
...
0.37
0.00
0.18
0.00


I must enjoy global warming
0.08
0.00
0.00
0.00
...
0.00
0.00
0.00
0.22


We must solve climate change
0.00
0.22
0.22
0.22
...
0.00
0.22
0.00
0.00



3 rows × 12 columns

`python
In [43]:


tfidf
`

`python
In [43]:
`

Output:
Out[43]:







I
We
change
climate
...
really
solve
want
warming




I really really want global peace
0.07
0.00
0.00
0.00
...
0.37
0.00
0.18
0.00


I must enjoy global warming
0.08
0.00
0.00
0.00
...
0.00
0.00
0.00
0.22


We must solve climate change
0.00
0.22
0.22
0.22
...
0.00
0.22
0.00
0.00



3 rows × 12 columns

Output:
Out[43]:







I
We
change
climate
...
really
solve
want
warming




I really really want global peace
0.07
0.00
0.00
0.00
...
0.37
0.00
0.18
0.00


I must enjoy global warming
0.08
0.00
0.00
0.00
...
0.00
0.00
0.00
0.22


We must solve climate change
0.00
0.22
0.22
0.22
...
0.00
0.22
0.00
0.00



3 rows × 12 columns

Interpreting TF-IDFs¶

`python
Interpreting TF-IDFs¶
`

Interpreting TF-IDFs¶

`python
Interpreting TF-IDFs¶
`

Interpreting TF-IDFs¶

`python

`

`python
In [44]:


display_df(tfidf, cols=12)
`

Output:
I
We
change
climate
enjoy
global
must
peace
really
solve
want
warming




I really really want global peace
0.07
0.00
0.00
0.00
0.00
0.07
0.00
0.18
0.37
0.00
0.18
0.00


I must enjoy global warming
0.08
0.00
0.00
0.00
0.22
0.08
0.08
0.00
0.00
0.00
0.00
0.22


We must solve climate change
0.00
0.22
0.22
0.22
0.00
0.00
0.08
0.00
0.00
0.22
0.00
0.00

`python
In [44]:


display_df(tfidf, cols=12)
`

`python
In [44]:
`

Output:
I
We
change
climate
enjoy
global
must
peace
really
solve
want
warming




I really really want global peace
0.07
0.00
0.00
0.00
0.00
0.07
0.00
0.18
0.37
0.00
0.18
0.00


I must enjoy global warming
0.08
0.00
0.00
0.00
0.22
0.08
0.08
0.00
0.00
0.00
0.00
0.22


We must solve climate change
0.00
0.22
0.22
0.22
0.00
0.00
0.08
0.00
0.00
0.22
0.00
0.00

Output:
I
We
change
climate
enjoy
global
must
peace
really
solve
want
warming




I really really want global peace
0.07
0.00
0.00
0.00
0.00
0.07
0.00
0.18
0.37
0.00
0.18
0.00


I must enjoy global warming
0.08
0.00
0.00
0.00
0.22
0.08
0.08
0.00
0.00
0.00
0.00
0.22


We must solve climate change
0.00
0.22
0.22
0.22
0.00
0.00
0.08
0.00
0.00
0.22
0.00
0.00

The above DataFrame tells us that:

the TF-IDF of 'really' in the first sentence is $\approx$ 0.37,
the TF-IDF of 'climate' in the second sentence is 0.

`python
The above DataFrame tells us that:

the TF-IDF of 'really' in the first sentence is $\approx$ 0.37,
the TF-IDF of 'climate' in the second sentence is 0.
`

The above DataFrame tells us that:

the TF-IDF of 'really' in the first sentence is $\approx$ 0.37,
the TF-IDF of 'climate' in the second sentence is 0.

`python
The above DataFrame tells us that:

the TF-IDF of 'really' in the first sentence is $\approx$ 0.37,
the TF-IDF of 'climate' in the second sentence is 0.
`

The above DataFrame tells us that:

the TF-IDF of 'really' in the first sentence is $\approx$ 0.37,
the TF-IDF of 'climate' in the second sentence is 0.

`python

`

Note that there are two ways that $\text{tfidf}(t, d) = \text{tf}(t, d) \cdot \text{idf}(t)$ can be 0:

If $t$ appears in every document, because then $\text{idf}(t) = \log (\frac{\text{\# documents}}{\text{\# documents}}) = \log(1) = 0$.
If $t$ does not appear in document $d$, because then $\text{tf}(t, d) = \frac{0}{\text{len}(d)} = 0$.

`python
Note that there are two ways that $\text{tfidf}(t, d) = \text{tf}(t, d) \cdot \text{idf}(t)$ can be 0:

If $t$ appears in every document, because then $\text{idf}(t) = \log (\frac{\text{\# documents}}{\text{\# documents}}) = \log(1) = 0$.
If $t$ does not appear in document $d$, because then $\text{tf}(t, d) = \frac{0}{\text{len}(d)} = 0$.
`

Note that there are two ways that $\text{tfidf}(t, d) = \text{tf}(t, d) \cdot \text{idf}(t)$ can be 0:

If $t$ appears in every document, because then $\text{idf}(t) = \log (\frac{\text{\# documents}}{\text{\# documents}}) = \log(1) = 0$.
If $t$ does not appear in document $d$, because then $\text{tf}(t, d) = \frac{0}{\text{len}(d)} = 0$.

`python
Note that there are two ways that $\text{tfidf}(t, d) = \text{tf}(t, d) \cdot \text{idf}(t)$ can be 0:

If $t$ appears in every document, because then $\text{idf}(t) = \log (\frac{\text{\# documents}}{\text{\# documents}}) = \log(1) = 0$.
If $t$ does not appear in document $d$, because then $\text{tf}(t, d) = \frac{0}{\text{len}(d)} = 0$.
`

Note that there are two ways that $\text{tfidf}(t, d) = \text{tf}(t, d) \cdot \text{idf}(t)$ can be 0:

If $t$ appears in every document, because then $\text{idf}(t) = \log (\frac{\text{\# documents}}{\text{\# documents}}) = \log(1) = 0$.
If $t$ does not appear in document $d$, because then $\text{tf}(t, d) = \frac{0}{\text{len}(d)} = 0$.

`python

`

The word that best summarizes a document is the word with the highest TF-IDF for that document:

`python
The word that best summarizes a document is the word with the highest TF-IDF for that document:
`

The word that best summarizes a document is the word with the highest TF-IDF for that document:

`python
The word that best summarizes a document is the word with the highest TF-IDF for that document:
`

The word that best summarizes a document is the word with the highest TF-IDF for that document:

`python

`

`python
In [45]:


display_df(tfidf, cols=12)
`

Output:
I
We
change
climate
enjoy
global
must
peace
really
solve
want
warming




I really really want global peace
0.07
0.00
0.00
0.00
0.00
0.07
0.00
0.18
0.37
0.00
0.18
0.00


I must enjoy global warming
0.08
0.00
0.00
0.00
0.22
0.08
0.08
0.00
0.00
0.00
0.00
0.22


We must solve climate change
0.00
0.22
0.22
0.22
0.00
0.00
0.08
0.00
0.00
0.22
0.00
0.00

`python
In [45]:


display_df(tfidf, cols=12)
`

`python
In [45]:
`

Output:
I
We
change
climate
enjoy
global
must
peace
really
solve
want
warming




I really really want global peace
0.07
0.00
0.00
0.00
0.00
0.07
0.00
0.18
0.37
0.00
0.18
0.00


I must enjoy global warming
0.08
0.00
0.00
0.00
0.22
0.08
0.08
0.00
0.00
0.00
0.00
0.22


We must solve climate change
0.00
0.22
0.22
0.22
0.00
0.00
0.08
0.00
0.00
0.22
0.00
0.00

Output:
I
We
change
climate
enjoy
global
must
peace
really
solve
want
warming




I really really want global peace
0.07
0.00
0.00
0.00
0.00
0.07
0.00
0.18
0.37
0.00
0.18
0.00


I must enjoy global warming
0.08
0.00
0.00
0.00
0.22
0.08
0.08
0.00
0.00
0.00
0.00
0.22


We must solve climate change
0.00
0.22
0.22
0.22
0.00
0.00
0.08
0.00
0.00
0.22
0.00
0.00

`python
In [46]:


tfidf.idxmax(axis=1)
`

Output:
Out[46]:

I really really want global peace    really
I must enjoy global warming           enjoy
We must solve climate change             We
dtype: object

`python
In [46]:


tfidf.idxmax(axis=1)
`

`python
In [46]:
`

Output:
Out[46]:

I really really want global peace    really
I must enjoy global warming           enjoy
We must solve climate change             We
dtype: object

Output:
Out[46]:

I really really want global peace    really
I must enjoy global warming           enjoy
We must solve climate change             We
dtype: object

Look closely at the rows of tfidf – in documents 2 and 3, the max TF-IDF is not unique!

`python
Look closely at the rows of tfidf – in documents 2 and 3, the max TF-IDF is not unique!
`

Look closely at the rows of tfidf – in documents 2 and 3, the max TF-IDF is not unique!

`python
Look closely at the rows of tfidf – in documents 2 and 3, the max TF-IDF is not unique!
`

Look closely at the rows of tfidf – in documents 2 and 3, the max TF-IDF is not unique!

`python

`

Example: Presidential inaugural addresses 🎤¶

`python
Example: Presidential inaugural addresses 🎤¶
`

Example: Presidential inaugural addresses 🎤¶

`python
Example: Presidential inaugural addresses 🎤¶
`

Example: Presidential inaugural addresses 🎤¶

`python

`

Presidential inaugural addresses¶Every four years, on January 20th, the incoming (or re-elected) President delivers an inaugural address just after taking the oath of office, in which they often share their vision for the country.

`python
Presidential inaugural addresses¶Every four years, on January 20th, the incoming (or re-elected) President delivers an inaugural address just after taking the oath of office, in which they often share their vision for the country.
`

Presidential inaugural addresses¶Every four years, on January 20th, the incoming (or re-elected) President delivers an inaugural address just after taking the oath of office, in which they often share their vision for the country.

`python
Presidential inaugural addresses¶Every four years, on January 20th, the incoming (or re-elected) President delivers an inaugural address just after taking the oath of office, in which they often share their vision for the country.
`

Presidential inaugural addresses¶Every four years, on January 20th, the incoming (or re-elected) President delivers an inaugural address just after taking the oath of office, in which they often share their vision for the country.

`python

`

The data¶

`python
The data¶
`

The data¶

`python
The data¶
`

The data¶

`python

`

`python
In [47]:


from pathlib import Path
inaug_txt = Path('data') / 'inaugural_addresses.txt'
inaug = inaug_txt.read_text(encoding='utf-8')
`

`python
In [47]:
`

`python
In [48]:


len(inaug)
`

Output:
Out[48]:

826494

`python
In [48]:


len(inaug)
`

`python
In [48]:
`

Output:
Out[48]:

826494

Output:
Out[48]:

826494

The entire corpus (another word for "set of documents") is nearly 1 million characters long... let's not display it in our notebook.

`python
The entire corpus (another word for "set of documents") is nearly 1 million characters long... let's not display it in our notebook.
`

The entire corpus (another word for "set of documents") is nearly 1 million characters long... let's not display it in our notebook.

`python
The entire corpus (another word for "set of documents") is nearly 1 million characters long... let's not display it in our notebook.
`

The entire corpus (another word for "set of documents") is nearly 1 million characters long... let's not display it in our notebook.

`python

`

`python
In [49]:


print(inaug[:1500])
`

`python
In [49]:
`

Each speech is separated by '***'.

`python
Each speech is separated by '***'.
`

Each speech is separated by '***'.

`python
Each speech is separated by '***'.
`

Each speech is separated by '***'.

`python

`

`python
In [50]:


speeches = inaug.split('\n***\n')[1:]
`

`python
In [50]:
`

`python
In [51]:


len(speeches)
`

Output:
Out[51]:

60

`python
In [51]:


len(speeches)
`

`python
In [51]:
`

Output:
Out[51]:

60

Output:
Out[51]:

60

Note that each "speech" currently contains other information, like the name of the president and the year of the address.

`python
Note that each "speech" currently contains other information, like the name of the president and the year of the address.
`

Note that each "speech" currently contains other information, like the name of the president and the year of the address.

`python
Note that each "speech" currently contains other information, like the name of the president and the year of the address.
`

Note that each "speech" currently contains other information, like the name of the president and the year of the address.

`python

`

`python
In [52]:


print(speeches[-1])
`

`python
In [52]:
`

Let's extract just the speech text.

`python
Let's extract just the speech text.
`

Let's extract just the speech text.

`python
Let's extract just the speech text.
`

Let's extract just the speech text.

`python

`

`python
In [53]:


import re
def extract_struct(speech):
    L = speech.strip().split('\n', maxsplit=3)
    L[3] = L[3].replace('’', "'").replace('‘', "'")   # standardize curly vs straight apostrophes
    L[3] = re.sub(r"[^A-Za-z' ]", ' ', L[3]).lower()
    return dict(zip(['speech', 'president', 'year', 'contents'], L))
`

`python
In [53]:
`

`python
In [54]:


speeches_df = pd.DataFrame(list(map(extract_struct, speeches)))
speeches_df
`

Output:
Out[54]:







speech
president
year
contents




0
Inaugural Address
Washington
1789
fellow citizens of the senate and of the hous...


1
Inaugural Address
Washington
1793
fellow citizens  i am again called upon by th...


2
Inaugural Address
Adams
1797
when it was first perceived  in early times  ...


...
...
...
...
...


57
Inaugural Address
Trump
2017
chief justice roberts  president carter  pres...


58
Inaugural Address
Biden
2021
chief justice roberts  vice president harris ...


59
Inaugural Address
Trump
2025
thank you  thank you very much  everybody  wo...



60 rows × 4 columns

`python
In [54]:


speeches_df = pd.DataFrame(list(map(extract_struct, speeches)))
speeches_df
`

`python
In [54]:
`

Output:
Out[54]:







speech
president
year
contents




0
Inaugural Address
Washington
1789
fellow citizens of the senate and of the hous...


1
Inaugural Address
Washington
1793
fellow citizens  i am again called upon by th...


2
Inaugural Address
Adams
1797
when it was first perceived  in early times  ...


...
...
...
...
...


57
Inaugural Address
Trump
2017
chief justice roberts  president carter  pres...


58
Inaugural Address
Biden
2021
chief justice roberts  vice president harris ...


59
Inaugural Address
Trump
2025
thank you  thank you very much  everybody  wo...



60 rows × 4 columns

Output:
Out[54]:







speech
president
year
contents




0
Inaugural Address
Washington
1789
fellow citizens of the senate and of the hous...


1
Inaugural Address
Washington
1793
fellow citizens  i am again called upon by th...


2
Inaugural Address
Adams
1797
when it was first perceived  in early times  ...


...
...
...
...
...


57
Inaugural Address
Trump
2017
chief justice roberts  president carter  pres...


58
Inaugural Address
Biden
2021
chief justice roberts  vice president harris ...


59
Inaugural Address
Trump
2025
thank you  thank you very much  everybody  wo...



60 rows × 4 columns

Finding the most important words in each speech¶Here, a "document" is a speech. We have 60 documents.

`python
Finding the most important words in each speech¶Here, a "document" is a speech. We have 60 documents.
`

Finding the most important words in each speech¶Here, a "document" is a speech. We have 60 documents.

`python
Finding the most important words in each speech¶Here, a "document" is a speech. We have 60 documents.
`

Finding the most important words in each speech¶Here, a "document" is a speech. We have 60 documents.

`python

`

`python
In [55]:


speeches_df
`

Output:
Out[55]:







speech
president
year
contents




0
Inaugural Address
Washington
1789
fellow citizens of the senate and of the hous...


1
Inaugural Address
Washington
1793
fellow citizens  i am again called upon by th...


2
Inaugural Address
Adams
1797
when it was first perceived  in early times  ...


...
...
...
...
...


57
Inaugural Address
Trump
2017
chief justice roberts  president carter  pres...


58
Inaugural Address
Biden
2021
chief justice roberts  vice president harris ...


59
Inaugural Address
Trump
2025
thank you  thank you very much  everybody  wo...



60 rows × 4 columns

`python
In [55]:


speeches_df
`

`python
In [55]:
`

Output:
Out[55]:







speech
president
year
contents




0
Inaugural Address
Washington
1789
fellow citizens of the senate and of the hous...


1
Inaugural Address
Washington
1793
fellow citizens  i am again called upon by th...


2
Inaugural Address
Adams
1797
when it was first perceived  in early times  ...


...
...
...
...
...


57
Inaugural Address
Trump
2017
chief justice roberts  president carter  pres...


58
Inaugural Address
Biden
2021
chief justice roberts  vice president harris ...


59
Inaugural Address
Trump
2025
thank you  thank you very much  everybody  wo...



60 rows × 4 columns

Output:
Out[55]:







speech
president
year
contents




0
Inaugural Address
Washington
1789
fellow citizens of the senate and of the hous...


1
Inaugural Address
Washington
1793
fellow citizens  i am again called upon by th...


2
Inaugural Address
Adams
1797
when it was first perceived  in early times  ...


...
...
...
...
...


57
Inaugural Address
Trump
2017
chief justice roberts  president carter  pres...


58
Inaugural Address
Biden
2021
chief justice roberts  vice president harris ...


59
Inaugural Address
Trump
2025
thank you  thank you very much  everybody  wo...



60 rows × 4 columns

A rough sketch of what we'll compute:
for each word t:
    for each speech d:
        compute tfidf(t, d)

`python
A rough sketch of what we'll compute:
for each word t:
    for each speech d:
        compute tfidf(t, d)
`

A rough sketch of what we'll compute:
for each word t:
    for each speech d:
        compute tfidf(t, d)

`python
A rough sketch of what we'll compute:
for each word t:
    for each speech d:
        compute tfidf(t, d)
`

A rough sketch of what we'll compute:
for each word t:
    for each speech d:
        compute tfidf(t, d)

`python

`

`python
In [56]:


unique_words = speeches_df['contents'].str.split().explode().value_counts().index
unique_words
`

Output:
Out[56]:

Index(['the', 'of', 'and', 'to', 'in', 'a', 'our', 'we', 'that', 'be',
       ...
       'businessman', 'tomb', 'crossed', 'scaled', 'braved', 'untold',
       'unpredictable', 'admired', 'goodwill', 'houston'],
      dtype='object', name='contents', length=9364)

`python
In [56]:


unique_words = speeches_df['contents'].str.split().explode().value_counts().index
unique_words
`

`python
In [56]:
`

Output:
Out[56]:

Index(['the', 'of', 'and', 'to', 'in', 'a', 'our', 'we', 'that', 'be',
       ...
       'businessman', 'tomb', 'crossed', 'scaled', 'braved', 'untold',
       'unpredictable', 'admired', 'goodwill', 'houston'],
      dtype='object', name='contents', length=9364)

Output:
Out[56]:

Index(['the', 'of', 'and', 'to', 'in', 'a', 'our', 'we', 'that', 'be',
       ...
       'businessman', 'tomb', 'crossed', 'scaled', 'braved', 'untold',
       'unpredictable', 'admired', 'goodwill', 'houston'],
      dtype='object', name='contents', length=9364)

💡 Pro-Tip: Using tqdm¶This code takes a while to run, so we'll use the tqdm package to track its progress. (Install with mamba install tqdm if needed).

`python
💡 Pro-Tip: Using tqdm¶This code takes a while to run, so we'll use the tqdm package to track its progress. (Install with mamba install tqdm if needed).
`

💡 Pro-Tip: Using tqdm¶This code takes a while to run, so we'll use the tqdm package to track its progress. (Install with mamba install tqdm if needed).

`python
💡 Pro-Tip: Using tqdm¶This code takes a while to run, so we'll use the tqdm package to track its progress. (Install with mamba install tqdm if needed).
`

💡 Pro-Tip: Using tqdm¶This code takes a while to run, so we'll use the tqdm package to track its progress. (Install with mamba install tqdm if needed).

`python

`

`python
In [57]:


from tqdm.notebook import tqdm

tfidf_dict = {}
tf_denom = speeches_df['contents'].str.split().str.len()

# Wrap the sequence with `tqdm()` to display a progress bar
for word in tqdm(unique_words):
    re_pat = fr' {word} ' # Imperfect pattern for speed.
    tf = speeches_df['contents'].str.count(re_pat) / tf_denom
    idf = np.log(len(speeches_df) / speeches_df['contents'].str.contains(re_pat).sum())
    tfidf_dict[word] =  tf * idf
`

Output:
0%|          | 0/9364 [00:00<?, ?it/s]

`python
In [57]:


from tqdm.notebook import tqdm

tfidf_dict = {}
tf_denom = speeches_df['contents'].str.split().str.len()

# Wrap the sequence with `tqdm()` to display a progress bar
for word in tqdm(unique_words):
    re_pat = fr' {word} ' # Imperfect pattern for speed.
    tf = speeches_df['contents'].str.count(re_pat) / tf_denom
    idf = np.log(len(speeches_df) / speeches_df['contents'].str.contains(re_pat).sum())
    tfidf_dict[word] =  tf * idf
`

`python
In [57]:
`

Output:
0%|          | 0/9364 [00:00<?, ?it/s]

Output:
0%|          | 0/9364 [00:00<?, ?it/s]

`python
In [58]:


tfidf = pd.DataFrame(tfidf_dict)
tfidf.sample(6, axis=0)
`

Output:
Out[58]:







the
of
and
to
...
unpredictable
admired
goodwill
houston




12
0.0
0.0
0.0
0.0
...
0.0
0.0
0.0
0.0


40
0.0
0.0
0.0
0.0
...
0.0
0.0
0.0
0.0


4
0.0
0.0
0.0
0.0
...
0.0
0.0
0.0
0.0


56
0.0
0.0
0.0
0.0
...
0.0
0.0
0.0
0.0


49
0.0
0.0
0.0
0.0
...
0.0
0.0
0.0
0.0


0
0.0
0.0
0.0
0.0
...
0.0
0.0
0.0
0.0



6 rows × 9364 columns

`python
In [58]:


tfidf = pd.DataFrame(tfidf_dict)
tfidf.sample(6, axis=0)
`

`python
In [58]:
`

Output:
Out[58]:







the
of
and
to
...
unpredictable
admired
goodwill
houston




12
0.0
0.0
0.0
0.0
...
0.0
0.0
0.0
0.0


40
0.0
0.0
0.0
0.0
...
0.0
0.0
0.0
0.0


4
0.0
0.0
0.0
0.0
...
0.0
0.0
0.0
0.0


56
0.0
0.0
0.0
0.0
...
0.0
0.0
0.0
0.0


49
0.0
0.0
0.0
0.0
...
0.0
0.0
0.0
0.0


0
0.0
0.0
0.0
0.0
...
0.0
0.0
0.0
0.0



6 rows × 9364 columns

Output:
Out[58]:







the
of
and
to
...
unpredictable
admired
goodwill
houston




12
0.0
0.0
0.0
0.0
...
0.0
0.0
0.0
0.0


40
0.0
0.0
0.0
0.0
...
0.0
0.0
0.0
0.0


4
0.0
0.0
0.0
0.0
...
0.0
0.0
0.0
0.0


56
0.0
0.0
0.0
0.0
...
0.0
0.0
0.0
0.0


49
0.0
0.0
0.0
0.0
...
0.0
0.0
0.0
0.0


0
0.0
0.0
0.0
0.0
...
0.0
0.0
0.0
0.0



6 rows × 9364 columns

Note that the TF-IDFs of many common words are all 0!

`python
Note that the TF-IDFs of many common words are all 0!
`

Note that the TF-IDFs of many common words are all 0!

`python
Note that the TF-IDFs of many common words are all 0!
`

Note that the TF-IDFs of many common words are all 0!

`python

`

Summarizing speeches¶By using idxmax, we can find the word with the highest TF-IDF in each speech.

`python
Summarizing speeches¶By using idxmax, we can find the word with the highest TF-IDF in each speech.
`

Summarizing speeches¶By using idxmax, we can find the word with the highest TF-IDF in each speech.

`python
Summarizing speeches¶By using idxmax, we can find the word with the highest TF-IDF in each speech.
`

Summarizing speeches¶By using idxmax, we can find the word with the highest TF-IDF in each speech.

`python

`

`python
In [59]:


summaries = tfidf.idxmax(axis=1)
summaries
`

Output:
Out[59]:

0     immutable
1        arrive
2      pleasing
        ...    
57      america
58        story
59        thank
Length: 60, dtype: object

`python
In [59]:


summaries = tfidf.idxmax(axis=1)
summaries
`

`python
In [59]:
`

Output:
Out[59]:

0     immutable
1        arrive
2      pleasing
        ...    
57      america
58        story
59        thank
Length: 60, dtype: object

Output:
Out[59]:

0     immutable
1        arrive
2      pleasing
        ...    
57      america
58        story
59        thank
Length: 60, dtype: object

What if we want to see the 10 words with the highest TF-IDFs, for each speech?

`python
What if we want to see the 10 words with the highest TF-IDFs, for each speech?
`

What if we want to see the 10 words with the highest TF-IDFs, for each speech?

`python
What if we want to see the 10 words with the highest TF-IDFs, for each speech?
`

What if we want to see the 10 words with the highest TF-IDFs, for each speech?

`python

`

`python
In [60]:


def ten_largest(row):
    return ', '.join(row.index[row.argsort()][-10:])
`

`python
In [60]:
`

`python
In [61]:


keywords = tfidf.apply(ten_largest, axis=1)
keywords_df = pd.concat([
    speeches_df['president'],
    speeches_df['year'],
    keywords
], axis=1)
`

`python
In [61]:
`

`python
In [62]:


display_df(keywords_df, rows=60)
`

`python
In [62]:
`

Aside: What if we remove the $\log$ from $\text{idf}(t)$?¶Let's try it and see what happens.

`python
Aside: What if we remove the $\log$ from $\text{idf}(t)$?¶Let's try it and see what happens.
`

Aside: What if we remove the $\log$ from $\text{idf}(t)$?¶Let's try it and see what happens.

`python
Aside: What if we remove the $\log$ from $\text{idf}(t)$?¶Let's try it and see what happens.
`

Aside: What if we remove the $\log$ from $\text{idf}(t)$?¶Let's try it and see what happens.

`python

`

`python
In [63]:


tfidf_nl_dict = {}
tf_denom = speeches_df['contents'].str.split().str.len()

for word in tqdm(unique_words):
    re_pat = fr' {word} ' # Imperfect pattern for speed.
    tf = speeches_df['contents'].str.count(re_pat) / tf_denom
    idf_nl = len(speeches_df) / speeches_df['contents'].str.contains(re_pat).sum()
    tfidf_nl_dict[word] =  tf * idf_nl
`

Output:
0%|          | 0/9364 [00:00<?, ?it/s]

`python
In [63]:


tfidf_nl_dict = {}
tf_denom = speeches_df['contents'].str.split().str.len()

for word in tqdm(unique_words):
    re_pat = fr' {word} ' # Imperfect pattern for speed.
    tf = speeches_df['contents'].str.count(re_pat) / tf_denom
    idf_nl = len(speeches_df) / speeches_df['contents'].str.contains(re_pat).sum()
    tfidf_nl_dict[word] =  tf * idf_nl
`

`python
In [63]:
`

Output:
0%|          | 0/9364 [00:00<?, ?it/s]

Output:
0%|          | 0/9364 [00:00<?, ?it/s]

`python
In [64]:


tfidf_nl = pd.DataFrame(tfidf_nl_dict)
tfidf_nl.head()
`

Output:
Out[64]:







the
of
and
to
...
unpredictable
admired
goodwill
houston




0
0.08
0.05
0.03
0.03
...
0.0
0.0
0.0
0.0


1
0.10
0.08
0.01
0.04
...
0.0
0.0
0.0
0.0


2
0.07
0.06
0.06
0.03
...
0.0
0.0
0.0
0.0


3
0.08
0.06
0.05
0.04
...
0.0
0.0
0.0
0.0


4
0.07
0.05
0.04
0.04
...
0.0
0.0
0.0
0.0



5 rows × 9364 columns

`python
In [64]:


tfidf_nl = pd.DataFrame(tfidf_nl_dict)
tfidf_nl.head()
`

`python
In [64]:
`

Output:
Out[64]:







the
of
and
to
...
unpredictable
admired
goodwill
houston




0
0.08
0.05
0.03
0.03
...
0.0
0.0
0.0
0.0


1
0.10
0.08
0.01
0.04
...
0.0
0.0
0.0
0.0


2
0.07
0.06
0.06
0.03
...
0.0
0.0
0.0
0.0


3
0.08
0.06
0.05
0.04
...
0.0
0.0
0.0
0.0


4
0.07
0.05
0.04
0.04
...
0.0
0.0
0.0
0.0



5 rows × 9364 columns

Output:
Out[64]:







the
of
and
to
...
unpredictable
admired
goodwill
houston




0
0.08
0.05
0.03
0.03
...
0.0
0.0
0.0
0.0


1
0.10
0.08
0.01
0.04
...
0.0
0.0
0.0
0.0


2
0.07
0.06
0.06
0.03
...
0.0
0.0
0.0
0.0


3
0.08
0.06
0.05
0.04
...
0.0
0.0
0.0
0.0


4
0.07
0.05
0.04
0.04
...
0.0
0.0
0.0
0.0



5 rows × 9364 columns

`python
In [65]:


keywords_nl = tfidf_nl.apply(ten_largest, axis=1)
keywords_nl_df = pd.concat([
    speeches_df['president'],
    speeches_df['year'],
    keywords_nl
], axis=1)
display_df(keywords_nl_df, rows=60)
`

`python
In [65]:
`

The role of $\log$ in $\text{idf}(t)$¶$$
\begin{align*}
\text{tfidf}(t, d) &=
    \text{tf}(t, d) \cdot \text{idf}(t) \\\
    &= \frac{\text{\# of occurrences of $t$ in $d$}}{\text{total \# of words in $d$}}
        \cdot \log \left(\frac{\text{total \# of documents}}{\text{\# of documents in which $t$ appears}} \right)
\end{align*}
$$

Remember, for any positive input $x$, $\log(x)$ is (much) smaller than $x$.
In $\text{idf}(t)$, the $\log$ "dampens" the impact of the ratio $\frac{\text{\# documents}}{\text{\# documents with $t$}}$.

`python
The role of $\log$ in $\text{idf}(t)$¶$$
\begin{align*}
\text{tfidf}(t, d) &=
    \text{tf}(t, d) \cdot \text{idf}(t) \\\
    &= \frac{\text{\# of occurrences of $t$ in $d$}}{\text{total \# of words in $d$}}
        \cdot \log \left(\frac{\text{total \# of documents}}{\text{\# of documents in which $t$ appears}} \right)
\end{align*}
$$

Remember, for any positive input $x$, $\log(x)$ is (much) smaller than $x$.
In $\text{idf}(t)$, the $\log$ "dampens" the impact of the ratio $\frac{\text{\# documents}}{\text{\# documents with $t$}}$.
`

The role of $\log$ in $\text{idf}(t)$¶$$
\begin{align*}
\text{tfidf}(t, d) &=
    \text{tf}(t, d) \cdot \text{idf}(t) \\\
    &= \frac{\text{\# of occurrences of $t$ in $d$}}{\text{total \# of words in $d$}}
        \cdot \log \left(\frac{\text{total \# of documents}}{\text{\# of documents in which $t$ appears}} \right)
\end{align*}
$$

Remember, for any positive input $x$, $\log(x)$ is (much) smaller than $x$.
In $\text{idf}(t)$, the $\log$ "dampens" the impact of the ratio $\frac{\text{\# documents}}{\text{\# documents with $t$}}$.

`python
The role of $\log$ in $\text{idf}(t)$¶$$
\begin{align*}
\text{tfidf}(t, d) &=
    \text{tf}(t, d) \cdot \text{idf}(t) \\\
    &= \frac{\text{\# of occurrences of $t$ in $d$}}{\text{total \# of words in $d$}}
        \cdot \log \left(\frac{\text{total \# of documents}}{\text{\# of documents in which $t$ appears}} \right)
\end{align*}
$$

Remember, for any positive input $x$, $\log(x)$ is (much) smaller than $x$.
In $\text{idf}(t)$, the $\log$ "dampens" the impact of the ratio $\frac{\text{\# documents}}{\text{\# documents with $t$}}$.
`

The role of $\log$ in $\text{idf}(t)$¶$$
\begin{align*}
\text{tfidf}(t, d) &=
    \text{tf}(t, d) \cdot \text{idf}(t) \\\
    &= \frac{\text{\# of occurrences of $t$ in $d$}}{\text{total \# of words in $d$}}
        \cdot \log \left(\frac{\text{total \# of documents}}{\text{\# of documents in which $t$ appears}} \right)
\end{align*}
$$

Remember, for any positive input $x$, $\log(x)$ is (much) smaller than $x$.
In $\text{idf}(t)$, the $\log$ "dampens" the impact of the ratio $\frac{\text{\# documents}}{\text{\# documents with $t$}}$.

`python

`

If a word is very common, the ratio will be close to 1. The log of the ratio will be close to 0.

`python
If a word is very common, the ratio will be close to 1. The log of the ratio will be close to 0.
`

If a word is very common, the ratio will be close to 1. The log of the ratio will be close to 0.

`python
If a word is very common, the ratio will be close to 1. The log of the ratio will be close to 0.
`

If a word is very common, the ratio will be close to 1. The log of the ratio will be close to 0.

`python

`

`python
In [66]:


(1000 / 999)
`

Output:
Out[66]:

1.001001001001001

`python
In [66]:


(1000 / 999)
`

`python
In [66]:
`

Output:
Out[66]:

1.001001001001001

Output:
Out[66]:

1.001001001001001

`python
In [67]:


np.log(1000 / 999)
`

Output:
Out[67]:

0.001000500333583622

`python
In [67]:


np.log(1000 / 999)
`

`python
In [67]:
`

Output:
Out[67]:

0.001000500333583622

Output:
Out[67]:

0.001000500333583622

If a word is very common (e.g. 'the'), removing the log multiplies the statistic by a large factor.
If a word is very rare, the ratio will be very large. However, for instance, a word being seen in 2 out of 50 documents is not very different than being seen in 2 out of 500 documents (it is very rare in both cases), and so $\text{idf}(t)$ should be similar in both cases.

`python
If a word is very common (e.g. 'the'), removing the log multiplies the statistic by a large factor.
If a word is very rare, the ratio will be very large. However, for instance, a word being seen in 2 out of 50 documents is not very different than being seen in 2 out of 500 documents (it is very rare in both cases), and so $\text{idf}(t)$ should be similar in both cases.
`

If a word is very common (e.g. 'the'), removing the log multiplies the statistic by a large factor.
If a word is very rare, the ratio will be very large. However, for instance, a word being seen in 2 out of 50 documents is not very different than being seen in 2 out of 500 documents (it is very rare in both cases), and so $\text{idf}(t)$ should be similar in both cases.

`python
If a word is very common (e.g. 'the'), removing the log multiplies the statistic by a large factor.
If a word is very rare, the ratio will be very large. However, for instance, a word being seen in 2 out of 50 documents is not very different than being seen in 2 out of 500 documents (it is very rare in both cases), and so $\text{idf}(t)$ should be similar in both cases.
`

If a word is very common (e.g. 'the'), removing the log multiplies the statistic by a large factor.
If a word is very rare, the ratio will be very large. However, for instance, a word being seen in 2 out of 50 documents is not very different than being seen in 2 out of 500 documents (it is very rare in both cases), and so $\text{idf}(t)$ should be similar in both cases.

`python

`

`python
In [68]:


(50 / 2)
`

Output:
Out[68]:

25.0

`python
In [68]:


(50 / 2)
`

`python
In [68]:
`

Output:
Out[68]:

25.0

Output:
Out[68]:

25.0

`python
In [69]:


(500 / 2)
`

Output:
Out[69]:

250.0

`python
In [69]:


(500 / 2)
`

`python
In [69]:
`

Output:
Out[69]:

250.0

Output:
Out[69]:

250.0

`python
In [70]:


np.log(50 / 2)
`

Output:
Out[70]:

3.2188758248682006

`python
In [70]:


np.log(50 / 2)
`

`python
In [70]:
`

Output:
Out[70]:

3.2188758248682006

Output:
Out[70]:

3.2188758248682006

`python
In [71]:


np.log(500 / 2)
`

Output:
Out[71]:

5.521460917862246

`python
In [71]:


np.log(500 / 2)
`

`python
In [71]:
`

Output:
Out[71]:

5.521460917862246

Output:
Out[71]:

5.521460917862246

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
One way to turn documents, like 'deputy fire chief', into feature vectors, is to count the number of occurrences of each word in the document, ignoring order. This is done using the bag of words model.
To measure the similarity of two documents under the bag of words model, compute the cosine similarity of their two word vectors.
Term frequency-inverse document frequency (TF-IDF) is a statistic that tries to quantify how important a word (term) is to a document. It balances:
how often a word appears in a particular document, $\text{tf}(t, d)$, with
how often a word appears across documents, $\text{idf}(t)$.


For a given document, the word with the highest TF-IDF is thought to "best summarize" that document.

`python
Summary¶
One way to turn documents, like 'deputy fire chief', into feature vectors, is to count the number of occurrences of each word in the document, ignoring order. This is done using the bag of words model.
To measure the similarity of two documents under the bag of words model, compute the cosine similarity of their two word vectors.
Term frequency-inverse document frequency (TF-IDF) is a statistic that tries to quantify how important a word (term) is to a document. It balances:
how often a word appears in a particular document, $\text{tf}(t, d)$, with
how often a word appears across documents, $\text{idf}(t)$.


For a given document, the word with the highest TF-IDF is thought to "best summarize" that document.
`

Summary¶
One way to turn documents, like 'deputy fire chief', into feature vectors, is to count the number of occurrences of each word in the document, ignoring order. This is done using the bag of words model.
To measure the similarity of two documents under the bag of words model, compute the cosine similarity of their two word vectors.
Term frequency-inverse document frequency (TF-IDF) is a statistic that tries to quantify how important a word (term) is to a document. It balances:
how often a word appears in a particular document, $\text{tf}(t, d)$, with
how often a word appears across documents, $\text{idf}(t)$.


For a given document, the word with the highest TF-IDF is thought to "best summarize" that document.

`python
Summary¶
One way to turn documents, like 'deputy fire chief', into feature vectors, is to count the number of occurrences of each word in the document, ignoring order. This is done using the bag of words model.
To measure the similarity of two documents under the bag of words model, compute the cosine similarity of their two word vectors.
Term frequency-inverse document frequency (TF-IDF) is a statistic that tries to quantify how important a word (term) is to a document. It balances:
how often a word appears in a particular document, $\text{tf}(t, d)$, with
how often a word appears across documents, $\text{idf}(t)$.


For a given document, the word with the highest TF-IDF is thought to "best summarize" that document.
`

Summary¶
One way to turn documents, like 'deputy fire chief', into feature vectors, is to count the number of occurrences of each word in the document, ignoring order. This is done using the bag of words model.
To measure the similarity of two documents under the bag of words model, compute the cosine similarity of their two word vectors.
Term frequency-inverse document frequency (TF-IDF) is a statistic that tries to quantify how important a word (term) is to a document. It balances:
how often a word appears in a particular document, $\text{tf}(t, d)$, with
how often a word appears across documents, $\text{idf}(t)$.


For a given document, the word with the highest TF-IDF is thought to "best summarize" that document.

`python

`

Next time¶Modeling and feature engineering.

`python
Next time¶Modeling and feature engineering.
`

Next time¶Modeling and feature engineering.

`python
Next time¶Modeling and feature engineering.
`

Next time¶Modeling and feature engineering.

`python

`