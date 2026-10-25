import { config as shared, APK_PATH } from './wdio.shared.conf.js';

/**
 * Local run: Appium server on your machine + Android emulator.
 *
 * Before `npm test`:
 *   1. Start your emulator (Android Studio > Device Manager), check with `adb devices`
 *   2. That's it - the Appium service starts and stops the Appium server for you.
 *
 * Optional: let Appium boot the emulator itself:  AVD=Pixel_8 npm test   (name from `emulator -list-avds`)
 */
export const config: WebdriverIO.Config = {
  ...shared,

  services: [
    [
      'appium',
      {
        command: 'appium', // the globally installed Appium 3 (npm i -g appium)
        args: {
          log: './logs/appium.log',
        },
      },
    ],
  ],

  capabilities: [
    {
      platformName: 'Android',
      'appium:automationName': 'UiAutomator2',
      'appium:deviceName': 'Android Emulator', // UiAutomator2 takes the first device from `adb devices`
      'appium:app': APK_PATH,
      'appium:appWaitActivity': 'com.wdiodemoapp.MainActivity',
      'appium:autoGrantPermissions': true,
      'appium:newCommandTimeout': 240,
      ...(process.env.AVD ? { 'appium:avd': process.env.AVD } : {}),
    },
  ],

  before: async () => {
    // UiSelector lookups wait 10s by default when nothing is found; 3s is plenty here
    await driver.updateSettings({ waitForSelectorTimeout: 3_000 });
  },
};
