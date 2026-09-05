CSS = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>DSC 80 — Comprehensive 4-Page Review Cheatsheet (Lectures 13-16)</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js" onload="renderMathInElement(document.body, {delimiters: [{left: '$$', right: '$$', display: true}, {left: '$', right: '$', display: false}]});"></script>
<style>
  @page {
    size: letter portrait;
    margin: 0.20in 0.24in 0.20in 0.24in;
  }
  * {
    box-sizing: border-box;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    font-size: 6.8pt;
    line-height: 1.14;
    color: #111;
    background: #fff;
    margin: 0;
    padding: 0;
  }
  .page {
    width: 100%;
    height: 10.58in;
    max-height: 10.58in;
    overflow: hidden;
    page-break-after: always;
    page-break-inside: avoid;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-bottom: 1px;
  }
  .page:last-child {
    page-break-after: avoid;
  }
  .page-header {
    border-bottom: 1.6pt solid #000;
    padding-bottom: 1px;
    margin-bottom: 2px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  .page-title {
    font-size: 10.5pt;
    font-weight: 800;
    letter-spacing: -0.2px;
    text-transform: uppercase;
    color: #000;
  }
  .page-subtitle {
    font-size: 7.1pt;
    font-weight: 600;
    color: #333;
  }
  .page-meta {
    font-size: 6.5pt;
    font-weight: bold;
    text-align: right;
    color: #444;
  }
  .grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4px;
    flex: 1;
  }
  .column {
    display: flex;
    flex-direction: column;
    gap: 2.5px;
  }
  .card {
    border: 0.7pt solid #222;
    border-radius: 2px;
    padding: 2px 3.5px;
    background: #fff;
  }
  .card-header {
    font-size: 7pt;
    font-weight: 800;
    text-transform: uppercase;
    border-bottom: 0.5pt solid #444;
    padding-bottom: 0.8px;
    margin-bottom: 1.5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #f0f0f0;
    margin: -2px -3.5px 1.5px -3.5px;
    padding: 1.2px 3.5px;
  }
  .badge {
    font-size: 5.4pt;
    font-weight: 700;
    padding: 0.3px 2.2px;
    border: 0.5pt solid #000;
    border-radius: 2px;
    background: #fff;
    text-transform: uppercase;
  }
  .card-header .badge {
    background: #000;
    color: #fff;
  }
  .subhead {
    font-weight: bold;
    font-size: 6.7pt;
    color: #000;
    margin-top: 1px;
    margin-bottom: 0.4px;
    display: flex;
    align-items: center;
    gap: 2.5px;
  }
  .subhead::before {
    content: "■";
    font-size: 3.5pt;
    color: #000;
  }
  p { margin: 0 0 1px 0; }
  ul, ol { margin: 0 0 1px 0; padding-left: 9.5px; }
  li { margin-bottom: 0.2px; }
  b, strong { font-weight: 700; color: #000; }
  em { font-style: italic; }
  .formula-box {
    background: #f8f8f8;
    border: 0.5pt dashed #444;
    padding: 1px 2px;
    margin: 1px 0;
    text-align: center;
  }
  .katex { font-size: 0.95em !important; }
  .katex-display { margin: 0.5px 0 !important; }
  code {
    font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
    font-size: 5.8pt;
    background: #f2f2f2;
    padding: 0.3px 1.8px;
    border-radius: 1.2px;
    border: 0.4pt solid #ccc;
  }
  pre {
    font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
    font-size: 5.7pt;
    line-height: 1.10;
    background: #f7f7f7;
    border: 0.5pt solid #444;
    border-left: 1.8pt solid #000;
    padding: 1.4px 2.8px;
    margin: 1px 0;
    white-space: pre-wrap;
    word-break: break-word;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 5.9pt;
    margin: 0.6px 0;
  }
  th, td {
    border: 0.5pt solid #333;
    padding: 0.6px 1.5px;
    text-align: left;
  }
  th {
    background: #e6e6e6;
    font-weight: 700;
  }
  .interview-box {
    border: 0.75pt solid #000;
    border-left: 2.2pt solid #000;
    background: #f9f9f9;
    padding: 1.5px 3px;
    margin-top: 0.8px;
  }
  .interview-title {
    font-weight: 800;
    font-size: 6.5pt;
    text-transform: uppercase;
    margin-bottom: 0.6px;
    display: flex;
    justify-content: space-between;
  }
  .q { font-weight: bold; color: #000; }
  .a { color: #222; }
  .footer {
    border-top: 0.5pt solid #666;
    font-size: 5.6pt;
    display: flex;
    justify-content: space-between;
    padding-top: 0.8px;
    color: #555;
  }
</style>
</head>
<body>
"""
