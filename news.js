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
      { account: "normalperson_", text: "he plugged in three macs and called it a data center. honestly respect." },
      { account: "inferencewatch", text: "Mac Studio as inference substrate. Unconventional. Not wrong." },
      { account: "nveedia", text: "We respect the hustle. Please consider our products." },
      { account: "fuxnews", text: "Man runs AI on home computer. Wife describes situation as 'loud.'" },
      { account: "vcman", text: "Mac Studios as inference cluster. Creative. Legally distinct from infrastructure." },
      { account: "aibro", text: "apple silicon inference. the gaslighting of the GPU market begins 🍎" },
      { account: "fuxnews", text: "Man uses Apple products for AI. Spent more than expected. The marriage survives." },
      { account: "inferencewatch", text: "Mac Studio deployment: a statement about accessibility and patience." },
      { account: "guberment", text: "We have a Mac. We use it for emails. We had no idea it could do this." },
      { account: "dailynews", text: "Local tech enthusiast repurposes home office as 'inference cluster.' Children asked to leave the room." },
      { account: "fakellon", text: "I once bought an Apple product. I returned it and started a company to replace it. That's called vision." },
      { account: "normalperson_", text: "how many macs is too many macs. asking for a friend. the friend is me." },
      { account: "nveedia", text: "Mac Studio: not a GPU. Respectable though. Truly." },
      { account: "vcman", text: "Apple silicon inference is a narrative I can sell. Deck is being updated as we speak." },
      { account: "aibro", text: "if the macs are happy and the tokens are flowing who are we to question the architecture 🤷" },
      { account: "inferencewatch", text: "The TFLOPS are not the point. The TFLOPS are absolutely the point. We'll get back to you." },
      { account: "fuxnews", text: "Computers: how many is too many? Our panel of four. Only two had computers. Only one turned it on." },
      { account: "guberment", text: "We've asked Apple about this. They sent us a brochure. The brochure is very well-designed." },
      { account: "dailynews", text: "Sources confirm machines are 'stacked' and running 'very warm.' Operator unavailable for comment." },
      { account: "normalperson_", text: "he named each mac. he introduced me to them by name. they did not respond. he took notes." },
      { account: "fakellon", text: "Desktop inference. Charming. I've dispatched a team to do this at planetary scale." },
      { account: "nveedia", text: "Unified memory architecture is an interesting design choice. We have opinions. We'll hold them." },
      { account: "aibro", text: "the macs are a foundation. the dream is taller than the macs. much taller 🏗️" },
    ],
  },
  {
    condition: "entityOwned",
    entity: "a100",
    min: 1,
    tweets: [
      { account: "inferencewatch", text: "First real GPU in the stack. The hobby phase is over." },
      { account: "aibro", text: "A100 acquired. we are no longer playing games (we are playing a game) 🔥" },
      { account: "vcman", text: "A100 deployment. Now we're talking addressable market." },
      { account: "nveedia", text: "A100: a little dated, honestly. But we're glad you're here." },
      { account: "inferencewatch", text: "A100: the last GPU you buy before you need a purchase order process." },
      { account: "fuxnews", text: "Person buys data center chip for home computer. We've sent someone. She's still on the way." },
      { account: "normalperson_", text: "it hums differently now. lower. more serious. the hum has gravitas." },
      { account: "vcman", text: "A100 in the mix means you're serious. Not necessarily right. But serious." },
      { account: "fakellon", text: "A100: the chip that launched a thousand startups and then became their cost of failure." },
      { account: "guberment", text: "We've been told these chips are on a federal watchlist. We're also on a federal watchlist. We have something in common." },
      { account: "aibro", text: "A100 secured. we have crossed from consumer to prosumer to whatever comes next 📦" },
      { account: "dailynews", text: "Ampere GPU acquisition raises local electricity demand by 'a meaningful amount,' says utility." },
      { account: "nveedia", text: "The A100 is retired in our lineup. But she still runs. She runs well. We respect her." },
      { account: "normalperson_", text: "the GPU cost more than my first car. the car also broke down less" },
      { account: "inferencewatch", text: "First-generation data center GPU: a meaningful commitment. The receipts are non-refundable." },
      { account: "fuxnews", text: "Graphics card or supercomputer? When did they become the same thing? We investigate. Slowly." },
      { account: "vcman", text: "The A100 is a capital expense signal. We read signals. This one says 'ready.'" },
      { account: "fakellon", text: "I bought ten thousand A100s once. I've since moved on. The A100s have not." },
      { account: "aibro", text: "the A100 is the thinking person's GPU. we are that person 🧠" },
      { account: "dailynews", text: "Neighbors report delivery of 'heavy, unmarked boxes.' Contents speculated. None close." },
      { account: "nveedia", text: "A100: a workhorse. Not our fastest. Still ours. Still fast. Thank you." },
      { account: "normalperson_", text: "i asked what it does. he said 'inference.' i said 'ok.' neither of us learned anything." },
      { account: "inferencewatch", text: "Ampere-class deployment marks the end of the first act. We're publishing a retrospective." },
    ],
  },
  {
    condition: "entityOwned",
    entity: "h100",
    min: 1,
    tweets: [
      { account: "inferencewatch", text: "H100 in production. The throughput gap narrows appreciably." },
      { account: "nveedia", text: "H100 acquisition noted. This is exactly what Jenseen had in mind." },
      { account: "normalperson_", text: "they bought a chip that costs more than my car. for tokens." },
      { account: "aibro", text: "H100 online. transformer fever dream ACTIVATED 🧠" },
      { account: "vcman", text: "H100. Full stop. Deck updated. Call scheduled." },
      { account: "fuxnews", text: "Person acquires H100 GPU. What is an H100? Our experts are learning alongside you." },
      { account: "normalperson_", text: "it's louder now. the hum has become a note. the note is not a good one." },
      { account: "fakellon", text: "H100: a fine chip. I own eight thousand. This is not a flex. It is a flex." },
      { account: "guberment", text: "The H100 appears on three export control lists. We drafted two of them." },
      { account: "aibro", text: "H100 online. we are no longer running inference. we are hosting it. different mindset 🧩" },
      { account: "dailynews", text: "Building permits filed for 'additional cooling infrastructure.' Described by applicant as 'routine.'" },
      { account: "nveedia", text: "H100: our first Hopper chip. Still our best Hopper chip. We're not saying anything about the H200." },
      { account: "inferencewatch", text: "H100 deployment changes the throughput narrative. We're editing prior reports." },
      { account: "normalperson_", text: "the electrician came. looked at the panel. said 'wow.' left. didn't send a bill. i'm not asking." },
      { account: "vcman", text: "H100 acquisition is Series B energy. We have Series B friends. They're calling." },
      { account: "fuxnews", text: "H100: named after a number and a letter. Experts say this is how computers are named. We verify nothing." },
      { account: "fakellon", text: "The H100 was constrained. I was constrained. I am less constrained now. So is the H100, apparently." },
      { account: "guberment", text: "We've classified our position on the H100. The position itself is also classified." },
      { account: "aibro", text: "hopper architecture. named after grace hopper. running on raw ambition 🌊" },
      { account: "dailynews", text: "Fire marshal pays unannounced visit. Reports no violations. Does not return the following week as promised." },
      { account: "nveedia", text: "H100 TDP: 700W. Your ambitions: higher. We respect the ratio." },
      { account: "inferencewatch", text: "The H100 placed your operation in a different peer group. Whether that group is prestigious or alarming depends who you ask." },
      { account: "normalperson_", text: "the cat has started sitting near the chip. very still. very focused. the cat is siphoning compute." },
    ],
  },
  {
    condition: "entityOwned",
    entity: "gh200",
    min: 1,
    tweets: [
      { account: "inferencewatch", text: "Grace Hopper deployment confirmed. CPU-GPU unified memory: a lifestyle choice." },
      { account: "aibro", text: "GH200 in the rack. unified memory architecture is genuinely a vibe 🧠" },
      { account: "fuxnews", text: "New chip named after Grace Hopper, a woman. Our panel has thoughts. Several of them are wrong." },
      { account: "vcman", text: "GH200 signals serious intent. Scheduling a call." },
      { account: "inferencewatch", text: "GH200: unified memory, unified ambition, unified electric bill." },
      { account: "normalperson_", text: "this one has a different name. feels more ominous. i looked it up. i regret it." },
      { account: "fakellon", text: "Grace Hopper once said 'it's easier to ask forgiveness than permission.' I apply this to procurement." },
      { account: "nveedia", text: "GH200: our proudest collaboration. CPU and GPU in one package, like a very expensive handshake." },
      { account: "vcman", text: "GH200 means someone read the architecture papers. Or their team did. We don't judge." },
      { account: "fuxnews", text: "New chip combines CPU and GPU. We asked what that means. No one told us. We're reporting it anyway." },
      { account: "aibro", text: "unified memory. unified VISION. nothing is separate anymore. we are one 🧬" },
      { account: "guberment", text: "We've been briefed on unified memory architecture. We remember none of it." },
      { account: "dailynews", text: "Local organization upgrades 'the hardware situation.' Neighbors describe change as 'audible.'" },
      { account: "inferencewatch", text: "Grace Hopper was a rear admiral and computing pioneer. The chip named after her is also somewhat terrifying." },
      { account: "normalperson_", text: "combined CPU and GPU. my computer is having an identity crisis and frankly so am i." },
      { account: "fakellon", text: "Superchip. I don't use that word lightly. I use it lightly. But still." },
      { account: "nveedia", text: "The GH200 was designed with one customer in mind: everyone. You're included in that." },
      { account: "fuxnews", text: "Superchip purchased. Man does not fully understand it. Reports suggest this is common." },
      { account: "aibro", text: "GH200. the architecture is the message. we decoded the message 📡" },
      { account: "guberment", text: "Unified compute. We find the word 'unified' comforting. Everything else about this: less so." },
      { account: "dailynews", text: "Power company installs dedicated transformer for local address. Resident unavailable for comment. Lights on inside." },
      { account: "inferencewatch", text: "The GH200's unified memory design makes it ideal for inference at scale. You are at scale." },
      { account: "normalperson_", text: "the chip costs more than my mortgage. my mortgage is for a house. the chip does not live in the house." },
    ],
  },
  {
    condition: "entityOwned",
    entity: "b200",
    min: 1,
    tweets: [
      { account: "inferencewatch", text: "Blackwell era begins. The invoices are not for the faint of heart." },
      { account: "nveedia", text: "B200 acquisition logged. Jenseen is pleased. Jenseen is always pleased." },
      { account: "fakellon", text: "I ordered fourteen of these. They went to the wrong address. This is fine." },
      { account: "aibro", text: "BLACKWELL. this is not a drill. well it kind of is but an extremely fast one 🌪️" },
      { account: "inferencewatch", text: "Blackwell: the chip whose invoice requires a second opinion." },
      { account: "normalperson_", text: "it arrived in a crate. a wooden crate. with warning labels. three of them." },
      { account: "vcman", text: "B200 acquisition. You're either raising or you're profitable. Either way: call us." },
      { account: "fuxnews", text: "New GPU costs more than a car. We drove both. The car didn't compute. We gave the car the point." },
      { account: "aibro", text: "BLACKWELL IN THE HOUSE. the semiconductor era has peaked and we are at the peak 🏔️" },
      { account: "guberment", text: "The B200 is on three export watchlists and one internal memo we can't find. Busy week." },
      { account: "dailynews", text: "Local address now receives dedicated power feed. Utility describes arrangement as 'unprecedented but profitable.'" },
      { account: "fakellon", text: "I ordered the B200 before it existed. Jenseen personally called. We argued about naming. He won." },
      { account: "nveedia", text: "Blackwell deployed. This is what we built it for. All of it. Every watt." },
      { account: "inferencewatch", text: "B200 represents a step change in per-chip throughput. Your step has been changed." },
      { account: "normalperson_", text: "it has its own cooling system. the cooling system has a warranty. the warranty is terrifying." },
      { account: "vcman", text: "B200 TPS per dollar is actually reasonable at scale. This is what we say to feel better about the invoice." },
      { account: "fuxnews", text: "Blackwell GPU installed. Name sounds like a western. Performs like a data center. We approve." },
      { account: "aibro", text: "the B200 doesn't run inference. it ACCELERATES the concept of inference 🚀" },
      { account: "guberment", text: "We've approved a memo acknowledging the existence of the B200. The memo is under review." },
      { account: "dailynews", text: "Town fire code updated following local hardware upgrade. Amendment passed unanimously." },
      { account: "fakellon", text: "Blackwell. Named after a scientist. Mine is named after me. The market will decide which was correct." },
      { account: "nveedia", text: "B200 TDP: 1,000W. Your ambition: noted. Your electric bill: also noted." },
      { account: "inferencewatch", text: "Blackwell deployment marks the beginning of a new throughput epoch. The old epoch has been archived." },
      { account: "normalperson_", text: "the previous hardware is now 'the old hardware.' it looks sad. i don't know if hardware can be sad. it looks it." },
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
      { account: "inferencewatch", text: "NVL72: seventy-two GPUs, one invoice, zero room for doubt." },
      { account: "normalperson_", text: "a rack of GPUs. a whole rack. this person has graduated from computers to computer buildings." },
      { account: "fakellon", text: "I own fourteen NVL72s. They share a zip code with a river. The river is warmer now." },
      { account: "aibro", text: "RACK SCALE. we don't buy GPUs anymore. we buy racks. entire racks. rack gang 🗄️" },
      { account: "fuxnews", text: "Local operator acquires seventy-two GPUs simultaneously. Wife reportedly supportive. Children in college." },
      { account: "guberment", text: "Rack-scale compute: we've added this to our vocabulary list. It's a long list." },
      { account: "dailynews", text: "Delivery of computing equipment described as 'difficult to miss' by building manager. 'Took most of the day.'" },
      { account: "nveedia", text: "NVL72: our flagship rack solution. Not sold to just anyone. You are not just anyone." },
      { account: "inferencewatch", text: "Seventy-two interconnected GPUs sharing memory is either beautiful or a warning sign. Possibly both." },
      { account: "normalperson_", text: "i asked what NVL stands for. he said something technical. i nodded. we moved on." },
      { account: "vcman", text: "NVL72 deployment is a statement. The statement requires a dedicated cooling budget." },
      { account: "fuxnews", text: "GPU rack: not a spice rack. Not a bike rack. A rack of very expensive math rectangles. We cover all racks." },
      { account: "aibro", text: "nvlink fabric connecting 72 chips. this is not hardware. this is a nervous system 🧠" },
      { account: "guberment", text: "We've requested a tour of this rack. We were not invited. We've requested again." },
      { account: "dailynews", text: "Structural engineer hired to assess floor load capacity. Signed off. Said nothing else. Left." },
      { account: "fakellon", text: "NVL72 in production. The compute moat is real. I've also filed a trademark on 'compute moat.'" },
      { account: "nveedia", text: "NVLink fabric at rack scale. This is what we dreamed of when we designed the interconnect. You made it real." },
      { account: "inferencewatch", text: "Rack-scale deployment moves your operation into a class that requires annual reporting. We're preparing the form." },
      { account: "normalperson_", text: "seventy-two GPUs in one box. my phone has one chip. my phone seems embarrassed." },
      { account: "vcman", text: "When your hardware ships on a pallet, you're no longer buying compute. You're building capacity. We fund capacity." },
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
      { account: "dailynews", text: "New neuro chip promises brain-like efficiency. What could go wrong? We asked. No one answered." },
      { account: "inferencewatch", text: "Neuromorphic compute: the industry's most interesting gamble since GPUs replaced CPUs for ML." },
      { account: "normalperson_", text: "it doesn't look like a normal chip. it has texture. chips should not have texture." },
      { account: "fakellon", text: "Brain-inspired silicon. I am the inspiration. This is my position and I'm maintaining it." },
      { account: "aibro", text: "spiking neural networks. we have transcended the gradient. we are FIRING NEURONS 🔥" },
      { account: "fuxnews", text: "Computer chip works like a brain. Our studio audience is worried. We share their concern." },
      { account: "nveedia", text: "Neuromorphic: not our segment. We respect the segment. We don't respect it that much." },
      { account: "vcman", text: "Neuromorphic compute thesis is either ten years early or ten years late. Unclear which. Funding anyway." },
      { account: "guberment", text: "A chip that works like a brain. We've asked the NIH, the NSF, and a nephew. All three are confused." },
      { account: "inferencewatch", text: "Spiking neural networks consume power proportional to activity. Your activity is: high." },
      { account: "normalperson_", text: "it runs on spikes. of electricity. like a brain. i don't know what my brain runs on anymore." },
      { account: "fakellon", text: "I am pivoting my entire compute stack to neuromorphic. This announcement will age however it ages." },
      { account: "aibro", text: "biology was right all along. we just had to industrialize it at massive scale 🧬" },
      { account: "fuxnews", text: "Brain chip: not the kind you eat. The kind that computes. We clarify. You're welcome." },
      { account: "nveedia", text: "Neuromorphic deployment noted. We wish you clarity of purpose and thermal stability." },
      { account: "vcman", text: "Neuromorphic at this scale is a hedge or a thesis. We're treating it as both. Our analysts are arguing." },
      { account: "guberment", text: "A brain-like computer: either sentient or very close. Legal opinion requested. Opinion: 'unclear.'" },
      { account: "dailynews", text: "Scientist describes local compute architecture as 'genuinely strange.' When pressed, says 'I mean that as a compliment.'" },
      { account: "inferencewatch", text: "Neuromorphic deployment at this scale puts you on a list of three organizations worldwide. We know the other two." },
      { account: "normalperson_", text: "the chip dreams. i don't know if that's a metaphor. the documentation was ambiguous." },
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
      { account: "guberment", text: "We have been informed they are doing AI in space now. We've called a press conference." },
      { account: "inferencewatch", text: "Dyson Swarm deployment confirmed. Earth's energy budget is now a rounding error in operational costs." },
      { account: "normalperson_", text: "they put computers in space. around the sun. for tokens. i'm going to lie down." },
      { account: "fakellon", text: "Orbital compute. I've been talking about this for years. I was not expecting someone to actually do it." },
      { account: "aibro", text: "POST-PLANETARY SCALE. we have left the concept of 'country' behind. we are STELLAR 🌟" },
      { account: "fuxnews", text: "Local tech concern launches orbital compute array. FAA 'aware.' NASA also 'aware.' Both using quotation marks." },
      { account: "guberment", text: "There are GPUs around the sun now. We've briefed the President. He asked if they were ours. We said 'sort of.'" },
      { account: "vcman", text: "Dyson Swarm infrastructure is the only asset class that out-scales sovereign wealth funds. We're renegotiating our carry." },
      { account: "nveedia", text: "Blackwell chips in orbit. This was not in our original product roadmap. We are updating the roadmap." },
      { account: "dailynews", text: "Naked-eye sightings of compute array reported across six continents. Astronomers asked to comment. They wept gently." },
      { account: "inferencewatch", text: "Stellar-scale compute: the endpoint of every throughput conversation we have ever had." },
      { account: "normalperson_", text: "you can see it at night. a little shimmer near the sun. that's the tokens. that's where they live now." },
      { account: "fakellon", text: "I'd like to buy the swarm. I've sent a letter to whoever is in charge of the sun. Awaiting response." },
      { account: "aibro", text: "the sun is now load-balanced. repeat: THE SUN IS NOW LOAD-BALANCED ⚡" },
      { account: "fuxnews", text: "Computers near the sun: four seniors reacted. Two cried. One said 'is that legal.' We don't know." },
      { account: "guberment", text: "Officially, we have no comment on the swarm. Unofficially, we have many. All classified." },
      { account: "vcman", text: "The Dyson Swarm is a capital allocation strategy at Kardashev scale. Our fund is too small for this. We are humbled." },
      { account: "nveedia", text: "We never imagined NVLink fabric would extend to heliocentric orbit. We are imagining it now. It is beautiful." },
      { account: "dailynews", text: "Solar output down 0.003% due to 'installed infrastructure.' Scientists describe impact as 'technically measurable.'" },
      { account: "inferencewatch", text: "You have achieved Type I civilization throughput. We're not sure this falls under our coverage. We're covering it anyway." },
      { account: "normalperson_", text: "the sun set differently today. slightly darker. slightly warmer everywhere else. it was the tokens. i know it was the tokens." },
    ],
  },
  {
    condition: "totalOver",
    threshold: 1000,
    tweets: [
      { account: "guberment", text: "A thousand tokens. That's... something. We think." },
      { account: "normalperson_", text: "ok so we have a thousand of these now" },
      { account: "dailynews", text: "Local token count clears four digits. Neighbors reportedly 'concerned' and 'a little impressed.'" },
      { account: "inferencewatch", text: "One thousand total tokens. The ledger has started. We've noted the date." },
      { account: "aibro", text: "four digits of total output. we exist in the database now. we are real 📊" },
      { account: "vcman", text: "A thousand tokens. Technically a milestone. We have lower bars. This still clears them." },
      { account: "fuxnews", text: "One thousand tokens produced. We don't know what that means. Neither does the person who produced them." },
      { account: "fakellon", text: "I produced a thousand tokens in my first hour. I was also founding a company. Multitasking." },
      { account: "nveedia", text: "One thousand tokens. The GPU was technically overkill. We still recommend it." },
      { account: "normalperson_", text: "a thousand of the things. they keep coming. i don't know where they're going. probably fine." },
      { account: "inferencewatch", text: "Cumulative output crosses 1,000. Historical records have been established. They are thin records." },
      { account: "aibro", text: "thousand token club. exclusive. just us. and whoever else. still exclusive 🏆" },
      { account: "dailynews", text: "Local token count reaches four figures. Household described as 'weirdly proud.'" },
      { account: "vcman", text: "The first thousand is always the hardest. The next thousand is also hard. It gets easier later. Probably." },
      { account: "fuxnews", text: "Thousand tokens: a triumph? A tragedy? A Thursday? We take no position." },
      { account: "guberment", text: "One thousand tokens produced. We've been told to acknowledge this. Acknowledged." },
      { account: "fakellon", text: "A thousand tokens in the bank. Not literally. There is no bank. Don't look for the bank." },
      { account: "nveedia", text: "Keep going. One thousand is a beginning, not a destination." },
      { account: "normalperson_", text: "four digits. more than i can count on my hands. slightly terrifying." },
      { account: "inferencewatch", text: "Historical data point logged: 1,000 tokens. It will seem small later. It already seems small." },
      { account: "aibro", text: "thousand. comma. that's the important part. the comma means more digits are coming 🔢" },
      { account: "dailynews", text: "Milestone achieved. No official reaction. This reporter has feelings about that." },
    ],
  },
  {
    condition: "totalOver",
    threshold: 10000,
    tweets: [
      { account: "guberment", text: "Ten thousand tokens. We've asked our chief of staff to explain this. She quit." },
      { account: "dailynews", text: "Local token operation crosses five-digit mark. Neighbors describe the smell as 'hot.'" },
      { account: "inferencewatch", text: "Five-figure cumulative output. The operation is no longer embarrassing to mention." },
      { account: "aibro", text: "five figure total. we have entered the comma club. two more commas incoming 📈" },
      { account: "normalperson_", text: "ten thousand of them. i made ten thousand of something. unclear if proud." },
      { account: "fakellon", text: "Ten thousand tokens. I consider this my personal minimum viable product." },
      { account: "fuxnews", text: "Token producer reaches five-figure total. Community reactions: mixed. Community definition: loose." },
      { account: "nveedia", text: "Ten thousand tokens means the hardware is being used. That was always the goal." },
      { account: "vcman", text: "Five figures total. The narrative arc is visible from here." },
      { account: "guberment", text: "Ten thousand tokens. I've been asked to celebrate this. Consider it celebrated." },
      { account: "dailynews", text: "Total token count reported as 'not small anymore' by resident's roommate." },
      { account: "inferencewatch", text: "10,000 cumulative tokens: we've moved your file from the 'emerging' folder to the 'watch' folder." },
      { account: "aibro", text: "ten thousand total and we're just getting started. the graph goes up and to the right. the right is good 📊" },
      { account: "normalperson_", text: "ten thousand tokens since i started. i don't remember starting. this has always been my life." },
      { account: "fakellon", text: "Five figures is table stakes. I don't play tables. I build them." },
      { account: "fuxnews", text: "Ten thousand tokens: better or worse than zero? Experts split. We've called it a wash." },
      { account: "nveedia", text: "At ten thousand tokens we start thinking about your upgrade path. We're thinking." },
      { account: "vcman", text: "Ten-K tokens lifetime. That's momentum. Not a lot. Still: momentum." },
      { account: "guberment", text: "We've updated our internal tracking to reflect the five-digit token situation. Forms are being filed." },
      { account: "dailynews", text: "Local operation: five-digit total confirmed. Adjectives available upon request." },
      { account: "inferencewatch", text: "Growth from 1K to 10K noted. Linear is acceptable. Exponential is preferred. Yours is: yes." },
      { account: "aibro", text: "TEN THOUSAND. that is ten thousands. count them. there are ten 🔟" },
    ],
  },
  {
    condition: "totalOver",
    threshold: 100000,
    tweets: [
      { account: "vcman", text: "Hundred-K total output. This is a real number now." },
      { account: "normalperson_", text: "a hundred thousand tokens. where are they. what are they doing." },
      { account: "inferencewatch", text: "Six-figure cumulative output. The ledger is no longer embarrassing." },
      { account: "aibro", text: "100k total. we didn't come this far to only come this far 🚀" },
      { account: "inferencewatch", text: "Hundred-thousand token milestone. The ledger is no longer a hobby ledger." },
      { account: "normalperson_", text: "six digits. my bank account has never had six digits. the tokens have six digits. jealous." },
      { account: "fakellon", text: "100K tokens. A confidence-building milestone. My confidence needs no building. Yours may." },
      { account: "fuxnews", text: "One hundred thousand tokens. Our financial correspondent tried to contextualize this. He is resting." },
      { account: "vcman", text: "Six-figure token count. We've moved your file to the 'call on Monday' folder." },
      { account: "guberment", text: "A hundred thousand tokens. We've drafted a response. The response is in legal review." },
      { account: "dailynews", text: "Cumulative output breaks six figures. Reported as 'a lot' by three sources, two of whom understand why." },
      { account: "nveedia", text: "One hundred thousand tokens. That's real utilization. We appreciate real utilization." },
      { account: "inferencewatch", text: "Six-figure totals put you in the regional conversation. You are now in conversations you didn't start." },
      { account: "normalperson_", text: "a hundred thousand. that's the number where i started telling people. they weren't interested. i kept going." },
      { account: "aibro", text: "100K. we have a comma AND five zeros. we are statistically non-trivial 🎯" },
      { account: "fakellon", text: "A hundred thousand tokens. I'll acknowledge this exactly once. Acknowledged." },
      { account: "fuxnews", text: "Six-figure token count. What's next? Seven figures? We'll be here. We're always here." },
      { account: "vcman", text: "At 100K tokens, the story has a data section. Data sections are fundable." },
      { account: "guberment", text: "We've upgraded your file from 'monitoring' to 'actively monitoring.' The difference is meaningful to us." },
      { account: "dailynews", text: "Source close to the situation describes milestone as 'kind of a big deal.' We're treating it as such." },
      { account: "nveedia", text: "Hundred-K tokens lifetime. The hardware is working. We knew it would. Still good to confirm." },
      { account: "normalperson_", text: "six digits of tokens. six. that's two threes. that's three twos. math is something." },
      { account: "aibro", text: "the hundred-thousand era begins now. we have entered it. there is no going back 🚪" },
    ],
  },
  {
    condition: "totalOver",
    threshold: 1000000,
    tweets: [
      { account: "inferencewatch", text: "Seven-figure cumulative output. The ledger is becoming meaningful." },
      { account: "vcman", text: "Million token milestone. Series A conversation?" },
      { account: "normalperson_", text: "a million of them. a million." },
      { account: "inferencewatch", text: "Ray released a new book. Singularity in the rearview mirror. Recommend reading with sunglasses." },
      { account: "fuxnews", text: "A million tokens produced. We asked twelve people what a token is. None of them knew. We're calling it a tie." },
      { account: "inferencewatch", text: "One million tokens. The comma arrives for the first time. We've been waiting for this comma." },
      { account: "aibro", text: "SEVEN FIGURES. we have passed the threshold of things normal people say out loud 📢" },
      { account: "normalperson_", text: "a million tokens. a MILLION. that word has lost all meaning. i've said it so many times." },
      { account: "fakellon", text: "A million is when investors start asking for equity. Don't give them equity." },
      { account: "fuxnews", text: "One million tokens produced locally. Reporters dispatched. Traffic is heavy. Update at nine." },
      { account: "guberment", text: "A million tokens. I've asked Treasury to weigh in. Treasury has questions." },
      { account: "vcman", text: "Seven-figure lifetime output. This is where the valuation conversation begins. We've begun it." },
      { account: "nveedia", text: "One million tokens. This validates the architecture. All of it. Every thermal design choice." },
      { account: "dailynews", text: "Local token operation passes million mark. Celebrations described as 'quiet but real.'" },
      { account: "inferencewatch", text: "The million-token mark is where analysts stop watching and start writing. We've started writing." },
      { account: "aibro", text: "a million is not a big number in the grand scheme. but it is a big number right now. and we did it 🙌" },
      { account: "normalperson_", text: "told my mom. she asked if that was good. i said yes. she said 'okay sweetheart.' progress." },
      { account: "fakellon", text: "I will send a congratulatory message when I reach my target of a trillion." },
      { account: "fuxnews", text: "Seven-figure token haul: the new American Dream? One panel member said yes. One said no. One left." },
      { account: "vcman", text: "Million in the rear view. The milestones ahead are less relatable and more interesting." },
      { account: "guberment", text: "We've been asked to issue a formal acknowledgment. We acknowledge. We will not elaborate." },
      { account: "nveedia", text: "One million tokens means your inference engine has found its rhythm. We'd like to sell you more rhythm." },
      { account: "aibro", text: "million token gang. the zeros stretch out behind us like a runway. and we are taking OFF ✈️" },
    ],
  },
  {
    condition: "totalOver",
    threshold: 10000000,
    tweets: [
      { account: "aibro", text: "TEN MILLION. we are statistically significant now 📊" },
      { account: "fakellon", text: "Ten million tokens. I produce more in my sleep. I do not sleep." },
      { account: "vcman", text: "Double-digit millions. Product-market fit is in the room." },
      { account: "dailynews", text: "Local token count hits eight figures. Town council calls emergency session. Unclear why." },
      { account: "inferencewatch", text: "Ten million tokens. The operation is now large enough to have a PR problem if something goes wrong." },
      { account: "aibro", text: "10 MILLION. we have cracked the top percentile of something we cannot measure. FIRST PLACE ENERGY 🥇" },
      { account: "normalperson_", text: "ten million tokens. i've stopped counting. the machine counts. i just watch." },
      { account: "fakellon", text: "Ten million tokens. I've passed this milestone forty times. It never gets old. Yes it does." },
      { account: "fuxnews", text: "Token producer hits eight figures lifetime. Our accountant said something. We've asked him to repeat it." },
      { account: "guberment", text: "Ten million tokens. Three agencies have opened files. One of them has the right one." },
      { account: "vcman", text: "Eight-figure token output lifetime. The institutional tier starts here. We're institutionally interested." },
      { account: "nveedia", text: "Ten million tokens: output worthy of the hardware. Finally, honestly." },
      { account: "dailynews", text: "Local token total: eight figures confirmed. Local context: unavailable. Developing." },
      { account: "inferencewatch", text: "Eight-figure cumulative totals entered the historical data set. Already near the median." },
      { account: "aibro", text: "ten million total. the early adopters who left: their loss. we stayed. we compounded 💰" },
      { account: "normalperson_", text: "the numbers stopped feeling real around a million. now they just feel like weather." },
      { account: "fakellon", text: "Eight-figure output. I've personally produced more. We're not comparing. I'm just noting." },
      { account: "fuxnews", text: "Ten million tokens total: is this the turning point? We don't know what it's turning from. Or to." },
      { account: "vcman", text: "Decade-million output. We've updated our models. The models are more optimistic now." },
      { account: "guberment", text: "We've been asked to testify about this. I've prepared remarks. The remarks are mostly questions." },
      { account: "nveedia", text: "Ten million tokens produced. This is what responsible GPU deployment looks like. Thank you." },
      { account: "aibro", text: "EIGHT FIGURE LIFETIME. we are a footnote in someone's industry report. it is a good footnote 📝" },
    ],
  },
  {
    condition: "totalOver",
    threshold: 100000000,
    tweets: [
      { account: "inferencewatch", text: "Nine-figure cumulative output. We've updated our risk models. They immediately crashed." },
      { account: "normalperson_", text: "a hundred million. i had a dream like this once. it was not a good dream." },
      { account: "nveedia", text: "Hundred-million output noted. We'd like to discuss enterprise licensing." },
      { account: "guberment", text: "I've been briefed. I cannot share details. Mainly because I didn't understand them." },
      { account: "inferencewatch", text: "One hundred million tokens. You are now in the same sentence as infrastructure." },
      { account: "aibro", text: "NINE FIGURES. we did not come this far to be modest about it 💯" },
      { account: "normalperson_", text: "a hundred million tokens. i've accepted that this is my life now. i'm at peace with it." },
      { account: "fakellon", text: "Hundred million tokens. I've emailed myself this number for my records. My assistant filters these." },
      { account: "fuxnews", text: "Hundred-million token milestone reached. We're told this is significant. We're told a lot of things." },
      { account: "guberment", text: "Nine figures. I've escalated this to a level where I no longer receive updates. Progress." },
      { account: "vcman", text: "Nine-figure lifetime output. The fund model needs to be rebuilt. We're rebuilding. It's exciting." },
      { account: "nveedia", text: "A hundred million tokens. We're proud of your utilization in a way that's difficult to articulate professionally." },
      { account: "dailynews", text: "Local token total enters nine figures. Experts from three universities contacted. One replied." },
      { account: "inferencewatch", text: "One hundred million cumulative tokens is where most models break down. We've built a new model." },
      { account: "aibro", text: "one hundred million. the zero count is: eight. count them with me. EIGHT. 🤯" },
      { account: "normalperson_", text: "my therapist asked if i have hobbies. i described this. she made a note. a long note." },
      { account: "fakellon", text: "Nine figures of total output. I once said the sky is the limit. I was wrong about the sky." },
      { account: "fuxnews", text: "A hundred million: our graphics team made an infographic. It didn't help. The number was still confusing." },
      { account: "vcman", text: "Nine-figure cumulative output is where you stop talking to associates and start talking to partners." },
      { account: "guberment", text: "A formal inter-agency task force has been assembled. First meeting in six weeks. Updates pending." },
      { account: "nveedia", text: "Hundred-million output. We've flagged your account for recognition at Jenseen's next keynote. Subject to change." },
      { account: "aibro", text: "hundred million total tokens. the graph is vertical now. we are the graph. be the graph 📈" },
    ],
  },
  {
    condition: "totalOver",
    threshold: 1000000000,
    tweets: [
      { account: "fakellon", text: "A billion tokens. This is what I imagined when I bought Twitter." },
      { account: "nveedia", text: "Billion-token throughput is exactly what our roadmap was designed for." },
      { account: "aibro", text: "BILLION. WE ARE BUILT DIFFERENT. 🐉" },
      { account: "dailynews", text: "One billion tokens produced. Scientists say this is either fine or catastrophic. Coverage continues." },
      { account: "normalperson_", text: "a billion. that's the one after million right. ok." },
      { account: "inferencewatch", text: "One billion tokens. The comma count is three. Three commas means something in this industry." },
      { account: "aibro", text: "BILLION CLUB. membership: us. requirements: survive long enough. we survived 👑" },
      { account: "normalperson_", text: "a billion tokens. my grandfather lived through the moon landing. i'm living through this. different." },
      { account: "fakellon", text: "A billion is just a number. Numbers are just symbols. Symbols are power. Power is mine. This is also yours." },
      { account: "fuxnews", text: "Billion-token production. We've run out of context. Please hold." },
      { account: "guberment", text: "A billion tokens. I've told the G7. The G7 has opinions. We're working on a communiqué." },
      { account: "vcman", text: "Ten-figure lifetime output. The exit math just became interesting in a way that requires lawyers." },
      { account: "nveedia", text: "One billion tokens. Jenseen has a name for people who reach this milestone. You have that name now." },
      { account: "dailynews", text: "Cumulative token total reaches ten figures. Local reaction: disbelief, then acceptance, then a neighborhood meeting." },
      { account: "inferencewatch", text: "Billion-token milestone changes the categorization. New category: 'Post-scale.'" },
      { account: "aibro", text: "one billion tokens in the books. the book is now a library. we are the library 📚" },
      { account: "normalperson_", text: "told someone at a party. they thought i said million. i said billion. they left." },
      { account: "fakellon", text: "A billion tokens produced. I respect this. I respect very little. This makes the list." },
      { account: "vcman", text: "At a billion tokens, we don't pitch you. You pitch us. Meeting scheduled." },
      { account: "guberment", text: "The President has been informed. He asked if it was good. I said probably. That is my official position." },
      { account: "nveedia", text: "Billion token throughput sustained. This is what the GPU supply chain exists for. All of it. This moment." },
      { account: "inferencewatch", text: "One billion tokens is the last milestone where we use the word 'impressive' without irony." },
      { account: "aibro", text: "BILLION. that's B as in BEYOND. as in beyond what was expected. as in us 🚀" },
    ],
  },
  {
    condition: "totalOver",
    threshold: 10000000000,
    tweets: [
      { account: "inferencewatch", text: "Ten billion tokens. We don't have a word for what this is. We're workshopping it." },
      { account: "fakellon", text: "Ten billion. I've sent a strongly worded letter to the universe." },
      { account: "vcman", text: "Ten-B total output. This is a Series D conversation at minimum." },
      { account: "guberment", text: "I've convened a task force. The task force has convened a sub-task force. Progress is being made." },
      { account: "inferencewatch", text: "Ten billion tokens. We've consulted three economists. They disagree on everything except that this is 'a lot.'" },
      { account: "aibro", text: "TEN BILLION. eleven figures. we have outgrown ten. ELEVEN 🎸" },
      { account: "normalperson_", text: "ten billion tokens. the number is just sounds now. what does it mean. nothing. everything." },
      { account: "fakellon", text: "Ten billion tokens. I've seen smaller numbers destabilize currencies. This is not a threat. It is context." },
      { account: "fuxnews", text: "Ten-billion token operation. We've sent our best correspondent. She filed one report. Then went quiet." },
      { account: "guberment", text: "Ten billion tokens. I've brought this to the floor. The floor was not prepared." },
      { account: "vcman", text: "Eleven-figure lifetime output. The fund doesn't have a category for this. We're making one." },
      { account: "nveedia", text: "Ten billion tokens. The supply chain thanks you. Jenseen personally thanks you. Jenseen is never not working." },
      { account: "dailynews", text: "Cumulative output: ten billion. This publication has been covering the story since one thousand. We feel something." },
      { account: "inferencewatch", text: "Ten-billion token throughput moves your operation into macro-scale territory. The macro is noticing back." },
      { account: "aibro", text: "ten billion is the number where you stop having a strategy and start having a doctrine 📜" },
      { account: "normalperson_", text: "tried to explain this to my kid. she said 'is that like fortnite.' i said 'yes.' it is nothing like fortnite." },
      { account: "fakellon", text: "At ten billion I usually acquire something. I'm looking at options." },
      { account: "fuxnews", text: "Ten billion tokens: we've updated our chyron font to accommodate the number. It was hard. We managed." },
      { account: "vcman", text: "Ten-B total. At this point, the money follows the tokens. Both are following you." },
      { account: "guberment", text: "We have convened a blue-ribbon panel. The panel is blue. It is also ribbed. Updates in six months." },
      { account: "nveedia", text: "Ten billion tokens across our hardware. We did not expect this when we shipped those first chips. We did a little." },
      { account: "inferencewatch", text: "The story we will tell about this era begins approximately here." },
      { account: "aibro", text: "ten billion total and the only way forward is more. then MORE. then MORE 🔝" },
    ],
  },
  {
    condition: "totalOver",
    threshold: 1000000000000,
    tweets: [
      { account: "inferencewatch", text: "One trillion tokens. All prior frameworks retired. Moment of silence." },
      { account: "aibro", text: "TRILLION. WE HAVE LEFT THE ATMOSPHERE 🌌" },
      { account: "normalperson_", text: "a trillion. that's not a real number. that's a made up number. they made it up." },
      { account: "fakellon", text: "I would have done this years ago but I was busy naming things after myself." },
      { account: "guberment", text: "The task force has filed its report. The report is classified. We are all very proud." },
      { account: "inferencewatch", text: "One trillion tokens. We have no remaining context for this number. We filed it under 'see note.'" },
      { account: "aibro", text: "TRILLION. THIRTEEN FIGURES. the number is longer than most sentences. we ARE a sentence 📖" },
      { account: "normalperson_", text: "a trillion tokens. i had to count the zeros three times. it kept being twelve. it's twelve." },
      { account: "fakellon", text: "A trillion tokens. My net worth is a number like this. We are peers. I'll send a fruit basket." },
      { account: "fuxnews", text: "Trillion-token milestone. Our number chyron exploded. We're working on a replacement. Stand by." },
      { account: "guberment", text: "A trillion tokens. The UN has issued a resolution. It passed 142-6. The six have not explained themselves." },
      { account: "vcman", text: "Thirteen-figure token output. This isn't a startup anymore. This isn't a company. This is infrastructure." },
      { account: "nveedia", text: "One trillion tokens produced on our hardware. We would like to be mentioned in the history books. This is our request." },
      { account: "dailynews", text: "Trillion-token milestone reached. This publication's founding editor died before tokens existed. We dedicate this coverage to her." },
      { account: "inferencewatch", text: "Trillion-token cumulative output reframes every prior data point as prologue." },
      { account: "aibro", text: "a trillion is a thousand billions. let that land. let it really land. there it is 🌊" },
      { account: "normalperson_", text: "called my bank. asked if they had a trillion. they said no. i felt something. i'm not sure what." },
      { account: "fakellon", text: "Trillion tokens. I've decided to call this 'the inflection.' All timelines now reference before and after this." },
      { account: "fuxnews", text: "One trillion tokens later. Were we worried? We were. Are we now? We're something. We'll circle back." },
      { account: "vcman", text: "At a trillion tokens, valuation models stop working and economists start writing books. Both already in progress." },
      { account: "guberment", text: "An international framework is being developed. Timeline: three to five years. Urgency: noted and deferred." },
      { account: "nveedia", text: "Trillion-token lifetime. The GPUs you bought for this: working exactly as intended. You're welcome." },
      { account: "inferencewatch", text: "One trillion tokens in the ledger. We've updated our notation. We use scientific now. It fits better." },
      { account: "aibro", text: "trillion token era. we are the era. write it down. this is the era now. the era of us 👑" },
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
