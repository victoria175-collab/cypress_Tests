Cypress.on('uncaught:exception', () => {
  return false;
});

describe('Offre d\'emploi', () => {
    beforeEach(() => {
      cy.visit('http://10.0.102.67:4201/fr/auth/login');  
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
      cy.wait(2000)
      // cy.contains('span', /Utilisateurs/i).click({force: true});
      cy.contains('a', /Utilisateurs/i).click({force: true});
      cy.contains('span', /Ajouter un utilisateur/i).click({force: true});
      cy.contains('p', 'Tous les champs de ce formulaire sont obligatoires.').should('be.visible');
      cy.get('input[formcontrolname="login"]').type('THE fourth');
      cy.get('input[formcontrolname="password"]').type('saarsaarsaraehrsaar');
      cy.get('input[formcontrolname="lastName"]').type('Epassy');
      cy.get('input[formcontrolname="firstName"]').type('Che');
      cy.get('input[formcontrolname="email"]').type('leocadiearistone3@gmail.com');
      cy.get('input[formcontrolname="telephone"]').type('692380589');
      cy.get('select[formcontrolname="userType"]').select('ADMINISTRATEUR');
   
      cy.contains('button',  /Enregistrer/i).click()
      cy.get('body', { timeout: 15000 }).then(($body) => {
        if ($body.find('button:contains("OK")').length > 0) {
            cy.contains('button', /OK/i).click({ force: true }, {timeout: 10000 });
        } else {
            cy.contains('button', 'Réessayer').click({ force: true });
        }
    });
}); 

      // cy.contains('button', /Enregistrer/i).click();
      // cy.contains('button', 'OK').click({force: true});
   

    // it('Suppression d\'un utilisateur', () => {
      

    // });

    
});    