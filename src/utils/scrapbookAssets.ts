/**
 * Scrapbook image sprite coordinates and dynamic crop extraction from /assets/aistudio/image_679625cc.png
 * Total image resolution: 1536 x 1024 (3 x 3 grid of 512 x 341.33 px panels)
 */

export const REFERENCE_IMAGE_SRC = '/assets/aistudio/image_679625cc.png';

export interface CropRect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export const SCRAPBOOK_CROPS: Record<string, CropRect> = {
  // Panel 1: Window scene photo on left
  scene1_window_photo: { x: 0, y: 0, w: 260, h: 341 },

  // Panel 2: Sunset skyline polaroid
  scene2_skyline_polaroid: { x: 555, y: 170, w: 155, h: 150 },

  // Panel 3: Moments polaroids
  scene3_polaroid_top: { x: 1115, y: 36, w: 90, h: 115 },
  scene3_polaroid_mid: { x: 1160, y: 195, w: 75, h: 95 },
  scene3_polaroid_right: { x: 1240, y: 195, w: 75, h: 95 },

  // Panel 4: Gallery featured photo & thumbnails
  scene4_featured_photo: { x: 25, y: 395, w: 420, h: 220 },
  scene4_thumb_1: { x: 24, y: 622, w: 48, h: 36 },
  scene4_thumb_2: { x: 76, y: 622, w: 48, h: 36 },
  scene4_thumb_3: { x: 128, y: 622, w: 48, h: 36 },
  scene4_thumb_4: { x: 180, y: 622, w: 48, h: 36 },
  scene4_thumb_5: { x: 232, y: 622, w: 48, h: 36 },
  scene4_thumb_6: { x: 284, y: 622, w: 48, h: 36 },
  scene4_thumb_7: { x: 336, y: 622, w: 48, h: 36 },
  scene4_thumb_8: { x: 388, y: 622, w: 48, h: 36 },

  // Panel 5: Letter background & desk
  scene5_desk: { x: 512, y: 341, w: 512, h: 341 },

  // Panel 6: Wishes background
  scene6_paper: { x: 1024, y: 341, w: 512, h: 341 },

  // Panel 7: Cake introduction gift & letter
  scene7_gift_banner: { x: 0, y: 682, w: 512, h: 341 },

  // Panel 9: Finale ribbon backdrop
  scene9_finale_bg: { x: 1024, y: 682, w: 512, h: 341 }
};

// Cache for generated data URLs
const cropCache: Record<string, string> = {};

/**
 * Extracts a sub-rectangle from the reference image into a clean data URL
 */
export async function getScrapbookCropUrl(cropKey: keyof typeof SCRAPBOOK_CROPS): Promise<string> {
  if (cropCache[cropKey]) {
    return cropCache[cropKey];
  }

  const crop = SCRAPBOOK_CROPS[cropKey];
  if (!crop) return REFERENCE_IMAGE_SRC;

  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = crop.w * 2; // 2x for retina sharpness
      canvas.height = crop.h * 2;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(
          img,
          crop.x,
          crop.y,
          crop.w,
          crop.h,
          0,
          0,
          canvas.width,
          canvas.height
        );
        const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
        cropCache[cropKey] = dataUrl;
        resolve(dataUrl);
      } else {
        resolve(REFERENCE_IMAGE_SRC);
      }
    };
    img.onerror = () => {
      resolve(REFERENCE_IMAGE_SRC);
    };
    img.src = REFERENCE_IMAGE_SRC;
  });
}
