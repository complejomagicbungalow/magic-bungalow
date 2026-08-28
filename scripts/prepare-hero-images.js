const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const uploadsDir = 'C:/Users/USER/.gemini/antigravity/brain/bbe8136f-49cf-4266-bd35-e7fa40c2227c/.user_uploaded';
const outputDir = path.join(__dirname, '../public/img');

const heroSourceMap = [
  {
    source: 'media_1787943048002.webp', // Glamping exterior night with firepit
    outputName: 'hero1.webp',
    title: 'Glamping Bungalow exterior noche con fogata'
  },
  {
    source: 'media_1787943086529.jpg', // Panoramic twilight view
    outputName: 'hero2.webp',
    title: 'Vista panorámica al atardecer de Magic Bungalow'
  },
  {
    source: 'media_1787944576394.jpg', // Couple sitting in circular window looking at landscape
    outputName: 'hero3.webp',
    title: 'Pareja en ventanal circular con vista a la naturaleza'
  },
  {
    source: 'media_1787943153840.jpg', // Candlelit outdoor terrace dinner
    outputName: 'hero4.webp',
    title: 'Cena romántica a la luz de las velas en terraza'
  }
];

async function processHeroImages() {
  console.log('Processing hero images...');
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  for (const item of heroSourceMap) {
    const srcPath = path.join(uploadsDir, item.source);
    const destPath = path.join(outputDir, item.outputName);

    if (!fs.existsSync(srcPath)) {
      console.error(`Source file not found: ${srcPath}`);
      continue;
    }

    const metadata = await sharp(srcPath).metadata();
    console.log(`Processing ${item.source} (${metadata.width}x${metadata.height}, ${metadata.format}) -> ${item.outputName}`);

    // Optimize to high quality WebP with balanced compression
    // If it's the panoramic image (1024x576), upscale slightly to 1920x1080 with high sharpness
    if (item.outputName === 'hero2.webp') {
      await sharp(srcPath)
        .resize({ width: 1920, height: 1080, fit: 'cover', position: 'center' })
        .webp({ quality: 88, effort: 6 })
        .toFile(destPath);
    } else {
      // For vertical images, keep max dimension at 1440/1600 for sharp crisp details
      await sharp(srcPath)
        .resize({
          width: metadata.width < 1080 ? Math.round(metadata.width * 1.5) : metadata.width,
          height: metadata.height < 1440 ? Math.round(metadata.height * 1.5) : metadata.height,
          fit: 'inside'
        })
        .webp({ quality: 90, effort: 6 })
        .toFile(destPath);
    }

    const newMeta = await sharp(destPath).metadata();
    console.log(`Saved ${item.outputName}: ${newMeta.width}x${newMeta.height}, size: ${(fs.statSync(destPath).size / 1024).toFixed(1)} KB`);
  }

  console.log('Hero images processing completed successfully.');
}

processHeroImages().catch(err => {
  console.error('Error processing hero images:', err);
  process.exit(1);
});
