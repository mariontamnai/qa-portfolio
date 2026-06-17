describe('Voting System - Student Login', () => {

  beforeEach(() => {
    cy.visit('/student-login')
  })

  it('should load the student login page', () => {
    cy.contains('Student Login').should('be.visible')
    cy.get('input[placeholder="e.g. SCT111-0111/1900"]').should('exist')
    cy.get('input[placeholder="Enter your password"]').should('exist')
  })

  it('should show error on empty fields', () => {
    cy.contains('🔐 Login').click()
    cy.contains('Please fill in all fields').should('be.visible')
  })

  it('should show error on invalid credentials', () => {
    cy.get('input[placeholder="e.g. SCT111-0111/1900"]').type('wrongid')
    cy.get('input[placeholder="Enter your password"]').type('wrongpassword')
    cy.contains('🔐 Login').click()
    cy.contains('Invalid').should('be.visible')
  })

  it('should login successfully with valid credentials', () => {
    cy.get('input[placeholder="e.g. SCT111-0111/1900"]').type('sct121-0517/2024')
    cy.get('input[placeholder="Enter your password"]').type('MillWhite!12')
    cy.contains('🔐 Login').click()
    cy.url().should('not.include', '/login')
  })

})