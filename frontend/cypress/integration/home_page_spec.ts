describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('/')
    // UI should reflect this user being logged in
    cy.get('h1').should('contain', 'Hello world')
  })
})
