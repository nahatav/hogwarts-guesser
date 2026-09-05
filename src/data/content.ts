export interface MemoryItem {
  id: number;
  romanNumeral: string; // I, II, III... XXI
  title: string;
  subheading: string;
  explanation: string;
  quote?: string;
}

export interface TimelineMilestone {
  chapterNumber: string;
  title: string;
  timeframe: string;
  description: string;
  annotation: string;
}

export interface BookPageContent {
  chapterHeader: string;
  chapterTitle: string;
  introParagraph: string;
  apologyNote: string;
  tableTitle: string;
  tableSubtitle: string;
  timelineTitle: string;
  timelineSubtitle: string;
  tradeOffer: {
    title: string;
    subtitle: string;
    giverTitle: string;
    giverItems: string[];
    receiverTitle: string;
    receiverItems: string[];
    warningNote: string;
    celebrationTitle: string;
    celebrationText: string;
    celebrationPostscript: string;
  };
  memories: MemoryItem[];
  milestones: TimelineMilestone[];
}

export const siteContent: BookPageContent = {
  chapterHeader: "C H A P T E R   T W E N T Y - O N E",
  chapterTitle: "T H E   2 1   T H I N G S   I   R E M E M B E R",
  introParagraph: "I know I made a mistake, and words alone cannot undo what happened. But from the deepest corner of my heart, I am truly sorry. Today marks your twenty-first birthday—a milestone for the most extraordinary person in my world. In honor of every year of your life, I have preserved twenty-one memories below. Click each entry to open its chapter.",
  apologyNote: "“After all this time? Always.”",

  tableTitle: "A C H R O N I C L E   O F   T W E N T Y - O N E   R E C O L L E C T I O N S",
  tableSubtitle: "A 2 × 10 record of memories. Only one parchment may be inspected at a time.",

  timelineTitle: "T H E   J O U R N E Y   T H R O U G H   T I M E",
  timelineSubtitle: "The path of chapters and milestones that brought us here.",

  tradeOffer: {
    title: "T H E   U N B R E A K A B L E   V O W",
    subtitle: "A Sacred Covenant of Forgiveness & 21st Birthday Happiness",
    giverTitle: "✦ What I Offer You in Good Faith",
    giverItems: [
      "A sincere, unconditional apology and a promise to do better every day",
      "Unlimited affection, warmth, and patient listening whenever you need",
      "Your favorite food orders, sweet treats, and impromptu late-night runs",
      "Twenty-one birthday wishes guaranteed to be honored by me",
      "A lifetime of unwavering loyalty and cheering for you"
    ],
    receiverTitle: "✦ What You Give in Return",
    receiverItems: [
      "Your forgiveness (whenever your heart is ready)",
      "Your radiant smile that lights up my whole world",
      "Celebrating your 21st birthday together with joy and laughter"
    ],
    warningNote: "*By magical decree, the Decline charm has been made thoroughly un-clickable.",
    celebrationTitle: "M I S C H I E F   M A N A G E D",
    celebrationText: "The Unbreakable Vow has been sealed with love. Happy 21st Birthday, my dearest. Thank you for giving me your grace. I promise to cherish you always.",
    celebrationPostscript: "“To a lifetime of chapters yet to be written.”"
  },

  memories: [
    {
      id: 1,
      romanNumeral: "I",
      title: "The First Time Our Eyes Met",
      subheading: "The Spark That Started It All",
      explanation: "I still remember the exact outfit you wore and the way the light framed your face. My heart skipped a beat, and I immediately knew you were someone extraordinarily special.",
      quote: "It felt like a wand choosing its wizard—an undeniable spark."
    },
    {
      id: 2,
      romanNumeral: "II",
      title: "The Sound of Your Purest Laugh",
      subheading: "An Unfiltered Melody",
      explanation: "When something genuinely catches you off guard and you laugh with your whole heart, crinkling your nose. It is quite literally my favorite sound in the entire world.",
      quote: "Cheering Charms could never match your laughter."
    },
    {
      id: 3,
      romanNumeral: "III",
      title: "Your Exact Food & Drink Order",
      subheading: "Memorized by Heart",
      explanation: "I know exactly how you like your coffee, what spice level you pretend you can handle versus what you actually enjoy, and the essential sweet treat right after every meal.",
      quote: "No Marauder’s Map needed—I know your cravings by heart."
    },
    {
      id: 4,
      romanNumeral: "IV",
      title: "The Time You Stole My Hoodie",
      subheading: "Claimed Forever",
      explanation: "You claimed you were 'just a little cold,' put on my oversized hoodie, and immediately looked so adorable in it that I knew it was yours forever.",
      quote: "Far more precious than an Invisibility Cloak."
    },
    {
      id: 5,
      romanNumeral: "V",
      title: "Your Passion When Talking About What You Love",
      subheading: "Lumos in Human Form",
      explanation: "Whenever you talk about a topic, show, or idea you love, your eyes light up and you talk with your hands. I could listen to you speak for hours without ever tiring.",
      quote: "A brilliance that lights up every room."
    },
    {
      id: 6,
      romanNumeral: "VI",
      title: "Late-Night Talks in the Car",
      subheading: "Under the Midnight Sky",
      explanation: "Parked under the stars with music playing softly, talking about our dreams, vulnerabilities, and silly hypotheticals until 2:00 AM. Time felt like it stood still.",
      quote: "The Astronomy Tower had nothing on our quiet conversations."
    },
    {
      id: 7,
      romanNumeral: "VII",
      title: "The Way Our Hands Interlock",
      subheading: "A Gentle Anchor",
      explanation: "Whether walking through crowded places or sitting quietly in silence, the moment your hand finds mine, all the chaos in the world just fades away.",
      quote: "An unspoken tether of comfort and peace."
    },
    {
      id: 8,
      romanNumeral: "VIII",
      title: "Your Soft Morning Voice",
      subheading: "First Light",
      explanation: "That quiet, gentle morning voice when you are rubbing your eyes and not quite ready to face the day yet. It makes me want to protect your peace forever.",
      quote: "Gentler than the softest Patronus."
    },
    {
      id: 9,
      romanNumeral: "IX",
      title: "Your Kindness to Animals & Everyone You Meet",
      subheading: "A Pure Heart",
      explanation: "The gentle empathy you show to every animal we pass, and the way you always make sure the people around you are cared for. Your goodness is unmatched.",
      quote: "Care of Magical Creatures has nothing on your gentle soul."
    },
    {
      id: 10,
      romanNumeral: "X",
      title: "The First Movie We Watched Together",
      subheading: "A Scene Etched in Gold",
      explanation: "Sharing snacks on the sofa, trying to pay attention to the screen while secretly being ten times more focused on the fact that you were right beside me.",
      quote: "A quiet moment I will never forget."
    },
    {
      id: 11,
      romanNumeral: "XI",
      title: "Our Secret Inside Jokes & Glances",
      subheading: "The Secret Language",
      explanation: "We can share a single look across a crowded room and both immediately know what the other is thinking, holding back laughter without a single word.",
      quote: "Mischief managed between just two souls."
    },
    {
      id: 12,
      romanNumeral: "XII",
      title: "How Breathtaking You Look Dressed Up",
      subheading: "Outshining Every Star",
      explanation: "Every time you get ready for a special night out, you take my breath away. You are effortlessly the most stunning woman in every room you enter.",
      quote: "More elegant than the Yule Ball."
    },
    {
      id: 13,
      romanNumeral: "XIII",
      title: "Your Strength & Resilience",
      subheading: "True Bravery",
      explanation: "Even when things get overwhelming or exhausting, you push through with so much grace, dignity, and courage. You inspire me to be a better person every single day.",
      quote: "Gryffindor courage in everything you do."
    },
    {
      id: 14,
      romanNumeral: "XIV",
      title: "The Time We Got Totally Lost Together",
      subheading: "An Unplanned Adventure",
      explanation: "We took the wrong turn and our plans went sideways, but being with you turned what could have been stressful into one of our funniest memories.",
      quote: "It’s not where you go, but who you are with."
    },
    {
      id: 15,
      romanNumeral: "XV",
      title: "Your Scent Lingering on My Clothes",
      subheading: "The Scent of Home",
      explanation: "Whenever you hug me and your perfume lingers on my jacket, it brings an immediate wave of comfort and reminds me that I have a home in you.",
      quote: "What Amortentia smells like to me."
    },
    {
      id: 16,
      romanNumeral: "XVI",
      title: "When You Get Playfully Mad or Pout",
      subheading: "Impossibly Endearing",
      explanation: "That little dramatic pout you give when I tease you or when things don't go exactly as planned. It is impossibly cute and impossible not to smile at.",
      quote: "Cute even when feisty."
    },
    {
      id: 17,
      romanNumeral: "XVII",
      title: "How You Always Believe in Me",
      subheading: "My Greatest Anchor",
      explanation: "When I doubt myself or feel lost, you remind me of who I am. You give me strength, reassurance, and confidence when I need it most.",
      quote: "My greatest champion and guide."
    },
    {
      id: 18,
      romanNumeral: "XVIII",
      title: "The Songs That Will Forever Be 'Ours'",
      subheading: "A Soundtrack in the Heart",
      explanation: "Every time our favorite songs play on shuffle, I instantly picture you singing along in the passenger seat, tapping your fingers to the beat.",
      quote: "A melody woven into my soul."
    },
    {
      id: 19,
      romanNumeral: "XIX",
      title: "Your Little Habits Nobody Else Knows",
      subheading: "The Beautiful Details",
      explanation: "The way you organize your things, the specific way you react to surprises, and your cute little bedtime routines. The little details that make you uniquely you.",
      quote: "The quiet wonders that make you magical."
    },
    {
      id: 20,
      romanNumeral: "XX",
      title: "The Moment I Realized I Loved You",
      subheading: "A Quiet Epiphany",
      explanation: "It was a quiet moment where I looked at you and realized with absolute clarity that my life was infinitely brighter, warmer, and better with you in it.",
      quote: "My heart found its true north."
    },
    {
      id: 21,
      romanNumeral: "XXI",
      title: "Celebrating You Turning 21 Today",
      subheading: "The Golden Milestone",
      explanation: "Twenty-one years of bringing light, beauty, warmth, and laughter to this earth. I am so lucky to stand by your side and celebrate the incredible woman you are.",
      quote: "To the happiest 21st birthday and all the magical chapters ahead."
    }
  ],

  milestones: [
    {
      chapterNumber: "Chapter I",
      title: "The First Spark",
      timeframe: "The Beginning",
      description: "When our paths first crossed and two worlds collided to start this beautiful story.",
      annotation: "Where the magic began"
    },
    {
      chapterNumber: "Chapter II",
      title: "The First Date",
      timeframe: "Butterbeer & Butterflies",
      description: "Nervous smiles, effortless conversations, and realizing hours felt like mere minutes.",
      annotation: "An instant connection"
    },
    {
      chapterNumber: "Chapter III",
      title: "The Secret Language",
      timeframe: "Inside Jokes & Shared Looks",
      description: "Building our own world of nicknames, laughter, and unspoken understandings.",
      annotation: "A bond like no other"
    },
    {
      chapterNumber: "Chapter IV",
      title: "Adventures & Journeys",
      timeframe: "Road Trips & Stargazing",
      description: "Windows down, singing along, getting lost, and finding joy in every detour.",
      annotation: "My favorite travel companion"
    },
    {
      chapterNumber: "Chapter V",
      title: "Weathering Storms",
      timeframe: "Growing Closer",
      description: "Learning, forgiving, holding each other close, and choosing love through everything.",
      annotation: "Stronger together"
    },
    {
      chapterNumber: "Chapter VI",
      title: "The 21st Birthday Milestone",
      timeframe: "Today • Chapter 21",
      description: "Entering adulthood's golden year. Today is all about celebrating and cherishing you.",
      annotation: "Happy 21st Birthday!"
    }
  ]
};
