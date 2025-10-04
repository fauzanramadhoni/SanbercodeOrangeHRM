import loginData from '../../fixtures/loginData.json'
import ForgotPasswordPage from '../../support/pages/forgotPasswordPage.js'

describe("Forgot Password intercept dan POM", () => {
  const forgotPage = ForgotPasswordPage;

  beforeEach(() => {
    forgotPage.visit();
    forgotPage.clickForgotPassword();
  });

  it("TC-001 Berhasil reset password dengan username valid", () => {
   forgotPage.typeUsername(loginData.validUsername);
   forgotPage.interceptForgot();
   forgotPage.clickReset();
   forgotPage.verifyintercept();
   forgotPage.verifyResetSuccess();
  });

  it("TC-002 Gagal reset password dengan username salah", () => {
   forgotPage.typeUsername('salah');
   forgotPage.clickReset();
     cy.contains("Reset Password link sent successfully").should("not.exist");
  });

  it("TC-003 - Gagal reset password dengan username kosong", () => {
    forgotPage.clickReset();
    forgotPage.verifyRequiredField();
  });

  it("TC-005 - Username lowercase tidak diterima", () => {
    forgotPage.typeUsername(loginData.lowercaseUsername);
    forgotPage.clickReset();
    forgotPage.verifyResetSuccess();
  });
});
