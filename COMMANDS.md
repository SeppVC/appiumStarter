# Handy commands - adb & Appium

Copy-paste cheat sheet for the training. Examples use the demo app:
package `com.wdiodemoapp`, activity `com.wdiodemoapp.MainActivity`.

> **Windows (PowerShell):** replace `grep` with `findstr` (e.g. `adb shell pm list packages | findstr wdio`).
> Commands after `adb shell` run *on the device*, so `grep` inside the quotes works everywhere.

---

## 1. Devices & emulators

| What | Command |
|---|---|
| List connected devices / emulators | `adb devices` |
| List your emulators (AVDs) | `emulator -list-avds` |
| Start an emulator from the terminal | `emulator -avd Pixel_8` |
| Target one device when several are connected | `adb -s emulator-5554 <command>` |
| Restart adb when a device is `offline` / `unauthorized` | `adb kill-server` then `adb start-server` |
| Android version of the device | `adb shell getprop ro.build.version.release` |
| Device model | `adb shell getprop ro.product.model` |

## 2. Find `appPackage` and `appActivity`

You need these for the `appium:appPackage` / `appium:appActivity` capabilities
(to start an app that is already installed, instead of passing `appium:app`).

**App is open on the device** - open it, then:
```bash
# macOS / Linux
adb shell dumpsys window | grep mCurrentFocus
# Windows
adb shell "dumpsys window | grep mCurrentFocus"
```
Output: `mCurrentFocus=Window{... com.wdiodemoapp/com.wdiodemoapp.MainActivity}`
→ before the `/` is the **package**, after it the **activity**.

**You know the package, want the launch activity:**
```bash
adb shell cmd package resolve-activity --brief com.wdiodemoapp
# → com.wdiodemoapp/.MainActivity   (".MainActivity" = "com.wdiodemoapp.MainActivity")
```

**You only have the .apk file** (`aapt2` is in `$ANDROID_HOME/build-tools/<version>/`):
```bash
aapt2 dump badging apps/android.wdio.native.app.v2.2.0.apk | grep -E "^package:|launchable-activity"
```

**Find a package name by part of its name:**
```bash
adb shell pm list packages | grep wdio
```

## 3. Install, start, stop, uninstall

| What | Command |
|---|---|
| Install an APK | `adb install apps/android.wdio.native.app.v2.2.0.apk` |
| Re-install, keep app data | `adb install -r <file>.apk` |
| Install and grant all permissions | `adb install -g <file>.apk` |
| Uninstall | `adb uninstall com.wdiodemoapp` |
| Start the app | `adb shell am start -n com.wdiodemoapp/.MainActivity` |
| Force-stop the app | `adb shell am force-stop com.wdiodemoapp` |
| Clear app data (fresh start, logged out) | `adb shell pm clear com.wdiodemoapp` |
| Is it installed? Which version? | `adb shell dumpsys package com.wdiodemoapp \| grep versionName` |
| Where is the APK on the device? | `adb shell pm path com.wdiodemoapp` |

## 4. Screenshots, video, files

| What | Command |
|---|---|
| Screenshot to your computer | `adb exec-out screencap -p > screen.png` |
| Record the screen (stop with Ctrl+C, max 3 min) | `adb shell screenrecord /sdcard/demo.mp4` |
| Copy a file from the device | `adb pull /sdcard/demo.mp4 .` |
| Copy a file to the device | `adb push photo.jpg /sdcard/Download/` |

## 5. Interact without a test

| What | Command |
|---|---|
| Type text in the focused field (`%s` = space) | `adb shell input text "Hello%sPXL"` |
| Tap at x,y (pixels) | `adb shell input tap 500 1200` |
| Swipe from x1,y1 to x2,y2 in 300 ms | `adb shell input swipe 500 1500 500 500 300` |
| Back / Home button | `adb shell input keyevent 4` / `adb shell input keyevent 3` |
| Open a deep link | `adb shell am start -W -a android.intent.action.VIEW -d "wdio://login"` |
| Dump the screen's UI tree (like the Inspector) | `adb shell uiautomator dump /sdcard/ui.xml && adb pull /sdcard/ui.xml` |

## 6. Logs

| What | Command |
|---|---|
| Live device log | `adb logcat` |
| Clear the log first (less noise) | `adb logcat -c` |
| Only errors | `adb logcat *:E` |
| Only the demo app (macOS / Linux) | `adb logcat --pid=$(adb shell pidof com.wdiodemoapp)` |
| Appium server log of the last test run | `logs/appium.log` |

## 7. Appium

| What | Command |
|---|---|
| Appium version | `appium --version` |
| Start the server manually (default port 4723) | `appium` |
| Start with the Inspector plugin (for Appium Inspector) | `appium --use-plugins=inspector --allow-cors` |
| Installed drivers / plugins | `appium driver list --installed` / `appium plugin list --installed` |
| Install the Android driver | `appium driver install uiautomator2` |
| Update a driver | `appium driver update uiautomator2` |
| Check your setup (ANDROID_HOME, JAVA_HOME, adb, ...) | `appium driver doctor uiautomator2` |
| Is the server running? | `curl http://127.0.0.1:4723/status` |
| Free port 4723 when "address already in use" (macOS / Linux) | `lsof -ti :4723 \| xargs kill` |

> Our tests (`npm test`) start and stop Appium themselves - you only need `appium` manually for Appium Inspector.

## 8. Appium Inspector - capabilities to start the demo app

App already installed on the emulator:
```json
{
  "platformName": "Android",
  "appium:automationName": "UiAutomator2",
  "appium:appPackage": "com.wdiodemoapp",
  "appium:appActivity": "com.wdiodemoapp.MainActivity"
}
```
Or let Appium install it: replace the last two lines with
`"appium:app": "/full/path/to/apps/android.wdio.native.app.v2.2.0.apk"`.

## 9. Project scripts

| What | Command |
|---|---|
| All specs (local emulator) | `npm test` |
| Login spec / lab / plain example | `npm run test:login` / `npm run test:lab` / `npm run test:example` |
| One spec file of your own | `npx wdio run config/wdio.android.conf.ts --spec test/specs/forms.spec.ts` |
| Let Appium boot the emulator | `AVD=Pixel_8 npm test` (PowerShell: `$env:AVD="Pixel_8"; npm test`) |
| Re-download the demo APK | `npm run download:app` |
| TypeScript check | `npm run typecheck` |
