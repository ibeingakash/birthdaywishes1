/**
 * -----------------------------------------------------------------------------
 * PERSONAL BIRTHDAY CELEBRATION CONFIGURATION — FOR KETI
 * -----------------------------------------------------------------------------
 * A personal birthday surprise crafted specifically for Keti.
 * -----------------------------------------------------------------------------
 */

export interface GalleryPhoto {
  id: string;
  url: string; // File path or URL to Keti's real photograph
  title: string;
  caption: string;
  dateOrPlace?: string;
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
    nickname: string;
    title: string;
    subtitle: string;
    openingInvitation: string;
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
    nickname: "Keti ✨",
    title: "A Birthday Journey for Keti",
    subtitle: "A private starlight experience, made with thought and care to celebrate your special day.",
    openingInvitation: "Today is all about you. Step inside to begin your birthday journey."
  },

  celestialScene: {
    eyebrow: "Act II · The Celestial Journey",
    headline: "A Realm Under Starlight",
    description: "I wanted to create something timeless for your birthday—an interactive sphere of light reflecting the quiet grace and brightness you bring into the world.",
    interactionHint: "Drag gently to rotate the sphere · Tap anywhere to cast stardust ripples"
  },

  gallery: {
    eyebrow: "Act III · Portraits & Memories",
    headline: "Celebrating You, Keti",
    description: "A quiet celebration of your warmth, your sincerity, and the memorable presence you carry into every room.",
    photos: [
      {
        id: "keti-portrait-1",
        url: "", // Insert Keti's photo path here, e.g. "/src/assets/images/keti_1.jpg"
        title: "Grace & Thoughtfulness",
        caption: "Celebrating your poise, your gentle perspective on life, and your genuine nature.",
        dateOrPlace: "Portrait 01",
        isPlaceholder: true
      },
      {
        id: "keti-portrait-2",
        url: "", // Insert Keti's photo path here, e.g. "/src/assets/images/keti_2.jpg"
        title: "Radiant Smile",
        caption: "A reminder of the easy laughter and warmth that makes everyone around you feel comfortable.",
        dateOrPlace: "Portrait 02",
        isPlaceholder: true
      },
      {
        id: "keti-portrait-3",
        url: "", // Insert Keti's photo path here, e.g. "/src/assets/images/keti_3.jpg"
        title: "The Year Ahead",
        caption: "Stepping into this new chapter with confidence, new curiosities, and quiet triumph.",
        dateOrPlace: "Portrait 03",
        isPlaceholder: true
      }
    ]
  },

  letter: {
    heading: "A Birthday Letter for You",
    salutation: "Dear Keti,",
    paragraphs: [
      "Happy Birthday! Today gives us a chance to pause and celebrate someone truly wonderful. I built this space for you because an ordinary birthday card simply could not capture how much you are appreciated.",
      "You have a rare combination of genuine kindness, sharp intelligence, and a grounded warmth that stays with everyone who knows you. The way you listen attentively, your thoughtful insights, and your ability to bring light into everyday conversations are things I admire deeply.",
      "As you begin this new year of your life, I hope you take pride in everything you have accomplished and the person you have become. May this next chapter give you the space to pursue whatever makes your heart feel full—quiet moments of contentment, exciting new endeavors, and peaceful mornings where there is no rush.",
      "May good health, true fulfillment, and deep joy follow you wherever you go. You deserve a year as exceptional, bright, and meaningful as you are."
    ],
    closing: "With my highest admiration, warmest thoughts, and sincere blessings,",
    signature: "Always wishing you the very best"
  },

  wishes: {
    eyebrow: "Act V · Five Blessings",
    headline: "A Constellation of Birthday Wishes",
    description: "Five personal wishes I have chosen for you for the year ahead. Tap each star to reveal its blessing.",
    list: [
      {
        id: "wish-joy",
        title: "Spontaneous Joy",
        symbol: "✦",
        theme: "Delight & Laughter",
        shortSnippet: "May genuine laughter and unexpected happiness find you in everyday moments.",
        fullMessage: "I wish you days full of genuine, unhurried laughter—the kind that sneaks up on you in conversation and leaves you smiling for hours afterwards. May spontaneous moments of delight meet you around every corner.",
        quote: "“May your year be marked not by its busyness, but by the richness of its happiest moments.”"
      },
      {
        id: "wish-peace",
        title: "Quiet Sanctuary",
        symbol: "☽",
        theme: "Peace & Groundedness",
        shortSnippet: "May your days be anchored by steady calm and peaceful mornings.",
        fullMessage: "Whenever life feels crowded or loud, I hope you always find an inner calm to recharge. May you always have unhurried mornings, deep rest, and the quiet assurance of how much you are respected.",
        quote: "“In the midst of movement and chaos, keep stillness inside of you.”"
      },
      {
        id: "wish-curiosity",
        title: "Exciting Horizons",
        symbol: "✧",
        theme: "Curiosity & Discovery",
        shortSnippet: "For every new path you explore and every curiosity you pursue.",
        fullMessage: "May you continue exploring things that thrill your mind and feed your intellectual curiosity. May you visit inspiring places, read books that stay with you, and discover new facets of yourself.",
        quote: "“The world reveals its finest secrets to those who look with wonder.”"
      },
      {
        id: "wish-courage",
        title: "Quiet Courage",
        symbol: "★",
        theme: "Confidence & Growth",
        shortSnippet: "To trust your own instincts and stride forward without hesitation.",
        fullMessage: "You carry a quiet, steady strength within you. Whenever you face new decisions or exciting crossroads, I wish you unwavering confidence in your wisdom, knowing how capable you truly are.",
        quote: "“Trust yourself; you know more than you think you do.”"
      },
      {
        id: "wish-warmth",
        title: "Cherished Moments",
        symbol: "♥",
        theme: "Belonging & Care",
        shortSnippet: "Surrounded always by people who value, support, and believe in you.",
        fullMessage: "Above all, may you always feel deeply appreciated and cared for. You have given so much warmth to the people in your life, and I hope this year reflects every bit of that kindness right back to you.",
        quote: "“Kindness is a language which the deaf can hear and the blind can see.”"
      }
    ]
  },

  cake: {
    eyebrow: "The Finale",
    headline: "Make a Birthday Wish, Keti",
    subheadline: "Tap the candles to light your birthday flames, make your private wish, and blow them out.",
    candleCount: 5,
    celebrationTitle: "Happy Birthday, Keti! 🎂✨",
    celebrationSubtitle: "May all your quiet hopes and brightest dreams come true.",
    celebrationBlessing: "Here is to another chapter filled with wisdom, joy, and peace. Happy Birthday!"
  },

  music: {
    title: "Celestial Lullaby",
    artist: "Ambient Starlight Chimes",
    useSynthesizedAmbient: true,
    customAudioUrl: ""
  }
};
