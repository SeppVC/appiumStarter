import { join } from 'node:path';

export const APK_PATH = join(process.cwd(), 'apps', 'android.wdio.native.app.v2.2.0.apk');

/**
 * Settings shared by every run (local emulator and BrowserStack).
 * Each specific config adds its own `capabilities` and `services`.
 */
export const config: Omit<WebdriverIO.Config, 'capabilities'> = {
  runner: 'local',
  specs: ['../test/specs/**/*.spec.ts'],

  maxInstances: 1,

  logLevel: 'warn',
  bail: 0,

  // Mobile is slower than web: give elements and sessions more time
  waitforTimeout: 20_000,
  connectionRetryTimeout: 180_000,
  connectionRetryCount: 2,

  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: {
    ui: 'bdd',
    timeout: 3 * 60 * 1000,
  },
};
