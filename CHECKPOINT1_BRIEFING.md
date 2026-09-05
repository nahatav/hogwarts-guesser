# 🎯 Checkpoint 1 Tutor Meeting Guide (DSC 80)

**Dataset**: U.S. Major Power Outages (2000–2016), U.S. Department of Energy & Purdue University LASCI  
**Notebook**: [`project.ipynb`](file:///c:/Users/Valmi/Documents/antigravity/modest-carson/project.ipynb)  
**Interactive Visualizations**: [`assets/`](file:///c:/Users/Valmi/Documents/antigravity/modest-carson/assets/)  

---

## ⚡ Quick Answers (Read Directly in Meeting)

### Question 1 (6 pts): Which dataset are you working with and why did you choose it? What do you hope to accomplish?
> **Answer**:
> *"We are working with the **U.S. Major Power Outages dataset (2000–2016)** from the Department of Energy and Purdue University, containing **1,534 outage events** and **56 columns** across climate, grid load, and demographic features.
>
> We chose it because power grid reliability is a critical public safety issue that is increasingly threatened by extreme weather and climate change. We hope to understand how severe weather events and climate anomaly levels interact with regional grid characteristics to affect outage restoration times."*

---

### Question 2 (6 pts): Share your screen to show one Plotly visualization you created in Step 2, and explain what your visualization shows.
> **Action**: Share your screen and show the boxplot in `project.ipynb` (or open [`assets/bivariate_cause_duration_box.html`](file:///c:/Users/Valmi/Documents/antigravity/modest-carson/assets/bivariate_cause_duration_box.html)).
>
> **Explanation**:
> *"This is an interactive Plotly box plot showing **outage restoration duration in hours across cause categories on a log scale**.
>
> It shows that **severe weather causes the longest outages by far**, with a **median duration of 41.0 hours** (mean of 64.7 hours), compared to intentional attacks which have a **median duration of only 1.2 hours**, and equipment failures with a median of 12.3 hours. This makes intuitive physical sense: severe weather knocks down physical power lines over large regions that require manual crew repairs, whereas intentional attacks or operational trips can usually be isolated or switched remotely."*

---

### Question 3 (6 pts): What is the pair of hypotheses you plan on testing in Step 4? What is the test statistic you plan on using?
> **Answer**:
> - **Null Hypothesis ($H_0$)**: *"In the population of major U.S. power outages, the mean restoration duration for severe weather events is equal to that of equipment failures and intentional attacks. Any observed difference is due to random chance."*
> - **Alternative Hypothesis ($H_1$)**: *"Outages caused by severe weather have a higher mean restoration duration than equipment failures and intentional attacks."*
> - **Test Statistic**: *"The **difference in group means** ($\bar{X}_{\text{severe\_weather}} - \bar{X}_{\text{other}}$)."*
> - **Result**: *"Our observed difference in means was **+54.8 hours** ($+3,287.5$ minutes), and our 5,000-iteration permutation test gave a **$p$-value of $0.0000$**, so we reject the null hypothesis."*

---

### Question 4 (2 pts): What is your prediction problem for Steps 5–8? What column will you be predicting and will you use classification or regression?
> **Answer**:
> - **Prediction Problem**: *"Predicting the total restoration duration of an outage at the time it begins."*
> - **Target Column & Type**: *"We use **Regression** on `LOG_DURATION` ($\log(1 + \text{duration in minutes})$), and **Binary Classification** on `IS_SEVERE_OUTAGE` (whether the outage lasts $\ge 24$ hours)."*
> - **Features Available at Time of Prediction**: *"We only use features known at the start of the outage: `CLIMATE.REGION`, `ANOMALY.LEVEL`, `START_MONTH`, `START_HOUR`, `START_DAYOFWEEK`, initial `CAUSE.CATEGORY`, and state demographic/grid features (`POPDEN_URBAN`, `RES.PRICE`, `TOTAL.SALES`). We strictly exclude post-event restoration timestamps and customer/demand totals to avoid data leakage."*
> - **Evaluation Metric**: *"**RMSE** for regression (heavily penalizes large underpredictions on severe multi-day outages) and **F1-Score** for classification."*

---

## 💡 Quick Backup Q&A (If the Tutor Asks Follow-Up Questions)

- **How did you clean the data?**
  *"We loaded the Excel sheet starting at row 5, merged `OUTAGE.START.DATE` and `OUTAGE.START.TIME` into `OUTAGE.START`, did the same for restoration times, and verified that calculated durations matched the duration column."*
- **What is your MNAR reasoning in Step 3?**
  *"Under DOE Form OE-417 rules, utilities only had to report major outages exceeding 50,000 customers or 300 MW loss. Missing customer or demand loss counts were often left blank when the outage was smaller or uncounted, making the missingness depend on the unobserved value itself (MNAR). Having smart meter (AMI) logs would make it MAR."*
- **What were your missingness permutation tests?**
  *"Missingness of `CUSTOMERS.AFFECTED` depends on `CAUSE.CATEGORY` using TVD ($p = 0.0000$, MAR). Missingness of `DEMAND.LOSS.MW` does not depend on state land percentage `PCT_LAND` using difference in means ($p = 0.2280$, MCAR-like)."*
