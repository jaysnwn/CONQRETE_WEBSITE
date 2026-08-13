// app/(storefront)/layout.tsx

import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { CartDrawer } from '@/components/cart-drawer';
import { createClient } from '#/utils/supabase/server';

export default async function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  const isLoggedIn = !!session;

  return (
    <>

      <Navbar isLoggedIn={isLoggedIn} />
      <main className="min-h-screen" style={{ paddingTop: '76px' }}>
        {children}
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}