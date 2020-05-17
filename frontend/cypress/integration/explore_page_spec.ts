describe('The Explore Page', () => {
  it('successfully loads', () => {
    cy.visit('/explore')
    // UI should reflect this user being logged in
    cy.get('h1').should('contain', 'Explorer')
  })
})
