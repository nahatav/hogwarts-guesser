PAGE1 = r"""
<!-- PAGE 1: LECTURE 13 -->
<div class="page">
  <div>
    <div class="page-header">
      <div>
        <div class="page-title">Lecture 13 — Text Features, Bag of Words & TF-IDF</div>
        <div class="page-subtitle">DSC 80 Cheatsheet • Text Vectorization, Cosine Similarity, Stopwords & Corpus Statistics</div>
      </div>
      <div class="page-meta">Page 1 of 4<br><strong>ENGAGEMENT REVIEW</strong></div>
    </div>

    <div class="grid-2">
      <!-- COLUMN 1 -->
      <div class="column">
        <div class="card">
          <div class="card-header">
            <span>1. Text Preprocessing & Canonicalization</span>
            <span class="badge">Pipeline</span>
          </div>
          <p><strong>Core Dilemma:</strong> Machine learning algorithms require structured quantitative matrices, not raw strings. Goal: turn text into vectors while preserving semantic meaning.</p>
          <div class="subhead">Core Canonicalization Steps (San Diego Salaries):</div>
          <ul>
            <li><strong>Lowercasing:</strong> <code>s.str.lower()</code> ensures case invariance (<code>'Chief' == 'chief'</code>).</li>
            <li><strong>Punctuation Removal:</strong> Regex <code>r'[^\w\s]'</code> strips commas, slashes, dashes, periods (<code>'Asst. Chief' -> 'asst chief'</code>).</li>
            <li><strong>Glue / Stopwords:</strong> Remove ubiquitous non-informative grammar tokens (<code>'and'</code>, <code>'of'</code>, <code>'the'</code>, <code>'in'</code>, <code>'to'</code>) that dominate counts without distinguishing topics.</li>
            <li><strong>Domain-Specific Tokens:</strong> Strip Roman numerals (<code>r'\b(i|ii|iii|iv|v)\b'</code>), pay grades, or department codes.</li>
          </ul>
          <p style="font-size: 6.2pt; border-left: 1.5pt solid #444; padding-left: 3px; margin-top: 1px;">
            <strong>Ethics & Privacy:</strong> Public datasets (e.g. employee salaries) contain PII. Respect privacy rights; work only with necessary, non-identifying fields.
          </p>
        </div>

        <div class="card">
          <div class="card-header">
            <span>2. Bag of Words (BoW) & Counts Matrix</span>
            <span class="badge">Representation</span>
          </div>
          <p><strong>Definition:</strong> Represents text as an unordered multiset of word frequencies over vocabulary $V$.</p>
          <ul>
            <li><strong>Counts Matrix:</strong> Matrix $M \in \mathbb{R}^{N \times |V|}$ where row $i$ is doc $d_i$ and column $j$ is term $w_j$. $M_{i,j} = \text{count}(w_j \text{ in } d_i)$.</li>
            <li><strong>Lost Info:</strong> Word order, grammar, syntax, and negation (<em>'not great, bad'</em> vs <em>'not bad, great'</em> map to identical vectors).</li>
            <li><strong>Sparsity:</strong> Real text matrices are >99% zeros; stored as SciPy <code>csr_matrix</code> to prevent memory overflow.</li>
          </ul>
          <pre>from sklearn.feature_extraction.text import CountVectorizer
cv = CountVectorizer() # stop_words='english', min_df=2
X = cv.fit_transform(corpus) # Sparse matrix (N, |V|)
vocab = cv.get_feature_names_out() # Array of words</pre>
        </div>

        <div class="card">
          <div class="card-header">
            <span>3. Similarity: Dot Product vs Cosine Similarity</span>
            <span class="badge">Geometry</span>
          </div>
          <p><strong>Dot Product:</strong> $\vec{u} \cdot \vec{v} = \sum_{j=1}^{|V|} u_j v_j = \|\vec{u}\|_2 \|\vec{v}\|_2 \cos(\theta)$.</p>
          <ul>
            <li><em>Flaw:</em> Heavily biased by document length. Two long unrelated essays can have a higher dot product than two short identical summaries.</li>
          </ul>
          <div class="formula-box">
            $$\text{CosineSim}(\vec{u}, \vec{v}) = \cos(\theta) = \frac{\vec{u} \cdot \vec{v}}{\|\vec{u}\|_2 \|\vec{v}\|_2} = \left(\frac{\vec{u}}{\|\vec{u}\|_2}\right) \cdot \left(\frac{\vec{v}}{\|\vec{v}\|_2}\right) = \frac{\sum u_j v_j}{\sqrt{\sum u_j^2}\sqrt{\sum v_j^2}}$$
          </div>
          <ul>
            <li><strong>Range:</strong> For non-negative counts, $\text{CosineSim} \in [0, 1]$ (1 = identical word distribution/direction; 0 = orthogonal / no words shared).</li>
            <li><strong>Why Cosine Similarity?</strong> It isolates vector <em>direction</em> (word proportion) from <em>magnitude</em> (length), achieving length invariance!</li>
          </ul>
        </div>
      </div>

      <!-- COLUMN 2 -->
      <div class="column">
        <div class="card">
          <div class="card-header">
            <span>4. TF-IDF Deep Dive</span>
            <span class="badge">Core Metric</span>
          </div>
          <p><strong>Goal:</strong> Quantify how informative or characteristic word $t$ is to document $d$ within a corpus of $N$ documents.</p>
          <div class="formula-box">
            $$\text{tfidf}(t, d) = \text{tf}(t, d) \times \text{idf}(t) = \frac{\text{count}(t \text{ in } d)}{\text{len}(d)} \times \log\left(\frac{N}{\text{df}(t)}\right)$$
          </div>
          <div class="subhead">Why the Logarithm in IDF? (Essential Interview Concept):</div>
          <ol>
            <li><strong>Dampens Extreme Ratios:</strong> If $N=10^6$ and $\text{df}=1$, raw ratio is $10^6$. Log dampens this to $\approx 13.8$ so IDF doesn't overpower TF.</li>
            <li><strong>Diminishing Returns of Rarity:</strong> Appearing in 2/50 vs 2/500 docs is rare in both; log makes their weights close rather than 10x apart.</li>
            <li><strong>Universal Word Cancellation:</strong> If word is in all $N$ docs, $\text{df}=N \implies \text{idf} = \log(N/N) = \log(1) = 0 \implies \text{tfidf}=0$!</li>
          </ol>
          <div class="subhead">When is TF-IDF Exactly Zero?</div>
          <ul>
            <li><strong>Case 1:</strong> Word $t$ not in doc $d$ ($\text{tf}=0$).</li>
            <li><strong>Case 2:</strong> Word $t$ in <em>all documents</em> in corpus ($\text{idf}=\log(1)=0$).</li>
          </ul>
          <pre>from sklearn.feature_extraction.text import TfidfVectorizer
tv = TfidfVectorizer() # smooth_idf=True by default
tfidf_matrix = tv.fit_transform(corpus) # Shape: (N, |V|)</pre>
        </div>

        <div class="card">
          <div class="card-header">
            <span>5. Inaugural Addresses & Exam Walkthrough</span>
            <span class="badge">Exam Problem</span>
          </div>
          <p><strong>Presidential Addresses:</strong> Identifies distinct thematic keywords per speech (Washington: <em>'providence'</em>, Lincoln: <em>'slaves'</em>, FDR: <em>'action'</em>) while filtering common political rhetoric (<em>'america'</em>, <em>'government'</em>).</p>
          <div class="subhead">Fall '23 Final Exam Problem:</div>
          <table>
            <tr><th>Doc</th><th>Content</th><th>Vector [today, yesterday, sunny, rainy]</th></tr>
            <tr><td><strong>D1</strong></td><td>yesterday rainy today sunny</td><td><code>[1, 1, 1, 1]</code> (Norm: $\sqrt{4}=2$)</td></tr>
            <tr><td><strong>D2</strong></td><td>yesterday sunny today sunny</td><td><code>[1, 1, 2, 0]</code> (Norm: $\sqrt{6}$)</td></tr>
            <tr><td><strong>D3</strong></td><td>today rainy yesterday today</td><td><code>[2, 1, 0, 1]</code> (Norm: $\sqrt{6}$)</td></tr>
            <tr><td><strong>D4</strong></td><td>yesterday yesterday today today</td><td><code>[2, 2, 0, 0]</code> (Norm: $\sqrt{8}$)</td></tr>
          </table>
          <ul style="font-size: 6.2pt;">
            <li><strong>Words with TF-IDF = 0 across all 4 docs:</strong> <code>today</code> and <code>yesterday</code> (in all 4 docs $\implies \text{df}=4 \implies \text{idf}=\log(4/4)=0$).</li>
            <li><strong>Cosine Similarity between D2 and D3:</strong><br>
              $\vec{u} \cdot \vec{v} = (1)(2) + (1)(1) + (2)(0) + (0)(1) = 3$.<br>
              $\text{Sim}(D2, D3) = \frac{3}{\sqrt{6} \cdot \sqrt{6}} = \frac{3}{6} = 0.5$.
            </li>
          </ul>
        </div>

        <div class="interview-box">
          <div class="interview-title">
            <span>Engagement Interview Probing Q&A</span>
            <span class="badge">Interview Prep</span>
          </div>
          <p><span class="q">Q: Why is Cosine Similarity preferred over Euclidean distance on text?</span><br>
          <span class="a"><strong>A:</strong> Euclidean distance scales with document length ($\|\vec{u}-\vec{v}\|_2$ grows as word count grows even for identical topics). Cosine similarity measures angle/distribution, ensuring length-invariance.</span></p>
          <p><span class="q">Q: What happens if a test document contains a word not seen in training?</span><br>
          <span class="a"><strong>A:</strong> Out-of-vocabulary (OOV) words are ignored during <code>.transform()</code> because vocabulary matrix dimensions are fixed during <code>.fit()</code>.</span></p>
        </div>
      </div>
    </div>
  </div>
  <div class="footer">
    <span>DSC 80 — Principles of Data Science</span>
    <span>Lecture 13: Text Features, BoW & TF-IDF</span>
    <span>Page 1 of 4</span>
  </div>
</div>
"""
