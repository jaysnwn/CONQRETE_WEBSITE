import os

path = "app/(storefront)/products/[slug]/productdetailclient.tsx"
with open(path, "r", encoding="utf-8") as f:
    text = f.read()

# Replace the hardcoded breadcrumb with the proper Breadcrumbs component
old_breadcrumb = """          {/* Breadcrumb */}
          <div style={{ paddingBottom: '24px', fontSize: '13px', color: '#6b7280' }}>
            <Link href="/" style={{ textDecoration: 'none', color: '#6b7280' }}>Home</Link>
            <span style={{ margin: '0 8px' }}>/</span>
            <Link href="/products" style={{ textDecoration: 'none', color: '#6b7280' }}>Products</Link>
            <span style={{ margin: '0 8px' }}>/</span>
            <span style={{ color: '#111827' }}>{product.title}</span>
          </div>"""

new_breadcrumb = """          {/* Breadcrumb */}
          <div style={{ paddingBottom: '16px' }}>
            <Breadcrumbs 
              items={[
                { name: 'Home', href: '/' },
                { name: 'Products', href: '/products' },
                { name: product.category?.name || 'Category', href: `/products/${product.category?.slug || 'all'}` },
                { name: product.title, href: `/products/${product.slug}` }
              ]} 
            />
          </div>"""

text = text.replace(old_breadcrumb, new_breadcrumb)

# Make sure Breadcrumbs is imported
if "import { Breadcrumbs }" not in text:
    text = text.replace("import Link from 'next/link';", "import Link from 'next/link';\nimport { Breadcrumbs } from '#/components/ui/breadcrumbs';")

# Fix aspect ratio and object-fit
# We'll use aspect-ratio: 16/9; and object-fit: cover;
old_css_main = """              .product-main-image {
                flex: 1;
                position: relative;
                aspect-ratio: 1/1;
                background-color: #f3f4f6;
                border-radius: 16px;
                overflow: hidden;
              }"""

new_css_main = """              .product-main-image {
                flex: 1;
                position: relative;
                aspect-ratio: 16/10;
                background-color: #f3f4f6;
                border-radius: 16px;
                overflow: hidden;
              }"""
text = text.replace(old_css_main, new_css_main)

old_css_thumb = """              .product-thumbnail-btn {
                width: 100%;
                aspect-ratio: 1/1;"""

new_css_thumb = """              .product-thumbnail-btn {
                width: 100%;
                aspect-ratio: 16/10;"""
text = text.replace(old_css_thumb, new_css_thumb)

text = text.replace("style={{ objectFit: 'contain' }}", "style={{ objectFit: 'cover' }}")

with open(path, "w", encoding="utf-8") as f:
    f.write(text)
