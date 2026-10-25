/**
 * Bottom navigation of the demo app.
 * `~Login` = accessibility id selector (content-desc on Android, accessibilityIdentifier on iOS).
 */
export default class TabBar {
  static async waitForTabBarShown(): Promise<void> {
    await $('~Home').waitForDisplayed({ timeout: 30_000 });
  }

  static async openHome()  { await $('~Home').click(); }
  static async openLogin() { await $('~Login').click(); }
  static async openForms() { await $('~Forms').click(); }
  static async openSwipe() { await $('~Swipe').click(); }
}
