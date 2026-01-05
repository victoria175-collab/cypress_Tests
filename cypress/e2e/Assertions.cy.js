// describe('Try Assertions one', () => {

//    Cypress.on('uncaught:exception', () => {
//       return false
//     });

//   it('Implicit Assertions', () => {
//     cy.visit('https://www.saar-assurances.com/fr/group')

//     cy.url().should('include', 'saar-assurances.com')

//     cy.url().should('eq', 'https://www.saar-assurances.com/fr/group')
    
//     cy.url().should('contain', 'assurances')

//     cy.title().should('contain', 'Assurances')
//     .and('eq', 'SAAR Assurances - Assurance et Réassurance en Afrique | Groupe SAAR')
    
//     cy.get('#hero').should('be.visible')
//     .and('exist')

//     cy.get("input[type='email']").should('contain', '@')
// })
// })


// describe('Try Assertions two', () => {

//    Cypress.on('uncaught:exception', () => {
//       return false
//     });

  
// })


describe('My First Test', () => {
  it('Does not do much!', () => {
    expect(true).to.equal(true)
  })
})