# News Ticker Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a fake-tweet news card at the top of the center column that cycles through snarky, game-state-aware headlines.

**Architecture:** A `news.json` file holds all headline buckets (condition + tweet array). `game.js` fetches it once at startup, then runs a fade-out → swap → fade-in cycle every ~7.8s, picking randomly from buckets whose condition matches current state. The card lives in static HTML; only the text, handle, and avatar color swap per cycle.

**Tech Stack:** Vanilla JS, CSS transitions (no animation libraries), `fetch()` (requires local server)

---

## File Map

| File | Change |
|---|---|
| `news.json` | **Create** — all headline buckets |
| `index.html` | **Modify** — add `#newsCard` markup inside `.scene-panel` before `#sceneList` |
| `styles.css` | **Modify** — card layout, avatar colors, fade transition |
| `game.js` | **Modify** — fetch news.json, condition evaluator, tweet picker, ticker loop, elements registration |

---

### Task 1: Create news.json

**Files:**
- Create: `news.json`

- [ ] **Step 1: Create the file**

```json
[
  {
    "condition": "tps",
    "max": 0,
    "tweets": [
      { "account": "normalperson_", "text": "what is even happening" },
      { "account": "fuxnews", "text": "My grandson showed me this. I don't see the point." },
      { "account": "guberment", "text": "I've asked my staff to look into these 'tokens.' We'll circle back." }
    ]
  },
  {
    "condition": "tps",
    "min": 1,
    "max": 9,
    "tweets": [
      { "account": "inferencewatch", "text": "Running inference on desktop silicon. Bold strategy." },
      { "account": "normalperson_", "text": "he bought a computer to make fake numbers go up" },
      { "account": "nveedia", "text": "We appreciate your business. Mac Studios were not one of our products." },
      { "account": "aibro", "text": "single digit tps. humble beginnings. respect the grind 🙏" }
    ]
  },
  {
    "condition": "tps",
    "min": 10,
    "max": 99,
    "tweets": [
      { "account": "aibro", "text": "small cluster energy but the dream is there 🙏" },
      { "account": "vcman", "text": "Early days. We're watching." },
      { "account": "guberment", "text": "I've been told this uses electricity. We're looking into it." },
      { "account": "dailynews", "text": "Local operation achieves double-digit token throughput. What does it mean for Main Street?" }
    ]
  },
  {
    "condition": "tps",
    "min": 100,
    "max": 999,
    "tweets": [
      { "account": "inferencewatch", "text": "Three-digit throughput. The institutional phase begins." },
      { "account": "aibro", "text": "triple digits LETS GO 📈" },
      { "account": "dailynews", "text": "Token velocity hits triple digits. Experts are 'cautiously optimistic' and 'extremely worried.'" },
      { "account": "fuxnews", "text": "Hundreds of tokens per second. Is this what they mean by 'the cloud'?" }
    ]
  },
  {
    "condition": "tps",
    "min": 1000,
    "max": 9999,
    "tweets": [
      { "account": "aibro", "text": "four digits per second. we are SO back 🔥" },
      { "account": "nveedia", "text": "We see strong demand in the token clicking vertical." },
      { "account": "fakellon", "text": "This is basically what xAI does but with better branding" },
      { "account": "inferencewatch", "text": "Four-figure throughput achieved. Maintaining 'grudging respect' outlook." }
    ]
  },
  {
    "condition": "tps",
    "min": 10000,
    "max": 99999,
    "tweets": [
      { "account": "inferencewatch", "text": "Five-figure throughput. We've updated our models. They're still confused." },
      { "account": "vcman", "text": "Incredible unit economics. What's the exit?" },
      { "account": "guberment", "text": "This is either great or terrible for America. Possibly both. We'll schedule a hearing." },
      { "account": "fakellon", "text": "I could acquire this for $44 billion but I'm busy" }
    ]
  },
  {
    "condition": "tps",
    "min": 100000,
    "tweets": [
      { "account": "fakellon", "text": "I would have built this for $4" },
      { "account": "nveedia", "text": "GPU sales up. We take no position on what they're being used for." },
      { "account": "aibro", "text": "we are no longer operating at human scale 🤖" },
      { "account": "normalperson_", "text": "a hundred thousand tokens a second. for what. FOR WHAT." },
      { "account": "vcman", "text": "At this scale we're not talking Series A. We're talking infrastructure play." }
    ]
  },
  {
    "condition": "entityOwned",
    "entity": "nvl72",
    "min": 1,
    "tweets": [
      { "account": "inferencewatch", "text": "NVL72 acquisition confirmed. Rack-scale throughput now in play." },
      { "account": "vcman", "text": "NVL72 in the stack. We'd like to get you in a room." },
      { "account": "nveedia", "text": "GB200 NVL72: exactly what we imagined. Not like this, but we'll take it." }
    ]
  },
  {
    "condition": "entityOwned",
    "entity": "spiking",
    "min": 1,
    "tweets": [
      { "account": "dailynews", "text": "Local operator pivots to neuromorphic computing. Experts divided on whether that's good." },
      { "account": "fuxnews", "text": "Neuromorphic? In my day we just called it a brain." },
      { "account": "guberment", "text": "We don't know what neuromorphic means but we're prepared to regulate it." }
    ]
  },
  {
    "condition": "entityOwned",
    "entity": "dyson",
    "min": 1,
    "tweets": [
      { "account": "aibro", "text": "DYSON SWARM. WE ARE IN SPACE. 🛸🔥" },
      { "account": "fakellon", "text": "Orbital compute infrastructure. I tried to buy this but the auction was closed." },
      { "account": "inferencewatch", "text": "Client has achieved post-planetary scale. We have no framework for this." },
      { "account": "guberment", "text": "I have been informed they are doing AI in space now. I've called a press conference." }
    ]
  },
  {
    "condition": "totalOver",
    "threshold": 1000,
    "tweets": [
      { "account": "guberment", "text": "A thousand tokens. That's... something. We think." }
    ]
  },
  {
    "condition": "totalOver",
    "threshold": 1000000,
    "tweets": [
      { "account": "inferencewatch", "text": "Seven-figure cumulative output. The ledger is becoming meaningful." },
      { "account": "vcman", "text": "Million token milestone. Series A conversation?" },
      { "account": "normalperson_", "text": "a million of them. a million." }
    ]
  },
  {
    "condition": "totalOver",
    "threshold": 1000000000,
    "tweets": [
      { "account": "fakellon", "text": "A billion tokens. This is what I imagined when I bought Twitter." },
      { "account": "nveedia", "text": "Billion-token throughput is exactly what our roadmap was designed for." },
      { "account": "aibro", "text": "BILLION. WE ARE BUILT DIFFERENT. 🐉" }
    ]
  },
  {
    "condition": "always",
    "tweets": [
      { "account": "normalperson_", "text": "I don't know what any of this means" },
      { "account": "dailynews", "text": "AI: friend or foe? We take no position at this time." },
      { "account": "fuxnews", "text": "Token Clicker: Is it safe? Our panel of four 70-year-olds weighs in." },
      { "account": "vcman", "text": "Scaling laws + tokens + vibes = thesis" },
      { "account": "guberment", "text": "We support innovation. We also support accountability. We'll get back to you on which applies here." },
      { "account": "dailynews", "text": "The technology that will save us. The technology that will destroy us. Developing." },
      { "account": "fuxnews", "text": "Token: not the kind we had in our day." },
      { "account": "fakellon", "text": "The simulation is producing tokens. As expected." },
      { "account": "inferencewatch", "text": "Token output continues to scale. The underlying asset remains vibes." }
    ]
  }
]
```

- [ ] **Step 2: Commit**

```bash
git add news.json
git commit -m "feat: add news.json headline data"
```

---

### Task 2: Add HTML markup

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add the news card inside `.scene-panel`, before `#sceneList`**

In `index.html`, find:
```html
        <section class="panel scene-panel">

          <div id="sceneList" class="scene-list"></div>
        </section>
```

Replace with:
```html
        <section class="panel scene-panel">
          <div id="newsCard" class="news-card" hidden>
            <div id="newsAvatar" class="news-avatar" data-account="inferencewatch"></div>
            <div class="news-body">
              <span id="newsHandle" class="news-handle">@inferencewatch</span>
              <p id="newsText" class="news-text"></p>
            </div>
          </div>

          <div id="sceneList" class="scene-list"></div>
        </section>
```

- [ ] **Step 2: Commit**

```bash
git add index.html
git commit -m "feat: add news card markup to scene panel"
```

---

### Task 3: Add CSS

**Files:**
- Modify: `styles.css`

- [ ] **Step 1: Read the end of the scene-panel section in styles.css to find the right insertion point**

Look for `.scene-list` or `.scene-panel` rules to insert after.

- [ ] **Step 2: Add news card styles after the `.scene-panel` rules**

```css
/* News card */
.news-card {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px 14px;
  border-radius: 14px;
  border: 1px solid var(--line);
  background: rgba(255, 255, 255, 0.04);
  transition: opacity 0.4s;
}

.news-card.is-fading {
  opacity: 0;
}

.news-card[hidden] {
  display: none;
}

.news-avatar {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #6366f1;
}

.news-avatar[data-account="inferencewatch"] { background: #6366f1; }
.news-avatar[data-account="aibro"]          { background: #f59e0b; }
.news-avatar[data-account="normalperson_"]  { background: #6b7280; }
.news-avatar[data-account="guberment"]      { background: #dc2626; }
.news-avatar[data-account="dailynews"]      { background: #0ea5e9; }
.news-avatar[data-account="fuxnews"]        { background: #b45309; }
.news-avatar[data-account="fakellon"]       { background: #1d4ed8; }
.news-avatar[data-account="vcman"]          { background: #7c3aed; }
.news-avatar[data-account="nveedia"]        { background: #15803d; }

.news-body {
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
}

.news-handle {
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--text-muted, rgba(255,255,255,0.45));
  letter-spacing: 0.02em;
}

.news-text {
  font-size: 0.85rem;
  line-height: 1.4;
  color: var(--text, rgba(255,255,255,0.85));
  margin: 0;
}
```

- [ ] **Step 3: Commit**

```bash
git add styles.css
git commit -m "feat: add news card styles"
```

---

### Task 4: Add JS ticker logic

**Files:**
- Modify: `game.js`

- [ ] **Step 1: Register new elements**

In `game.js`, find the `elements` object (around line 446). Add four new entries inside it:

```js
  newsCard: document.querySelector("#newsCard"),
  newsAvatar: document.querySelector("#newsAvatar"),
  newsHandle: document.querySelector("#newsHandle"),
  newsText: document.querySelector("#newsText"),
```

- [ ] **Step 2: Add ticker state variables and helper functions**

Add this block near the other `const`/`let` declarations at module level (after the `ownedPowerupView` line around line 483):

```js
let newsBuckets = [];
let lastTweetText = null;

function evaluateNewsBucket(bucket) {
  const tps = getTokensPerSecond();
  if (bucket.condition === "tps") {
    if (bucket.min !== undefined && tps < bucket.min) return false;
    if (bucket.max !== undefined && tps > bucket.max) return false;
    return true;
  }
  if (bucket.condition === "totalOver") {
    return state.totalEarned >= bucket.threshold;
  }
  if (bucket.condition === "entityOwned") {
    const owned = state.entities[bucket.entity] ?? 0;
    const min = bucket.min ?? 1;
    return owned >= min;
  }
  if (bucket.condition === "powerupOwned") {
    return state.purchasedPowerups.includes(bucket.powerup);
  }
  if (bucket.condition === "always") {
    return true;
  }
  return false;
}

function pickNewsTweet() {
  const eligible = [];
  for (const bucket of newsBuckets) {
    if (!evaluateNewsBucket(bucket)) continue;
    for (const tweet of bucket.tweets) {
      if (tweet.text !== lastTweetText) eligible.push(tweet);
    }
  }
  if (!eligible.length) return null;
  const tweet = eligible[Math.floor(Math.random() * eligible.length)];
  lastTweetText = tweet.text;
  return tweet;
}

function applyNewsTweet(tweet) {
  elements.newsHandle.textContent = `@${tweet.account}`;
  elements.newsText.textContent = tweet.text;
  elements.newsAvatar.dataset.account = tweet.account;
}

function scheduleNewsTicker() {
  setTimeout(() => {
    elements.newsCard.classList.add("is-fading");
    setTimeout(() => {
      const tweet = pickNewsTweet();
      if (tweet) applyNewsTweet(tweet);
      elements.newsCard.classList.remove("is-fading");
      scheduleNewsTicker();
    }, 400);
  }, 7000);
}

function initNewsTicker() {
  fetch("news.json")
    .then((r) => r.json())
    .then((data) => {
      newsBuckets = data;
      const tweet = pickNewsTweet();
      if (tweet) {
        applyNewsTweet(tweet);
        elements.newsCard.hidden = false;
        scheduleNewsTicker();
      }
    })
    .catch(() => {
      // news.json unavailable (e.g. opened via file://) — card stays hidden
    });
}
```

- [ ] **Step 3: Call `initNewsTicker()` at startup**

Find the startup sequence at the bottom of `game.js` (around line 2087):

```js
loadGame();
recordEarnedSample(Date.now(), true);
initializeEntities();
initializeScenes();
initializePowerups();
initializeTrendBars();
initializePromptField();
bindEvents();
```

Add `initNewsTicker();` after `bindEvents();`:

```js
loadGame();
recordEarnedSample(Date.now(), true);
initializeEntities();
initializeScenes();
initializePowerups();
initializeTrendBars();
initializePromptField();
bindEvents();
initNewsTicker();
```

- [ ] **Step 4: Verify in browser**

Start the local server (`python3 -m http.server 8000`) and open `http://localhost:8000`. Confirm:
- The news card appears at the top of the center column
- The `@handle` and tweet text match one of the entries in `news.json`
- After ~7.4s, it fades out, swaps to a different tweet, and fades back in
- The avatar circle changes color to match the account

- [ ] **Step 5: Commit**

```bash
git add game.js
git commit -m "feat: add dynamic news ticker to scene panel"
```
