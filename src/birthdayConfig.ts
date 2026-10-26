/**
 * -----------------------------------------------------------------------------
 * WARM SCRAPBOOK BIRTHDAY CELEBRATION CONFIGURATION — FOR KETI
 * -----------------------------------------------------------------------------
 * Faithful recreation of the warm cinematic scrapbook design for Keti.
 * -----------------------------------------------------------------------------
 */

export interface GalleryItem {
  id: string;
  title: string;
  category: 'candid' | 'places' | 'little_things';
  cropKey?: string;
  caption?: string;
}

export interface PastelWish {
  id: string;
  message: string;
  bgColor: string;
  borderColor: string;
  accentColor: string;
}

export interface BirthdayConfig {
  recipient: {
    name: string;
    greeting: string;
    shortMessage: string;
    handwrittenQuote: string;
    buttonText: string;
  };
  introduction: {
    title: string;
    scriptNote: string;
    polaroidCaption: string;
    chapters: { number: string; title: string; sceneIndex: number }[];
  };
  moments: {
    eyebrow: string;
    title: string;
    description: string;
    handwrittenAnnotation: string;
    categories: string[];
    polaroids: {
      id: string;
      title: string;
      caption?: string;
      cropKey: string;
      rotation: string;
    }[];
  };
  gallery: {
    eyebrow: string;
    title: string;
    items: GalleryItem[];
  };
  letter: {
    salutation: string;
    paragraphs: string[];
    celebrationText: string;
    signOff: string;
  };
  wishes: {
    eyebrow: string;
    title: string;
    handwrittenAnnotation: string;
    cards: PastelWish[];
  };
  cake: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    candleCount: number;
    celebrationTitle: string;
    celebrationSubtitle: string;
    celebrationBlessing: string;
  };
  music: {
    title: string;
    artist: string;
    useSynthesizedAmbient: boolean;
    customAudioUrl?: string;
  };
}

export const birthdayConfig: BirthdayConfig = {
  recipient: {
    name: "Keti",
    greeting: "Happy\nBirthday",
    shortMessage: "Today is a reminder that the world is a brighter, kinder, and more beautiful place because you are in it.",
    handwrittenQuote: "Some people just make the world feel brighter. ♡",
    buttonText: "Open Your Birthday Surprise →"
  },

  introduction: {
    title: "Happy Birthday Keti",
    scriptNote: "A little journey through beautiful moments, wishes and a day that is all about you... ♡",
    polaroidCaption: "Let's begin ♡",
    chapters: [
      { number: "01", title: "A Special Day", sceneIndex: 0 },
      { number: "02", title: "Memories", sceneIndex: 2 },
      { number: "03", title: "A Letter", sceneIndex: 4 },
      { number: "04", title: "Wishes", sceneIndex: 5 },
      { number: "05", title: "A Little Magic", sceneIndex: 3 },
      { number: "06", title: "The Cake", sceneIndex: 6 }
    ]
  },

  moments: {
    eyebrow: "A COLLECTION OF ♥",
    title: "Beautiful Moments",
    description: "Little glimpses of your world, your smile, your vibe, and the things that make you, you.",
    handwrittenAnnotation: "You make every ordinary moment feel special ♡",
    categories: ["All", "Candid", "Places", "Little Things"],
    polaroids: [
      {
        id: "moments-1",
        title: "Spring Sunlight",
        caption: "gentle breeze ♡",
        cropKey: "scene3_polaroid_top",
        rotation: "-rotate-2"
      },
      {
        id: "moments-2",
        title: "Golden Hour",
        caption: "stargazing",
        cropKey: "scene3_polaroid_mid",
        rotation: "rotate-3"
      },
      {
        id: "moments-3",
        title: "Quiet Mornings",
        caption: "warm tea",
        cropKey: "scene3_polaroid_right",
        rotation: "-rotate-1"
      }
    ]
  },

  gallery: {
    eyebrow: "MEMORIES & GLIMPSES",
    title: "Photo Gallery",
    items: [
      { id: "g-1", title: "City Viewpoint", category: "places", cropKey: "scene4_thumb_1" },
      { id: "g-2", title: "Warm Morning", category: "candid", cropKey: "scene4_thumb_2" },
      { id: "g-3", title: "Gentle Breeze", category: "candid", cropKey: "scene4_thumb_3" },
      { id: "g-4", title: "Sunlit Rooftop", category: "places", cropKey: "scene4_thumb_4" },
      { id: "g-5", title: "Distant Skyline", category: "places", cropKey: "scene4_thumb_5" },
      { id: "g-6", title: "Strolls in Bloom", category: "little_things", cropKey: "scene4_thumb_6" },
      { id: "g-7", title: "Evening Lights", category: "places", cropKey: "scene4_thumb_7" },
      { id: "g-8", title: "Cozy Sweaters", category: "little_things", cropKey: "scene4_thumb_8" }
    ]
  },

  letter: {
    salutation: "Dear Keti,",
    paragraphs: [
      "On your special day, I just wanted to say how truly wonderful it is to have you in this world.",
      "May this year bring you more joy, peace, beautiful opportunities and all the happiness you deserve.",
      "Keep being the amazing person you are."
    ],
    celebrationText: "Happy Birthday, Keti!",
    signOff: "— With warm wishes ♥"
  },

  wishes: {
    eyebrow: "BIRTHDAY WISHES",
    title: "A Brighter Year for You",
    handwrittenAnnotation: "May this year be filled with all the good things you truly deserve. ♡",
    cards: [
      {
        id: "wish-1",
        message: "May you always find happiness in the little things. ♡ ♥",
        bgColor: "bg-[#faeaeb]",
        borderColor: "border-[#f4cfd2]",
        accentColor: "text-[#c24f60]"
      },
      {
        id: "wish-2",
        message: "May your dreams take you to places you've always wanted to be. ♥",
        bgColor: "bg-[#fdf0e6]",
        borderColor: "border-[#fadac5]",
        accentColor: "text-[#cf693e]"
      },
      {
        id: "wish-3",
        message: "May you stay surrounded by kind people and positive energy. ♥",
        bgColor: "bg-[#eaf4ee]",
        borderColor: "border-[#d0e6d8]",
        accentColor: "text-[#3f7d58]"
      },
      {
        id: "wish-4",
        message: "May you keep smiling, because your smile makes everything brighter. ♥",
        bgColor: "bg-[#fceef1]",
        borderColor: "border-[#fad5de]",
        accentColor: "text-[#ba4663]"
      },
      {
        id: "wish-5",
        message: "May this year bring you new opportunities and beautiful experiences. ♥",
        bgColor: "bg-[#f7f8e8]",
        borderColor: "border-[#e5ebc6]",
        accentColor: "text-[#6d7a2b]"
      },
      {
        id: "wish-6",
        message: "May you always be proud of who you are and how far you've come. ♥",
        bgColor: "bg-[#f4edf6]",
        borderColor: "border-[#e5d4ea]",
        accentColor: "text-[#7f4a91]"
      }
    ]
  },

  cake: {
    eyebrow: "THE FINAL CELEBRATION",
    headline: "Make a Birthday Wish, Keti!",
    subheadline: "Light your candles, make a wish, and let this moment be yours.",
    candleCount: 5,
    celebrationTitle: "Happy Birthday, Keti! 🎂✨",
    celebrationSubtitle: "May all your quiet hopes and brightest dreams come true.",
    celebrationBlessing: "Here is to another chapter filled with wisdom, joy, and peace. Happy Birthday!"
  },

  music: {
    title: "Acoustic Birthday Serenade",
    artist: "Gentle Strings & Chimes",
    useSynthesizedAmbient: true,
    customAudioUrl: ""
  }
};
