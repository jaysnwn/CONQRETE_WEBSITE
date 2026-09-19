import os

path = "app/(storefront)/products/[slug]/productdetailclient.tsx"
with open(path, "r", encoding="utf-8") as f:
    text = f.read()

old_css = """              .product-main-image {
                flex: 1;
                position: relative;
                aspect-ratio: 1/1;
                background-color: #f3f4f6;
                border-radius: 16px;
                overflow: hidden;
              }"""

new_css = """              .product-main-image {
                flex: 1;
                width: 100%;
                position: relative;
                aspect-ratio: 1/1;
                background-color: #f3f4f6;
                border-radius: 16px;
                overflow: hidden;
              }"""
              
text = text.replace(old_css, new_css)

with open(path, "w", encoding="utf-8") as f:
    f.write(text)
