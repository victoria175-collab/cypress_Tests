Cypress.on('uncaught:exception', () => {
  return false;
});

describe('Actualité', () => {
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
      cy.contains('a', /Actualités/i)
        .click({force: true});  
    });

    it('Remplissage de formulaire nominal', () => {
      cy.contains('button', 'Nouvelle actualité').click();
      cy.get('#titre').type('Actualité 1');
      cy.get('#type').select('ARTICLE');
      cy.get('#date').type('2011-01-20');
      cy.get('#image').type('http://10.0.102.67:4201/assets/img/logo.png');
      cy.get('#texte').type('Voici ce que nous vous proposons comme bonne pratique pour la saison qui arrive!!!');
      cy.contains('span', /Publier l'\actualité/i).click();
      cy.contains('button', 'OK').click();
    });


    // it.only('Vérification de la gestion des doublons', () => {
    //     const titreActu = 'Voyons comment échapper aux sinistres en cette saison ';

    //     const remplirFormulaire = () => {
    //         cy.contains('button', 'Nouvelle actualité').click();
    //         cy.get('#titre').type(titreActu);
    //         cy.get('#type').select('ARTICLE');
    //         cy.get('#date').type('2011-01-20');
    //         cy.get('#image').type('http://10.0.102.67:4201/assets/img/logo.png');
    //         cy.get('#texte').type('Il sera question des prendre de dispositions pour bien vivre la nouvelle saison tout en préservant nos biens.');
    //         cy.contains('span', /Publier l'actualité/i).click();
    //         cy.contains('button', 'OK').click();
    //     };

    //     remplirFormulaire(); 
    //     remplirFormulaire(); 

    //     cy.wait(3000);
    //     cy.get('body').then(($body) => {
                
    //         const count = $body.find(`:contains("${titreActu}")`).length;

    //         if (count > 1) {
    //         throw new Error(`ÉCHEC : ${count} doublons détectés.`);
    //         } else {
    //         cy.log('SUCCÈS : Aucun doublon créé.');
    //         }
    //     });
    // });


});     
