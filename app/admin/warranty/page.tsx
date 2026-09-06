import { Metadata } from 'next';
import WarrantyAdminClient from './client-page';
import { getWarrantyTokens, getWarrantyCustomers, setupWarrantyAdminTables } from '#/features/admin/warranty/actions';

export const metadata: Metadata = {
  title: 'Warranty & Verification | CONQRETE Admin',
};

export default async function WarrantyAdminPage() {
  const tableCheck = await setupWarrantyAdminTables();
  const tokens = tableCheck.exists ? await getWarrantyTokens() : [];
  const customers = tableCheck.exists ? await getWarrantyCustomers() : [];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-black uppercase tracking-tight text-white mb-8">Warranty Verification</h1>
      {!tableCheck.exists && (
        <div className="bg-red-900/50 border border-red-500 text-red-200 p-6 rounded-lg mb-8">
          <h2 className="font-bold text-xl mb-2">Database Tables Missing</h2>
          <p>You must run the SQL migration script in your Supabase Dashboard to create the <code>warranty_active_tokens</code> table before using this panel.</p>
        </div>
      )}
      <WarrantyAdminClient initialTokens={tokens} initialCustomers={customers} tablesExist={tableCheck.exists} />
    </div>
  );
}
