CSS = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>DSC 80 — 4-Page Review Cheatsheet (Lectures 13-16)</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js" onload="renderMathInElement(document.body, {delimiters: [{left: '$$', right: '$$', display: true}, {left: '$', right: '$', display: false}]});"></script>
<style>
  @page {
    size: letter portrait;
    margin: 0.22in 0.26in 0.22in 0.26in;
  }
  * {
    box-sizing: border-box;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    font-size: 7.15pt;
    line-height: 1.18;
    color: #111;
    background: #fff;
    margin: 0;
    padding: 0;
  }
  .page {
    width: 100%;
    height: 10.54in;
    max-height: 10.54in;
    overflow: hidden;
    page-break-after: always;
    page-break-inside: avoid;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-bottom: 2px;
  }
  .page:last-child {
    page-break-after: avoid;
  }
  
  /* Clean Header */
  .page-header {
    border-bottom: 1.8pt solid #000;
    padding-bottom: 1.5px;
    margin-bottom: 3.5px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  .page-title {
    font-size: 11pt;
    font-weight: 800;
    letter-spacing: -0.2px;
    text-transform: uppercase;
    color: #000;
  }
  .page-subtitle {
    font-size: 7.3pt;
    font-weight: 600;
    color: #333;
  }
  .page-meta {
    font-size: 6.8pt;
    font-weight: bold;
    text-align: right;
    color: #444;
  }

  /* Two Column Clean Grid */
  .grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6px;
    flex: 1;
  }
  .column {
    display: flex;
    flex-direction: column;
    gap: 3.5px;
  }

  /* Section Blocks */
  .section-title {
    font-size: 7.6pt;
    font-weight: 800;
    text-transform: uppercase;
    border-bottom: 0.8pt solid #000;
    padding-bottom: 1px;
    margin: 2px 0 2px 0;
    letter-spacing: 0.2px;
    color: #000;
  }

  /* Bullet Points */
  ul {
    margin: 0 0 2px 0;
    padding-left: 11px;
  }
  ol {
    margin: 0 0 2px 0;
    padding-left: 12px;
  }
  li {
    margin-bottom: 1.2px;
  }
  p {
    margin: 0 0 2px 0;
  }
  b, strong {
    font-weight: 700;
    color: #000;
  }

  /* Formula Box */
  .formula-box {
    background: #f8f8f8;
    border: 0.6pt solid #444;
    padding: 1.5px 3px;
    margin: 1.5px 0;
    text-align: center;
  }
  .katex { font-size: 0.96em !important; }
  .katex-display { margin: 1px 0 !important; }

  /* Code Block */
  code {
    font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
    font-size: 6.1pt;
    background: #f2f2f2;
    padding: 0.3px 2px;
    border-radius: 1px;
    border: 0.4pt solid #ccc;
  }
  pre {
    font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
    font-size: 6pt;
    line-height: 1.12;
    background: #f7f7f7;
    border: 0.6pt solid #444;
    border-left: 2pt solid #000;
    padding: 2px 3.5px;
    margin: 1.5px 0;
    white-space: pre-wrap;
    word-break: break-word;
  }

  /* Table */
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 6.2pt;
    margin: 1.5px 0;
  }
  th, td {
    border: 0.5pt solid #333;
    padding: 1px 2px;
    text-align: left;
  }
  th {
    background: #e6e6e6;
    font-weight: 700;
  }

  /* Interview Callout */
  .interview-section {
    border: 0.8pt solid #000;
    border-left: 2.5pt solid #000;
    background: #fbfbfb;
    padding: 2.5px 4.5px;
    margin-top: 2px;
  }
  .interview-heading {
    font-weight: 800;
    font-size: 7.2pt;
    text-transform: uppercase;
    border-bottom: 0.5pt solid #666;
    margin-bottom: 1.5px;
    padding-bottom: 1px;
  }

  .footer {
    border-top: 0.6pt solid #666;
    font-size: 5.8pt;
    display: flex;
    justify-content: space-between;
    padding-top: 1px;
    color: #555;
  }
</style>
</head>
<body>
"""
