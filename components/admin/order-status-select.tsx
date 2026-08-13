'use client';
import { useOptimistic, useTransition } from 'react';
export default function OrderStatusSelect({ orderId, currentStatus }: { orderId: string; currentStatus: string | null }) {
  const [isPending, startTransition] = useTransition(); const [status, setStatus] = useOptimistic(currentStatus || 'pending');
  function change(nextStatus: string) { setStatus(nextStatus); startTransition(async () => { await fetch('/api/admin/orders', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ orderId, status: nextStatus }) }); }); }
  return <label className={`admin-status-select admin-status-select--${status.replace(/_/g, '-')}`}><select value={status} onChange={(event) => change(event.target.value)} disabled={isPending} aria-label="Order status"><option value="pending">Pending</option><option value="processing">Processing</option><option value="in_transit">In transit</option><option value="delivered">Delivered</option><option value="cancelled">Cancelled</option></select></label>;
}
