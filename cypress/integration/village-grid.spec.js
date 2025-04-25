/* eslint-env cypress */
describe('Village Grid', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.get('input[type="text"]').type('test5@mail.com');
    cy.get('input[type="password"]').type( 'Test123!');
    cy.get('button.submitButton').click();
    
    cy.url().should('include', '/');
  });

  it('should display the village grid', () => {
    cy.get('.gridContainer').should('exist');
    
    cy.get('.grid').should('exist');
    
    cy.get('.row').should('exist');
    cy.get('.tile').should('exist');
  });

  it('should handle zoom functionality', () => {
    cy.get('.gridContainer').first().then(($el) => {
      const initialScale = $el.css('transform');
      
      cy.get('.gridContainer').first().trigger('wheel', { deltaY: -100 });
      
      cy.get('.gridContainer').first().should(($el2) => {
        expect($el2.css('transform')).to.not.equal(initialScale);
      });
    });
  });

  it('should open building modal when clicking on a buildable tile', () => {
    cy.get('.clickableTile').first().click({ force: true });
    
    cy.get('.outerModalBox', { timeout: 10000 }).should('be.visible');
  });

  it('should not open modal when clicking on unclickable tiles', () => {
    cy.get('.tile').find('div:not([class])').first().parent().click({ force: true });
    
    cy.get('.outerModalBox').should('not.exist');
  });
}); 