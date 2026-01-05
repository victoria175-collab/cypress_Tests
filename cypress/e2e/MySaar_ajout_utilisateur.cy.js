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

    it('Ajout nominal d\'un utilisateur', () => {

      cy.get('span.text-sm group-hover:text-red-600 transition-colors').click({force: true});
      cy.contains('span', /Ajouter un utilisateur/i).click({force: true});
      cy.get('input[formcontrolname="login"]').type('head');
      cy.get('input[formcontrolname="password"]').type('saarsaar');
      cy.get('input[formcontrolname="lastname"]').type('Kofane');
      cy.get('input[formcontrolname="firstname"]').type('Tchamadeu');
      cy.get('input[formcontrolname="mail"]').type('leocadiearistone3@gmail.com');
      cy.get('input[formcontrolname="telephone"]').type('672962259');
      cy.get('select[formcontrolname="usertype"]').select('ADMINISTRATEUR');
      cy.contains('button', /Enregistrér/i).click();

    });

    
});    