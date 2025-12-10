# AI Article Summarizer

A modern, responsive web application built with React + Vite that uses AI to summarize news articles and blog posts. Simply paste any article URL and get a concise summary in seconds.

## 🚀 Features

- **Frontend-Only Architecture** - No backend required
- **AI-Powered Summarization** - Uses OpenAI GPT models
- **Article Extraction** - Automatically fetches content using Jina Reader API
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Real-time Status Updates** - Loading indicators and error handling
- **Modern UI** - Dark theme with smooth animations

## 🛠️ Tech Stack

- **React 19** - UI Library
- **Vite** - Build tool and dev server
- **JavaScript (ES6+)** - Programming language
- **CSS3** - Styling with responsive design
- **OpenAI API** - AI summarization
- **Jina Reader API** - Article content extraction

## 📦 Installation & Setup

```bash
# Clone the repository
git clone <your-repo-url>

# Navigate to project directory
cd article-summarizer

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## ⚙️ Configuration

1. Open `src/App.jsx`
2. Find line 6 and add your OpenAI API key:
```javascript
const API_KEY = "YOUR_OPENAI_API_KEY_HERE"; // Replace with your actual key
```
3. Get your API key from: https://platform.openai.com/api-keys

## 📚 How It Works

1. User pastes an article URL
2. App fetches article content via Jina Reader API
3. Content is sent to OpenAI API for summarization
4. AI generates a concise bullet-point summary
5. Both original content and summary are displayed

---

# 🎯 Interview Questions & Answers

## 1. React Fundamentals Questions

### Q1: What are React Hooks used in this project?
**Answer:** This project uses `useState` hook for state management:
- `url` - Stores the article URL input
- `articleText` - Stores fetched article content
- `summary` - Stores the AI-generated summary
- `status` - Manages loading status messages
- `error` - Handles error messages
- `loading` - Boolean flag for loading state

### Q2: Why use functional components instead of class components?
**Answer:** 
- Cleaner and more concise syntax
- Hooks provide better state management
- Easier to test and maintain
- Better performance with React 19
- Aligns with modern React best practices

### Q3: Explain the component lifecycle in this app.
**Answer:**
1. **Mount** - Component renders with initial state
2. **Update** - State changes trigger re-renders (e.g., when user types URL or summary loads)
3. **Cleanup** - No cleanup needed as we don't use useEffect with subscriptions

### Q4: What is the Virtual DOM and how does React use it?
**Answer:** Virtual DOM is a lightweight copy of the actual DOM. When state changes (like `summary` or `loading`), React:
1. Creates a new Virtual DOM tree
2. Compares it with the previous one (diffing)
3. Updates only the changed parts in the real DOM
This makes updates efficient and fast.

### Q5: What is JSX and why do we use it?
**Answer:** JSX is a syntax extension that allows writing HTML-like code in JavaScript. Benefits:
- More readable than `React.createElement()`
- Prevents XSS attacks (auto-escapes)
- Enables better tooling and error messages
- Feels natural for UI development

---

## 2. State Management Questions

### Q6: How does state management work in this application?
**Answer:** Uses React's `useState` hook for local component state:
```javascript
const [url, setUrl] = useState("");
```
Each state variable has a setter function. When called, it triggers a re-render with the new value.

### Q7: Why not use Redux or Context API for state management?
**Answer:** 
- **Simple app** - Only one component needs the state
- **No prop drilling** - No nested components requiring data
- **Local state suffices** - No global state needed
- **Better performance** - Avoids unnecessary overhead
- **Easier maintenance** - Less boilerplate code

### Q8: What is controlled component? Give an example from this project.
**Answer:** A controlled component's value is controlled by React state:
```javascript
<input
  value={url}
  onChange={(e) => setUrl(e.target.value)}
/>
```
The input's value always matches the `url` state, making React the single source of truth.

### Q9: How do you prevent unnecessary re-renders?
**Answer:**
- Keep state minimal and localized
- Use conditional rendering (`{status && <div>...}`)
- Avoid inline function definitions where possible
- Could use `useMemo` or `useCallback` for optimization if needed

### Q10: What happens when you call setState?
**Answer:**
1. React schedules a state update
2. Component is marked for re-render
3. React batches multiple setState calls for performance
4. Virtual DOM is updated
5. Changes are reconciled and DOM is updated

---

## 3. API Integration Questions

### Q11: How does this app fetch article content?
**Answer:** Uses the Jina Reader API:
```javascript
const readerUrl = "https://r.jina.ai/" + cleanUrl;
const res = await fetch(readerUrl);
const text = await res.text();
```
Jina Reader extracts clean text/markdown from any URL.

### Q12: Explain the async/await pattern used in API calls.
**Answer:**
```javascript
async function fetchArticleContent(articleUrl) {
  const res = await fetch(readerUrl);
  const text = await res.text();
  return text;
}
```
- `async` - Makes function return a Promise
- `await` - Pauses execution until Promise resolves
- Cleaner than `.then()` chains
- Better error handling with try-catch

### Q13: How do you handle API errors in this project?
**Answer:**
```javascript
try {
  const content = await fetchArticleContent(url);
  // Process content
} catch (err) {
  console.error(err);
  setError(err.message || "Something went wrong");
}
```
Errors are caught, logged, and displayed to the user.

### Q14: Why use fetch instead of axios?
**Answer:**
- **Native to browsers** - No additional dependency
- **Lightweight** - Smaller bundle size
- **Sufficient for simple requests** - Meets all project needs
- **Modern API** - Works well with async/await
- **Standard** - Part of web platform

### Q15: How would you add request caching?
**Answer:**
```javascript
const cache = new Map();

async function fetchWithCache(url) {
  if (cache.has(url)) {
    return cache.get(url);
  }
  const data = await fetch(url);
  cache.set(url, data);
  return data;
}
```

---

## 4. JavaScript/ES6+ Questions

### Q16: What ES6+ features are used in this project?
**Answer:**
- **Arrow functions** - `(e) => setUrl(e.target.value)`
- **Template literals** - `` `Summarizing with AI...` ``
- **Async/await** - For API calls
- **Destructuring** - `const { choices } = data`
- **Optional chaining** - `data.choices?.[0]?.message?.content`
- **Nullish coalescing** - `?? "No summary"`
- **const/let** - Block-scoped variables

### Q17: Explain optional chaining in this context.
**Answer:**
```javascript
const message = data.choices?.[0]?.message?.content ?? "No summary";
```
- Safely accesses nested properties
- Returns `undefined` if any property is null/undefined
- Prevents "Cannot read property of undefined" errors
- Cleaner than multiple && checks

### Q18: What is the difference between == and ===?
**Answer:**
- `==` - Loose equality (type coercion)
- `===` - Strict equality (no type coercion)
This project uses `===` everywhere for type safety:
```javascript
if (API_KEY === "YOUR_OPENAI_API_KEY_HERE")
```

### Q19: Explain array methods you might use for data processing.
**Answer:**
- **map()** - Transform array elements
- **filter()** - Select elements matching criteria
- **reduce()** - Aggregate data
- **slice()** - Extract portion (used: `content.slice(0, 15000)`)
- **find()** - Get first matching element

### Q20: What is the purpose of trim() in URL validation?
**Answer:**
```javascript
if (!url.trim()) {
  setError("Please paste an article URL");
}
```
- Removes whitespace from both ends
- Prevents empty string with just spaces
- Ensures valid input before processing

---

## 5. CSS & Styling Questions

### Q21: How is responsive design implemented?
**Answer:** Using CSS media queries:
```css
@media (max-width: 768px) {
  .app { padding: 16px 12px 32px; }
  .col { flex: 1 1 100%; }
}

@media (max-width: 640px) {
  h1 { font-size: 1.4rem; }
  button { width: 100%; }
}
```
Breakpoints: 768px (tablet), 640px (mobile), 380px (small mobile)

### Q22: Explain the flexbox layout used in the grid.
**Answer:**
```css
.grid {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}

.col {
  flex: 1 1 280px;
}
```
- `flex: 1 1 280px` - Grow, shrink, base size 280px
- `flex-wrap` - Columns wrap on smaller screens
- Creates responsive two-column layout

### Q23: What is the box-sizing property?
**Answer:**
```css
* {
  box-sizing: border-box;
}
```
- Includes padding and border in element's total width/height
- Prevents layout issues with padding
- Makes sizing more predictable

### Q24: How are CSS animations implemented?
**Answer:**
```css
.dot {
  animation: bounce 0.8s infinite alternate;
}

@keyframes bounce {
  from { transform: translateY(0); opacity: 0.3; }
  to { transform: translateY(-3px); opacity: 1; }
}
```
Creates loading indicator with bouncing dots.

### Q25: What is the purpose of CSS custom properties (variables)?
**Answer:** This project doesn't use CSS variables but could improve maintainability:
```css
:root {
  --primary-color: #22c55e;
  --bg-dark: #020617;
}

button {
  background: var(--primary-color);
}
```

---

## 6. Performance Optimization Questions

### Q26: How would you optimize this app's performance?
**Answer:**
1. **Code splitting** - Lazy load components
2. **Memoization** - Use `useMemo` for expensive calculations
3. **Debouncing** - Delay API calls on input
4. **Caching** - Store previous summaries
5. **Bundle optimization** - Tree shaking, minification
6. **Image optimization** - If images are added
7. **Service workers** - For offline support

### Q27: What is lazy loading and how to implement it?
**Answer:**
```javascript
import { lazy, Suspense } from 'react';

const Summary = lazy(() => import('./Summary'));

<Suspense fallback={<div>Loading...</div>}>
  <Summary data={summary} />
</Suspense>
```

### Q28: How does Vite improve performance compared to Create React App?
**Answer:**
- **Faster cold starts** - Uses native ES modules
- **Hot Module Replacement (HMR)** - Instant updates
- **Optimized builds** - Uses Rollup
- **Better tree-shaking** - Smaller bundles
- **No bundling in dev** - Serves files on-demand

### Q29: What is debouncing and where would you use it?
**Answer:**
```javascript
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

const handleInput = debounce((value) => {
  // Process input
}, 500);
```
Use for search inputs to reduce API calls.

### Q30: How can you measure app performance?
**Answer:**
- **React DevTools Profiler** - Component render times
- **Lighthouse** - Overall performance score
- **Chrome DevTools** - Network, memory, CPU
- **Web Vitals** - LCP, FID, CLS metrics
- **Bundle analyzer** - Visualize bundle size

---

## 7. Error Handling & Validation Questions

### Q31: How is error handling implemented?
**Answer:**
```javascript
try {
  const content = await fetchArticleContent(url);
  // Success path
} catch (err) {
  console.error(err);
  setLoading(false);
  setError(err.message || "Something went wrong");
}
```
Errors are caught, logged, and displayed to users.

### Q32: What validation is performed on user input?
**Answer:**
```javascript
// Check for empty URL
if (!url.trim()) {
  setError("Please paste an article or news URL first.");
  return;
}

// Check for API key
if (API_KEY === "YOUR_OPENAI_API_KEY_HERE") {
  setError("Please add your OpenAI API key");
  return;
}

// Add https:// if missing
if (!/^https?:\/\//i.test(cleanUrl)) {
  cleanUrl = "https://" + cleanUrl;
}
```

### Q33: How do you handle network failures?
**Answer:**
```javascript
if (!res.ok) {
  throw new Error("Failed to fetch. Status: " + res.status);
}
```
Checks response status and throws descriptive errors.

### Q34: What is defensive programming? Give examples.
**Answer:**
```javascript
// Safe property access
const message = data.choices?.[0]?.message?.content ?? "No summary";

// Limit content size
const limitedContent = content.slice(0, 15000);

// Fallback values
const text = await res.text() || "";
```

### Q35: How would you add loading timeouts?
**Answer:**
```javascript
const fetchWithTimeout = async (url, timeout = 5000) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Request timeout');
    }
    throw error;
  }
};
```

---

## 8. Security Questions

### Q36: Is it safe to store API keys in frontend code?
**Answer:** **NO** - This is only for development/demo purposes.
**Why it's unsafe:**
- Anyone can view source code
- Key can be extracted and misused
- No rate limiting per user

**Production solution:**
- Use backend proxy server
- Environment variables on server
- Implement authentication
- Rate limiting per user

### Q37: How would you secure this application for production?
**Answer:**
1. **Backend API** - Move API calls to server
2. **Authentication** - User login system
3. **Rate limiting** - Prevent abuse
4. **HTTPS only** - Secure communication
5. **CORS policies** - Restrict origins
6. **Input sanitization** - Prevent XSS
7. **API key rotation** - Regular updates

### Q38: What is XSS and how does React prevent it?
**Answer:**
**XSS (Cross-Site Scripting)** - Injecting malicious scripts into web pages.

**React protection:**
```javascript
// React automatically escapes values
<div>{userInput}</div> // Safe

// Dangerous (don't use):
<div dangerouslySetInnerHTML={{__html: userInput}} />
```

### Q39: What is CORS and how does it affect API calls?
**Answer:**
**CORS (Cross-Origin Resource Sharing)** - Security feature that restricts requests from different origins.

In this app:
- Jina Reader API allows cross-origin requests
- OpenAI API allows CORS from browsers
- Backend would handle this in production

### Q40: How to prevent API key exposure in Git?
**Answer:**
```bash
# .gitignore
.env
.env.local

# .env file
VITE_API_KEY=your_key_here

# Usage in code
const API_KEY = import.meta.env.VITE_API_KEY;
```

---

## 9. Testing Questions

### Q41: How would you test this application?
**Answer:**
1. **Unit tests** - Test individual functions
2. **Component tests** - Test React components
3. **Integration tests** - Test API interactions
4. **E2E tests** - Test full user flows
5. **Manual testing** - Cross-browser testing

### Q42: Write a unit test for URL validation.
**Answer:**
```javascript
import { describe, it, expect } from 'vitest';

describe('URL Validation', () => {
  it('should add https:// to URLs without protocol', () => {
    let url = 'example.com';
    if (!/^https?:\/\//i.test(url)) {
      url = 'https://' + url;
    }
    expect(url).toBe('https://example.com');
  });

  it('should keep URLs with https://', () => {
    const url = 'https://example.com';
    expect(/^https?:\/\//i.test(url)).toBe(true);
  });
});
```

### Q43: How to test async functions?
**Answer:**
```javascript
import { describe, it, expect, vi } from 'vitest';

describe('API calls', () => {
  it('should fetch article content', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        text: () => Promise.resolve('Article content'),
      })
    );

    const result = await fetchArticleContent('https://example.com');
    expect(result).toBe('Article content');
    expect(fetch).toHaveBeenCalledWith('https://r.jina.ai/https://example.com');
  });
});
```

### Q44: What testing libraries would you use?
**Answer:**
- **Vitest** - Fast unit testing framework
- **React Testing Library** - Component testing
- **MSW** - Mock API requests
- **Playwright/Cypress** - E2E testing
- **Jest** - Alternative to Vitest

### Q45: How to test error scenarios?
**Answer:**
```javascript
it('should handle API errors', async () => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok: false,
      status: 500,
    })
  );

  await expect(fetchArticleContent('https://example.com'))
    .rejects
    .toThrow('Failed to fetch');
});
```

---

## 10. Architecture & Design Questions

### Q46: Explain the project structure.
**Answer:**
```
article-summarizer/
├── public/          # Static assets
├── src/
│   ├── App.jsx      # Main component
│   ├── App.css      # Styles
│   └── main.jsx     # Entry point
├── package.json     # Dependencies
├── vite.config.js   # Build configuration
└── index.html       # HTML template
```

### Q47: What design patterns are used?
**Answer:**
- **Component pattern** - Reusable UI building blocks
- **Hooks pattern** - State and side effects
- **Async/await pattern** - Promise handling
- **Error boundary pattern** - Could be added
- **Container/Presentation** - Could separate logic

### Q48: How would you scale this application?
**Answer:**
1. **Component breakdown** - Split into smaller components
2. **State management** - Add Context/Redux for complex state
3. **Backend service** - Secure API proxy
4. **Database** - Store user summaries
5. **Authentication** - User accounts
6. **Caching** - Redis for frequent articles
7. **CDN** - Fast static file delivery
8. **Microservices** - Separate concerns

### Q49: What is separation of concerns?
**Answer:**
Keeping different aspects of code separate:
- **UI logic** - React components
- **Business logic** - Helper functions
- **Styling** - CSS files
- **API calls** - Service functions
- **Configuration** - Separate files

Better structure:
```
src/
├── components/     # UI components
├── services/       # API calls
├── hooks/          # Custom hooks
├── utils/          # Helper functions
└── styles/         # CSS files
```

### Q50: How would you implement features like history/bookmarks?
**Answer:**
```javascript
// Using localStorage
const saveToHistory = (url, summary) => {
  const history = JSON.parse(localStorage.getItem('history') || '[]');
  history.unshift({ url, summary, date: new Date() });
  localStorage.setItem('history', JSON.stringify(history.slice(0, 10)));
};

// Display history
const [history, setHistory] = useState([]);

useEffect(() => {
  const saved = JSON.parse(localStorage.getItem('history') || '[]');
  setHistory(saved);
}, []);
```

---

## 11. Build & Deployment Questions

### Q51: How do you build this project for production?
**Answer:**
```bash
npm run build
```
Creates optimized bundle in `dist/` folder with:
- Minified JavaScript
- Optimized CSS
- Tree-shaken code
- Source maps

### Q52: Where can you deploy this application?
**Answer:**
- **Vercel** - Zero config deployment
- **Netlify** - Continuous deployment
- **GitHub Pages** - Free static hosting
- **AWS S3 + CloudFront** - Scalable hosting
- **Firebase Hosting** - Google's platform
- **Render** - Modern hosting

### Q53: What is the deployment process for Vercel?
**Answer:**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```
Or connect GitHub repo for auto-deployments.

### Q54: How to set environment variables in production?
**Answer:**
**Vercel/Netlify:**
1. Go to project settings
2. Add environment variables
3. Set `VITE_API_KEY=your_key`
4. Redeploy

**Access in code:**
```javascript
const API_KEY = import.meta.env.VITE_API_KEY;
```

### Q55: What is CI/CD and how to implement it?
**Answer:**
**CI/CD** - Continuous Integration/Continuous Deployment

**GitHub Actions example:**
```yaml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm ci
      - run: npm run build
      - run: npm run test
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

---

## 12. Advanced React Questions

### Q56: What is React Fiber?
**Answer:**
React's reconciliation algorithm that:
- Breaks rendering work into chunks
- Prioritizes updates
- Enables concurrent features
- Improves perceived performance
- Allows interruptible rendering

### Q57: How would you add custom hooks to this project?
**Answer:**
```javascript
// useArticleSummary.js
import { useState } from 'react';

export const useArticleSummary = () => {
  const [url, setUrl] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const summarize = async () => {
    setLoading(true);
    try {
      // Logic here
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { url, setUrl, summary, loading, error, summarize };
};

// Usage in App.jsx
const { url, setUrl, summary, loading, error, summarize } = useArticleSummary();
```

### Q58: What is useEffect and when would you use it?
**Answer:**
```javascript
import { useEffect } from 'react';

// Run once on mount
useEffect(() => {
  // Load saved settings
  const saved = localStorage.getItem('apiKey');
  if (saved) setApiKey(saved);
}, []);

// Run when dependency changes
useEffect(() => {
  // Save API key when it changes
  if (apiKey) {
    localStorage.setItem('apiKey', apiKey);
  }
}, [apiKey]);
```

### Q59: What is React.memo and when to use it?
**Answer:**
```javascript
import { memo } from 'react';

const SummaryDisplay = memo(({ summary }) => {
  return <pre className="summary">{summary}</pre>;
});

// Only re-renders if summary changes
// Useful for expensive rendering operations
```

### Q60: Explain useCallback and useMemo.
**Answer:**
```javascript
import { useCallback, useMemo } from 'react';

// useCallback - Memoize function
const handleSummarize = useCallback(async () => {
  // Function logic
}, [url, API_KEY]);

// useMemo - Memoize computed value
const wordCount = useMemo(() => {
  return articleText.split(' ').length;
}, [articleText]);
```

---

## 13. Code Quality Questions

### Q61: What are code quality best practices used?
**Answer:**
- **Descriptive naming** - `handleSummarize`, `fetchArticleContent`
- **Single responsibility** - Each function does one thing
- **DRY principle** - Reusable `setLoadingState` function
- **Error handling** - Try-catch blocks
- **Comments** - Where users need to modify
- **Consistent formatting** - Proper indentation
- **Modular code** - Separate concerns

### Q62: How would you refactor this code?
**Answer:**
```javascript
// Before
const handleSummarize = async () => {
  // 100 lines of code
};

// After - Split into smaller functions
const validateInputs = () => { /* ... */ };
const fetchContent = async (url) => { /* ... */ };
const generateSummary = async (content) => { /* ... */ };
const updateUI = (summary) => { /* ... */ };

const handleSummarize = async () => {
  if (!validateInputs()) return;
  const content = await fetchContent(url);
  const summary = await generateSummary(content);
  updateUI(summary);
};
```

### Q63: What is code splitting and how to implement it?
**Answer:**
```javascript
import { lazy, Suspense } from 'react';

// Lazy load component
const ArticleView = lazy(() => import('./ArticleView'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ArticleView />
    </Suspense>
  );
}
```

### Q64: How to handle magic numbers?
**Answer:**
```javascript
// Bad
const limited = content.slice(0, 15000);

// Good
const MAX_CONTENT_LENGTH = 15000;
const MODEL_TOKEN_LIMIT = MAX_CONTENT_LENGTH;

const limited = content.slice(0, MAX_CONTENT_LENGTH);
```

### Q65: What linting tools would you use?
**Answer:**
- **ESLint** - JavaScript linting
- **Prettier** - Code formatting
- **StyleLint** - CSS linting
- **Husky** - Git hooks
- **lint-staged** - Run linters on staged files

---

## 14. Browser & Web APIs Questions

### Q66: What browser APIs are used?
**Answer:**
- **Fetch API** - HTTP requests
- **Console API** - Error logging
- **Storage API** - Could use localStorage
- **DOM API** - React abstracts this
- **Event API** - onChange handlers

### Q67: What is the Fetch API?
**Answer:**
Modern API for HTTP requests:
```javascript
const response = await fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
});

const data = await response.json();
```

### Q68: How does localStorage work?
**Answer:**
```javascript
// Store
localStorage.setItem('key', 'value');
localStorage.setItem('user', JSON.stringify({ name: 'John' }));

// Retrieve
const value = localStorage.getItem('key');
const user = JSON.parse(localStorage.getItem('user'));

// Remove
localStorage.removeItem('key');

// Clear all
localStorage.clear();
```

### Q69: What is the difference between localStorage and sessionStorage?
**Answer:**
- **localStorage** - Persists forever until cleared
- **sessionStorage** - Cleared when tab closes
- Both have ~5MB storage limit
- Both are synchronous
- Same API interface

### Q70: How to handle different screen sizes?
**Answer:**
```javascript
// JavaScript approach
const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };
  
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);

// CSS approach (better)
@media (max-width: 768px) { /* styles */ }
```

---

## 15. General Web Development Questions

### Q71: What is REST API?
**Answer:**
**REST** (Representational State Transfer) - Architectural style for APIs:
- Uses HTTP methods (GET, POST, PUT, DELETE)
- Stateless communication
- Resource-based URLs
- JSON data format

Example: OpenAI API is a REST API

### Q72: What are HTTP status codes?
**Answer:**
- **200** - OK (success)
- **201** - Created
- **400** - Bad Request (client error)
- **401** - Unauthorized
- **403** - Forbidden
- **404** - Not Found
- **500** - Internal Server Error
- **503** - Service Unavailable

### Q73: What is AJAX?
**Answer:**
**AJAX** (Asynchronous JavaScript And XML) - Technique to:
- Make async HTTP requests
- Update page without reload
- Improve user experience
- Modern implementation uses Fetch API

### Q74: What is JSON?
**Answer:**
**JSON** (JavaScript Object Notation):
```json
{
  "name": "Article Summarizer",
  "features": ["AI", "React", "Responsive"],
  "active": true,
  "version": 1.0
}
```
- Text-based data format
- Language-independent
- Easy to read and write
- Used for API communication

### Q75: What is semantic HTML?
**Answer:**
```html
<!-- Good - Semantic -->
<header>
  <h1>Title</h1>
  <nav>Menu</nav>
</header>
<main>
  <section>Content</section>
</main>
<footer>Footer</footer>

<!-- Bad - Non-semantic -->
<div class="header">
  <div class="title">Title</div>
</div>
```
Benefits: SEO, accessibility, readability

---

## 💡 Additional Resources

### Learn More:
- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev/guide/)
- [OpenAI API Docs](https://platform.openai.com/docs)
- [MDN Web Docs](https://developer.mozilla.org)
- [JavaScript.info](https://javascript.info)

### Practice Projects:
1. Add user authentication
2. Implement summary history
3. Add support for multiple languages
4. Create a browser extension version
5. Add PDF/document upload support

---

## 📄 License

MIT License - Feel free to use for learning and projects!

## 👨‍💻 Author

Created as a learning project to demonstrate React, API integration, and modern web development practices.

---

**Happy Coding! 🚀**
