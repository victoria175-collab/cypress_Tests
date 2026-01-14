const selectSMS = () => {
  cy.get('#notification-option-sms').click();
};

const selectEmail = () => {
  cy.get('#notification-option-email').click();
};

const fillRequiredFields = () => {
  cy.get('#duree').clear().type('10');
  cy.get('#dateEffet').clear().type('2026-05-20');
  // cy.get('#codeCategorie').select();
};
const fillRequiredFieldsAuto = () =>{
    // cy.get('#codeCategorie').select();
    cy.get('#duree').type('30');
    cy.get('#dateEffet').type('2026-12-31');
    // cy.get('#zoneCirculation').select();
}
const assertNextStepEnabled = (buttonId) => {
  cy.get(buttonId).should('not.be.disabled');
};

describe('Flexibilité du mode de notification', () => {

  beforeEach(() => {
    cy.visit('http://10.0.102.67:4200/fr/cotation-voyage');
    cy.wait(1000);
    cy.contains('button', 'TOUT REFUSER', { matchCase: false }).click();
    cy.get('#notification-option-sms').click();
  });

  it.only('TC1: Validation de la page sans aucune sélection de notification', () => {
    cy.get('#notification-option-email').should('not.have.class', 'bg-red-50');
    cy.get('#notification-option-sms').should('not.have.class', 'bg-red-50');
    
    fillRequiredFields();
    assertNextStepEnabled('#cotationVoyageStep1Next');
  });

  it('TC2: Sélection Email avec champ adresse vide', () => {
    selectEmail();
    cy.get('#notification-option-email').should('have.class', 'bg-red-50');
    
    fillRequiredFields();
    assertNextStepEnabled('#cotationVoyageStep1Next');
  });

  it('TC3: Sélection SMS avec champ numéro de téléphone vide', () => {
    selectSMS();
    cy.get('#notification-option-sms').should('have.class', 'bg-red-50');
    
    fillRequiredFields();
    assertNextStepEnabled('#cotationVoyageStep1Next');
  });

  it('TC5: Possibilité de désélectionner un mode après choix', () => {
    selectSMS();
    cy.get('#notification-option-sms').should('have.class', 'bg-red-50');
    
    selectSMS();
    cy.get('#notification-option-sms').should('not.have.class', 'bg-red-50');
    
    fillRequiredFields();
    assertNextStepEnabled('#cotationVoyageStep1Next');
  });

  it('TC6: Validation du format si le champ est partiellement rempli', () => {
    selectSMS();
    cy.get('#telephone').type('123');
    cy.get('#phone-error-message').should('be.visible');
    
    cy.get('#telephone').clear();
    cy.get('#phone-error-message').should('not.exist');

    fillRequiredFields();
    assertNextStepEnabled('#cotationVoyageStep1Next');
  });

  it('TC7: Cohérence sur différents formulaires (Auto et Voyage)', () => {
    fillRequiredFields();
    assertNextStepEnabled('#cotationVoyageStep1Next');

    cy.visit('http://10.0.102.67:4200/fr/cotation-auto');
    fillRequiredFieldsAuto();
    assertNextStepEnabled('#cotationAutoStep1Next');
  });

});
