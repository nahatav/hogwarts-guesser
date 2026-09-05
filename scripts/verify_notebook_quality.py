import json
import nbformat
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('project.ipynb', 'r', encoding='utf-8') as f:
    nb = json.load(f)

long_lines = []
for c_idx, cell in enumerate(nb['cells']):
    if cell['cell_type'] == 'code':
        for l_idx, line in enumerate(cell['source']):
            if len(line.rstrip('\n')) > 90:
                long_lines.append((c_idx, l_idx, len(line.rstrip('\n')), line.rstrip('\n')[:80] + '...'))

print(f"Total code cells: {sum(1 for c in nb['cells'] if c['cell_type'] == 'code')}")
print(f"Total markdown cells: {sum(1 for c in nb['cells'] if c['cell_type'] == 'markdown')}")
print(f"Number of code lines longer than 90 chars: {len(long_lines)}")
for item in long_lines[:10]:
    print("  Cell", item[0], "Line", item[1], "Length:", item[2], "->", item[3])
