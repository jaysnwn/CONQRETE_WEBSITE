import os

path = "app/(storefront)/products/[slug]/page.tsx"
with open(path, "r", encoding="utf-8") as f:
    text = f.read()

old_bc = """      <Breadcrumbs 
        items={[
          { name: 'Home', href: '/' },
          { name: 'Products', href: '/products' },
          { name: product.category?.name || 'Category', href: `/products/${product.category?.slug || 'all'}` },
          { name: product.title, href: `/products/${product.slug}` }
        ]} 
      />"""

text = text.replace(old_bc, "")

# Remove the import to avoid unused import error
text = text.replace("import { Breadcrumbs } from '#/components/ui/breadcrumbs';\n", "")

with open(path, "w", encoding="utf-8") as f:
    f.write(text)
