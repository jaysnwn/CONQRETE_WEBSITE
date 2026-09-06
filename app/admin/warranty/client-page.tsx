'use client';

import { useState } from 'react';
import { addWarrantyToken, deleteWarrantyToken } from '#/features/admin/warranty/actions';
import { Loader2, Plus, Trash2, CheckCircle2, XCircle, QrCode } from 'lucide-react';

export default function WarrantyAdminClient({ initialTokens, initialCustomers, tablesExist }: any) {
  const [tokens, setTokens] = useState(initialTokens);
  const [newToken, setNewToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [qrPreview, setQrPreview] = useState<string | null>(null);

  const handleAddToken = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newToken.trim()) return;
    setLoading(true);
    const res = await addWarrantyToken(newToken);
    if (res.success) {
      setNewToken('');
      window.location.reload(); 
    } else {
      alert(res.error);
    }
    setLoading(false);
  };

  const handleDeleteToken = async (id: string) => {
    if (!confirm('Delete this QR token? Users scanning this will fail verification.')) return;
    await deleteWarrantyToken(id);
    window.location.reload();
  };

  if (!tablesExist) return null;

  return (
    <div className="space-y-12 pb-24">
      {/* SECTION: ACTIVE TOKENS */}
      <section>
        <h2 className="text-xl font-bold text-[#c8ff00] mb-4 uppercase tracking-widest font-mono">Active QR Tokens</h2>
        <div className="bg-[#141515] border border-[rgba(255,255,255,0.1)] rounded-xl p-6">
          <form onSubmit={handleAddToken} className="flex gap-4 mb-6">
            <input 
              type="text" 
              value={newToken}
              onChange={e => setNewToken(e.target.value)}
              placeholder="e.g. CNQ-BATCH2-VERIFY" 
              className="flex-1 bg-black border border-[rgba(255,255,255,0.2)] rounded-lg px-4 text-white font-mono outline-none focus:border-[#c8ff00]"
            />
            <button type="submit" disabled={loading} className="bg-[#c8ff00] text-black px-6 py-2 rounded-lg font-bold uppercase tracking-widest hover:bg-white flex items-center gap-2">
              {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <><Plus className="w-4 h-4" /> Add Token</>}
            </button>
          </form>

          <table className="w-full text-left text-sm text-gray-400">
            <thead className="border-b border-[rgba(255,255,255,0.1)] uppercase font-mono text-[10px] tracking-widest">
              <tr>
                <th className="pb-3">Token String</th>
                <th className="pb-3">Added On</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tokens.map((t: any) => (
                <tr key={t.id} className="border-b border-[rgba(255,255,255,0.05)]">
                  <td className="py-4 text-white font-mono font-bold text-lg">{t.token}</td>
                  <td className="py-4 font-mono">{new Date(t.created_at).toLocaleDateString()}</td>
                  <td className="py-4 text-right">
                    <button 
                      onClick={() => setQrPreview(`https://quickchart.io/qr?text=${encodeURIComponent(t.token)}&size=400`)} 
                      className="text-[#c8ff00] hover:text-white p-2 mr-2 border border-[#c8ff00] rounded"
                      title="Generate Image"
                    >
                      <QrCode className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDeleteToken(t.id)} className="text-red-500 hover:text-red-400 p-2 border border-transparent hover:border-red-500 rounded">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {tokens.length === 0 && (
                <tr><td colSpan={3} className="py-8 text-center">No active tokens found. Add one above!</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* QR PREVIEW MODAL */}
      {qrPreview && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#141515] border border-[rgba(255,255,255,0.2)] rounded-2xl p-8 max-w-sm w-full text-center">
            <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-widest">QR Code Image</h3>
            <img src={qrPreview} alt="QR Code" className="w-full aspect-square rounded-lg mb-6 bg-white p-2" />
            <div className="flex gap-4">
              <a href={qrPreview} download="conqrete-qr-code.png" target="_blank" className="flex-1 bg-[#c8ff00] text-black font-bold uppercase tracking-widest py-3 rounded-lg text-sm">Download</a>
              <button onClick={() => setQrPreview(null)} className="flex-1 bg-transparent border border-white text-white font-bold uppercase tracking-widest py-3 rounded-lg text-sm">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* SECTION: VERIFICATIONS */}
      <section>
        <h2 className="text-xl font-bold text-[#c8ff00] mb-4 uppercase tracking-widest font-mono">Customer Data (Verified Products)</h2>
        <div className="bg-[#141515] border border-[rgba(255,255,255,0.1)] rounded-xl overflow-hidden">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="border-b border-[rgba(255,255,255,0.1)] bg-black/20 uppercase font-mono text-[10px] tracking-widest">
              <tr>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6">Customer</th>
                <th className="py-4 px-6">Contact</th>
                <th className="py-4 px-6">Scanned QR</th>
                <th className="py-4 px-6 text-right">Result</th>
              </tr>
            </thead>
            <tbody>
              {initialCustomers.map((v: any) => (
                <tr key={v.id} className="border-b border-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.02)]">
                  <td className="py-4 px-6 whitespace-nowrap">{new Date(v.verified_at).toLocaleString()}</td>
                  <td className="py-4 px-6 font-bold text-white">{v.customer?.name || 'Anonymous'}</td>
                  <td className="py-4 px-6">
                    <div className="text-white">{v.customer?.mobile}</div>
                    {v.customer?.email && <div className="text-xs text-gray-500">{v.customer?.email}</div>}
                    {v.customer?.marketing_consent && <span className="inline-block mt-1 px-2 py-0.5 bg-[#c8ff00]/10 text-[#c8ff00] rounded text-[10px] uppercase font-bold tracking-widest">Opt-In</span>}
                  </td>
                  <td className="py-4 px-6 font-mono text-xs">{v.qr_identifier || 'N/A'}</td>
                  <td className="py-4 px-6 text-right">
                    {v.verification_result === 'SUCCESS' ? (
                      <span className="inline-flex items-center gap-1 text-green-500 font-bold text-xs uppercase"><CheckCircle2 className="w-3 h-3"/> SUCCESS</span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-red-500 font-bold text-xs uppercase"><XCircle className="w-3 h-3"/> FAILED</span>
                    )}
                  </td>
                </tr>
              ))}
              {initialCustomers.length === 0 && (
                <tr><td colSpan={5} className="py-12 text-center">No verification scans yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
