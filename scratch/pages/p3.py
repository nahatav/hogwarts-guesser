PAGE3 = r"""
<!-- PAGE 3: LECTURE 15 -->
<div class="page">
  <div>
    <div class="page-header">
      <div>
        <div class="page-title">Lecture 15 — Feature Engineering & sklearn Transformers</div>
        <div class="page-subtitle">DSC 80 Cheatsheet • Categorical Encoding (One-Hot, Ordinal), Linearization, Scaling & Transformer API</div>
      </div>
      <div class="page-meta">Page 3 of 4<br><strong>ENGAGEMENT REVIEW</strong></div>
    </div>

    <div class="grid-2">
      <!-- COLUMN 1 -->
      <div class="column">
        <div class="card">
          <div class="card-header">
            <span>1. The Role & Goals of Feature Engineering</span>
            <span class="badge">Strategy</span>
          </div>
          <p><strong>The Core Dilemma:</strong> Linear regression is mathematically restricted to hyperplanes $H(\vec{x}) = \vec{w}^T \vec{x}$ directly on input columns. Real data is non-linear, categorical, and multi-scale.</p>
          <ul>
            <li><strong>Feature Engineering:</strong> Transforming raw data $X$ into numeric features $\phi(X)$ that allow linear models to capture non-linear relationships and categories while keeping optimization linear in weights $\vec{w}$.</li>
            <li><strong>Uninformative Features:</strong> Unique IDs (<code>id</code>), non-recurring timestamps, or constant columns provide zero signal. <em>Drop them</em> to avoid spurious correlations.</li>
          </ul>
        </div>

        <div class="card">
          <div class="card-header">
            <span>2. Categorical Encoding: Ordinal vs Nominal</span>
            <span class="badge">Encoding</span>
          </div>
          <div class="subhead">A. Ordinal Features (Inherent Natural Ordering):</div>
          <ul>
            <li><em>Examples:</em> Education (<code>HS < BS < MS < PhD</code>), ratings (<code>Poor < Fair < Good < Great</code>), sizes (<code>S < M < L</code>).</li>
            <li><em>Technique:</em> Map directly to integers preserving order: <code>df['rating'].map({'Poor':1, 'Fair':2, 'Good':3, 'Great':4})</code>.</li>
          </ul>
          <div class="subhead">B. Nominal Features (No Natural Ordering):</div>
          <ul>
            <li><em>Examples:</em> <code>smoker</code> (Yes/No), <code>day</code> (Thur/Fri/Sat/Sun), <code>sex</code> (Male/Female).</li>
            <li><em>Fatal Flaw of Arbitrary Integers:</em> Assigning <code>Thur=0, Fri=1, Sat=2, Sun=3</code> forces the model to assume $\text{Sun} > \text{Thur}$ and $\text{Sun} - \text{Sat} = \text{Fri} - \text{Thur}$.</li>
            <li><em>Solution:</em> <strong>One-Hot Encoding (OHE) / Dummy Variables</strong>. Create binary indicator column $\mathbb{I}(\text{col} = c) \in \{0, 1\}$ for each category.</li>
          </ul>
          <div class="subhead">Geometric Interpretation of OHE (Parallel Planes):</div>
          <p>Model predicting tip using <code>total_bill</code>, <code>size</code>, and one-hot <code>smoker</code> (Yes=1, No=0):</p>
          <div class="formula-box">
            $$\hat{\text{tip}} = w_0 + w_1 \text{bill} + w_2 \text{size} + w_3 \mathbb{I}(\text{smoker}=\text{Yes})$$
            Non-Smoker: $\hat{\text{tip}} = w_0 + w_1 \text{bill} + w_2 \text{size}$ &nbsp;|&nbsp; 
            Smoker: $\hat{\text{tip}} = (w_0 + w_3) + w_1 \text{bill} + w_2 \text{size}$
          </div>
          <p style="font-size: 6.2pt;">
            <strong>Geometry:</strong> OHE creates two <em>parallel hyperplanes</em> with identical slopes ($w_1, w_2$) separated by vertical intercept shift $w_3$!
          </p>
        </div>

        <div class="card">
          <div class="card-header">
            <span>3. Quantitative Scaling Transformations</span>
            <span class="badge">Scaling</span>
          </div>
          <ul>
            <li><strong>StandardScaler (Z-Score):</strong> $z = \frac{x - \mu}{\sigma}$. Centers feature at mean 0, unit variance 1.</li>
            <li><strong>MinMaxScaler:</strong> $x_{\text{scaled}} = \frac{x - x_{\min}}{x_{\max} - x_{\min}} \in [0, 1]$. Sensitive to extreme outliers.</li>
            <li><strong>QuantileTransformer:</strong> Maps arbitrary non-Gaussian distributions to uniform/normal using empirical cumulative distribution (ECDF).</li>
            <li><strong>Binarizer(threshold=t):</strong> Maps continuous value to binary $\mathbb{I}(x > t)$ (e.g. <code>size > 2</code> for large vs small tables).</li>
          </ul>
          <p style="font-size: 6.2pt; border-left: 1.5pt solid #000; padding-left: 3px;">
            <strong>Scaling Nuance:</strong> In standard OLS linear regression, standardizing features <em>does NOT change predictions, residuals, or R²!</em> It only rescales weights $w_j$. Scaling IS critical for regularized regression (Ridge/Lasso), PCA, and KNN.
          </p>
        </div>
      </div>

      <!-- COLUMN 2 -->
      <div class="column">
        <div class="card">
          <div class="card-header">
            <span>4. Non-Linearity & Linearization (Horsepower vs MPG)</span>
            <span class="badge">Linearization</span>
          </div>
          <p><strong>Case Study: Predicting MPG from Horsepower (HP):</strong></p>
          <ul>
            <li>Scatter plot shows curved decay ($\text{mpg} \propto \frac{1}{\text{hp}}$ or $\log(\text{hp})$).</li>
            <li>Fitting linear model directly: $\hat{\text{mpg}} = w_0 + w_1 \text{hp}$ yields high RMSE and curved residual plots.</li>
            <li><strong>Linearization:</strong> Transform feature so relationship is linear:
              <div class="formula-box">
                $$\hat{\text{mpg}} = w_0 + w_1 \log(\text{hp}) \quad \text{or} \quad \hat{\text{mpg}} = w_0 + w_1 \left(\frac{1}{\text{hp}}\right)$$
              </div>
            </li>
            <li><strong>Result:</strong> Residuals become random homoscedastic noise, RMSE drops dramatically, and $R^2$ increases significantly!</li>
          </ul>
        </div>

        <div class="card">
          <div class="card-header">
            <span>5. Sklearn Transformer Architecture & Rules</span>
            <span class="badge">API Lifecycle</span>
          </div>
          <div class="subhead">Two Core Classes in Sklearn:</div>
          <ol>
            <li><strong>Transformers (Feature Preprocessors):</strong> Implement <code>.fit()</code>, <code>.transform()</code>, and <code>.fit_transform()</code>.</li>
            <li><strong>Estimators / Predictors (Models):</strong> Implement <code>.fit()</code>, <code>.predict()</code>, and <code>.score()</code>.</li>
          </ol>
          <div class="subhead">The Transformer Method Lifecycle:</div>
          <ul>
            <li><code>.fit(X)</code>: Computes and stores parameters from dataset $X$ (e.g. $\mu, \sigma$ for <code>StandardScaler</code>; category levels for <code>OneHotEncoder</code>). Returns <code>self</code>.</li>
            <li><code>.transform(X)</code>: Applies transformation to $X$ using the <em>pre-computed parameters</em>. Returns NumPy array.</li>
            <li><code>.fit_transform(X)</code>: Efficiently fits and transforms in one step. <em>Use ONLY on training data!</em></li>
          </ul>
          <div class="subhead" style="color: #000;">The Golden Rule: Preventing Data Leakage</div>
          <p style="font-size: 6.2pt; background: #eee; padding: 2px 4px; border-left: 2pt solid #000;">
            <strong>NEVER fit a transformer on test data!</strong><br>
            Always <code>fit</code> on $X_{\text{train}}$, then <code>transform</code> both $X_{\text{train}}$ and $X_{\text{test}}$ using training statistics. Fitting on test data leaks future distribution parameters.
          </p>
        </div>

        <div class="card">
          <div class="card-header">
            <span>6. Core Transformer Code Implementations</span>
            <span class="badge">Syntax</span>
          </div>
          <pre>from sklearn.preprocessing import StandardScaler, OneHotEncoder, Binarizer

# 1. Binarizer (Stateless: fit computes nothing)
binar = Binarizer(threshold=2.0)
size_bin = binar.fit_transform(tips[['size']])

# 2. StandardScaler (Stateful: learns mean_ and scale_)
scaler = StandardScaler()
X_tr_scaled = scaler.fit_transform(X_train[['total_bill']])
X_te_scaled = scaler.transform(X_test[['total_bill']]) # DO NOT FIT!

# 3. OneHotEncoder (Stateful: learns categories_)
ohe = OneHotEncoder(drop='first', sparse_output=False)
X_ohe = ohe.fit_transform(tips[['sex', 'smoker', 'time']])</pre>
        </div>

        <div class="interview-box">
          <div class="interview-title">
            <span>Engagement Interview Probing Q&A</span>
            <span class="badge">Interview Prep</span>
          </div>
          <p><span class="q">Q: Why specify <code>drop='first'</code> in OneHotEncoder for linear models?</span><br>
          <span class="a"><strong>A:</strong> To avoid the <em>Dummy Variable Trap</em>. Keeping all $K$ dummy columns with an intercept creates exact linear dependence ($\sum \text{dummies} = 1 = \text{intercept}$), making $X^T X$ non-invertible.</span></p>
          <p><span class="q">Q: What is the functional difference between Transformer and Estimator?</span><br>
          <span class="a"><strong>A:</strong> Transformers map feature matrices ($X \to X'$) via <code>transform</code>. Estimators learn predictive mappings ($X \to y$) via <code>predict</code>.</span></p>
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
