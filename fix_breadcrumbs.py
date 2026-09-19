import os

path = "components/ui/breadcrumbs.tsx"
with open(path, "r", encoding="utf-8") as f:
    text = f.read()

# Replace <nav> with <div>
text = text.replace('<nav aria-label="Breadcrumb"', '<div aria-label="Breadcrumb"')
text = text.replace('</nav>', '</div>')

with open(path, "w", encoding="utf-8") as f:
    f.write(text)
