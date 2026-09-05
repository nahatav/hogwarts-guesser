import pandas as pd
import numpy as np
np.set_printoptions(legacy='1.21')
from pathlib import Path
import re
import requests
import time


def get_book(url):
    time.sleep(0.5)
    text = requests.get(url).text.replace('\r\n', '\n')
    start = re.search(r'\*\*\*\s*START OF[^\n]*\*\*\*', text, re.IGNORECASE)
    end = re.search(r'\*\*\*\s*END OF[^\n]*\*\*\*', text, re.IGNORECASE)
    if start and end:
        return text[start.end():end.start()]
    return text


def tokenize(book_string):
    cleaned = re.sub(r'(\r\n|\n){2,}', ' \x03 \x02 ', book_string.strip())
    return re.findall(r'[\w]+|[^\w\s]', '\x02 ' + cleaned + ' \x03')


class UniformLM(object):

    def __init__(self, tokens):
        self.mdl = self.train(tokens)

    def train(self, tokens):
        uniques = pd.Series(tokens).unique()
        return pd.Series(1 / len(uniques), index=uniques)

    def probability(self, words):
        prob = 1.0
        for w in words:
            if w not in self.mdl.index:
                return 0
            prob *= self.mdl[w]
        return prob

    def sample(self, M):
        return ' '.join(np.random.choice(self.mdl.index, size=M, replace=True, p=self.mdl.values))


class UnigramLM(object):

    def __init__(self, tokens):
        self.mdl = self.train(tokens)

    def train(self, tokens):
        return pd.Series(tokens).value_counts(normalize=True)

    def probability(self, words):
        prob = 1.0
        for w in words:
            if w not in self.mdl.index:
                return 0
            prob *= self.mdl[w]
        return prob

    def sample(self, M):
        return ' '.join(np.random.choice(self.mdl.index, size=M, replace=True, p=self.mdl.values))


class NGramLM(object):

    def __init__(self, N, tokens):
        self.N = N
        ngrams = self.create_ngrams(tokens)
        self.ngrams = ngrams
        self.mdl = self.train(ngrams)

        if N < 2:
            raise Exception('N must be greater than 1')
        elif N == 2:
            self.prev_mdl = UnigramLM(tokens)
        else:
            self.prev_mdl = NGramLM(N - 1, tokens)

    def create_ngrams(self, tokens):
        return [tuple(tokens[i:i + self.N]) for i in range(len(tokens) - self.N + 1)]

    def train(self, ngrams):
        counts = pd.Series(ngrams).value_counts().reset_index()
        counts.columns = ['ngram', 'count']
        counts['n1gram'] = counts['ngram'].apply(lambda x: x[:-1])
        n1_totals = counts.groupby('n1gram')['count'].transform('sum')
        counts['prob'] = counts['count'] / n1_totals
        return counts[['ngram', 'n1gram', 'prob']]

    def probability(self, words):
        if len(words) < self.N:
            return self.prev_mdl.probability(words)

        prob = self.prev_mdl.probability(words[:self.N - 1])
        if prob == 0:
            return 0

        ngram_map = dict(zip(self.mdl['ngram'], self.mdl['prob']))
        for i in range(len(words) - self.N + 1):
            ng = tuple(words[i:i + self.N])
            if ng not in ngram_map:
                return 0
            prob *= ngram_map[ng]
        return prob

    def _sample_next(self, prefix):
        if len(prefix) < self.N - 1:
            return self.prev_mdl._sample_next(prefix)

        if not hasattr(self, '_transitions'):
            self._transitions = {}
            for ng, p in zip(self.mdl['ngram'], self.mdl['prob']):
                n1 = ng[:-1]
                if n1 not in self._transitions:
                    self._transitions[n1] = [[], []]
                self._transitions[n1][0].append(ng[-1])
                self._transitions[n1][1].append(p)

        if prefix not in self._transitions:
            return '\x03'
        choices, probs = self._transitions[prefix]
        total = sum(probs)
        if total == 0:
            return '\x03'
        norm_probs = [p / total for p in probs]
        return np.random.choice(choices, p=norm_probs)

    def sample(self, M):
        tokens = ['\x02']
        for _ in range(M - 1):
            prefix = tuple(tokens[-(self.N - 1):])
            next_token = self._sample_next(prefix)
            tokens.append(next_token)
        tokens.append('\x03')
        return ' '.join(tokens)
