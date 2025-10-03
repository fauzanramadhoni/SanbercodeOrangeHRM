class loginPage {
  visit() {
    cy.visit('/auth/login')
  }
  typeUsername(username) {
    cy.get('input[name="username"]').type(username);
  }
  typePassword(password) {
    cy.get('input[name="password"]').type(password);
  }
  interceptLogin(){
  cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/action-summary').as('actionSummary');
  }
  clickLogin() {
    cy.get('button[type="submit"]').click();
  }
   pressEnterLogin() {
    cy.get('button[type="submit"]').type("{enter}");
  }
  verifyIntercept() {
    cy.wait('@actionSummary').its('response.statusCode').should('eq', 200);
  }
  verifyLoginSuccess() {
    cy.url().should("include", "/dashboard");
  }
  verifyLoginFailed() {
    cy.get(".oxd-alert-content").should("contain.text", "Invalid credentials");
  }
  verifyUsernameFailed() {
    cy.get(".oxd-input-field-error-message").should("contain.text", "Required");
  }
  verifyPasswordFailed() {
    cy.get(".oxd-input-field-error-message").should("contain.text", "Required");
  }
  verifyRequiredField() {
    cy.get(".oxd-input-field-error-message").should("have.length", 2).each($el => {
        expect($el).to.contain.text('Required');
      });
  }
  verifyPlaceholder() {
    cy.get('input[name="username"]').should('have.attr', 'placeholder', 'Username');
    cy.get('input[name="password"]').should('have.attr', 'placeholder', 'Password');
  }
  clickForgotPassword() {
  cy.contains("Forgot your password?").click();
  }
}
export default new loginPage();