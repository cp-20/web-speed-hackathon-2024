import sharp from 'sharp';

const assetsDir = '../client/assets/images/hero.avif';

const widths = [1024, 768, 512, 384, 256];

await Promise.all(
  widths.map(async (width) => {
    const output = `${assetsDir.replace('.avif', `_${width}.avif`)}`;
    await sharp(assetsDir)
      .resize(width)
      .avif({ quality: 30 })
      .toFile(output)
      .then(() => console.log(`Compressed ${assetsDir} to ${output}`));
  }),
);
