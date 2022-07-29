// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('createBlog',  (title, author, url, token) => {
  cy.request({ method:'POST',
    url: 'http://localhost:3003/api/blogs',
    body: { title, author, url },
    headers: { authorization: `bearer ${token}` } }
  )
  cy.visit('http://localhost:3000')

})
Cypress.Commands.add('login', (user) => {
  cy.request('POST', 'http://localhost:3003/api/login', user).then(function (res){
    const loggedUser = res.body
    localStorage.setItem('user', JSON.stringify(loggedUser))
    cy.visit('http://localhost:3000').then(result => {
      console.log(loggedUser)
      return loggedUser
    } )

  })
})
Cypress.Commands.add('logout',() => {
  localStorage.removeItem('user')
  cy.visit('http://localhost:3000')

})