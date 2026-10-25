import TabBar from '../screens/TabBar.js';
import FormsScreen from '../screens/FormsScreen.js';

/**
 * LAB - run with:  npm run test:lab
 *
 * Exercise 1
 *   Create a screen object for the Forms screen in test/screens/
 *   (look at the other screens to see how they are built).
 *   Then type "Hello PXL" in the text field and check that the result
 *   label below it shows the same text.
 *
 * Exercise 2 (bonus)
 *   Turn the switch ON and check the text under it.
 */
describe('Lab', () => {
  beforeEach(async () => {
    await TabBar.waitForTabBarShown();
    await TabBar.openForms();
    await FormsScreen.waitForIsShown();
  });

  it('exercise 1: echoes the typed text', async () => {
    const text = 'Hello PXL';

    await FormsScreen.input.setValue(text);

    await expect(FormsScreen.inputTextResult).toHaveText(expect.stringContaining(text));
  });

  it('exercise 2 (bonus): shows the switch state as text', async () => {
    await FormsScreen.switch.click();

    await expect(FormsScreen.switchText).toHaveText('Click to turn the switch OFF');
  });
});
