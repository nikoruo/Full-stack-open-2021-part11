describe('Anecdotes', function() {
  it('front page can be opened', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Anecdotes')
    cy.contains('create new')
  })
  
  it('filter can be used', function() {
    cy.visit('http://localhost:3000')
    cy.contains('If it hurts, do it more often')
	cy.contains('Adding manpower to a late software project makes it later!')
	cy.get('#filter').type('Adding manpower')
	cy.contains('If it hurts, do it more often').should('not.exist')
    cy.contains('Adding manpower to a late software project makes it later!')
  })
  
})