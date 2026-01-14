const fillPhone = (value) => {
  cy.get('#telephone').clear().type(value).blur();
};

const assertErrorVisible = () => {
  cy.get('#phone-error-message').should('be.visible');
};

const assertNoError = () => {
  cy.get('#phone-error-message').should('not.exist');
};

describe('Validation du numéro de téléphone', () => {
  
  beforeEach(() => {
    cy.visit('http://10.0.102.67:4200/fr/cotation-auto');
  });

  it('Validation format national', () => {
    fillPhone('670123456');
    assertNoError();
  });

  it('Rejet numéro trop court', () => {
    fillPhone('67788');
    assertErrorVisible();
  });
});


// describe('Validation du numéro de téléphone - Cotation Auto', () => {
  
//   beforeEach(() => {
//     cy.visit(''); 
//   });

//   it('Validation d\'un numéro au format national valide', () => {
//     cy.get('#telephone').should('be.visible').type('670123456');
//     cy.get('#telephone').blur();
//     cy.get('#phone-error-message').should('not.exist');
//   });

//   it('Validation d\'un numéro au format international valide', () => {
//     cy.get('#telephone').type('+237670123456');
//     cy.get('#telephone').blur();
//     cy.get('#phone-error-message').should('not.exist');
//   });

//   it('Rejet d\'un numéro trop court', () => {
//     cy.get('#telephone').type('67788990');
//     cy.get('#cotationAutoStep1Next').click({ force: true });
//     cy.get('#phone-error-message')
//       .should('be.visible')
//       .and('contain', 'Numéro invalide');
//   });

//   it('Rejet d\'un numéro trop long', () => {
//     cy.get('#telephone').type('6991122334455');
//     cy.get('#cotationAutoStep1Next').click({ force: true });
//     cy.get('#phone-error-message').should('be.visible');
//   });

//   it('Interdiction des caractères spéciaux et espaces', () => {
//     cy.get('#telephone').type('6 70 12 34');
//     cy.get('#phone-error-message').should('be.visible');
    
//     cy.get('#telephone').clear().type('670-12.34');
//     cy.get('#phone-error-message').should('be.visible');
//   });

//   it('Interdiction des lettres dans le champ téléphone', () => {
//     cy.get('#telephone').type('670abc456');
//     cy.get('#telephone').should('not.have.value', '670abc456');
//     cy.get('#cotationAutoStep1Next').should('be.disabled');
//   });

//   it('Rejet du préfixe international incomplet', () => {
//     cy.get('#telephone').type('+237');
//     cy.get('#cotationAutoStep1Next').click({ force: true });
//     cy.get('#phone-error-message').should('be.visible');
//   });

//   it('Persistance des données après saisie valide', () => {
//     const validPhone = '670123456';
//     cy.get('#telephone').type(validPhone);
    
//     cy.get('#codeCategorie').select(1);
//     cy.get('#duree').clear().type('30');
//     cy.get('#dateEffet').type('2026-12-31');
//     cy.get('#zoneCirculation').select(1);
    
//     cy.get('#cotationAutoStep1Next').should('not.be.disabled').click();
    
//     cy.contains(validPhone).should('be.visible');
//   });

// });
