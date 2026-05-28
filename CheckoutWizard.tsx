import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, Landmark, CheckCircle, ArrowRight, ArrowLeft, Ticket, Calendar, User, Eye, Download } from 'lucide-react';
import { useState, useRef, ChangeEvent } from 'react';
import { CartItem } from '../types';

interface CheckoutWizardProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onSuccessClear: () => void;
}

export default function CheckoutWizard({
  isOpen,
  onClose,
  cartItems,
  onSuccessClear
}: CheckoutWizardProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zip: '',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: ''
  });

  const [cardFlipped, setCardFlipped] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => {
    const sizeAdjustment = item.selectedSize === 100 ? 60 : item.selectedSize === 200 ? 150 : 0;
    return acc + ((item.fragrance.price + sizeAdjustment) * item.quantity);
  }, 0);

  const courierFee = subtotal > 500 ? 0 : 25;
  const grandTotal = subtotal + courierFee;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Formatting card details elegantly
    if (name === 'cardNumber') {
      const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
      const matches = v.match(/\d{4,16}/g);
      const match = (matches && matches[0]) || '';
      const parts = [];

      for (let i = 0, len = match.length; i < len; i += 4) {
        parts.push(match.substring(i, i + 4));
      }

      if (parts.length > 0) {
        setFormData(prev => ({ ...prev, [name]: parts.join(' ') }));
      } else {
        setFormData(prev => ({ ...prev, [name]: v }));
      }
    } else if (name === 'cardExpiry') {
      const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
      if (v.length >= 2) {
        setFormData(prev => ({ ...prev, [name]: `${v.substring(0, 2)}/${v.substring(2, 4)}` }));
      } else {
        setFormData(prev => ({ ...prev, [name]: v }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const isDeliveryValid = formData.email && formData.firstName && formData.lastName && formData.address && formData.city && formData.zip;
  const isPaymentValid = formData.cardName && formData.cardNumber.length >= 15 && formData.cardExpiry.length >= 5 && formData.cardCvv.length >= 3;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop screen */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            onClick={step !== 3 ? onClose : undefined}
            className="fixed inset-0 bg-stone-950 z-55 backdrop-blur-md"
          />

          {/* Checkout modal container */}
          <div className="fixed inset-0 z-55 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 260 }}
              className="bg-stone-900 border border-stone-800 rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden relative"
            >
              {/* Close Button element */}
              {step !== 3 && (
                <button
                  onClick={onClose}
                  className="absolute top-6 right-6 text-stone-400 hover:text-white hover:bg-white/5 p-2 rounded-full transition-all z-20"
                >
                  <X className="w-5 h-5" />
                </button>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 min-h-[500px]">
                
                {/* Left pane: Action Wizard Forms */}
                <div className="lg:col-span-7 p-8 md:p-10 flex flex-col justify-between">
                  <div>
                    {/* Stepper Wizard Progress Tabs */}
                    <div className="flex items-center space-x-6 mb-8 font-mono text-[9px] tracking-widest text-stone-500 uppercase leading-none">
                      <span className={step === 1 ? 'text-white font-bold' : step > 1 ? 'text-amber-500' : ''}>01. Shipping</span>
                      <span className="w-6 h-[1px] bg-stone-800" />
                      <span className={step === 2 ? 'text-white font-bold' : step > 2 ? 'text-amber-500' : ''}>02. Payment</span>
                      <span className="w-6 h-[1px] bg-stone-800" />
                      <span className={step === 3 ? 'text-white font-bold' : ''}>03. Receipt</span>
                    </div>

                    <AnimatePresence mode="wait">
                      {/* STEP 1: DELIVERY DATA DETAILS */}
                      {step === 1 && (
                        <motion.div
                          key="form-delivery"
                          initial={{ opacity: 0, x: -15 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 15 }}
                          className="space-y-4"
                        >
                          <h3 className="font-serif text-2xl text-white mb-6">Delivery Details</h3>

                          <div className="space-y-3 font-sans text-xs text-stone-300">
                            {/* Email */}
                            <div className="flex flex-col space-y-1.5">
                              <label className="font-mono text-[9px] text-stone-500 uppercase tracking-wider">Contact Email</label>
                              <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                placeholder="name@domain.com"
                                className="bg-stone-950 border border-stone-800/80 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-amber-500 transition-colors"
                              />
                            </div>

                            {/* Row names */}
                            <div className="grid grid-cols-2 gap-4">
                              <div className="flex flex-col space-y-1.5">
                                <label className="font-mono text-[9px] text-stone-500 uppercase tracking-wider">First Name</label>
                                <input
                                  type="text"
                                  name="firstName"
                                  value={formData.firstName}
                                  onChange={handleInputChange}
                                  placeholder="Charles"
                                  className="bg-stone-950 border border-stone-800/80 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-amber-500 transition-colors"
                                />
                              </div>
                              <div className="flex flex-col space-y-1.5">
                                <label className="font-mono text-[9px] text-stone-500 uppercase tracking-wider">Last Name</label>
                                <input
                                  type="text"
                                  name="lastName"
                                  value={formData.lastName}
                                  onChange={handleInputChange}
                                  placeholder="Baudelaire"
                                  className="bg-stone-950 border border-stone-800/80 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-amber-500 transition-colors"
                                />
                              </div>
                            </div>

                            {/* Full Address */}
                            <div className="flex flex-col space-y-1.5">
                              <label className="font-mono text-[9px] text-stone-500 uppercase tracking-wider">Delivery Address</label>
                              <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                placeholder="6 Place de la Bastille"
                                className="bg-stone-950 border border-stone-800/80 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-amber-500 transition-colors"
                              />
                            </div>

                            {/* City and Zip */}
                            <div className="grid grid-cols-2 gap-4">
                              <div className="flex flex-col space-y-1.5">
                                <label className="font-mono text-[9px] text-stone-500 uppercase tracking-wider">City</label>
                                <input
                                  type="text"
                                  name="city"
                                  value={formData.city}
                                  onChange={handleInputChange}
                                  placeholder="Paris"
                                  className="bg-stone-950 border border-stone-800/80 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-amber-500 transition-colors"
                                />
                              </div>
                              <div className="flex flex-col space-y-1.5">
                                <label className="font-mono text-[9px] text-stone-500 uppercase tracking-wider">ZIP Code</label>
                                <input
                                  type="text"
                                  name="zip"
                                  value={formData.zip}
                                  onChange={handleInputChange}
                                  placeholder="75004"
                                  className="bg-stone-950 border border-stone-800/80 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-amber-500 transition-colors"
                                />
                              </div>
                            </div>

                          </div>
                        </motion.div>
                      )}

                      {/* STEP 2: PAYMENT WITH CARD FLIPPING MODEL */}
                      {step === 2 && (
                        <motion.div
                          key="form-payment"
                          initial={{ opacity: 0, x: -15 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 15 }}
                          className="space-y-4"
                        >
                          <h3 className="font-serif text-2xl text-white mb-6">Secured Transaction</h3>

                          <div className="space-y-4 font-sans text-xs">
                            {/* Card Holder Name */}
                            <div className="flex flex-col space-y-1.5">
                              <label className="font-mono text-[9px] text-stone-500 uppercase tracking-wider">Cardholder Name</label>
                              <input
                                type="text"
                                name="cardName"
                                value={formData.cardName}
                                onChange={handleInputChange}
                                placeholder="CHARLES BAUDELAIRE"
                                className="bg-stone-950 border border-stone-800/80 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-amber-500 transition-colors uppercase"
                              />
                            </div>

                            {/* Card Number */}
                            <div className="flex flex-col space-y-1.5">
                              <label className="font-mono text-[9px] text-stone-500 uppercase tracking-wider">Card Number</label>
                              <input
                                type="text"
                                name="cardNumber"
                                value={formData.cardNumber}
                                onChange={handleInputChange}
                                maxLength={19}
                                placeholder="4111 2222 3333 4444"
                                className="bg-stone-950 border border-stone-800/80 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-amber-500 transition-colors"
                              />
                            </div>

                            {/* Expiry & CVV */}
                            <div className="grid grid-cols-2 gap-4">
                              <div className="flex flex-col space-y-1.5">
                                <label className="font-mono text-[9px] text-stone-500 uppercase tracking-wider">Expiration Date</label>
                                <input
                                  type="text"
                                  name="cardExpiry"
                                  value={formData.cardExpiry}
                                  onChange={handleInputChange}
                                  maxLength={5}
                                  placeholder="MM/YY"
                                  className="bg-stone-950 border border-stone-800/80 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-amber-500 transition-colors"
                                />
                              </div>
                              <div className="flex flex-col space-y-1.5">
                                <label className="font-mono text-[9px] text-stone-500 uppercase tracking-wider">CVV Code</label>
                                <input
                                  type="password"
                                  name="cardCvv"
                                  value={formData.cardCvv}
                                  onChange={handleInputChange}
                                  onFocus={() => setCardFlipped(true)}
                                  onBlur={() => setCardFlipped(false)}
                                  maxLength={4}
                                  placeholder="***"
                                  className="bg-stone-950 border border-stone-800/80 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-amber-500 transition-colors"
                                />
                              </div>
                            </div>

                          </div>
                        </motion.div>
                      )}

                      {/* STEP 3: TRANSACTION SUCCESS SLATE */}
                      {step === 3 && (
                        <motion.div
                          key="form-success"
                          initial={{ scale: 0.95, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="text-center space-y-6 py-6"
                        >
                          <div className="inline-flex items-center justify-center p-3 bg-emerald-500/10 rounded-full border border-emerald-500/30 mb-2">
                            <CheckCircle className="w-8 h-8 text-emerald-500" />
                          </div>

                          <span className="font-mono text-[9px] text-stone-500 uppercase tracking-[0.3em] block">Dispatch Processing Verified</span>
                          <h2 className="font-serif text-3xl text-white">Your curation has been secured.</h2>
                          
                          <p className="text-stone-400 font-sans text-xs max-w-sm mx-auto leading-relaxed">
                            Gratitude for choosing Todofragances. A signature validation and receipt ticket has been dispatched to <span className="text-stone-200 underline">{formData.email}</span>.
                          </p>

                          <div className="p-4 bg-stone-950/40 rounded-xl border border-stone-900 grid grid-cols-2 gap-4 text-left">
                            <div>
                              <span className="font-mono text-[8px] text-stone-500 uppercase block tracking-wider mb-0.5">Order Token</span>
                              <span className="font-mono text-[10px] text-stone-300 font-semibold uppercase">ARM-{Math.floor(Math.random() * 899999 + 100000)}</span>
                            </div>
                            <div>
                              <span className="font-mono text-[8px] text-stone-500 uppercase block tracking-wider mb-0.5">Courier Route</span>
                              <span className="font-sans text-[10px] text-stone-300">Signature Air Freight</span>
                            </div>
                          </div>

                          <div className="flex gap-3 justify-center pt-4">
                            <button
                              onClick={() => {
                                onSuccessClear();
                                onClose();
                              }}
                              className="bg-white hover:bg-stone-200 text-stone-950 font-sans text-xs uppercase font-bold tracking-widest px-8 py-4 rounded-full"
                            >
                              Browse More Curations
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Operational navigations buttons */}
                  {step !== 3 && (
                    <div className="flex justify-between items-center border-t border-stone-800/80 pt-6 mt-8">
                      <button
                        onClick={step === 2 ? () => setStep(1) : onClose}
                        className="flex items-center space-x-2 text-stone-400 hover:text-white font-mono text-[9px] uppercase font-bold tracking-widest"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>{step === 2 ? 'DELIVERY INFO' : 'ABANDON TRANSACTION'}</span>
                      </button>

                      <button
                        disabled={step === 1 ? !isDeliveryValid : !isPaymentValid}
                        onClick={step === 1 ? () => setStep(2) : () => setStep(3)}
                        className={`flex items-center space-x-1 font-mono text-[9px] uppercase font-bold tracking-widest px-6 py-3.5 rounded-full ${
                          (step === 1 ? isDeliveryValid : isPaymentValid)
                            ? 'bg-white text-stone-950 hover:bg-stone-200 cursor-pointer'
                            : 'bg-stone-800 text-stone-500 cursor-not-allowed'
                        }`}
                      >
                        <span>{step === 1 ? 'PROCEED TO PAYMENT' : 'VERIFY VALUATION TRANSACTION'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                </div>

                {/* Right pane: Visual Interactive Payment Card and Bag Subtotal list */}
                <div className="lg:col-span-5 bg-stone-950/40 p-8 md:p-10 border-l border-stone-800/40 flex flex-col justify-between space-y-8 relative overflow-hidden">
                  
                  {/* STEP 2 payment cards 3D transformation panel */}
                  {step === 2 ? (
                    <div className="space-y-6">
                      <span className="font-mono text-[9px] text-stone-500 uppercase tracking-widest block leading-none">Bespoke Gold Visa Asset</span>
                      
                      {/* The Card wrapper with 3D perspective */}
                      <div className="w-full h-44 [perspective:1000px]">
                        <motion.div
                          animate={{ rotateY: cardFlipped ? 180 : 0 }}
                          transition={{ duration: 0.6 }}
                          className="relative w-full h-full [transform-style:preserve-3d] shadow-2xl rounded-2xl cursor-pointer select-none border border-amber-500/25"
                        >
                          {/* Front Side Card */}
                          <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-2xl bg-gradient-to-tr from-[#BF953F] via-[#FCF6BA] to-[#B38728] p-5 flex flex-col justify-between text-stone-950">
                            <div className="flex justify-between items-start leading-none">
                              <span className="font-mono text-[8px] font-semibold tracking-widest uppercase">Todofragances Sovereign</span>
                              <Landmark className="w-5 h-5 opacity-90" />
                            </div>

                            <div className="space-y-2">
                              {/* Numbers */}
                              <span className="font-mono text-base tracking-[0.1em] font-medium block">
                                {formData.cardNumber || '•••• •••• •••• ••••'}
                              </span>

                              <div className="flex justify-between items-end">
                                <div>
                                  <span className="font-mono text-[7px] text-stone-950/60 uppercase block">Cardholder</span>
                                  <span className="font-mono text-[10px] uppercase font-bold leading-none tracking-wide truncate max-w-[150px] block">
                                    {formData.cardName || 'YOUR SIGNATURE'}
                                  </span>
                                </div>
                                <div className="text-right">
                                  <span className="font-mono text-[7px] text-stone-950/60 uppercase block">Expiry</span>
                                  <span className="font-mono text-[10px] font-bold leading-none block">
                                    {formData.cardExpiry || 'MM/YY'}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Back Side Card */}
                          <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-2xl bg-gradient-to-tr from-[#8E702D] to-[#3A2D0C] p-5 flex flex-col justify-between text-amber-100">
                            {/* Mag stripe */}
                            <div className="absolute top-5 left-0 w-full h-8 bg-stone-950" />
                            
                            <div className="mt-12 flex justify-between items-center bg-stone-900 border border-stone-800 rounded px-2.5 py-1.5 font-mono text-xs">
                              <span className="text-[7px] text-stone-500 uppercase tracking-widest">SIEG</span>
                              <span className="font-semibold text-white tracking-widest">{formData.cardCvv || '•••'}</span>
                            </div>

                            <div className="flex justify-between items-center text-[7.5px] font-mono text-amber-500/60 mt-auto leading-none">
                              <span>Authorized signature required</span>
                              <span>ARM VISA</span>
                            </div>
                          </div>

                        </motion.div>
                      </div>
                    </div>
                  ) : (
                    /* General bag item list in steps 1 & 3 */
                    <div className="space-y-6">
                      <span className="font-mono text-[9px] text-stone-500 uppercase tracking-widest block leading-none">Verification Curation Bag</span>
                      
                      <div className="space-y-4 max-h-48 overflow-y-auto pr-1">
                        {cartItems.map((item, idx) => (
                          <div key={idx} className="flex gap-3 items-center text-xs">
                            <div className="w-10 h-12 bg-stone-950 rounded flex items-center justify-center border border-stone-800 overflow-hidden shrink-0">
                              <img src={item.fragrance.image} alt="" className="h-9 object-contain" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-serif text-white truncate text-[11px] leading-tight">{item.fragrance.name}</h4>
                              <p className="text-stone-500 font-mono text-[9px] uppercase leading-none mt-0.5">{item.fragrance.brand} • {item.selectedSize}ml</p>
                            </div>
                            <span className="font-serif text-stone-300 shrink-0 text-[11px]">${(item.fragrance.price + (item.selectedSize === 100 ? 60 : item.selectedSize === 200 ? 150 : 0)) * item.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Calculations breakdown block */}
                  <div className="border-t border-stone-8s0 pt-6 space-y-3 mt-auto">
                    <div className="flex justify-between text-xs text-stone-400">
                      <span>Selection valuation</span>
                      <span>${subtotal}</span>
                    </div>
                    <div className="flex justify-between text-xs text-stone-400">
                      <span>Courier Logistics Freight</span>
                      <span>{courierFee === 0 ? 'Complimentary' : `$${courierFee}`}</span>
                    </div>
                    <div className="flex justify-between text-base text-white pt-2 border-t border-stone-900">
                      <span className="font-serif">Verified Total</span>
                      <span className="font-serif font-semibold text-amber-400">${grandTotal} <span className="text-[10px] font-mono font-light text-stone-500">USD</span></span>
                    </div>

                    <div className="flex items-center space-x-2 text-stone-500 font-mono text-[8px] uppercase tracking-widest pt-4 leading-none justify-center">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      <span>Complies with PCI-DSS 3.2 Standards</span>
                    </div>
                  </div>

                </div>

              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
