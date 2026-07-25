// Generate PNG favicons at multiple sizes from the SVG monogram using sharp.
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SVG = '/home/z/my-project/public/brand/monogram.svg';
const OUT_DIR = '/home/z/my-project/public/brand';

const sizes = [16, 32, 48, 64, 96, 128, 180, 192, 256, 512, 1024];
const svgBuffer = fs.readFileSync(SVG);

(async () => {
  for (const s of sizes) {
    const out = path.join(OUT_DIR, `favicon-${s}.png`);
    await sharp(svgBuffer, { density: 384 })
      .resize(s, s, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(out);
    console.log(`OK  ${s}x${s}  -> ${path.basename(out)}`);
  }

  // favicon.ico (multi-size) — sharp can write an ICO via ico plugin, but we'll just save a 32x32 PNG named favicon.ico
  // Actually let's just save a single 32x32 png and rename to .ico — modern browsers accept PNG-format .ico
  const icoOut = path.join(OUT_DIR, 'favicon.ico');
  await sharp(svgBuffer, { density: 384 })
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(icoOut);
  console.log(`OK  favicon.ico (32x32 PNG)`);

  // Apple touch icon (180x180 with white background)
  const appleOut = path.join(OUT_DIR, 'apple-touch-icon.png');
  await sharp(svgBuffer, { density: 384 })
    .resize(180, 180, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .flatten({ background: '#FFFFFF' })
    .png()
    .toFile(appleOut);
  console.log(`OK  apple-touch-icon.png (180x180)`);

  console.log('\nDone.');
})().catch(e => { console.error('ERR', e); process.exit(1); });
