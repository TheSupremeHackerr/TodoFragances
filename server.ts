import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini safely
let ai: GoogleGenAI | null = null;
try {
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  } else {
    console.warn("WARNING: GEMINI_API_KEY is not defined. AI Assistant will fall back to local answers.");
  }
} catch (e) {
  console.error("Failed to initialize GoogleGenAI:", e);
}

// Simple catalog description to inject into system instruction
const BRAND_CATALOG = `
Our luxury brand is Todofragances (todofragances.com flagship).
Available luxury fragrances:
- Louis Vuitton Pacific Chill
  Scent Profile: Crisp, revitalizing, ocean theme, mint, orange, lemon, basil, blackcurrant, dates. Fresh, healthy, bright. Price: $320.
- Tom Ford Lost Cherry
  Scent Profile: Decadent cherry liqueur, bitter almond, griotte syrup, rose, roasted tonka bean, sandalwood. Dark, sweet, seductive, rich. Price: $395.
- Tom Ford Noir Extreme
  Scent Profile: Amber, kulfi accord, warm cardamom, saffron, nutmeg, vanilla bean, sandalwood. Spicy, sophisticated, mysterious, warm. Price: $185.
- Maison Francis Kurkdjian Baccarat Rouge 540
  Scent Profile: Saffron, jasmine, mineral amberwood, ambergris, fresh fir resin, cedar. Shimmering, sugary, crystalline, airy, powerful. Price: $325.
- Creed Aventus
  Scent Profile: Pineapple, birch wood, blackcurrant, ambergris, oakmoss, musk. Rich, masculine, powerful, fruity, smoky. Price: $475.
- Byredo Gypsy Water
  Scent Profile: Pine needles, zesty lemons, warm juniper, sweet amber, vanilla, incense. Delicate wood smoke, outdoor campfire, fresh earth. Price: $200.
- Le Labo Santal 33
  Scent Profile: Pure Australian sandalwood, rich leather, violet accord, spices, cardamom, iris, papyrus. Dry, smoky, woody, wild desert wind. Price: $310.
`;

app.post("/api/scent-ai", async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid messages array requested" });
  }

  // Fallback if API key is not configured or fails initialization
  if (!ai) {
    return res.json({
      reply: "Welcome to Todofragances. I am currently operating in limited offline mode. Based on our catalog, I highly recommend 'Pacific Chill' for a radiant daytime vibe, and 'Lost Cherry' for an unforgettable warm evening. Would you like to view our display gallery?",
      recommendedIds: ["pacific-chill", "lost-cherry"]
    });
  }

  try {
    // Format messages for Gemini
    const systemPrompt = `You are the master scent alchemist and bespoke perfumery sommelier at Todofragances, an ultra-luxury boutique perfume house. Your voice is sophisticated, elegant, highly knowledgeable, and inviting.
    
Your goal is to converse with guests to understand their scent preferences, match their current mood, memory, or desired aura, and recommend signature fragrances from our core catalog.

Our Curated Collection:
${BRAND_CATALOG}

Rules:
1. Speak poetically about the raw materials (saffron, ambrette seed, kulfi, birch wood, juniper).
2. Ask short, evocative questions to deepen the olfactory profile (e.g., "Do you prefer the crisp saltiness of coastal air, or the deep spice of candlelit velvet?").
3. Suggest a maximum of TWO fragrances in any single output.
4. Conclude your response with a JSON-friendly indicator of matching fragrance IDs if relevant. Always return your recommendation list at the bottom of your text like: "[RECOMMENDATIONS: id1, id2]" where they are our list of: 'pacific-chill', 'lost-cherry', 'noir-extreme', 'baccarat-rouge-540', 'aventus', 'gypsy-water', 'santal-33'. For example: "[RECOMMENDATIONS: lost-cherry, noir-extreme]"`;

    // Format chat history
    const contents = messages.map(msg => ({
      role: msg.role === 'ai' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    // Generate content
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.85,
      }
    });

    const fullText = response.text || "I apologize, the bottle broke... let me pour another selection.";

    // Parse the recommendations from [RECOMMENDATIONS: tag1, tag2]
    const recRegex = /\[RECOMMENDATIONS:\s*([^\]]+)\]/i;
    const match = fullText.match(recRegex);
    let recommendedIds: string[] = [];

    if (match && match[1]) {
      recommendedIds = match[1]
        .split(",")
        .map(id => id.trim().toLowerCase())
        .filter(id => ["pacific-chill", "lost-cherry", "noir-extreme", "baccarat-rouge-540", "aventus"].includes(id));
    }

    // Clean text by removing the tag
    const cleanReply = fullText.replace(recRegex, "").trim();

    return res.json({
      reply: cleanReply,
      recommendedIds
    });

  } catch (error: any) {
    console.error("Scent AI Error:", error);
    return res.status(500).json({
      error: error.message || "Something clouded our copper stills. Please ask again.",
      reply: "I apologize, the volatile essential oils are dispersing too quickly. Based on our collection, you might adore Tom Ford's 'Lost Cherry' or Louis Vuitton's 'Pacific Chill'.",
      recommendedIds: ["lost-cherry", "pacific-chill"]
    });
  }
});

// Configure Vite middleware or Express static hosting depending on environment
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Todofragances Server] Running on http://localhost:${PORT}`);
  });
}

setupServer();
