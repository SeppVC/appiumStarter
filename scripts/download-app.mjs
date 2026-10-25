// Downloads the WebdriverIO native demo app (Android APK) into ./apps.
// Runs automatically after `npm install`; run it again with `npm run download:app`.
import { existsSync, mkdirSync, statSync } from 'node:fs';
import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';

export const APP_VERSION = 'v2.2.0';
const APK = `android.wdio.native.app.${APP_VERSION}.apk`;
const URL = `https://github.com/webdriverio/native-demo-app/releases/download/${APP_VERSION}/${APK}`;
const target = join(process.cwd(), 'apps', APK);

if (existsSync(target) && statSync(target).size > 1_000_000) {
  console.log(`[download-app] ${APK} already present`);
  process.exit(0);
}

mkdirSync(join(process.cwd(), 'apps'), { recursive: true });
console.log(`[download-app] Downloading ${URL}`);
try {
  const res = await fetch(URL);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  await writeFile(target, Buffer.from(await res.arrayBuffer()));
  console.log(`[download-app] Saved to apps/${APK}`);
} catch (err) {
  // Never break `npm install` because of this; just tell the student what to do.
  console.warn(`[download-app] Could not download the APK (${err.message}).`);
  console.warn(`[download-app] Download it manually from ${URL} and put it in the apps/ folder.`);
}
