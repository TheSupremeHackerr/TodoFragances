import { Fragrance, Review } from './types';

export const FRAGRANCES: Fragrance[] = [
  // Page 2
  {
    id: 'arabians-tonka',
    name: 'Arabians Tonka',
    brand: 'Montale',
    price: 18.49,
    rating: 4.9,
    reviewsCount: 142,
    intensity: 'Eau de Parfum',
    category: 'Forward',
    description: 'A dark, sugary, and mysterious beast of a fragrance. Marries pure animalic oud with sweet tonka, spun sugar, rose, and a deep leather base.',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800'
    ],
    gradient: 'from-[#BF953F] to-[#111827]',
    scentProfile: { fresh: 20, warm: 95, sweet: 90, mystic: 95 },
    topNotes: ['Bergamot', 'Saffron'],
    heartNotes: ['Bulgarian Rose', 'Nepalese Oud'],
    baseNotes: ['Amber', 'Oakmoss', 'Tonka Bean', 'Brown Sugar'],
    sizes: [2, 5, 10],
    story: 'Arabians Tonka is a tribute to the Arabic horse. It is a powerful, amber-soaked potion of sweet resins and spices, creating a legendary sillage trail that dominates any environment.',
    tag: 'NEW',
    gender: 'him'
  },
  {
    id: 'uomo-born-in-roma-purple',
    name: 'Uomo Born in Roma Purple Melancholia',
    brand: 'Valentino',
    price: 16.95,
    rating: 4.8,
    reviewsCount: 88,
    intensity: 'Eau de Parfum',
    category: 'Warm',
    description: 'An elegant lavender and violet accord anchored by dry vetiver, sweet vanilla, and rich smoked cedar. Classic Roman prestige modernized.',
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=800'
    ],
    gradient: 'from-[#8A2BE2] to-[#121212]',
    scentProfile: { fresh: 40, warm: 80, sweet: 70, mystic: 65 },
    topNotes: ['Violet Leaf', 'Lavender', 'Ginger'],
    heartNotes: ['Sage', 'Peppermint', 'Mineral Salts'],
    baseNotes: ['Guaiac Wood', 'Vetiver', 'Vanilla Extract'],
    sizes: [2, 5, 10],
    story: 'A tribute to the edgy architecture of Rome, combining sharp modern violet minerals with warm, seductive leather and classic patchouli wraps.',
    tag: 'NEW',
    gender: 'him'
  },
  {
    id: 'stronger-with-you-freeze',
    name: 'Stronger With You Freeze',
    brand: 'Emporio Armani',
    price: 15.95,
    originalPrice: 17.95,
    rating: 4.7,
    reviewsCount: 104,
    intensity: 'Eau de Toilette',
    category: 'Fresh',
    description: 'An ultra-crisp, citrusy woody fragrance that freezes moments of intense passion. Combines lime, clean sage, ginger, and frosted lavender.',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800'
    ],
    gradient: 'from-[#60EFFF] to-[#006064]',
    scentProfile: { fresh: 90, warm: 45, sweet: 50, mystic: 35 },
    topNotes: ['Lime', 'Ginger', 'Mandarin Orange', 'Apple'],
    heartNotes: ['Lavender', 'Sage', 'Geranium', 'Cardamom'],
    baseNotes: ['Candied Chestnut', 'Amberwood', 'Guaiac Wood', 'Bourbon Vanilla'],
    sizes: [2, 5, 10],
    story: 'Designed to represent the radiant spark of modern love, captured under a shell of frosted glass. A revitalizing burst of citrus that settles into signature warmth.',
    tag: '-20%',
    gender: 'him'
  },
  {
    id: 'stronger-with-you-absolutely',
    name: 'Stronger With You Absolutely',
    brand: 'Emporio Armani',
    price: 12.95,
    originalPrice: 13.95,
    rating: 4.9,
    reviewsCount: 211,
    intensity: 'Parfum',
    category: 'Warm',
    description: 'An absolute power fragrance infused with rum, bright lavender, rich glazed chestnut, patchouli, and warm Madagascar vanilla.',
    image: 'https://images.unsplash.com/photo-1615655404746-8f550467b906?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1615655404746-8f550467b906?auto=format&fit=crop&q=80&w=800'
    ],
    gradient: 'from-[#BF953F] to-[#2B0B00]',
    scentProfile: { fresh: 15, warm: 95, sweet: 85, mystic: 80 },
    topNotes: ['Rum', 'Elemi Resin', 'Bergamot'],
    heartNotes: ['Lavender', 'Davana'],
    baseNotes: ['Glazed Chestnut', 'Madagascar Vanilla', 'Cedar', 'Patchouli'],
    sizes: [2, 5, 10],
    story: 'An amber fougere masterpiece that has incredible depth. The rum element pairs seductively with premium vanilla absolute and glazed chestnut accords.',
    tag: '-20%',
    gender: 'him'
  },

  // Page 3
  {
    id: 'stronger-with-you-intensely',
    name: 'Stronger With You Intensely',
    brand: 'Emporio Armani',
    price: 13.95,
    originalPrice: 14.95,
    rating: 4.8,
    reviewsCount: 312,
    intensity: 'Eau de Parfum',
    category: 'Warm',
    description: 'An intense amber woody fragrance fueled by sharp pink pepper, warm cinnamon, roasted toffee, vanilla, and sweet suede leather.',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800'
    ],
    gradient: 'from-[#D35400] to-[#2C3E50]',
    scentProfile: { fresh: 20, warm: 90, sweet: 95, mystic: 60 },
    topNotes: ['Pink Pepper', 'Juniper', 'Violet'],
    heartNotes: ['Lavender', 'Cinnamon', 'Sage', 'Toffee'],
    baseNotes: ['Amber', 'Tonka Bean', 'Vanilla', 'Suede'],
    sizes: [2, 5, 10],
    story: 'Expresses an active, warm signature that is sweet and highly complementary. Smells of sweet caramelized dessert and high-society suede.',
    tag: '-20%',
    gender: 'him'
  },
  {
    id: 'le-male-elixir',
    name: 'Le Male Elixir',
    brand: 'Jean Paul Gaultier',
    price: 14.95,
    originalPrice: 15.95,
    rating: 4.9,
    reviewsCount: 450,
    intensity: 'Parfum',
    category: 'Warm',
    description: 'A scorching golden fragrance setting senses ablaze. Glazed brown lavender meets sweet honey, tobacco leaf, vanilla bean, and deep tonka.',
    image: 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&q=80&w=800'
    ],
    gradient: 'from-[#FFD700] to-[#121212]',
    scentProfile: { fresh: 25, warm: 95, sweet: 90, mystic: 75 },
    topNotes: ['Lavender', 'Mint'],
    heartNotes: ['Vanilla', 'Benzoin', 'Honey'],
    baseNotes: ['Tonka Bean', 'Tobacco Leaf', 'Golden Amber'],
    sizes: [2, 5, 10],
    story: 'The most dense, seductive, and popular release in the Le Male collection. A heavy golden blanket of lavender, vanilla and raw honey absolute.',
    tag: '-20%',
    gender: 'him'
  },
  {
    id: 'uomo-born-in-roma-green',
    name: 'Uomo Born in Roma Green Stravaganza',
    brand: 'Valentino',
    price: 15.95,
    originalPrice: 16.95,
    rating: 4.8,
    reviewsCount: 92,
    intensity: 'Eau de Parfum',
    category: 'Fresh',
    description: 'A luxurious fougere citrus fragrance featuring clean Calabrian bergamot, energetic coffee absolute, and dry vetiver wrapping.',
    image: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&q=80&w=800'
    ],
    gradient: 'from-[#00FF87] to-[#121212]',
    scentProfile: { fresh: 85, warm: 60, sweet: 30, mystic: 50 },
    topNotes: ['Calabrian Bergamot', 'Ginger'],
    heartNotes: ['Gourmand Coffee Accord'],
    baseNotes: ['Vetiver', 'Oakwood'],
    sizes: [2, 5, 10],
    story: 'Tells the story of Roman gardens at sunset. The energetic rush of hot espresso meets frozen bergamot and fresh spring air.',
    tag: '-20%',
    gender: 'him'
  },
  {
    id: 'pacific-chill',
    name: 'Pacific Chill',
    brand: 'Louis Vuitton',
    price: 15.95,
    originalPrice: 17.95,
    rating: 4.9,
    reviewsCount: 180,
    intensity: 'Eau de Parfum',
    category: 'Fresh',
    description: 'A crisp, ocean theme blending garden mint, sweet orange, lemon, fresh basil, and sweet blackcurrant over dried dates.',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800'
    ],
    gradient: 'from-[#00C9FF] to-[#92FE9D]',
    scentProfile: { fresh: 95, warm: 20, sweet: 45, mystic: 30 },
    topNotes: ['Mint', 'Orange', 'Lemon', 'Bergamot'],
    heartNotes: ['Basil', 'Rose de Mai', 'Blackcurrant'],
    baseNotes: ['Fig Woods', 'Dates'],
    sizes: [2, 5, 10],
    story: 'Inspired by California\'s radiant morning sunlight and active vitality. Ideal for bright daytime confidence.',
    tag: '-20%',
    gender: 'him'
  },

  // Page 4: Louis Vuitton Lineup
  {
    id: 'ombre-nomade',
    name: 'Ombre Nomade',
    brand: 'Louis Vuitton',
    price: 15.95,
    originalPrice: 17.95,
    rating: 4.9,
    reviewsCount: 305,
    intensity: 'Eau de Parfum',
    category: 'Woody',
    description: 'An elite, dark, and smoky masterpiece combining pure agarwood (oud), incense, raspberry, saffron, and amberwood.',
    image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=800'
    ],
    gradient: 'from-[#3A220d] to-[#0A0A0A]',
    scentProfile: { fresh: 10, warm: 95, sweet: 40, mystic: 98 },
    topNotes: ['Raspberry', 'Saffron'],
    heartNotes: ['Rose', 'Incense', 'Amberwood'],
    baseNotes: ['Pure Oud Wood', 'Benzoin', 'Birch'],
    sizes: [2, 5, 10],
    story: 'Designed to capture the endless desert dunes at night. Smoky incense and elite oil extract of oud meet juicy, sweet raspberries.',
    tag: '-20%',
    gender: 'him'
  },
  {
    id: 'meteore',
    name: 'Météore',
    brand: 'Louis Vuitton',
    price: 17.95,
    rating: 4.8,
    reviewsCount: 114,
    intensity: 'Eau de Parfum',
    category: 'Fresh',
    description: 'A magnetic, sparkling sky composition of three peppers, Sicilian bergamot, Tunisian neroli, and Java vetiver.',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800'
    ],
    gradient: 'from-[#E0F7FA] to-[#80DEEA]',
    scentProfile: { fresh: 92, warm: 40, sweet: 15, mystic: 45 },
    topNotes: ['Sicilian Bergamot', 'Mandarin Orange'],
    heartNotes: ['Pink Pepper', 'Sichuan Pepper', 'Neroli'],
    baseNotes: ['Java Vetiver', 'Ambergris'],
    sizes: [2, 5, 10],
    story: 'Evoking the fiery, celestial path of a shooting star. Bright, high-prestige citrus layered over complex, warm spices.',
    gender: 'him'
  },
  {
    id: 'immensite',
    name: 'L\'Immensité',
    brand: 'Louis Vuitton',
    price: 17.95,
    rating: 4.9,
    reviewsCount: 165,
    intensity: 'Eau de Parfum',
    category: 'Fresh',
    description: 'An endless ginger-fueled horizon. Fresh grapefruit, dynamic ginger, amber, rosemary, and sage create deep sophistication.',
    image: 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&q=80&w=800'
    ],
    gradient: 'from-[#FFDE7D] to-[#FF9000]',
    scentProfile: { fresh: 88, warm: 65, sweet: 20, mystic: 50 },
    topNotes: ['Grapefruit', 'Ginger', 'Bergamot'],
    heartNotes: ['Rosemary', 'Sage', 'Geranium'],
    baseNotes: ['Ambrosia', 'Labdanum', 'Amber'],
    sizes: [2, 5, 10],
    story: 'Expresses an infinite journey without borders. The fresh fire of ginger absolute wraps with high-prestige sea mineral notes.',
    gender: 'him'
  },
  {
    id: 'city-of-stars',
    name: 'City of Stars',
    brand: 'Louis Vuitton',
    price: 17.95,
    rating: 4.8,
    reviewsCount: 95,
    intensity: 'Eau de Parfum',
    category: 'Fresh',
    description: 'An evening celebration of Los Angeles lights. Citrus absolute (lime, tiare, blood orange) pairs with warm, powdery musk.',
    image: 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&q=80&w=800'
    ],
    gradient: 'from-[#FF007F] to-[#7F00FF]',
    scentProfile: { fresh: 80, warm: 55, sweet: 70, mystic: 50 },
    topNotes: ['Lime', 'Blood Orange', 'Clementine'],
    heartNotes: ['Tiare Flower', 'Eucalyptus'],
    baseNotes: ['Sandalwood', 'Powdery Musk'],
    sizes: [2, 5, 10],
    story: 'A gorgeous layout embodying a summer night in dry starry skies. Playful fruit meets high-society floral warmth.',
    gender: 'him'
  },
  {
    id: 'imagination',
    name: 'Imagination',
    brand: 'Louis Vuitton',
    price: 17.95,
    rating: 4.9,
    reviewsCount: 280,
    intensity: 'Eau de Parfum',
    category: 'Fresh',
    description: 'The absolute pinnacle of luxury fresh soap. Black tea, citrus, ginger, and amberwood deliver legendary longevity.',
    image: 'https://images.unsplash.com/photo-1563170351-be82bc888bb4?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1563170351-be82bc888bb4?auto=format&fit=crop&q=80&w=800'
    ],
    gradient: 'from-[#A1FFCE] to-[#FAFFD1]',
    scentProfile: { fresh: 96, warm: 50, sweet: 20, mystic: 55 },
    topNotes: ['Calabrian Bergamot', 'Citron', 'Sicilian Orange'],
    heartNotes: ['Ceylon Black Tea', 'Nigerian Ginger', 'Neroli'],
    baseNotes: ['Ambrosia', 'Guaiac Wood', 'Cinnamon'],
    sizes: [2, 5, 10],
    story: 'Imagination matches the spark of creativity. Beautifully clean, with a rich infusion of black tea and elegant citrus layers.',
    gender: 'him'
  },
  {
    id: 'california-dream',
    name: 'California Dream',
    brand: 'Louis Vuitton',
    price: 17.95,
    rating: 4.8,
    reviewsCount: 130,
    intensity: 'Eau de Parfum',
    category: 'Fresh',
    description: 'A poetic sunset sky. Warm mandarin orange combined with ambrette seed, soft pear, and wet musk.',
    image: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=800'
    ],
    gradient: 'from-[#FFB347] to-[#F1C40F]',
    scentProfile: { fresh: 86, warm: 45, sweet: 60, mystic: 40 },
    topNotes: ['Mandarin Orange', 'Pear'],
    heartNotes: ['Ambrette Seed', 'White Florals'],
    baseNotes: ['Benzoin', 'Musk'],
    sizes: [2, 5, 10],
    story: 'Sunset in a bottle. As the bright orange daylight gives way to cozy vanilla and pear skin warmth on a quiet beach.',
    gender: 'him'
  },
  {
    id: 'on-the-beach',
    name: 'On The Beach',
    brand: 'Louis Vuitton',
    price: 17.95,
    rating: 4.7,
    reviewsCount: 89,
    intensity: 'Eau de Parfum',
    category: 'Fresh',
    description: 'Sunkissed sand, Japanese yuzu, wild rosemary, neroli, and a touch of warm sand gravel.',
    image: 'https://images.unsplash.com/photo-1588405748373-122b2321bc31?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1588405748373-122b2321bc31?auto=format&fit=crop&q=80&w=800'
    ],
    gradient: 'from-[#FF4E50] to-[#F9D423]',
    scentProfile: { fresh: 90, warm: 40, sweet: 20, mystic: 40 },
    topNotes: ['Yuzu', 'Neroli'],
    heartNotes: ['Rosemary', 'Sand Accord', 'Pink Pepper'],
    baseNotes: ['Cypress', 'Woody Notes'],
    sizes: [2, 5, 10],
    story: 'Capture the sheer serenity of laying in hot sand. Rare Japanese yuzu offers citrus crispness overlaid with earthy herbs.',
    gender: 'him'
  },
  {
    id: 'afternoon-swim',
    name: 'Afternoon Swim',
    brand: 'Louis Vuitton',
    price: 17.95,
    rating: 4.9,
    reviewsCount: 220,
    intensity: 'Eau de Parfum',
    category: 'Fresh',
    description: 'An absolute blast of juicy citrus energy. Pure Sicilian orange, bergamot, and ripe mandarin with zero boundaries.',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800'
    ],
    gradient: 'from-[#0052D4] to-[#4364F7]',
    scentProfile: { fresh: 99, warm: 15, sweet: 40, mystic: 20 },
    topNotes: ['Sicilian Orange'],
    heartNotes: ['Mandarin Orange', 'Bergamot'],
    baseNotes: ['Ambergris', 'Lime Extract'],
    sizes: [2, 5, 10],
    story: 'Like diving headfirst into an ocean of chilled citrus fruit. Bright, simple, yet unbelievably high-prestige.',
    gender: 'him'
  },

  // Page 5: Dior and Bundles
  {
    id: 'vanilla-diorama',
    name: 'Vanilla Diorama',
    brand: 'Christian Dior',
    price: 18.49,
    rating: 4.8,
    reviewsCount: 132,
    intensity: 'Eau de Parfum',
    category: 'Warm',
    description: 'An edible, high-society vanilla named after Christian Dior\'s favorite dessert. Bourbon vanilla, cocoa, patchouli, orange, and rum.',
    image: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&q=80&w=800'
    ],
    gradient: 'from-[#F39C12] to-[#2C3E50]',
    scentProfile: { fresh: 30, warm: 90, sweet: 85, mystic: 60 },
    topNotes: ['Orange', 'Pink Pepper', 'Lemon'],
    heartNotes: ['Rum', 'Cocoa Pod', 'Cardamom'],
    baseNotes: ['Bourbon Vanilla', 'Sandalwood', 'Patchouli'],
    sizes: [2, 5, 10],
    story: 'Created by François Demachy, this fragrance pays tribute to the legendary "Diorama" cake with elegant vanillas whipped with hot rum and dark cocoa.',
    gender: 'unisex'
  },
  {
    id: 'bundle-bold-elegant',
    name: 'Fragrance Bundle: The Bold & Elegant',
    brand: 'Todofragances Curation',
    price: 39.95,
    rating: 5.0,
    reviewsCount: 45,
    intensity: 'Luxury Decant Set',
    category: 'Warm',
    description: 'The ultimate power lineup collection containing 5ml decants of Jean Paul Gaultier Elixir, Valentino Purple, Stronger With You Intensely, and Arabians Tonka.',
    image: 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&q=80&w=800'
    ],
    gradient: 'from-[#DAA520] to-[#4B0082]',
    scentProfile: { fresh: 30, warm: 95, sweet: 90, mystic: 85 },
    topNotes: ['Assorted Rich Spices', 'Fruits'],
    heartNotes: ['Lavender', 'Vanilla', 'Espresso'],
    baseNotes: ['Incense', 'Amberwood', 'Glazed Syrups'],
    sizes: [5], // 5ml decants bundle
    story: 'Curated by our master perfumers to ensure you have a dominant, warm, and highly-attractive presence for any formal occasion or dynamic night out.',
    tag: 'BUNDLE',
    gender: 'bundle'
  },
  {
    id: 'gris-dior',
    name: 'Gris Dior',
    brand: 'Christian Dior',
    price: 18.49,
    rating: 4.9,
    reviewsCount: 154,
    intensity: 'Eau de Parfum',
    category: 'Floral',
    description: 'An absolute masterpiece of high-society grey. Wet oakmoss, elegant rose, patchouli, clean amber, and classic violet.',
    image: 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&q=80&w=800'
    ],
    gradient: 'from-[#BDC3C7] to-[#2C3E50]',
    scentProfile: { fresh: 50, warm: 55, sweet: 35, mystic: 80 },
    topNotes: ['Bergamot', 'Grapefruit'],
    heartNotes: ['Turkish Rose', 'Jasmine Sambac'],
    baseNotes: ['Oakmoss', 'Patchouli', 'White Musk', 'Cedar'],
    sizes: [2, 5, 10],
    story: 'The olfactory signature of the classic Dior couture grey. A subtle floral chypre that is incredibly clean, timeless, and completely genderless.',
    gender: 'unisex'
  },
  {
    id: 'bois-dargent',
    name: 'Bois d\'Argent',
    brand: 'Christian Dior',
    price: 18.49,
    rating: 4.8,
    reviewsCount: 120,
    intensity: 'Eau de Parfum',
    category: 'Woody',
    description: 'A luxurious fluid linen scent. Saffron, powdery iris, Yemen incense, sweet honey, leather, and vanilla berries.',
    image: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&q=80&w=800'
    ],
    gradient: 'from-[#ECE9E6] to-[#FFFFFF]',
    scentProfile: { fresh: 45, warm: 75, sweet: 40, mystic: 85 },
    topNotes: ['Juniper Berries', 'Cypress', 'Cold Iris'],
    heartNotes: ['Yemen Incense', 'Somalian Myrrh', 'Patchouli'],
    baseNotes: ['Honey', 'Leather', 'Vanilla', 'Woody Accords'],
    sizes: [2, 5, 10],
    story: 'A signature of contemporary elegance. Like wearing a tailored white cashmere sweater; light, clean, powdery, yet highly complex.',
    gender: 'unisex'
  },

  // Page 10 & 11: Tom Ford Icons
  {
    id: 'tobacco-vanille',
    name: 'Tobacco Vanille',
    brand: 'Tom Ford',
    price: 14.95,
    rating: 4.9,
    reviewsCount: 395,
    intensity: 'Eau de Parfum',
    category: 'Warm',
    description: 'A gorgeous, warm, and highly dense English gentlemen\'s club atmosphere. Sweet tobacco leaf, creamy tonka bean, vanilla, and cocoa.',
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=800'
    ],
    gradient: 'from-[#2B1B17] to-[#121212]',
    scentProfile: { fresh: 10, warm: 98, sweet: 80, mystic: 75 },
    topNotes: ['Tobacco Leaf', 'Spiced Accords'],
    heartNotes: ['Vanilla Bean', 'Cocoa', 'Tonka Bean', 'Tobacco Blossom'],
    baseNotes: ['Dried Fruits', 'Woody Sap'],
    sizes: [2, 5, 10],
    story: 'Opulent, warm, and iconic. Tobacco Vanille douses rich sweet tobacco leaf in comforting sweet vanilla and spicy wood sap for elite authority.',
    gender: 'him'
  },
  {
    id: 'lost-cherry',
    name: 'Lost Cherry',
    brand: 'Tom Ford',
    price: 14.95,
    rating: 4.8,
    reviewsCount: 218,
    intensity: 'Eau de Parfum',
    category: 'Warm',
    description: 'Decadent cherry liqueur, warm bitter almond, griotte cherry syrup, Turkish rose, vanilla bean, and toasted tonka bean.',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800'
    ],
    gradient: 'from-[#800808] to-[#1A0101]',
    scentProfile: { fresh: 15, warm: 85, sweet: 90, mystic: 70 },
    topNotes: ['Black Cherry', 'Cherry Liqueur', 'Bitter Almond'],
    heartNotes: ['Griotte Syrup', 'Turkish Rose', 'Jasmine Sambac'],
    baseNotes: ['Toasted Tonka', 'Sandalwood', 'Clove', 'Madagascar Vanilla'],
    sizes: [2, 5, 10],
    story: 'Lost Cherry takes you on a forbidden journey. Sweet and delicious cherry meets testing, raw almond and luxurious liqueur warmth.',
    gender: 'her'
  },
  {
    id: 'baccarat-rouge-540',
    name: 'Baccarat Rouge 540',
    brand: 'Maison Francis Kurkdjian',
    price: 17.95,
    rating: 4.9,
    reviewsCount: 512,
    intensity: 'Extrait de Parfum',
    category: 'Forward',
    description: 'Luminous, sugary, and airy sillage. Saffron, amberwood, fir resin, cedar wood, and mineral ambergris alchemical mastery.',
    image: 'https://images.unsplash.com/photo-1615655404746-8f550467b906?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1615655404746-8f550467b906?auto=format&fit=crop&q=80&w=800'
    ],
    gradient: 'from-[#EA2027] to-[#121212]',
    scentProfile: { fresh: 25, warm: 75, sweet: 85, mystic: 95 },
    topNotes: ['Saffron', 'Jasmine'],
    heartNotes: ['Amberwood', 'Ambergris'],
    baseNotes: ['Fir Resin', 'Cedar'],
    sizes: [2, 5, 10],
    story: 'Conceived to mark MFK\'s mastery. Smells of caramelized cotton sugar floating on dry mountain woods; pure luxury presence.',
    gender: 'unisex'
  },

  // Page 14 & 15: Feminine Masterpieces
  {
    id: 'good-girl',
    name: 'Good Girl',
    brand: 'Carolina Herrera',
    price: 15.95,
    originalPrice: 16.95,
    rating: 4.8,
    reviewsCount: 220,
    intensity: 'Eau de Parfum',
    category: 'Floral',
    description: 'An elegant, dual-natured floral gourmand. Fresh jasmine and tuberose meet dark, delicious cocoa and roasted tonka bean.',
    image: 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&q=80&w=800'
    ],
    gradient: 'from-[#0A192F] to-[#1E3A8A]',
    scentProfile: { fresh: 30, warm: 85, sweet: 80, mystic: 70 },
    topNotes: ['Almond', 'Coffee', 'Bergamot'],
    heartNotes: ['Jasmine Sambac', 'Tuberose', 'Orris Root'],
    baseNotes: ['Cocoa Pod', 'Tonka Bean', 'Vanilla', 'Sandalwood'],
    sizes: [2, 5, 10],
    story: 'An empowering female signature that celebrates structural complexity. The bright elements of white flowers reveal darker chocolate secrets.',
    tag: '-20%',
    gender: 'her'
  },
  {
    id: 'good-girl-supreme',
    name: 'Good Girl Supreme',
    brand: 'Carolina Herrera',
    price: 15.95,
    originalPrice: 17.95,
    rating: 4.9,
    reviewsCount: 145,
    intensity: 'Eau de Parfum',
    category: 'Floral',
    description: 'An even more elusive and berry-heavy iteration. Juicy forest berries, Egyptian jasmine, roasted tonka bean, and earthy vetiver.',
    image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=800'
    ],
    gradient: 'from-[#0A0E17] to-[#BF953F]',
    scentProfile: { fresh: 25, warm: 90, sweet: 85, mystic: 75 },
    topNotes: ['Forest Berries', 'Egyptian Jasmine'],
    heartNotes: ['Tuberose', 'Tonka Bean'],
    baseNotes: ['Vetiver Tree'],
    sizes: [2, 5, 10],
    story: 'Bold, seductive, and completely uncompromised. Sourcing forest berries to re-frame the classic white floral warmth.',
    tag: '-20%',
    gender: 'her'
  },
  {
    id: 'black-opium',
    name: 'Black Opium',
    brand: 'Yves Saint Laurent',
    price: 14.95,
    rating: 4.9,
    reviewsCount: 420,
    intensity: 'Eau de Parfum',
    category: 'Warm',
    description: 'An addictive coffee-floral gourmand. Intense black coffee accord meets white orange blossoms, vanilla pulp, and dry patchouli.',
    image: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&q=80&w=800'
    ],
    gradient: 'from-[#1E120C] to-[#121212]',
    scentProfile: { fresh: 20, warm: 95, sweet: 80, mystic: 65 },
    topNotes: ['Pear', 'Pink Pepper', 'Orange Blossom'],
    heartNotes: ['Gourmand Espresso Accord', 'Jasmine', 'Bitter Almond'],
    baseNotes: ['Madagascar Vanilla', 'Patchouli', 'Cedarwood'],
    sizes: [2, 5, 10],
    story: 'A dynamic dose of dark adrenaline fused with feminine floral elements. Created for the bold, active, and mysterious.',
    gender: 'her'
  },
  {
    id: 'miss-dior-parfum',
    name: 'Miss Dior Parfum',
    brand: 'Christian Dior',
    price: 14.95,
    rating: 4.8,
    reviewsCount: 198,
    intensity: 'Parfum',
    category: 'Floral',
    description: 'A luxurious pink ribbon bow. Warm wild strawberries, sweet jasmine blossoms, patchouli leaves, and comforting white woods.',
    image: 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&q=80&w=800'
    ],
    gradient: 'from-[#FFA7C4] to-[#FFF0F5]',
    scentProfile: { fresh: 40, warm: 60, sweet: 82, mystic: 45 },
    topNotes: ['Wild Strawberries', 'Mandarin Orange'],
    heartNotes: ['Grasse Jasmine', 'Damask Rose'],
    baseNotes: ['Patchouli Leaf', 'Sandalwood', 'Musk'],
    sizes: [2, 5, 10],
    story: 'A classic Dior statement. This rich floral compound combines premium jasmine extracts with sparkling wild forest strawberries.',
    gender: 'her'
  }
];

export const REVIEWS: Record<string, Review[]> = {
  'arabians-tonka': [
    {
      id: 'r1',
      author: 'Nico C.',
      rating: 5,
      date: 'May 10, 2026',
      content: 'Absolutely incredible. Strongest sillage in my collection. Smells of dark brown sugar and luxurious oud.',
      verified: true
    }
  ],
  'le-male-elixir': [
    {
      id: 'r2',
      author: 'Julio R.',
      rating: 5,
      date: 'June 18, 2026',
      content: 'Creamy honey coupled with tobacco leaves and vanilla. Perfection. Absolute compliment puller.',
      verified: true
    }
  ],
  'imagination': [
    {
      id: 'r3',
      author: 'Stefan M.',
      rating: 5,
      date: 'June 01, 2026',
      content: 'The most clean, soapy, premium scent on earth. The black tea note is mesmerizing and lasts all day.',
      verified: true
    }
  ]
};
