import os

path = "app/(storefront)/products/[slug]/productdetailclient.tsx"
with open(path, "r", encoding="utf-8") as f:
    text = f.read()

# Replace objectFit: 'cover' with objectFit: 'contain' for thumbnails
text = text.replace("style={{ objectFit: 'cover' }}", "style={{ objectFit: 'contain' }}")

with open(path, "w", encoding="utf-8") as f:
    f.write(text)
