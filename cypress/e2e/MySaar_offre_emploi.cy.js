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
     

    //test 1

    it('Offre d\'emploi: remplissage nominal', () => {
      cy.contains('span', /Offres d'emploi/i)
        .click({force: true});
      cy.contains('button', /Nouvelle offre/i).click();  
      cy.get('input[placeholder="Entrez le titre de l\'offre"]').type('Chef de Projet');
      cy.get('textarea[placeholder="Entrez la description de l\'offre"]').type('Personne assez organisée qui a le sens du travail en équipe avec une forte dynamique de leader!!');        
      cy.get('input[placeholder="Entrez la ville"]').type('Douala');
      cy.get('input[placeholder="Entrez la position"]').type('4');
      cy.get('select[formcontrolname="subsidiaryId"]').select('CMN');
      cy.get('input[formcontrolname="startDate"]').type('2026-01-03');
      cy.get('input[formcontrolname="expirationDate"]').type('2026-01-29');
      cy.contains('span', /Publier l\'offre/i).click();
      cy.contains('button', 'OK').click();   
    });


    //test 2

    it('suppression d\'une offre', () => {
      cy.contains('span', /Offres d'emploi/i)
        .click({force: true});
      cy.wait(3000)  
      cy.contains('button', /Supprimer/i).click();
      cy.contains('span', 'Supprimer').click();
      cy.contains('button', 'OK').click();  
    });  
     
    //test 3

    it('modification d\'une offre', () => {
      cy.contains('span', /Offres d'emploi/i)
        .click({force: true});
      cy.wait(3000)
      cy.contains('button', /Modifier/i).click();
      cy.get('textarea[formcontrolname="description"]').type('Personne assez organisée qui a le sens du travail en équipe avec une forte dynamique d\'un leader excellent et responsable!!');
      cy.get('select[formcontrolname="subsidiaryId"]').select('CMN');
      cy.contains('span', /Mettre à jour/i).click();
      cy.contains('button', 'OK').click(); 
    }); 

    //test 4
    it('Annuler une offre en cours de creation', () => {
      cy.contains('span', /Offres d'emploi/i)
        .click({force: true});
      cy.wait(3000)
      cy.contains('button', /Nouvelle offre/i).click();  
      cy.get('input[placeholder="Entrez le titre de l\'offre"]').type('Assistant de direction');
      cy.contains('button', /Fermer/i).click();
    }); 


});


