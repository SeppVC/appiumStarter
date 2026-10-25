import TabBar from '../screens/TabBar.js';
import FormsScreen from '../screens/FormsScreen.js';

describe('Forms screen', () => {
  beforeEach(async () => {
    await TabBar.waitForTabBarShown();
    await TabBar.openForms();
    await FormsScreen.waitForIsShown();
  });

  it('toggles the switch on and off', async () => {
    expect(await FormsScreen.isSwitchOn()).toBe(false);

    await FormsScreen.switch.click();
    expect(await FormsScreen.isSwitchOn()).toBe(true);

    await FormsScreen.switch.click();
    expect(await FormsScreen.isSwitchOn()).toBe(false);
  });

  it('selects a value from the dropdown', async () => {
    await FormsScreen.selectDropDownValue('Appium is awesome');
    expect(await FormsScreen.dropDownValue()).toContain('Appium is awesome');
  });
});
