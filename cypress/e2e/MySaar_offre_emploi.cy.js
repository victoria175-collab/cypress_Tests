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
      cy.contains('span', /Offres d'emploi/i)
        .click({force: true});  
    });
     

 

    it('Offre d\'emploi: remplissage nominal', () => {
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




    it('suppression d\'une offre', () => {
      cy.wait(3000)  
      cy.contains('button', /Supprimer/i).click();
      cy.contains('span', 'Supprimer').click();
      cy.contains('button', 'OK').click();  
    });  
     


    it('modification d\'une offre', () => {
      cy.wait(3000)
      cy.contains('button', /Modifier/i).click();
      cy.get('textarea[formcontrolname="description"]').type('Personne assez organisée qui a le sens du travail en équipe avec une forte dynamique d\'un leader excellent et responsable!!');
      cy.get('select[formcontrolname="subsidiaryId"]').select('CMN');
      cy.contains('span', /Mettre à jour/i).click();
      cy.contains('button', 'OK').click(); 
    }); 


    it('Annuler une offre en cours de creation', () => {
      cy.wait(3000)
      cy.contains('button', /Nouvelle offre/i).click();  
      cy.get('input[placeholder="Entrez le titre de l\'offre"]').type('Assistant de direction');
      cy.contains('button', /Fermer/i).click();
    }); 




    it('verification de l\'affichage des dates de debuts et de fin', () => {
      cy.get('.p-6').should('be.visible');
      cy.contains('span', 'Date de début: 09/01/2026').eq(0).should('exist');
      cy.contains('span', 'Date d\'expiration: 29/01/2026').eq(0).should('exist');
    });
    
      
    it('modifiabilite des dates de debut et expiration lors de edition', () => {
        cy.contains('button', /Modifier/i, {timeout: 150000}).eq(0).click();
        cy.get('input[formcontrolname="startDate"]', {timeout: 150000}).should('not.be.disabled').type('2026-01-10');
        cy.get('input[formcontrolname="expirationDate"]', {timeout: 150000}).should('not.be.disabled').type('2026-02-10');
        cy.get('select[formcontrolname="subsidiaryId"]').select('CMN');
        cy.contains('span', /Mettre à jour/i).click();
        cy.contains('button', 'OK', {timeout: 150000}).click(); 

    });

    it('verification de doublons d\'offre d\'emploi', () => {
      const titreOffre = 'Manager supérieur'
      const  remplirFormulaireOffre = ()=>{

        cy.contains('button', /Nouvelle offre/i).click();  
        cy.get('input[placeholder="Entrez le titre de l\'offre"]').type(titreOffre);
        cy.get('textarea[placeholder="Entrez la description de l\'offre"]').type('Personne assez organisée qui a le sens du travail en équipe avec une forte dynamique de leader!!');        
        cy.get('input[placeholder="Entrez la ville"]').type('Douala');
        cy.get('input[placeholder="Entrez la position"]').type('4');
        cy.get('select[formcontrolname="subsidiaryId"]').select('CMN');
        cy.get('input[formcontrolname="startDate"]').type('2026-01-03');
        cy.get('input[formcontrolname="expirationDate"]').type('2026-01-29');
        cy.contains('span', /Publier l\'offre/i).click();
        cy.contains('button', 'OK').click();   
    }

      remplirFormulaireOffre();
      remplirFormulaireOffre();

      cy.wait(3000);
        cy.get('body').then(($body) => {
                
          const count = $body.find(`:contains("${titreOffre}")`).length;

          expect(count, 'Vérification doublon titreOffre').to.be.lessThan(2);  

            });

    });   
});



    //       if (count > 1) {
    //         throw new Error(`ÉCHEC : ${count} doublons détectés.`);
    //         } else {
    //         cy.log('SUCCÈS : Aucun doublon créé.');
    //         }