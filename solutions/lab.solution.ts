// Solution for test/specs/lab.spec.ts - copy the bodies into the lab file (don't peek too soon)
import FormsScreen from '../test/screens/FormsScreen.js';

export async function exercise1() {
  const text = 'Hello PXL';
  await FormsScreen.input.setValue(text);
  await expect(FormsScreen.inputTextResult).toHaveText(expect.stringContaining(text));
}

export async function exercise2() {
  await FormsScreen.switch.click();
  await expect(FormsScreen.switchText).toHaveText('Click to turn the switch OFF');
}
