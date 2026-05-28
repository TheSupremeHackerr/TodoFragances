import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ParallaxHero from './components/ParallaxHero';
import InteractiveShowcase from './components/InteractiveShowcase';
import OlfactoryFinder from './components/OlfactoryFinder';
import ProductDetailModal from './components/ProductDetailModal';
import CartDrawer from './components/CartDrawer';
import CheckoutWizard from './components/CheckoutWizard';
import ScentAI from './components/ScentAI';
import { Fragrance, CartItem } from './types';
import { Mail, Phone, MapPin, Sparkles, ShieldAlert, Award, Star } from 'lucide-react';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [finderOpen, setFinderOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedFragrance, setSelectedFragrance] = useState<Fragrance | null>(null);
  const [activeSection, setActiveSection] = useState('hero');
  const [genderFilter, setGenderFilter] = useState<'all' | 'him' | 'her' | 'bundle'>('all');

  // Monitor scrolling to highlight correct navigation link in Navbar
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'collection'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth standard scrolling
  const scrollToSection = (sectionId: string, filter?: string) => {
    if (sectionId === 'footer') {
      const el = document.getElementById('footer');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    if (sectionId === 'collection') {
      if (filter) {
        setGenderFilter(filter as any);
      }
      setTimeout(() => {
        const el = document.getElementById('collection');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
      return;
    }

    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Add item carefully to cart
  const handleAddToCart = (fragrance: Fragrance, size: number, engraving?: string) => {
    setCart(prev => {
      const existingIdx = prev.findIndex(
        item => item.fragrance.id === fragrance.id && 
                item.selectedSize === size && 
                item.engravedText === engraving
      );

      if (existingIdx > -1) {
        const clone = [...prev];
        clone[existingIdx].quantity += 1;
        return clone;
      } else {
        return [...prev, { fragrance, selectedSize: size, quantity: 1, engravedText: engraving }];
      }
    });
    // Triggers feedback by sliding open the drawer
    setCartOpen(true);
  };

  const handleAddToCartDirect = (fragrance: Fragrance) => {
    handleAddToCart(fragrance, fragrance.sizes[0]);
  };

  const handleUpdateQuantity = (idx: number, change: number) => {
    setCart(prev => {
      const clone = [...prev];
      const nextQuantity = clone[idx].quantity + change;
      if (nextQuantity <= 0) {
        clone.splice(idx, 1);
      } else {
        clone[idx].quantity = nextQuantity;
      }
      return clone;
    });
  };

  const handleRemoveItem = (idx: number) => {
    setCart(prev => {
      const clone = [...prev];
      clone.splice(idx, 1);
      return clone;
    });
  };

  const handleSuccessClear = () => {
    setCart([]);
  };

  return (
    <div className="bg-stone-950 min-h-screen text-white font-sans selection:bg-amber-500 selection:text-stone-950 relative">
      
      {/* Floating Header */}
      <Navbar
        onCartToggle={() => setCartOpen(!cartOpen)}
        onFinderToggle={() => setFinderOpen(!finderOpen)}
        onAiToggle={() => setAiOpen(!aiOpen)}
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
        activeSection={activeSection}
        onScrollTo={scrollToSection}
      />

      {/* Main Landing Page Hero with scrolling parallax effects */}
      <ParallaxHero
        onExploreClick={() => scrollToSection('collection', 'all')}
        onAiConsultationClick={() => setAiOpen(true)}
        onFemaleFilterClick={() => scrollToSection('collection', 'her')}
      />

      {/* Interactive Products Showcase section */}
      <InteractiveShowcase
        onFragranceSelect={(frag) => setSelectedFragrance(frag)}
        onAddToCartDirectly={handleAddToCartDirect}
        genderFilter={genderFilter}
        onGenderFilterChange={(f) => setGenderFilter(f)}
      />

      {/* Brand Values bento-tier informational deck */}
      <section id="experience" className="bg-stone-950 pb-24 px-6 relative z-30">
        <div className="max-w-7xl mx-auto border-t border-stone-900 pt-20">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="font-mono text-[9px] text-amber-500 uppercase tracking-[0.3em] block mb-2 leading-none">THE FOUNDRY PROCESS</span>
            <h2 className="font-serif text-3xl md:text-5xl text-white tracking-tight leading-none mb-4">Values & Integrity</h2>
            <p className="text-stone-500 font-sans text-xs leading-relaxed max-w-sm mx-auto">
              Sensory objects formulated to last. We synthesize rare biological elements to challenge traditional methods.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            {/* Box 1 */}
            <div className="bg-stone-900/40 border border-stone-900/60 p-8 rounded-2xl flex flex-col justify-between hover:border-stone-800 transition-all">
              <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/35 w-fit mx-auto md:mx-0 mb-6">
                <Award className="w-5 h-5 text-amber-500" />
              </div>
              <h4 className="font-serif text-lg text-white mb-2 leading-none">Prestige Concentrations</h4>
              <p className="text-stone-400 font-sans text-xs font-light leading-relaxed">
                All curations are manufactured at either 24% (Eau de Parfum) or extreme 35% (Extrait de Parfum) oil concentrations, guaranteeing longevity past 12 hours.
              </p>
            </div>

            {/* Box 2 */}
            <div className="bg-stone-900/40 border border-stone-900/60 p-8 rounded-2xl flex flex-col justify-between hover:border-stone-800 transition-all">
              <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/35 w-fit mx-auto md:mx-0 mb-6">
                <Sparkles className="w-5 h-5 text-amber-500" />
              </div>
              <h4 className="font-serif text-lg text-white mb-2 leading-none">Laser Cap Engravings</h4>
              <p className="text-stone-400 font-sans text-xs font-light leading-relaxed">
                Make your curation bespoke. Personalize the heavy zinc-alloy caps with micro-laser text engravings, completed complimentary at our Parisian laboratory.
              </p>
            </div>

            {/* Box 3 */}
            <div className="bg-stone-900/40 border border-stone-900/60 p-8 rounded-2xl flex flex-col justify-between hover:border-stone-800 transition-all">
              <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/35 w-fit mx-auto md:mx-0 mb-6">
                <ShieldAlert className="w-5 h-5 text-amber-500" />
              </div>
              <h4 className="font-serif text-lg text-white mb-2 leading-none">Air-safe dispatching</h4>
              <p className="text-stone-400 font-sans text-xs font-light leading-relaxed">
                Bottles are double-sealed, encased in high-density recycled linen sleeves, and shipped via climate-controlled air courier to preserve organic compounds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pure Luxury Brand Footer (matches Page 19 design) */}
      <footer id="footer" className="bg-stone-950 border-t border-stone-900 px-6 py-16 relative z-30 font-sans text-xs">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-stone-900 pb-16">
          
          {/* Brand Intro Column */}
          <div className="space-y-4">
            <span className="font-serif text-lg tracking-[0.2em] text-white uppercase block">Todofragances</span>
            <p className="text-stone-400 text-xs leading-relaxed font-light">
              Discover exclusive premium fragrances. Unmatched quality, fast delivery, timeless elegance. Decanted from genuine source containers directly to you, preserving raw notes and compositions.
            </p>
            <div className="flex space-x-3 text-stone-500 pt-1">
              <span className="hover:text-amber-400 cursor-pointer text-[10px] font-mono tracking-widest uppercase">INSTAGRAM</span>
              <span className="text-stone-800">•</span>
              <span className="hover:text-amber-400 cursor-pointer text-[10px] font-mono tracking-widest uppercase">FACEBOOK</span>
            </div>
          </div>

          {/* Shop category links column */}
          <div className="space-y-3">
            <span className="font-mono text-[9px] text-stone-500 uppercase tracking-widest block font-bold leading-none">Shop</span>
            <ul className="space-y-2 text-stone-300 font-light cursor-pointer">
              <li 
                className="hover:text-amber-400 transition-colors" 
                onClick={() => scrollToSection('collection', 'him')}
              >
                Men&apos;s Collection
              </li>
              <li 
                className="hover:text-amber-400 transition-colors" 
                onClick={() => scrollToSection('collection', 'her')}
              >
                Women&apos;s Collection
              </li>
              <li 
                className="hover:text-amber-400 transition-colors" 
                onClick={() => scrollToSection('collection', 'all')}
              >
                All Products
              </li>
              <li 
                className="hover:text-amber-400 transition-colors flex items-center space-x-1.5"
                onClick={() => scrollToSection('collection', 'bundle')}
              >
                <span>Curated Bundles</span>
                <span className="bg-amber-500/15 border border-amber-550 text-amber-500 text-[8px] font-bold px-1.5 rounded-sm">HOT</span>
              </li>
            </ul>
          </div>

          {/* Customer support column */}
          <div className="space-y-3">
            <span className="font-mono text-[9px] text-stone-500 uppercase tracking-widest block font-bold leading-none">Support</span>
            <ul className="space-y-2 text-stone-400 font-light cursor-pointer">
              <li className="hover:text-white transition-colors">Privacy Policy</li>
              <li className="hover:text-white transition-colors">Terms of Service</li>
              <li className="hover:text-white transition-colors">Frequent Questions (FAQ)</li>
              <li className="hover:text-white transition-colors">Order Lookup</li>
            </ul>
          </div>

          {/* Subscription and secure badge layer */}
          <div className="space-y-4">
            <span className="font-mono text-[9px] text-stone-500 uppercase tracking-widest block font-bold leading-none">Stay Updated</span>
            <p className="text-stone-400 text-xs font-light leading-relaxed">
              Subscribe for exclusive offers, notes guides, and new luxury decants.
            </p>
            <div className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-stone-900 border border-stone-800 focus:border-stone-500 focus:outline-none focus:ring-1 focus:ring-stone-500/20 px-4 py-2 text-xs rounded-sm text-white placeholder-stone-500 font-sans"
              />
              <button
                type="button"
                onClick={() => alert('Thank you for subscribing to the Todofragances newsletter!')}
                className="bg-amber-500 hover:bg-amber-400 text-stone-950 text-center text-[10px] font-bold tracking-widest uppercase py-2 leading-none rounded-sm transition-colors cursor-pointer"
              >
                Subscribe
              </button>
            </div>
            <div className="pt-2 flex items-center space-x-2.5">
              <div className="border border-stone-800 text-stone-500 text-[8.5px] font-mono tracking-widest px-2 py-1 uppercase rounded-sm">
                Secure Checkout
              </div>
              <span className="text-[10px] text-stone-600 font-sans text-nowrap">💳 PCI-DSS Compliant</span>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row justify-between items-center text-[10px] text-stone-600 font-mono tracking-widest uppercase gap-4">
          <span>&copy; {new Date().getFullYear()} Todofragances Premium. All rights reserved.</span>
          <span>Fast Shipping from the European Union</span>
        </div>
      </footer>

      {/* MODAL & DRAWER TRANSITIONS */}

      {/* Interactive Aura Finder Modal */}
      {finderOpen && (
        <OlfactoryFinder
          onClose={() => setFinderOpen(false)}
          onFragranceSelect={(frag) => setSelectedFragrance(frag)}
        />
      )}

      {/* Scent AI Chat Drawer Panel */}
      <ScentAI
        isOpen={aiOpen}
        onClose={() => setAiOpen(false)}
        onFragranceSelect={(frag) => setSelectedFragrance(frag)}
      />

      {/* Product Detail Modal (Featuring zoom gallery glass lens) */}
      {selectedFragrance && (
        <ProductDetailModal
          fragrance={selectedFragrance}
          onClose={() => setSelectedFragrance(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Cart Drawer Panel */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
      />

      {/* Express Checkout Transaction Wizard Panel */}
      <CheckoutWizard
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        cartItems={cart}
        onSuccessClear={handleSuccessClear}
      />

    </div>
  );
}
