PAGE2 = r"""
<!-- PAGE 2: LECTURE 14 -->
<div class="page">
  <div>
    <div class="page-header">
      <div>
        <div class="page-title">Lecture 14 — Linear Regression & Empirical Risk Minimization</div>
        <div class="page-subtitle">DSC 80 Cheatsheet • ERM Framework, SLR, MLR, Normal Equation, RMSE, R² & Residual Diagnostics</div>
      </div>
      <div class="page-meta">Page 2 of 4<br><strong>ENGAGEMENT REVIEW</strong></div>
    </div>

    <div class="grid-2">
      <!-- COLUMN 1 -->
      <div class="column">
        <div class="card">
          <div class="card-header">
            <span>1. Modeling Philosophy & Empirical Risk (ERM)</span>
            <span class="badge">Framework</span>
          </div>
          <p><strong>What is a Model?</strong> An intentional simplification of reality.</p>
          <ul>
            <li><strong>Prediction:</strong> Accurate estimation of unseen $y_{\text{new}}$ from $\vec{x}_{\text{new}}$.</li>
            <li><strong>Inference / Explanation:</strong> Interpreting relationships between features and response via weights $w_j$.</li>
          </ul>
          <div class="subhead">The ERM Framework Under Squared Loss:</div>
          <ul>
            <li><strong>Dataset:</strong> $\{(x_i, y_i)\}_{i=1}^n$. Prediction: $\hat{y}_i = H(x_i)$.</li>
            <li><strong>Residual:</strong> $e_i = y_i - \hat{y}_i = y_i - H(x_i)$.</li>
            <li><strong>Squared Loss:</strong> $L(y_i, H(x_i)) = (y_i - H(x_i))^2$.</li>
            <li><strong>Mean Squared Error (MSE / Empirical Risk):</strong>
              <div class="formula-box">$$R_{\text{sq}}(H) = \frac{1}{n}\sum_{i=1}^n (y_i - H(x_i))^2 = \frac{1}{n}\sum_{i=1}^n e_i^2$$</div>
            </li>
            <li><strong>Root Mean Squared Error (RMSE):</strong> $\text{RMSE} = \sqrt{R_{\text{sq}}(H)}$. Matches physical units of $y$ (e.g. dollars).</li>
          </ul>
        </div>

        <div class="card">
          <div class="card-header">
            <span>2. Baseline Models: Constant & Simple Linear (SLR)</span>
            <span class="badge">Derivation</span>
          </div>
          <div class="subhead">Model #1: Constant Model $H(x) = c$</div>
          <ul>
            <li>Minimizing MSE: $\frac{d}{dc}\left[\frac{1}{n}\sum(y_i - c)^2\right] = 0 \implies c^* = \bar{y} = \frac{1}{n}\sum y_i$.</li>
            <li><strong>Baseline RMSE:</strong> $\text{RMSE}(c^*) = \sqrt{\frac{1}{n}\sum(y_i - \bar{y})^2} = \sigma_y$ (sample standard deviation of $y$). A model is useful only if its $\text{RMSE} < \sigma_y$.</li>
          </ul>
          <div class="subhead">Model #2: Simple Linear Regression (SLR) $H(x) = w_0 + w_1 x$</div>
          <div class="formula-box">
            $$w_1^* = r \frac{\sigma_y}{\sigma_x} = \frac{\text{Cov}(x, y)}{\sigma_x^2} = \frac{\sum(x_i - \bar{x})(y_i - \bar{y})}{\sum(x_i - \bar{x})^2} \quad \Big| \quad w_0^* = \bar{y} - w_1^* \bar{x}$$
          </div>
          <div class="subhead">Key Properties of SLR (Must-Know for Interview):</div>
          <ol>
            <li><strong>Centroid Intersection:</strong> Passes through center of mass $(\bar{x}, \bar{y})$.</li>
            <li><strong>Mean Residual is Zero:</strong> $\sum_{i=1}^n e_i = 0 \implies \bar{e} = 0$.</li>
            <li><strong>Residuals Orthogonal to Features:</strong> $\sum x_i e_i = 0$.</li>
          </ol>
        </div>

        <div class="card">
          <div class="card-header">
            <span>3. Multiple Linear Regression & Normal Equation</span>
            <span class="badge">Matrix Math</span>
          </div>
          <p><strong>Formulation:</strong> $H(\vec{x}) = w_0 + w_1 x^{(1)} + \dots + w_d x^{(d)} = \vec{x}^T \vec{w}$.</p>
          <ul>
            <li><strong>Design Matrix $X \in \mathbb{R}^{n \times (d+1)}$:</strong> First column is 1s (for intercept $w_0$).</li>
            <li><strong>Predictions:</strong> $\hat{\vec{y}} = X \vec{w}$. <strong>Residuals:</strong> $\vec{e} = \vec{y} - X \vec{w}$.</li>
            <li><strong>Empirical Risk in Matrix Form:</strong> $\|\vec{y} - X \vec{w}\|_2^2$.</li>
          </ul>
          <div class="formula-box">
            <strong>The Normal Equation:</strong> $$\vec{w}^* = (X^T X)^{-1} X^T \vec{y}$$
          </div>
          <p style="font-size: 6.2pt;">
            <em>Invertibility Condition:</em> $X^T X$ is invertible iff $X$ has <strong>full column rank $(d+1)$</strong> (no redundant/collinear columns and $n > d$).
          </p>
        </div>
      </div>

      <!-- COLUMN 2 -->
      <div class="column">
        <div class="card">
          <div class="card-header">
            <span>4. Model Evaluation: R² & Variance Explained</span>
            <span class="badge">Assessment</span>
          </div>
          <p><strong>Coefficient of Determination ($R^2$):</strong> Proportion of variance in response $y$ explained by the linear model.</p>
          <div class="formula-box">
            $$R^2 = 1 - \frac{\sum(y_i - \hat{y}_i)^2}{\sum(y_i - \bar{y})^2} = 1 - \frac{\text{Var}(\text{residuals})}{\text{Var}(y)} = 1 - \frac{\text{MSE}(H)}{\text{MSE}(\text{mean model})}$$
          </div>
          <div class="subhead">Relationship Between RMSE and R²:</div>
          <div class="formula-box">
            $$\text{RMSE} = \sigma_y \sqrt{1 - R^2} \iff R^2 = 1 - \left(\frac{\text{RMSE}}{\sigma_y}\right)^2$$
          </div>
          <div class="subhead">R² Interpretations:</div>
          <ul>
            <li><strong>$R^2 = 1$:</strong> Perfect fit ($\text{RMSE} = 0$). All residuals are zero.</li>
            <li><strong>$R^2 = 0$:</strong> Model performs identically to predicting sample mean $\bar{y}$.</li>
            <li><strong>$R^2 < 0$:</strong> Model performs <em>worse</em> than sample mean (possible on test sets or models fit without intercept).</li>
            <li><strong>SLR Special Case:</strong> In SLR with intercept, $R^2 = r^2$ (square of Pearson correlation $r$).</li>
          </ul>
        </div>

        <div class="card">
          <div class="card-header">
            <span>5. Residual Plots & Diagnostics</span>
            <span class="badge">Visual Check</span>
          </div>
          <p><strong>Residual Plot:</strong> Plot $e_i$ (y-axis) vs fitted values $\hat{y}_i$ or features $x_i$ (x-axis).</p>
          <ul>
            <li><strong>Ideal Pattern:</strong> Random, uniform horizontal scatter around 0 with constant spread (<strong>homoscedasticity</strong>).</li>
            <li><strong>Curved / U-Shaped Pattern:</strong> Non-linear relationship present (need non-linear feature transformation like $\log(x)$ or polynomial).</li>
            <li><strong>Funnel / Fan Pattern:</strong> Variance of errors grows with $\hat{y}$ (<strong>heteroscedasticity</strong>). OLS estimates are unbiased but not optimal.</li>
          </ul>
        </div>

        <div class="card">
          <div class="card-header">
            <span>6. Sklearn Mechanics & Tips Benchmark</span>
            <span class="badge">Code & Data</span>
          </div>
          <pre>from sklearn.linear_model import LinearRegression
X = tips[['total_bill', 'size']] # Must be 2D DataFrame/matrix
y = tips['tip']                  # Must be 1D Series/vector

lr = LinearRegression(fit_intercept=True)
lr.fit(X, y)
print("Coefficients:", lr.coef_)      # Array of weights [w1, w2]
print("Intercept:", lr.intercept_)    # w0
print("R^2 Score:", lr.score(X, y))   # Returns R^2 score</pre>
          <div class="subhead">Restaurant Tips Benchmark Progression:</div>
          <table>
            <tr><th>Model</th><th>Features</th><th>RMSE</th><th>R²</th></tr>
            <tr><td><strong>Constant Model</strong></td><td>None (predicts $\bar{y} = \$3.00$)</td><td>$1.383</td><td>0.000</td></tr>
            <tr><td><strong>SLR</strong></td><td><code>total_bill</code></td><td>$1.018</td><td>0.457</td></tr>
            <tr><td><strong>MLR (2 Feats)</strong></td><td><code>total_bill</code>, <code>size</code></td><td>$1.009</td><td>0.468</td></tr>
          </table>
        </div>

        <div class="interview-box">
          <div class="interview-title">
            <span>Engagement Interview Probing Q&A</span>
            <span class="badge">Interview Prep</span>
          </div>
          <p><span class="q">Q: What happens to training RMSE when adding an extra feature to MLR?</span><br>
          <span class="a"><strong>A:</strong> Training RMSE will <em>always decrease or stay the same</em>; $R^2$ will always increase or stay the same. However, test RMSE may increase due to overfitting!</span></p>
          <p><span class="q">Q: Can R² be negative?</span><br>
          <span class="a"><strong>A:</strong> Yes, on test data. If test MSE exceeds the variance of test $y$ around its mean $\bar{y}_{\text{test}}$, then $R^2 < 0$.</span></p>
        </div>
      </div>
    </div>
  </div>
  <div class="footer">
    <span>DSC 80 — Principles of Data Science</span>
    <span>Lecture 14: Linear Regression & ERM</span>
    <span>Page 2 of 4</span>
  </div>
</div>
"""
