describe('Anecdotes', function() {
  it('front page can be opened', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Anecdotes')
    cy.contains('create new')
  })
})