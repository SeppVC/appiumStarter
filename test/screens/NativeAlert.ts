/**
 * A native Android dialog is NOT part of the app's own view tree,
 * so it has no accessibility ids: we fall back to resource-id and text (XPath).
 */
const ALERT_TITLE = '//android.widget.TextView[@resource-id="com.wdiodemoapp:id/alert_title"]';
const ALERT_MESSAGE = '//android.widget.TextView[@resource-id="android:id/message"]';

export default class NativeAlert {
  static async waitForIsShown(isShown = true): Promise<void> {
    await $(ALERT_TITLE).waitForExist({ timeout: 11_000, reverse: !isShown });
  }

  static async text(): Promise<string> {
    return `${await $(ALERT_TITLE).getText()}\n${await $(ALERT_MESSAGE).getText()}`;
  }

  /** Android renders dialog buttons in upper case */
  static async tapButton(label: string): Promise<void> {
    await $(`//android.widget.Button[@text="${label.toUpperCase()}"]`).click();
  }
}
