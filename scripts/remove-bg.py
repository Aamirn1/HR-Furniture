#!/usr/bin/env python3
"""
Remove the black background from the HR Furniture logo and make it transparent.

Strategy:
1. Open the JPEG and convert to RGBA.
2. For each pixel, calculate luminance. Pixels below a low threshold become fully transparent.
3. For pixels near the threshold (anti-aliased edges), partially reduce alpha to keep smooth edges.
4. Optionally also remove dark halo pixels around the gold "R" by treating very dark pixels (regardless of slight color tints) as background.
5. Save as a transparent PNG.
"""

from PIL import Image
import sys
from pathlib import Path

SRC = "/home/z/my-project/public/brand/logo-original.jpg"
OUT = "/home/z/my-project/public/brand/logo-transparent.png"

# Thresholds (0-255)
# Anything below HARD_BLACK becomes fully transparent.
# Between HARD_BLACK and SOFT_BLACK, we linearly fade alpha from 0 -> 255 to keep edges smooth.
HARD_BLACK = 18     # anything this dark = background
SOFT_BLACK = 60     # above this = keep fully opaque

def remove_black_background(img):
    img = img.convert("RGBA")
    px = img.load()
    w, h = img.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            # Luminance — perceived brightness
            lum = int(0.299 * r + 0.587 * g + 0.114 * b)
            if lum <= HARD_BLACK:
                # Fully transparent
                px[x, y] = (r, g, b, 0)
            elif lum <= SOFT_BLACK:
                # Smooth edge — fade alpha
                # Map [HARD_BLACK, SOFT_BLACK] -> [0, 255]
                t = (lum - HARD_BLACK) / (SOFT_BLACK - HARD_BLACK)
                new_alpha = int(255 * t)
                # Slightly lighten the pixel color to avoid dark halo on bright backgrounds
                light_r = min(255, int(r + (1 - t) * 30))
                light_g = min(255, int(g + (1 - t) * 30))
                light_b = min(255, int(b + (1 - t) * 30))
                px[x, y] = (light_r, light_g, light_b, new_alpha)
            # else: keep pixel as-is (fully opaque)
    return img

def main():
    if not Path(SRC).exists():
        print(f"ERR: source not found: {SRC}")
        sys.exit(1)

    print(f"Opening: {SRC}")
    img = Image.open(SRC)
    print(f"Source size: {img.size}, mode: {img.mode}")

    print("Removing black background...")
    out = remove_black_background(img)

    print(f"Saving: {OUT}")
    out.save(OUT, format="PNG", optimize=True)
    print(f"OK  {OUT}  ({Path(OUT).stat().st_size} bytes)")

if __name__ == "__main__":
    main()
