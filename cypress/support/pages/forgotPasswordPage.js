class ForgotPasswordPage {
  visit() {
    cy.visit('/auth/login')
  }
  clickForgotPassword() {
    cy.get(".oxd-text.orangehrm-login-forgot-header").click();
  }
  typeUsername(username) {
    cy.get('input[name="username"]').type(username);
  }
  interceptForgot() {
    cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/sendPasswordReset').as('sendPasswordReset');
  }
  clickReset() {
    cy.get("button[type='submit']").click();
  }
  verifyintercept() {
    cy.wait("@sendPasswordReset").its("response.statusCode").should("eq", 200);
  }
  verifyRequiredField() {
    cy.get(".oxd-input-group__message").should("contain.text", "Required");
  }
  verifyResetSuccess() {
    cy.contains("Reset Password link sent successfully").should("be.visible");
  }
}

export default new ForgotPasswordPage();
