describe('Feedback Loop', () => {
  it('should confirm that true equals true', () => {
      expect(true).to.equal(true)
  })
})

describe('Page View', () => {
  beforeEach(() => {
    cy.intercept('http://localhost:3001/api/v1/orders', {fixture: 'allOrders'})
    .visit('http://localhost:3000/')
  })

  it('should display the order form', () => {
    cy.get('[data-cy=order-form]')
    .should('be.visible')
  })

  // it('should display on order form with 12 ingredient options', () => {
  //   cy.get('[data-cy=order-form]')
  //   .children()
  //   .should('have.length', 13)
  // })

  it('should display all orders on page load', () => {
    cy.get('[data-cy=all-orders]')
    .children()
    .should('have.length', 2)
    .last()
    .contains('Sam')
  })
})

describe('Order Functionality', () => {
  beforeEach(() => {
    cy.intercept('http://localhost:3001/api/v1/orders', {fixture: 'allOrders'})
    .visit('http://localhost:3000/')
  })

  it('should show the user what they have added to their order', () => {
    cy.get('[data-cy=name-input]')
    .type('Finley')
    .get('[data-cy=ingredients-button]')
    .eq(0)
    .click()
    .get('[data-cy=ingredients-button]')
    .eq(2)
    .click()
    .get('[data-cy=ingredients-button]')
    .eq(6)
    .click()
    .get('[data-cy=order-details]')
    .contains('Order: beans, carnitas, pico de gallo')
  })

  it('should show the user to submit their order', () => {
    cy.intercept('http://localhost:3001/api/v1/orders', {fixture: 'newOrder'})
    .intercept('http://localhost:3001/api/v1/orders', {fixture: 'newAllOrders'})
    .get('[data-cy=name-input]')
    .type('Finley')
    .get('[data-cy=ingredients-button]')
    .eq(0)
    .click()
    .get('[data-cy=ingredients-button]')
    .eq(2)
    .click()
    .get('[data-cy=ingredients-button]')
    .eq(6)
    .click()
    .get('[data-cy=submit-order]')
    .click()
    .get('[data-cy=all-orders]')
    .children()
    .should('have.length', 3)
    .last()
    .contains('Finley')
  })

  it('should not allow the user to submit an order without a name', () => {
    cy.intercept('http://localhost:3001/api/v1/orders', {fixture: 'newOrder'})
    .intercept('http://localhost:3001/api/v1/orders', {fixture: 'newAllOrders'})
    .get('[data-cy=ingredients-button]')
    .eq(0)
    .click()
    .get('[data-cy=ingredients-button]')
    .eq(2)
    .click()
    .get('[data-cy=submit-order]')
    .should('be.disabled')
  })

  it('should not allow the user to submit an order without any ingredients', () => {
    cy.intercept('http://localhost:3001/api/v1/orders', {fixture: 'newOrder'})
    .intercept('http://localhost:3001/api/v1/orders', {fixture: 'newAllOrders'})
    .get('[data-cy=name-input]')
    .type('Finley')
    .get('[data-cy=submit-order]')
    .should('be.disabled')
  })
})