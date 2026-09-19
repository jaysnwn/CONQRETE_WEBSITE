import os

path = "app/(storefront)/products/[slug]/productdetailclient.tsx"
with open(path, "r", encoding="utf-8") as f:
    text = f.read()

# 1. Revert aspect-ratios back to 1/1
text = text.replace("aspect-ratio: 16/10;", "aspect-ratio: 1/1;")

# 2. Fix the grid stretching issue by adding alignItems: 'start'
old_grid = "<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 450px), 1fr))', gap: 'clamp(24px, 4vw, 60px)' }}>"
new_grid = "<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 450px), 1fr))', gap: 'clamp(24px, 4vw, 60px)', alignItems: 'start' }}>"
text = text.replace(old_grid, new_grid)

# We also ensure objectFit is 'cover' (it should be from previous step, but let's be sure)
# Actually, the user wants no gaps and no crops. If image is 1:1 and container is 1:1, cover is perfect.

with open(path, "w", encoding="utf-8") as f:
    f.write(text)
