import { lstat, rm } from "node:fs/promises";
import { isAbsolute, relative, resolve } from "node:path";

const outputRoot = resolve("dist/client/images");
const unusedAssets = [
  "magone-painting-walls-feature.png",
  "daraz-affiliate-award.png",
  "magazine-feature.png",
  "magazine-feature.webp",
  "daraz-award.png",
  "daraz-award.webp",
  "insights-content.png",
  "insights-overview.png",
  "insights-locations.png",
  "insights-audience.png",
  "annie-profile.png",
];

for (const filename of unusedAssets) {
  const target = resolve(outputRoot, filename);
  const boundary = relative(outputRoot, target);
  if (!boundary || boundary.startsWith("..") || isAbsolute(boundary)) throw new Error(`Unsafe build asset path: ${target}`);

  const info = await lstat(target).catch(() => null);
  if (!info) continue;
  if (!info.isFile() || info.isSymbolicLink()) throw new Error(`Refusing to remove unexpected build asset: ${target}`);
  await rm(target);
}
