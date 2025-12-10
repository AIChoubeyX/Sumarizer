import { useState } from "react";
import "./App.css";

function App() {
  // ⚠️ ADD YOUR API KEY HERE ⚠️
  // Get your key from: https://platform.openai.com/api-keys
  const API_KEY = "YOUR_OPENAI_API_KEY_HERE"; // 👈 REPLACE THIS WITH YOUR ACTUAL API KEY

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

  async function fetchArticleContent(articleUrl) {
    let cleanUrl = articleUrl.trim();
    if (!/^https?:\/\//i.test(cleanUrl)) {
      cleanUrl = "https://" + cleanUrl;
    }

    const readerUrl = "https://r.jina.ai/" + cleanUrl;
    const res = await fetch(readerUrl);

    if (!res.ok) {
      throw new Error("Failed to fetch article content. Status: " + res.status);
    }

    const text = await res.text(); // Jina returns markdown/plain text
    return text;
  }

  async function summarizeWithOpenAI(articleText, apiKey) {
    const endpoint = "https://api.openai.com/v1/chat/completions";

    const body = {
      model: "gpt-4o-mini", // ⚠️ YOU CAN CHANGE THIS: Use "gpt-4o-mini" (cheap & fast) or "gpt-4o" (more powerful)
      messages: [
        {
          role: "system",
          content:
            "You are an assistant that summarizes news and articles clearly and concisely.",
        },
        {
          role: "user",
          content:
            "Summarize the following article in 5 short bullet points in simple English. " +
            "Focus on the main ideas, not small details.\n\n" +
            articleText,
        },
      ],
      temperature: 0.3,
    };

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + apiKey,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error("OpenAI error: " + errText);
    }

    const data = await res.json();
    const message = data.choices?.[0]?.message?.content ?? "No summary produced.";
    return message.trim();
  }

  const handleSummarize = async () => {
    if (!url.trim()) {
      setError("Please paste an article or news URL first.");
      return;
    }
    if (API_KEY === "YOUR_OPENAI_API_KEY_HERE") {
      setError("Please add your OpenAI API key in the code (App.jsx line 6).");
      return;
    }

    setLoadingState(true, "Fetching article content...");
    setArticleText("");
    setSummary("Summary will appear here...");

    try {
      // 1. Get article text
      const content = await fetchArticleContent(url);
      const limitedContent = content.slice(0, 15000); // safety limit

      setArticleText(limitedContent);

      // 2. Summarize with AI
      setLoadingState(true, "Summarizing with AI...");
      const summaryText = await summarizeWithOpenAI(limitedContent, API_KEY);
      setSummary(summaryText);

      setLoadingState(false, "Done ✅");
    } catch (err) {
      console.error(err);
      setLoading(false);
      setStatus("");
      setError(err.message || "Something went wrong. Check console.");
    }
  };

  return (
    <div className="app">
      <header>
        <div>
          <h1>AI Article Summarizer</h1>
          <p className="subtitle">
            Paste any news / article link and get a short summary in seconds.
          </p>
        </div>
      </header>

      <main>
        <section className="card">
          <div className="field">
            <label htmlFor="url">Article / News URL</label>
            <input
              id="url"
              type="url"
              placeholder="https://example.com/your-article"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>

          <button onClick={handleSummarize} disabled={loading}>
            {loading ? "Summarizing..." : "⚡ Summarize Article"}
          </button>

          <div className="status-row">
            {status && (
              <div className="status">
                {status}
                {loading && (
                  <>
                    <span className="dot" />
                    <span className="dot" />
                    <span className="dot" />
                  </>
                )}
              </div>
            )}
            {error && <div className="error">{error}</div>}
          </div>
        </section>

        <section className="grid">
          <div className="col">
            <div className="card">
              <div className="card-title">Extracted Article Content</div>
              <textarea
                readOnly
                value={articleText}
                placeholder="Article content will appear here..."
              />
            </div>
          </div>
          <div className="col">
            <div className="card">
              <div className="card-title">AI Summary</div>
              <pre className="summary">{summary}</pre>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <span className="tiny">
          💡 Tip: Add your OpenAI API key in App.jsx (line 6). For production apps, use a backend server.
        </span>
      </footer>
    </div>
  );
}

export default App;
