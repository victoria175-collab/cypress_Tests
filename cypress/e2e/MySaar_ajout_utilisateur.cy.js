Cypress.on('uncaught:exception', () => {
  return false;
});

describe('Offre d\'emploi', () => {
    beforeEach(() => {
      cy.visit('http://10.0.102.67:4201/fr/auth/login');
      cy.wait(1000)   
      cy.get('input[placeholder="Votre identifiant"]') 
        .type('admin'); 
      cy.get('input[placeholder="Votre mot de passe')
        .type('120987654321'); 
      cy.get('input[formcontrolname="rememberMe"]')
        .click(); 
      cy.contains('div.flex', /Se connecter/i)
        .click();
    });



    
});    