export const dynamic = 'force-dynamic';
import { createClient } from '@/utils/supabase/server';
import ProductsClient from './productsclient';

export default async function ProductsPage() {
  // 1. Check if Environment Variables are actually loaded
  console.log("--- SUPABASE DEBUG START ---");
  console.log("URL Loaded:", process.env.NEXT_PUBLIC_SUPABASE_URL ? "YES" : "NO");
  console.log("KEY Loaded:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "YES" : "NO");

  const supabase = await createClient();
  
  // 2. Attempt the database fetch
  const { data: products, error } = await supabase
    .from('products')
    .select(`
      *,
      category:categories(slug)
    `)
    .eq('is_active', true);

  // 3. Log the results to your VS Code Terminal
  console.log("Supabase Error:", error);
  console.log("Products Found:", products?.length || 0);
  console.log("--- SUPABASE DEBUG END ---");

  // 4. Force errors to display on the actual website screen
  if (error) {
    return (
      <div className="min-h-screen bg-black text-[#39FF14] p-10 font-mono uppercase tracking-widest">
        <h1 className="text-2xl font-bold mb-4 border-b border-[#39FF14] pb-2">Database Error Detected</h1>
        <pre className="text-sm bg-zinc-950 p-4 border border-zinc-800 whitespace-pre-wrap">
          {JSON.stringify(error, null, 2)}
        </pre>
      </div>
    );
  }

  // 5. Catch if it connects, but the database is empty
  if (!products || products.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center font-mono">
        <h1 className="text-[#39FF14] text-xl mb-2">CONNECTION SUCCESSFUL</h1>
        <p className="text-zinc-500 uppercase tracking-widest text-sm">But 0 products were found in the database.</p>
      </div>
    );
  }

  // If everything works, render the UI
  return <ProductsClient products={products} />;
}