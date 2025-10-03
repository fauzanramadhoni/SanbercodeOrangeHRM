import loginData from '../../fixtures/loginData.json'
import LoginPage from '../../support/pages/loginPage.js'

describe("Login menggunakan POM", () => {
  const loginPage = LoginPage;

  beforeEach(() => {
    loginPage.visit();
  });

  it("TC-001 - Login berhasil dengan kredensial valid", () => {
    loginPage.typeUsername(loginData.validUsername);
    loginPage.typePassword(loginData.validPassword);
    loginPage.interceptLogin();
    loginPage.clickLogin();
    loginPage.verifyIntercept();
    loginPage.verifyLoginSuccess();
  });

  it("TC-002 - Login gagal dengan username salah", () => {
    loginPage.typeUsername(loginData.invalidUsername);
    loginPage.typePassword(loginData.validPassword);
    loginPage.clickLogin();
    loginPage.verifyLoginFailed();
  });

  it("TC-003 - Login gagal dengan password salah", () => {
    loginPage.typeUsername(loginData.validUsername);
    loginPage.typePassword(loginData.invalidPassword);
    loginPage.clickLogin();
    loginPage.verifyLoginFailed();
  });

  it("TC-004 - Login gagal tanpa input", () => {
    loginPage.clickLogin();
    loginPage.verifyRequiredField();
  });

  it("TC-005 - Login gagal dengan hanya password", () => {
    loginPage.typePassword(loginData.validPassword);
    loginPage.clickLogin();
    loginPage.verifyUsernameFailed();
  });

  it("TC-006 - Login gagal dengan hanya username", () => {
    loginPage.typeUsername(loginData.validUsername);
    loginPage.clickLogin();
    loginPage.verifyPasswordFailed();
  });

  it("TC-007 - Login gagal dengan karakter spesial", () => {
    loginPage.typeUsername(loginData.specialCharUsername);
    loginPage.typePassword(loginData.validPassword);
    loginPage.clickLogin();
    loginPage.verifyLoginFailed();
  });

  it("TC-008 - Login gagal dengan password uppercase", () => {
    loginPage.typeUsername(loginData.validUsername);
    loginPage.typePassword(loginData.upperCasePassword);
    loginPage.clickLogin();
    loginPage.verifyLoginFailed();
  });

  it("TC-009 - Login gagal dengan spasi di depan username", () => {
    loginPage.typeUsername(loginData.usernameWithSpace);
    loginPage.typePassword(loginData.validPassword);
    loginPage.clickLogin();
    loginPage.verifyLoginFailed();
  });

  it("TC-010 - Login dengan menggunakan tombol enter", () => {
    loginPage.typeUsername(loginData.validUsername);
    loginPage.typePassword(loginData.validPassword);
    loginPage.interceptLogin();
    loginPage.pressEnterLogin();
    loginPage.verifyIntercept();
    loginPage.verifyLoginSuccess();
  });

  });
