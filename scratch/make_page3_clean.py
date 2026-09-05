PAGE3 = r"""
<!-- PAGE 3: LECTURE 15 -->
<div class="page">
  <div>
    <div class="page-header">
      <div>
        <div class="page-title">Lecture 15 — Feature Engineering & sklearn Transformers</div>
        <div class="page-subtitle">DSC 80 • Categorical Encoding, One-Hot Geometry, Linearization, Scaling & Transformer Lifecycle</div>
      </div>
      <div class="page-meta">Page 3 of 4<br><strong>STUDY NOTES</strong></div>
    </div>

    <div class="grid-2">
      <!-- COLUMN 1 -->
      <div class="column">
        
        <div>
          <div class="section-title">The Role of Feature Engineering</div>
          <ul>
            <li>Linear regression is mathematically restricted to fitting hyperplanes $H(\vec{x}) = \vec{w}^T \vec{x}$ directly on input features.</li>
            <li>Feature engineering transforms raw domain columns $X$ into engineered features $\phi(X)$, allowing linear models to capture non-linearities and categories while keeping parameter optimization linear in weights $\vec{w}$.</li>
            <li>Uninformative features (unique IDs, constant values, non-repeating hashes) provide zero signal and must be dropped to prevent spurious patterns.</li>
          </ul>
        </div>

        <div>
          <div class="section-title">Categorical Encoding: Ordinal vs. Nominal</div>
          <ul>
            <li><strong>Ordinal Features (Inherent Natural Ranking):</strong>
              <ul>
                <li>Examples include education levels (<em>HS < BS < MS < PhD</em>) and ratings (<em>Poor < Fair < Good < Great</em>).</li>
                <li>Map directly to increasing integers preserving order: <code>df['rating'].map({'Poor':1, 'Fair':2, 'Good':3, 'Great':4})</code>.</li>
              </ul>
            </li>
            <li><strong>Nominal Features (No Natural Ordering):</strong>
              <ul>
                <li>Examples include <code>smoker</code> (<em>Yes/No</em>), <code>day</code> (<em>Thur/Fri/Sat/Sun</em>), and <code>sex</code> (<em>Male/Female</em>).</li>
                <li>Assigning arbitrary integers (e.g., <code>Thur=0, Fri=1, Sat=2, Sun=3</code>) forces false assumptions that $\text{Sun} > \text{Thur}$ and that differences between days are equal.</li>
                <li>Solution: <strong>One-Hot Encoding (OHE)</strong> creates a binary $0/1$ indicator column $\mathbb{I}(\text{col}=c)$ for each category.</li>
              </ul>
            </li>
            <li><strong>Geometric Interpretation of One-Hot Encoding:</strong>
              <ul>
                <li>Model predicting tip from bill, table size, and smoker status:</li>
              </ul>
              <div class="formula-box">
                $$\hat{\text{tip}} = w_0 + w_1 \text{bill} + w_2 \text{size} + w_3 \mathbb{I}(\text{smoker}=\text{Yes})$$
                Non-Smoker: $\hat{\text{tip}} = w_0 + w_1 \text{bill} + w_2 \text{size}$ &nbsp;|&nbsp; 
                Smoker: $\hat{\text{tip}} = (w_0 + w_3) + w_1 \text{bill} + w_2 \text{size}$
              </div>
              <ul>
                <li>One-hot encoding creates <strong>two parallel hyperplanes</strong> with identical slopes ($w_1, w_2$) separated by vertical intercept shift $w_3$.</li>
              </ul>
            </li>
          </ul>
        </div>

        <div>
          <div class="section-title">Quantitative Scaling Transformations</div>
          <ul>
            <li><code>StandardScaler()</code>: Standardizes via $z = \frac{x - \mu}{\sigma}$ to have mean $0$ and unit variance $1$.</li>
            <li><code>MinMaxScaler()</code>: Scales values linearly into $[0, 1]$ via $\frac{x - x_{\min}}{x_{\max} - x_{\min}}$ (sensitive to outliers).</li>
            <li><code>QuantileTransformer()</code>: Maps arbitrary non-Gaussian distributions to uniform or normal using empirical CDFs.</li>
            <li><code>Binarizer(threshold=t)</code>: Maps continuous numbers to binary indicators $\mathbb{I}(x > t)$ (e.g. <code>size > 2</code> for large tables).</li>
            <li>Standardizing features in standard OLS linear regression <em>does not change predictions, residuals, or $R^2$</em>; it only rescales weights $w_j$. (Scaling is essential for Ridge/Lasso, PCA, and KNN).</li>
          </ul>
        </div>

      </div>

      <!-- COLUMN 2 -->
      <div class="column">
        
        <div>
          <div class="section-title">Non-Linearity & Linearization (Horsepower vs. MPG)</div>
          <ul>
            <li>In the auto dataset, a scatter plot of <code>mpg</code> vs. <code>horsepower</code> shows an inverse curved decay.</li>
            <li>A simple linear fit on raw horsepower yields high RMSE and patterned, curved residuals.</li>
            <li>Linearization transforms the feature so the underlying relationship becomes linear:</li>
          </ul>
          <div class="formula-box">
            $$\hat{\text{mpg}} = w_0 + w_1 \log(\text{hp}) \quad \text{or} \quad \hat{\text{mpg}} = w_0 + w_1 \left(\frac{1}{\text{hp}}\right)$$
          </div>
          <ul>
            <li>Linearization converts curved residual plots into random homoscedastic noise, decreases RMSE, and increases $R^2$.</li>
          </ul>
        </div>

        <div>
          <div class="section-title">Scikit-Learn Transformer Architecture</div>
          <ul>
            <li>Scikit-Learn separates functionality into two core class types:
              <ul>
                <li><strong>Transformers (Feature Preprocessing):</strong> Implement <code>.fit()</code>, <code>.transform()</code>, and <code>.fit_transform()</code>.</li>
                <li><strong>Estimators (Predictive Models):</strong> Implement <code>.fit()</code>, <code>.predict()</code>, and <code>.score()</code>.</li>
              </ul>
            </li>
            <li>The Transformer Lifecycle:
              <ul>
                <li><code>.fit(X)</code> computes and learns parameters from dataset $X$ (e.g. $\mu, \sigma$ in <code>StandardScaler</code>; category levels in <code>OneHotEncoder</code>).</li>
                <li><code>.transform(X)</code> applies the learned transformation using pre-computed parameters.</li>
                <li><code>.fit_transform(X)</code> fits and transforms in one step on training data only.</li>
              </ul>
            </li>
            <li><strong>Preventing Data Leakage:</strong> Never fit a transformer on test data. Always fit on $X_{\text{train}}$, then transform both $X_{\text{train}}$ and $X_{\text{test}}$ using training statistics.</li>
          </ul>
          <pre>from sklearn.preprocessing import StandardScaler, OneHotEncoder, Binarizer

# Binarizer (Stateless)
binar = Binarizer(threshold=2.0)
size_bin = binar.fit_transform(tips[['size']])

# StandardScaler (Stateful)
scaler = StandardScaler()
X_tr_scaled = scaler.fit_transform(X_train[['total_bill']])
X_te_scaled = scaler.transform(X_test[['total_bill']]) # DO NOT FIT!

# OneHotEncoder (drop='first' prevents collinearity)
ohe = OneHotEncoder(drop='first', sparse_output=False)
X_ohe = ohe.fit_transform(tips[['sex', 'smoker', 'time']])</pre>
        </div>

        <div class="interview-section">
          <div class="interview-heading">Professor Interview Focus</div>
          <ul>
            <li><strong>Why pass <code>drop='first'</code> to OneHotEncoder in linear models?</strong> To prevent the <em>Dummy Variable Trap</em>. Keeping all $K$ dummy columns alongside an intercept creates linear dependence ($\sum \text{dummies} = 1 = \text{intercept}$), making $X^T X$ singular and non-invertible.</li>
            <li><strong>What is the functional difference between Transformer and Estimator?</strong> Transformers preprocess and reshape feature matrices ($X \to X'$) via <code>transform</code>. Estimators learn predictive mappings ($X \to y$) via <code>predict</code>.</li>
          </ul>
        </div>

      </div>
    </div>
  </div>

  <div class="footer">
    <span>DSC 80 — Principles of Data Science</span>
    <span>Lecture 15: Feature Engineering & Transformers</span>
    <span>Page 3 of 4</span>
  </div>
</div>
"""

with open('scratch/pages/page3_clean.py', 'w', encoding='utf-8') as f:
    f.write(f'PAGE3 = r"""{PAGE3}"""\n')
print("Wrote page3_clean.py")
