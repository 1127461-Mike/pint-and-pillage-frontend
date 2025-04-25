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
        
        cy.get('.v-toast-error').should('be.visible');
        cy.get('.v-toast-error').should('contain', 'Something went wrong');
    });

    it('should successfully login with valid credentials', () => {
        const testEmail = 'test5@mail.com';
        const testPassword ='Test123!';

        cy.get('input[type="text"]').type(testEmail);
        cy.get('input[type="password"]').type(testPassword);
        cy.get('button.submitButton').click();
        
        cy.url().should('not.include', '/login');
        cy.url().should('include', '/');
        
        cy.window().its('localStorage.token').should('exist');
    });
});