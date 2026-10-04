// src/services/ordersApi.ts — Thin client for the Express API
import type { CartItem } from '@/types';

export interface OrderPayload {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: CartItem[];
  subtotal: number;
  razorpayPaymentId?: string;
}

export interface OrderRecord {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  items: CartItem[];
  subtotal: number;
  status: string;
  created_at: string;
}

export async function createOrder(payload: OrderPayload): Promise<OrderRecord> {
  const res = await fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error ?? 'Failed to create order');
  }
  const data = await res.json();
  return data.order as OrderRecord;
}

export async function checkStock(productId: string): Promise<{ available: boolean }> {
  const res = await fetch(`/api/stock/${productId}`);
  if (!res.ok) return { available: false };
  const data = await res.json();
  return { available: data.available };
}
