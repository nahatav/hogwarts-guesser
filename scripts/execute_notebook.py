import nbformat
from nbclient import NotebookClient
import sys

sys.stdout.reconfigure(encoding='utf-8')

print("Executing project.ipynb end-to-end...")
with open('project.ipynb', 'r', encoding='utf-8') as f:
    nb = nbformat.read(f, as_version=4)

client = NotebookClient(nb, timeout=600, kernel_name='python3')
client.execute()

with open('project.ipynb', 'w', encoding='utf-8') as f:
    nbformat.write(nb, f)

print("project.ipynb executed and updated with all outputs successfully!")
