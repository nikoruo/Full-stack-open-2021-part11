describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Cypress E2E',
      username: 'cypress',
      password: 'secret'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  //ensimmäinen sivu näyttää loginformin
  it('Login form is shown', function () {
    cy.contains('Log in to application')
    cy.get('#blogForm').should('not.exist')
  })

  //kirjautumiseen liittyvät testit
  describe('Login', function () {

    //oikeilla onnistuu
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('cypress')
      cy.get('#password').type('secret')
      cy.get('#submitLogin').click()

      cy.contains('Cypress E2E logged in')
    })

    //väärillä ei
    it('fails with wrong credentials', function () {
      cy.get('#username').type('cypress')
      cy.get('#password').type('sekret')
      cy.get('#submitLogin').click()

      cy.get('.error').should('contain', 'wrong username or password')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  //sisäänkirjautumisen jälkeen
  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'cypress', password: 'secret', id: '60bdf935f30f31361c439b08' })
      cy.createBlog({
        title: 'blog to be created',
        author: 'cy',
        url: 'no need',
        user: '60bdf935f30f31361c439b08'
      })
    })

    //uuden blogin luominen
    it('A blog can be created', function () {
      cy.get('#blogForm').should('contain', 'blog to be created cy')
    })

    //blogista tykkääminen
    it('A blog can be liked', function () {
      cy.contains('blog to be created cy').parent().find('button').click()
      cy.contains('blog to be created cy').parent().contains('like').parent().find('button').click()
      cy.contains('You just liked blog to be created by cy')
    })

    //blogit järjestetty oikein
    it.only('blogs are arranged by likes', function () {
      cy.createBlog({
        title: 'blog to be created1',
        author: 'cy',
        url: 'no need',
        likes: '0',
        user: '60bdf935f30f31361c439b08'
      })

      cy.createBlog({
        title: 'blog to be created2',
        author: 'cy',
        url: 'no need',
        likes: '0',
        user: '60bdf935f30f31361c439b08'
      })

      cy.get('.sB').each((item) => {
        cy.wrap(item).click()
      })

      cy.get('.blog').each((item) => {
        cy.wrap(item).contains('likes 0')
      })

      cy.contains('blog to be created1 cy').parent().contains('like').parent().find('button').click()
      cy.wait(500)
      cy.get('.blog').then((item) => {
        cy.wrap(item[0]).contains('likes 1')
        cy.wrap(item[1]).contains('likes 0')
        cy.wrap(item[2]).contains('likes 0')
      })

    })

    //blogin poistaminen
    it('A blog can be deleted by owner', function () {

      cy.contains('blog to be created cy').parent().find('button').click()
      cy.contains('blog to be created cy').parent().contains('remove').click()
      cy.contains('You just removed blog to be created by cy')
    })

    //blogin poistaminen jonkun muun toimesta ei onnistu
    it('A blog cannot be deleted by random', function () {
      cy.contains('logout').click()
      const user = {
        name: 'random E2E',
        username: 'random',
        password: 'generator'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)
      cy.login({ username: 'random', password: 'generator', id: '50bdf935f30f31361c439b08' })


      cy.contains('blog to be created cy').parent().find('button').click()
      cy.get('.dB').should('not.exist')
    })
  })
})