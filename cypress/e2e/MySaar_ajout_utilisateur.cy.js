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
      cy.wait(2000)
      cy.contains('a', /Utilisateurs/i).click({force: true});
      cy.contains('span', /Ajouter un utilisateur/i, {timeout: 15000}).click({force: true});  
  });

  it('Ajout nominal d\'un utilisateur', () => { 
      cy.contains('p', 'Tous les champs de ce formulaire sont obligatoires.').should('be.visible');
      cy.get('input[formcontrolname="login"]').type('Ticket bug Mysaar 1');
      cy.get('input[formcontrolname="password"]').type('Madeformeonlyforme');
      cy.get('input[formcontrolname="lastName"]').type('Adele');
      cy.get('input[formcontrolname="firstName"]').should('not.be.disabled').type('Dadju');
      cy.get('input[formcontrolname="email"]').type('leocadiearistone3@gmail.com');
      cy.get('input[formcontrolname="telephone"]').type('692380589');
      cy.get('select[formcontrolname="userType"]').select('GESTIONNAIRE_SINISTRE');
      cy.contains('button',  /Enregistrer/i).click();
      cy.get('body').should(($b) => {
        const okExists = $b.find('button:contains("OK")').length > 0;
        const retryExists = $b.find('button:contains("Réessayer")').length > 0;
        expect(okExists || retryExists).to.be.true;
      }).then(($body) => {

          if ($body.find('button:contains("OK")').length > 0) {
              cy.contains('button', "OK", {timeout: 150000}).click({ force: true });
           } else {
              cy.contains('button', 'Réessayer', {timeout: 200000}).click({ force: true });
           }
      });
  });   

  it('Ajout uttilsateur mot de passe errone message clair: des critere avant validation, bouton enregistrer reste grise', () => {
      cy.contains('p', 'Tous les champs de ce formulaire sont obligatoires.').should('be.visible');
      cy.get('input[formcontrolname="login"]').type('Ticket bug 7');
      cy.get('input[formcontrolname="password"]').type('Madef');
      cy.contains('div', 'Le mot de passe est trop court. Minimum 7 caractères.').should('be.visible');
      cy.get('input[formcontrolname="lastName"]').type('Red');
      cy.get('input[formcontrolname="firstName"]').type('Gims');
      cy.get('input[formcontrolname="email"]').type('leocadiearistone3@gmail.com');
      cy.get('input[formcontrolname="telephone"]').type('692380589');
      cy.get('select[formcontrolname="userType"]').select('ADMINISTRATEUR');
      cy.contains('button',  /Enregistrer/i, {timeout: 150000}).should('be.disabled');
  }); 

  it('fermeture formulaire avec la croix', () => {
      
      cy.get('button')
        .filter(':has(path[d="M18 6 6 18"])').eq(0)
        .click();
  }); 
      

  it('validation champ email et numero de telephone', () => {
      cy.contains('p', 'Tous les champs de ce formulaire sont obligatoires.').should('be.visible');
      cy.get('input[formcontrolname="login"]').type('Ticket bug 5');
      cy.get('input[formcontrolname="password"]').type('Madef');
      cy.get('input[formcontrolname="lastName"]').type('Red');
      cy.get('input[formcontrolname="firstName"]').type('Gims');
      cy.get('input[formcontrolname="email"]').type('leocadiearistone3@');
      cy.contains('div', 'L\'email n\'a pas de nom de domaine').should('be.visible');
      cy.get('input[formcontrolname="telephone"]').type('692380589kkk');
      cy.contains('div', 'Le numéro de téléphone est incorrect').should('be.visible');
      cy.get('select[formcontrolname="userType"]').select('ADMINISTRATEUR');
      cy.contains('button',  /Enregistrer/i, {timeout: 150000}).should('be.disabled');
  }); 

  
  it('Verification des doublons d\'utilisateur', () => {
    const login = 'Ticket bug 6';
       const num = '692380589'

    const remplirFormulaireUti = () => {
      cy.contains('p', 'Tous les champs de ce formulaire sont obligatoires.').should('be.visible');
      cy.get('input[formcontrolname="login"]').type(login);
      cy.get('input[formcontrolname="password"]').type('Madeformeonlyforme');
      cy.get('input[formcontrolname="lastName"]').type('Awa-Adele');
      cy.get('input[formcontrolname="firstName"]').should('not.be.disabled').type('Miracle');
      cy.get('input[formcontrolname="email"]').type('vicky7@gmail.com');
      cy.get('input[formcontrolname="telephone"]').type(num);
      cy.get('select[formcontrolname="userType"]').select('ADMINISTRATEUR');
      cy.contains('button',  /Enregistrer/i).click();
      cy.contains('button', "OK", {timeout: 150000}).click({ force: true });

    }

    remplirFormulaireUti();
    remplirFormulaireUti();

    cy.wait(3000);

    cy.get('body').then(($body) => {
                
      const countone = $body.find(`:contains("${login}")`).length;
      const counttwo = $body.find(`:contains("${num}")`).length;

      expect(countone, 'Vérification doublon Login').to.be.lessThan(2);
      expect(counttwo, 'Vérification doublon Téléphone').to.be.lessThan(2);
              
    });
  });  


});


    // if (countone > 1) {
    //       throw new Error(`ÉCHEC : ${countone} doublons détectés.`);
    //         } else {
    //         cy.log('SUCCÈS : Aucun doublon créé.');
    //         }
        

    //     if (counttwo > 1) {
    //       throw new Error (`ÉCHEC : ${counttwo} doublons détectés.`);
    //     }else{
    //       cy.log(`SUCCÈS : Aucun doublon créé.`);
    //     }