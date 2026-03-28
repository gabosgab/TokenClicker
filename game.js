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

const POWERUP_ART = {
  openclaw: `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="5" y="5" width="14" height="9" rx="2" fill="#425464" stroke="#1a232a" stroke-width="1.5"/>
      <path d="M12 2v6" stroke="#ffd56e" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M9 10v5M15 10v5" stroke="#ffd56e" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M9 15l-2 2M9 15l2 2M15 15l-2 2M15 15l2 2" stroke="#ffd56e" stroke-width="1.4" stroke-linecap="round"/>
    </svg>
  `,
  gstack: `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="4" y="14" width="16" height="5" rx="1.5" fill="#55c0ff" stroke="#14354e" stroke-width="1.5"/>
      <rect x="6" y="9" width="12" height="4.5" rx="1.5" fill="#7ad1ff" stroke="#14354e" stroke-width="1.3"/>
      <rect x="8" y="5" width="8" height="3.8" rx="1.2" fill="#a3e4ff" stroke="#14354e" stroke-width="1.2"/>
    </svg>
  `,
  hotkey: `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="3" y="7" width="18" height="11" rx="2.5" fill="#40363f" stroke="#171117" stroke-width="1.5"/>
      <rect x="6" y="10" width="4" height="4" rx="1" fill="#ffd56e"/>
      <path d="M14 6l-2 5h3l-2 7 6-8h-3l2-4z" fill="#ff9658"/>
    </svg>
  `,
  "recursive-cli": `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2.5" fill="#243128" stroke="#0f1711" stroke-width="1.5"/>
      <path d="M7 10l3 2-3 2" stroke="#8cf3b1" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <path d="M12 15h5" stroke="#8cf3b1" stroke-width="1.8" stroke-linecap="round"/>
      <circle cx="17.5" cy="8.5" r="2" fill="#ffd56e"/>
    </svg>
  `,
  "m4-bin": `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="6" y="6" width="12" height="12" rx="2" fill="#d7dde3" stroke="#505965" stroke-width="1.5"/>
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3" stroke="#7c8795" stroke-width="1.6" stroke-linecap="round"/>
      <path d="M9 12l2 2 4-5" stroke="#6edb8d" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    </svg>
  `,
  "tensor-tuning": `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="4" y="6" width="16" height="12" rx="2.5" fill="#1d2c33" stroke="#0a1215" stroke-width="1.5"/>
      <path d="M6 14c2-5 4-5 6 0s4 5 6 0" stroke="#7de0ff" stroke-width="1.8" fill="none" stroke-linecap="round"/>
      <circle cx="8" cy="14" r="1.2" fill="#ffd56e"/>
      <circle cx="16" cy="14" r="1.2" fill="#ffd56e"/>
    </svg>
  `,
  "hopper-compiler": `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="4" y="8" width="12" height="9" rx="2" fill="#47261f" stroke="#180c09" stroke-width="1.5"/>
      <path d="M15 6l4 4" stroke="#ffd2a4" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M13.5 7.5l5 5" stroke="#ff975c" stroke-width="2.2" stroke-linecap="round"/>
      <circle cx="18.5" cy="5.5" r="2" fill="#ffd56e"/>
    </svg>
  `,
  "graceful-memory": `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="8" cy="12" r="4" fill="#8bf0df" stroke="#16323a" stroke-width="1.5"/>
      <circle cx="16" cy="12" r="4" fill="#5ed8f2" stroke="#16323a" stroke-width="1.5"/>
      <path d="M10.5 12h3" stroke="#ffd56e" stroke-width="1.8" stroke-linecap="round"/>
    </svg>
  `,
  "thermal-covenant": `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="12" cy="12" r="7" fill="#3d3622" stroke="#131008" stroke-width="1.5"/>
      <path d="M12 6c1 2 3 2 4 3-1 1-1 3 0 5-2 0-3 1-4 4-1-3-2-4-4-4 1-2 1-4 0-5 1-1 3-1 4-3z" fill="#ffd56e"/>
    </svg>
  `,
  "nvlink-ballroom": `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="4" y="6" width="6" height="6" rx="1.5" fill="#b8c4ff" stroke="#1a2141" stroke-width="1.4"/>
      <rect x="14" y="6" width="6" height="6" rx="1.5" fill="#dbe3ff" stroke="#1a2141" stroke-width="1.4"/>
      <rect x="9" y="13" width="6" height="6" rx="1.5" fill="#8ea2ff" stroke="#1a2141" stroke-width="1.4"/>
      <path d="M10 11l4 0M8 12l4 3M16 12l-4 3" stroke="#ffd56e" stroke-width="1.6" stroke-linecap="round"/>
    </svg>
  `,
  "spike-timing": `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M4 14h4l2-6 3 10 2-6h5" stroke="#ff9df7" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="10" cy="8" r="2" fill="#fff1fd"/>
      <circle cx="15" cy="18" r="2" fill="#d177ff"/>
    </svg>
  `,
  "orbital-procurement": `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="11" cy="12" r="4.2" fill="#ffd56e" stroke="#7a4d1b" stroke-width="1.4"/>
      <ellipse cx="11" cy="12" rx="8" ry="4.6" fill="none" stroke="#9fd8ff" stroke-width="1.6"/>
      <rect x="17" y="7" width="3" height="3" rx="0.8" fill="#b8c5ff"/>
      <rect x="18" y="14" width="3" height="3" rx="0.8" fill="#b8c5ff"/>
    </svg>
  `,
};

const powerups = [
  {
    id: "openclaw",
    name: "OpenClaw Server",
    description: "A forked little rack that squeezes more output from everything.",
    cost: 10,
    effect: { type: "global", multiplier: 1.01 },
    unlocks: () => true,
  },
  {
    id: "gstack",
    name: "G-Stack",
    description: "A vertically integrated pile of throughput promises.",
    cost: 100,
    effect: { type: "global", multiplier: 1.02 },
    unlocks: () => true,
  },
  {
    id: "hotkey",
    name: "Hotkey Daemon",
    description: "Turns manual prompting into a much more dangerous habit.",
    cost: 250,
    effect: { type: "click", multiplier: 2 },
    unlocks: (state) => state.manualPrompts >= 10,
  },
  {
    id: "m4-bin",
    name: "M4 Max Bin Lottery",
    description: "Your Mac Studios mysteriously all turn out to be better bins.",
    cost: 150,
    effect: { type: "entity", target: "v100", multiplier: 1.25 },
    unlocks: (state) => state.entities.v100 >= 5,
  },
  {
    id: "tensor-tuning",
    name: "Tensor Tuning",
    description: "Ampere boards find a cleaner path through the matrix.",
    cost: 1400,
    effect: { type: "entity", target: "a100", multiplier: 1.25 },
    unlocks: (state) => state.entities.a100 >= 5,
  },
  {
    id: "hopper-compiler",
    name: "Hopper Compiler Spell",
    description: "The H100 compiler stops fighting you and starts summoning throughput.",
    cost: 13000,
    effect: { type: "entity", target: "h100", multiplier: 1.25 },
    unlocks: (state) => state.entities.h100 >= 5,
  },
  {
    id: "recursive-cli",
    name: "Recursive CLI",
    description: "Clicks recurse into more clicks. Surely this ends well.",
    cost: 50000,
    effect: { type: "click", multiplier: 3 },
    unlocks: (state) => state.totalEarned >= 10000,
  },
  {
    id: "graceful-memory",
    name: "Graceful Memory Pooling",
    description: "Grace Hopper stops tripping over itself and gets a cleaner memory path.",
    cost: 130000,
    effect: { type: "entity", target: "gh200", multiplier: 1.25 },
    unlocks: (state) => state.entities.gh200 >= 3,
  },
  {
    id: "thermal-covenant",
    name: "Blackwell Thermal Covenant",
    description: "A sacred agreement between heat, fans, and sustained clocks.",
    cost: 1600000,
    effect: { type: "entity", target: "b200", multiplier: 1.25 },
    unlocks: (state) => state.entities.b200 >= 3,
  },
  {
    id: "nvlink-ballroom",
    name: "NVLink Ballroom",
    description: "Your NVL72 nodes finally learn to dance together.",
    cost: 25000000,
    effect: { type: "entity", target: "nvl72", multiplier: 1.25 },
    unlocks: (state) => state.entities.nvl72 >= 2,
  },
  {
    id: "spike-timing",
    name: "Spike Timing Diagram",
    description: "Neuromorphic timing stops being abstract art and becomes throughput.",
    cost: 300000000,
    effect: { type: "entity", target: "spiking", multiplier: 1.25 },
    unlocks: (state) => state.entities.spiking >= 2,
  },
  {
    id: "orbital-procurement",
    name: "Orbital Procurement",
    description: "The Dyson swarm gets a real supply chain instead of vibes.",
    cost: 5000000000,
    effect: { type: "entity", target: "dyson", multiplier: 1.25 },
    unlocks: (state) => state.entities.dyson >= 1,
  },
];

const state = {
  tokens: 0,
  totalEarned: 0,
  manualPrompts: 0,
  entities: Object.fromEntries(entities.map((entity) => [entity.id, 0])),
  purchasedPowerups: [],
  lastTimestamp: Date.now(),
  lastSaveAt: Date.now(),
};

const elements = {
  tokenCount: document.querySelector("#tokenCount"),
  tpsCount: document.querySelector("#tpsCount"),
  manualYield: document.querySelector("#manualYield"),
  promptCount: document.querySelector("#promptCount"),
  earnedCount: document.querySelector("#earnedCount"),
  manualPowerupIcons: document.querySelector("#manualPowerupIcons"),
  promptButton: document.querySelector("#promptButton"),
  sceneList: document.querySelector("#sceneList"),
  entityList: document.querySelector("#entityList"),
  powerupList: document.querySelector("#powerupList"),
  powerupTooltip: document.querySelector("#powerupTooltip"),
  powerupHoverName: document.querySelector("#powerupHoverName"),
  powerupHoverEffect: document.querySelector("#powerupHoverEffect"),
  powerupHoverDescription: document.querySelector("#powerupHoverDescription"),
  powerupHoverCost: document.querySelector("#powerupHoverCost"),
  saveButton: document.querySelector("#saveButton"),
  resetButton: document.querySelector("#resetButton"),
  saveStatus: document.querySelector("#saveStatus"),
};

const entityViews = new Map();
const sceneViews = new Map();
const powerupViews = new Map();
const recentManualPrompts = [];
const manualPowerupView = { powerupSignature: "__init__" };
let hoveredPowerupId = null;
let hoveredPowerupAnchor = null;

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
    purchasedPowerups: [],
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

function getPowerupById(id) {
  return powerups.find((powerup) => powerup.id === id);
}

function hasPowerup(id) {
  return state.purchasedPowerups.includes(id);
}

function getPurchasedPowerups() {
  return powerups.filter((powerup) => hasPowerup(powerup.id));
}

function getPowerupMultiplier(type, target = null) {
  let multiplier = 1;
  for (const powerup of getPurchasedPowerups()) {
    if (powerup.effect.type !== type) {
      continue;
    }
    if (type === "entity" && powerup.effect.target !== target) {
      continue;
    }
    multiplier *= powerup.effect.multiplier;
  }
  return multiplier;
}

function getGlobalMultiplier() {
  return getPowerupMultiplier("global");
}

function getClickMultiplier() {
  return getPowerupMultiplier("click");
}

function getManualYield() {
  return MANUAL_YIELD * getGlobalMultiplier() * getClickMultiplier();
}

function getApplicablePowerupIdsForEntity(entityId) {
  return getPurchasedPowerups()
    .filter((powerup) =>
      powerup.effect.type === "global" ||
      (powerup.effect.type === "entity" && powerup.effect.target === entityId),
    )
    .map((powerup) => powerup.id);
}

function getApplicablePowerupIdsForManual() {
  return getPurchasedPowerups()
    .filter((powerup) => powerup.effect.type === "global" || powerup.effect.type === "click")
    .map((powerup) => powerup.id);
}

function getPowerupEffectLabel(powerup) {
  const percent = Math.round((powerup.effect.multiplier - 1) * 100);
  if (powerup.effect.type === "global") {
    return `Overall +${percent}%`;
  }
  if (powerup.effect.type === "click") {
    return `Click +${percent}%`;
  }
  const target = getEntityById(powerup.effect.target);
  return `${target ? target.name : "Producer"} +${percent}%`;
}

function getPowerupProductionText(powerup) {
  const percent = Math.round((powerup.effect.multiplier - 1) * 100);
  if (powerup.effect.type === "global") {
    return `All token output +${percent}%`;
  }
  if (powerup.effect.type === "click") {
    return `Manual prompt yield +${percent}%`;
  }
  const target = getEntityById(powerup.effect.target);
  return `${target ? target.name : "Producer"} output +${percent}%`;
}

function getPowerupTooltipText(powerup) {
  return [
    powerup.name,
    getPowerupProductionText(powerup),
    powerup.description,
    `Cost: ${formatNumber(powerup.cost)} tokens`,
  ].join("\n");
}

function getTokensPerSecond() {
  return entities.reduce((total, entity) => total + getEntityRate(entity), 0);
}

function pruneRecentManualPrompts(now = Date.now()) {
  const cutoff = now - MANUAL_RATE_WINDOW_MS;
  while (recentManualPrompts.length && recentManualPrompts[0].at < cutoff) {
    recentManualPrompts.shift();
  }
}

function getManualTokensPerSecond(now = Date.now()) {
  pruneRecentManualPrompts(now);
  const recentManualTokens = recentManualPrompts.reduce((total, prompt) => total + prompt.amount, 0);
  return (recentManualTokens * 1000) / MANUAL_RATE_WINDOW_MS;
}

function getDisplayedTokensPerSecond(now = Date.now()) {
  return getTokensPerSecond() + getManualTokensPerSecond(now);
}

function addTokens(amount) {
  state.tokens += amount;
  state.totalEarned += amount;
}

function canAfford(amount) {
  return state.tokens + 1e-9 >= amount;
}

function spendTokens(amount) {
  if (!canAfford(amount)) {
    return false;
  }
  state.tokens -= amount;
  return true;
}

function getEntityCost(entity) {
  return entity.baseCost * COST_SCALE ** state.entities[entity.id];
}

function getEntityRate(entity) {
  return entity.baseRate * state.entities[entity.id] * getGlobalMultiplier() * getPowerupMultiplier("entity", entity.id);
}

function createArtSprite(entityId, className) {
  const sprite = document.createElement("div");
  sprite.className = `entity-sprite ${className}`;
  sprite.innerHTML = ENTITY_ART[entityId] || "";
  return sprite;
}

function createPowerupIcon(powerupId, className) {
  const icon = document.createElement("div");
  icon.className = `effect-icon ${className}`;
  icon.innerHTML = POWERUP_ART[powerupId] || "";
  const powerup = getPowerupById(powerupId);
  if (powerup) {
    icon.title = `${powerup.name}: ${getPowerupEffectLabel(powerup)}`;
  }
  return icon;
}

function updateIconRail(container, powerupIds, signatureHolder, showEmpty = false) {
  const signature = powerupIds.join(",");
  if (signatureHolder.powerupSignature === signature) {
    return;
  }
  signatureHolder.powerupSignature = signature;
  container.replaceChildren();

  if (!powerupIds.length) {
    if (showEmpty) {
      const empty = document.createElement("span");
      empty.className = "effect-empty";
      empty.textContent = "none";
      container.append(empty);
    }
    container.hidden = !showEmpty;
    return;
  }

  container.hidden = false;
  const fragment = document.createDocumentFragment();
  for (const powerupId of powerupIds) {
    fragment.append(createPowerupIcon(powerupId, "effect-icon-small"));
  }
  container.append(fragment);
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

function buyPowerup(powerupId) {
  const powerup = getPowerupById(powerupId);
  if (!powerup || hasPowerup(powerup.id)) {
    return;
  }
  if (!powerup.unlocks(state)) {
    return;
  }
  if (!spendTokens(powerup.cost)) {
    elements.saveStatus.textContent = `Need ${formatNumber(powerup.cost)} tokens for ${powerup.name}.`;
    return;
  }
  state.purchasedPowerups.push(powerup.id);
  if (hoveredPowerupId === powerup.id) {
    hoveredPowerupId = null;
    hoveredPowerupAnchor = null;
    hidePowerupTooltip();
  }
  elements.saveStatus.textContent = `Powerup purchased: ${powerup.name}.`;
}

function hidePowerupTooltip() {
  elements.powerupTooltip.hidden = true;
  elements.powerupHoverCost.classList.remove("is-affordable");
}

function positionPowerupTooltip() {
  if (elements.powerupTooltip.hidden || !hoveredPowerupAnchor) {
    return;
  }

  const margin = 10;
  const tooltip = elements.powerupTooltip;
  const anchorRect = hoveredPowerupAnchor.getBoundingClientRect();
  const tooltipWidth = tooltip.offsetWidth;
  const tooltipHeight = tooltip.offsetHeight;

  let left = anchorRect.left - tooltipWidth - 14;
  if (left < margin) {
    left = anchorRect.right + 14;
  }
  if (left + tooltipWidth > window.innerWidth - margin) {
    left = Math.max(margin, window.innerWidth - tooltipWidth - margin);
  }

  let top = anchorRect.top + (anchorRect.height - tooltipHeight) / 2;
  if (top < margin) {
    top = margin;
  }
  if (top + tooltipHeight > window.innerHeight - margin) {
    top = Math.max(margin, window.innerHeight - tooltipHeight - margin);
  }

  tooltip.style.left = `${Math.round(left)}px`;
  tooltip.style.top = `${Math.round(top)}px`;
}

function syncPowerupTooltip() {
  const hoveredPowerup = hoveredPowerupId ? getPowerupById(hoveredPowerupId) : null;
  const powerup =
    hoveredPowerup &&
    !hasPowerup(hoveredPowerup.id) &&
    hoveredPowerup.unlocks(state) &&
    hoveredPowerupAnchor &&
    !hoveredPowerupAnchor.hidden
      ? hoveredPowerup
      : null;

  if (!powerup) {
    hidePowerupTooltip();
    return;
  }

  elements.powerupHoverName.textContent = powerup.name;
  elements.powerupHoverEffect.textContent = getPowerupProductionText(powerup);
  elements.powerupHoverDescription.textContent = powerup.description;
  elements.powerupHoverCost.textContent = `Cost: ${formatNumber(powerup.cost)} tokens${canAfford(powerup.cost) ? " · ready to buy" : ""}`;
  elements.powerupHoverCost.classList.toggle("is-affordable", canAfford(powerup.cost));
  elements.powerupTooltip.hidden = false;
  positionPowerupTooltip();
}

function setHoveredPowerup(powerupId, anchor) {
  hoveredPowerupId = powerupId;
  hoveredPowerupAnchor = anchor;
  syncPowerupTooltip();
}

function clearHoveredPowerup(powerupId) {
  if (hoveredPowerupId !== powerupId) {
    return;
  }
  hoveredPowerupId = null;
  hoveredPowerupAnchor = null;
  hidePowerupTooltip();
}

function runManualPrompt() {
  const now = Date.now();
  const gain = getManualYield();
  state.manualPrompts += 1;
  addTokens(gain);
  recentManualPrompts.push({ at: now, amount: gain });
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
  elements.manualYield.textContent = formatNumber(getManualYield());
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

    const headingMain = document.createElement("div");
    headingMain.className = "entity-heading-main";

    const title = document.createElement("h3");
    title.textContent = entity.name;
    headingMain.append(createArtSprite(entity.id, "card-sprite"), title);

    const boosts = document.createElement("div");
    boosts.className = "effect-icons";
    boosts.hidden = true;
    heading.append(headingMain, boosts);

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
      boosts,
      powerupSignature: "",
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
    const titleMain = document.createElement("div");
    titleMain.className = "scene-row-title-main";
    const label = document.createElement("span");
    label.textContent = entity.name;
    titleMain.append(createArtSprite(entity.id, "row-sprite"), label);

    const boosts = document.createElement("div");
    boosts.className = "effect-icons";
    boosts.hidden = true;
    title.append(titleMain, boosts);

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
      boosts,
      renderedOwned: -1,
      powerupSignature: "",
    });
  }
}

function initializePowerups() {
  elements.powerupList.replaceChildren();
  powerupViews.clear();

  for (const powerup of powerups) {
    const button = document.createElement("button");
    button.className = "powerup-button";
    button.type = "button";
    button.setAttribute("aria-label", getPowerupTooltipText(powerup).replace(/\n/g, ". "));
    const icon = createPowerupIcon(powerup.id, "effect-icon-plain");
    icon.removeAttribute("title");
    button.append(icon);
    button.addEventListener("click", () => buyPowerup(powerup.id));
    button.addEventListener("mouseenter", () => setHoveredPowerup(powerup.id, button));
    button.addEventListener("focus", () => setHoveredPowerup(powerup.id, button));
    button.addEventListener("mouseleave", () => clearHoveredPowerup(powerup.id));
    button.addEventListener("blur", () => clearHoveredPowerup(powerup.id));
    elements.powerupList.append(button);

    powerupViews.set(powerup.id, {
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
    const applicablePowerups = getApplicablePowerupIdsForEntity(entity.id);

    view.meta.innerHTML = `<span>Owned: ${formatNumber(owned)}</span><span>${formatNumber(rate)}/s</span>`;
    view.costLabel.textContent = `Cost: ${formatNumber(cost)}`;
    view.button.disabled = !canAfford(cost);
    updateIconRail(view.boosts, applicablePowerups, view, false);
  }
}

function renderScenes() {
  for (const entity of entities) {
    const view = sceneViews.get(entity.id);
    if (!view) {
      continue;
    }

    const owned = state.entities[entity.id];
    const applicablePowerups = getApplicablePowerupIdsForEntity(entity.id);
    updateIconRail(view.boosts, applicablePowerups, view, false);

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

function renderManualPowerups() {
  const applicablePowerups = getApplicablePowerupIdsForManual();
  updateIconRail(elements.manualPowerupIcons, applicablePowerups, manualPowerupView, true);
}

function renderPowerups() {
  let visibleCount = 0;
  for (const powerup of powerups) {
    const view = powerupViews.get(powerup.id);
    if (!view) {
      continue;
    }

    const visible = !hasPowerup(powerup.id) && powerup.unlocks(state);
    view.button.hidden = !visible;
    if (!visible) {
      continue;
    }

    visibleCount += 1;
    view.button.classList.toggle("is-affordable", canAfford(powerup.cost));
    view.button.classList.toggle("is-blocked", !canAfford(powerup.cost));
    view.button.setAttribute("aria-disabled", canAfford(powerup.cost) ? "false" : "true");
  }

  elements.powerupList.hidden = visibleCount === 0;
  syncPowerupTooltip();
}

function render() {
  renderHeader();
  renderManualPowerups();
  renderEntities();
  renderScenes();
  renderPowerups();
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
    state.purchasedPowerups = Array.isArray(parsed.purchasedPowerups)
      ? [...new Set(parsed.purchasedPowerups.filter((id) => !!getPowerupById(id)))]
      : [];

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
  manualPowerupView.powerupSignature = "__init__";
  hoveredPowerupId = null;
  hoveredPowerupAnchor = null;
  hidePowerupTooltip();
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
  window.addEventListener("resize", syncPowerupTooltip);
  window.addEventListener("scroll", syncPowerupTooltip, { passive: true });
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
initializePowerups();
bindEvents();
render();
window.requestAnimationFrame((timestamp) => {
  state.lastTimestamp = timestamp;
  window.requestAnimationFrame(tick);
});
