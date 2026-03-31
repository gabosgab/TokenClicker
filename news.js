// Edit this file to add/change news ticker headlines.
// Structure: array of buckets, each with a condition and tweets array.
// Condition types:
//   { condition: "tps", min: N, max: N }        — matches when TPS is in range (min/max optional)
//   { condition: "totalOver", threshold: N }    — matches when total tokens earned >= N
//   { condition: "entityOwned", entity: "id", min: N } — matches when entity count >= N (min defaults to 1)
//   { condition: "powerupOwned", powerup: "id" } — matches when powerup is purchased
//   { condition: "always" }                      — always eligible
// Accounts: inferencewatch, aibro, normalperson_, guberment, dailynews, fuxnews, fakellon, vcman, nveedia
const NEWS_DATA = [
  {
    condition: "tps",
    max: 0,
    tweets: [
      { account: "normalperson_", text: "what is even happening" },
      { account: "fuxnews", text: "My grandson showed me this. I don't see the point." },
      { account: "guberment", text: "I've asked my staff to look into these 'tokens.' We'll circle back." },
    ],
  },
  {
    condition: "tps",
    min: 1,
    max: 9,
    tweets: [
      { account: "inferencewatch", text: "Running inference on desktop silicon. Bold strategy." },
      { account: "normalperson_", text: "he bought a computer to make fake numbers go up" },
      { account: "nveedia", text: "We appreciate your business. Mac Studios were not one of our products." },
      { account: "aibro", text: "single digit tps. humble beginnings. respect the grind 🙏" },
    ],
  },
  {
    condition: "tps",
    min: 10,
    max: 99,
    tweets: [
      { account: "aibro", text: "small cluster energy but the dream is there 🙏" },
      { account: "vcman", text: "Early days. We're watching." },
      { account: "guberment", text: "I've been told this uses electricity. We're looking into it." },
      { account: "dailynews", text: "Local operation achieves double-digit token throughput. What does it mean for Main Street?" },
    ],
  },
  {
    condition: "tps",
    min: 100,
    max: 999,
    tweets: [
      { account: "inferencewatch", text: "Three-digit throughput. The institutional phase begins." },
      { account: "aibro", text: "triple digits LETS GO 📈" },
      { account: "dailynews", text: "Token velocity hits triple digits. Experts are 'cautiously optimistic' and 'extremely worried.'" },
      { account: "fuxnews", text: "Hundreds of tokens per second. Is this what they mean by 'the cloud'?" },
    ],
  },
  {
    condition: "tps",
    min: 1000,
    max: 9999,
    tweets: [
      { account: "aibro", text: "four digits per second. we are SO back 🔥" },
      { account: "nveedia", text: "We see strong demand in the token clicking vertical." },
      { account: "fakellon", text: "This is basically what xAI does but with better branding" },
      { account: "inferencewatch", text: "Four-figure throughput achieved. Maintaining 'grudging respect' outlook." },
    ],
  },
  {
    condition: "tps",
    min: 10000,
    max: 99999,
    tweets: [
      { account: "inferencewatch", text: "Five-figure throughput. We've updated our models. They're still confused." },
      { account: "vcman", text: "Incredible unit economics. What's the exit?" },
      { account: "guberment", text: "This is either great or terrible for America. Possibly both. We'll schedule a hearing." },
      { account: "fakellon", text: "I could acquire this for $44 billion but I'm busy" },
      { account: "aibro", text: "five figures. this is what we trained for 💪" },
    ],
  },
  {
    condition: "tps",
    min: 100000,
    tweets: [
      { account: "fakellon", text: "I would have built this for $4" },
      { account: "nveedia", text: "GPU sales up. We take no position on what they're being used for." },
      { account: "aibro", text: "we are no longer operating at human scale 🤖" },
      { account: "normalperson_", text: "a hundred thousand tokens a second. for what. FOR WHAT." },
      { account: "vcman", text: "At this scale we're not talking Series A. We're talking infrastructure play." },
    ],
  },
  {
    condition: "entityOwned",
    entity: "nvl72",
    min: 1,
    tweets: [
      { account: "inferencewatch", text: "NVL72 acquisition confirmed. Rack-scale throughput now in play." },
      { account: "vcman", text: "NVL72 in the stack. We'd like to get you in a room." },
      { account: "nveedia", text: "GB200 NVL72: exactly what we imagined. Not like this, but we'll take it." },
    ],
  },
  {
    condition: "entityOwned",
    entity: "spiking",
    min: 1,
    tweets: [
      { account: "dailynews", text: "Local operator pivots to neuromorphic computing. Experts divided on whether that's good." },
      { account: "fuxnews", text: "Neuromorphic? In my day we just called it a brain." },
      { account: "guberment", text: "We don't know what neuromorphic means but we're prepared to regulate it." },
    ],
  },
  {
    condition: "entityOwned",
    entity: "dyson",
    min: 1,
    tweets: [
      { account: "aibro", text: "DYSON SWARM. WE ARE IN SPACE. 🛸🔥" },
      { account: "fakellon", text: "Orbital compute infrastructure. I tried to buy this but the auction was closed." },
      { account: "inferencewatch", text: "Client has achieved post-planetary scale. We have no framework for this." },
      { account: "guberment", text: "I have been informed they are doing AI in space now. I've called a press conference." },
    ],
  },
  {
    condition: "totalOver",
    threshold: 1000,
    tweets: [
      { account: "guberment", text: "A thousand tokens. That's... something. We think." },
      { account: "normalperson_", text: "ok so we have a thousand of these now" },
    ],
  },
  {
    condition: "totalOver",
    threshold: 1000000,
    tweets: [
      { account: "inferencewatch", text: "Seven-figure cumulative output. The ledger is becoming meaningful." },
      { account: "vcman", text: "Million token milestone. Series A conversation?" },
      { account: "normalperson_", text: "a million of them. a million." },
    ],
  },
  {
    condition: "totalOver",
    threshold: 1000000000,
    tweets: [
      { account: "fakellon", text: "A billion tokens. This is what I imagined when I bought Twitter." },
      { account: "nveedia", text: "Billion-token throughput is exactly what our roadmap was designed for." },
      { account: "aibro", text: "BILLION. WE ARE BUILT DIFFERENT. 🐉" },
    ],
  },
  {
    condition: "always",
    tweets: [
      { account: "normalperson_", text: "I don't know what any of this means" },
      { account: "dailynews", text: "AI: friend or foe? We take no position at this time." },
      { account: "fuxnews", text: "Token Clicker: Is it safe? Our panel of four 70-year-olds weighs in." },
      { account: "vcman", text: "Scaling laws + tokens + vibes = thesis" },
      { account: "guberment", text: "We support innovation. We also support accountability. We'll get back to you on which applies here." },
      { account: "dailynews", text: "The technology that will save us. The technology that will destroy us. Developing." },
      { account: "fuxnews", text: "Token: not the kind we had in our day." },
      { account: "fakellon", text: "The simulation is producing tokens. As expected." },
      { account: "inferencewatch", text: "Token output continues to scale. The underlying asset remains vibes." },
    ],
  },
];

const NEWS_ACCOUNT_ART = {
  inferencewatch: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="32" height="32" fill="#4338ca"/>
    <path d="M6 32 Q6 21 16 21 Q26 21 26 32Z" fill="#1e3a5f"/>
    <path d="M14 21 L16 24 L18 21" fill="#f0f0f0"/>
    <polygon points="15.5,24 16.5,24 17,28 16,30 15,28" fill="#ef4444"/>
    <circle cx="16" cy="13" r="7" fill="#f5cba7"/>
    <path d="M9 12 C9.5 5 22.5 5 23 12 C21 7 11 7 9 12Z" fill="#1a1a1a"/>
    <rect x="10" y="11.5" width="5" height="3.5" rx="1.5" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
    <rect x="17" y="11.5" width="5" height="3.5" rx="1.5" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
    <line x1="15" y1="13.2" x2="17" y2="13.2" stroke="#1a1a1a" stroke-width="1"/>
    <circle cx="12.5" cy="13.2" r="1" fill="#333"/>
    <circle cx="19.5" cy="13.2" r="1" fill="#333"/>
    <line x1="14" y1="17" x2="18" y2="17" stroke="#c4956a" stroke-width="1.3" stroke-linecap="round"/>
  </svg>`,

  aibro: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="32" height="32" fill="#d97706"/>
    <path d="M6 32 Q6 21 16 21 Q26 21 26 32Z" fill="#374151"/>
    <line x1="14" y1="21" x2="13" y2="26" stroke="#4b5563" stroke-width="1.2"/>
    <line x1="18" y1="21" x2="19" y2="26" stroke="#4b5563" stroke-width="1.2"/>
    <circle cx="16" cy="13" r="7" fill="#f5cba7"/>
    <path d="M9 12 C9 5 23 5 23 12 C20 6 12 6 9 12Z" fill="#8b6914"/>
    <rect x="9.5" y="11" width="5.5" height="3.5" rx="1.5" fill="#111827"/>
    <rect x="17" y="11" width="5.5" height="3.5" rx="1.5" fill="#111827"/>
    <line x1="15" y1="12.7" x2="17" y2="12.7" stroke="#374151" stroke-width="1.2"/>
    <path d="M14 17.5 Q17 19.5 19 17.5" fill="none" stroke="#c4956a" stroke-width="1.3" stroke-linecap="round"/>
  </svg>`,

  normalperson_: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="32" height="32" fill="#6b7280"/>
    <path d="M6 32 Q6 21 16 21 Q26 21 26 32Z" fill="#9ca3af"/>
    <circle cx="16" cy="13" r="7" fill="#f5cba7"/>
    <path d="M9 12 C9 5.5 23 5.5 23 12 C21 7 11 7 9 12Z" fill="#7c5c2e"/>
    <path d="M12 10.5 Q13.5 9.2 15 10.5" fill="none" stroke="#5a3e1b" stroke-width="1.2" stroke-linecap="round"/>
    <path d="M17 10.5 Q18.5 9.2 20 10.5" fill="none" stroke="#5a3e1b" stroke-width="1.2" stroke-linecap="round"/>
    <circle cx="13.5" cy="13.5" r="2" fill="white"/>
    <circle cx="13.5" cy="13.5" r="1.1" fill="#4a3728"/>
    <circle cx="18.5" cy="13.5" r="2" fill="white"/>
    <circle cx="18.5" cy="13.5" r="1.1" fill="#4a3728"/>
    <ellipse cx="16" cy="17.5" rx="1.8" ry="1.4" fill="#8b4513"/>
  </svg>`,

  guberment: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="32" height="32" fill="#dc2626"/>
    <path d="M6 32 Q6 21 16 21 Q26 21 26 32Z" fill="#1e3a8a"/>
    <path d="M14.5 21 L16 24.5 L17.5 21" fill="#f8fafc"/>
    <circle cx="16" cy="13" r="7" fill="#f5cba7"/>
    <path d="M9 12 C9 5 23 5 23 12 C21 7 11 7 9 12Z" fill="#9ca3af"/>
    <rect x="11" y="10" width="4.5" height="1.5" rx="0.7" fill="#6b7280"/>
    <rect x="16.5" y="10" width="4.5" height="1.5" rx="0.7" fill="#6b7280"/>
    <circle cx="13" cy="13.5" r="1.5" fill="#1d4ed8"/>
    <circle cx="19" cy="13.5" r="1.5" fill="#1d4ed8"/>
    <path d="M12.5 17 Q16 20 19.5 17" fill="none" stroke="#c4956a" stroke-width="1.4" stroke-linecap="round"/>
    <rect x="18" y="22" width="3.5" height="2.2" rx="0.3" fill="#ef4444"/>
    <rect x="18" y="22" width="3.5" height="0.7" fill="#fca5a5"/>
    <rect x="18" y="22.7" width="3.5" height="0.8" fill="#ef4444"/>
    <rect x="18" y="22" width="1.4" height="1.1" fill="#1d4ed8"/>
  </svg>`,

  dailynews: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="32" height="32" fill="#0ea5e9"/>
    <rect x="4" y="5" width="24" height="22" rx="2.5" fill="#f8fafc"/>
    <rect x="4" y="5" width="24" height="5" rx="2.5" fill="#0f172a"/>
    <rect x="4" y="8" width="24" height="2" fill="#0f172a"/>
    <rect x="6" y="12" width="20" height="2.5" rx="1" fill="#0f172a"/>
    <rect x="6" y="16" width="12" height="1.5" rx="0.7" fill="#94a3b8"/>
    <rect x="6" y="18.5" width="14" height="1.5" rx="0.7" fill="#94a3b8"/>
    <rect x="20" y="16" width="6" height="6" rx="1" fill="#bae6fd"/>
    <rect x="4" y="23" width="24" height="4" fill="#dc2626"/>
    <rect x="4" y="25" width="24" height="2" rx="0 0 2.5 2.5" fill="#b91c1c"/>
  </svg>`,

  fuxnews: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="32" height="32" fill="#b45309"/>
    <rect x="3" y="5" width="26" height="18" rx="3" fill="#292524"/>
    <rect x="5" y="7" width="22" height="14" rx="1.5" fill="#1e3a5f"/>
    <circle cx="16" cy="13.5" r="5" fill="#f5cba7"/>
    <path d="M11 12.5 C11.5 7.5 20.5 7.5 21 12.5 C20 9 12 9 11 12.5Z" fill="#e2e8f0"/>
    <circle cx="14" cy="13.5" r="1" fill="#333"/>
    <circle cx="18" cy="13.5" r="1" fill="#333"/>
    <line x1="14" y1="16.5" x2="18" y2="16.5" stroke="#c4956a" stroke-width="1" stroke-linecap="round"/>
    <rect x="5" y="19" width="22" height="2" fill="#dc2626"/>
    <rect x="13" y="23" width="6" height="2" rx="1" fill="#3d3534"/>
    <rect x="10" y="25" width="12" height="2" rx="1" fill="#292524"/>
    <line x1="11" y1="5" x2="9" y2="1" stroke="#78716c" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="21" y1="5" x2="23" y2="1" stroke="#78716c" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`,

  fakellon: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="32" height="32" fill="#1d4ed8"/>
    <path d="M6 32 Q6 21 16 21 Q26 21 26 32Z" fill="#0f172a"/>
    <ellipse cx="16" cy="13.5" rx="7" ry="7.5" fill="#f5cba7"/>
    <path d="M9.5 11.5 C10 4 22 4 22.5 11.5 C21 7 11 7 9.5 11.5Z" fill="#1a1a1a"/>
    <path d="M12 9.5 Q14 8.5 15.5 9.5" fill="none" stroke="#2d2d2d" stroke-width="1.2" stroke-linecap="round"/>
    <path d="M16.5 9 Q18.5 8 20 9.2" fill="none" stroke="#2d2d2d" stroke-width="1.2" stroke-linecap="round"/>
    <ellipse cx="13.5" cy="13" rx="1.8" ry="1.3" fill="#1e293b"/>
    <ellipse cx="18.5" cy="13" rx="1.8" ry="1.3" fill="#1e293b"/>
    <path d="M13 17.5 Q15 18.5 19 17" fill="none" stroke="#c4956a" stroke-width="1.3" stroke-linecap="round"/>
    <line x1="14.5" y1="23" x2="17.5" y2="27" stroke="#93c5fd" stroke-width="1.8" stroke-linecap="round"/>
    <line x1="17.5" y1="23" x2="14.5" y2="27" stroke="#93c5fd" stroke-width="1.8" stroke-linecap="round"/>
  </svg>`,

  vcman: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="32" height="32" fill="#7c3aed"/>
    <path d="M6 32 Q6 21 16 21 Q26 21 26 32Z" fill="#0f172a"/>
    <path d="M13.5 21 L16 25.5 L18.5 21" fill="#1e293b"/>
    <circle cx="16" cy="13" r="7" fill="#f5cba7"/>
    <path d="M9 12 C9 5 23 5 23 12 C20 6 12 6 9 12Z" fill="#1a1a1a"/>
    <ellipse cx="13" cy="13" rx="1.8" ry="1.5" fill="#1e293b"/>
    <ellipse cx="19" cy="13" rx="1.8" ry="1.5" fill="#1e293b"/>
    <path d="M12 16.5 Q16 20.5 20 16.5" fill="none" stroke="#c4956a" stroke-width="1.4" stroke-linecap="round"/>
    <circle cx="23.5" cy="22.5" r="4" fill="#d97706"/>
    <line x1="23.5" y1="20" x2="23.5" y2="25" stroke="#7c3aed" stroke-width="1.2"/>
    <path d="M21.7 21.5 Q23.5 20.5 25.3 21.5" fill="none" stroke="#7c3aed" stroke-width="1"/>
    <path d="M21.7 23.5 Q23.5 24.5 25.3 23.5" fill="none" stroke="#7c3aed" stroke-width="1"/>
  </svg>`,

  nveedia: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="32" height="32" fill="#15803d"/>
    <rect x="8" y="8" width="16" height="16" rx="2" fill="#0f172a"/>
    <rect x="11" y="11" width="10" height="10" rx="1" fill="#052e16"/>
    <line x1="11" y1="14.3" x2="21" y2="14.3" stroke="#22c55e" stroke-width="0.8" opacity="0.8"/>
    <line x1="11" y1="17" x2="21" y2="17" stroke="#22c55e" stroke-width="0.8" opacity="0.8"/>
    <line x1="14.3" y1="11" x2="14.3" y2="21" stroke="#22c55e" stroke-width="0.8" opacity="0.8"/>
    <line x1="17" y1="11" x2="17" y2="21" stroke="#22c55e" stroke-width="0.8" opacity="0.8"/>
    <rect x="14" y="14" width="4" height="4" rx="0.5" fill="#4ade80"/>
    <rect x="14.5" y="14.5" width="3" height="3" rx="0.3" fill="#86efac"/>
    <rect x="6" y="10" width="2" height="1.5" rx="0.3" fill="#374151"/>
    <rect x="6" y="13.3" width="2" height="1.5" rx="0.3" fill="#374151"/>
    <rect x="6" y="16.5" width="2" height="1.5" rx="0.3" fill="#374151"/>
    <rect x="6" y="19.5" width="2" height="1.5" rx="0.3" fill="#374151"/>
    <rect x="24" y="10" width="2" height="1.5" rx="0.3" fill="#374151"/>
    <rect x="24" y="13.3" width="2" height="1.5" rx="0.3" fill="#374151"/>
    <rect x="24" y="16.5" width="2" height="1.5" rx="0.3" fill="#374151"/>
    <rect x="24" y="19.5" width="2" height="1.5" rx="0.3" fill="#374151"/>
    <rect x="10" y="6" width="1.5" height="2" rx="0.3" fill="#374151"/>
    <rect x="13.3" y="6" width="1.5" height="2" rx="0.3" fill="#374151"/>
    <rect x="16.5" y="6" width="1.5" height="2" rx="0.3" fill="#374151"/>
    <rect x="19.5" y="6" width="1.5" height="2" rx="0.3" fill="#374151"/>
    <rect x="10" y="24" width="1.5" height="2" rx="0.3" fill="#374151"/>
    <rect x="13.3" y="24" width="1.5" height="2" rx="0.3" fill="#374151"/>
    <rect x="16.5" y="24" width="1.5" height="2" rx="0.3" fill="#374151"/>
    <rect x="19.5" y="24" width="1.5" height="2" rx="0.3" fill="#374151"/>
  </svg>`,
};
