PAGE1 = r"""
<!-- PAGE 1: LECTURE 13 -->
<div class="page">
  <div>
    <div class="page-header">
      <div>
        <div class="page-title">Lecture 13 — Text Features, Bag of Words & TF-IDF</div>
        <div class="page-subtitle">DSC 80 • Text Preprocessing, Counts Matrices, Cosine Similarity & Corpus Term Frequency</div>
      </div>
      <div class="page-meta">Page 1 of 4<br><strong>STUDY NOTES</strong></div>
    </div>

    <div class="grid-2">
      <!-- COLUMN 1 -->
      <div class="column">
        
        <div>
          <div class="section-title">Text Preprocessing & Canonicalization</div>
          <ul>
            <li>Machine learning models operate strictly on quantitative matrices, so raw text strings must be converted into numerical vectors.</li>
            <li>Convert all text to lowercase using <code>s.str.lower()</code> so that casing does not split identical words (e.g., "Chief" and "chief").</li>
            <li>Strip punctuation using regex <code>r'[^\w\s]'</code> so trailing periods, commas, and hyphens do not create duplicate tokens (e.g., "Asst." becomes "asst").</li>
            <li>Remove "glue" words (stop words) like <em>and, of, the, in, to, for</em> because they appear in almost every document and do not help distinguish topics.</li>
            <li>Clean domain-specific artifacts, such as Roman numerals (<code>r'\b(i|ii|iii|iv|v)\b'</code>) or internal department codes in job titles.</li>
            <li>When analyzing public data (such as city employee salaries), respect privacy by avoiding personally identifiable information (PII) and only using necessary attributes.</li>
          </ul>
        </div>

        <div>
          <div class="section-title">Bag of Words (BoW) & Counts Matrix</div>
          <ul>
            <li>The Bag of Words representation models text as an unordered collection of word frequencies from a fixed vocabulary $V$.</li>
            <li>Constructs a counts matrix $M \in \mathbb{R}^{N \times |V|}$ where row $i$ represents document $d_i$ and column $j$ is the count of vocabulary word $w_j$ in document $d_i$.</li>
            <li>Grammar, sentence structure, word order, and context are completely ignored (for example, <em>"not bad, great"</em> and <em>"not great, bad"</em> produce identical vectors).</li>
            <li>Because most words appear in only a few documents, the matrix is mostly zeros; scikit-learn stores it as a sparse matrix (<code>scipy.sparse.csr_matrix</code>) to conserve memory.</li>
          </ul>
          <pre>from sklearn.feature_extraction.text import CountVectorizer
cv = CountVectorizer(stop_words='english', min_df=2)
X = cv.fit_transform(corpus) # Sparse matrix of shape (N, |V|)
vocab = cv.get_feature_names_out() # Array of unique vocabulary words</pre>
        </div>

        <div>
          <div class="section-title">Similarity: Dot Product vs. Cosine Similarity</div>
          <ul>
            <li>The raw dot product $\vec{u} \cdot \vec{v} = \sum u_j v_j$ measures overlap, but it scales heavily with document length. Two long, completely unrelated documents can have a higher dot product than two short, identical summaries.</li>
            <li>Cosine similarity solves this by measuring the angle between vectors, normalizing for document length:</li>
          </ul>
          <div class="formula-box">
            $$\text{CosineSim}(\vec{u}, \vec{v}) = \cos(\theta) = \frac{\vec{u} \cdot \vec{v}}{\|\vec{u}\|_2 \|\vec{v}\|_2} = \frac{\sum u_j v_j}{\sqrt{\sum u_j^2}\sqrt{\sum v_j^2}}$$
          </div>
          <ul>
            <li>For non-negative count vectors, values range from $0$ (no shared words, orthogonal) to $1$ (identical word proportions and direction).</li>
            <li>Cosine similarity evaluates topic similarity based on word proportions rather than total word volume.</li>
          </ul>
        </div>

      </div>

      <!-- COLUMN 2 -->
      <div class="column">
        
        <div>
          <div class="section-title">TF-IDF (Term Frequency – Inverse Document Frequency)</div>
          <ul>
            <li>Quantifies how uniquely characteristic word $t$ is to document $d$ within a collection of $N$ total documents:</li>
          </ul>
          <div class="formula-box">
            $$\text{tfidf}(t, d) = \text{tf}(t, d) \times \text{idf}(t) = \frac{\text{count}(t \text{ in } d)}{\text{total words in } d} \times \log\left(\frac{N}{\text{df}(t)}\right)$$
          </div>
          <ul>
            <li>$\text{tf}(t, d)$ measures local importance (proportion of document $d$ consisting of word $t$).</li>
            <li>$\text{idf}(t)$ measures global rarity across all $N$ documents in the corpus ($\text{df}(t)$ is the number of documents containing $t$).</li>
            <li>Why we use $\log$ in IDF:
              <ul>
                <li>Dampens extreme ratios: if $N = 10^6$ and $\text{df}(t) = 1$, raw ratio is $10^6$; $\log(10^6) \approx 13.8$ keeps IDF from overpowering TF.</li>
                <li>Accounts for diminishing returns: appearing in $2/50$ versus $2/500$ documents is rare in both contexts, so weights should stay comparable.</li>
                <li>Cancels universal words: if a word appears in all $N$ documents, $\text{df}(t) = N \implies \text{idf}(t) = \log(1) = 0 \implies \text{tfidf} = 0$.</li>
              </ul>
            </li>
            <li>TF-IDF is exactly $0$ in two cases:
              <ol>
                <li>The word does not appear in document $d$ ($\text{tf}=0$).</li>
                <li>The word appears in every single document in the corpus ($\text{idf}=0$).</li>
              </ol>
            </li>
          </ul>
          <pre>from sklearn.feature_extraction.text import TfidfVectorizer
tv = TfidfVectorizer() # smooth_idf=True by default
tfidf_matrix = tv.fit_transform(corpus) # Shape (N, |V|)</pre>
        </div>

        <div>
          <div class="section-title">Examples & Exam Problems</div>
          <ul>
            <li>In Presidential Inaugural Addresses, common political rhetoric (<em>america</em>, <em>government</em>) receives near-zero TF-IDF across all speeches, while distinct keywords stand out (Washington: <em>providence</em>, Lincoln: <em>slaves</em>, FDR: <em>action</em>).</li>
            <li>Fall 23 Final Exam Problem with 4 documents:
              <table>
                <tr><th>Doc</th><th>Content</th><th>Vector [today, yesterday, sunny, rainy]</th></tr>
                <tr><td><strong>D1</strong></td><td>yesterday rainy today sunny</td><td><code>[1, 1, 1, 1]</code> (Norm: $\sqrt{4} = 2$)</td></tr>
                <tr><td><strong>D2</strong></td><td>yesterday sunny today sunny</td><td><code>[1, 1, 2, 0]</code> (Norm: $\sqrt{6}$)</td></tr>
                <tr><td><strong>D3</strong></td><td>today rainy yesterday today</td><td><code>[2, 1, 0, 1]</code> (Norm: $\sqrt{6}$)</td></tr>
                <tr><td><strong>D4</strong></td><td>yesterday yesterday today today</td><td><code>[2, 2, 0, 0]</code> (Norm: $\sqrt{8}$)</td></tr>
              </table>
            </li>
            <li>Words with TF-IDF $= 0$ for all documents: <code>today</code> and <code>yesterday</code> (appear in all 4 docs $\implies \text{df}=4 \implies \log(4/4)=0$).</li>
            <li>Cosine similarity between D2 and D3:
              $$\text{Sim}(D2, D3) = \frac{(1)(2) + (1)(1) + (2)(0) + (0)(1)}{\sqrt{6}\sqrt{6}} = \frac{3}{6} = 0.5$$
            </li>
          </ul>
        </div>

        <div class="interview-section">
          <div class="interview-heading">Professor Interview Focus</div>
          <ul>
            <li><strong>Why use Cosine Similarity instead of Euclidean distance?</strong> Euclidean distance grows with document length even if word proportions are identical; cosine similarity normalizes by vector norm and is strictly length-invariant.</li>
            <li><strong>How are out-of-vocabulary words handled?</strong> When calling <code>.transform()</code> on unseen test text, words not present during <code>.fit()</code> are simply ignored because matrix dimensions are fixed.</li>
          </ul>
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

with open('scratch/pages/page1_clean.py', 'w', encoding='utf-8') as f:
    f.write(f'PAGE1 = r"""{PAGE1}"""\n')
print("Wrote page1_clean.py")
