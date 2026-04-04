const STORAGE_KEY = "token-clicker-simple-save-v2";
const SAVE_INTERVAL_MS = 10000;
const COST_SCALE = 3;
const MAX_OFFLINE_SECONDS = 60 * 60 * 8;
const MANUAL_YIELD = 1;
const MANUAL_RATE_WINDOW_MS = 4000;
const TOKEN_TREND_WINDOW_MS = 5 * 60 * 1000;
const TOKEN_TREND_BUCKET_MS = 10 * 1000;
const TOKEN_TREND_SAMPLE_MS = 100;
const TOKEN_TREND_RENDER_MS = 100;
const UI_RENDER_MS = 100;
const PROMPT_FIELD_RENDER_MS = 33;
const PROMPT_FIELD_MAX_SHAPES = 96;
const PROMPT_FIELD_BASE_SPAWN_PER_SECOND = 1.2;
const PROMPT_FIELD_MAX_SPAWN_PER_SECOND = 18;
const PROMPT_FIELD_COLORS = ["#77f8ff", "#87a8ff", "#ffd56e", "#ff8fd8", "#8fffbe"];
const PROMPT_FIELD_SHAPES = ["triangle", "square", "diamond", "circle", "hex"];

// Rough throughput ladder: desktop silicon -> datacenter GPU -> rack-scale system -> speculative megasystems.
const entities = [
  {
    id: "v100",
    name: "Mac Studios",
    description: "A tidy pile of Apple silicon that absolutely counts as infrastructure if you squint hard enough.",
    baseCost: 45,
    baseRate: 50,
  },
  {
    id: "a100",
    name: "Ampere A100",
    description: "The only piece of hardware that can make your monthly power bill look like a phone number.",
    baseCost: 12000,
    baseRate: 125,
  },
  {
    id: "h100",
    name: "Hopper H100",
    description: "A $30,000 space heater that hallucinates for a living.",
    baseCost: 42000,
    baseRate: 275,
  },
  {
    id: "gh200",
    name: "Grace Hopper GH200",
    description: "Effectively a Falcon 9 rocket strapped to a toaster.",
    baseCost: 105000,
    baseRate: 500,
  },
  {
    id: "groq",
    name: "Groq Chip",
    description: "No memory, no mercy, no waiting. Just tokens, delivered at a speed that makes GPUs feel personally attacked.",
    baseCost: 210000,
    baseRate: 800,
  },
  {
    id: "b200",
    name: "Blackwell B200",
    description: "A chip so dense that it has its own gravitational pull.",
    baseCost: 3000000,
    baseRate: 10000,
  },
  {
    id: "asic",
    name: "Hardwired AI ASIC",
    description: "Designed to do exactly one thing. It does that one thing so fast it makes the laws of physics uncomfortable.",
    baseCost: 6000000,
    baseRate: 17000,
  },
  {
    id: "nvl72",
    name: "GB200 NVL72",
    description: "A $3 million radiator that happens to be able to predict the next three words of your email with terrifying, god-like accuracy",
    baseCost: 390000000,
    baseRate: 1000000,
  },
  {
    id: "spiking",
    name: "Neuromorphic Spiking Core",
    description: "The Brain-on-a-Chip that successfully mimics the human brain’s most defining trait—being completely temperamental and impossible to reason with.",
    baseCost: 2550000000,
    baseRate: 5000000,
  },
  {
    id: "dyson",
    name: "Dyson Swarm of Blackwells",
    description: "An oribtal shell of acclerators that treats the Sun as a slightly underpowered AA battery.",
    baseCost: 63000000000,
    baseRate: 100000000,
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
  groq: `
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="5" y="9" width="22" height="14" rx="2.5" fill="#1c0a0a" stroke="#0a0404" stroke-width="1.8"/>
      <rect x="9" y="12" width="14" height="8" rx="1.5" fill="#c01810"/>
      <line x1="10" y1="14.5" x2="22" y2="14.5" stroke="#ff5533" stroke-width="1.2"/>
      <line x1="10" y1="16" x2="22" y2="16" stroke="#ff7755" stroke-width="1.6"/>
      <line x1="10" y1="17.5" x2="22" y2="17.5" stroke="#ff5533" stroke-width="1.2"/>
      <rect x="8" y="24" width="16" height="2.5" rx="1" fill="#d4ae67"/>
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
  asic: `
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="5" y="8" width="22" height="16" rx="2.5" fill="#192233" stroke="#0b131e" stroke-width="1.8"/>
      <rect x="10" y="11" width="12" height="10" rx="1.5" fill="#2a4f6a"/>
      <line x1="5" y1="13" x2="10" y2="13" stroke="#4adacc" stroke-width="1.2" stroke-linecap="round"/>
      <line x1="5" y1="16" x2="10" y2="16" stroke="#4adacc" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="5" y1="19" x2="10" y2="19" stroke="#4adacc" stroke-width="1.2" stroke-linecap="round"/>
      <line x1="22" y1="13" x2="27" y2="13" stroke="#4adacc" stroke-width="1.2" stroke-linecap="round"/>
      <line x1="22" y1="16" x2="27" y2="16" stroke="#4adacc" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="22" y1="19" x2="27" y2="19" stroke="#4adacc" stroke-width="1.2" stroke-linecap="round"/>
      <rect x="12" y="13" width="3.5" height="3" rx="0.6" fill="#3ec0a8"/>
      <rect x="16.5" y="13" width="3.5" height="3" rx="0.6" fill="#2ea890"/>
      <rect x="12" y="17" width="3.5" height="3" rx="0.6" fill="#2ea890"/>
      <rect x="16.5" y="17" width="3.5" height="3" rx="0.6" fill="#3ec0a8"/>
      <rect x="9" y="25" width="14" height="2.2" rx="1" fill="#d4ae67"/>
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
  "macro-array": `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="3" fill="#2a2532" stroke="#110d16" stroke-width="1.5"/>
      <rect x="7" y="7" width="3" height="3" rx="0.8" fill="#ffd56e"/>
      <rect x="11" y="7" width="3" height="3" rx="0.8" fill="#ffb96f"/>
      <rect x="7" y="11" width="3" height="3" rx="0.8" fill="#9be8ff"/>
      <rect x="11" y="11" width="3" height="3" rx="0.8" fill="#79c9ff"/>
      <path d="M16 8l2 2-2 2" stroke="#ff8f5b" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <path d="M16 15h3" stroke="#ff8f5b" stroke-width="1.7" stroke-linecap="round"/>
    </svg>
  `,
  "prompt-cache": `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="5" y="6" width="11" height="8" rx="1.8" fill="#2d3146" stroke="#111626" stroke-width="1.4"/>
      <rect x="8" y="10" width="11" height="8" rx="1.8" fill="#48506f" stroke="#111626" stroke-width="1.4"/>
      <path d="M16 4l-2 5h2l-1 4 4-6h-2l1-3z" fill="#ffd56e"/>
    </svg>
  `,
  "enter-furnace": `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="4" y="5" width="16" height="14" rx="2.5" fill="#3b2119" stroke="#180c09" stroke-width="1.5"/>
      <rect x="7" y="9" width="6" height="5" rx="1.2" fill="#ffd8a1"/>
      <path d="M14 9h3l-2.5 2.5L17 14h-3" stroke="#ff9658" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <path d="M7 17h10" stroke="#ffd56e" stroke-width="1.6" stroke-linecap="round"/>
    </svg>
  `,
  "manual-singularity": `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="12" cy="12" r="3.8" fill="#0f1118" stroke="#6c79ff" stroke-width="1.5"/>
      <ellipse cx="12" cy="12" rx="8.2" ry="4.8" fill="none" stroke="#8fd8ff" stroke-width="1.6"/>
      <rect x="16.3" y="8.8" width="3" height="2.2" rx="0.7" fill="#ffd56e"/>
      <rect x="17.8" y="9.4" width="1.2" height="1" rx="0.4" fill="#2f2a20"/>
      <path d="M17 12.7l2 0" stroke="#ffd56e" stroke-width="1.3" stroke-linecap="round"/>
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
  "jensens-jacket": `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M5 9l2-4h2l1 3h4l1-3h2l2 4v11H5z" fill="#1a1a1a" stroke="#3a3a3a" stroke-width="1.2"/>
      <path d="M9 5l-1 3 2 2 2-2-1-3" fill="#2a2a2a" stroke="#3a3a3a" stroke-width="1"/>
      <path d="M5 9l3 3M19 9l-3 3" stroke="#555" stroke-width="1.2" stroke-linecap="round"/>
      <path d="M10 10l2 2 2-2" stroke="#ffd56e" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <circle cx="7" cy="14" r="0.8" fill="#ffd56e"/>
      <circle cx="7" cy="17" r="0.8" fill="#ffd56e"/>
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
    description: "A little rack that squeezes more output from everything.",
    cost: 30,
    effect: { type: "global", multiplier: 1.01 },
    unlocks: () => true,
  },
  {
    id: "gstack",
    name: "G-Stack",
    description: "A vertically integrated pile of promises. Increases chance of Y-Combinator acceptance by 10% too.",
    cost: 300,
    effect: { type: "global", multiplier: 1.02 },
    unlocks: () => true,
  },
  {
    id: "hotkey",
    name: "Hotkey Daemon",
    description: "Turns manual prompting into a much more dangerous habit.",
    cost: 750,
    effect: { type: "click", multiplier: 2 },
    unlocks: (state) => state.manualPrompts >= 10,
  },
  {
    id: "recursive-cli",
    name: "TMUX",
    description: "You discover tmux. You don't fully understand it. Output soars anyway.",
    cost: 3750,
    effect: { type: "click", multiplier: 2 },
    unlocks: (state) => state.purchasedPowerups.includes("hotkey") && state.totalEarned >= 1500,
  },
  {
    id: "macro-array",
    name: "Macro Array",
    description: "One enter key becomes many, then many becomes a workflow problem.",
    cost: 18750,
    effect: { type: "click", multiplier: 2 },
    unlocks: (state) => state.purchasedPowerups.includes("recursive-cli") && state.totalEarned >= 15000,
  },
  {
    id: "prompt-cache",
    name: "Hyperparameter Turbo",
    description: "Your model finds the perfect hyperparameters. Token production skyrockets. Nobody knows which ones. Nobody is asking.",
    cost: 93750,
    effect: { type: "click", multiplier: 2 },
    unlocks: (state) => state.purchasedPowerups.includes("macro-array") && state.totalEarned >= 150000,
  },
  {
    id: "enter-furnace",
    name: "Jenseen's Neural Network Nunchucks",
    description: "A dynamic upgrade that slices through bottlenecks. Throughput doubles. Jenseen will not explain how the nunchucks work.",
    cost: 468750,
    effect: { type: "click", multiplier: 2 },
    unlocks: (state) => state.purchasedPowerups.includes("prompt-cache") && state.totalEarned >= 1500000,
  },
  {
    id: "manual-singularity",
    name: "Manual Singularity",
    description: "Your fingertip now bends space, time, and prompt yield around itself.",
    cost: 2343750,
    effect: { type: "click", multiplier: 2 },
    unlocks: (state) => state.purchasedPowerups.includes("enter-furnace") && state.totalEarned >= 15000000,
  },
  {
    id: "m4-bin",
    name: "M4 Max Bin Lottery",
    description: "Your Mac Studios mysteriously all turn out to be better bins.",
    cost: 450,
    effect: { type: "entity", target: "v100", multiplier: 2 },
    unlocks: (state) => state.entities.v100 >= 5,
  },
  {
    id: "tensor-tuning",
    name: "It Learned to Negotiate the Electric Bill",
    description: "The AI called the utility and asked for 'dynamic pricing consideration.' They gave it a discount.",
    cost: 4200,
    effect: { type: "entity", target: "a100", multiplier: 2 },
    unlocks: (state) => state.entities.a100 >= 5,
  },
  {
    id: "hopper-compiler",
    name: "Hopper Compiler Spell",
    description: "The H100 compiler stops fighting you and starts summoning throughput.",
    cost: 39000,
    effect: { type: "entity", target: "h100", multiplier: 2 },
    unlocks: (state) => state.entities.h100 >= 5,
  },
  {
    id: "jensens-jacket",
    name: "Jenseen's New Jacket",
    description: "It looks so good that the A100s simply run faster out of respect.",
    cost: 195000,
    effect: { type: "entity", target: "a100", multiplier: 2 },
    unlocks: (state) => state.purchasedPowerups.includes("tensor-tuning") && state.entities.a100 >= 10,
  },
  {
    id: "graceful-memory",
    name: "The Wi-Fi Has a Presence",
    description: "You connect to it and… it feels like it knows why you're there. Bandwidth bottlenecks vanish.",
    cost: 390000,
    effect: { type: "entity", target: "gh200", multiplier: 2 },
    unlocks: (state) => state.entities.gh200 >= 3,
  },
  {
    id: "groq-lpu-mode",
    name: "They Stopped Sleeping Over There",
    description: "Lights on 24/7, nobody goes in or out. But packages keep arriving. Heavy ones. Fully autonomous operation. Permanent uptime boost.",
    cost: 630000,
    effect: { type: "entity", target: "groq", multiplier: 2 },
    unlocks: (state) => state.entities.groq >= 5,
  },
  {
    id: "thermal-covenant",
    name: "The AI Started Filing Permits",
    description: "I checked—those documents are real. It legally approved its own expansion.",
    cost: 4800000,
    effect: { type: "entity", target: "b200", multiplier: 2 },
    unlocks: (state) => state.entities.b200 >= 3,
  },
  {
    id: "asic-mask-rev",
    name: "The Noise Is… Organized",
    description: "It used to be random, now it's rhythmic. Like it's working toward something. Compute synchronizes. Output spikes.",
    cost: 18000000,
    effect: { type: "entity", target: "asic", multiplier: 2 },
    unlocks: (state) => state.entities.asic >= 3,
  },
  {
    id: "nvlink-ballroom",
    name: "The Heat Is Melting the Mailbox",
    description: "Mailman won't even walk up anymore. Just tosses letters from the street. Thermal limits removed. Everything runs at unsafe levels.",
    cost: 75000000,
    effect: { type: "entity", target: "nvl72", multiplier: 2 },
    unlocks: (state) => state.entities.nvl72 >= 2,
  },
  {
    id: "spike-timing",
    name: "The Church Started Praying Toward It",
    description: "Not saying it's a god, but they did rotate the pews. Compute becomes divinely optimized.",
    cost: 900000000,
    effect: { type: "entity", target: "spiking", multiplier: 2 },
    unlocks: (state) => state.entities.spiking >= 2,
  },
  {
    id: "orbital-procurement",
    name: "The Pets Won't Go Near the Fence",
    description: "Dog just stops. Won't bark. Just… stares at the building. Unknown forces stabilize your systems.",
    cost: 15000000000,
    effect: { type: "entity", target: "dyson", multiplier: 2 },
    unlocks: (state) => state.entities.dyson >= 1,
  },
];

const state = {
  tokens: 0,
  totalEarned: 0,
  manualPrompts: 0,
  entities: Object.fromEntries(entities.map((entity) => [entity.id, 0])),
  entityProductionTotals: Object.fromEntries(entities.map((entity) => [entity.id, 0])),
  purchasedPowerups: [],
  earnedHistory: [],
  lastTimestamp: Date.now(),
  lastSaveAt: Date.now(),
};

const elements = {
  tokenCount: document.querySelector("#tokenCount"),
  tpsCount: document.querySelector("#tpsCount"),
  manualYield: document.querySelector("#manualYield"),
  promptCount: document.querySelector("#promptCount"),
  earnedCount: document.querySelector("#earnedCount"),
  ownedPowerupIcons: document.querySelector("#ownedPowerupIcons"),
  promptBackdrop: document.querySelector("#promptBackdrop"),
  promptButton: document.querySelector("#promptButton"),
  sceneList: document.querySelector("#sceneList"),
  entityList: document.querySelector("#entityList"),
  trendValue: document.querySelector("#trendValue"),
  trendBars: document.querySelector("#trendBars"),
  entityTooltip: document.querySelector("#entityTooltip"),
  entityHoverIcon: document.querySelector("#entityHoverIcon"),
  entityHoverName: document.querySelector("#entityHoverName"),
  entityHoverOwned: document.querySelector("#entityHoverOwned"),
  entityHoverCost: document.querySelector("#entityHoverCost"),
  entityHoverDescription: document.querySelector("#entityHoverDescription"),
  entityHoverUnitRate: document.querySelector("#entityHoverUnitRate"),
  entityHoverTotalRate: document.querySelector("#entityHoverTotalRate"),
  entityHoverLifetime: document.querySelector("#entityHoverLifetime"),
  powerupList: document.querySelector("#powerupList"),
  powerupTooltip: document.querySelector("#powerupTooltip"),
  powerupHoverName: document.querySelector("#powerupHoverName"),
  powerupHoverEffect: document.querySelector("#powerupHoverEffect"),
  powerupHoverDescription: document.querySelector("#powerupHoverDescription"),
  powerupHoverCost: document.querySelector("#powerupHoverCost"),
  saveButton: document.querySelector("#saveButton"),
  resetButton: document.querySelector("#resetButton"),
  saveStatus: document.querySelector("#saveStatus"),
  newsCard: document.querySelector("#newsCard"),
  newsAvatar: document.querySelector("#newsAvatar"),
  newsHandle: document.querySelector("#newsHandle"),
  newsText: document.querySelector("#newsText"),
};

const entityViews = new Map();
const sceneViews = new Map();
const powerupViews = new Map();
const recentManualPrompts = [];
const ownedPowerupView = { powerupSignature: "__init__" };

let newsBuckets = [];
const RECENT_TWEET_HISTORY = 8;
const recentTweetTexts = [];
let newsTickerRunning = false;

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
return false;
}

function pickNewsTweet() {
  let eligible = [];
  for (const bucket of newsBuckets) {
    if (!evaluateNewsBucket(bucket)) continue;
    for (const tweet of bucket.tweets) eligible.push(tweet);
  }
  if (!eligible.length) return null;
  const filtered = eligible.filter(t => !recentTweetTexts.includes(t.text));
  const pool = filtered.length ? filtered : eligible;
  const tweet = pool[Math.floor(Math.random() * pool.length)];
  recentTweetTexts.push(tweet.text);
  if (recentTweetTexts.length > RECENT_TWEET_HISTORY) recentTweetTexts.shift();
  return tweet;
}

function applyNewsTweet(tweet) {
  elements.newsHandle.textContent = `@${tweet.account}`;
  elements.newsText.textContent = tweet.text;
  elements.newsAvatar.dataset.account = tweet.account;
  elements.newsAvatar.innerHTML = NEWS_ACCOUNT_ART[tweet.account] || "";
}

function scheduleNewsTicker() {
  if (newsTickerRunning) return;
  newsTickerRunning = true;
  const loop = () => {
    setTimeout(() => {
      elements.newsCard.classList.add("is-fading");
      setTimeout(() => {
        const tweet = pickNewsTweet();
        if (tweet) {
          applyNewsTweet(tweet);
        } else {
          lastTweetText = null; // reset so next cycle can pick something
        }
        elements.newsCard.classList.remove("is-fading");
        loop();
      }, 400);
    }, 7500);
  };
  loop();
}

function initNewsTicker() {
  newsBuckets = NEWS_DATA;
  const tweet = pickNewsTweet();
  if (tweet) {
    applyNewsTweet(tweet);
    elements.newsCard.hidden = false;
    scheduleNewsTicker();
  }
}

const sounds = {
  tick: new Audio("snd/tick.mp3"),
  upgrade: new Audio("snd/upgrade.mp3"),
  buy: [
    new Audio("snd/buy1.mp3"),
    new Audio("snd/buy2.mp3"),
    new Audio("snd/buy3.mp3"),
  ],
};

function playSound(sound) {
  const audio = Array.isArray(sound)
    ? sound[Math.floor(Math.random() * sound.length)]
    : sound;
  audio.currentTime = 0;
  audio.play().catch(() => {});
}
const trendBarFills = [];
const headerView = {
  tokens: "",
  tps: "",
  manualYield: "",
  prompts: "",
  earned: "",
};
const promptField = {
  ctx: null,
  width: 0,
  height: 0,
  dpr: 1,
  shapes: [],
  sprites: new Map(),
  spawnCarry: 0,
  lastTimestamp: null,
  lastRenderAt: null,
  ambientPhase: 0,
};
let hoveredPowerupId = null;
let hoveredPowerupAnchor = null;
let hoveredEntityId = null;
let hoveredEntityAnchor = null;
let lastTrendRenderAt = 0;
let lastUIRenderAt = 0;
let renderDirty = true;

function requestUIRender() {
  renderDirty = true;
}

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

function formatFullNumber(value) {
  if (!Number.isFinite(value)) {
    return "infinite";
  }

  const abs = Math.abs(value);
  const digits = abs >= 100 ? 0 : abs >= 10 ? 1 : 2;
  return value.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: digits,
  });
}

const LONG_UNIT_NAMES = ["million", "billion", "trillion", "quadrillion", "quintillion", "sextillion", "septillion", "octillion", "nonillion", "decillion"];

function formatTokenDisplay(value) {
  const abs = Math.abs(value);
  if (abs < 1_000_000) {
    return { main: formatFullNumber(value), unit: null };
  }
  let unitIndex = 0;
  let scaled = abs / 1_000_000;
  while (scaled >= 1000 && unitIndex < LONG_UNIT_NAMES.length - 1) {
    scaled /= 1000;
    unitIndex++;
  }
  const sign = value < 0 ? "-" : "";
  return { main: `${sign}${scaled.toFixed(3)}`, unit: `${LONG_UNIT_NAMES[unitIndex]} tokens` };
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function cloneDefaultState() {
  return {
    tokens: 0,
    totalEarned: 0,
    manualPrompts: 0,
    entities: Object.fromEntries(entities.map((entity) => [entity.id, 0])),
    entityProductionTotals: Object.fromEntries(entities.map((entity) => [entity.id, 0])),
    purchasedPowerups: [],
    earnedHistory: [],
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

function normalizeEntityProductionTotals(savedTotals = {}) {
  return Object.fromEntries(
    entities.map((entity) => [entity.id, Math.max(0, Number(savedTotals?.[entity.id]) || 0)]),
  );
}

function normalizeEarnedHistory(savedHistory = []) {
  if (!Array.isArray(savedHistory)) {
    return [];
  }

  const normalized = savedHistory
    .map((sample) => ({
      at: Number(sample?.at),
      total: Number(sample?.total),
    }))
    .filter((sample) => Number.isFinite(sample.at) && Number.isFinite(sample.total))
    .sort((left, right) => left.at - right.at);

  const deduped = [];
  for (const sample of normalized) {
    const last = deduped[deduped.length - 1];
    if (last && last.at === sample.at) {
      last.total = sample.total;
      continue;
    }
    deduped.push(sample);
  }

  return deduped;
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

function getEntityUnitRate(entity) {
  return entity.baseRate * getGlobalMultiplier() * getPowerupMultiplier("entity", entity.id);
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

function getPromptFieldSpawnRate() {
  const liveTps = getDisplayedTokensPerSecond(Date.now());
  const scaled = PROMPT_FIELD_BASE_SPAWN_PER_SECOND + Math.log10(liveTps + 1) * 5.2;
  return clamp(scaled, PROMPT_FIELD_BASE_SPAWN_PER_SECOND, PROMPT_FIELD_MAX_SPAWN_PER_SECOND);
}

function addTokens(amount) {
  state.tokens += amount;
  state.totalEarned += amount;
}

function addPassiveTokens(elapsedSeconds) {
  if (elapsedSeconds <= 0) {
    return 0;
  }

  let totalGenerated = 0;
  for (const entity of entities) {
    const amount = getEntityRate(entity) * elapsedSeconds;
    if (amount <= 0) {
      continue;
    }
    state.entityProductionTotals[entity.id] += amount;
    totalGenerated += amount;
  }

  if (totalGenerated > 0) {
    addTokens(totalGenerated);
  }

  return totalGenerated;
}

function spawnPromptFieldShape() {
  if (!promptField.width || !promptField.height) {
    return;
  }

  const size = 8 + Math.random() * 18;
  const drift = (Math.random() - 0.5) * 16;
  const lateralWave = 0.3 + Math.random() * 0.9;
  const speed = 28 + Math.random() * 70;
  const rotationSpeed = (Math.random() - 0.5) * 1.2;

  const color = PROMPT_FIELD_COLORS[Math.floor(Math.random() * PROMPT_FIELD_COLORS.length)];
  const shapeType = PROMPT_FIELD_SHAPES[Math.floor(Math.random() * PROMPT_FIELD_SHAPES.length)];

  promptField.shapes.push({
    x: Math.random() * promptField.width,
    y: -20 - Math.random() * 80,
    size,
    speed,
    drift,
    waveAmplitude: 4 + Math.random() * 20,
    waveFrequency: lateralWave,
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed,
    alpha: 0.32 + Math.random() * 0.55,
    color,
    shape: shapeType,
    spriteKey: `${shapeType}:${color}`,
  });

  if (promptField.shapes.length > PROMPT_FIELD_MAX_SHAPES) {
    promptField.shapes.splice(0, promptField.shapes.length - PROMPT_FIELD_MAX_SHAPES);
  }
}

function getPromptFieldSprite(spriteKey) {
  const cached = promptField.sprites.get(spriteKey);
  if (cached) {
    return cached;
  }

  const [shapeType, color] = spriteKey.split(":");
  const size = 56;
  const center = size / 2;
  const radius = 12;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return null;
  }

  ctx.translate(center, center);
  ctx.strokeStyle = color;
  ctx.fillStyle = `${color}18`;
  ctx.lineWidth = 2.1;
  ctx.shadowColor = color;
  ctx.shadowBlur = 12;
  ctx.beginPath();
  if (shapeType === "triangle") {
    ctx.moveTo(0, -radius);
    ctx.lineTo(radius * 0.88, radius * 0.76);
    ctx.lineTo(-radius * 0.88, radius * 0.76);
    ctx.closePath();
  } else if (shapeType === "square") {
    ctx.rect(-radius * 0.72, -radius * 0.72, radius * 1.44, radius * 1.44);
  } else if (shapeType === "diamond") {
    ctx.moveTo(0, -radius);
    ctx.lineTo(radius * 0.9, 0);
    ctx.lineTo(0, radius);
    ctx.lineTo(-radius * 0.9, 0);
    ctx.closePath();
  } else if (shapeType === "circle") {
    ctx.arc(0, 0, radius * 0.8, 0, Math.PI * 2);
  } else {
    for (let index = 0; index < 6; index += 1) {
      const angle = (Math.PI / 3) * index - Math.PI / 6;
      const px = Math.cos(angle) * radius * 0.82;
      const py = Math.sin(angle) * radius * 0.82;
      if (index === 0) {
        ctx.moveTo(px, py);
      } else {
        ctx.lineTo(px, py);
      }
    }
    ctx.closePath();
  }
  ctx.stroke();
  ctx.fill();

  promptField.sprites.set(spriteKey, canvas);
  return canvas;
}

function drawPromptShape(ctx, shape, nowSeconds) {
  const sway = Math.sin(nowSeconds * shape.waveFrequency + shape.y * 0.02) * shape.waveAmplitude;
  const sprite = getPromptFieldSprite(shape.spriteKey);
  if (!sprite) {
    return;
  }

  const drawSize = shape.size * 2.2;
  ctx.save();
  ctx.translate(shape.x + sway, shape.y);
  ctx.rotate(shape.rotation);
  ctx.globalAlpha = shape.alpha;
  ctx.drawImage(sprite, -drawSize / 2, -drawSize / 2, drawSize, drawSize);
  ctx.restore();
}

function resizePromptField() {
  const canvas = elements.promptBackdrop;
  if (!(canvas instanceof HTMLCanvasElement)) {
    return;
  }

  const bounds = canvas.getBoundingClientRect();
  const width = Math.max(1, Math.floor(bounds.width));
  const height = Math.max(1, Math.floor(bounds.height));
  const dpr = Math.min(window.devicePixelRatio || 1, 1.25);

  if (promptField.width === width && promptField.height === height && promptField.dpr === dpr) {
    return;
  }

  promptField.width = width;
  promptField.height = height;
  promptField.dpr = dpr;
  promptField.lastRenderAt = null;
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    promptField.ctx = null;
    return;
  }
  promptField.ctx = ctx;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function renderPromptField(now) {
  const ctx = promptField.ctx;
  if (!ctx || !promptField.width || !promptField.height) {
    return;
  }

  if (promptField.lastRenderAt !== null && now - promptField.lastRenderAt < PROMPT_FIELD_RENDER_MS) {
    return;
  }
  promptField.lastRenderAt = now;

  const nowSeconds = now / 1000;
  const elapsedSeconds = promptField.lastTimestamp === null
    ? 1 / 60
    : Math.min(0.1, Math.max(0.001, (now - promptField.lastTimestamp) / 1000));
  promptField.lastTimestamp = now;
  promptField.ambientPhase += elapsedSeconds * 0.25;

  const spawnRate = getPromptFieldSpawnRate();
  promptField.spawnCarry += spawnRate * elapsedSeconds;
  while (promptField.spawnCarry >= 1) {
    promptField.spawnCarry -= 1;
    spawnPromptFieldShape();
  }

  ctx.clearRect(0, 0, promptField.width, promptField.height);

  const ambientGlow = ctx.createRadialGradient(
    promptField.width * 0.5,
    promptField.height * 0.48,
    promptField.width * 0.08,
    promptField.width * 0.5,
    promptField.height * 0.48,
    promptField.width * 0.5,
  );
  ambientGlow.addColorStop(0, "rgba(132, 215, 255, 0.12)");
  ambientGlow.addColorStop(0.4, "rgba(103, 125, 255, 0.08)");
  ambientGlow.addColorStop(1, "rgba(6, 10, 24, 0)");
  ctx.fillStyle = ambientGlow;
  ctx.fillRect(0, 0, promptField.width, promptField.height);

  ctx.strokeStyle = "rgba(128, 206, 255, 0.08)";
  ctx.lineWidth = 1;
  for (let index = 0; index < 3; index += 1) {
    const yBase = promptField.height * (0.2 + index * 0.16);
    ctx.beginPath();
    for (let x = -20; x <= promptField.width + 20; x += 24) {
      const y = yBase + Math.sin(x * 0.012 + nowSeconds * (0.6 + index * 0.08)) * (8 + index * 2.5);
      if (x === -20) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();
  }

  promptField.shapes = promptField.shapes.filter((shape) => shape.y < promptField.height + 36);
  for (const shape of promptField.shapes) {
    shape.y += shape.speed * elapsedSeconds;
    shape.x += shape.drift * elapsedSeconds;
    shape.rotation += shape.rotationSpeed * elapsedSeconds;
    shape.alpha = clamp(shape.alpha - elapsedSeconds * 0.012, 0.18, 1);
    drawPromptShape(ctx, shape, nowSeconds);
  }
}

function initializePromptField() {
  resizePromptField();
  promptField.shapes.length = 0;
  promptField.sprites.clear();
  promptField.spawnCarry = 0;
  promptField.lastTimestamp = null;
  promptField.lastRenderAt = null;
  for (let index = 0; index < 22; index += 1) {
    spawnPromptFieldShape();
    const shape = promptField.shapes[promptField.shapes.length - 1];
    if (!shape) {
      continue;
    }
    shape.y = Math.random() * promptField.height;
    shape.alpha = 0.22 + Math.random() * 0.4;
  }
}

function pruneEarnedHistory(now = Date.now()) {
  const cutoff = now - TOKEN_TREND_WINDOW_MS;
  if (!state.earnedHistory.length) {
    return;
  }

  let keepFrom = 0;
  while (
    keepFrom < state.earnedHistory.length - 1 &&
    state.earnedHistory[keepFrom + 1].at < cutoff
  ) {
    keepFrom += 1;
  }

  if (state.earnedHistory[keepFrom].at < cutoff) {
    state.earnedHistory = state.earnedHistory.slice(keepFrom);
    return;
  }

  state.earnedHistory = state.earnedHistory.filter((sample) => sample.at >= cutoff);
}

function ensureEarnedHistoryCoverage(now = Date.now()) {
  pruneEarnedHistory(now);
  const cutoff = now - TOKEN_TREND_WINDOW_MS;
  const first = state.earnedHistory[0];

  if (!first) {
    state.earnedHistory.push({ at: cutoff, total: state.totalEarned });
    return;
  }

  if (first.at > cutoff) {
    state.earnedHistory.unshift({ at: cutoff, total: first.total });
  }
}

function recordEarnedSample(now = Date.now(), force = false) {
  ensureEarnedHistoryCoverage(now);
  const last = state.earnedHistory[state.earnedHistory.length - 1];
  const sample = { at: now, total: state.totalEarned };

  if (!last) {
    state.earnedHistory.push(sample);
    return;
  }

  if (force) {
    if (now - last.at < TOKEN_TREND_SAMPLE_MS) {
      last.at = now;
      last.total = state.totalEarned;
    } else {
      state.earnedHistory.push(sample);
    }
    pruneEarnedHistory(now);
    return;
  }

  if (now - last.at >= TOKEN_TREND_SAMPLE_MS) {
    state.earnedHistory.push(sample);
    pruneEarnedHistory(now);
  }
}

function getTrendSeries(now = Date.now()) {
  const cutoff = now - TOKEN_TREND_WINDOW_MS;
  const history = [...state.earnedHistory];
  const lastSaved = history[history.length - 1];
  if (!lastSaved || lastSaved.at !== now) {
    history.push({ at: now, total: state.totalEarned });
  }

  let beforeCutoff = null;
  let afterCutoff = null;
  for (const sample of history) {
    if (sample.at <= cutoff) {
      beforeCutoff = sample;
    }
    if (!afterCutoff && sample.at >= cutoff) {
      afterCutoff = sample;
    }
  }

  let startTotal = state.totalEarned;
  if (beforeCutoff && afterCutoff && afterCutoff.at > beforeCutoff.at && beforeCutoff.at < cutoff) {
    const progress = (cutoff - beforeCutoff.at) / (afterCutoff.at - beforeCutoff.at);
    startTotal = beforeCutoff.total + (afterCutoff.total - beforeCutoff.total) * progress;
  } else if (beforeCutoff) {
    startTotal = beforeCutoff.total;
  } else if (afterCutoff) {
    startTotal = afterCutoff.total;
  }

  const series = [{ at: cutoff, total: startTotal }];
  for (const sample of history) {
    if (sample.at > cutoff && sample.at < now) {
      series.push(sample);
    }
  }

  const currentPoint = { at: now, total: state.totalEarned };
  const lastSeriesPoint = series[series.length - 1];
  if (lastSeriesPoint && lastSeriesPoint.at === currentPoint.at) {
    lastSeriesPoint.total = currentPoint.total;
  } else {
    series.push(currentPoint);
  }

  return series.map((sample) => ({
    at: sample.at,
    total: sample.total,
    produced: Math.max(0, sample.total - startTotal),
  }));
}

function getTotalAtTime(series, targetAt) {
  if (!series.length) {
    return state.totalEarned;
  }
  if (targetAt <= series[0].at) {
    return series[0].total;
  }

  for (let index = 1; index < series.length; index += 1) {
    const previous = series[index - 1];
    const current = series[index];
    if (targetAt > current.at) {
      continue;
    }
    if (current.at === previous.at) {
      return current.total;
    }
    const progress = (targetAt - previous.at) / (current.at - previous.at);
    return previous.total + (current.total - previous.total) * progress;
  }

  return series[series.length - 1].total;
}

function getTrendBuckets(now = Date.now()) {
  const series = getTrendSeries(now);
  const bucketCount = TOKEN_TREND_WINDOW_MS / TOKEN_TREND_BUCKET_MS;
  const currentBucketStart = Math.floor(now / TOKEN_TREND_BUCKET_MS) * TOKEN_TREND_BUCKET_MS;
  const firstBucketStart = currentBucketStart - (bucketCount - 1) * TOKEN_TREND_BUCKET_MS;
  const buckets = [];

  for (let index = 0; index < bucketCount; index += 1) {
    const startAt = firstBucketStart + index * TOKEN_TREND_BUCKET_MS;
    const isCurrentBucket = startAt === currentBucketStart;
    const endAt = isCurrentBucket ? now : startAt + TOKEN_TREND_BUCKET_MS;
    const startTotal = getTotalAtTime(series, startAt);
    const endTotal = getTotalAtTime(series, endAt);
    buckets.push({
      amount: Math.max(0, endTotal - startTotal),
      isCurrentBucket,
    });
  }

  return {
    buckets,
    producedNow: series[series.length - 1]?.produced || 0,
  };
}

function renderTokenTrend(force = false) {
  const now = Date.now();
  if (
    !force &&
    now - lastTrendRenderAt < TOKEN_TREND_RENDER_MS &&
    trendBarFills.length
  ) {
    return;
  }
  lastTrendRenderAt = now;
  const { buckets, producedNow } = getTrendBuckets(now);
  const maxBucketAmount = Math.max(...buckets.map((bucket) => bucket.amount), 0);
  const trendValueText = formatNumber(producedNow);
  if (elements.trendValue.textContent !== trendValueText) {
    elements.trendValue.textContent = trendValueText;
  }

  buckets.forEach((bucket, index) => {
    const view = trendBarFills[index];
    if (!view) {
      return;
    }
    const ratio = maxBucketAmount <= 0 ? 0 : bucket.amount / maxBucketAmount;
    const heightPercent = maxBucketAmount <= 0 ? 0 : Math.max(0.08, ratio) * 100;
    const height = bucket.amount > 0 ? `${heightPercent.toFixed(1)}%` : "2px";
    const isIdle = bucket.amount <= 0;
    const title = bucket.isCurrentBucket
      ? `${formatNumber(bucket.amount)} tokens in the current 10s slice`
      : `${formatNumber(bucket.amount)} tokens in this 10s slice`;

    if (view.height !== height) {
      view.height = height;
      view.fill.style.height = height;
    }
    if (view.isIdle !== isIdle) {
      view.isIdle = isIdle;
      view.bar.classList.toggle("is-idle", isIdle);
    }
    if (view.isCurrent !== bucket.isCurrentBucket) {
      view.isCurrent = bucket.isCurrentBucket;
      view.bar.classList.toggle("is-current", bucket.isCurrentBucket);
    }
    if (view.title !== title) {
      view.title = title;
      view.bar.title = title;
    }
  });
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

function createPowerupIcon(powerupId, className, interactive = false) {
  const icon = document.createElement(interactive ? "button" : "div");
  icon.className = `effect-icon ${className}`;
  if (interactive) {
    icon.type = "button";
    icon.classList.add("effect-icon-button");
    icon.setAttribute("aria-label", getPowerupTooltipText(getPowerupById(powerupId)).replace(/\n/g, ". "));
    icon.addEventListener("mouseenter", () => setHoveredPowerup(powerupId, icon));
    icon.addEventListener("focus", () => setHoveredPowerup(powerupId, icon));
    icon.addEventListener("mouseleave", () => clearHoveredPowerup(powerupId));
    icon.addEventListener("blur", () => clearHoveredPowerup(powerupId));
  }
  icon.innerHTML = POWERUP_ART[powerupId] || "";
  if (!interactive) {
    const powerup = getPowerupById(powerupId);
    if (powerup) {
      icon.title = `${powerup.name}: ${getPowerupEffectLabel(powerup)}`;
    }
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
    fragment.append(createPowerupIcon(powerupId, "effect-icon-small", true));
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
  playSound(sounds.buy);
  elements.saveStatus.textContent = `Purchased ${entity.name}.`;
  requestUIRender();
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
  playSound(sounds.upgrade);
  if (hoveredPowerupId === powerup.id) {
    hoveredPowerupId = null;
    hoveredPowerupAnchor = null;
    hidePowerupTooltip();
  }
  elements.saveStatus.textContent = `Powerup purchased: ${powerup.name}.`;
  requestUIRender();
}

function hidePowerupTooltip() {
  elements.powerupTooltip.hidden = true;
  elements.powerupHoverCost.classList.remove("is-affordable");
}

function hideEntityTooltip() {
  elements.entityTooltip.hidden = true;
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

function positionEntityTooltip() {
  if (elements.entityTooltip.hidden || !hoveredEntityAnchor) {
    return;
  }

  const margin = 10;
  const tooltip = elements.entityTooltip;
  const anchorRect = hoveredEntityAnchor.getBoundingClientRect();
  const tooltipWidth = tooltip.offsetWidth;
  const tooltipHeight = tooltip.offsetHeight;

  let left = anchorRect.left - tooltipWidth - 16;
  if (left < margin) {
    left = anchorRect.right + 16;
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
  if (hasPowerup(powerup.id)) {
    elements.powerupHoverCost.textContent = "Purchased · one-time boost active";
    elements.powerupHoverCost.classList.add("is-affordable");
  } else {
    elements.powerupHoverCost.textContent = `Cost: ${formatNumber(powerup.cost)} tokens${canAfford(powerup.cost) ? " · ready to buy" : ""}`;
    elements.powerupHoverCost.classList.toggle("is-affordable", canAfford(powerup.cost));
  }
  elements.powerupTooltip.hidden = false;
  positionPowerupTooltip();
}

function syncEntityTooltip() {
  const entity = hoveredEntityId ? getEntityById(hoveredEntityId) : null;
  const anchor = hoveredEntityAnchor;
  if (!entity || !anchor || anchor.hidden) {
    hideEntityTooltip();
    return;
  }

  const owned = state.entities[entity.id];
  const cost = getEntityCost(entity);
  const unitRate = getEntityUnitRate(entity);
  const totalRate = getEntityRate(entity);
  const passiveTotal = getTokensPerSecond();
  const share = passiveTotal > 0 ? (totalRate / passiveTotal) * 100 : 0;
  const lifetime = state.entityProductionTotals[entity.id] || 0;

  elements.entityHoverIcon.innerHTML = ENTITY_ART[entity.id] || "";
  elements.entityHoverName.textContent = entity.name;
  elements.entityHoverOwned.textContent = `owned: ${formatNumber(owned)}`;
  elements.entityHoverCost.textContent = formatNumber(cost);
  elements.entityHoverDescription.textContent = entity.description;
  elements.entityHoverUnitRate.textContent = `Each ${entity.name} produces ${formatNumber(unitRate)}/s`;
  elements.entityHoverTotalRate.textContent = owned
    ? `${formatNumber(owned)} producing ${formatNumber(totalRate)}/s (${share.toFixed(0)}% of passive TPS)`
    : `No ${entity.name} online yet`;
  elements.entityHoverLifetime.textContent = `${formatNumber(lifetime)} tokens produced so far`;
  elements.entityTooltip.hidden = false;
  positionEntityTooltip();
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

function setHoveredEntity(entityId, anchor) {
  const entityIndex = entities.findIndex((e) => e.id === entityId);
  if (entityIndex !== -1 && getEntityVisibility(entityIndex) !== "visible") {
    return;
  }
  hoveredEntityId = entityId;
  hoveredEntityAnchor = anchor;
  syncEntityTooltip();
}

function clearHoveredEntity(entityId) {
  if (hoveredEntityId !== entityId) {
    return;
  }
  hoveredEntityId = null;
  hoveredEntityAnchor = null;
  hideEntityTooltip();
}

function spawnPromptFloatLabel(gain) {
  const stage = elements.promptButton.closest(".prompt-stage");
  if (!stage) return;
  const stageRect = stage.getBoundingClientRect();
  const btnRect = elements.promptButton.getBoundingClientRect();

  const label = document.createElement("span");
  label.className = "prompt-float-label";
  label.textContent = `+${formatNumber(gain)}`;

  const x = btnRect.left - stageRect.left + btnRect.width * 0.3;
  const y = btnRect.top - stageRect.top + btnRect.height * 0.15;
  label.style.left = `${x}px`;
  label.style.top = `${y}px`;
  label.style.transform = "translate(-50%, -50%)";

  stage.append(label);
  label.addEventListener("animationend", () => label.remove(), { once: true });
}

const BURST_SYMBOLS = ["▲", "◆", "○", "◻", "#", "{}", "<>", "01", "∑", "λ", "⬡", "✦", "⊕", "//", "AI"];
const BURST_COLORS = ["#60d0ff", "#a080ff", "#ff80d0", "#80ffcc", "#ffd060", "#ff6080", "#80c0ff", "#c0ff80"];

function spawnClickBurst() {
  const stage = elements.promptButton.closest(".prompt-stage");
  if (!stage) return;
  const stageRect = stage.getBoundingClientRect();
  const btnRect = elements.promptButton.getBoundingClientRect();
  const cx = btnRect.left - stageRect.left + btnRect.width / 2;
  const cy = btnRect.top - stageRect.top + btnRect.height / 2;

  const count = 10 + Math.floor(Math.random() * 6);
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
    const dist = 55 + Math.random() * 45;
    const bx = Math.cos(angle) * dist;
    const by = Math.sin(angle) * dist;
    const symbol = BURST_SYMBOLS[Math.floor(Math.random() * BURST_SYMBOLS.length)];
    const color = BURST_COLORS[Math.floor(Math.random() * BURST_COLORS.length)];
    const delay = Math.random() * 80;
    const size = 0.8 + Math.random() * 0.7;

    const el = document.createElement("span");
    el.className = "chip-burst";
    el.textContent = symbol;
    el.style.left = `${cx}px`;
    el.style.top = `${cy}px`;
    el.style.color = color;
    el.style.fontSize = `${size}rem`;
    el.style.textShadow = `0 0 8px ${color}`;
    el.style.setProperty("--bx", `${bx}px`);
    el.style.setProperty("--by", `${by}px`);
    el.style.animationDelay = `${delay}ms`;
    el.style.animationDuration = `${0.6 + Math.random() * 0.3}s`;
    stage.append(el);
    el.addEventListener("animationend", () => el.remove(), { once: true });
  }
}

function runManualPrompt() {
  const now = Date.now();
  const gain = getManualYield();
  state.manualPrompts += 1;
  addTokens(gain);
  recentManualPrompts.push({ at: now, amount: gain });
  pruneRecentManualPrompts(now);
  spawnPromptFloatLabel(gain);
  spawnClickBurst();
  playSound(sounds.tick);
  elements.promptButton.classList.add("is-pressed");
  window.setTimeout(() => {
    elements.promptButton.classList.remove("is-pressed");
  }, 90);
  requestUIRender();
}

function renderHeader() {
  const now = Date.now();
  const nextHeader = {
    tps: `${formatFullNumber(getDisplayedTokensPerSecond(now))}`,
    manualYield: formatNumber(getManualYield()),
    prompts: formatNumber(state.manualPrompts),
    earned: formatNumber(state.totalEarned),
  };

  if (headerView.tps !== nextHeader.tps) {
    headerView.tps = nextHeader.tps;
    elements.tpsCount.textContent = nextHeader.tps;
  }
  if (headerView.manualYield !== nextHeader.manualYield) {
    headerView.manualYield = nextHeader.manualYield;
    elements.manualYield.textContent = nextHeader.manualYield;
  }
  if (headerView.prompts !== nextHeader.prompts) {
    headerView.prompts = nextHeader.prompts;
    elements.promptCount.textContent = nextHeader.prompts;
  }
  if (headerView.earned !== nextHeader.earned) {
    headerView.earned = nextHeader.earned;
    elements.earnedCount.textContent = nextHeader.earned;
  }
}

function getEntityVisibility(entityIndex) {
  let firstUnowned = entities.length;
  for (let i = 0; i < entities.length; i++) {
    if (!state.entities[entities[i].id]) {
      firstUnowned = i;
      break;
    }
  }
  if (entityIndex <= firstUnowned) return "visible";
  if (entityIndex <= firstUnowned + 2) return "mystery";
  return "hidden";
}

function initializeEntities() {
  elements.entityList.replaceChildren();
  entityViews.clear();

  for (const entity of entities) {
    const owned = state.entities[entity.id];

    const card = document.createElement("article");
    card.className = "entity-card";
    card.tabIndex = 0;
    card.addEventListener("mouseenter", () => setHoveredEntity(entity.id, card));
    card.addEventListener("focus", () => setHoveredEntity(entity.id, card));
    card.addEventListener("mouseleave", () => clearHoveredEntity(entity.id));
    card.addEventListener("blur", () => clearHoveredEntity(entity.id));

    const thumb = document.createElement("div");
    thumb.className = "entity-thumb";
    thumb.append(createArtSprite(entity.id, "card-sprite"));

    const mysteryThumb = document.createElement("div");
    mysteryThumb.className = "mystery-thumb";
    mysteryThumb.textContent = "?";
    thumb.append(mysteryThumb);

    const copy = document.createElement("div");
    copy.className = "entity-copy";

    const titleRow = document.createElement("div");
    titleRow.className = "entity-title-row";

    const title = document.createElement("h3");
    title.textContent = entity.name;

    const mysteryTitle = document.createElement("h3");
    mysteryTitle.className = "mystery-name";
    mysteryTitle.textContent = "???";

    const ownedLabel = document.createElement("span");
    ownedLabel.className = "entity-owned";
    ownedLabel.textContent = formatNumber(owned);
    titleRow.append(title, mysteryTitle);

    const subline = document.createElement("p");
    subline.className = "entity-subline";
    const costLabel = document.createElement("span");
    costLabel.className = "entity-cost";
    subline.append(costLabel);

    const button = document.createElement("button");
    button.className = "buy-button entity-buy";
    button.type = "button";
    button.textContent = "Buy";
    button.addEventListener("click", () => buyEntity(entity.id));

    copy.append(titleRow, subline);
    card.append(thumb, copy, ownedLabel, button);
    elements.entityList.append(card);

    entityViews.set(entity.id, {
      card,
      ownedLabel,
      costLabel,
      button,
      ownedText: ownedLabel.textContent,
      costText: "",
      canAfford: null,
      visibility: null,
    });
  }
}

function initializeScenes() {
  elements.sceneList.replaceChildren();
  sceneViews.clear();

  for (const entity of entities) {
    const row = document.createElement("article");
    row.className = "scene-row";
    row.hidden = true;

    const header = document.createElement("div");
    header.className = "scene-row-header";

    const title = document.createElement("div");
    title.className = "scene-row-title";
    const titleMain = document.createElement("div");
    titleMain.className = "scene-row-title-main";
    const label = document.createElement("span");
    label.textContent = entity.name;
    titleMain.append(createArtSprite(entity.id, "row-sprite"), label);
    title.append(titleMain);

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
      row,
      count,
      lane,
      renderedOwned: -1,
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
      visible: null,
      affordable: null,
    });
  }
}

function initializeTrendBars() {
  elements.trendBars.replaceChildren();
  trendBarFills.length = 0;

  const bucketCount = TOKEN_TREND_WINDOW_MS / TOKEN_TREND_BUCKET_MS;
  for (let index = 0; index < bucketCount; index += 1) {
    const bar = document.createElement("div");
    bar.className = "trend-bar is-idle";

    const fill = document.createElement("div");
    fill.className = "trend-bar-fill";
    fill.style.height = "2px";

    bar.append(fill);
    elements.trendBars.append(bar);
    trendBarFills.push({
      bar,
      fill,
      height: "2px",
      isIdle: true,
      isCurrent: false,
      title: "",
    });
  }
}

function renderEntities() {
  for (let i = 0; i < entities.length; i++) {
    const entity = entities[i];
    const view = entityViews.get(entity.id);
    if (!view) {
      continue;
    }

    const visibility = getEntityVisibility(i);
    if (view.visibility !== visibility) {
      view.visibility = visibility;
      view.card.classList.toggle("is-hidden", visibility === "hidden");
      view.card.classList.toggle("is-mystery", visibility === "mystery");
    }

    if (visibility === "hidden") {
      continue;
    }

    const cost = getEntityCost(entity);
    const owned = state.entities[entity.id];
    const ownedText = formatNumber(owned);
    const costText = formatNumber(cost);
    const canBuy = visibility === "visible" && canAfford(cost);

    if (view.ownedText !== ownedText) {
      view.ownedText = ownedText;
      view.ownedLabel.textContent = ownedText;
    }
    if (view.costText !== costText) {
      view.costText = costText;
      view.costLabel.innerHTML = `<span class="token-icon"></span>${costText}`;
    }
    if (view.canAfford !== canBuy) {
      view.canAfford = canBuy;
      view.card.classList.toggle("is-affordable", canBuy);
      view.card.classList.toggle("is-blocked", !canBuy);
      view.button.disabled = !canBuy;
    }
  }
  syncEntityTooltip();
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
    view.row.hidden = !owned;

    if (!owned) {
      view.lane.replaceChildren();
      continue;
    }

    view.count.textContent = `${formatNumber(owned)} owned`;
    view.lane.replaceChildren();

    const fragment = document.createDocumentFragment();
    for (let index = 0; index < owned; index += 1) {
      fragment.append(createArtSprite(entity.id, "scene-sprite"));
    }
    view.lane.append(fragment);
  }
}

function renderOwnedPowerups() {
  const purchasedPowerupIds = getPurchasedPowerups().map((powerup) => powerup.id);
  updateIconRail(elements.ownedPowerupIcons, purchasedPowerupIds, ownedPowerupView, true);
}

function renderPowerups() {
  let visibleCount = 0;
  for (const powerup of powerups) {
    const view = powerupViews.get(powerup.id);
    if (!view) {
      continue;
    }

    const visible = !hasPowerup(powerup.id) && powerup.unlocks(state);
    if (view.visible !== visible) {
      view.visible = visible;
      view.button.hidden = !visible;
      if (!visible) {
        view.affordable = null;
      }
    }
    if (!visible) {
      continue;
    }

    visibleCount += 1;
    const affordable = canAfford(powerup.cost);
    if (view.affordable !== affordable) {
      view.affordable = affordable;
      view.button.classList.toggle("is-affordable", affordable);
      view.button.classList.toggle("is-blocked", !affordable);
      view.button.setAttribute("aria-disabled", affordable ? "false" : "true");
    }
  }

  elements.powerupList.hidden = visibleCount === 0;
  syncPowerupTooltip();
}

function render() {
  renderHeader();
  renderTokenTrend();
  renderOwnedPowerups();
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
    state.entityProductionTotals = normalizeEntityProductionTotals(parsed.entityProductionTotals || {});
    state.purchasedPowerups = Array.isArray(parsed.purchasedPowerups)
      ? [...new Set(parsed.purchasedPowerups.filter((id) => !!getPowerupById(id)))]
      : [];
    state.earnedHistory = normalizeEarnedHistory(parsed.earnedHistory);

    let loadMessage = normalized.migrated ? "Migrated your save to the new producer lineup." : "";
    const now = Date.now();
    const elapsedSeconds = Math.min(
      MAX_OFFLINE_SECONDS,
      Math.max(0, (now - (Number(parsed.lastTimestamp) || now)) / 1000),
    );
    if (elapsedSeconds > 1) {
      const offlineGain = addPassiveTokens(elapsedSeconds);
      if (offlineGain > 0) {
        loadMessage = `Recovered ${formatNumber(offlineGain)} tokens while you were away.`;
      }
    }

    recordEarnedSample(now, true);

    if (loadMessage) {
      elements.saveStatus.textContent = loadMessage;
    }
    requestUIRender();
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
  ownedPowerupView.powerupSignature = "__init__";
  hoveredPowerupId = null;
  hoveredPowerupAnchor = null;
  hoveredEntityId = null;
  hoveredEntityAnchor = null;
  lastTrendRenderAt = 0;
  lastUIRenderAt = 0;
  promptField.shapes.length = 0;
  promptField.spawnCarry = 0;
  promptField.lastTimestamp = null;
  recordEarnedSample(Date.now(), true);
  hidePowerupTooltip();
  hideEntityTooltip();
  initializePromptField();
  localStorage.removeItem(STORAGE_KEY);
  elements.saveStatus.textContent = "Save wiped. Back to manual prompting.";
  render();
  lastUIRenderAt = performance.now();
  renderDirty = false;
  showIntroModal();
}

function bindEvents() {
  elements.promptButton.addEventListener("click", runManualPrompt);
  elements.saveButton.addEventListener("click", () => saveGame());
  elements.resetButton.addEventListener("click", resetGame);

  if (location.hostname === "localhost" || location.hostname === "127.0.0.1" || location.protocol === "file:") {
    document.querySelector("#debugActions").hidden = false;
    document.querySelector("#debug1M").addEventListener("click", () => { addTokens(1_000_000); requestUIRender(); });
    document.querySelector("#debug100M").addEventListener("click", () => { addTokens(100_000_000); requestUIRender(); });
  }
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
  window.addEventListener("resize", resizePromptField);
  window.addEventListener("resize", syncPowerupTooltip);
  window.addEventListener("resize", syncEntityTooltip);
  window.addEventListener("scroll", syncPowerupTooltip, { passive: true });
  window.addEventListener("scroll", syncEntityTooltip, { passive: true });
}

// Game logic tick — runs via setInterval so it continues in background tabs.
let lastLogicAt = performance.now();
function logicTick() {
  const now = performance.now();
  const elapsedSeconds = Math.min(5, Math.max(0, (now - lastLogicAt) / 1000));
  lastLogicAt = now;
  addPassiveTokens(elapsedSeconds);
  const wallClockNow = Date.now();
  const lastSample = state.earnedHistory[state.earnedHistory.length - 1];
  if (!lastSample || wallClockNow - lastSample.at >= TOKEN_TREND_SAMPLE_MS) {
    recordEarnedSample(wallClockNow);
  }
  if (wallClockNow - state.lastSaveAt >= SAVE_INTERVAL_MS) {
    saveGame("Autosaved.");
  }
  requestUIRender();
}

// Render tick — runs via rAF for smooth visuals when the tab is active.
function tick(now) {
  renderPromptField(now);

  const displayTokens = state.tokens + getTokensPerSecond() * ((now - lastLogicAt) / 1000);
  const { main: tokenMain, unit: tokenUnit } = formatTokenDisplay(displayTokens);
  const tokenText = tokenUnit ? `${tokenMain}|${tokenUnit}` : tokenMain;
  if (headerView.tokens !== tokenText) {
    headerView.tokens = tokenText;
    if (tokenUnit) {
      elements.tokenCount.innerHTML = `<span class="token-main">${tokenMain}</span><span class="token-unit">${tokenUnit}</span>`;
    } else {
      elements.tokenCount.textContent = tokenMain;
    }
    document.title = tokenUnit ? `${tokenMain} ${tokenUnit} tokens — Token Clicker` : `${tokenMain} tokens — Token Clicker`;
  }

  if (renderDirty || now - lastUIRenderAt >= UI_RENDER_MS) {
    render();
    lastUIRenderAt = now;
    renderDirty = false;
  }

  window.requestAnimationFrame(tick);
}

loadGame();
recordEarnedSample(Date.now(), true);
initializeEntities();
initializeScenes();
initializePowerups();
initializeTrendBars();
initializePromptField();
bindEvents();
initNewsTicker();

function showIntroModal() {
  const introModal = document.getElementById("introModal");
  const introButton = document.getElementById("introButton");
  introModal.hidden = false;
  introButton.addEventListener("click", () => { introModal.hidden = true; }, { once: true });
}

if (state.totalEarned === 0 && state.manualPrompts === 0) {
  showIntroModal();
}
renderTokenTrend(true);
render();
lastUIRenderAt = performance.now();
renderDirty = false;
lastLogicAt = performance.now();
setInterval(logicTick, 1000);
window.requestAnimationFrame(tick);
