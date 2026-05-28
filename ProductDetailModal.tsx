import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, MessageSquare, ShieldCheck, PenTool, Check, ChevronDown, Award } from 'lucide-react';
import { useState, useRef, MouseEvent as ReactMouseEvent } from 'react';
import { Fragrance, Review } from '../types';
import { REVIEWS } from '../data';

interface ProductDetailModalProps {
  fragrance: Fragrance;
  onClose: () => void;
  onAddToCart: (fragrance: Fragrance, size: number, engraving?: string) => void;
}

export default function ProductDetailModal({
  fragrance,
  onClose,
  onAddToCart
}: ProductDetailModalProps) {
  const [selectedSize, setSelectedSize] = useState<number>(fragrance.sizes[0]);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [engravingText, setEngravingText] = useState('');
  const [engravingActive, setEngravingActive] = useState(false);
  const [zoomStyle, setZoomStyle] = useState({ display: 'none', backgroundPosition: '0% 0%' });

  const containerRef = useRef<HTMLDivElement>(null);
  const reviews: Review[] = REVIEWS[fragrance.id] || [];

  const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomStyle({
      display: 'block',
      backgroundPosition: `${x}% ${y}%`,
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ display: 'none', backgroundPosition: '0% 0%' });
  };

  // Size pricing formula adjustment
  const calculatedPrice = fragrance.price + (selectedSize === 100 ? 60 : selectedSize === 200 ? 150 : 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/95 backdrop-blur-lg overflow-y-auto">
      <motion.div
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.98, opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-stone-900 border border-stone-800 rounded-3xl w-full max-w-5xl my-8 overflow-hidden shadow-2xl relative"
      >
        {/* Close Button Trigger */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-stone-400 hover:text-white hover:bg-white/5 p-2 rounded-full transition-all z-20"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          
          {/* Left: Product Media Gallery Panel with Magnifier Zoom */}
          <div className="lg:col-span-6 p-8 bg-stone-950/60 border-r border-stone-800/40 flex flex-col justify-between">
            <div>
              {/* Giant Magnifiable High-res display */}
              <div 
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative h-96 w-full rounded-2xl bg-stone-950 border border-stone-900 overflow-hidden flex items-center justify-center cursor-crosshair group"
              >
                {/* Regular product display */}
                <img
                  src={fragrance.images[activeImageIdx]}
                  alt={`${fragrance.name} core angle`}
                  className="h-72 object-contain filter drop-shadow-[0_25px_45px_rgba(0,0,0,0.85)] group-hover:opacity-0 transition-opacity duration-200"
                />

                {/* Magnifier zoom overlay view portal */}
                <div
                  className="absolute inset-0 bg-no-repeat pointer-events-none transition-opacity duration-200"
                  style={{
                    ...zoomStyle,
                    backgroundImage: `url(${fragrance.images[activeImageIdx]})`,
                    backgroundSize: '220%', // 2.2x zoom magnification
                  }}
                />

                {/* Micro zoom prompt badge */}
                <div className="absolute bottom-4 right-4 pointer-events-none text-stone-500 font-mono text-[8px] uppercase tracking-widest leading-none bg-stone-900/60 py-2 px-3.5 border border-stone-800/50 rounded-full">
                  Hover to focus lens
                </div>
              </div>

              {/* Thumbnails list */}
              <div className="flex gap-4 mt-6">
                {fragrance.images.map((img, idx) => (
                  <button
                    key={img + idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`relative w-20 h-20 bg-stone-950 border rounded-xl overflow-hidden flex items-center justify-center transition-all ${
                      activeImageIdx === idx ? 'border-amber-500' : 'border-stone-900 hover:border-stone-800'
                    }`}
                  >
                    <img
                      src={img}
                      alt="Thumbnail perspective"
                      className="h-14 object-contain filter drop-shadow-[0_5px_8px_rgba(0,0,0,0.6)]"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Olfactory Scent Pyramid */}
            <div className="mt-8 border-t border-stone-900/60 pt-8">
              <span className="font-mono text-[9px] text-stone-500 uppercase tracking-widest block mb-4">Chemical Notes Architecture</span>
              <div className="space-y-4 font-sans text-xs">
                
                {/* Top notes */}
                <div className="flex items-start">
                  <div className="w-24 font-mono text-[9px] text-amber-500 uppercase tracking-wider py-0.5 border-r border-stone-800">
                    Top / Cap
                  </div>
                  <div className="flex-1 pl-4 flex flex-wrap gap-1.5">
                    {fragrance.topNotes.map(n => (
                      <span key={n} className="bg-stone-900 text-stone-300 px-3 py-1 rounded-full border border-stone-800/50 text-[10px]">
                        {n}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Heart notes */}
                <div className="flex items-start">
                  <div className="w-24 font-mono text-[9px] text-purple-400 uppercase tracking-wider py-0.5 border-r border-stone-800">
                    Heart / Core
                  </div>
                  <div className="flex-1 pl-4 flex flex-wrap gap-1.5">
                    {fragrance.heartNotes.map(n => (
                      <span key={n} className="bg-stone-900 text-stone-300 px-3 py-1 rounded-full border border-stone-800/50 text-[10px]">
                        {n}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Base notes */}
                <div className="flex items-start">
                  <div className="w-24 font-mono text-[9px] text-stone-400 uppercase tracking-wider py-0.5 border-r border-stone-800">
                    Base / Anchor
                  </div>
                  <div className="flex-1 pl-4 flex flex-wrap gap-1.5">
                    {fragrance.baseNotes.map(n => (
                      <span key={n} className="bg-stone-900 text-stone-300 px-3 py-1 rounded-full border border-stone-800/50 text-[10px]">
                        {n}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Right: Technical Details, Customizations, & Reviews Panel */}
          <div className="lg:col-span-6 p-8 overflow-y-auto max-h-[85vh] flex flex-col justify-between space-y-8">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-amber-500 uppercase tracking-widest">{fragrance.brand}</span>
                <span className="bg-stone-950/40 text-stone-400 font-mono text-[9px] tracking-[0.2em] border border-stone-800 py-1.5 px-4 rounded-full uppercase">
                  {fragrance.intensity}
                </span>
              </div>

              <h2 className="font-serif text-3xl md:text-4xl text-white mt-3 mb-4 tracking-normal leading-none mb-4">
                {fragrance.name}
              </h2>

              <p className="text-stone-300 font-sans text-sm font-light leading-relaxed mb-6">
                {fragrance.story}
              </p>

              {/* Volume scale size select */}
              <div className="space-y-3 mb-6">
                <span className="font-mono text-[9px] text-stone-500 uppercase tracking-widest block leading-none">Bottle Volume Selection</span>
                <div className="flex gap-3">
                  {fragrance.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`font-semibold font-mono text-xs tracking-wide px-5 py-3 rounded-full border transition-all ${
                        selectedSize === size
                          ? 'bg-white text-stone-950 border-white font-bold'
                          : 'bg-stone-900 text-stone-300 border-stone-800 hover:border-stone-700'
                      }`}
                    >
                      {size} ML
                    </button>
                  ))}
                </div>
              </div>

              {/* Laser cap Custom Engraving Input Panel */}
              <div className="border border-stone-800 bg-stone-950/30 rounded-2xl p-5 space-y-4">
                <button
                  type="button"
                  onClick={() => setEngravingActive(!engravingActive)}
                  className="flex items-center justify-between w-full text-left"
                >
                  <div className="flex items-center space-x-2">
                    <PenTool className="w-4 h-4 text-amber-500" />
                    <span className="font-sans text-xs font-semibold text-white">Personalized Engraving on Metal Cap</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-stone-400 transition-transform ${engravingActive ? 'rotate-180' : ''}`} />
                </button>

                {engravingActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="space-y-3 overflow-hidden"
                  >
                    <p className="text-[11px] text-stone-400 font-light leading-relaxed">
                      Lacquered engraving completes this piece. Engrave initials, a historic date, or a message (Max 24 characters).
                    </p>
                    <div className="relative">
                      <input
                        type="text"
                        maxLength={24}
                        placeholder="e.g. A.R. 2026"
                        value={engravingText}
                        onChange={(e) => setEngravingText(e.target.value)}
                        className="w-full bg-stone-950 border border-stone-800/80 rounded-xl py-3 px-4 font-mono text-xs text-white placeholder-stone-600 focus:outline-none focus:border-amber-500 transition-colors uppercase"
                      />
                      <span className="absolute right-3 top-3 font-mono text-[9px] text-stone-600">
                        {engravingText.length}/24
                      </span>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Reviews sector panel */}
            <div className="border-t border-stone-900/60 pt-8">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[9px] text-stone-500 uppercase tracking-widest">Verified Guest Evaluations ({reviews.length})</span>
                <span className="flex items-center space-x-1 text-xs text-amber-500">
                  <Award className="w-3.5 h-3.5" />
                  <span className="font-semibold">{fragrance.rating} out of 5</span>
                </span>
              </div>

              <div className="space-y-4">
                {reviews.map((rev) => (
                  <div key={rev.id} className="bg-stone-950/40 p-4 border border-stone-900 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-serif text-sm text-stone-200 leading-none">{rev.author}</span>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-[9px] text-stone-500">{rev.date}</span>
                        {rev.verified && (
                          <span className="flex items-center space-x-0.5 text-stone-400 border border-stone-800 text-[8px] tracking-wider px-2 py-0.5 rounded uppercase">
                            <ShieldCheck className="w-3 h-3 text-emerald-500" />
                            <span>Verified Recipient</span>
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-[11px] text-stone-400 font-light leading-relaxed">{rev.content}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Price & Add to Bag Footer Section */}
            <div className="border-t border-stone-900/60 pt-6 mt-6 flex items-center justify-between pb-2">
              <div className="flex flex-col">
                <span className="font-mono text-[9px] text-stone-500 tracking-widest uppercase mb-0.5">ESTIMATED VALUATION</span>
                <span className="font-serif text-2xl text-white font-medium">
                  ${calculatedPrice} <span className="text-xs font-mono font-light text-stone-500">USD</span>
                </span>
              </div>

              <button
                onClick={() => {
                  onAddToCart(fragrance, selectedSize, engravingText || undefined);
                  onClose();
                }}
                className="bg-white hover:bg-stone-200 text-stone-950 font-sans text-xs uppercase font-bold tracking-[0.2em] px-8 py-4.5 rounded-full shadow-xl transition-all active:scale-98"
              >
                Secure to Shopping Bag
              </button>
            </div>

          </div>

        </div>
      </motion.div>
    </div>
  );
}
