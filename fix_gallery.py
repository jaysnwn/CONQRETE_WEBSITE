import os

path = "app/(storefront)/products/[slug]/productdetailclient.tsx"
with open(path, "r", encoding="utf-8") as f:
    text = f.read()

old_css = """              .product-gallery {
                display: flex;
                gap: 16px;
                flex-direction: row;
                height: fit-content;
              }"""

new_css = """              .product-gallery {
                display: flex;
                gap: 16px;
                flex-direction: row;
                height: fit-content;
                align-items: flex-start;
              }"""
              
text = text.replace(old_css, new_css)

with open(path, "w", encoding="utf-8") as f:
    f.write(text)
