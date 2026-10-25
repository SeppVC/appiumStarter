import AppScreen from './AppScreen.js';

class FormsScreen extends AppScreen {
  constructor() {
    super('~Forms-screen');
  }

  get screen()          { return $('~Forms-screen'); }
  get input()           { return $('~text-input'); }
  get inputTextResult() { return $('~input-text-result'); }
  get switch()          { return $('~switch'); }
  get switchText()      { return $('~switch-text'); }
  get dropDown()        { return $('~Dropdown'); }

  /** Android exposes the switch state as the `checked` attribute ("true"/"false") */
  async isSwitchOn(): Promise<boolean> {
    return (await this.switch.getAttribute('checked')) === 'true';
  }

  /** The selected dropdown value lives in a child EditText without its own id */
  async dropDownValue(): Promise<string> {
    return $('//*[@content-desc="Dropdown"]//android.widget.EditText').getText();
  }

  async selectDropDownValue(value: string): Promise<void> {
    await this.dropDown.click();
    // The picker is a native list: select the option by its visible text (UiAutomator selector)
    await $(`android=new UiSelector().text("${value}")`).click();
  }
}

export default new FormsScreen();
