import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { Resend } from "resend";

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

// Initialize Resend
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// API Routes
app.post("/api/bookings/send-email", async (req, res) => {
  try {
    const { name, email, packageName, totalAmount, startDate, endDate } = req.body;
    
    if (!resend) {
       console.warn("RESEND_API_KEY not found. Skipping email notification.");
       return res.json({ success: true, message: "Email service not configured. Recording only." });
    }

    const adminEmail = process.env.ADMIN_EMAIL || "luckybadgujar2006@gmail.com";

    // Email to Admin
    await resend.emails.send({
      from: "Travel & Tours <onboarding@resend.dev>",
      to: adminEmail,
      subject: `New Booking Request: ${packageName}`,
      html: `
        <h1>New Booking Request</h1>
        <p><strong>Customer:</strong> ${name} (${email})</p>
        <p><strong>Package:</strong> ${packageName}</p>
        <p><strong>Amount:</strong> ₹${totalAmount}</p>
        <p><strong>Dates:</strong> ${startDate} to ${endDate}</p>
        <br/>
        <p>Please check the Firebase console for more details.</p>
      `
    });

    // Email to Customer
    await resend.emails.send({
      from: "Travel & Tours <onboarding@resend.dev>",
      to: email,
      subject: `Booking Request Received: ${packageName}`,
      html: `
        <h1>Booking Request Received</h1>
        <p>Hi ${name},</p>
        <p>Thank you for choosing Travel & Tours! We have received your booking request for <strong>${packageName}</strong>.</p>
        <p><strong>Total Amount:</strong> ₹${totalAmount}</p>
        <p><strong>Proposed Dates:</strong> ${startDate} to ${endDate}</p>
        <p>Our team will review your request and get back to you shortly to confirm the details and payment.</p>
        <br/>
        <p>Happy Travels!</p>
        <p>The Travel & Tours Team</p>
      `
    });

    res.json({ success: true });
  } catch (error: any) {
    console.error("Booking Email Error:", error);
    res.status(500).json({ error: error.message });
  }
});

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
