/**
 * Base class for every screen object.
 * A screen knows its own "anchor" element, so a test can wait until the screen is really there.
 */
export default class AppScreen {
  constructor(private readonly anchor: string) {}

  async waitForIsShown(isShown = true): Promise<void> {
    await $(this.anchor).waitForDisplayed({ reverse: !isShown });
  }

  /** The soft keyboard can cover the button you want to tap */
  protected async hideKeyboard(): Promise<void> {
    if (await driver.isKeyboardShown()) {
      await driver.hideKeyboard();
    }
  }
}
