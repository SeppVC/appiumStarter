import TabBar from '../screens/TabBar.js';
import SwipeScreen from '../screens/SwipeScreen.js';

describe('Gestures', () => {
  it('scrolls down until the hidden logo is visible', async () => {
    await TabBar.waitForTabBarShown();
    await TabBar.openSwipe();
    await SwipeScreen.waitForIsShown();

    // scrollIntoView performs real swipe gestures on native apps until the element is on screen
    await SwipeScreen.logo.scrollIntoView({
      scrollableElement: await SwipeScreen.screen,
      direction: 'up', // finger moves up = content scrolls down
      maxScrolls: 5,
      percent: 0.99,
    });

    await expect(SwipeScreen.logo).toBeDisplayed();
  });
});
