// Generate PNG favicons at multiple sizes from the transparent-background logo.
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SRC = '/home/z/my-project/public/brand/logo-transparent.png';
const OUT_DIR = '/home/z/my-project/public/brand';

const sizes = [16, 32, 48, 64, 96, 128, 180, 192, 256, 512, 1024];

(async () => {
  // 1. Standard square favicons — contain-fit so the transparent logo is centered with transparent padding
  for (const s of sizes) {
    const out = path.join(OUT_DIR, `favicon-${s}.png`);
    await sharp(SRC)
      .resize(s, s, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(out);
    console.log(`OK  ${s}x${s}  -> ${path.basename(out)}`);
  }

  // 2. favicon.ico (32x32 PNG with transparency — modern browsers accept PNG-format .ico)
  await sharp(SRC)
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(OUT_DIR, 'favicon.ico'));
  console.log(`OK  favicon.ico (32x32 transparent PNG)`);

  // 3. apple-touch-icon.png — 180x180 with logo on a solid walnut background (Apple requires opaque icons)
  //    Use the brand walnut #3E2A20 so the icon matches the site aesthetic on iOS home screen
  await sharp(SRC)
    .resize(140, 140, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .flatten({ background: '#3E2A20' })
    .resize(180, 180, { fit: 'contain', background: '#3E2A20', position: 'center' })
    .extend({
      top: 20, bottom: 20, left: 20, right: 20,
      background: { r: 62, g: 42, b: 32, alpha: 1 }
    })
    .png()
    .toFile(path.join(OUT_DIR, 'apple-touch-icon.png'));
  console.log(`OK  apple-touch-icon.png (180x180 on walnut)`);

  // 4. brand-logo.png — 256x256 with transparency for navbar/footer
  await sharp(SRC)
    .resize(256, 256, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(OUT_DIR, 'brand-logo.png'));
  console.log(`OK  brand-logo.png (256x256 transparent)`);

  // 5. og-monogram.png — 128x128 transparent for OG image
  await sharp(SRC)
    .resize(128, 128, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(OUT_DIR, 'og-monogram.png'));
  console.log(`OK  og-monogram.png (128x128 transparent)`);

  console.log('\nDone. Files in:', OUT_DIR);
})().catch(e => { console.error('ERR', e); process.exit(1); });
