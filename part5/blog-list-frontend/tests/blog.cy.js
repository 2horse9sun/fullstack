describe('Blog', function() {
    beforeEach(function() {
      cy.visit('http://localhost:3000')
    })
  
    it('displays the login form by default', function() {
      cy.visit('http://localhost:3000')
      cy.contains('log in to application')
    })
  
    describe('Login test',function() {
      it('successful login attempts', function() {
        cy.get('#username').type('jsjhfx')
        cy.get('#password').type('correctpassword')
        cy.get('#login-button').click()
      })
  
      it('unsuccessful login attempts', function() {
        // ...
        cy.get('#username').type('jsjhfx')
        cy.get('#password').type('wrongpassword')
        cy.get('#login-button').click()
        cy.contains('wrong username or password')
      })
    })
  
    describe('Blog curd', function() {
      beforeEach(function() {
        cy.get('#username').type('jsjhfx')
        cy.get('#password').type('correctpassword')
        cy.get('#login-button').click()
      })
  
      it('create a blog', function() {
        cy.contains('create').click()
        cy.get('#title').type('test title')
        cy.get('#author').type('me')
        cy.get('#username').type('testusername')
        cy.get('#create-button').click()
        cy.contains('test title')
      })
  
      it('like a blog', function() {
        cy.contains('view').click()
        cy.contains('like').click()
        cy.contains('likes 1')
      })
  
      it('delete a blog', function() {
        cy.get('.blog').filter(':contains("test title")').find('button').click({ multiple: true })
        cy.get('.blog').filter(':contains("test title")').contains('DELETE').click({ multiple: true })
        cy.contains('test title').should('not.exist')
      })
  
      it('blogs are ordered according to likes with the blog with the most likes being first', function() {
        cy.get('#title').type('This is the most title you like')
        cy.get('#author').type('me')
        cy.get('#username').type('myusername')
        cy.get('#create-button').click()
        cy.get('.blog').filter(':contains("This is the most title you like")').find('button').click()
        for(let i = 0;i < 999 ; i++){
          cy.contains('like').click()
        }
        cy.get('#title').type('This is the second most title you like')
        cy.get('#author').type('me')
        cy.get('#username').type('myusername')
        cy.get('#create-button').click()
        cy.get('.blog').filter(':contains("This is the most title you like")').find('button').click()
        for(let i = 0;i < 99 ; i++){
          cy.contains('like').click()
        }
        cy.get('.blog').eq(0).contains('This is the most title you like')
        cy.get('.blog').eq(1).contains('This is the second most title you like')
      })
    })
})