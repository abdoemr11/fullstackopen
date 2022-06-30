
describe('Blog App', function () {
  beforeEach(function() {
    cy.request({ method: 'POST', url: 'http://localhost:3003/api/testing/reset', failOnStatusCode: false } )
    const newUser = {
      'username': 'janedoe',
      'name': 'jane doe',
      'password': '123'
    }
    cy.request('POST','http://localhost:3003/api/users', newUser)
    cy.visit('http://localhost:3000')

  })
  it('Login form is shown by default ', function () {
    cy.get('[data-cy=login-form]')
  })
  describe('login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('janedoe')
      cy.get('#password').type('123')
      cy.get('#login-button').click()

      // cy.contains('You Logged In successfully').should('have.css','color', 'rgb(0,128,0)')
      cy.contains('You Logged In successfully')
        .should('have.css','border-style', 'solid')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
      // and('have.css', 'border-style', 'solid')
    })
    it('fail with wrong credentials', function () {
      cy.get('#username').type('janedoe')
      cy.get('#password').type('dsfadsf')
      cy.get('#login-button').click()

      cy.contains('invalid username or password')
        .should('have.css','border-style', 'solid')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
})