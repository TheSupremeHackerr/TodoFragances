import { motion, AnimatePresence } from 'motion/react';
import { Search, ChevronDown, Eye, Plus, Star, SlidersHorizontal, Sparkles } from 'lucide-react';
import { useState, useMemo } from 'react';
import { Fragrance } from '../types';
import { FRAGRANCES } from '../data';

interface InteractiveShowcaseProps {
  onFragranceSelect: (fragrance: Fragrance) => void;
  onAddToCartDirectly: (fragrance: Fragrance) => void;
  genderFilter: 'all' | 'him' | 'her' | 'bundle';
  onGenderFilterChange: (filter: 'all' | 'him' | 'her' | 'bundle') => void;
}

export default function InteractiveShowcase({
  onFragranceSelect,
  onAddToCartDirectly,
  genderFilter,
  onGenderFilterChange
}: InteractiveShowcaseProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'low-high' | 'high-low' | 'rating'>('featured');
  const [priceRange, setPriceRange] = useState<number>(45); // Max slider value €45 since highest decant/bundle is €39.95

  // Scent profile notes helper filtering
  const [selectedNoteFamily, setSelectedNoteFamily] = useState<'All' | 'Citrus' | 'Warm Spices' | 'Oud / Wood' | 'Sweet / Floral'>('All');

  // Filter & Sort Logic combined
  const filteredFragrances = useMemo(() => {
    let result = [...FRAGRANCES];

    // 1. Gender check
    if (genderFilter !== 'all') {
      result = result.filter(f => f.gender === genderFilter);
    }

    // 2. Note family check
    if (selectedNoteFamily === 'Citrus') {
      result = result.filter(f => f.category === 'Fresh');
    } else if (selectedNoteFamily === 'Warm Spices') {
      result = result.filter(f => f.category === 'Warm');
    } else if (selectedNoteFamily === 'Oud / Wood') {
      result = result.filter(f => f.category === 'Woody');
    } else if (selectedNoteFamily === 'Sweet / Floral') {
      result = result.filter(f => f.category === 'Floral' || f.category === 'Forward');
    }

    // 3. Search query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(f => 
        f.name.toLowerCase().includes(q) || 
        f.brand.toLowerCase().includes(q) || 
        f.description.toLowerCase().includes(q) ||
        f.topNotes.some(note => note.toLowerCase().includes(q)) ||
        f.baseNotes.some(note => note.toLowerCase().includes(q))
      );
    }

    // 4. Price slider range
    result = result.filter(f => f.price <= priceRange);

    // 5. Sorting
    if (sortBy === 'low-high') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'high-low') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [genderFilter, selectedNoteFamily, searchQuery, priceRange, sortBy]);

  return (
    <section id="collection" className="bg-white text-stone-900 py-24 px-6 relative z-30 border-t border-stone-100">
      <div className="max-w-7xl mx-auto">
        
        {/* Centered Collection Header (cloning Page 1 layout) */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-mono text-[10px] text-amber-600 uppercase tracking-[0.4em] block mb-3 font-semibold leading-none">
            PREMIUM FRAGRANCES
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-stone-900 tracking-tight leading-none mb-5 font-light">
            Our Collection
          </h2>
          <p className="text-stone-500 font-sans text-xs sm:text-sm tracking-wide leading-relaxed font-light">
            Discover our curated selection of premium fragrances from the world&apos;s
            most prestigious houses, decanted into travel atomizers.
          </p>
        </div>

        {/* Elegant Centered Search Bar Section */}
        <div className="max-w-lg mx-auto mb-20 relative">
          <div className="relative flex items-center bg-stone-50 border border-stone-200 hover:border-stone-300 focus-within:border-stone-400 focus-within:ring-1 focus-within:ring-stone-400/20 rounded-full py-4.5 px-6.5 transition-all duration-200 group shadow-xs">
            <Search className="w-5 h-5 text-stone-400 group-focus-within:text-stone-700 mr-3.5" />
            <input
              type="text"
              placeholder="Search for a fragrance, note, or brand..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-stone-800 placeholder-stone-400 font-sans text-xs sm:text-sm w-full focus:outline-none"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="text-stone-400 hover:text-stone-700 font-mono text-xs pr-2"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* E-Commerce Control Deck (cloning Page 2-4 layout with interactive counts and sorting dropdowns) */}
        <div className="border-b border-stone-200 pb-6 mb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          
          {/* Active Product Counts */}
          <div className="flex items-center space-x-3 text-stone-500 font-sans text-xs tracking-wide">
            <span className="text-stone-900 font-medium text-sm">{filteredFragrances.length} fragrances</span>
            <span>•</span>
            <span className="italic font-light">Available in 2ml, 5ml, 10ml samples</span>
          </div>

          {/* Filtering and Sorting Controls Bar */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            
            {/* Gender filters pills matching navbar action intent */}
            <div className="flex bg-stone-100 rounded-full p-1 border border-stone-200/50">
              {(['all', 'him', 'her', 'bundle'] as const).map((filterOpt) => (
                <button
                  key={filterOpt}
                  onClick={() => onGenderFilterChange(filterOpt)}
                  className={`text-[9.5px] uppercase font-bold tracking-widest px-4 py-1.5 rounded-full duration-200 transition-all ${
                    genderFilter === filterOpt
                      ? 'bg-white text-stone-950 shadow-xs'
                      : 'text-stone-400 hover:text-stone-800'
                  }`}
                >
                  {filterOpt === 'all' ? 'All' : filterOpt === 'him' ? 'For Him' : filterOpt === 'her' ? 'For Her' : 'Bundles'}
                </button>
              ))}
            </div>

            {/* Note profile filters dropdown */}
            <div className="flex items-center space-x-1.5 text-xs text-stone-600 font-sans border border-stone-200 bg-stone-50/50 px-3 py-1.5 rounded-full">
              <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">Note:</span>
              <select
                value={selectedNoteFamily}
                onChange={(e) => setSelectedNoteFamily(e.target.value as any)}
                className="bg-transparent focus:outline-none text-[11px] font-medium text-stone-800 cursor-pointer pr-1"
              >
                <option value="All">All Families</option>
                <option value="Citrus">Fresh Citrus</option>
                <option value="Warm Spices">Warm Oriental</option>
                <option value="Oud / Wood">Smoky Woods</option>
                <option value="Sweet / Floral">Sweet Floral</option>
              </select>
            </div>

            {/* sorting dropdown */}
            <div className="flex items-center space-x-1.5 text-xs text-stone-600 font-sans border border-stone-200 bg-stone-50/50 px-3 py-1.5 rounded-full">
              <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">Sort:</span>
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="bg-transparent focus:outline-none text-[11px] font-medium text-stone-800 cursor-pointer pr-1"
              >
                <option value="featured">Featured</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>

            {/* Interactive Price filter scale */}
            <div className="flex items-center space-x-3 text-stone-500 font-sans text-xs border border-stone-200 bg-stone-50/50 px-4 py-1.5 rounded-full">
              <span className="text-[9.5px] uppercase font-bold text-stone-400 tracking-wider">Max Price:</span>
              <input
                type="range"
                min="10"
                max="45"
                step="1"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-16 accent-stone-900 h-1 cursor-pointer"
              />
              <span className="font-mono text-stone-800 font-medium text-[11px]">€{priceRange}</span>
            </div>

          </div>
        </div>

        {/* 4-Column Product Grid mirroring the screens */}
        {filteredFragrances.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 px-6 bg-stone-50 rounded-2xl border border-stone-100/60"
          >
            <p className="font-serif text-lg text-stone-600">No matching fragrances found.</p>
            <p className="text-xs text-stone-400 font-sans mt-2">Try adjusting your filters or clear your search inquiry.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                onGenderFilterChange('all');
                setSelectedNoteFamily('All');
                setPriceRange(45);
              }}
              className="mt-6 font-mono text-[9px] uppercase tracking-wider font-bold bg-stone-900 text-white px-5 py-2.5 rounded-full hover:bg-stone-800 transition-colors"
            >
              Reset Filters
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredFragrances.map((frag, idx) => {
                const isDiscounted = frag.originalPrice !== undefined;
                return (
                  <motion.div
                    layout
                    key={frag.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col justify-between h-full group"
                  >
                    
                    {/* Image Container Card (cloning gray studio card) */}
                    <div className="relative bg-[#f8f8fa] border border-stone-100/80 rounded-2xl h-80 overflow-hidden flex flex-col items-center justify-center p-6 mb-4 select-none hover:shadow-md transition-shadow duration-300">
                      
                      {/* Badge Layers left top */}
                      <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10 items-start">
                        {frag.tag && (
                          <span className={`font-mono text-[9px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-sm leading-none ${
                            frag.tag.includes('%') 
                              ? 'bg-rose-50 text-rose-600 border border-rose-100' 
                              : frag.tag === 'BUNDLE'
                              ? 'bg-amber-50 text-amber-700 border border-amber-100'
                              : 'bg-white text-stone-900 border border-stone-200'
                          }`}>
                            {frag.tag}
                          </span>
                        )}

                        {frag.gender === 'him' && (
                          <span className="bg-white/90 border border-stone-200 text-stone-500 font-mono text-[9px] tracking-wider uppercase px-2 py-0.5 rounded-sm">
                            FOR HIM
                          </span>
                        )}

                        {frag.gender === 'her' && (
                          <span className="bg-rose-50/80 border border-rose-100 text-rose-500 font-mono text-[9px] tracking-wider uppercase px-2 py-0.5 rounded-sm">
                            FOR HER
                          </span>
                        )}
                        
                        {frag.gender === 'unisex' && (
                          <span className="bg-stone-50 border border-stone-200 text-stone-500 font-mono text-[9px] tracking-wider uppercase px-2 py-0.5 rounded-sm">
                            UNISEX
                          </span>
                        )}
                      </div>

                      {/* Sparkle rating right top corner */}
                      <div className="absolute top-4 right-4 bg-white/80 border border-stone-100 rounded-full px-2 py-1 flex items-center space-x-1 text-[10px] text-stone-600 font-mono z-10">
                        <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                        <span>{frag.rating}</span>
                      </div>

                      {/* Liquid gradient blur reflection overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${frag.gradient} opacity-2.5 group-hover:opacity-6 transition-opacity duration-300 pointer-events-none`} />

                      {/* Main Product bottle centered zoom on hover */}
                      <img
                        src={frag.image}
                        alt={frag.name}
                        onClick={() => onFragranceSelect(frag)}
                        className="h-52 object-contain filter drop-shadow-[0_12px_20px_rgba(0,0,0,0.06)] group-hover:scale-105 duration-500 transition-transform cursor-pointer"
                        referrerPolicy="no-referrer"
                      />

                      {/* Micro actions drawer on card hover bottom */}
                      <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-all duration-200 flex space-x-1.5 justify-center z-10">
                        <button
                          onClick={() => onFragranceSelect(frag)}
                          className="bg-white hover:bg-stone-50 text-stone-800 border border-stone-200 hover:border-stone-300 p-2 rounded-full cursor-pointer shadow-xs transition-colors"
                          title="Examine notes details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onAddToCartDirectly(frag)}
                          className="bg-stone-900 hover:bg-stone-800 text-white font-sans text-[9px] uppercase font-bold tracking-widest px-4 py-2 rounded-full cursor-pointer shadow-md flex items-center space-x-1"
                        >
                          <Plus className="w-3 h-3 stroke-[2.5]" />
                          <span>Add</span>
                        </button>
                      </div>

                    </div>

                    {/* Centered Title, Brand and Price */}
                    <div className="text-center mt-2 flex-grow flex flex-col justify-between">
                      <div>
                        <span className="font-mono text-[9px] uppercase tracking-widest text-stone-400 block mb-0.5">{frag.brand}</span>
                        <h3 
                          onClick={() => onFragranceSelect(frag)}
                          className="font-serif text-base text-stone-900 group-hover:text-amber-700 transition-colors cursor-pointer tracking-normal leading-tight font-medium mb-1.5"
                        >
                          {frag.name}
                        </h3>
                      </div>

                      {/* Clear Decant Price Displays */}
                      <div className="flex items-center justify-center space-x-2.5 mt-auto">
                        {isDiscounted ? (
                          <>
                            <span className="text-stone-900 font-serif text-sm font-semibold">
                              €{frag.price.toFixed(2)}
                            </span>
                            <span className="text-stone-400 font-sans line-through text-xs font-light">
                              €{frag.originalPrice?.toFixed(2)}
                            </span>
                          </>
                        ) : (
                          <span className="text-stone-900 font-serif text-sm font-semibold">
                            €{frag.price.toFixed(2)}
                          </span>
                        )}
                      </div>

                    </div>

                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}

      </div>
    </section>
  );
}
