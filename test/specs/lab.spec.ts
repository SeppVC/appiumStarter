import TabBar from '../screens/TabBar.js';
import FormsScreen from '../screens/FormsScreen.js';

/**
 * LAB (10 minutes) - run with:  npm run test:lab
 *
 * Exercise 1
 *   Type "Hello PXL" in the text field on the Forms screen and check that
 *   the result label below it shows the same text.
 *   Tip: open the Forms screen in Appium Inspector to find the accessibility ids.
 *
 * Exercise 2 (bonus)
 *   Turn the switch ON and check the text under it.
 *   What does it say? Use the Inspector, don't guess.
 */
describe('Lab', () => {
  beforeEach(async () => {
    await TabBar.waitForTabBarShown();
    await TabBar.openForms();
    await FormsScreen.waitForIsShown();
  });

  it('exercise 1: echoes the typed text', async () => {
    const text = 'Hello PXL';

    // TODO 1: type `text` in the input field (hint: FormsScreen.input + setValue)

    // TODO 2: assert the result label contains `text`
    //         (hint: await expect(FormsScreen.inputTextResult).toHaveText(...))

    expect(text).toBe('remove this line once you wrote the test');
  });

  it.skip('exercise 2 (bonus): shows the switch state as text', async () => {
    // TODO: click the switch, then assert FormsScreen.switchText has the right text
  });
});
