const STORAGE_KEY = "token-clicker-simple-save-v2";
const SAVE_INTERVAL_MS = 10000;
const COST_SCALE = 1.15;
const MAX_OFFLINE_SECONDS = 60 * 60 * 8;
const MANUAL_YIELD = 1;
const MANUAL_RATE_WINDOW_MS = 4000;

const entities = [
  {
    id: "templates",
    name: "Prompt Template",
    description: "Reusable prompt boilerplate that keeps the token meter moving.",
    baseCost: 15,
    baseRate: 0.1,
  },
  {
    id: "agents",
    name: "AutoGPT Agent",
    description: "An unsupervised agent that keeps generating more work and more tokens.",
    baseCost: 100,
    baseRate: 1,
  },
  {
    id: "racks",
    name: "GPU Rack",
    description: "A warm metal rectangle that turns money into throughput.",
    baseCost: 1100,
    baseRate: 8,
  },
  {
    id: "labs",
    name: "AGI Lab",
    description: "An expensive room full of benchmarks, snacks, and certainty.",
    baseCost: 12000,
    baseRate: 47,
  },
  {
    id: "councils",
    name: "Super AGI Council",
    description: "A strategic body that mostly optimizes token production.",
    baseCost: 130000,
    baseRate: 260,
  },
  {
    id: "cores",
    name: "Singularity Core",
    description: "A dense object dedicated to collapsing the local economy into output.",
    baseCost: 1400000,
    baseRate: 1400,
  },
  {
    id: "seeders",
    name: "Reality Seeder",
    description: "Deploys new universes with token generation pre-installed.",
    baseCost: 20000000,
    baseRate: 7800,
  },
];

const state = {
  tokens: 0,
  totalEarned: 0,
  manualPrompts: 0,
  entities: Object.fromEntries(entities.map((entity) => [entity.id, 0])),
  lastTimestamp: Date.now(),
  lastSaveAt: Date.now(),
};

const elements = {
  tokenCount: document.querySelector("#tokenCount"),
  tpsCount: document.querySelector("#tpsCount"),
  manualYield: document.querySelector("#manualYield"),
  promptCount: document.querySelector("#promptCount"),
  earnedCount: document.querySelector("#earnedCount"),
  promptButton: document.querySelector("#promptButton"),
  entityList: document.querySelector("#entityList"),
  saveButton: document.querySelector("#saveButton"),
  resetButton: document.querySelector("#resetButton"),
  saveStatus: document.querySelector("#saveStatus"),
};

const entityViews = new Map();
const recentManualPrompts = [];

function formatNumber(value) {
  if (!Number.isFinite(value)) {
    return "infinite";
  }

  const abs = Math.abs(value);
  if (abs < 1000) {
    return abs >= 100 ? value.toFixed(0) : value.toFixed(abs >= 10 ? 1 : 2).replace(/\.0+$/, "");
  }

  const units = ["K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No", "Dc"];
  let unitIndex = -1;
  let scaled = abs;
  while (scaled >= 1000 && unitIndex < units.length - 1) {
    scaled /= 1000;
    unitIndex += 1;
  }
  const sign = value < 0 ? "-" : "";
  const digits = scaled >= 100 ? 0 : scaled >= 10 ? 1 : 2;
  return `${sign}${scaled.toFixed(digits).replace(/\.0+$/, "")}${units[unitIndex]}`;
}

function cloneDefaultState() {
  return {
    tokens: 0,
    totalEarned: 0,
    manualPrompts: 0,
    entities: Object.fromEntries(entities.map((entity) => [entity.id, 0])),
    lastTimestamp: Date.now(),
    lastSaveAt: Date.now(),
  };
}

function getEntityById(id) {
  return entities.find((entity) => entity.id === id);
}

function getTokensPerSecond() {
  return entities.reduce((total, entity) => total + getEntityRate(entity), 0);
}

function pruneRecentManualPrompts(now = Date.now()) {
  const cutoff = now - MANUAL_RATE_WINDOW_MS;
  while (recentManualPrompts.length && recentManualPrompts[0] < cutoff) {
    recentManualPrompts.shift();
  }
}

function getManualTokensPerSecond(now = Date.now()) {
  pruneRecentManualPrompts(now);
  return (recentManualPrompts.length * MANUAL_YIELD * 1000) / MANUAL_RATE_WINDOW_MS;
}

function getDisplayedTokensPerSecond(now = Date.now()) {
  return getTokensPerSecond() + getManualTokensPerSecond(now);
}

function addTokens(amount) {
  state.tokens += amount;
  state.totalEarned += amount;
}

function spendTokens(amount) {
  if (state.tokens + 1e-9 < amount) {
    return false;
  }
  state.tokens -= amount;
  return true;
}

function getEntityCost(entity) {
  return entity.baseCost * COST_SCALE ** state.entities[entity.id];
}

function getEntityRate(entity) {
  return entity.baseRate * state.entities[entity.id];
}

function buyEntity(entityId) {
  const entity = getEntityById(entityId);
  if (!entity) {
    return;
  }
  const cost = getEntityCost(entity);
  if (!spendTokens(cost)) {
    return;
  }
  state.entities[entity.id] += 1;
  elements.saveStatus.textContent = `Purchased ${entity.name}.`;
}

function runManualPrompt() {
  const now = Date.now();
  const gain = MANUAL_YIELD;
  state.manualPrompts += 1;
  addTokens(gain);
  recentManualPrompts.push(now);
  pruneRecentManualPrompts(now);
  elements.promptButton.classList.add("is-pressed");
  window.setTimeout(() => {
    elements.promptButton.classList.remove("is-pressed");
  }, 90);
}

function renderHeader() {
  const now = Date.now();
  elements.tokenCount.textContent = formatNumber(state.tokens);
  elements.tpsCount.textContent = `${formatNumber(getDisplayedTokensPerSecond(now))}/s`;
  elements.manualYield.textContent = formatNumber(MANUAL_YIELD);
  elements.promptCount.textContent = formatNumber(state.manualPrompts);
  elements.earnedCount.textContent = formatNumber(state.totalEarned);
}

function initializeEntities() {
  elements.entityList.replaceChildren();
  entityViews.clear();

  for (const entity of entities) {
    const owned = state.entities[entity.id];
    const rate = getEntityRate(entity);

    const card = document.createElement("article");
    card.className = "entity-card";

    const title = document.createElement("h3");
    title.textContent = entity.name;

    const description = document.createElement("p");
    description.textContent = entity.description;

    const meta = document.createElement("div");
    meta.className = "entity-meta";
    meta.innerHTML = `<span>Owned: ${formatNumber(owned)}</span><span>${formatNumber(rate)}/s</span>`;

    const footer = document.createElement("div");
    footer.className = "entity-footer";

    const costLabel = document.createElement("span");

    const button = document.createElement("button");
    button.className = "buy-button";
    button.type = "button";
    button.textContent = "Buy";
    button.addEventListener("click", () => buyEntity(entity.id));

    footer.append(costLabel, button);
    card.append(title, description, meta, footer);
    elements.entityList.append(card);

    entityViews.set(entity.id, {
      meta,
      costLabel,
      button,
    });
  }
}

function renderEntities() {
  for (const entity of entities) {
    const view = entityViews.get(entity.id);
    if (!view) {
      continue;
    }

    const cost = getEntityCost(entity);
    const owned = state.entities[entity.id];
    const rate = getEntityRate(entity);

    view.meta.innerHTML = `<span>Owned: ${formatNumber(owned)}</span><span>${formatNumber(rate)}/s</span>`;
    view.costLabel.textContent = `Cost: ${formatNumber(cost)}`;
    view.button.disabled = state.tokens < cost;
  }
}

function render() {
  renderHeader();
  renderEntities();
}

function saveGame(message = "Progress saved.") {
  const now = Date.now();
  state.lastSaveAt = now;
  const payload = {
    ...state,
    lastTimestamp: now,
    lastSaveAt: now,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  elements.saveStatus.textContent = message;
}

function loadGame() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return;
  }
  try {
    const parsed = JSON.parse(raw);
    const defaults = cloneDefaultState();
    Object.assign(state, defaults, parsed);
    state.entities = {
      ...defaults.entities,
      ...(parsed.entities || {}),
    };
    const now = Date.now();
    const elapsedSeconds = Math.min(
      MAX_OFFLINE_SECONDS,
      Math.max(0, (now - (Number(parsed.lastTimestamp) || now)) / 1000),
    );
    if (elapsedSeconds > 1) {
      const offlineGain = getTokensPerSecond() * elapsedSeconds;
      if (offlineGain > 0) {
        addTokens(offlineGain);
        elements.saveStatus.textContent = `Recovered ${formatNumber(
          offlineGain,
        )} tokens while you were away.`;
      }
    }
  } catch (error) {
    console.error("Failed to load save", error);
    localStorage.removeItem(STORAGE_KEY);
  }
}

function resetGame() {
  if (!window.confirm("Reset the local save and start over?")) {
    return;
  }
  const fresh = cloneDefaultState();
  Object.assign(state, fresh);
  recentManualPrompts.length = 0;
  localStorage.removeItem(STORAGE_KEY);
  elements.saveStatus.textContent = "Save wiped. Back to manual prompting.";
  render();
}

function bindEvents() {
  elements.promptButton.addEventListener("click", runManualPrompt);
  elements.saveButton.addEventListener("click", () => saveGame());
  elements.resetButton.addEventListener("click", resetGame);
  window.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" || event.repeat) {
      return;
    }
    const target = event.target;
    if (target instanceof HTMLElement && /button|input|textarea|select/i.test(target.tagName)) {
      return;
    }
    event.preventDefault();
    runManualPrompt();
  });
  window.addEventListener("beforeunload", () => {
    saveGame("Progress saved.");
  });
}

function tick(now) {
  const elapsedSeconds = Math.min(1, Math.max(0, (now - state.lastTimestamp) / 1000));
  state.lastTimestamp = now;
  if (elapsedSeconds > 0) {
    addTokens(getTokensPerSecond() * elapsedSeconds);
  }

  render();

  if (now - state.lastSaveAt >= SAVE_INTERVAL_MS) {
    saveGame("Autosaved.");
  }

  window.requestAnimationFrame(tick);
}

loadGame();
initializeEntities();
bindEvents();
render();
window.requestAnimationFrame((timestamp) => {
  state.lastTimestamp = timestamp;
  window.requestAnimationFrame(tick);
});
