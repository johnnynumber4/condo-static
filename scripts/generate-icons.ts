import sharp from 'sharp';

async function generateIcons() {
  const sizes = [192, 512];
  
  for (const size of sizes) {
    await sharp('public/app-icon.svg')
      .resize(size, size)
      .png()
      .toFile(`public/icons/icon-${size}x${size}.png`);
  }
}

generateIcons().catch(console.error); 