const BUN_ID = 'bun-1';
const MAIN_ID = 'main-1';
const SAUCE_ID = 'sauce-1';

const addIngredient = (id: string) => {
  cy.get(`[data-id="${id}"]`).contains('button', 'Добавить').click();
};

describe('Страница конструктора', () => {
  describe('Работа с ингредиентами и модалкой', () => {
    beforeEach(() => {
      cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as(
        'getIngredients'
      );

      cy.visit('/');
      cy.wait('@getIngredients');
    });

    it('добавляет булку и начинки в конструктор', () => {
      addIngredient(BUN_ID);
      addIngredient(MAIN_ID);
      addIngredient(SAUCE_ID);

      cy.get('[data-cy="constructor"]').within(() => {
        cy.contains('Флюоресцентная булка R2-D3 (верх)').should('exist');
        cy.contains('Флюоресцентная булка R2-D3 (низ)').should('exist');
        cy.contains('Котлета из метеорита').should('exist');
        cy.contains('Соус Spicy-X').should('exist');
      });
    });

    it('открывает модалку ингредиента и закрывает по крестику', () => {
      cy.get(`[data-id="${MAIN_ID}"]`)
        .find('[data-cy="ingredient-link"]')
        .click();

      cy.get('[data-cy="modal"]').should('be.visible');
      cy.get('[data-cy="modal"]').contains('Детали ингредиента').should('exist');
      cy.get('[data-cy="modal"]').contains('Котлета из метеорита').should('exist');

      cy.get('[data-cy="modal-close"]').click();
      cy.get('[data-cy="modal"]').should('not.exist');
    });

    it('закрывает модалку ингредиента по клику на оверлей', () => {
      cy.get(`[data-id="${MAIN_ID}"]`)
        .find('[data-cy="ingredient-link"]')
        .click();

      cy.get('[data-cy="modal"]').should('be.visible');
      cy.get('[data-cy="modal-overlay"]').click({ force: true });
      cy.get('[data-cy="modal"]').should('not.exist');
    });
  });

  describe('Оформление заказа', () => {
    beforeEach(() => {
      cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as(
        'getIngredients'
      );
      cy.intercept('GET', '**/auth/user', { fixture: 'user.json' }).as(
        'getUser'
      );
      cy.intercept('POST', '**/orders', { fixture: 'order.json' }).as(
        'createOrder'
      );

      cy.visit('/', {
        onBeforeLoad(win) {
          win.localStorage.setItem('refreshToken', 'test-refresh-token');
          win.document.cookie = 'accessToken=test-access-token';
        }
      });

      cy.wait('@getIngredients');
      cy.wait('@getUser');
    });

    afterEach(() => {
      cy.clearCookie('accessToken');
      cy.window().then((win) => {
        win.localStorage.removeItem('refreshToken');
      });
    });

    it('создает заказ, показывает номер, закрывает модалку и очищает конструктор', () => {
      addIngredient(BUN_ID);
      addIngredient(MAIN_ID);
      addIngredient(SAUCE_ID);

      cy.contains('button', 'Оформить заказ').click();

      cy.wait('@createOrder').then(({ request }) => {
        expect(request.headers.authorization).to.equal('test-access-token');
        expect(request.body).to.deep.equal({
          ingredients: [BUN_ID, MAIN_ID, SAUCE_ID, BUN_ID]
        });
      });

      cy.get('[data-cy="modal"]').should('be.visible');
      cy.get('[data-cy="modal"]').contains('12345').should('exist');

      cy.get('[data-cy="modal-close"]').click();
      cy.get('[data-cy="modal"]').should('not.exist');

      cy.get('[data-cy="constructor"]').within(() => {
        cy.get('[data-cy="constructor-bun-placeholder"]').should(
          'have.length',
          2
        );
        cy.get('[data-cy="constructor-filling-placeholder"]').should('exist');
      });
    });
  });
});
