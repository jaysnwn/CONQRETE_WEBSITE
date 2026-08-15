'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { logoutAdmin } from './login/actions';
import './admin.css';
import './professional.css';

const navItems = [
  { href: '/admin', label: 'Overview', icon: 'grid' },
  { href: '/admin/orders', label: 'Orders', icon: 'receipt' },
  { href: '/admin/products', label: 'Products', icon: 'box' },
  { href: '/admin/categories', label: 'Categories', icon: 'folder' },
  { href: '/admin/customers', label: 'Customers', icon: 'users' },
  { href: '/admin/discounts', label: 'Discounts', icon: 'tag' },
  { href: '/admin/reviews', label: 'Reviews', icon: 'message' },
];

function isActive(pathname: string, href: string) {
  return pathname === href || (href !== '/admin' && pathname.startsWith(`${href}/`));
}

function Icon({ name }: { name: string }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  if (name === 'grid') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="3" width="7" height="7" {...common} />
        <rect x="14" y="3" width="7" height="7" {...common} />
        <rect x="3" y="14" width="7" height="7" {...common} />
        <rect x="14" y="14" width="7" height="7" {...common} />
      </svg>
    );
  }
  if (name === 'box') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m3 7 9-4 9 4-9 4-9-4Z" {...common} />
        <path d="M3 7v10l9 4 9-4V7M12 11v10" {...common} />
      </svg>
    );
  }
  if (name === 'receipt') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 3h14v18l-3-2-4 2-4-2-3 2V3Z" {...common} />
        <path d="M8 8h8M8 12h8" {...common} />
      </svg>
    );
  }
  if (name === 'message') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22l5.9-2Z" {...common} />
      </svg>
    );
  }
  if (name === 'folder') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" {...common} />
      </svg>
    );
  }
  if (name === 'users') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" {...common} />
        <circle cx="9" cy="7" r="4" {...common} />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" {...common} />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" {...common} />
      </svg>
    );
  }
  if (name === 'tag') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" {...common} />
        <line x1="7" y1="7" x2="7.01" y2="7" {...common} />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 5v14M5 12h14" {...common} />
    </svg>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the mobile nav whenever the route changes — covers back/forward
  // navigation and any Link click that doesn't run the inline onClick.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Let Escape close the mobile nav, and stop the page scrolling behind it.
  useEffect(() => {
    if (!menuOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  if (pathname === '/admin/login') return <>{children}</>;

  // Derived from navItems instead of a hardcoded ternary, so a new nav
  // item automatically gets a correct topbar title without another edit.
  const activeItem = [...navItems].reverse().find((item) => isActive(pathname, item.href));
  const pageName = activeItem?.label ?? 'Overview';



  return (
    <div className="admin-shell">
      <aside className={`admin-sidebar ${menuOpen ? 'admin-sidebar--open' : ''}`}>
        <Link href="/admin" className="admin-brand" onClick={() => setMenuOpen(false)}>
          <img src="/logo.png" alt="CONQRETE Logo" style={{ height: '28px', objectFit: 'contain' }} />
          <span><strong>CONQRETE</strong><small>COMMAND CENTER</small></span>
        </Link>
        <nav className="admin-nav" aria-label="Administration">
          <span className="admin-nav-label">Workspace</span>
          {navItems.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                aria-current={active ? 'page' : undefined}
                className={`admin-nav-link ${active ? 'admin-nav-link--active' : ''}`}
              >
                <Icon name={item.icon} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="admin-sidebar-bottom">
          <Link href="/" className="admin-storefront-link">↗ View storefront</Link>
          <form action={logoutAdmin}>
            <button type="submit" className="admin-logout">Sign out</button>
          </form>
        </div>
      </aside>
      {menuOpen && <button aria-label="Close navigation" className="admin-scrim" onClick={() => setMenuOpen(false)} />}
      <div className="admin-content">
        <header className="admin-topbar">
          <button className="admin-menu-button" onClick={() => setMenuOpen(true)} aria-label="Open navigation">☰</button>
          <div>
            <p>Operations / {pageName}</p>
            <h2>{pageName}</h2>
          </div>
        </header>
        <main className="admin-main">{children}</main>
      </div>
    </div>
  );
}