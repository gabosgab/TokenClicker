const STORAGE_KEY = "token-clicker-simple-save-v2";
const SAVE_INTERVAL_MS = 10000;
const COST_SCALE = 1.15;
const MAX_OFFLINE_SECONDS = 60 * 60 * 8;
const MANUAL_YIELD = 1;
const MANUAL_RATE_WINDOW_MS = 4000;

const entities = [
  {
    id: "v100",
    name: "Mac Studios",
    description: "A tidy pile of Apple silicon that absolutely counts as infrastructure.",
    baseCost: 15,
    baseRate: 0.1,
  },
  {
    id: "a100",
    name: "Ampere A100",
    description: "Datacenter-grade throughput wrapped in a cleaner board.",
    baseCost: 100,
    baseRate: 1,
  },
  {
    id: "h100",
    name: "Hopper H100",
    description: "Transformer fever dream, now with much faster burn.",
    baseCost: 1100,
    baseRate: 8,
  },
  {
    id: "gh200",
    name: "Grace Hopper GH200",
    description: "CPU and GPU fused into one extremely expensive opinion.",
    baseCost: 12000,
    baseRate: 47,
  },
  {
    id: "b200",
    name: "Blackwell B200",
    description: "The new hotness. Also the new invoice.",
    baseCost: 130000,
    baseRate: 260,
  },
  {
    id: "nvl72",
    name: "GB200 NVL72",
    description: "Not one board, but a small society of them acting in concert.",
    baseCost: 1400000,
    baseRate: 1400,
  },
  {
    id: "spiking",
    name: "Neuromorphic Spiking Core",
    description: "The roadmap leaves GPUs and starts imitating biology badly.",
    baseCost: 20000000,
    baseRate: 7800,
  },
  {
    id: "dyson",
    name: "Dyson Swarm of Blackwells",
    description: "An orbital shell of accelerators dedicated to pure throughput.",
    baseCost: 330000000,
    baseRate: 44000,
  },
];

const LEGACY_ENTITY_IDS = ["templates", "agents", "racks", "labs", "councils", "cores", "seeders"];

const ENTITY_ART = {
  v100: `
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="7" y="7" width="18" height="6.5" rx="2.5" fill="#d7dde3" stroke="#5d6670" stroke-width="1.8"/>
      <rect x="7" y="13.5" width="18" height="6.5" rx="2.5" fill="#c7ced6" stroke="#515b65" stroke-width="1.8"/>
      <rect x="7" y="20" width="18" height="4.8" rx="2.2" fill="#b3bcc5" stroke="#48525c" stroke-width="1.8"/>
      <circle cx="22.5" cy="10.2" r="0.9" fill="#9aa3ad"/>
      <circle cx="22.5" cy="16.7" r="0.9" fill="#8f98a2"/>
      <rect x="11" y="25.2" width="10" height="1.8" rx="0.9" fill="#d4ae67"/>
    </svg>
  `,
  a100: `
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="5" y="7" width="22" height="16" rx="3" fill="#20252b" stroke="#0b1014" stroke-width="2"/>
      <rect x="8" y="10" width="11" height="10" rx="2" fill="#60d0d0"/>
      <rect x="20" y="10" width="4" height="4" rx="1" fill="#baf6ff"/>
      <rect x="20" y="16" width="4" height="4" rx="1" fill="#8fe5f0"/>
      <rect x="9" y="24" width="12" height="2.5" rx="1" fill="#d4ae67"/>
    </svg>
  `,
  h100: `
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M6 10h20v12H6z" fill="#3d231d" stroke="#180d0a" stroke-width="2"/>
      <path d="M9 12h9v8H9z" fill="#ff8f5b"/>
      <path d="M20 12h3v3h-3zM20 16h3v3h-3z" fill="#ffd2a4"/>
      <path d="M7 24h12v2.5H7z" fill="#d4ae67"/>
      <path d="M22 8l3 3-3 3" stroke="#ffb98c" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,
  gh200: `
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="4" y="9" width="24" height="14" rx="3" fill="#203d48" stroke="#0f1d23" stroke-width="2"/>
      <rect x="7" y="12" width="7" height="8" rx="1.5" fill="#89efe2"/>
      <rect x="18" y="12" width="7" height="8" rx="1.5" fill="#5fd6f0"/>
      <rect x="14.5" y="14" width="3" height="4" rx="1" fill="#ffd56e"/>
      <rect x="8" y="24" width="15" height="2.5" rx="1" fill="#d4ae67"/>
    </svg>
  `,
  b200: `
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="4" y="8" width="24" height="15" rx="3" fill="#232118" stroke="#0f0d08" stroke-width="2"/>
      <rect x="8" y="11" width="10" height="9" rx="2" fill="#f0cf61"/>
      <rect x="20" y="11" width="4" height="9" rx="1.5" fill="#88754c"/>
      <rect x="7" y="24" width="15" height="2.5" rx="1" fill="#d4ae67"/>
      <circle cx="24" cy="15" r="1.2" fill="#fff3cb"/>
    </svg>
  `,
  nvl72: `
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="5" y="6" width="22" height="20" rx="3" fill="#1e213f" stroke="#0c0d18" stroke-width="2"/>
      <rect x="8" y="9" width="5" height="4" rx="1" fill="#b9c7ff"/>
      <rect x="14" y="9" width="5" height="4" rx="1" fill="#9eb0ff"/>
      <rect x="20" y="9" width="4" height="4" rx="1" fill="#dfe5ff"/>
      <rect x="8" y="15" width="16" height="7" rx="1.5" fill="#4a5db3"/>
      <rect x="8" y="24" width="16" height="1.8" rx="0.9" fill="#d4ae67"/>
    </svg>
  `,
  spiking: `
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="16" cy="16" r="8" fill="#ff91f0" stroke="#3b1248" stroke-width="2"/>
      <circle cx="12" cy="14" r="2" fill="#fff1fd"/>
      <circle cx="19" cy="18" r="2.4" fill="#d177ff"/>
      <path d="M16 8v-4M24 12l4-2M8 19l-4 2M22 23l3 4M11 10l-3-4" stroke="#ffd3fb" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `,
  dyson: `
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="16" cy="16" r="5" fill="#ffd56e" stroke="#7a4d1b" stroke-width="2"/>
      <ellipse cx="16" cy="16" rx="11" ry="6.5" fill="none" stroke="#9fd8ff" stroke-width="2"/>
      <rect x="7" y="12" width="3" height="3" rx="1" fill="#b8c5ff"/>
      <rect x="22" y="10" width="3" height="3" rx="1" fill="#b8c5ff"/>
      <rect x="21" y="19" width="3" height="3" rx="1" fill="#b8c5ff"/>
      <rect x="9" y="19" width="3" height="3" rx="1" fill="#b8c5ff"/>
    </svg>
  `,
};

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
  sceneList: document.querySelector("#sceneList"),
  entityList: document.querySelector("#entityList"),
  saveButton: document.querySelector("#saveButton"),
  resetButton: document.querySelector("#resetButton"),
  saveStatus: document.querySelector("#saveStatus"),
};

const entityViews = new Map();
const sceneViews = new Map();
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

function normalizeSavedEntities(savedEntities = {}) {
  const normalized = Object.fromEntries(entities.map((entity) => [entity.id, 0]));
  const currentIds = entities.map((entity) => entity.id);
  const hasCurrentIds = currentIds.some((id) =>
    Object.prototype.hasOwnProperty.call(savedEntities, id),
  );

  if (hasCurrentIds) {
    for (const id of currentIds) {
      normalized[id] = Number(savedEntities[id]) || 0;
    }
    return { entities: normalized, migrated: false };
  }

  LEGACY_ENTITY_IDS.forEach((legacyId, index) => {
    const currentId = currentIds[index];
    if (!currentId) {
      return;
    }
    normalized[currentId] = Number(savedEntities[legacyId]) || 0;
  });

  return { entities: normalized, migrated: Object.keys(savedEntities).length > 0 };
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

function createArtSprite(entityId, className) {
  const sprite = document.createElement("div");
  sprite.className = `entity-sprite ${className}`;
  sprite.innerHTML = ENTITY_ART[entityId] || "";
  return sprite;
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

    const heading = document.createElement("div");
    heading.className = "entity-heading";

    const title = document.createElement("h3");
    title.textContent = entity.name;
    heading.append(createArtSprite(entity.id, "card-sprite"), title);

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
    card.append(heading, description, meta, footer);
    elements.entityList.append(card);

    entityViews.set(entity.id, {
      meta,
      costLabel,
      button,
    });
  }
}

function initializeScenes() {
  elements.sceneList.replaceChildren();
  sceneViews.clear();

  for (const entity of entities) {
    const row = document.createElement("article");
    row.className = "scene-row";

    const header = document.createElement("div");
    header.className = "scene-row-header";

    const title = document.createElement("div");
    title.className = "scene-row-title";
    const label = document.createElement("span");
    label.textContent = entity.name;
    title.append(createArtSprite(entity.id, "row-sprite"), label);

    const count = document.createElement("div");
    count.className = "scene-row-count";

    const stage = document.createElement("div");
    stage.className = `scene-stage scene-stage-${entity.id}`;

    const lane = document.createElement("div");
    lane.className = "scene-lane";

    stage.append(lane);
    header.append(title, count);
    row.append(header, stage);
    elements.sceneList.append(row);

    sceneViews.set(entity.id, {
      count,
      lane,
      renderedOwned: -1,
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

function renderScenes() {
  for (const entity of entities) {
    const view = sceneViews.get(entity.id);
    if (!view) {
      continue;
    }

    const owned = state.entities[entity.id];
    if (view.renderedOwned === owned) {
      continue;
    }

    view.renderedOwned = owned;
    view.count.textContent = `${formatNumber(owned)} owned`;
    view.lane.replaceChildren();

    if (!owned) {
      const empty = document.createElement("div");
      empty.className = "scene-empty";
      empty.textContent = "none";
      view.lane.append(empty);
      continue;
    }

    const fragment = document.createDocumentFragment();
    for (let index = 0; index < owned; index += 1) {
      fragment.append(createArtSprite(entity.id, "scene-sprite"));
    }
    view.lane.append(fragment);
  }
}

function render() {
  renderHeader();
  renderEntities();
  renderScenes();
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
    const normalized = normalizeSavedEntities(parsed.entities || {});
    state.entities = normalized.entities;

    let loadMessage = normalized.migrated ? "Migrated your save to the new producer lineup." : "";
    const now = Date.now();
    const elapsedSeconds = Math.min(
      MAX_OFFLINE_SECONDS,
      Math.max(0, (now - (Number(parsed.lastTimestamp) || now)) / 1000),
    );
    if (elapsedSeconds > 1) {
      const offlineGain = getTokensPerSecond() * elapsedSeconds;
      if (offlineGain > 0) {
        addTokens(offlineGain);
        loadMessage = `Recovered ${formatNumber(offlineGain)} tokens while you were away.`;
      }
    }

    if (loadMessage) {
      elements.saveStatus.textContent = loadMessage;
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
initializeScenes();
bindEvents();
render();
window.requestAnimationFrame((timestamp) => {
  state.lastTimestamp = timestamp;
  window.requestAnimationFrame(tick);
});
