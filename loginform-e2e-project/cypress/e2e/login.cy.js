import { errorMessages } from "../../src/components/Login";
describe('Login Page', () => {

  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  })

  // ~~ SUCCESS SCENARIO

  describe("Valid Inputs", () => {

    // ~~ SUCCESSFUL FORM INPUTS

    describe("valid form inputs", () => {
      it('clicking sign-in button redirects to the success page', () => {
        //ARRANGE
        // cy.visit('http://localhost:5173/')

        //ACT
        cy.get('[data-cy="email-input"]').type('asd@asd.com')
        cy.get('[data-cy="password-input"]').type('AAbbb@22')
        cy.get('[data-cy="checkbox-input"]').check()
        cy.get('[data-cy="submit-button"]').click()

        //ASSERT
        cy.url().should('include', '/Success');
      });
    });
  });

  // ~~ ERROR SCENARIO

  describe("Error Messages", () => {

    // ~~ INVALID E-MAIL SCENARIO

    describe("invalid e-mail entered", () => {
      it('one error message on screen', () => {
        //ARRANGE
        // cy.visit('http://localhost:5173/')

        //ACT
        cy.get('[data-cy="email-input"]').type('invalid-email')
        //ASSERT

        cy.get('[data-cy="error-message"]').should('have.length', 1);

      });

      it('correct error message is displayed', () => {
        //ARRANGE
        // cy.visit('http://localhost:5173/')

        //ACT
        cy.get('[data-cy="email-input"]').type('invalid-email')
        //ASSERT

        cy.get('[data-cy="error-message"]').should('contain.text', errorMessages.email);

      });

      it('button is disabled', () => {
        //ARRANGE
        // cy.visit('http://localhost:5173/')

        //ACT
        cy.get('[data-cy="email-input"]').type('invalid-email')
        //ASSERT

        cy.get('[data-cy="submit-button"]').should('be.disabled');

      });
    });

    // ~~ INVALID E-MAIL & PASSWORD SCENARIO

    describe("invalid e-mail & password entered", () => {
      it('two error message on screen', () => {
        //ARRANGE
        // cy.visit('http://localhost:5173/')

        //ACT
        cy.get('[data-cy="email-input"]').type('invalid-email')
        cy.get('[data-cy="password-input"]').type('invalid-password')
        //ASSERT

        cy.get('[data-cy="error-message"]').should('have.length', 2);

      });

      it('an error message is displayed for also password', () => {
        //ARRANGE
        // cy.visit('http://localhost:5173/')

        //ACT
        cy.get('[data-cy="email-input"]').type('invalid-email')
        cy.get('[data-cy="password-input"]').type('invalid-password')
        //ASSERT

        cy.get('[data-cy="error-message"]').should('contain.text', errorMessages.password);

      });
    });

    // ~~ VALID E-MAIL & PASSWORD BUT UNCHECKED CHECKBOX SCENARIO

    describe("valid e-mail & password, but unchecked checkbox", () => {
      it('button is disabled', () => {
        //ARRANGE
        // cy.visit('http://localhost:5173/')

        //ACT
        cy.get('[data-cy="email-input"]').type('asd@asd.com')
        cy.get('[data-cy="password-input"]').type('AAbbb@22')
        cy.get('[data-cy="checkbox-input"]').should('not.be.checked');

        //ASSERT
        cy.get('[data-cy="submit-button"]').should("be.disabled");
      });
    });
  });

});
