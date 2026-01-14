
const fillPhone = (value) => {
  cy.get('#telephone').clear().type(value, { delay: 50 });
};

const assertErrorVisible = () => {
  cy.get('#phone-error-message').should('be.visible');
};

const assertNoError = () => {
  cy.get('#phone-error-message').should('not.exist');
};

describe('Validation du numéro de téléphone - Cotation Voyage', () => {

  beforeEach(() => {
    cy.visit('http://10.0.102.67:4200/fr/cotation-voyage');
    cy.wait(1000);
    cy.contains('button', 'TOUT REFUSER', { matchCase: false }).click();
    cy.get('#notification-option-sms').click();
  });

  it('TC1: Validation d\'un numéro au format national valide (9 chiffres)', () => {
    fillPhone('670123456');
    assertNoError();
  });

  it('TC2: Validation d\'un numéro au format international valide', () => {
    fillPhone('+237670123456');
    assertNoError();
  });

  it.skip('TC3: Rejet d\'un numéro trop court', () => {
    fillPhone('67788990');
    // cy.get('#codeCategorie').select();
    assertErrorVisible();
  });

  it('TC4: Rejet d\'un numéro trop long', () => {
    fillPhone('69911223344');
    cy.get('#telephone').should('have.value', '699112233');
  });

  it('TC5: Interdiction des caractères spéciaux et espaces', () => {
    fillPhone('6 70 12 34 56');
    cy.get('#telephone').should('not.have.value', '6 70 12 34 56');

    fillPhone('670-12.34.56');
    cy.get('#telephone').should('not.have.value', '670-12.34.56');
  });

  it('TC6: Interdiction des lettres dans le champ téléphone', () => {
    fillPhone('670abk456');
    cy.get('#telephone').should('not.have.value', '670abk456');
  });

  it.skip('TC7: Rejet du préfixe international incomplet', () => {
    fillPhone('+237');
    // cy.get('#codeCategorie').select();
    assertErrorVisible();
  });

  it.skip('TC8: Persistance et Validation finale (Bouton Suivant)', () => {
    fillPhone('670123456');
    // cy.get('#codeCategorie').select();
    cy.get('#duree').type('30');
    cy.get('#dateEffet').type('2026-12-31');

    cy.get('#cotationVoyageStep1Next').should('not.be.disabled');
  });

});