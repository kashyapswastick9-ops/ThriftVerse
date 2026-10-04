import { createOrder, checkStock } from "@/services/ordersApi";

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { X, ShoppingBag, Trash2, ExternalLink, CreditCard, CheckCircle } from 'lucide-react';
import clsx from 'clsx';
import { useCartStore } from '@/store/cartStore';
import { useUIStore } from '@/store/uiStore';
import { useToast } from '@/components/ui/ToastContainer';
import { Button } from '@/components/ui/Button';

const FREE_SHIPPING_THRESHOLD = 999;
const RAZORPAY_ME_HANDLE = 'swastickkumarkashyap';

export default function CartDrawer() {
  const cartOpen = useUIStore((s) => s.cartOpen);
  const setCartOpen = useUIStore((s) => s.setCartOpen);
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotal);
  const remove = useCartStore((s) => s.remove);
  const clearCart = useCartStore((s) => s.clear);
  const { success, error } = useToast();
  const [paymentDone, setPaymentDone] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customerForm, setCustomerForm] = useState({ name: '', email: '' });

  // Close on Escape
  useEffect(() => {
    if (!cartOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setCartOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [cartOpen, setCartOpen]);

  // Reset paymentDone when cart opens fresh
  useEffect(() => {
    if (cartOpen) setPaymentDone(false);
  }, [cartOpen]);
  const handlePayment = async () => {
    setIsSubmitting(true);
    try {
      // 1. Double check stock for all items
      for (const item of items) {
        const { available } = await checkStock(item.productId);
        if (!available) {
          throw new Error(`Uh oh! "${item.title}" was just snagged by someone else.`);
        }
      }

      // 2. Open Razorpay payment page
      const amountInPaise = subtotal * 100;
      const url = `https://razorpay.me/@${RAZORPAY_ME_HANDLE}?amount=${amountInPaise}`;
      window.open(url, '_blank', 'noopener,noreferrer');
      
      // Show confirmation panel
      setTimeout(() => {
        setPaymentDone(true);
        setIsSubmitting(false);
      }, 500);

    } catch (err: any) {
      error(err.message);
      setIsSubmitting(false);
    }
  };

  const handlePaymentConfirmed = async () => {
    setIsSubmitting(true);
    try {
      await createOrder({
        customerName: customerForm.name,
        customerEmail: customerForm.email,
        customerPhone: '',
        items,
        subtotal
      });
      success('PAYMENT CONFIRMED! STASH SECURED ⚡');
      clearCart();
      setCartOpen(false);
    } catch (err: any) {
      error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!cartOpen) return null;

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;

  return (
    <div role="dialog" aria-label="Shopping cart" aria-modal="true" className="fixed inset-0 z-[150] flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ink/80"
        onClick={() => setCartOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div className="relative z-10 w-full max-w-md bg-ink border-l-[3px] border-black flex flex-col shadow-[-8px_0_0_#000] animate-slide-down">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b-[3px] border-black bg-ink-800">
          <div className="flex items-center gap-3">
            <ShoppingBag size={20} className="text-gold" />
            <h2 className="font-display text-2xl text-stark">YOUR STASH</h2>
            <span className="font-mono text-xs bg-crimson text-stark border-2 border-black px-2 py-0.5">
              {items.length} ITEM{items.length !== 1 ? 'S' : ''}
            </span>
          </div>
          <button
            onClick={() => setCartOpen(false)}
            aria-label="Close cart"
            className="p-1 text-stark-dim hover:text-stark transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Free shipping progress bar */}
        <div className="px-5 py-3 border-b-[3px] border-black bg-ink-900">
          {isFreeShipping ? (
            <p className="font-mono text-xs text-gold font-bold text-center">
              ✓ FREE SHIPPING UNLOCKED!
            </p>
          ) : (
            <p className="font-mono text-xs text-stark-dim text-center mb-2">
              Add <span className="text-gold font-bold">₹{remaining}</span> more for FREE shipping
            </p>
          )}
          <div className="h-3 bg-ink border-2 border-black mt-2 overflow-hidden">
            <div
              className={clsx(
                'h-full transition-all duration-500 ease-out',
                isFreeShipping ? 'bg-gold' : 'bg-vibranium'
              )}
              style={{ width: `${shippingProgress}%` }}
            />
          </div>
        </div>

        {/* Items list */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-6 py-20 text-center px-6">
              <div className="w-20 h-20 bg-ink-700 border-[3px] border-black flex items-center justify-center">
                <ShoppingBag size={32} className="text-stark-dim" />
              </div>
              <div>
                <p className="font-display text-3xl text-stark">STASH IS EMPTY</p>
                <p className="font-sans text-sm text-stark-dim mt-1">
                  The drops are out there. Go find them.
                </p>
              </div>
              <Button
                variant="gold"
                as={Link}
                to="/shop"
                onClick={() => setCartOpen(false)}
              >
                BROWSE THE VAULT
              </Button>
            </div>
          ) : (
            <ul className="divide-y-[3px] divide-black">
              {items.map((item) => (
                <li key={item.productId} className="flex gap-4 p-4 hover:bg-ink-800 transition-colors">
                  <div className="w-20 h-24 shrink-0 border-[3px] border-black overflow-hidden bg-ink-700">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-sans text-xs text-stark-dim uppercase tracking-wider">
                      VINTAGE
                    </p>
                    <p className="font-cond font-bold text-base text-stark leading-snug truncate mt-0.5">
                      {item.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-mono text-[10px] bg-ink border-2 border-black px-1.5 py-0.5 text-stark-dim">
                        {item.size}
                      </span>
                      <span className="badge bg-ink text-stark border-stark-dim ml-2">
                        1 OF 1 — NO RESTOCK
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-display text-xl text-gold">
                        ₹{item.price.toLocaleString('en-IN')}
                      </span>
                      <button
                        onClick={() => remove(item.productId)}
                        aria-label={`Remove ${item.title} from cart`}
                        className="text-stark-dim hover:text-crimson transition-colors p-1"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t-[3px] border-black p-5 bg-ink-800 space-y-4">
            {/* Order summary */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-cond font-bold text-base text-stark-dim uppercase">
                  {items.length} item{items.length !== 1 ? 's' : ''}
                </span>
                <span className="font-mono text-sm text-stark-dim">
                  ₹{subtotal.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-black/40 pt-1.5">
                <span className="font-cond font-bold text-lg text-stark uppercase">Total</span>
                <span className="font-display text-2xl text-gold">
                  ₹{subtotal.toLocaleString('en-IN')}
                </span>
              </div>
              {isFreeShipping && (
                <p className="font-mono text-[10px] text-gold text-right">+ FREE SHIPPING</p>
              )}
            </div>

            {/* Customer Details Form */}
            {!paymentDone ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handlePayment();
                }}
                className="space-y-3 pt-2"
              >
                <div className="space-y-2">
                  <input
                    required
                    value={customerForm.name}
                    onChange={(e) => setCustomerForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="Full Name (Hero Alias)"
                    className="w-full bg-ink border-[3px] border-black rounded-comic px-3 py-2 font-sans text-sm text-stark placeholder:text-stark-dim outline-none focus-visible:ring-2 focus-visible:ring-vibranium"
                  />
                  <input
                    required
                    type="email"
                    value={customerForm.email}
                    onChange={(e) => setCustomerForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="Email Address"
                    className="w-full bg-ink border-[3px] border-black rounded-comic px-3 py-2 font-sans text-sm text-stark placeholder:text-stark-dim outline-none focus-visible:ring-2 focus-visible:ring-vibranium"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-cond font-bold uppercase tracking-wider text-sm bg-crimson text-stark border-[3px] border-black shadow-comic-sm hover:bg-crimson-light active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <CreditCard size={18} />
                  {isSubmitting ? 'PROCESSING...' : `PAY ₹${subtotal.toLocaleString('en-IN')} VIA RAZORPAY`}
                  {!isSubmitting && <ExternalLink size={14} className="opacity-70" />}
                </button>
                <p className="font-mono text-[10px] text-stark-dim text-center">
                  Secured by Razorpay · UPI / Cards / Net Banking
                </p>
              </form>
            ) : (
              <>
                {/* Post-payment confirmation step */}
                <div className="bg-ink-700 border-[3px] border-black rounded-comic p-4 text-center space-y-3">
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle size={22} className="text-vibranium" />
                    <span className="font-display text-xl text-stark">PAYMENT PAGE OPENED</span>
                  </div>
                  <p className="font-sans text-xs text-stark-dim leading-relaxed">
                    Complete your payment on the Razorpay page that just opened. Once done, tap below to confirm and secure your order.
                  </p>
                  <div className="flex flex-col gap-2 pt-1">
                    <button
                      onClick={handlePaymentConfirmed}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-cond font-bold uppercase tracking-wider text-sm bg-vibranium text-ink border-[3px] border-black shadow-comic-sm hover:shadow-comic active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all"
                    >
                      <CheckCircle size={16} />
                      I&apos;VE PAID — CONFIRM ORDER
                    </button>
                    <button
                      onClick={handlePayment}
                      className="font-mono text-xs text-stark-dim hover:text-gold transition-colors flex items-center justify-center gap-1"
                    >
                      <ExternalLink size={11} />
                      Reopen payment page
                    </button>
                    <button
                      onClick={() => setPaymentDone(false)}
                      className="font-mono text-xs text-stark-dim hover:text-crimson transition-colors"
                    >
                      ← Back to cart
                    </button>
                  </div>
                </div>
              </>
            )}

            <button
              onClick={() => setCartOpen(false)}
              className="w-full font-mono text-xs text-stark-dim hover:text-stark transition-colors text-center"
            >
              CONTINUE BROWSING →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
