PAGE4 = r"""
<!-- PAGE 4: LECTURE 16 -->
<div class="page">
  <div>
    <div class="page-header">
      <div>
        <div class="page-title">Lecture 16 — Pipelines, Multicollinearity & Generalization</div>
        <div class="page-subtitle">DSC 80 • ColumnTransformers, Multicollinearity Proof, Bias-Variance Decomposition & Train-Test Splits</div>
      </div>
      <div class="page-meta">Page 4 of 4<br><strong>STUDY NOTES</strong></div>
    </div>

    <div class="grid-2">
      <!-- COLUMN 1 -->
      <div class="column">
        
        <div>
          <div class="section-title">Pipelines & ColumnTransformers</div>
          <ul>
            <li>Real datasets require applying different transformations to different columns (e.g. scaling numeric columns, one-hot encoding categories) and combining them without data leakage.</li>
            <li><code>FunctionTransformer(func)</code> wraps arbitrary custom Python functions (e.g. <code>np.log</code> or custom regex parsing) into an sklearn transformer object.</li>
            <li><code>ColumnTransformer</code> applies specific transformers to specified column subsets and horizontally concatenates the resulting arrays.</li>
            <li><code>Pipeline</code> sequentially chains multiple transformers together and ends with an optional final model estimator.</li>
            <li>Calling <code>pl.fit(X_tr, y_tr)</code> fits all preprocessing steps and the model in sequence; <code>pl.predict(X_te)</code> automatically applies learned transformations to test data and returns predictions.</li>
          </ul>
          <pre>from sklearn.pipeline import Pipeline, make_pipeline
from sklearn.compose import ColumnTransformer, make_column_transformer
from sklearn.preprocessing import OneHotEncoder, Binarizer, FunctionTransformer

# Pipeline nested inside ColumnTransformer
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

        <div>
          <div class="section-title">Multicollinearity & The Dummy Variable Trap</div>
          <ul>
            <li>Multicollinearity occurs when one feature in a regression model can be accurately predicted as a linear combination of other features.</li>
            <li>Proof using Heights in Inches ($x_1$) and Heights in CM ($x_2 = 2.54 x_1$):
              <ul>
                <li>Suppose true relationship is $\hat{y} = w_0 + 3 x_1$. Adding $x_2$ yields:
                  $$\hat{y} = w_0 + w_1 x_1 + w_2 (2.54 x_1) = w_0 + (w_1 + 2.54 w_2) x_1$$
                </li>
                <li>Any pair of weights satisfying $w_1 + 2.54 w_2 = 3$ produces the exact same predictions and identical minimal RMSE! (e.g., $w_1 = 1000, w_2 = -392.5$).</li>
                <li>Columns of $X$ become linearly dependent $\implies \det(X^T X) = 0 \implies (X^T X)^{-1}$ does not exist.</li>
              </ul>
            </li>
            <li>The Dummy Variable Trap: keeping all $K$ dummy columns alongside an intercept creates linear dependence ($\sum \text{dummies} = 1 = \text{intercept}$). Use <code>OneHotEncoder(drop='first')</code> to fix this.</li>
            <li>Multicollinearity <strong>does not harm prediction accuracy or generalization</strong> on similar data; it completely <strong>destroys interpretability</strong> because coefficients become unstable and arbitrary.</li>
          </ul>
        </div>

      </div>

      <!-- COLUMN 2 -->
      <div class="column">
        
        <div>
          <div class="section-title">Generalization, Risk & Bias-Variance Decomposition</div>
          <ul>
            <li>Generalization evaluates how well a model fit on a training sample performs on new, unseen data drawn from the true population distribution.</li>
            <li>True Risk is expected loss on unseen data: $R(H) = \mathbb{E}[(y_{\text{new}} - H(x_{\text{new}}))^2]$.</li>
            <li>Empirical Risk is training sample MSE: $\hat{R}(H) = \frac{1}{n}\sum_{i=1}^n (y_i - H(x_i))^2$.</li>
            <li>The Bias-Variance Decomposition:</li>
          </ul>
          <div class="formula-box">
            $$\mathbb{E}[(y_{\text{new}} - H(x_{\text{new}}))^2] = \text{Model Bias}^2 + \text{Model Variance} + \text{Observation Error}$$
          </div>
          <ul>
            <li>Three components of error:
              <ol>
                <li><strong>Model Bias $(\mathbb{E}[H(x)] - f(x))^2$:</strong> Error from overly simplistic assumptions (underfitting, e.g. line for cubic data). High bias causes high train RMSE and high test RMSE.</li>
                <li><strong>Model Variance $\mathbb{E}[(H(x) - \mathbb{E}[H(x)])^2]$:</strong> Sensitivity to random noise in the training sample (overfitting, e.g. degree 25 polynomial). High variance causes near-zero train RMSE but massive test RMSE.</li>
                <li><strong>Observation Error ($\sigma^2$):</strong> Irreducible random noise in measurement or nature that cannot be eliminated by any model.</li>
              </ol>
            </li>
            <li>Tradeoff dynamics:
              <ul>
                <li>Increasing sample size $n$ decreases model variance toward 0; bias remains constant if the model family is misspecified.</li>
                <li>Increasing model complexity $d$ decreases bias but increases variance (in linear regression, variance $\propto \frac{d}{n}$).</li>
              </ul>
            </li>
          </ul>
        </div>

        <div>
          <div class="section-title">Train-Test Splits & Validation Diagnostics</div>
          <pre>from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.25, random_state=42
)
model.fit(X_train, y_train)

rmse_train = np.sqrt(mean_squared_error(y_train, model.predict(X_train)))
rmse_test  = np.sqrt(mean_squared_error(y_test, model.predict(X_test)))</pre>
          <ul>
            <li>Diagnostic Rules:
              <ul>
                <li>$\text{RMSE}_{\text{train}} \approx \text{RMSE}_{\text{test}}$ (both low) $\implies$ well-calibrated model that generalizes well.</li>
                <li>$\text{RMSE}_{\text{train}} \ll \text{RMSE}_{\text{test}}$ $\implies$ overfitting (high variance); address by collecting more data, regularizing, or dropping features.</li>
                <li>$\text{RMSE}_{\text{train}} \approx \text{RMSE}_{\text{test}}$ (both high) $\implies$ underfitting (high bias); address with feature engineering or non-linear terms.</li>
              </ul>
            </li>
          </ul>
        </div>

        <div class="interview-section">
          <div class="interview-heading">Professor Interview Focus</div>
          <ul>
            <li><strong>What error does training RMSE measure versus test RMSE?</strong> Training error reflects <em>only bias</em> (how well the model family fits the sample). Test error reflects <em>both bias and variance</em> (generalization risk).</li>
            <li><strong>Why does a degree 25 polynomial fail on test data despite 0 training error?</strong> It has zero bias but massive model variance; it interpolates random noise in the training sample rather than capturing the population relationship.</li>
          </ul>
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
