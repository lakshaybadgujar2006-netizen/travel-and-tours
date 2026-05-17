import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// API Routes
app.post("/api/ai/plan", async (req, res) => {
  try {
    const { destination, budget, duration, preferences } = req.body;
    
    const prompt = `Create a budget-friendly domestic travel itinerary for ${destination}. 
    Budget: ${budget}. 
    Duration: ${duration}. 
    Preferences: ${preferences}.
    Include suggested activities, budget stay options, and local food recommendations.
    Format your response in Markdown.`;

    const result = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    res.json({ plan: result.text });
  } catch (error: any) {
    console.error("AI Plan Error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/ai/recommend", async (req, res) => {
  try {
    const { history, interests, packages, blogPosts } = req.body;
    
    const prompt = `Based on the following user history and interests, recommend the top 3 holiday packages and top 2 blog posts from the provided inventory.
    
    User History (Viewed IDs): ${JSON.stringify(history)}
    User Interests: ${interests}
    
    Available Packages: ${JSON.stringify(packages.map((p: any) => ({ id: p.id, title: p.title, destinations: p.destinations })))}
    Available Blog Posts: ${JSON.stringify(blogPosts.map((b: any) => ({ id: b.id, title: b.title })))}
    
    Return the recommendation in JSON format:
    {
      "recommendedPackageIds": ["id1", "id2", "id3"],
      "recommendedBlogIds": [1, 2],
      "reasoning": "A short sentence explaining why."
    }`;

    const result = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    res.json(JSON.parse(result.text || "{}"));
  } catch (error: any) {
    console.error("AI Recommend Error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/ai/build-itinerary", async (req, res) => {
  try {
    const { destinations, budget, startDate, endDate, activities } = req.body;
    
    const prompt = `Build a detailed day-by-day itinerary for a trip covering these domestic locations: ${destinations.join(", ")}.
    Dates: ${startDate} to ${endDate}.
    Budget: ${budget}.
    Preferred Activities: ${activities}.
    
    For each day, provide:
    1. Activities with estimated time slots.
    2. Estimated costs (Food, Transport, Entry fees).
    3. Travel times between major points.
    
    Format the response as a clear, sleek Markdown guide.`;

    const result = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    res.json({ itinerary: result.text });
  } catch (error: any) {
    console.error("AI Itinerary Builder Error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
