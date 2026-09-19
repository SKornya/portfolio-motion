import { mkdir, readdir } from 'node:fs/promises';
import { dirname, join, parse } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const rawDir = join(root, 'src/assets/images/raw');
const outDir = join(root, 'src/assets/images');

await mkdir(outDir, { recursive: true });

const files = (await readdir(rawDir)).filter((name) => name.endsWith('.png'));

for (const name of files) {
  const { name: base } = parse(name);
  const dest = join(outDir, `${base}.webp`);
  await sharp(join(rawDir, name)).webp({ quality: 82 }).toFile(dest);
  console.log('webp', `${base}.webp`);
}
