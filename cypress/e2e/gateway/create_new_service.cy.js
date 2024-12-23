import { before } from "mocha";

describe('Kong Gateway test cases', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8002/')
        cy.get('[data-testid="workspace-link-default"]').click()
        cy.get('[data-testid="sidebar-item-gateway-services"] > .sidebar-item-link').click()
    });
    it('Create a new service', () => {
      cy.get('[data-testid="toolbar-add-gateway-service"]').click()
      cy.get('[data-testid="gateway-service-name-input"]').type('test-service')
      cy.get('[data-testid="gateway-service-tags-input"]').type('tag1')
      cy.get('[data-testid="gateway-service-url-input"]').type('https://www.google.com/')
      cy.get('[data-testid="service-form-submit"]').click()
      cy.get('.k-card').should('contain', 'test-service')
    });
    it('Create a new route', () => {
        cy.get('[data-testid="name"]').contains('test-service').click()
        cy.get('[data-testid="service-routes"]').click()
        cy.get('[data-testid="new-route"]').click()
        cy.get('[data-testid="route-form-name"]').type('test-route')
        cy.get('[data-testid="route-form-tags"]').type('tag2')
        cy.get('[data-testid="route-form-paths-input-1"]').type('/test')
        cy.get('[data-testid="route-form-submit"]').click()
        cy.get('.k-card').should('contain', 'test-route')
    });
    it('Delete the service', () => {
        cy.get('[data-testid="name"]').contains('test-service').click()
        cy.get('[data-testid="vtab-tabs"] #service-routes').click()
        cy.get('[data-testid="test-route"] > [data-testid="actions"] .kui-icon.more-icon').click()
        cy.get('[data-testid="test-route"] > [data-testid="actions"] [data-testid="action-entity-delete"]').click()
        cy.get('[data-testid="confirmation-input"]').type('test-route')
        cy.get('[data-testid="modal-action-button"]').click()
        cy.get('[data-testid="sidebar-item-gateway-services"] > .sidebar-item-link').click()
        cy.get('[data-testid="test-service"] > [data-testid="actions"] .kui-icon.more-icon').click()
        cy.get('[data-testid="test-service"] > [data-testid="actions"] [data-testid="action-entity-delete"]').click()
        cy.get('[data-testid="confirmation-input"]').type('test-service')
        cy.get('[data-testid="modal-action-button"]').click()
    });
})