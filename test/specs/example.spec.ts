/**
 * Example test for the login flow.
 * Run with:  npm run test:example
 *
 * Everything (locators, actions, checks) lives in this one file.
 * Compare it with login.spec.ts + screens/LoginScreen.ts to see what the POM buys you:
 * here every test repeats the same selectors, so one changed id means editing every test.
 *
 * Before this file runs, WebdriverIO has already (see config/wdio.android.conf.ts):
 *   1. started the Appium server
 *   2. installed and launched the demo app on the emulator
 *   3. given us the global `driver` (the session) and `$` (find one element)
 */
describe('Login - plain script (no page objects)', () => {
  it('logs in with valid credentials', async () => {
    // --- 1. Wait until the app is ready ---
    // `~Home` = accessibility id. On Android that is the element's `content-desc`.
    // The app needs a few seconds to start, so wait for the bottom tab bar to appear.
    await $('~Home').waitForDisplayed({ timeout: 30_000 });

    // --- 2. Navigate to the Login screen ---
    // Tap the "Login" tab in the bottom navigation...
    await $('~Login').click();
    // ...and wait until the Login screen itself is visible before touching it
    await $('~Login-screen').waitForDisplayed();

    // --- 3. Fill in the form ---
    // The screen has two tabs (Login / Sign up): make sure "Login" is selected
    await $('~button-login-container').click();
    // setValue = clear the field, then type the text
    await $('~input-email').setValue('test@webdriver.io');
    await $('~input-password').setValue('Test1234!');

    // The soft keyboard can cover the LOGIN button, so close it first
    if (await driver.isKeyboardShown()) {
      await driver.hideKeyboard();
    }

    // --- 4. Submit ---
    await $('~button-LOGIN').click();

    // --- 5. Check the result ---
    // The app answers with a native Android dialog. That dialog is not part of the
    // app's own screens, so it has no accessibility ids: we use XPath on resource-id instead.
    const alertTitle = $('//android.widget.TextView[@resource-id="com.wdiodemoapp:id/alert_title"]');
    const alertMessage = $('//android.widget.TextView[@resource-id="android:id/message"]');

    // waitForExist: the dialog appears after a short delay
    await alertTitle.waitForExist({ timeout: 11_000 });

    // The actual assertions: this is where the test passes or fails
    await expect(alertTitle).toHaveText('Success');
    await expect(alertMessage).toHaveText('You are logged in!');

    // --- 6. Clean up ---
    // Close the dialog (Android shows button labels in upper case)...
    await $('//android.widget.Button[@text="OK"]').click();
    // ...and check it is really gone, so the next test starts from a clean screen
    await alertTitle.waitForExist({ reverse: true });
  });
});
