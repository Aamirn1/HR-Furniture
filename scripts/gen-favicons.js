// Generate PNG favicons at multiple sizes from the user's uploaded logo.
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SRC = '/home/z/my-project/public/brand/logo-original.jpg';
const OUT_DIR = '/home/z/my-project/public/brand';

const sizes = [16, 32, 48, 64, 96, 128, 180, 192, 256, 512, 1024];

(async () => {
  // 1. Standard square favicons — cover-fit the source so it fills the square
  for (const s of sizes) {
    const out = path.join(OUT_DIR, `favicon-${s}.png`);
    await sharp(SRC)
      .resize(s, s, { fit: 'cover', position: 'center' })
      .png()
      .toFile(out);
    console.log(`OK  ${s}x${s}  -> ${path.basename(out)}`);
  }

  // 2. favicon.ico (32x32 PNG — modern browsers accept PNG-format .ico)
  await sharp(SRC)
    .resize(32, 32, { fit: 'cover', position: 'center' })
    .png()
    .toFile(path.join(OUT_DIR, 'favicon.ico'));
  console.log(`OK  favicon.ico (32x32 PNG)`);

  // 3. apple-touch-icon.png — 180x180 with the logo on a white background
  //    (Apple requires opaque icons; the original is on black so we keep the black background)
  await sharp(SRC)
    .resize(180, 180, { fit: 'cover', position: 'center' })
    .png()
    .toFile(path.join(OUT_DIR, 'apple-touch-icon.png'));
  console.log(`OK  apple-touch-icon.png (180x180)`);

  // 4. Brand logo for navbar — larger format, original aspect (1:1)
  await sharp(SRC)
    .resize(256, 256, { fit: 'cover', position: 'center' })
    .png()
    .toFile(path.join(OUT_DIR, 'brand-logo.png'));
  console.log(`OK  brand-logo.png (256x256 for navbar)`);

  // 5. OG image logo — 64x64 small monogram for OG banner
  await sharp(SRC)
    .resize(128, 128, { fit: 'cover', position: 'center' })
    .png()
    .toFile(path.join(OUT_DIR, 'og-monogram.png'));
  console.log(`OK  og-monogram.png (128x128 for OG image)`);

  console.log('\nDone. Files in:', OUT_DIR);
})().catch(e => { console.error('ERR', e); process.exit(1); });
