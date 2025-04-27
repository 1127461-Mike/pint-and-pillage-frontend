/* eslint-env cypress */
describe('Login', () => {
    beforeEach(() => {
        cy.visit('/login');
    });

    it('should display login form elements', () => {
        cy.get('input[type="text"]').should('exist');
        cy.get('input[type="password"]').should('exist');
        cy.get('button.submitButton').should('exist');
    });

    it('should show error message with invalid credentials', () => {
        cy.get('input[type="text"]').type('invalid@email.com');
        cy.get('input[type="password"]').type('wrongpassword');
        cy.get('button.submitButton').click();
        
        cy.get('.v-toast-error').should('be.visible');
        cy.get('.v-toast-error').should('contain', 'Something went wrong');
    });

    it('should successfully login with valid credentials', () => {
        cy.get('input[type="text"]').type('test5@mail.com');
        cy.get('input[type="password"]').type('Test123!');
        cy.get('button.submitButton').click();
        
        cy.url().should('not.include', '/login');
        cy.url().should('include', '/');
        
        cy.window().its('localStorage.token').should('exist');
    });

    it('should redirect to home page when accessing protected route without token', () => {
        cy.clearLocalStorage();
        cy.visit('/');
        
        cy.url().should('include', '/homepage');
    });
});