# Appium training - starter project

WebdriverIO + Appium 3 + TypeScript tests for the
[WebdriverIO native demo app](https://github.com/webdriverio/native-demo-app) (Android, v2.2.0).

## Prerequisites
Everything from the install message in Teams: Node 24, Android Studio + emulator,
`ANDROID_HOME` / `JAVA_HOME`, `npm i -g appium`, `appium driver install uiautomator2`.
Check with: `appium driver doctor uiautomator2`

## Run locally
```bash
npm install              # also downloads the demo APK into ./apps
# start your emulator first (adb devices -> emulator-5554  device)
npm test                 # all specs
npm run test:login       # one spec
npm run test:lab         # the lab exercise
```
Let Appium boot the emulator for you: `AVD=Pixel_8 npm test`
(PowerShell: `$env:AVD="Pixel_8"; npm test`). Find the name with `emulator -list-avds`.

Appium log: `logs/appium.log`

Cheat sheet with adb & Appium commands (appPackage/appActivity, install, logs, ...): [COMMANDS.md](COMMANDS.md)

## Run on BrowserStack
```bash
export BROWSERSTACK_USERNAME=...        # PowerShell: $env:BROWSERSTACK_USERNAME="..."
export BROWSERSTACK_ACCESS_KEY=...
npm run test:bs
```
The BrowserStack service uploads the APK and runs on 2 real devices in parallel.
Results, video and logs: https://app-automate.browserstack.com

## CI/CD
- `.github/workflows/browserstack.yml` - every push/PR, real devices (needs the two secrets)
- `.github/workflows/emulator.yml` - manual, Android emulator inside GitHub Actions

## Structure
```
config/
  wdio.shared.conf.ts         shared settings (timeouts, mocha, reporter)
  wdio.android.conf.ts        local emulator + Appium service
  wdio.browserstack.conf.ts   BrowserStack real devices
test/
  screens/                    screen objects (page object pattern for apps)
  specs/                      tests (lab.spec.ts = exercise)
scripts/download-app.mjs      fetches the demo APK
```

## Troubleshooting
| Symptom | Fix |
|---|---|
| `Could not find a connected Android device` | Start the emulator, check `adb devices` |
| `ANDROID_HOME ... not exported` | Set the variable, then restart terminal **and** VS Code |
| `Could not find a driver for automationName 'UiAutomator2'` | `appium driver install uiautomator2` |
| `spawn appium ENOENT` | Appium not installed globally / npm global folder not on PATH |
| App file not found | `npm run download:app` |
| Element not found | Open the screen in Appium Inspector and verify the accessibility id |
