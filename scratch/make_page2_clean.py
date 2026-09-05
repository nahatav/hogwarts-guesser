PAGE2 = r"""
<!-- PAGE 2: LECTURE 14 -->
<div class="page">
  <div>
    <div class="page-header">
      <div>
        <div class="page-title">Lecture 14 — Linear Regression & Empirical Risk Minimization</div>
        <div class="page-subtitle">DSC 80 • Loss Functions, SLR, Multiple Linear Regression, Normal Equation, R² & Residual Diagnostics</div>
      </div>
      <div class="page-meta">Page 2 of 4<br><strong>STUDY NOTES</strong></div>
    </div>

    <div class="grid-2">
      <!-- COLUMN 1 -->
      <div class="column">
        
        <div>
          <div class="section-title">Modeling & Empirical Risk Minimization (ERM)</div>
          <ul>
            <li>A model is an intentional simplification of reality used for prediction ($\hat{y}_{\text{new}} = H(\vec{x}_{\text{new}})$) and inference (interpreting feature weights $w_j$).</li>
            <li>Residual $e_i = y_i - \hat{y}_i = y_i - H(x_i)$ measures the signed error for observation $i$.</li>
            <li>Squared loss $L(y_i, H(x_i)) = (y_i - H(x_i))^2$ penalizes large deviations quadratically.</li>
            <li>Mean Squared Error (MSE / Empirical Risk):</li>
          </ul>
          <div class="formula-box">
            $$R_{\text{sq}}(H) = \frac{1}{n} \sum_{i=1}^n (y_i - H(x_i))^2 = \frac{1}{n} \sum_{i=1}^n e_i^2$$
          </div>
          <ul>
            <li>Root Mean Squared Error $\text{RMSE} = \sqrt{\text{MSE}}$ is measured in the exact same units as the response variable $y$ (e.g., dollars).</li>
          </ul>
        </div>

        <div>
          <div class="section-title">Baseline Models: Constant & Simple Linear Regression</div>
          <ul>
            <li><strong>Constant Model $H(x) = c$:</strong>
              <ul>
                <li>Minimizing squared loss yields the sample mean $c^* = \bar{y} = \frac{1}{n}\sum y_i$.</li>
                <li>The baseline RMSE is the standard deviation $\sigma_y = \sqrt{\frac{1}{n}\sum(y_i - \bar{y})^2}$. A regression model is only useful if its RMSE beats $\sigma_y$.</li>
              </ul>
            </li>
            <li><strong>Simple Linear Regression (SLR) $H(x) = w_0 + w_1 x$:</strong></li>
          </ul>
          <div class="formula-box">
            $$w_1^* = r \frac{\sigma_y}{\sigma_x} = \frac{\text{Cov}(x, y)}{\sigma_x^2} = \frac{\sum(x_i - \bar{x})(y_i - \bar{y})}{\sum(x_i - \bar{x})^2} \quad \Big| \quad w_0^* = \bar{y} - w_1^* \bar{x}$$
          </div>
          <ul>
            <li>Key geometric properties of SLR:
              <ol>
                <li>The regression line always passes through the center of mass $(\bar{x}, \bar{y})$.</li>
                <li>The average of the residuals is always zero ($\sum e_i = 0 \implies \bar{e} = 0$).</li>
                <li>Residuals are completely uncorrelated with input feature $x$ ($\sum x_i e_i = 0$).</li>
              </ol>
            </li>
          </ul>
        </div>

        <div>
          <div class="section-title">Multiple Linear Regression & Normal Equation</div>
          <ul>
            <li>Models response using $d$ features: $H(\vec{x}) = w_0 + w_1 x^{(1)} + \dots + w_d x^{(d)} = \vec{x}^T \vec{w}$.</li>
            <li>Design matrix $X \in \mathbb{R}^{n \times (d+1)}$ contains a leading column of 1s to incorporate intercept $w_0$.</li>
            <li>Predictions vector: $\hat{\vec{y}} = X \vec{w}$; Residuals vector: $\vec{e} = \vec{y} - X \vec{w}$.</li>
            <li>The Normal Equation finds optimal weights minimizing squared error:</li>
          </ul>
          <div class="formula-box">
            $$\vec{w}^* = (X^T X)^{-1} X^T \vec{y}$$
          </div>
          <ul>
            <li>$X^T X$ is invertible if and only if matrix $X$ has full column rank $d+1$ (no redundant or collinear features and $n > d$).</li>
          </ul>
        </div>

      </div>

      <!-- COLUMN 2 -->
      <div class="column">
        
        <div>
          <div class="section-title">Model Evaluation: R² & Variance Explained</div>
          <ul>
            <li>The Coefficient of Determination ($R^2$) represents the fraction of variance in $y$ explained by the linear model:</li>
          </ul>
          <div class="formula-box">
            $$R^2 = 1 - \frac{\sum(y_i - \hat{y}_i)^2}{\sum(y_i - \bar{y})^2} = 1 - \frac{\text{Var}(\text{residuals})}{\text{Var}(y)} = 1 - \frac{\text{MSE}(H)}{\text{MSE}(\text{mean model})}$$
          </div>
          <ul>
            <li>Relationship between RMSE and $R^2$:
              $$\text{RMSE} = \sigma_y \sqrt{1 - R^2} \iff R^2 = 1 - \left(\frac{\text{RMSE}}{\sigma_y}\right)^2$$
            </li>
            <li>$R^2 = 1$ indicates a perfect fit ($\text{RMSE} = 0$).</li>
            <li>$R^2 = 0$ indicates the model performs identically to predicting the constant mean $\bar{y}$.</li>
            <li>$R^2 < 0$ can occur on test data when model predictions perform worse than the sample mean.</li>
            <li>In Simple Linear Regression with an intercept, $R^2 = r^2$ (square of Pearson's correlation).</li>
          </ul>
        </div>

        <div>
          <div class="section-title">Residual Diagnostics & Scikit-Learn Code</div>
          <ul>
            <li>Residual plots graph residuals $e_i$ against fitted values $\hat{y}_i$ or feature values $x_i$.</li>
            <li>Ideal pattern: random, uniform horizontal scatter around 0 with constant spread (homoscedasticity).</li>
            <li>Curvature indicates a non-linear relationship requiring feature transformations (e.g. $\log(x)$).</li>
            <li>Funnel shapes indicate heteroscedasticity (error variance grows with predicted magnitude).</li>
          </ul>
          <pre>from sklearn.linear_model import LinearRegression
X = tips[['total_bill', 'size']] # 2D DataFrame
y = tips['tip']                  # 1D Series
lr = LinearRegression(fit_intercept=True)
lr.fit(X, y)
print("Coefficients:", lr.coef_)      # [w1, w2]
print("Intercept:", lr.intercept_)    # w0
print("R^2 Score:", lr.score(X, y))   # Returns R^2</pre>
          <ul>
            <li>Restaurant Tips progression (course benchmark):
              <table>
                <tr><th>Model</th><th>Features</th><th>RMSE</th><th>R²</th></tr>
                <tr><td>Constant Model</td><td>None (predicts $\bar{y} = \$3.00$)</td><td>$1.383</td><td>0.000</td></tr>
                <tr><td>SLR</td><td><code>total_bill</code></td><td>$1.018</td><td>0.457</td></tr>
                <tr><td>MLR</td><td><code>total_bill</code>, <code>size</code></td><td>$1.009</td><td>0.468</td></tr>
              </table>
            </li>
          </ul>
        </div>

        <div class="interview-section">
          <div class="interview-heading">Professor Interview Focus</div>
          <ul>
            <li><strong>What happens to training RMSE when adding another feature to MLR?</strong> Training RMSE will always decrease or stay the same ($R^2$ will always increase or stay the same). However, test RMSE can get worse due to overfitting.</li>
            <li><strong>Why can test R² be negative?</strong> If test set MSE exceeds the variance of test $y$ around its mean $\bar{y}_{\text{test}}$, then $1 - \frac{\text{MSE}}{\text{Var}} < 0$.</li>
          </ul>
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

with open('scratch/pages/page2_clean.py', 'w', encoding='utf-8') as f:
    f.write(f'PAGE2 = r"""{PAGE2}"""\n')
print("Wrote page2_clean.py")
