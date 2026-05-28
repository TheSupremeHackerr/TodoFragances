import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, X, Plus, Minus, Trash2, Shield, Gift } from 'lucide-react';
import { useState } from 'react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (idx: number, change: number) => void;
  onRemoveItem: (idx: number) => void;
  onCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}: CartDrawerProps) {
  const [giftWrap, setGiftWrap] = useState(false);

  const itemsSubtotal = cartItems.reduce((acc, item) => {
    const sizeAdjustment = item.selectedSize === 100 ? 60 : item.selectedSize === 200 ? 150 : 0;
    const basePrice = item.fragrance.price + sizeAdjustment;
    return acc + (basePrice * item.quantity);
  }, 0);

  const giftWrapFee = giftWrap ? 15 : 0;
  const totalValuation = itemsSubtotal + giftWrapFee;

  // Free shipping threshold logic
  const freeShippingThreshold = 500;
  const progressToFreeShipping = Math.min((itemsSubtotal / freeShippingThreshold) * 100, 100);
  const remainingForFreeShipping = Math.max(freeShippingThreshold - itemsSubtotal, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop blur click target */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-stone-950 z-50 backdrop-blur-sm"
          />

          {/* Core Slider Sheet Container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 220 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-stone-900 border-l border-stone-800 shadow-2xl z-50 flex flex-col justify-between"
          >
            {/* Header section */}
            <div className="p-6 border-b border-stone-800 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="w-5 h-5 text-amber-500" />
                <span className="font-serif text-lg text-white font-medium tracking-wide">Shopping Bag ({cartItems.length})</span>
              </div>
              <button
                onClick={onClose}
                className="text-stone-400 hover:text-white hover:bg-white/5 p-2 rounded-full transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Contents Section */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Free Signature Shipping Progress Bar Indicator */}
              {cartItems.length > 0 && (
                <div className="bg-stone-950/40 border border-stone-900 rounded-xl p-4.5 space-y-3">
                  <div className="flex justify-between text-[11px] leading-none">
                    <span className="text-stone-300 font-sans font-medium">Signature Dispatch Benefit</span>
                    <span className="text-amber-500 font-mono">
                      {remainingForFreeShipping > 0 ? `$${remainingForFreeShipping} remaining` : 'FREE SHIPPING UNLOCKED'}
                    </span>
                  </div>
                  <div className="h-1 bg-stone-900 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-amber-500 rounded-full transition-all duration-500"
                      style={{ width: `${progressToFreeShipping}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-stone-500 font-light leading-snug">
                    Unlocking custom wooden lacquer packaging and express signature dispatch on values above ${freeShippingThreshold} USD.
                  </p>
                </div>
              )}

              {/* Items List */}
              {cartItems.length === 0 ? (
                <div className="h-64 flex flex-col items-center justify-center text-center space-y-4 pt-12">
                  <ShoppingBag className="w-10 h-10 text-stone-600 stroke-[1.5]" />
                  <div className="space-y-1">
                    <h4 className="font-serif text-stone-300 text-base">Your shopping bag is empty</h4>
                    <p className="text-stone-500 font-sans text-xs max-w-xs font-light">
                      Curations you add to your container will show up here to establish checkout.
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="border border-stone-800 hover:border-stone-700 font-mono text-[10px] uppercase font-bold tracking-widest px-6 py-3 rounded-full text-stone-300"
                  >
                    Browse Collections
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item, idx) => {
                    const sizeAdj = item.selectedSize === 100 ? 60 : item.selectedSize === 200 ? 150 : 0;
                    const bPrice = item.fragrance.price + sizeAdj;
                    return (
                      <motion.div
                        layout
                        key={`${item.fragrance.id}-${item.selectedSize}-${idx}`}
                        className="bg-stone-950/40 p-4 rounded-xl border border-stone-900 flex gap-4"
                      >
                        {/* Thumbnail image */}
                        <div className="w-16 h-20 bg-stone-950 rounded-lg flex items-center justify-center border border-stone-900 overflow-hidden">
                          <img
                            src={item.fragrance.image}
                            alt={item.fragrance.name}
                            className="h-14 object-contain filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)]"
                          />
                        </div>

                        {/* Details and selectors */}
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-serif text-[13px] text-white tracking-wide">{item.fragrance.name}</h4>
                                <span className="text-[10px] font-mono text-stone-500 uppercase">{item.fragrance.brand}</span>
                              </div>
                              <span className="font-serif text-sm text-stone-300">${bPrice * item.quantity}</span>
                            </div>

                            <div className="flex flex-wrap gap-2 items-center mt-2.5">
                              <span className="bg-stone-900 border border-stone-800 text-stone-400 font-mono text-[9px] px-2 py-0.5 rounded">
                                {item.selectedSize} ML
                              </span>
                              {item.engravedText && (
                                <span className="bg-amber-500/10 border border-amber-500/30 text-amber-500 font-mono text-[8px] px-2 py-0.5 rounded transition-all select-none">
                                  ENGR: &quot;{item.engravedText}&quot;
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Incrementor + trash triggers list */}
                          <div className="flex justify-between items-center mt-4 pt-3 border-t border-stone-900/40">
                            <div className="flex items-center space-x-2 bg-stone-950 px-2 py-1 rounded-full border border-stone-800/80">
                              <button
                                onClick={() => onUpdateQuantity(idx, -1)}
                                className="text-stone-400 hover:text-white transition-colors"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="font-mono text-xs text-white px-2.5 font-semibold text-center leading-none">{item.quantity}</span>
                              <button
                                onClick={() => onUpdateQuantity(idx, 1)}
                                className="text-stone-400 hover:text-white transition-colors"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <button
                              onClick={() => onRemoveItem(idx)}
                              className="text-stone-500 hover:text-[#EF4444] hover:bg-[#EF4444]/10 p-2 rounded-full transition-all"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                      </motion.div>
                    );
                  })}
                </div>
              )}

              {/* Extras check-boxes */}
              {cartItems.length > 0 && (
                <div className="bg-stone-950/30 rounded-xl p-4 border border-stone-900 space-y-4">
                  <label className="flex items-center space-x-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={giftWrap}
                      onChange={(e) => setGiftWrap(e.target.checked)}
                      className="w-4 h-4 accent-amber-500 bg-stone-950 border-stone-800 rounded cursor-pointer"
                    />
                    <div className="flex items-start space-x-2">
                      <Gift className="w-4 h-4 text-amber-500 mt-0.5" />
                      <div>
                        <span className="text-xs font-semibold text-white block">Add Signature Gift Boxing (+$15 USD)</span>
                        <span className="text-[10px] text-stone-500 font-light block mt-0.5">Includes wood box, linen pouch, and personalized wax seal.</span>
                      </div>
                    </div>
                  </label>
                </div>
              )}

            </div>

            {/* Calculations and Actions Footer Section */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-stone-800 bg-stone-950/60 space-y-4">
                
                {/* Valuations calculation */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-stone-400">
                    <span>Curation Subtotal</span>
                    <span>${itemsSubtotal}</span>
                  </div>
                  {giftWrap && (
                    <div className="flex justify-between text-xs text-stone-400">
                      <span>Bespoke Box Gift Wrapping</span>
                      <span>$15</span>
                    </div>
                  )}
                  <div className="flex justify-between text-xs text-stone-400">
                    <span>Signature Courier Logistics</span>
                    <span className="text-emerald-500 uppercase font-mono text-[9px] font-semibold">Complimentary</span>
                  </div>
                  <div className="flex justify-between text-base text-white pt-2 border-t border-stone-900/60">
                    <span className="font-serif">Bag Total</span>
                    <span className="font-serif font-semibold">${totalValuation} USD</span>
                  </div>
                </div>

                <button
                  onClick={onCheckout}
                  className="w-full bg-white hover:bg-stone-200 text-stone-950 font-sans text-xs uppercase font-bold tracking-[0.25em] py-4 rounded-full shadow-lg transition-all active:scale-98"
                >
                  Proceed to Secure Checkout
                </button>

                <div className="flex items-center justify-center space-x-1.5 text-stone-500 font-mono text-[8px] uppercase tracking-widest text-center mt-2 leading-none">
                  <Shield className="w-3.5 h-3.5 text-amber-500" />
                  <span>256-bit Encrypted SSL Gateway</span>
                </div>
              </div>
            )}

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
