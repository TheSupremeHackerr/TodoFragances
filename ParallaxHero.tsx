import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface ParallaxHeroProps {
  onExploreClick: () => void;
  onAiConsultationClick: () => void;
  onFemaleFilterClick?: () => void; // Support clicking "FOR HER ->" to trigger filter
}

export default function ParallaxHero({ 
  onExploreClick, 
  onAiConsultationClick,
  onFemaleFilterClick 
}: ParallaxHeroProps) {

  return (
    <section 
      id="hero"
      className="relative min-h-screen bg-stone-950 flex flex-col justify-between overflow-hidden px-6 pt-32 pb-12 select-none"
    >
      {/* Immersive background collage with high-end luxury bottle images */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-stone-950/80 md:bg-stone-950/65 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&q=80&w=1600"
          alt="Luxury perfume background"
          className="w-full h-full object-cover filter blur-[2px] opacity-40 scale-105 duration-1000"
        />
        
        {/* Floating gradient ambient accents */}
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full filter blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-rose-500/5 rounded-full filter blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-20 my-auto">
        
        {/* Editorial Content */}
        <div className="lg:col-span-7 space-y-7 xl:space-y-8 text-left">
          
          {/* Accent flag */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center space-x-2 text-amber-500 font-mono text-[9.5px] tracking-[0.35em] uppercase"
          >
            <span className="w-5 h-[1px] bg-amber-500 block" />
            <Sparkles className="w-3.5 h-3.5 mr-0.5 text-amber-500 animate-pulse" />
            <span>Premium Collection</span>
          </motion.div>

          {/* Golden Italicized pair heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15 }}
            className="font-serif text-5xl sm:text-6xl md:text-7.5xl text-white tracking-tight leading-[1.08]"
          >
            Discover Your <br />
            <span className="text-amber-400 font-serif italic font-normal tracking-wide mt-1.5 block">Signature Scent</span>
          </motion.h1>

          {/* Subtitle statement */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-stone-300 font-sans text-xs sm:text-sm md:text-base leading-relaxed max-w-lg font-light tracking-wide"
          >
            Discover exclusive premium fragrances. Unmatched quality, fast delivery, timeless elegance, decanted directly from the world&apos;s oldest houses.
          </motion.p>

          {/* Gold & Pink Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center w-full sm:w-auto pt-3"
          >
            <button
              onClick={onExploreClick}
              className="bg-amber-500 hover:bg-amber-400 text-stone-950 transition-all font-sans text-[11px] uppercase tracking-[0.25em] font-bold py-4 px-8 rounded-lg shadow-xl hover:shadow-2xl flex items-center justify-center space-x-2 cursor-pointer active:scale-98"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>

            <button
              onClick={onFemaleFilterClick || onExploreClick}
              className="bg-rose-600 hover:bg-rose-500 text-white transition-all font-sans text-[11px] uppercase tracking-[0.25em] font-bold py-4 px-8 rounded-lg shadow-lg flex items-center justify-center space-x-2 cursor-pointer active:scale-98"
            >
              <span>For Her</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </motion.div>

        </div>

        {/* Right Accent Content: Deluxe overlapping boutique bottle layout */}
        <div className="lg:col-span-5 hidden lg:flex justify-end items-center relative py-12">
          
          {/* Overlapping collage of bottle graphic components */}
          <div className="relative w-80 h-96">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, x: 20 }}
              animate={{ opacity: 0.9, scale: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.4 }}
              className="absolute -right-6 top-10 w-44 h-64 bg-stone-900/40 border border-stone-800 rounded-2xl flex items-center justify-center p-4 backdrop-blur-xs select-none shadow-xl transform rotate-3"
            >
              <img 
                src="https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=400" 
                alt="Sweet Decant" 
                className="h-44 object-contain filter drop-shadow-md"
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9, x: -20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="absolute left-0 top-24 w-52 h-76 bg-stone-900/60 border border-stone-700/80 rounded-2xl flex flex-col justify-between p-5 backdrop-blur-sm select-none shadow-2xl transform -rotate-4 z-10"
            >
              <div className="flex justify-between font-mono text-[8px] text-amber-500 uppercase tracking-widest leading-none">
                <span>Featured decant</span>
                <span>35% oil</span>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=400" 
                alt="Amber Decant" 
                className="h-48 object-contain filter drop-shadow-lg scale-105"
              />
              <span className="text-center font-serif text-[11px] text-stone-200 tracking-wider">Arabians Tonka</span>
            </motion.div>
          </div>

        </div>

      </div>

      {/* Hero Foot: Clean Features list with gold bullets */}
      <div className="border-t border-stone-900/60 pt-6 mt-12 w-full max-w-7xl mx-auto relative z-20">
        <div className="flex flex-wrap justify-center sm:justify-between items-center gap-4 text-stone-400 font-mono text-[9px] sm:text-[10px] tracking-[0.2em] uppercase">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <span>Tracked Shipping</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <span>Authentic Fragrances</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <span>Shipped from EU</span>
          </div>
        </div>
      </div>

    </section>
  );
}
