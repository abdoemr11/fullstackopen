
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
  describe('When user logged in', function () {
    let loggedUser
    beforeEach(function () {
      const user ={
        'username': 'janedoe',
        'password': '123'
      }
      cy.login(user).then(u => loggedUser= u)
    })
    it('Blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('[placeholder=title]').type('My Awesome blog')
      cy.get('[placeholder=author]').type('ahmed saber')
      cy.get('[placeholder=url]').type('mostalah.com')
      cy.get('[data-cy=create-blog-button]').click()
      cy.get('[data-cy=notification]')
        .should('contain','You Created a blog')
        .should('have.css', 'color', 'rgb(0, 128, 0)')
      cy.contains('My Awesome blog')
    })
    describe('and A blog has been created', function () {
      beforeEach(function (){
        cy.createBlog('My first blog', 'ahmed saber', 'mostalah.com', loggedUser.token)

      })
      it('User can like a blog', function (){

        cy.contains('view').click()
        cy.contains('like').click()
        cy.wait(2000)
        cy.contains('like').click()


        cy.contains('likes').contains('2')
      })
      it.only('blogs should be sorted when likes change', function () {
        cy.createBlog('My second blog', 'ahmed dabor', 'mostalah.com', loggedUser.token)
        cy.get('[data-cy=blog]').each(blog => cy.wrap(blog).contains('view').click())
        //the easy way
        cy.get('[data-cy=blog]').eq(0).contains('like').as('like-one')
        cy.get('[data-cy=blog]').eq(1).contains('like').as('like-two')
        cy.get('@like-two').click()
        cy.wait(2000)
        cy.get('@like-two').click()
        cy.wait(2000)

        cy.get('[data-cy=blog]').eq(0).contains('My second blog')
        cy.get('@like-one').click()
        cy.wait(2000)
        cy.get('@like-one').click()
        cy.wait(2000)
        cy.get('@like-one').click()
        cy.wait(2000)

        cy.get('[data-cy=blog]').eq(0).contains('My first blog')



      })
      it('User who created a blog can remove it', function () {
        cy.contains('view').click()
        cy.contains('My Awesome blog')

        cy.contains('remove').as('remove-button')
        cy.get('@remove-button').click()
        cy.get('body').should('not.contain', 'My Awesome blog')
      })
      describe('And another user logged in', function () {
        beforeEach(function () {
          const newUser = {
            'username': 'abdo',
            'name': 'jane doe',
            'password': '123'
          }
          cy.request('POST','http://localhost:3003/api/users', newUser)
          cy.logout()
          cy.login({ username:'abdo', password:'123' }).then(u => loggedUser=u)

        })
        it('User who didn\'t create the blog can\'t remove it', function () {
          cy.contains('view').click()
          cy.contains('remove').click()
          cy.contains('You don\'t have permision to delete this blog')
            .should('have.css', 'color', 'rgb(255, 0, 0)')
        })
      })


    })


  })
})