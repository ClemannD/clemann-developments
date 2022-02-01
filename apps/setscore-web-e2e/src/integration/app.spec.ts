import { ADMIN_E2E_USER_EMAIL, E2E_USER_PASSWORD } from '../support/constants';

describe('SetScore - App Smoke-test', () => {
    it('should load the app and see the login button', () => {
        cy.clearCookies();
        cy.visit('/logout');
        cy.visit('/');
        cy.get('#login-button').should('exist');
    });

    it('should be redirected to the login portal', () => {
        cy.get('#login-button').click();

        cy.get('#username').should('exist');
        cy.get('#password').should('exist');
    });

    it('should login to the e2e user', () => {
        cy.get('#username').type(ADMIN_E2E_USER_EMAIL);
        cy.get('#password').type(E2E_USER_PASSWORD);
        cy.get('button[name="action"]').contains('Continue').click();

        cy.get('h2', {
            timeout: 10000
        }).contains('Dashboard');
        cy.get('h6').contains('Admin');
    });
});
