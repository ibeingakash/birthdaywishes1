/**
 * -----------------------------------------------------------------------------
 * BIRTHDAY CELEBRATION CONFIGURATION FOR KETI
 * -----------------------------------------------------------------------------
 * Central configuration file for Keti's celebration.
 *
 * To add Keti's genuine photographs:
 * 1. Place Keti's photo files into /src/assets/images/ (e.g. keti_portrait_1.jpg)
 * 2. Set the `url` field below to that path (e.g. "/src/assets/images/keti_portrait_1.jpg")
 * 3. Update the title and caption.
 * -----------------------------------------------------------------------------
 */

export interface GalleryPhoto {
  id: string;
  url: string; // Path to Keti's photograph
  title: string;
  caption: string;
  dateOrPlace?: string;
  aspectRatio: 'portrait' | 'landscape' | 'square';
  isPlaceholder?: boolean;
}

export interface SurpriseWish {
  id: string;
  title: string;
  symbol: string;
  theme: string;
  shortSnippet: string;
  fullMessage: string;
  quote?: string;
}

export interface BirthdayConfig {
  recipient: {
    name: string;
    nickname?: string;
    title: string;
    subtitle: string;
    openingQuote: string;
    authorOrContext?: string;
  };
  letter: {
    heading: string;
    salutation: string;
    paragraphs: string[];
    closing: string;
    signature: string;
  };
  celestialScene: {
    eyebrow: string;
    headline: string;
    description: string;
    interactionHint: string;
  };
  gallery: {
    eyebrow: string;
    headline: string;
    description: string;
    photos: GalleryPhoto[];
  };
  wishes: {
    eyebrow: string;
    headline: string;
    description: string;
    list: SurpriseWish[];
  };
  capsule: {
    eyebrow: string;
    headline: string;
    description: string;
    vesselTitle: string;
  };
  cake: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    candleCount: number;
    wishes: string[];
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
    nickname: "Keti ✨",
    title: "A Celebration of Grace, Joy & Light",
    subtitle: "A digital tapestry woven under starlight to celebrate the extraordinary person you are.",
    openingQuote: "Some people bring a quiet radiance into the world—a gentle warmth that makes everything brighter and kinder.",
    authorOrContext: "With love & gratitude"
  },

  celestialScene: {
    eyebrow: "Interactive Celestial Portal",
    headline: "The Orbit of Light",
    description: "Drag or touch the cosmic astrolabe to cast stardust ripples through the celestial sphere.",
    interactionHint: "Drag to rotate in 3D space · Touch to release stardust reverberations"
  },

  gallery: {
    eyebrow: "Portraits & Memories",
    headline: "Moments of Keti",
    description: "Celebrating your smile, your warmth, and the indelible grace you bring to every season.",
    photos: [
      {
        id: "keti-portrait-1",
        url: "", // Insert Keti's photo path here, e.g. "/src/assets/images/keti_1.jpg"
        title: "Portrait of Grace",
        caption: "A genuine smile that effortlessly brightens every room and brings warmth to those around you.",
        dateOrPlace: "Portrait Moment 01",
        aspectRatio: "portrait",
        isPlaceholder: true
      },
      {
        id: "keti-portrait-2",
        url: "", // Insert Keti's photo path here, e.g. "/src/assets/images/keti_2.jpg"
        title: "Joy & Radiance",
        caption: "Capturing the sincere laughter, quiet thoughtfulness, and vibrant energy that make you unique.",
        dateOrPlace: "Portrait Moment 02",
        aspectRatio: "portrait",
        isPlaceholder: true
      },
      {
        id: "keti-portrait-3",
        url: "", // Insert Keti's photo path here, e.g. "/src/assets/images/keti_3.jpg"
        title: "Looking Forward",
        caption: "Standing on the threshold of an extraordinary year ahead, filled with promise, wisdom, and peace.",
        dateOrPlace: "Portrait Moment 03",
        aspectRatio: "portrait",
        isPlaceholder: true
      }
    ]
  },

  letter: {
    heading: "A Letter for Keti",
    salutation: "Dearest Keti,",
    paragraphs: [
      "On this special day, we pause to celebrate you—not just for another milestone, but for all the joy, sincerity, and gentle brilliance you bring into our lives.",
      "Your kindness is the rare, steadfast kind that stays with people. In your quiet thoughtfulness, your vibrant smile, and your genuine curiosity, you make everyone feel valued, heard, and at home.",
      "As you step into this next chapter, may you always hold tightly to your wonder. May your days be blessed with quiet moments of calm, hearty laughter with family, exciting discoveries, and the steady knowledge that you are cherished beyond measure.",
      "Here is to your dreams taking flight, to peaceful mornings, and to a year as extraordinary and luminous as you are."
    ],
    closing: "With all our love, pride, and warmest blessings,",
    signature: "Your Family & Friends"
  },

  wishes: {
    eyebrow: "Constellation of Five Wishes",
    headline: "The Star Map for Keti",
    description: "Five celestial beacons set into the night sky, each carrying a timeless blessing.",
    list: [
      {
        id: "wish-joy",
        title: "The Spark of Joy",
        symbol: "✦",
        theme: "Radiance & Laughter",
        shortSnippet: "May genuine laughter and unexpected delights find you in everyday moments.",
        fullMessage: "May the coming year bring you an abundance of belly-deep laughter, sudden sparks of happiness, and spontaneous moments of pure delight that make ordinary afternoons unforgettable.",
        quote: "“Joy does not simply happen to us. We have to choose joy and keep choosing it every day.”"
      },
      {
        id: "wish-curiosity",
        title: "Endless Discovery",
        symbol: "✧",
        theme: "Curiosity & Wisdom",
        shortSnippet: "For every new path you wander and every fascinating book you open.",
        fullMessage: "May you keep feeding your boundless curiosity. May you travel to places that take your breath away, learn skills that thrill your mind, and uncover hidden beauty in the world.",
        quote: "“The world is full of magic things, patiently waiting for our senses to grow sharper.”"
      },
      {
        id: "wish-peace",
        title: "Gentle Serenity",
        symbol: "☽",
        theme: "Calm & Groundedness",
        shortSnippet: "May quiet mornings and restful nights wrap your mind in soothing peace.",
        fullMessage: "Whenever life grows hurried or noisy, may you always possess an inner sanctuary of steady calm. May you have time to sip your tea slowly, listen to the rain, and breathe deeply.",
        quote: "“Peace is the beauty of life. It is sunshine. It is the smile of a child, the love of a mother.”"
      },
      {
        id: "wish-courage",
        title: "Brave Horizons",
        symbol: "★",
        theme: "Strength & Purpose",
        shortSnippet: "To every ambition you nurture and every challenge you conquer with grace.",
        fullMessage: "Trust in the steady strength you carry within. Whenever you stand before new crossroads, may you step forward with unwavering confidence, knowing you have everything it takes to flourish.",
        quote: "“You are braver than you believe, stronger than you seem, and smarter than you think.”"
      },
      {
        id: "wish-love",
        title: "Cherished Warmth",
        symbol: "♥",
        theme: "Family & Belonging",
        shortSnippet: "Surrounded always by family and faithful friends who treasure you.",
        fullMessage: "Above all, may you always feel deeply loved and appreciated. Your family stands behind you at every milestone, cheering for your victories and embracing you through every season.",
        quote: "“Where there is great love, there are always miracles.”"
      }
    ]
  },

  capsule: {
    eyebrow: "The Starlight Vessel",
    headline: "The Wish Capsule",
    description: "Release a personal blessing into the night sky. Each wish ignites a radiant light in this session.",
    vesselTitle: "Starlight Vessel"
  },

  cake: {
    eyebrow: "The Birthday Finale",
    headline: "Make a Wish, Keti",
    subheadline: "Tap each golden candle to light the flames, then make your secret wish.",
    candleCount: 5,
    wishes: [
      "For radiant health and boundless energy",
      "For cherished memories with loved ones",
      "For peaceful mornings and sweet laughter",
      "For dreams unfolding into reality",
      "For a year of unexpected blessings"
    ],
    celebrationTitle: "Happy Birthday, Keti! 🎂✨",
    celebrationSubtitle: "May all your birthday wishes find their way to you.",
    celebrationBlessing: "Here is to another year of grace, happiness, and extraordinary chapters ahead!"
  },

  music: {
    title: "Celestial Lullaby",
    artist: "Ambient Starlight Chimes",
    useSynthesizedAmbient: true,
    customAudioUrl: ""
  }
};
