describe('World Map', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.get('input[type="text"]').type('test5@mail.com');
    cy.get('input[type="password"]').type('Test123!');
    cy.get('button.submitButton').click();
    
    cy.url().should('include', '/');
    
    cy.visit('/world');
  });

  it('should display the world map', () => {
    cy.get('.worldMapBackground').should('exist');
    cy.get('.gridContainer2').should('exist');
    cy.get('.worldRow').should('exist');
    cy.get('.worldTile').should('exist');
  });

  it('should show villages on the map', () => {
    cy.get('.villageTile').should('exist');
  });

  it('should open village modal when clicking on a village', () => {
    cy.get('.villageTile').first().click();
    
    cy.get('.outerModalBox', { timeout: 10000 }).should('be.visible');
  });

});