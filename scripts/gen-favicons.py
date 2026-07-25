#!/usr/bin/env python3
"""Generate PNG favicons at multiple sizes from the SVG monogram."""
import subprocess
import os
from pathlib import Path

SVG = "/home/z/my-project/public/brand/monogram.svg"
OUT_DIR = Path("/home/z/my-project/public/brand")
OUT_DIR.mkdir(parents=True, exist_ok=True)

sizes = [16, 32, 48, 64, 96, 128, 180, 192, 256, 512, 1024]

for s in sizes:
    out = OUT_DIR / f"favicon-{s}.png"
    try:
        subprocess.run(
            ["rsvg-convert", "-w", str(s), "-h", str(s), "-o", str(out), SVG],
            check=True, capture_output=True
        )
        print(f"OK  {s}x{s}  -> {out.name}")
    except FileNotFoundError:
        try:
            subprocess.run(
                ["convert", "-background", "none", "-density", "384",
                 SVG, "-resize", f"{s}x{s}", str(out)],
                check=True, capture_output=True
            )
            print(f"OK  {s}x{s}  -> {out.name} (ImageMagick)")
        except FileNotFoundError:
            print(f"SKIP {s}x{s}  - no rsvg-convert or convert found")

ico_out = OUT_DIR / "favicon.ico"
try:
    subprocess.run(
        ["convert", "-background", "none",
         str(OUT_DIR / "favicon-16.png"),
         str(OUT_DIR / "favicon-32.png"),
         str(OUT_DIR / "favicon-48.png"),
         str(OUT_DIR / "favicon-64.png"),
         str(ico_out)],
        check=True, capture_output=True
    )
    print(f"OK  favicon.ico")
except Exception as e:
    print(f"WARN ico conversion failed: {e}")

apple = OUT_DIR / "apple-touch-icon.png"
try:
    subprocess.run(
        ["convert", "-background", "#FFFFFF", "-gravity", "center",
         "-extent", "180x180", str(OUT_DIR / "favicon-180.png"), str(apple)],
        check=True, capture_output=True
    )
    print(f"OK  apple-touch-icon.png")
except Exception as e:
    print(f"WARN apple icon failed: {e}")

print("\nFiles in:", OUT_DIR)
for f in sorted(OUT_DIR.iterdir()):
    print(f"  {f.name}  ({f.stat().st_size} bytes)")
