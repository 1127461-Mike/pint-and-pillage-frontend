/* eslint-env cypress */
describe('Village Selector', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.get('input[type="text"]').type('test5@mail.com');
    cy.get('input[type="password"]').type('Test123!');
    cy.get('button.submitButton').click();
    cy.url().should('include', '/');
  });

  it('should display village selector with current village', () => {
    cy.get('.villageSelector').should('exist');
    cy.get('.villageSelector p').should('exist');
  });

  it('should show dropdown when clicked', () => {
    cy.get('.villageSelector').click();
    cy.get('.dropdown').should('exist');
    cy.get('.dropdownItems').should('exist');
  });

  it('should switch village when selecting from dropdown', () => {
    let initialVillageName;
    cy.get('.villageSelector p').invoke('text').then((text) => {
      initialVillageName = text;
    });
    
    cy.get('.villageSelector').click();
    
    cy.get('.dropdownItems').should('have.length.at.least', 1).then(($items) => {
      if ($items.length > 1) {
        cy.get('.dropdownItems').eq(1).click({ force: true });
        
        cy.get('.villageSelector p').should(($el) => {
          const currentText = $el.text();
          expect(currentText).to.not.equal(initialVillageName);
        });
      } else {
        cy.log('Skipping test: Only one village available');
      }
    });
  });

  it('should close dropdown when clicking outside', () => {
    cy.get('.villageSelector').click();
    cy.get('.dropdown').should('exist');
    
    cy.get('body').click(0, 0);
    
    cy.get('.dropdown').should('not.be.visible');
  });
}); 