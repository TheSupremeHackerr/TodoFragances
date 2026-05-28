export interface ScentProfile {
  fresh: number;
  warm: number;
  sweet: number;
  mystic: number;
}

export interface Fragrance {
  id: string;
  name: string;
  brand: string;
  price: number;
  rating: number;
  reviewsCount: number;
  description: string;
  image: string;
  images: string[]; // Product gallery images for interactive zooming
  gradient: string;
  scentProfile: ScentProfile;
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
  sizes: number[]; // e.g. [50, 100] ml
  intensity: string; // e.g., "Eau de Parfum", "Extrait de Parfum"
  category: 'Fresh' | 'Warm' | 'Floral' | 'Woody' | 'Forward';
  story: string;
  tag?: string; // e.g., "NEW", "-20%", "BUNDLE", "BESTSELLER"
  originalPrice?: number; // for showing discount
  gender?: 'him' | 'her' | 'unisex' | 'bundle'; // for filtering and labels
}

export interface CartItem {
  fragrance: Fragrance;
  selectedSize: number;
  quantity: number;
  engravedText?: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  content: string;
  verified: boolean;
}

export interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
  recommendedFragrances?: string[]; // IDs of fragrances suggested by AI
}
