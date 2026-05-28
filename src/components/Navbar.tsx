import { motion } from 'motion/react';
import { ShoppingBag, Sparkles, Compass, Menu, X, User, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';

interface NavbarProps {
  onCartToggle: () => void;
  onFinderToggle: () => void;
  onAiToggle: () => void;
  cartCount: number;
  activeSection: string;
  onScrollTo: (sectionId: string, filter?: string) => void;
}

export default function Navbar({
  onCartToggle,
  onFinderToggle,
  onAiToggle,
  cartCount,
  activeSection,
  onScrollTo
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'collection', filter: 'him', label: 'Men' },
    { id: 'collection', filter: 'her', label: 'Women' },
    { id: 'collection', filter: 'all', label: 'Shop All' },
    { id: 'footer', filter: '', label: 'Contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed top-0 left-0 w-full z-45 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-stone-200/80 py-3 shadow-sm text-stone-900'
          : 'bg-white/90 backdrop-blur-sm border-b border-stone-150 py-4.5 text-stone-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Left: Premium Brand Logo */}
        <div 
          onClick={() => onScrollTo('hero')}
          className="cursor-pointer group flex items-baseline space-x-1"
        >
          <span className="font-serif text-xl sm:text-2xl tracking-[0.25em] text-stone-900 transition-colors duration-300 group-hover:text-stone-600 uppercase font-semibold">
            Todofragances
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
        </div>

        {/* Center: Curated Navigation Links */}
        <div className="hidden md:flex items-center space-x-10">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => onScrollTo(item.id, item.filter)}
              className={`text-xs uppercase tracking-[0.25em] font-medium transition-colors duration-200 relative py-1 ${
                activeSection === item.id || (item.label === 'Shop All' && activeSection === 'collection')
                  ? 'text-stone-950 font-semibold'
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              {item.label}
              {(activeSection === item.id || (item.label === 'Shop All' && activeSection === 'collection')) && (
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-stone-900" />
              )}
            </button>
          ))}
        </div>

        {/* Right: EUR Currency Selector, User profile details, Ask AI button & Bag Icon */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          
          {/* Ask AI - Interactive sommelier */}
          <button
            onClick={onAiToggle}
            className="flex items-center space-x-1.5 text-stone-800 hover:text-stone-950 transition-all bg-gradient-to-r from-stone-50 to-stone-100 hover:from-stone-100 hover:to-stone-200 border border-stone-200/85 px-3 py-1.5 rounded-full shadow-xs cursor-pointer"
            title="AI Scent Advisor"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.15em] font-bold">Ask AI</span>
          </button>

          {/* Scent Finder - Radar */}
          <button
            onClick={onFinderToggle}
            className="hidden sm:flex items-center space-x-1.5 text-stone-600 hover:text-stone-900 transition-colors border border-stone-200 bg-stone-50/50 px-3 py-1.5 rounded-full cursor-pointer"
            title="Olfactory Finder"
          >
            <Compass className="w-3.5 h-3.5 text-stone-500" />
            <span className="text-[9px] uppercase tracking-[0.15em] font-semibold">Finder</span>
          </button>

          {/* Currency Selector (EUR) */}
          <div className="hidden lg:flex items-center space-x-1 border border-stone-200/80 bg-stone-50 px-2.5 py-1.5 rounded-lg text-[10px] font-sans font-medium text-stone-700 select-none">
            <span>EUR</span>
            <ChevronDown className="w-3 h-3 text-stone-400" />
          </div>

          {/* User profile button */}
          <button className="text-stone-500 hover:text-stone-900 p-1.5 rounded-full transition-colors hidden sm:block">
            <User className="w-[18px] h-[18px]" />
          </button>

          {/* Checkout Bag Counter */}
          <button
            onClick={onCartToggle}
            className="relative p-2 text-stone-700 hover:text-stone-950 transition-colors rounded-full hover:bg-stone-50 active:scale-95 cursor-pointer"
            aria-label="Toggle Shopping Bag"
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.8]" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-[18px] h-[18px] bg-stone-950 text-white font-sans text-[10px] font-bold flex items-center justify-center rounded-full border border-white">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Icon */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-stone-600 hover:text-stone-900 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5.5 h-5.5" /> : <Menu className="w-5.5 h-5.5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden bg-white border-b border-stone-200 w-full absolute top-[100%] left-0 z-50 py-4.5 px-6 shadow-md"
        >
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  onScrollTo(item.id, item.filter);
                  setMobileMenuOpen(false);
                }}
                className={`text-left text-xs uppercase tracking-[0.25em] font-semibold py-2.5 border-b border-stone-100 ${
                  activeSection === item.id ? 'text-stone-950' : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            <button
              onClick={() => {
                onFinderToggle();
                setMobileMenuOpen(false);
              }}
              className="flex items-center space-x-2 text-left text-xs uppercase tracking-[0.25em] py-2.5 text-stone-600 border-b border-stone-100"
            >
              <Compass className="w-4 h-4 text-stone-500" />
              <span>Olfactory Finder</span>
            </button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
