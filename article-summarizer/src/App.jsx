import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "./App.css";

function App() {
  // ⚠ ADD YOUR GEMINI API KEY HERE ⚠
  const GEMINI_KEY = ""; // <--- replace this

  const [url, setUrl] = useState("");
  const [articleText, setArticleText] = useState("");
  const [summary, setSummary] = useState("Summary will appear here...");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function setLoadingState(isLoading, message = "") {
    setLoading(isLoading);
    setStatus(message);
    setError("");
  }

  // ------------------- FETCH ARTICLE CONTENT -------------------
  async function fetchArticleContent(articleUrl) {
    let cleanUrl = articleUrl.trim();
    if (!/^https?:\/\//i.test(cleanUrl)) {
      cleanUrl = "https://" + cleanUrl;
    }

    // ⚠️ MULTIPLE PROXY OPTIONS - Try these if one fails:
    // Option 1: Jina Reader (Best for articles)
    const readerUrl = "https://r.jina.ai/" + cleanUrl;
    
    // Option 2: AllOrigins (backup)
    // const proxyUrl = "https://api.allorigins.win/raw?url=" + encodeURIComponent(cleanUrl);
    
    // Option 3: CORS Anywhere (if you set it up)
    // const proxyUrl = "https://cors-anywhere.herokuapp.com/" + cleanUrl;

    const res = await fetch(readerUrl);

    if (!res.ok) {
      throw new Error(
        `Failed to fetch article content. Status: ${res.status}. 
Some news sites block scraping. Try another link.`
      );
    }

    return await res.text();
  }

  // ------------------- SUMMARIZE WITH GEMINI -------------------
  async function summarizeWithGemini(articleText) {
    // ⚠️ LIST AVAILABLE MODELS FIRST
    const listEndpoint = `https://generativelanguage.googleapis.com/v1beta/models?key=${GEMINI_KEY}`;
    const listResponse = await fetch(listEndpoint);
    
    if (!listResponse.ok) {
      throw new Error(`Failed to list models: ${listResponse.status}`);
    }
    
    const models = await listResponse.json();
    console.log("Available models:", models);
    
    // Find first model that supports generateContent
    const availableModel = models.models?.find(m => 
      m.supportedGenerationMethods?.includes("generateContent")
    );
    
    if (!availableModel) {
      throw new Error("No available models found for your API key");
    }
    
    console.log("Using model:", availableModel.name);
    
    // Use the found model
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/${availableModel.name}:generateContent?key=${GEMINI_KEY}`;
    
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: "Summarize the following article in 5 short bullet points in simple English:\n\n" + articleText
          }]
        }]
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Gemini API Error: ${response.status} - ${errorData}`);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  }

  // ------------------- HANDLE BUTTON -------------------
  const handleSummarize = async () => {
    if (!url.trim()) {
      setError("Paste an article URL first.");
      return;
    }
    if (GEMINI_KEY === "YOUR_GEMINI_API_KEY") {
      setError("Add your Gemini API key in the code.");
      return;
    }

    setLoadingState(true, "Fetching article content...");
    setArticleText("");
    setSummary("Summary will appear here...");

    try {
      // 1. Fetch article
      const content = await fetchArticleContent(url);
      const limited = content.slice(0, 15000);

      setArticleText(limited);

      // 2. Summarize with Gemini
      setLoadingState(true, "Summarizing with Gemini...");
      const summaryText = await summarizeWithGemini(limited);

      setSummary(summaryText);
      setLoadingState(false, "Done ✅");
    } catch (err) {
      console.error(err);
      setLoading(false);
      setStatus("");
      setError(err.message);
    }
  };

  return (
    <div className="app">
      <header>
        <h1>AI Article Summarizer</h1>
        <p>Paste any news/article link & get summary instantly (FREE Gemini API).</p>
      </header>

      <main>
        <section className="card">
          <div className="field">
            <label>Article URL</label>
            <input
              type="url"
              placeholder="https://example.com/article"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>

          <button onClick={handleSummarize} disabled={loading}>
            {loading ? "Summarizing..." : "⚡ Summarize Article"}
          </button>

          {status && <div className="status">{status}</div>}
          {error && <div className="error">{error}</div>}
        </section>

        <section className="grid">
          <div className="col">
            <div className="card">
              <h3>Extracted Article</h3>
              <textarea readOnly value={articleText} />
            </div>
          </div>

          <div className="col">
            <div className="card">
              <h3>AI Summary</h3>
              <pre>{summary}</pre>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <span>Using Google Gemini 1.5 Flash (Free Tier)</span>
      </footer>
    </div>
  );
}

export default App;