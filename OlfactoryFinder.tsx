import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Compass, Sun, Moon, Flame, Wind, Check, ArrowRight, ArrowLeft, ShieldCheck, Award } from 'lucide-react';
import { useState } from 'react';
import { Fragrance } from '../types';
import { FRAGRANCES } from '../data';

interface OlfactoryFinderProps {
  onClose: () => void;
  onFragranceSelect: (fragrance: Fragrance) => void;
}

interface QuestionOption {
  id: string;
  title: string;
  description: string;
  icon: any;
  categoryWeight: 'Fresh' | 'Warm' | 'Woody' | 'Forward';
}

export default function OlfactoryFinder({ onClose, onFragranceSelect }: OlfactoryFinderProps) {
  const [step, setStep] = useState(1);
  const [selectedVibe, setSelectedVibe] = useState<string | null>(null);
  const [selectedIntensity, setSelectedIntensity] = useState<string | null>(null);
  const [selectedIntention, setSelectedIntention] = useState<string | null>(null);

  const [compounding, setCompounding] = useState(false);
  const [compoundingStep, setCompoundingStep] = useState(0);
  const [finalRecommendation, setFinalRecommendation] = useState<Fragrance | null>(null);

  const vibes: QuestionOption[] = [
    {
      id: 'v-fresh',
      title: 'Coastal Sunrise & Ocean Breeze',
      description: 'Revitalizing morning mist, sea minerals, crushed garden mint, and bright lemons.',
      icon: Wind,
      categoryWeight: 'Fresh'
    },
    {
      id: 'v-warm',
      title: 'Nocturne Vetiver & Black Velvet Cherry',
      description: 'Decadent sweet cherry liqueur, rich almond cream, and warm amber smoke.',
      icon: Moon,
      categoryWeight: 'Warm'
    },
    {
      id: 'v-woody',
      title: 'Desert Campfire & Spiced Woods',
      description: 'Australian sandalwood, raw leather, pine needles, iris, and a drift of dry smoke.',
      icon: Flame,
      categoryWeight: 'Woody'
    },
    {
      id: 'v-forward',
      title: 'Opulent Crimson & Gold Saffron',
      description: 'Luminous sugar, fir minerals, saffron, and high-society crystalline sillage.',
      icon: Sun,
      categoryWeight: 'Forward'
    }
  ];

  const intensities = [
    { id: 'subtle', title: 'Subtle Signature', description: 'Keeps an intimate aura close to the skin. Perfect for close encounters.' },
    { id: 'bold', title: 'Intense Sillage', description: 'Leaves a heavy, gorgeous trail behind. Commands any room you enter.' }
  ];

  const intentions = [
    { id: 'daily', title: 'Everyday Luxury Curation', description: 'A seamless, crisp signature compound designed for daily elegance.' },
    { id: 'evening', title: 'Sovereign Evening Reserve', description: 'Exotic, complex notes formulated for low-light mystery.' }
  ];

  const compoundingMessages = [
    "Analyzing your sensory profile vectors...",
    "Rebalancing pure absolute oil weights...",
    "Verifying olfactory projection congruence...",
    "Formulation complete. Decoding sillage..."
  ];

  const handleNext = () => {
    if (step < 3) {
      setStep(prev => prev + 1);
    } else {
      triggerEvaluation();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    }
  };

  const triggerEvaluation = () => {
    setCompounding(true);
    setCompoundingStep(0);

    // Dynamic state stepping for high-prestige feel
    const i1 = setTimeout(() => setCompoundingStep(1), 700);
    const i2 = setTimeout(() => setCompoundingStep(2), 1400);
    const i3 = setTimeout(() => setCompoundingStep(3), 2100);
    const i4 = setTimeout(() => {
      // Find recommendation based on user selections
      let matchedCategory: 'Fresh' | 'Warm' | 'Woody' | 'Forward' = 'Fresh';
      const vibeOpt = vibes.find(v => v.id === selectedVibe);
      if (vibeOpt) {
        matchedCategory = vibeOpt.categoryWeight;
      }

      // Priority calculation: filter catalog
      let pool = FRAGRANCES.filter(f => f.category === matchedCategory);
      if (pool.length === 0) {
        pool = FRAGRANCES;
      }

      // Further narrow by intensity or intention if helpful, otherwise pick best
      let pick = pool[0];
      if (selectedIntensity === 'bold') {
        // Prefer Extrait or highly rated / high price
        const highPerf = pool.find(f => f.intensity.includes('Extrait') || f.price > 300);
        if (highPerf) pick = highPerf;
      }

      setFinalRecommendation(pick);
      setCompounding(false);
      setStep(4); // Advance to results
    }, 2800);
  };

  const handleReset = () => {
    setSelectedVibe(null);
    setSelectedIntensity(null);
    setSelectedIntention(null);
    setFinalRecommendation(null);
    setStep(1);
  };

  return (
    <div className="fixed inset-0 z-55 flex items-center justify-center p-4 bg-stone-950/90 backdrop-blur-xl">
      <motion.div
        initial={{ scale: 0.96, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.96, opacity: 0, y: 15 }}
        transition={{ type: 'spring', damping: 25, stiffness: 260 }}
        className="relative bg-stone-900 border border-stone-800 rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl min-h-[580px] flex flex-col justify-between"
      >
        {/* Top bar */}
        <div className="p-6 border-b border-stone-800/60 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <Compass className="w-5 h-5 text-amber-500 animate-pulse" />
            <div>
              <span className="font-mono text-[9px] text-amber-500 uppercase tracking-[0.3em] block">Scent Sommelier</span>
              <h3 className="font-serif text-base text-white font-semibold">Olfactory Palette Atelier</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-white hover:bg-white/5 p-2 rounded-full transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="flex-1 p-8 md:p-10 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {compounding ? (
              /* High quality blending state overlay */
              <motion.div
                key="loading-compounding"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col justify-center items-center text-center py-12"
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 border border-dashed border-amber-500/30 rounded-full animate-[spin_6s_linear_infinite]" />
                  <div className="absolute inset-0 w-20 h-20 border border-amber-500/50 rounded-full animate-ping opacity-25" />
                  <Sparkles className="w-7 h-7 text-amber-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
                <span className="font-mono text-[9.5px] uppercase text-stone-500 tracking-[0.3em] block mb-2">Compounding Custom Essence</span>
                <div className="h-6 relative overflow-hidden w-full max-w-sm">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={compoundingStep}
                      initial={{ y: 12, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -12, opacity: 0 }}
                      className="font-serif text-base text-amber-200"
                    >
                      {compoundingMessages[compoundingStep]}
                    </motion.p>
                  </AnimatePresence>
                </div>
                <div className="w-56 h-[1.5px] bg-stone-950 rounded-full overflow-hidden mt-8">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2.8, ease: "linear" }}
                    className="h-full bg-amber-500"
                  />
                </div>
              </motion.div>
            ) : step === 1 ? (
              /* Step 1: Mood & Scenery */
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                className="space-y-6"
              >
                <div className="text-center max-w-lg mx-auto mb-4">
                  <span className="font-mono text-[9px] text-stone-500 uppercase tracking-widest block mb-1">Step 01 of 03</span>
                  <h4 className="font-serif text-2xl text-white">Which atmosphere or climate do you wish to project?</h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {vibes.map((v) => {
                    const SelectedIcon = v.icon;
                    const isSel = selectedVibe === v.id;
                    return (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVibe(v.id)}
                        className={`text-left p-5 rounded-2xl border transition-all relative overflow-hidden group ${
                          isSel
                            ? 'bg-stone-950 border-amber-500 shadow-lg'
                            : 'bg-stone-950/40 border-stone-800/80 hover:border-stone-700 hover:bg-stone-950/65'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="p-2.5 bg-stone-900 rounded-xl border border-stone-850">
                            <SelectedIcon className={`w-4 h-4 ${isSel ? 'text-amber-400' : 'text-stone-400'}`} />
                          </div>
                          {isSel && (
                            <span className="bg-amber-500 text-stone-950 p-1 rounded-full text-xs">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </span>
                          )}
                        </div>
                        <h5 className="font-serif text-sm font-medium text-white mt-4 tracking-wide group-hover:text-amber-400 transition-colors">{v.title}</h5>
                        <p className="text-stone-400 font-sans text-xs mt-1 leading-relaxed font-light">{v.description}</p>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            ) : step === 2 ? (
              /* Step 2: Intensity */
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                className="space-y-6"
              >
                <div className="text-center max-w-lg mx-auto mb-6">
                  <span className="font-mono text-[9px] text-stone-500 uppercase tracking-widest block mb-1">Step 02 of 03</span>
                  <h4 className="font-serif text-2xl text-white">How persistent should your sillage trail be?</h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                  {intensities.map((item) => {
                    const isSel = selectedIntensity === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setSelectedIntensity(item.id)}
                        className={`text-left p-6 rounded-2xl border transition-all ${
                          isSel
                            ? 'bg-stone-950 border-amber-500 shadow-lg'
                            : 'bg-stone-950/40 border-stone-800/80 hover:border-stone-700'
                        }`}
                      >
                        <div className="flex justify-between items-center mb-3">
                          <span className="font-mono text-[9px] text-amber-500 tracking-wider uppercase font-semibold">Intensity Weight</span>
                          {isSel && (
                            <span className="bg-amber-500 text-stone-950 p-1 rounded-full text-xs">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </span>
                          )}
                        </div>
                        <h5 className="font-serif text-base text-white font-medium">{item.title}</h5>
                        <p className="text-stone-400 font-sans text-xs mt-1.5 leading-relaxed font-light">{item.description}</p>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            ) : step === 3 ? (
              /* Step 3: Intention */
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                className="space-y-6"
              >
                <div className="text-center max-w-lg mx-auto mb-6">
                  <span className="font-mono text-[9px] text-stone-500 uppercase tracking-widest block mb-1">Step 03 of 03</span>
                  <h4 className="font-serif text-2xl text-white">What is the central context or usage of this scent?</h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                  {intentions.map((item) => {
                    const isSel = selectedIntention === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setSelectedIntention(item.id)}
                        className={`text-left p-6 rounded-2xl border transition-all ${
                          isSel
                            ? 'bg-stone-950 border-amber-500 shadow-lg'
                            : 'bg-stone-950/40 border-stone-800/80 hover:border-stone-700'
                        }`}
                      >
                        <div className="flex justify-between items-center mb-3">
                          <span className="font-mono text-[9px] text-amber-500 tracking-wider uppercase font-semibold">Olfactory Purpose</span>
                          {isSel && (
                            <span className="bg-amber-500 text-stone-950 p-1 rounded-full text-xs">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </span>
                          )}
                        </div>
                        <h5 className="font-serif text-base text-white font-medium">{item.title}</h5>
                        <p className="text-stone-400 font-sans text-xs mt-1.5 leading-relaxed font-light">{item.description}</p>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            ) : (
              /* Step 4: Final Recommendation results shown extremely elegantly */
              finalRecommendation && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center py-4"
                >
                  <div className="md:col-span-5 bg-stone-950/50 rounded-2xl p-6 border border-stone-850 flex flex-col items-center text-center relative overflow-hidden h-72 justify-center group">
                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-tr ${finalRecommendation.gradient} opacity-5 blur-2xl`} />
                    <img 
                      src={finalRecommendation.image} 
                      alt={finalRecommendation.name} 
                      className="h-44 object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)] z-10 duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="md:col-span-7 space-y-5">
                    <div>
                      <span className="font-mono text-[8px] text-stone-500 tracking-widest uppercase block mb-1">Your Perfect Fragrance Congruency Match</span>
                      <span className="font-mono text-xs text-amber-400 uppercase font-bold tracking-widest">{finalRecommendation.brand}</span>
                      <h3 className="font-serif text-3xl text-white font-semibold tracking-tight leading-none mt-1">{finalRecommendation.name}</h3>
                      <span className="inline-block bg-stone-950/50 border border-stone-850 px-3 py-1 text-stone-300 font-mono text-[9px] tracking-wider rounded-full uppercase mt-2.5">
                        {finalRecommendation.intensity}
                      </span>
                    </div>

                    <p className="text-stone-300 font-sans text-xs font-light leading-relaxed">
                      Based on your atmospheric request for <span className="text-stone-200 underline font-medium">{vibes.find(v => v.id === selectedVibe)?.title}</span>, we formulated this exact match. It beautifully pairs zesty top elements like <span className="text-stone-200 font-medium">{finalRecommendation.topNotes[0]}</span> with elegant, deep base anchors like <span className="text-stone-200 font-medium">{finalRecommendation.baseNotes[0]}</span>.
                    </p>

                    <div className="p-4 bg-stone-950/40 rounded-xl border border-stone-900 flex items-center justify-between font-sans text-xs">
                      <div>
                        <span className="font-mono text-[8px] text-stone-500 uppercase block tracking-wider leading-none mb-1">Valuation price</span>
                        <span className="font-serif text-base text-white font-medium">${finalRecommendation.price} <span className="text-[10px] font-mono text-stone-600">USD</span></span>
                      </div>
                      
                      <button
                        onClick={() => {
                          onFragranceSelect(finalRecommendation);
                          onClose();
                        }}
                        className="bg-white hover:bg-stone-200 text-stone-950 font-sans text-[10px] uppercase font-bold tracking-widest px-6 py-3.5 rounded-full transition-all flex items-center space-x-2"
                      >
                        <span>Examine Specimen</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center space-x-2 text-stone-500 font-mono text-[8px] uppercase tracking-wider leading-none">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      <span>Complies with high-prestige sensory purity guidelines</span>
                    </div>
                  </div>
                </motion.div>
              )
            )}
          </AnimatePresence>
        </div>

        {/* Wizard Footer Navigations */}
        {!compounding && step !== 4 && (
          <div className="p-6 border-t border-stone-800/60 flex items-center justify-between bg-stone-950/20">
            <button
              onClick={handleBack}
              disabled={step === 1}
              className={`flex items-center space-x-2 font-mono text-[9px] uppercase font-bold tracking-widest ${
                step === 1 ? 'text-stone-600 cursor-not-allowed' : 'text-stone-400 hover:text-white'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>

            {/* Step navigation markers */}
            <div className="flex space-x-2">
              {[1, 2, 3].map((s) => (
                <span
                  key={s}
                  className={`w-3.5 h-[3px] rounded-full transition-all duration-300 ${
                    step === s ? 'bg-amber-400 w-6' : 'bg-stone-800'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={
                (step === 1 && !selectedVibe) ||
                (step === 2 && !selectedIntensity) ||
                (step === 3 && !selectedIntention)
              }
              className={`font-mono text-[9px] uppercase font-bold tracking-widest flex items-center space-x-1.5 px-6 py-3.5 rounded-full ${
                ((step === 1 && selectedVibe) ||
                 (step === 2 && selectedIntensity) ||
                 (step === 5 && selectedIntention) || step === 3)
                  ? 'bg-white text-stone-950 hover:bg-stone-200 cursor-pointer'
                  : 'bg-stone-800 text-stone-500 cursor-not-allowed'
              }`}
            >
              <span>{step === 3 ? 'Reveal Match' : 'Next Step'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Success step reset footer */}
        {step === 4 && (
          <div className="p-6 border-t border-stone-800/60 flex justify-center bg-stone-950/20">
            <button
              onClick={handleReset}
              className="text-stone-400 hover:text-white font-mono text-[9px] uppercase font-bold tracking-widest hover:underline"
            >
              Reconfigure Olfactory Palette
            </button>
          </div>
        )}

      </motion.div>
    </div>
  );
}
