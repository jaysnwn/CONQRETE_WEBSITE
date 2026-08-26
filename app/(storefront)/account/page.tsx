import { createClient } from '#/utils/supabase/server';
import { redirect } from 'next/navigation';
import { signOut } from '#/features/auth/actions';
import Link from 'next/link';

export default async function AccountPage() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session?.user) {
    redirect('/login');
  }
  
  const userId = session.user.id;
  
  const { data: customer } = await supabase
    .from('customers')
    .select('*')
    .eq('id', userId)
    .single();
    
  if (!customer) {
    // They are an admin or haven't finished onboarding.
    redirect('/');
  }
  
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
    
  const { data: defaultAddress } = await supabase
    .from('addresses')
    .select('*')
    .eq('customer_id', userId)
    .eq('is_default', true)
    .single();

  const { data: recentOrders } = await supabase
    .from('orders')
    .select('*')
    .eq('customer_id', userId)
    .order('created_at', { ascending: false })
    .limit(5);

  return (
    <div style={{ backgroundColor: '#f4f4f5', minHeight: '100vh', padding: '140px 2rem 5rem 2rem', color: '#000' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        {/* HEADER */}
        <div style={{ borderBottom: '4px solid #c8ff00', paddingBottom: '1rem', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, fontFamily: '"Black Han Sans", sans-serif', textTransform: 'uppercase', margin: 0 }}>
            MY ACCOUNT
          </h1>
          <p style={{ marginTop: '0.5rem', color: '#6b7280', fontWeight: 'bold' }}>
            Welcome back, {profile?.full_name || customer.first_name || 'Customer'}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          {/* PROFILE INFO */}
          <div style={{ backgroundColor: '#fff', border: '1px solid #000', padding: '2rem', boxShadow: '4px 4px 0px #000' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 900, borderBottom: '2px solid #000', paddingBottom: '0.5rem', marginBottom: '1.5rem', textTransform: 'uppercase' }}>
              Profile Details
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <div style={{ fontSize: '10px', fontWeight: 900, color: '#6b7280', letterSpacing: '0.1em' }}>NAME</div>
                <div style={{ fontWeight: 'bold' }}>{profile?.full_name || `${customer.first_name} ${customer.last_name}`}</div>
              </div>
              <div>
                <div style={{ fontSize: '10px', fontWeight: 900, color: '#6b7280', letterSpacing: '0.1em' }}>PHONE</div>
                <div style={{ fontWeight: 'bold' }}>{customer.phone_number}</div>
              </div>
            </div>
          </div>

          {/* DEFAULT ADDRESS */}
          <div style={{ backgroundColor: '#fff', border: '1px solid #000', padding: '2rem', boxShadow: '4px 4px 0px #000' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 900, borderBottom: '2px solid #000', paddingBottom: '0.5rem', marginBottom: '1.5rem', textTransform: 'uppercase' }}>
              Default Address
            </h2>
            {defaultAddress ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontWeight: 'bold' }}>
                <div>{defaultAddress.street}</div>
                <div>{defaultAddress.city}, {defaultAddress.state}</div>
                <div>{defaultAddress.pincode}</div>
              </div>
            ) : (
              <div style={{ color: '#6b7280', fontWeight: 'bold' }}>No default address set.</div>
            )}
          </div>
        </div>
        
        {/* RECENT ORDERS */}
        <div style={{ backgroundColor: '#fff', border: '1px solid #000', padding: '2rem', boxShadow: '4px 4px 0px #000', marginTop: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 900, borderBottom: '2px solid #000', paddingBottom: '0.5rem', marginBottom: '1.5rem', textTransform: 'uppercase' }}>
            Recent Orders
          </h2>
          {recentOrders && recentOrders.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {recentOrders.map(order => (
                <div key={order.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', border: '1px solid #e5e7eb', backgroundColor: '#f9fafb' }}>
                  <div style={{ fontWeight: 'bold' }}>Order #{order.id.slice(0, 8)}</div>
                  <div style={{ fontWeight: 900, color: '#111827' }}>₹{order.total_amount || 0}</div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ color: '#6b7280', fontWeight: 'bold' }}>No orders found.</div>
          )}
        </div>

        {/* LOGOUT */}
        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
          <form action={signOut}>
            <button style={{ padding: '12px 24px', backgroundColor: '#ef4444', border: '2px solid #ef4444', color: '#fff', fontWeight: 900, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.1em', transition: 'all 0.2s', borderRadius: '4px' }}>
              Sign Out
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}