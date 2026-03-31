# News Ticker Design

**Date:** 2026-03-31
**Status:** Approved

## Overview

A "fake tweet" news bulletin at the top of the center column (scene panel). One tweet card visible at a time, cycling through snarky, X.com-style posts that react to current game state.

## Layout & Structure

A `<div class="news-card">` inserted at the top of `.scene-panel`, above `#sceneList`.

Each card shows:
- A small colored circle avatar (CSS only)
- The `@handle` (no display name)
- Tweet body text

One card is visible at a time. Timing:
- Fade in: 0.4s
- Hold: 7s
- Fade out: 0.4s
- Next tweet fades in immediately after

The card is always present in the DOM. Text and handle swap during the fade-out gap so there is no layout shift.

## Accounts

Three fake accounts with distinct personalities:

| Handle | Personality |
|---|---|
| `@inferencewatch` | Dry market analyst |
| `@aibro` | Hype-posting tech bro |
| `@normalperson_` | Bewildered everyman |

## Data Format

Headlines live in `news.json` at the project root. The file is fetched once at startup (requires local server — `python3 -m http.server 8000`).

```json
[
  {
    "condition": "tps",
    "min": 0,
    "max": 9,
    "tweets": [
      { "account": "normalperson_", "text": "literally nothing is happening" }
    ]
  },
  {
    "condition": "tps",
    "min": 1000,
    "max": 99999,
    "tweets": [
      { "account": "aibro", "text": "four digits per second. we are SO back 🔥" }
    ]
  },
  {
    "condition": "always",
    "tweets": [
      { "account": "normalperson_", "text": "what is even happening" }
    ]
  }
]
```

### Condition types

| Condition | Fields | Behavior |
|---|---|---|
| `"tps"` | `min` (optional), `max` (optional) | Active when current TPS is within `[min, max]`. Omit either bound for open-ended. |
| `"totalOver"` | `threshold` | Active when total tokens earned >= threshold |
| `"entityOwned"` | `entity`, `min` (optional) | Active when the named entity count >= min (default 1) |
| `"powerupOwned"` | `powerup` | Active when the named powerup has been purchased |
| `"always"` | — | Always eligible |

### Headline selection

Each cycle (~8s), the game:
1. Filters buckets to those whose condition matches current state
2. Collects all eligible tweets across matching buckets
3. Picks one at random (uniform)
4. Avoids repeating the last shown tweet

## TPS Buckets (planned headlines)

| Range | Flavor |
|---|---|
| 0–0 | Complete inactivity jokes |
| 1–9 | Single Mac Studio scraping by |
| 10–99 | Small GPU farm vibes |
| 100–999 | Getting serious |
| 1K–9K | Doing numbers |
| 10K–99K | Infrastructure scale |
| 100K+ | Absurdist mega-scale |

## Implementation Files

- `news.json` — headline data (new file)
- `index.html` — add `.news-card` markup inside `.scene-panel`
- `styles.css` — card styling + fade animation
- `game.js` — fetch news.json, ticker logic, condition evaluators

## Out of Scope

- Clickable tweets / interactions
- User-configurable refresh rate
- Sounds
