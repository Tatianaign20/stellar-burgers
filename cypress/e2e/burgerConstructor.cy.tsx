import cypress from 'cypress';
import { deleteCookie, setCookie } from '../../src/utils/cookie';

describe('проверяем бургер конструктор', function() {

    beforeEach(function () {
        // Перехваты запроса 'api/ingredients’,  'api/user'
        cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json'});
        cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });

      });
    
    it('проверка действий с модальным окном для простмотра деталей ингредиента', () => {
        cy.visit('/'); 
        cy.get('#modals').contains("Детали ингредиента").should('not.exist');
        cy.get('h3').contains('Булки').next('ul').find('li').first().click(); //клик по первой из списка булке "Краторная булка N-200i"
        cy.get('#modals').contains("Детали ингредиента").should('exist');
        cy.get('h3').contains('Краторная булка N-200i').should('exist'); //проверка названия булки в модальном окне
        cy.get('#modals').contains("Детали ингредиента").next('button').click();
        cy.get('#modals').contains("Детали ингредиента").should('not.exist');
      });

    it('проверка добавления начинки, булки, соуса из списка в конструктор', () => {
        cy.visit('/'); 
        cy.get('h3').contains('Булки').next('ul').should('exist');
        cy.get('h3').contains('Булки').next('ul').find('li').eq(1).contains('Добавить').click();
        cy.get('h3').contains('Булки').next('ul').find('li').eq(1).contains('2');
        cy.get('div').contains('Выберите булки').should('not.exist');
        cy.get('h3').contains("Начинки").next('ul').should('exist');
        cy.get('h3').contains('Начинки').next('ul').find('li').eq(2).contains('Добавить').click();
        cy.get('h3').contains('Начинки').next('ul').find('li').eq(2).contains('1');
        cy.get('h3').contains('Начинки').next('ul').find('li').eq(1).contains('Добавить').click();
        cy.get('h3').contains('Начинки').next('ul').find('li').eq(1).contains('1');
        cy.get('div').contains('Выбирете начинку').should('not.exist');
        cy.get('h3').contains("Соусы").next('ul').should('exist');
        cy.get('h3').contains('Соусы').next('ul').find('li').eq(1).contains('Добавить').click();
        cy.get('h3').contains('Соусы').next('ul').find('li').eq(1).contains('1');
    });

    it('проверка заказа и действий с модальным окном заказа', () => {
        cy.visit('/'); 
        setCookie('accessToken', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MDY4Njg4MTNhMmI3MDAxYzhmMGVkZCIsImlhdCI6MTcyOTk0MTA5NywiZXhwIjoxNzI5OTQyMjk3fQ.tx-vG_9ansmFOeGsg42Yan255sTm-NkryIUcXgJ3scg');
        localStorage.setItem('refreshToken', 'bb2700f5d4ba9c6f1a30d367803d24519c9a5c709583737603674f382cbd8d71167b0018b4989337');
        cy.get('h3').contains("Булки").next('ul').should('exist');
        cy.get('h3').contains('Булки').next('ul').find('li').eq(1).contains('Добавить').click();
        cy.get('div').contains('Выбирете булку').should('not.exist');
        cy.get('h3').contains("Начинки").next('ul').should('exist');
        cy.get('h3').contains('Начинки').next('ul').find('li').eq(2).contains('Добавить').click();
        cy.get('h3').contains('Начинки').next('ul').find('li').eq(2).contains('1');
        cy.get('div').contains('Выберите начинку').should('not.exist');
        cy.get('h3').contains('Начинки').next('ul').find('li').eq(0).contains('Добавить').click();
        cy.get('h3').contains('Начинки').next('ul').find('li').eq(0).contains('1');
        cy.get('h3').contains('Начинки').next('ul').find('li').eq(1).contains('Добавить').click();
        cy.get('h3').contains('Начинки').next('ul').find('li').eq(1).contains('1');
        cy.get('h3').contains("Соусы").next('ul').should('exist');
        cy.get('h3').contains('Соусы').next('ul').find('li').eq(1).contains('Добавить').click();
        cy.get('h3').contains('Соусы').next('ul').find('li').eq(1).contains('1');
        cy.get('div').contains('Оформить заказ').click();
        cy.intercept('POST', 'api/orders', { fixture: 'order.json' }); // Перехват запроса 'api/orders'
        cy.get('#modals').should('exist');
        cy.get('#modals').contains('идентификатор заказа').should('exist');
        cy.get('h2').contains('57655').should('exist');
        cy.get('#modals').find('button').click();
        cy.get('#modals').contains('идентификатор заказа').should('not.exist');
        cy.get('div').contains('Выберите булки').should('exist');
        cy.get('div').contains('Выберите начинку').should('exist');
    });
    });


