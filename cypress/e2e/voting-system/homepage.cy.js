
describe('Voting System - Home Page', () => {

  beforeEach(() => {
    cy.visit('/')
  })

  it('should load the home page successfully', () => {
    cy.contains('JKUAT Secure Voting System').should('be.visible')
  })

  it('should display security feature badges', () => {
    cy.contains('AES-256 Encrypted').should('be.visible')
    cy.contains('Biometric Verified').should('be.visible')
    cy.contains('One Person, One Vote').should('be.visible')
  })

  it('should display student and admin login buttons', () => {
    cy.contains('Student Login').should('be.visible')
    cy.contains('Admin Login').should('be.visible')
  })

  it('should navigate to student login when clicked', () => {
    cy.contains('Student Login').click()
    cy.url().should('include', 'student-login')
  })

  it('should display election status message', () => {
    cy.contains('No active election at the moment').should('be.visible')
  })

})