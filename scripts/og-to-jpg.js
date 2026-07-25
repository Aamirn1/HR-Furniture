// Convert og-image.png to og-image.jpg with high quality.
const sharp = require('sharp');
const path = require('path');

const SRC = '/home/z/my-project/public/og-image.png';
const OUT = '/home/z/my-project/public/og-image.jpg';

(async () => {
  await sharp(SRC)
    .jpeg({ quality: 90, progressive: true, mozjpeg: true })
    .toFile(OUT);
  const fs = require('fs');
  const pngSize = fs.statSync(SRC).size;
  const jpgSize = fs.statSync(OUT).size;
  console.log(`OK  og-image.jpg  (${(jpgSize / 1024).toFixed(1)} KB)`);
  console.log(`Was PNG: ${(pngSize / 1024).toFixed(1)} KB`);
  console.log(`Savings: ${((1 - jpgSize / pngSize) * 100).toFixed(1)}%`);
})().catch(e => { console.error('ERR', e); process.exit(1); });
