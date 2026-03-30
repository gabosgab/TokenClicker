# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the game

Open `index.html` directly in a browser, or serve it locally:

```bash
python3 -m http.server 8000
```

There is no build step, bundler, test suite, or package manager. The entire game is three files: `index.html`, `styles.css`, and `game.js`.

## Architecture

This is a self-contained browser clicker game with no dependencies. All logic lives in a single `game.js` file loaded as a plain `<script>` tag.

### Data model

**`entities`** — the producer ladder (Mac Studios → Dyson Swarm of Blackwells). Each entry has `id`, `name`, `description`, `baseCost`, and `baseRate`. Cost scales exponentially via `COST_SCALE = 1.15`.

**`powerups`** — one-time purchasable upgrades. Each has an `effect` of type `"global"` (all output), `"click"` (manual prompt yield), or `"entity"` (specific producer). Powerups have an `unlocks` predicate evaluated against game state.

**`state`** — the single mutable game state object: `tokens`, `totalEarned`, `manualPrompts`, per-entity counts in `entities{}`, per-entity lifetime production in `entityProductionTotals{}`, `purchasedPowerups[]`, and `earnedHistory[]` for the trend sparkline.

### Rendering

UI updates are dirty-flagged (`renderDirty`/`requestUIRender()`) and throttled to ~10fps (`UI_RENDER_MS = 100`). Each UI section has a "view" object (e.g. `entityViews`, `sceneViews`, `powerupViews`, `headerView`) that caches the last-rendered value and skips DOM writes when nothing changed.

The animated canvas backdrop (`#promptBackdrop`) runs its own `requestAnimationFrame` loop independently of the UI render loop, drawing floating geometric shapes whose spawn rate scales with current TPS.

The trend sparkline (`#trendBars`) samples `state.totalEarned` every 100ms into `state.earnedHistory[]`, buckets the last 5 minutes into 10-second windows, and renders as bar elements.

### Save / load

Game state is serialized to `localStorage` under `STORAGE_KEY = "token-clicker-simple-save-v2"` every 10 seconds and on manual save. On load, `normalizeSavedEntities()` handles a legacy entity ID migration (old string IDs → current hardware IDs by positional index). Offline progress is applied on load, capped at `MAX_OFFLINE_SECONDS = 8 hours`.

### Key constants to know

- `COST_SCALE = 1.15` — exponential cost growth per unit purchased
- `MANUAL_YIELD = 1` — base tokens per click, multiplied by global × click powerup multipliers
- `LEGACY_ENTITY_IDS` — old entity IDs kept for save migration; do not repurpose
