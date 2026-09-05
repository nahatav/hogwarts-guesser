# Let's fix p1, p2, p3, p4 to use raw strings r"""
for name in ['p1', 'p2', 'p3', 'p4']:
    path = f'scratch/pages/{name}.py'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    # Replace PAGE# = """ with PAGE# = r"""
    content = content.replace(f'PAGE{name[1]} = """', f'PAGE{name[1]} = r"""')
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
print("Updated all pages to raw strings")
