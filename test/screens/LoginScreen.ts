import AppScreen from './AppScreen.js';

class LoginScreen extends AppScreen {
  constructor() {
    super('~Login-screen');
  }

  // --- elements (all accessibility ids, found with Appium Inspector) ---
  get screen()            { return $('~Login-screen'); }
  get loginTab()          { return $('~button-login-container'); }
  get signUpTab()         { return $('~button-sign-up-container'); }
  get email()             { return $('~input-email'); }
  get password()          { return $('~input-password'); }
  get repeatPassword()    { return $('~input-repeat-password'); }
  get loginButton()       { return $('~button-LOGIN'); }
  get signUpButton()      { return $('~button-SIGN UP'); }

  // --- actions ---
  async login(email: string, password: string): Promise<void> {
    await this.loginTab.click();
    await this.email.setValue(email);
    await this.password.setValue(password);
    await this.hideKeyboard();
    await this.loginButton.click();
  }

  async signUp(email: string, password: string): Promise<void> {
    await this.signUpTab.click();
    await this.email.setValue(email);
    await this.password.setValue(password);
    await this.repeatPassword.setValue(password);
    await this.hideKeyboard();
    // On small screens the button can be hidden below the fold
    await this.signUpButton.scrollIntoView({ scrollableElement: await this.screen });
    await this.signUpButton.click();
  }
}

export default new LoginScreen();
