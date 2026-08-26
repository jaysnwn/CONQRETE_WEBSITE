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
  
  let isStorefrontCustomer = false;
  
  if (session?.user) {
    // Determine if this auth user is actually a storefront customer
    const { data: customer } = await supabase
      .from('customers')
      .select('id')
      .eq('id', session.user.id)
      .single();
      
    if (customer) {
      isStorefrontCustomer = true;
    }
  }

  const isReviewMode = process.env.RAZORPAY_REVIEW_MODE === 'true';

  return (
    <>

      <Navbar isLoggedIn={isStorefrontCustomer} isReviewMode={isReviewMode} />
      <main className="min-h-screen" style={{ paddingTop: 'var(--nav-height)' }}>
        {children}
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}