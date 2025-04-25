/* eslint-env cypress */
describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should display login form elements', () => {
    cy.get('input[type="text"]').should('exist');
    cy.get('input[type="password"]').should('exist');
    cy.get('button.submitButton').should('exist');
    cy.get('a.redirects').should('have.length', 2);
  });

  it('should show error message with invalid credentials', () => {
    cy.get('input[type="text"]').type('invalid@email.com');
    cy.get('input[type="password"]').type('wrongpassword');
    cy.get('button.submitButton').click();
    
    // Check for toaster error message
    cy.get('.v-toast').should('be.visible');
    cy.get('.v-toast').should('contain', 'Invalid credentials');
  });

  it('should successfully login with valid credentials', () => {
    // Use environment variables for test credentials
    const testEmail = Cypress.env('TEST_EMAIL') || 'test@example.com';
    const testPassword = Cypress.env('TEST_PASSWORD') || 'Test123!';

    cy.get('input[type="text"]').type(testEmail);
    cy.get('input[type="password"]').type(testPassword);
    cy.get('button.submitButton').click();
    
    // Check if we're redirected to the village page
    cy.url().should('not.include', '/login');
    cy.url().should('include', '/');
    
    // Check if we're logged in by verifying the token is set
    cy.window().its('localStorage.token').should('exist');
  });
}); 