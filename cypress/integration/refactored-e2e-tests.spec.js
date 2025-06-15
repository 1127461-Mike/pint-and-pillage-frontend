/* eslint-env cypress */
describe('Refactored E2E Tests', () => {
    
    it('should display village grid with clickable tiles', () => {
        cy.visit('/login');
        cy.get('[data-testid="username-input"]').type('test5@mail.com');
        cy.get('[data-testid="password-input"]').type('Test123!');
        cy.get('[data-testid="login-button"]').click();
        
        cy.url().should('not.include', '/login');
        cy.url().should('include', '/');
        
        // Test village grid exists
        cy.get('[data-testid="village-grid"]').should('exist');
        cy.get('[data-testid="grid"]').should('exist');
        
        cy.get('[data-testid="tile-BaseTile"]').should('exist');
    });

    it('should show error message on invalid login', () => {
        cy.visit('/login');
        
        cy.get('[data-testid="login-form"]').should('exist');
        cy.get('[data-testid="username-input"]').should('exist');
        cy.get('[data-testid="password-input"]').should('exist');
        cy.get('[data-testid="login-button"]').should('exist');
        
        cy.get('[data-testid="username-input"]').type('invalid@email.com');
        cy.get('[data-testid="password-input"]').type('wrongpassword');
        cy.get('[data-testid="login-button"]').click();
        
        cy.get('.v-toast-error').should('be.visible');
        cy.get('.v-toast-error').should('contain', 'Something went wrong');
    });
}); 