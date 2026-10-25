import { existsSync } from 'node:fs';
import { config as shared, APK_PATH } from './wdio.shared.conf.js';

/**
 * Same tests, real devices in the BrowserStack cloud.
 *
 *   cp .env.example .env                  (then fill in your credentials; .env is git-ignored)
 *   npm run test:bs
 *
 * Variables already set in the shell (e.g. CI secrets) take precedence over .env.
 *
 * The BrowserStack service uploads ./apps/*.apk for you. In CI you can instead pass an
 * already uploaded app with BROWSERSTACK_APP_ID=bs://<hash>.
 */
if (existsSync('.env')) process.loadEnvFile('.env');

if (!process.env.BROWSERSTACK_USERNAME || !process.env.BROWSERSTACK_ACCESS_KEY) {
  throw new Error('BROWSERSTACK_USERNAME and BROWSERSTACK_ACCESS_KEY must be set (see .env.example).');
}

const buildName = process.env.BROWSERSTACK_BUILD_NAME ?? `appium-training-${new Date().toISOString().slice(0, 16)}`;

const bstackOptions = (deviceName: string, platformVersion: string) => ({
  platformName: 'Android',
  'appium:automationName': 'UiAutomator2',
  'appium:deviceName': deviceName,
  'appium:platformVersion': platformVersion,
  'bstack:options': {
    projectName: 'PXL Appium training',
    buildName,
    sessionName: `${deviceName} - Android ${platformVersion}`,
    debug: true,            // screenshots per command
    networkLogs: true,
  },
});

export const config: WebdriverIO.Config = {
  ...shared,

  user: process.env.BROWSERSTACK_USERNAME,
  key: process.env.BROWSERSTACK_ACCESS_KEY,

  // Two real devices in parallel
  maxInstances: 2,

  services: [
    [
      'browserstack',
      {
        app: process.env.BROWSERSTACK_APP_ID ?? APK_PATH,
        browserstackLocal: false,
      },
    ],
  ],

  capabilities: [
    bstackOptions('Google Pixel 8', '14.0'),
    bstackOptions('Samsung Galaxy S24', '14.0'),
  ],
};
