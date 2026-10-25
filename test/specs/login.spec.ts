import TabBar from '../screens/TabBar.js';
import LoginScreen from '../screens/LoginScreen.js';
import NativeAlert from '../screens/NativeAlert.js';

describe('Login screen', () => {
  beforeEach(async () => {
    await TabBar.waitForTabBarShown();
    await TabBar.openLogin();
    await LoginScreen.waitForIsShown();
  });

  it('logs in with valid credentials', async () => {
    await LoginScreen.login('test@webdriver.io', 'Test1234!');

    await NativeAlert.waitForIsShown();
    expect(await NativeAlert.text()).toContain('Success');

    await NativeAlert.tapButton('OK');
    await NativeAlert.waitForIsShown(false);
  });

  it('signs up a new user', async () => {
    await LoginScreen.signUp('student@pxl.be', 'Test1234!');

    await NativeAlert.waitForIsShown();
    expect(await NativeAlert.text()).toContain('Signed Up');

    await NativeAlert.tapButton('OK');
  });
});
