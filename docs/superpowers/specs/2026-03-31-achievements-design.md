# Achievements Design

**Date:** 2026-03-31
**Status:** Approved

## Overview

Dismissible achievement cards that appear at the bottom of the center (scene) panel when milestones are reached. Cards stack up to 3 visible at once; extras queue and appear as slots free up. Achievements are persisted in localStorage so they never re-fire after being earned.

## Layout & Structure

`.scene-panel` gets `position: relative`. Achievement cards are `position: absolute; bottom: 0; left: 0; right: 0`, stacking from the bottom upward (first unlock at the bottom, newer above). The `#sceneList` gets enough `padding-bottom` to prevent content hiding behind cards.

Each card contains:
- Large emoji icon (left)
- Bold achievement name
- Smaller muted description
- × dismiss button (top-right corner)

Cards fade in on appear. Dismiss removes the card from the DOM immediately and calls `flushAchievementQueue()` to pull the next queued item into a visible slot.

## Data Format

Lives in `achievements.js` as `const ACHIEVEMENTS_DATA = [...]`, loaded via `<script>` tag before `game.js`. Same pattern as `news.js` — no server required.

```js
const ACHIEVEMENTS_DATA = [
  {
    id: "string",          // unique, stable ID — used for persistence
    name: "string",        // display name
    icon: "emoji",         // single emoji
    description: "string", // one sentence
    condition: {
      type: "totalEarned" | "totalProducers" | "entityOwned",
      threshold: Number,   // for totalEarned and totalProducers
      entity: "string",    // for entityOwned only
    }
  }
];
```

### Condition Types

| Type | Triggers when |
|---|---|
| `totalEarned` | `state.totalEarned >= threshold` |
| `totalProducers` | sum of all `state.entities[id]` values >= threshold |
| `entityOwned` | `state.entities[entity] >= threshold` |

### Achievement List

**Lifetime tokens earned:**

| ID | Name | Icon | Description | Threshold |
|---|---|---|---|---|
| `first-token` | First Token | 🪙 | Earn your first token. | 1 |
| `century` | Century | 💵 | Earn 100 tokens lifetime. | 100 |
| `kilotoken` | Kilotoken | 💰 | Earn 1,000 tokens lifetime. | 1,000 |
| `ten-thousand` | Getting Somewhere | 📈 | Earn 10,000 tokens lifetime. | 10,000 |
| `hundred-thousand` | Hundred Thousand | 🤑 | Earn 100,000 tokens lifetime. | 100,000 |
| `millionaire` | Millionaire | 💎 | Earn 1,000,000 tokens lifetime. | 1,000,000 |
| `ten-million` | Serious Numbers | 🏦 | Earn 10,000,000 tokens lifetime. | 10,000,000 |
| `billion` | Billionaire | 🚀 | Earn 1,000,000,000 tokens lifetime. | 1,000,000,000 |
| `trillion` | Post-Economic | ♾️ | Earn 1,000,000,000,000 tokens lifetime. | 1,000,000,000,000 |

**Total producers owned:**

| ID | Name | Icon | Description | Threshold |
|---|---|---|---|---|
| `first-machine` | Bootstrapped | 🖥️ | Own your first producer. | 1 |
| `ten-machines` | Small Fleet | ⚙️ | Own 10 producers. | 10 |
| `twenty-five` | Rack Scale | 🗄️ | Own 25 producers. | 25 |
| `fifty-machines` | Data Center | 🏭 | Own 50 producers. | 50 |
| `hundred-machines` | Hyperscaler | ☁️ | Own 100 producers. | 100 |
| `two-hundred` | At This Point It's Infrastructure | 🌐 | Own 200 producers. | 200 |

**Specific entity milestones:**

| ID | Name | Icon | Description | Entity | Threshold |
|---|---|---|---|---|---|
| `first-mac` | Mac Guy | 🍎 | Buy your first Mac Studio. | v100 | 1 |
| `mac-farm` | Mac Farm | 🍎 | Own 10 Mac Studios. | v100 | 10 |
| `first-a100` | Ampere Rising | ⚡ | Buy your first Ampere A100. | a100 | 1 |
| `first-h100` | Hopper On | 🔥 | Buy your first Hopper H100. | h100 | 1 |
| `first-gh200` | Grace Under Pressure | 💜 | Buy your first Grace Hopper GH200. | gh200 | 1 |
| `first-b200` | Blackwell or Bust | ⚫ | Buy your first Blackwell B200. | b200 | 1 |
| `first-nvl72` | Rack Attack | 🔋 | Buy your first GB200 NVL72. | nvl72 | 1 |
| `first-spiking` | Neural Summer | 🧠 | Buy your first Neuromorphic Spiking Core. | spiking | 1 |
| `first-dyson` | Galaxy Brain | 🌌 | Build a Dyson Swarm of Blackwells. | dyson | 1 |

## State & Persistence

Add `earnedAchievements: []` to the default state object in `game.js`. It is included automatically in the existing `saveGame`/`loadGame` spread.

On load: IDs already in `earnedAchievements` are skipped — no card shown. Only achievements earned after the last save fire cards.

## Logic

### `checkAchievements()`

Called at the end of every `logicTick`. Loops `ACHIEVEMENTS_DATA`:
1. Skip if `state.earnedAchievements.includes(achievement.id)`
2. Evaluate condition against current state
3. If met: push `achievement.id` to `state.earnedAchievements`, push achievement object to `pendingAchievements` queue
4. Call `flushAchievementQueue()`

### `flushAchievementQueue()`

Promotes items from `pendingAchievements` into visible card slots while `visibleAchievementCards.size < 3` and queue is non-empty.

### Card creation

Each card is a `<div class="achievement-card">` created in JS and appended to `.scene-panel`. Contains:
- `<span class="achievement-icon">` — emoji
- `<div class="achievement-body">` — name + description
- `<button class="achievement-dismiss">` — ×

On dismiss click: remove card from DOM, delete from `visibleAchievementCards`, call `flushAchievementQueue()`.

## Files

| File | Change |
|---|---|
| `achievements.js` | **Create** — `ACHIEVEMENTS_DATA` array |
| `index.html` | **Modify** — add `<script src="./achievements.js">` before `game.js` |
| `styles.css` | **Modify** — `.achievement-card` styles, fade-in animation |
| `game.js` | **Modify** — add `earnedAchievements` to state, `checkAchievements`, `flushAchievementQueue`, card creation logic, call in `logicTick` |

## Out of Scope

- Achievement icons (SVG illustrations)
- Sound effects on unlock
- Achievement count display / progress bars
- Locked/greyed-out preview of future achievements
