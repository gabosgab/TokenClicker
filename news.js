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
      { account: "normalperson_", text: "I've heard about AI, is that Google?" },
      { account: "fuxnews", text: "My grandson showed me this. I wish took a nap instead." },
    ],
  },
  {
    condition: "tps",
    min: 1,
    max: 1000,
    tweets: [
      { account: "inferencewatch", text: "Running inference on desktop silicon. Bold strategy." },
      { account: "normalperson_", text: "he bought a computer to make fake numbers go up" },
      { account: "nveedia", text: "We appreciate your business. Mac Studios were not one of our products." },
      { account: "fuxnews", text: "Tokens: what are they? Where do they go? We sent a reporter. She hasn't come back." },
      { account: "guberment", text: "We've confirmed tokens are being produced. We cannot confirm what a token is." },
      { account: "fakellon", text: "When I produced my first token, I cried. Then I acquired a satellite company." },
      { account: "guberment", text: "We're told AI is good for the economy. We're told a lot of things." },
    ],
  },
  {
    condition: "tps",
    min: 10000,
    max: 100000,
    tweets: [
      { account: "vcman", text: "Early days. We're watching." },
      { account: "fuxnews", text: "Apple releases new AI Siri, still somehow didn't do what you asked." },
      { account: "fuxnews", text: "AI: harmless hobby or threat to Western civilization?" },
      { account: "normalperson_", text: "That house at the end of the street is glowing, I heard it's a token farm?" },
    ],
  },
  {
    condition: "tps",
    min: 100000,
    max: 1000000,
    tweets: [
      { account: "aibro", text: "6 digits LETS GO 📈" },
      { account: "dailynews", text: "Token velocity hits 6 digits. Experts are 'cautiously optimistic' and 'extremely worried.'" },
      { account: "normalperson_", text: "My electricity bill is a cry for help." },
      { account: "fuxnews", text: "100,000 tokens per second: is your family safe? Tips at eleven." },
      { account: "dailynews", text: "Regional grid operator reports 'unexplained demand.' Source not yet identified." },
      { account: "nveedia", text: "We've noticed your throughput. We'd like to discuss your next procurement cycle." },
      { account: "dailynews", text: "Local operation described as 'a lot of computers in there.' Landlord reportedly 'uneasy.'" },
      { account: "guberment", text: "We've begun drafting a framework. For what, exactly, is still under discussion." },
      { account: "nveedia", text: "100,000+ TPS. We see it. Jenseen sees it. Jenseen sees everything." },
    ],
  },
  {
    condition: "tps",
    min: 1000000,
    max: 10000000,
    tweets: [
      { account: "normalperson_", text: "Data center heats manhattan for free. rent still too damn high" },
      { account: "guberment", text: "We've been told we're producing thousands of tokens per second. We called FEMA. They said it wasn't their department." },
      { account: "guberment", text: "We've introduced the Responsible Token Act. It has zero co-sponsors." },
      { account: "vcman", text: "At this throughput we can model a real exit. Three to five years. Maybe two. Probably seven." },
    ],
  },
  {
    condition: "tps",
    min: 10000000,
    max: 100000000,
    tweets: [
      { account: "guberment", text: "This is either great or terrible for America. Possibly both. We'll schedule a hearing." },
      { account: "fakellon", text: "I could acquire this for $420.69 billion but I'm busy" },
      { account: "normalperson_", text: "Small lakes are boiling due to data center usage." },
      { account: "normalperson_", text: "The smart meter on my house started sending me personal messages. They're not friendly." },
      { account: "normalperson_", text: "Birds don't fly over the building anymore. they go around. the birds know." },
    ],
  },
  {
    condition: "tps",
    min: 100000000,
    tweets: [
      { account: "fakellon", text: "I could have built this for $420.69" },
      { account: "dailynews", text: "Geologists report new heat signature in region. Origin: 'unknown but localized.'" },
      { account: "fakellon", text: "Six figures per second. I'm not worried. I'm also setting up a competing operation. Coincidence." },
      { account: "guberment", text: "Three agencies are now involved. None of them are communicating with each other. Standard procedure." },
      { account: "vcman", text: "At nine-figure throughput, you're not raising money. Money is coming to you." },
      { account: "normalperson_", text: "compass stopped working near my house. probably fine." },
      { account: "fuxnews", text: "Experts describe token velocity as 'unprecedented' and 'hard to look at directly.'" },
      { account: "dailynews", text: "FAA issues airspace advisory over token operation. Pilots asked to adjust altitude. No reason given." },
      { account: "nveedia", text: "Jenseen would like to visit. Jenseen will be visiting. Jenseen has arrived." },
    ],
  },
  {
    condition: "entityOwned",
    entity: "v100",
    min: 1,
    tweets: [
      { account: "normalperson_", text: "he named each mac. he introduced me to them by name. they did not respond. he took notes." },
      { account: "fuxnews", text: "Computers: how many is too many? Our panel of four. Only two had computers. Only one turned it on." },
      { account: "fakellon", text: "I once bought an Apple product. I returned it and started a company to replace it. That's called vision." },
      { account: "guberment", text: "We have a Mac. We use it for emails. We had no idea it could do this." },
      { account: "nveedia", text: "Mac Studio: not a GPU. Respectable though. Truly." },
    ],
  },
  {
    condition: "entityOwned",
    entity: "a100",
    min: 1,
    tweets: [
      { account: "aibro", text: "A100 acquired. we are no longer playing games (we are playing a game) 🔥" },
      { account: "normalperson_", text: "i asked what it does. he said 'inference.' i said 'ok.' neither of us learned anything." },
      { account: "fakellon", text: "I bought ten thousand A100s once. I've since moved on. The A100s have not." },
      { account: "guberment", text: "We've been told these chips are on a federal watchlist. We're also on a federal watchlist. We have something in common." },
      { account: "nveedia", text: "The A100 is retired in our lineup. But she still runs. She runs well. We respect her." },
    ],
  },
  {
    condition: "entityOwned",
    entity: "h100",
    min: 1,
    tweets: [
      { account: "normalperson_", text: "the electrician came. looked at the panel. said 'wow.'." },
      { account: "fakellon", text: "H100: a fine chip. I own eight thousand. This is not a flex. It is a flex." },
      { account: "guberment", text: "We've classified our position on the H100. The position itself is also classified." },
      { account: "nveedia", text: "H100: our first Hopper chip. Still our best Hopper chip. We're not saying anything about the H200." },
      { account: "normalperson_", text: "The H100's favorite accessory is cats, keeps them nice and toasty." },
    ],
  },
  {
    condition: "entityOwned",
    entity: "gh200",
    min: 1,
    tweets: [
      { account: "guberment", text: "We've been briefed on unified memory architecture. We remember none of it." },
      { account: "normalperson_", text: "These chips costs more than my mortgage!!" },
    ],
  },
  {
    condition: "entityOwned",
    entity: "b200",
    min: 1,
    tweets: [
      { account: "fakellon", text: "I ordered fourteen of these. They went to the wrong address. Meh." },
      { account: "fuxnews", text: "New GPU costs more than a car. We drove both." },
      { account: "fakellon", text: "Blackwell. Named after a scientist. Mine is named after me. The market will decide which was correct." },
      { account: "normalperson_", text: "the previous hardware is now 'the old hardware.' it looks sad. i don't know if hardware can be sad." },
      { account: "vcman", text: "B200 TPS per dollar is actually reasonable at scale. This is what we say to feel better about the invoice." },
    ],
  },
  {
    condition: "entityOwned",
    entity: "nvl72",
    min: 1,
    tweets: [
      { account: "fakellon", text: "I own fourteen NVL72s. They share a zip code with a river. The river is warmer now." },
      { account: "fuxnews", text: "GPU rack: not a spice rack. Not a bike rack." },
      { account: "normalperson_", text: "i asked what NVL stands for. he said something technical. i nodded. we moved on." },
      { account: "guberment", text: "We've requested a tour of this rack. We were not invited. We've requested again." },
      { account: "dailynews", text: "Structural engineer hired to assess floor load capacity." },
    ],
  },
  {
    condition: "entityOwned",
    entity: "spiking",
    min: 1,
    tweets: [
      { account: "fuxnews", text: "Neuromorphic? In my day we just called it a brain." },
      { account: "normalperson_", text: "it doesn't look like a normal chip. it has texture. chips should not have texture." },
      { account: "fakellon", text: "I am pivoting my entire compute stack to neuromorphic." },
      { account: "nveedia", text: "Neuromorphic: not our segment. We respect the segment." },
      { account: "normalperson_", text: "The chip dreams. i don't know if that's a metaphor." },
    ],
  },
  {
    condition: "entityOwned",
    entity: "dyson",
    min: 1,
    tweets: [
      { account: "normalperson_", text: "they put computers in space. around the sun. for tokens. i'm going to lie down." },
      { account: "fakellon", text: "I'd like to buy the swarm. I've sent a letter to whoever is in charge of the sun. Awaiting response." },
      { account: "guberment", text: "There are GPUs around the sun now. We've briefed the President. He asked if they were ours. We said 'sort of.'" },
      { account: "fuxnews", text: "Computers near the sun: four seniors reacted. Two cried. One said 'is that legal.'" },
      { account: "normalperson_", text: "the sun set differently today. slightly darker. slightly warmer everywhere else. it was the tokens. i know it was the tokens." },
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
