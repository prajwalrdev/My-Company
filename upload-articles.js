// upload-articles.js
// 1. Download your Firebase service account key from the Firebase Console (Project Settings > Service Accounts > Generate new private key)
// 2. Save it as serviceAccountKey.json in your project root.
// 3. Run: npm install firebase-admin
// 4. Run: node upload-articles.js

const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const articles = [
  {
    title: "AI Intelligencer: What matters in AI this week",
    summary: "Features OpenAI’s new conversational browser and power infrastructure strain from AI growth.",
    url: "https://wordstream.com/ai-intelligencer",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
    tags: ["AI", "News"],
    source: "WordStream, Wikipedia, Reuters"
  },
  {
    title: "The Companies Betting They Can Profit From Google Search's Demise",
    summary: "Profiles startups optimizing content for AI-generated search results.",
    url: "https://wsj.com/google-search-demise",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
    tags: ["Google", "AI"],
    source: "The Wall Street Journal"
  },
  {
    title: "ChatGPT’s Upcoming Ad Play: A Direct Threat to Google's Search Goldmine",
    summary: "How ads in ChatGPT could disrupt Google’s ad revenue.",
    url: "https://investors.com/chatgpt-ad-play",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    tags: ["AI", "ChatGPT"],
    source: "Investors.com, Local Dominator"
  },
  {
    title: "Google’s AI Mode launches in India",
    summary: "Conversation-first search replaces blue links, while keeping safeguards in place.",
    url: "https://nypost.com/google-ai-mode-india",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
    tags: ["Google", "AI Mode"],
    source: "New York Post, AP News, The Times of India"
  },
  {
    title: "Is ChatGPT really the new Google?",
    summary: "Analytics show Google still dominates, despite AI traffic growth.",
    url: "https://washingtonpost.com/chatgpt-vs-google",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
    tags: ["AI", "Google"],
    source: "The Washington Post"
  },
  {
    title: "EU antitrust complaint over Google’s AI Overviews",
    summary: "Publishers allege unfair click diversion and copyright breaches.",
    url: "https://seroundtable.com/eu-antitrust-google-ai",
    image: "https://img.youtube.com/vi/5UlU5h4-84c/maxresdefault.jpg",
    tags: ["Google", "Antitrust"],
    source: "Search Engine Roundtable, Wikipedia, New York Post"
  },
  {
    title: "Google search results feel worse—here’s why",
    summary: "'AI slop' low-quality content is flooding SERPs; tips to filter for quality.",
    url: "https://tomsguide.com/google-serp-quality",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
    tags: ["Google", "SERP"],
    source: "Tom's Guide"
  },
  // ...add the rest of your articles here in the same format
];

async function uploadArticles() {
  const batch = db.batch();
  articles.forEach(article => {
    const docRef = db.collection("articles").doc();
    batch.set(docRef, article);
  });
  await batch.commit();
  console.log("Articles uploaded!");
}

uploadArticles(); 