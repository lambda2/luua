// describe('The Login Page', () => {
//   beforeEach(() => {
//     // reset and seed the database prior to every test
//     cy.exec('npm run db:reset && npm run db:seed')

//     // seed a user in the DB that we can control from our tests
//     // assuming it generates a random password for us
//     cy.request('POST', '/test/seed/user', { username: 'jane.lane' })
//       .its('body')
//       .as('currentUser')
//   })

//   it('sets auth cookie when logging in via form submission', function () {
//     // destructuring assignment of the this.currentUser object
//     const { username, password } = this.currentUser

//     cy.visit('/login')

//     cy.get('input[name=username]').type(username)

//     // {enter} causes the form to submit
//     cy.get('input[name=password]').type(`${password}{enter}`)

//     // we should be redirected to /dashboard
//     cy.url().should('include', '/dashboard')

//     // our auth cookie should be present
//     cy.getCookie('your-session-cookie').should('exist')

//     // UI should reflect this user being logged in
//     cy.get('h1').should('contain', 'jane.lane')
//   })
// })
