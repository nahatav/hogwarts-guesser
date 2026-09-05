PAGE4 = r"""
<!-- PAGE 4: LECTURE 16 -->
<div class="page">
  <div>
    <div class="page-header">
      <div>
        <div class="page-title">Lecture 16 — Pipelines, Multicollinearity & Generalization</div>
        <div class="page-subtitle">DSC 80 Cheatsheet • ColumnTransformers, Multicollinearity Proof, Bias-Variance Decomposition & Train-Test Splits</div>
      </div>
      <div class="page-meta">Page 4 of 4<br><strong>ENGAGEMENT REVIEW</strong></div>
    </div>

    <div class="grid-2">
      <!-- COLUMN 1 -->
      <div class="column">
        <div class="card">
          <div class="card-header">
            <span>1. Sklearn Pipelines & ColumnTransformers</span>
            <span class="badge">Architecture</span>
          </div>
          <p><strong>The Need:</strong> Real datasets require applying different transformations to different columns (e.g. scaling numeric, one-hot encoding categories), chaining steps, and preventing data leakage.</p>
          <ul>
            <li><strong><code>FunctionTransformer(func)</code>:</strong> Wraps custom functions (e.g. <code>np.log</code>, regex) into an sklearn transformer object (sklearn's <code>.apply()</code>).</li>
            <li><strong><code>ColumnTransformer</code>:</strong> Applies specific transformers to specified column subsets; horizontally concatenates output arrays.</li>
            <li><strong><code>Pipeline</code>:</strong> Chains sequential transformers and ends with an optional final estimator. Calling <code>pl.fit(X_tr, y_tr)</code> fits all steps in sequence; <code>pl.predict(X_te)</code> transforms test data using training statistics then predicts.</li>
          </ul>
          <pre>from sklearn.pipeline import Pipeline, make_pipeline
from sklearn.compose import ColumnTransformer, make_column_transformer
from sklearn.preprocessing import OneHotEncoder, Binarizer, FunctionTransformer

# Pipeline within ColumnTransformer
pl_day = make_pipeline(
    FunctionTransformer(lambda s: s.isin(['Sat', 'Sun']).astype(int)),
    OneHotEncoder(drop='first')
)
preproc = make_column_transformer(
    (OneHotEncoder(drop='first'), ['sex', 'smoker', 'time']),
    (Binarizer(threshold=2), ['size']),
    (pl_day, ['day']),
    remainder='passthrough' # Leaves 'total_bill' untouched
)
full_pipeline = make_pipeline(preproc, LinearRegression())
full_pipeline.fit(X_train, y_train)</pre>
        </div>

        <div class="card">
          <div class="card-header">
            <span>2. Multicollinearity & The Dummy Variable Trap</span>
            <span class="badge">Theory & Proof</span>
          </div>
          <p><strong>Definition:</strong> Occurs when one feature can be accurately predicted as a linear combination of other features (redundant features).</p>
          <div class="subhead">Motivating Proof (Heights in Inches vs CM):</div>
          <ul>
            <li>Suppose true model predicts weight from height: $\hat{y} = w_0 + 3 \cdot \text{height\_in}$.</li>
            <li>Add redundant feature $\text{height\_cm} = 2.54 \cdot \text{height\_in}$:
              <div class="formula-box">
                $$\hat{y} = w_0 + w_1 \text{height\_in} + w_2 (2.54 \cdot \text{height\_in}) = w_0 + (w_1 + 2.54 w_2)\text{height\_in}$$
              </div>
            </li>
            <li><em>Infinite Solutions:</em> Any pair where $w_1 + 2.54 w_2 = 3$ achieves identical predictions and identical minimal RMSE! (e.g., $w_1 = 1000, w_2 = -392.5$).</li>
            <li><em>Normal Equation Breakdown:</em> Columns of $X$ are linearly dependent $\implies \det(X^T X) = 0 \implies (X^T X)^{-1}$ does not exist!</li>
          </ul>
          <div class="subhead">Crucial Distinction (Professor Favorite):</div>
          <ul>
            <li><strong>Prediction / Generalization:</strong> Multicollinearity does <strong>NOT</strong> harm prediction accuracy on unseen data from the same population!</li>
            <li><strong>Inference / Interpretability:</strong> Multicollinearity completely <strong>destroys interpretability</strong>. Coefficients blow up, have massive variance, and lose physical meaning.</li>
          </ul>
        </div>
      </div>

      <!-- COLUMN 2 -->
      <div class="column">
        <div class="card">
          <div class="card-header">
            <span>3. Generalization, Risk & Bias-Variance Tradeoff</span>
            <span class="badge">Statistical ML</span>
          </div>
          <p><strong>Generalization:</strong> Ability of a model fit on a training sample to perform accurately on new, unseen samples from the true population distribution.</p>
          <ul>
            <li><strong>Risk (Expected Generalization Loss):</strong> $R(H) = \mathbb{E}_{(x_{\text{new}}, y_{\text{new}})}[(y_{\text{new}} - H(x_{\text{new}}))^2]$.</li>
            <li><strong>Empirical Risk (Training MSE):</strong> $\hat{R}(H) = \frac{1}{n}\sum_{i=1}^n (y_i - H(x_i))^2$.</li>
          </ul>
          <div class="formula-box">
            <strong>The Bias-Variance Decomposition:</strong><br>
            $$\mathbb{E}[(y_{\text{new}} - H(x_{\text{new}}))^2] = \text{Model Bias}^2 + \text{Model Variance} + \text{Observation Error}$$
          </div>
          <div class="subhead">Three Sources of Error:</div>
          <ol>
            <li><strong>$\text{Model Bias}^2 = (\mathbb{E}[H(x)] - f(x))^2$:</strong> Error from overly simplistic assumptions (underfitting). E.g., fitting a straight line to cubic data. High bias $\implies$ high train RMSE, high test RMSE.</li>
            <li><strong>$\text{Model Variance} = \mathbb{E}[(H(x) - \mathbb{E}[H(x)])^2]$:</strong> Sensitivity of predictions to random fluctuations in the training sample (overfitting). E.g., degree 25 polynomial. High variance $\implies$ near-zero train RMSE, massive test RMSE.</li>
            <li><strong>$\text{Observation Error } (\sigma^2)$:</strong> Irreducible noise in measurement / nature. Cannot be reduced by any model class.</li>
          </ol>
          <div class="subhead">Tradeoff Dynamics:</div>
          <ul>
            <li><strong>Increase Sample Size ($n \uparrow$):</strong> Variance decreases toward 0; Bias remains constant if model class is misspecified.</li>
            <li><strong>Increase Model Complexity / Features ($d \uparrow$):</strong> Bias decreases; Variance increases. (In linear regression, Variance $\propto \frac{d}{n}$).</li>
          </ul>
        </div>

        <div class="card">
          <div class="card-header">
            <span>4. Train-Test Splits & Validation Diagnostics</span>
            <span class="badge">Validation</span>
          </div>
          <pre>from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.25, random_state=42
)
model.fit(X_train, y_train)

rmse_train = np.sqrt(mean_squared_error(y_train, model.predict(X_train)))
rmse_test  = np.sqrt(mean_squared_error(y_test, model.predict(X_test)))</pre>
          <div class="subhead">Diagnostic Rules for the Engagement Interview:</div>
          <ul>
            <li>$\text{RMSE}_{\text{train}} \approx \text{RMSE}_{\text{test}}$ (both low) $\implies$ <strong>Well-fit model; generalizes well</strong>.</li>
            <li>$\text{RMSE}_{\text{train}} \ll \text{RMSE}_{\text{test}}$ $\implies$ <strong>Overfitting (High Variance)</strong>. Model memorized training noise. Fix: Regularize, collect more $n$, drop features.</li>
            <li>$\text{RMSE}_{\text{train}} \approx \text{RMSE}_{\text{test}}$ (both high) $\implies$ <strong>Underfitting (High Bias)</strong>. Model class too simple. Fix: Feature engineering, add non-linear terms.</li>
          </ul>
        </div>

        <div class="interview-box">
          <div class="interview-title">
            <span>Engagement Interview Probing Q&A</span>
            <span class="badge">Interview Prep</span>
          </div>
          <p><span class="q">Q: What error does training RMSE measure versus test RMSE?</span><br>
          <span class="a"><strong>A:</strong> Training error reflects <em>only bias</em> (how well the model family fits the sample). Test error reflects <em>both bias and variance</em> (generalization risk).</span></p>
          <p><span class="q">Q: Why does a degree 25 polynomial have 0 training error but fail on test data?</span><br>
          <span class="a"><strong>A:</strong> It has zero bias but massive model variance; it interpolates training sample noise rather than learning the true underlying population signal.</span></p>
        </div>
      </div>
    </div>
  </div>
  <div class="footer">
    <span>DSC 80 — Principles of Data Science</span>
    <span>Lecture 16: Pipelines, Multicollinearity & Generalization</span>
    <span>Page 4 of 4</span>
  </div>
</div>
</body>
</html>
"""
