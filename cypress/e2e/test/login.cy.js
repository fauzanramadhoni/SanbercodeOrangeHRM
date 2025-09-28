describe("Fitur Login OrangeHRM", () => {
  beforeEach(() => {
    cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
  });

    it("TC-001 - Login berhasil dengan kredensial valid", () => {
    cy.get('[name="username"]').type("Admin");
    cy.get('[name="password"]').type("admin123");
    cy.get('button[type="submit"]').click();
    cy.url().should("include", "/dashboard");
  });
    it("TC-002 - Login gagal dengan username salah", () => {
    cy.get('[name="username"]').type("Salah");
    cy.get('[name="password"]').type("admin123");
    cy.get('button[type="submit"]').click();
    cy.get(".oxd-alert-content").should("contain.text", "Invalid credentials");
  });
    it("TC-003 - Login gagal dengan password salah", () => {
    cy.get('[name="username"]').type("Admin");
    cy.get('[name="password"]').type("wrongpass");
    cy.get('button[type="submit"]').click();
    cy.get(".oxd-alert-content").should("contain.text", "Invalid credentials");
  });
    it("TC-004 - Login gagal tanpa input", () => {
    cy.get('button[type="submit"]').click();
    cy.get(".oxd-input-field-error-message").should("have.length",2);
  });
    it("TC-005 - Login gagal dengan hanya password", () => {
    cy.get('[name="password"]').type("admin123");
    cy.get('button[type="submit"]').click();
    cy.get(".oxd-input-field-error-message").should("contain.text", "Required");
  });
    it("TC-006 - Login gagal dengan hanya username", () => {
    cy.get('[name="username"]').type("Admin");
    cy.get('button[type="submit"]').click();
    cy.get(".oxd-input-field-error-message").should("contain.text", "Required");
  });
    it("TC-007 - Login gagal dengan karakter spesial", () => {
    cy.get('[name="username"]').type("@!#$%");
    cy.get('[name="password"]').type("admin123");
    cy.get('button[type="submit"]').click();
    cy.get(".oxd-alert-content").should("contain.text", "Invalid credentials");
  });
    it("TC-008 - Login gagal dengan password uppercase", () => {
    cy.get('[name="username"]').type("Admin");
    cy.get('[name="password"]').type("ADMIN123");
    cy.get('button[type="submit"]').click();
    cy.get(".oxd-alert-content").should("contain.text", "Invalid credentials");
  });
    it("TC-009 - Login gagal dengan spasi di depan username", () => {
    cy.get('[name="username"]').type(" Admin");
    cy.get('[name="password"]').type("admin123");
    cy.get('button[type="submit"]').click();
    cy.get(".oxd-alert-content").should("contain.text", "Invalid credentials");
  });
    it("TC-010 - Login dengan menggunakan tombol enter", () => {
    cy.get('[name="username"]').type("Admin");
    cy.get('[name="password"]').type("admin123{enter}");
    cy.url().should("include", "/dashboard");
  });
  });