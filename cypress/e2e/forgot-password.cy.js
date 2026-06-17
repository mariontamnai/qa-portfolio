describe('Voting System - Forgot Password', () => {

  beforeEach(() => {
    cy.visit('/student-login')
  })

  it('should display forgot password link', () => {
    cy.contains('Reset it here').should('be.visible')
  })

  it('should navigate to forgot password page when clicked', () => {
    cy.contains('Reset it here').click()
    cy.url().should('include', 'forgot-password')
  })

  it('should show error when registration number is empty', () => {
    cy.visit('/forgot-password')
    cy.contains('SEND RESET LINK').click()
    cy.contains('Please enter your email address').should('be.visible')
  })

  it('should show error when email is empty', () => {
    cy.visit('/forgot-password')
    cy.get('input[placeholder="e.g., SCT111-0111/1900"]').type('sct121-0517/2024')
    cy.contains('SEND RESET LINK').click()
    cy.contains('Please enter your email address').should('be.visible')
  })

  it('should show error on invalid email format', () => {
    cy.visit('/forgot-password')
    cy.get('input[placeholder="e.g., SCT111-0111/1900"]').type('sct121-0517/2024')
    cy.get('input[placeholder="Enter your email address"]').type('invalidemail')
    cy.contains('SEND RESET LINK').click()
    cy.contains('Please enter a valid email address').should('be.visible')
  })

  it('should successfully submit with valid details', () => {
    cy.visit('/forgot-password')
    cy.get('input[placeholder="e.g., SCT111-0111/1900"]').type('sct121-0517/2024')
    cy.get('input[placeholder="Enter your email address"]').type('tamnai631@gmail.com')
    cy.contains('SEND RESET LINK').click()
    cy.contains('Check Your Email').should('be.visible')
  })

})