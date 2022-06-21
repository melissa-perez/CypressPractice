/// <reference types="cypress" />

import { stubString } from "cypress/types/lodash"


describe('Our first suite', () => {

    it('first test', () => {
        // out route path
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        // by tag name
        cy.get('input')

        // by id
        cy.get('#inputEmail1')

        // by class name
        cy.get('.input-full-width')

        // by attribute name
        cy.get('[placeholder]')

        // by attribute name and value
        cy.get('[placeholder="Email"]')

        // by class value, need to provide the entire class and value
        cy.get('[class="input-full-width size-medium shape-rectangle"]')

        // by tag name and attribute with value
        cy.get('input[placeholder="Email"]')

        // by two different attributes
        cy.get('input[placeholder="Email"][type="email"]')

        // by tag name, attribute with value, ID and class name
        cy.get('input[placeholder="Email"]#inputEmail1.input-full-width')

        // the most recommended way by Cypress, add my own attribute dynamically
        cy.get('[data-cy="imputEmail1"]')



    })

    it('second test', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.get('[data-cy="signInButton"]')
        cy.contains('Sign in')

        cy.contains('[status="warning"]','Sign in')
        // find specific button within this form
        cy.get('#inputEmail3').parents('form').find('button').should('contain', 'Sign in').parents('form').find('nb-checkbox').click()
        // find the form then go into nb card with type email
        cy.contains('nb-card', 'Horizontal form').find('[type="email"]')
    })

    it('third test then and wrap',  () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        // using the grid form
        cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email')
        cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password')

        // basic form
        cy.contains('nb-card', 'Basic form').find('[for="exampleInputEmail1"]').should('contain', 'Email')
        cy.contains('nb-card', 'Basic form').find('[for="exampleInputPassword1"]').should('contain', 'Password')

        //cannot save like this in cypress like then

        // const gridForm = cy.contains('nb-card', 'Using the Grid')
        // const basicForm =  cy.contains('nb-card', 'Basic form')

        // gridForm.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email')
        // gridForm.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password')


        // basicForm.contains('nb-card', 'Basic form').find('[for="exampleInputEmail1"]').should('contain', 'Email')
        // basicForm.contains('nb-card', 'Basic form').find('[for="exampleInputPassword1"]').should('contain', 'Password')

        cy.contains('nb-card', 'Using the Grid').then(firstForm => {
            //available for following within tests
            const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text()
            const passwordLabelFirst = firstForm.find('[for="inputPassword2"]').text()
            // jquery does not allow cypress methods
            // check the text labels in assertion. then means jquery no longer cypress
            expect(emailLabelFirst).to.equal('Email')
            expect(passwordLabelFirst).to.equal('Password')

            cy.contains('nb-card', 'Basic form').then(secondForm => {
                const emailLabelSecond = secondForm.find('[for="exampleInputEmail1"]').text()
                expect(emailLabelSecond.substring(0, 5)).to.equal(emailLabelFirst)
                // wrap back to cypress
                cy.wrap(secondForm).find('[for="exampleInputPassword1"]').should('contain', 'Password')
            })
            
        })

    })

    it('invoke command', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()
        //1
        cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')
    
        //2
        cy.get('[for="exampleInputEmail1"]').then(label => {
            expect(label.text()).to.equal('Email address')
        })

        //3 grabs text and invokes text method
        cy.get('[for="exampleInputEmail1"]').invoke('text').then(text => {
            expect(text).to.equal('Email address')
        })


        // next two are two different methods to check for a clicked checkbox
        //cy.contains('nb-card', 'Basic form').find('nb-checkbox').click().find('.custom-checkbox').invoke('attr', 'class').should('contain', 'checked')
         
        cy.contains('nb-card', 'Basic form').find('nb-checkbox').click().find('.custom-checkbox')
        .invoke('attr', 'class').then(classValue => {expect(classValue).to.contain('checked')
    })

    
    })

    it('assert property', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()

        cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
            cy.wrap(input).click()
            cy.get('nb-calendar-day-picker').contains('17').click()
            cy.wrap(input).invoke('prop', 'value').should('contain', 'Jun 17, 2022')
        })
    })

    //check() == special commands for checkboxes and radio buttons
    // can only check not unchecked
    // click() allows you to work with both
    it('radio button', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then(radioButtons => {
            cy.wrap(radioButtons).first().check({force: true}).should('be.checked')

            cy.wrap(radioButtons).eq(1).check({force: true})
            // or use eq(0)
            cy.wrap(radioButtons).first().should('not.be.checked')

            cy.wrap(radioButtons).eq(2).should('be.disabled')

        })
    })

    it.only('check boxes', () => {
        cy.visit('/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Toastr').click()
        // cant check if unchecked
        //cy.get('[type="checkbox"]').check({force: true})
        cy.get('[type="checkbox"]').eq(0).click({force: true})
        cy.get('[type="checkbox"]').eq(1).check({force: true})

    })
})
