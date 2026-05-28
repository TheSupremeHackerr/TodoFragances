import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Send, BrainCircuit, UserCheck, Inbox } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Message, Fragrance } from '../types';
import { FRAGRANCES } from '../data';

interface ScentAIProps {
  isOpen: boolean;
  onClose: () => void;
  onFragranceSelect: (fragrance: Fragrance) => void;
}

export default function ScentAI({ isOpen, onClose, onFragranceSelect }: ScentAIProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: "Greetings. I am the Todofragances Scent Alchemist. Olfactory perception is a highly personalized architecture. Tell me, what energy, memory, or atmosphere do you wish to project on your skin today?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isCompounding, setIsCompounding] = useState(false);

  const endOfChatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfChatRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isCompounding]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMsg: Message = {
      id: Math.random().toString(),
      sender: 'user',
      text: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsCompounding(true);

    try {
      // Prepare chat history payload for back-end proxy API
      const historyPay = messages.concat(userMsg).map(m => ({
        role: m.sender === 'ai' ? 'ai' : 'user',
        content: m.text
      }));

      const res = await fetch('/api/scent-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: historyPay })
      });

      const data = await res.json();

      setIsCompounding(false);

      if (data.error) throw new Error(data.error);

      const aiMsg: Message = {
        id: Math.random().toString(),
        sender: 'ai',
        text: data.reply,
        timestamp: new Date(),
        recommendedFragrances: data.recommendedIds || []
      };

      setMessages(prev => [...prev, aiMsg]);

    } catch (error: any) {
      console.error("Failed to query Scent AI:", error);
      setIsCompounding(false);

      const errorMsg: Message = {
        id: 'error-node',
        sender: 'ai',
        text: "My apologies, the volatile extraction stills are experiencing high pressure. Let me recommend Louis Vuitton's 'Pacific Chill' for a radiant crisp day, or 'Lost Cherry' for amber-sweet mystique. Which aura fits your vibe?",
        timestamp: new Date(),
        recommendedFragrances: ['pacific-chill', 'lost-cherry']
      };

      setMessages(prev => [...prev, errorMsg]);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop screen filter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-stone-950 z-50 backdrop-blur-sm"
          />

          {/* Chat Side Overlay Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 220 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-stone-900 border-l border-stone-800 shadow-2xl z-50 flex flex-col justify-between"
          >
            {/* Header detail */}
            <div className="p-6 border-b border-stone-850 flex items-center justify-between bg-stone-900 z-10">
              <div className="flex items-center space-x-2.5">
                <Sparkles className="w-5 h-5 text-amber-500 animate-pulse" />
                <div>
                  <h3 className="font-serif text-base text-white font-medium leading-none">Olfactory Alchemist</h3>
                  <span className="font-mono text-[8px] text-amber-500 uppercase tracking-widest block mt-1">Sovereign Gemini Consult</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="text-stone-400 hover:text-white hover:bg-white/5 p-2 rounded-full transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Conversation Core panel */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-stone-950/20">
              {messages.map((msg) => {
                const isUser = msg.sender === 'user';
                return (
                  <div key={msg.id} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-2`}>
                    
                    {/* Message Bubble Container */}
                    <div className={`p-4 rounded-2xl max-w-[85%] border font-sans text-xs ${
                      isUser
                        ? 'bg-white text-stone-950 border-white rounded-br-none shadow-md font-medium'
                        : 'bg-stone-900 text-stone-300 border-stone-850 rounded-bl-none shadow'
                    }`}>
                      <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    </div>

                    {/* Meta timestamp indicators */}
                    <span className="font-mono text-[8px] text-stone-600 px-1 leading-none">
                      {isUser ? 'GUEST MATCH' : 'ALCHEMIST OUT'} • {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>

                    {/* Recommended products links */}
                    {!isUser && msg.recommendedFragrances && msg.recommendedFragrances.length > 0 && (
                      <div className="flex flex-col gap-2.5 mt-2.5 w-full max-w-[85%] self-start animate-fade-in pl-1">
                        <span className="font-mono text-[8.5px] text-stone-500 tracking-wider font-semibold uppercase block leading-none">Olfactive Reconstructed Specimen:</span>
                        
                        {msg.recommendedFragrances.map((id) => {
                          const frag = FRAGRANCES.find(f => f.id === id);
                          if (!frag) return null;
                          return (
                            <div 
                              key={id}
                              onClick={() => {
                                onFragranceSelect(frag);
                                onClose();
                              }}
                              className="bg-stone-900 hover:bg-stone-850 border border-stone-850 rounded-xl p-3 flex gap-3.5 items-center cursor-pointer transition-all hover:border-amber-500/45 group"
                            >
                              <div className="w-10 h-10 bg-stone-950 rounded border border-stone-900 overflow-hidden shrink-0 flex items-center justify-center">
                                <img src={frag.image} alt="" className="h-8 object-contain" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-serif text-[11px] text-white leading-tight group-hover:text-amber-400 transition-colors uppercase tracking-wide truncate">{frag.name}</h4>
                                <span className="text-[9px] font-mono text-stone-500 block uppercase tracking-wider leading-none mt-0.5">{frag.intensity}</span>
                              </div>
                              <Inbox className="w-3.5 h-3.5 text-stone-500 group-hover:text-amber-500 transition-colors shrink-0" />
                            </div>
                          );
                        })}
                      </div>
                    )}

                  </div>
                );
              })}

              {/* Compounding essence Loader */}
              {isCompounding && (
                <div className="flex flex-col items-start space-y-2">
                  <div className="bg-stone-900 border border-stone-850 p-4 rounded-xl rounded-bl-none flex items-center space-x-3 text-stone-400 font-sans text-xs">
                    <BrainCircuit className="w-4 h-4 text-amber-500 animate-spin" />
                    <span>AI alchemist is formulating extracts...</span>
                  </div>
                </div>
              )}

              <div ref={endOfChatRef} />
            </div>

            {/* Input Form Bar */}
            <div className="p-4 bg-stone-900 border-t border-stone-800 flex gap-3 items-center">
              <input
                type="text"
                placeholder="Ask e.g. 'I want a scent for a coastal summer day'"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                disabled={isCompounding}
                className="flex-1 bg-stone-950 border border-stone-800/80 rounded-xl py-3 px-4 font-sans text-xs text-white placeholder-stone-600 focus:outline-none focus:border-amber-500 transition-colors disabled:opacity-40"
              />
              <button
                type="button"
                onClick={handleSendMessage}
                disabled={isCompounding || !inputValue.trim()}
                className="bg-white hover:bg-stone-200 text-stone-950 p-3.5 rounded-xl transition-all disabled:opacity-30 disabled:hover:bg-white shadow"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
