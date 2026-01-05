Cypress.on('uncaught:exception', () => {
  return false;
});

describe('Remplissage de formulaires', () => {

  beforeEach(() => {
    cy.visit('http://10.0.102.67:4200/fr/cotation-en-ligne');
    cy.wait(2000); 
    cy.contains('div.price-card', 'Assurance Voyage') 
      .within(() => {
        cy.contains('a.th-btn.btn-fw', /Devis/i)
          .should('be.visible')
          .click({ force: true });
      });
  });

  // test 1
  it('remplissage nominal', () => {
    cy.wait(2000)
    cy.contains('button', 'TOUT REFUSER', { matchCase: false })
    .scrollIntoView()
    .should('be.visible')
    .click();
    cy.contains('h4', 'SMS').click();
    cy.get('input[formcontrolname*="phone"]').type('672962259');
    cy.get('select[formcontrolname="codeCategorie"]').select('240');
    cy.get('input[formcontrolname="duree"]').type('365');
    cy.get('input[formcontrolname="dateEffet"]').type('2026-01-15');
    cy.contains('button', 'Suivant').should('be.visible')
      .click();

    cy.get('select[formcontrolname="sexe"]', {timeout: 10000}).select('M');
    cy.get('input[formcontrolname="dateNaissance"]').type('2000-01-01', {force: true});
    cy.get('select[formcontrolname="statutSocioProf"]')
      .select('AU', {force: true});
    cy.get('select[formcontrolname="optionMedicale"]').select('PMPL', {force: true});
    cy.get('select[formcontrolname="zonePays"]').select('4', {force: true});
    cy.get('select[formcontrolname="paysDestination"]').select('AE', {force: true});
    cy.contains('button', 'Récapitulatif').should('be.visible')
      .click();  

    cy.wait(2000) 
    cy.contains('p', '240' ).should('be.visible');
    cy.contains('p', '365 jours').should('be.visible');
    // cy.contains('p', '15/01/2026', {timeout: 10000}).should('be.visible', {force: true});
    cy.contains('span', 'Garantie Assistance ( Part Cie)').should('be.visible');
    cy.contains('span', 'Garanties Assistance').should('be.visible');
    cy.contains('p', 'M').should('be.visible');
    cy.contains('p', '01/01/00').should('be.visible');
    cy.contains('p', 'AU').should('be.visible');
    cy.contains('button', 'Soumettre').should('be.visible')
      .click();


    cy.contains('h2', /Résultat de la Cotation/i, { timeout: 15000 }).should('be.visible');
    cy.contains('button', /Nouveau Devis/i)
      .should('exist') 
      .click({ force: true });  
  });


  //test 2
   it('requiement des champs obligatoires et limitation des caracteres dans les champs', () => {
    cy.wait(2000)
    cy.contains('button', 'TOUT REFUSER', { matchCase: false })
      .scrollIntoView()
      .should('be.visible')
    .click();
    cy.contains('h4', 'SMS').click();
    cy.get('input[formcontrolname*="phone"]').type('67296225');
    cy.get('select[formcontrolname="codeCategorie"]').select('240');
    cy.get('input[formcontrolname="duree"]').type('366');
    cy.get('input[formcontrolname="dateEffet"]').type('2026-01-15');
    cy.contains('button', 'Suivant').should('be.disabled');
  });

   // test 3
 it('Absence terme technique dans les messages d\'erreur', () => {
    cy.wait(2000)
    cy.contains('button', 'TOUT REFUSER', { matchCase: false })
    .scrollIntoView()
    .should('be.visible')
    .click();
    cy.contains('h4', 'SMS').click();
    cy.get('input[formcontrolname*="phone"]').type('672962259');
    cy.get('select[formcontrolname="codeCategorie"]').select('240');
    cy.get('input[formcontrolname="duree"]').type('365');
    cy.get('input[formcontrolname="dateEffet"]').type('2026-01-19');
    cy.contains('button', 'Suivant').should('be.visible')
      .click();

    cy.get('select[formcontrolname="sexe"]', {timeout: 10000}).select('F');
    cy.get('input[formcontrolname="dateNaissance"]').type('2026-01-02', {force: true});
    cy.get('select[formcontrolname="statutSocioProf"]')
      .select('ONG', {force: true});
    cy.get('select[formcontrolname="optionMedicale"]').select('PEUR', {force: true});
    cy.get('select[formcontrolname="zonePays"]').select('3', {force: true});
    cy.get('select[formcontrolname="paysDestination"]').select('HU', {force: true});
    cy.contains('button', 'Récapitulatif').should('be.visible')
      .click();  

    cy.wait(2000) 
    cy.contains('p', '240' ).should('be.visible');
    cy.contains('p', '365 jours').should('be.visible');
    // cy.contains('p', '15/01/2026', {timeout: 10000}).should('be.visible', {force: true});
    cy.contains('span', 'Garantie Assistance ( Part Cie)').should('be.visible');
    cy.contains('span', 'Garanties Assistance').should('be.visible');
    cy.contains('p', 'F').should('be.visible');
    cy.contains('p', '02/01/26').should('be.visible');
    cy.contains('p', 'HU').should('be.visible');
    cy.contains('button', 'Soumettre').should('be.visible')
      .click();

    cy.wait(2000)
    cy.contains('P', /Veuillez vérifier vos informations et réessayer./i, { timeout: 15000 }).should('be.visible');
    cy.contains('button', /Réessayer/i)
      .should('exist') 
      .click({ force: true });    
  });

  //test 4
  it('retour selection de la cotation', () => {
    cy.wait(2000)
    cy.contains('button', 'TOUT REFUSER', { matchCase: false })
    .scrollIntoView()
    .should('be.visible')
    .click();
    cy.contains('h4', 'SMS').click();
    cy.get('input[formcontrolname*="phone"]').type('672962259');
    cy.get('select[formcontrolname="codeCategorie"]').select('240');
    cy.get('input[formcontrolname="duree"]').type('365');
    cy.get('input[formcontrolname="dateEffet"]').type('2026-01-19', {force: true});
    cy.contains('button', /Retour à la sélection de cotation/i).should('exist')
      .click({force: true});  
  })
});








