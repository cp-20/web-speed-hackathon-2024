/* eslint-disable import/no-unresolved */

import { $ } from 'bun';
import sharp from 'sharp';

const base = '../server/seeds/images';

const getFilenames = async (extension: string) => {
  const result = await $`cd ${base} && ls *.${extension}`;
  const filenames = result.text().split('\n').filter(Boolean);
  return filenames;
};

await $`cd ${base} && ls *.jxl | sed -e s/\.jxl// | awk '{print $1 ".png"}' | xargs rm`;
const [jpg, png, jxl] = await Promise.all([getFilenames('jpg'), getFilenames('png'), getFilenames('jxl')]);

jpg.forEach(async (filename) => {
  const input = `${base}/${filename}`;
  const output = `${base}/${filename.replace('.jpg', '.avif')}`;
  const output32 = `${base}/${filename.replace('.jpg', '_32x32.avif')}`;
  const output96 = `${base}/${filename.replace('.jpg', '_96x96.avif')}`;
  const output128 = `${base}/${filename.replace('.jpg', '_128x128.avif')}`;

  await Promise.all([
    sharp(input)
      .avif({ quality: 30 })
      .toFile(output)
      .then(() => console.log(`Compressed ${filename} to ${output}`)),
    sharp(input)
      .resize(32)
      .avif({ quality: 30 })
      .toFile(output32)
      .then(() => console.log(`Compressed ${filename} to ${output32}`)),
    sharp(input)
      .resize(96)
      .avif({ quality: 30 })
      .toFile(output96)
      .then(() => console.log(`Compressed ${filename} to ${output96}`)),
    sharp(input)
      .resize(128)
      .avif({ quality: 30 })
      .toFile(output128)
      .then(() => console.log(`Compressed ${filename} to ${output128}`)),
  ]);
});

png.forEach(async (filename) => {
  const input = `${base}/${filename}`;
  const output = `${base}/${filename.replace('.png', '.avif')}`;
  const output144 = `${base}/${filename.replace('.png', '_144x204.avif')}`;
  const output288 = `${base}/${filename.replace('.png', '_288x407.avif')}`;

  await Promise.all([
    sharp(input)
      .avif({ quality: 30 })
      .toFile(output)
      .then(() => console.log(`Compressed ${filename} to ${output}`)),
    sharp(input)
      .resize(144)
      .avif({ quality: 30 })
      .toFile(output144)
      .then(() => console.log(`Compressed ${filename} to ${output144}`)),
    sharp(input)
      .resize(288)
      .avif({ quality: 30 })
      .toFile(output288)
      .then(() => console.log(`Compressed ${filename} to ${output288}`)),
  ]);
});

await $`cd ${base} && ls *.jxl | sed -e s/\.jxl// | awk '{print $1 ".jxl " $1 ".png"}' | xargs -n 2 djxl`;
await Bun.sleep(10000);

jxl.forEach(async (filename) => {
  const input = `${base}/${filename.replace('.jxl', '.png')}`;
  const output = `${base}/${filename.replace('.jxl', '.avif')}`;

  await Promise.all([
    sharp(input)
      .avif({ quality: 30 })
      .toFile(output)
      .then(() => console.log(`Compressed ${filename} to ${output}`)),
  ]);
});
