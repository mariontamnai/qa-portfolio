describe('Voting System - Admin Login', () => {

  beforeEach(() => {
    cy.visit('/admin-login')
  })

  it('should load the admin login page', () => {
    cy.contains('Admin Login').should('be.visible')
    cy.get('input[placeholder="e.g. ADM001"]').should('exist')
    cy.get('input[placeholder="Enter your password"]').should('exist')
  })

  it('should show error on empty fields', () => {
    cy.contains('🔐 Login').click()
    cy.contains('Please fill in all fields').should('be.visible')
  })

  it('should show error on invalid credentials', () => {
    cy.get('input[placeholder="e.g. ADM001"]').type('wrongadmin')
    cy.get('input[placeholder="Enter your password"]').type('wrongpassword')
    cy.contains('🔐 Login').click()
    cy.contains('Invalid').should('be.visible')
  })

  it('should show OTP step after valid credentials', () => {
    cy.get('input[placeholder="e.g. ADM001"]').type('admin001')
    cy.get('input[placeholder="Enter your password"]').type('ADMIN123')
    cy.contains('🔐 Login').click()
    cy.contains('Verify OTP').should('be.visible')
    cy.contains('OTP Sent Successfully').should('be.visible')
  })

  it('should show error on invalid OTP', () => {
    cy.get('input[placeholder="e.g. ADM001"]').type('admin001')
    cy.get('input[placeholder="Enter your password"]').type('ADMIN123')
    cy.contains('🔐 Login').click()
    cy.contains('Verify OTP').should('be.visible')
    cy.get('input[placeholder="• • • • • •"]').type('000000')
    cy.contains('✅ Verify OTP').click()
    cy.contains('Invalid').should('be.visible')
  })

  it('should navigate back to home from admin login', () => {
    cy.contains('← Back to Home').click()
    cy.url().should('eq', Cypress.config('baseUrl') + '/')
  })

})