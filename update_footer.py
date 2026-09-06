import os

path = "components/layout/footer.tsx"
with open(path, "r", encoding="utf-8") as f:
    text = f.read()

# Add the verify link to the Explore column
old_col = """          {/* Col 2: Navigation */}
          <div className="footer-col">
            <span className="footer-col-title">// EXPLORE</span>
            <Link href="/products" className="footer-link">PRODUCTS</Link>
            <Link href="/about" className="footer-link">ABOUT US</Link>
          </div>"""

new_col = """          {/* Col 2: Navigation */}
          <div className="footer-col">
            <span className="footer-col-title">// EXPLORE</span>
            <Link href="/products" className="footer-link">PRODUCTS</Link>
            <Link href="/about" className="footer-link">ABOUT US</Link>
            <Link href="/verify" className="footer-link">VERIFY PRODUCT</Link>
          </div>"""

if old_col in text:
    text = text.replace(old_col, new_col)
    with open(path, "w", encoding="utf-8") as f:
        f.write(text)
    print("Added verification link to footer successfully")
else:
    print("Could not find the Explore column to replace")
