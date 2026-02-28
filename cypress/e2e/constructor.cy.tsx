const BUN_ID = 'bun-1';
const MAIN_ID = 'main-1';
const SAUCE_ID = 'sauce-1';

const SELECTORS = {
  ingredientLink: '[data-cy="ingredient-link"]',
  addButton: 'button',

  modal: '[data-cy="modal"]',
  modalClose: '[data-cy="modal-close"]',
  modalOverlay: '[data-cy="modal-overlay"]',

  constructor: '[data-cy="constructor"]',
  constructorBunPlaceholder: '[data-cy="constructor-bun-placeholder"]',
  constructorFillingPlaceholder: '[data-cy="constructor-filling-placeholder"]',

  modalTitle: 'Детали ингредиента',
  orderButton: 'Оформить заказ'
} as const;

const addIngredient = (id: string) => {
  cy.get(`[data-id="${id}"]`).contains(SELECTORS.addButton, 'Добавить').click();
};

const checkModalVisible = (shouldBeVisible: boolean = true) => {
  if (shouldBeVisible) {
    cy.get(SELECTORS.modal).should('be.visible');
  } else {
    cy.get(SELECTORS.modal).should('not.exist');
  }
};

const closeModal = () => {
  cy.get(SELECTORS.modalClose).click();
  checkModalVisible(false);
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

      cy.get(SELECTORS.constructor).within(() => {
        cy.contains('Флюоресцентная булка R2-D3 (верх)').should('exist');
        cy.contains('Флюоресцентная булка R2-D3 (низ)').should('exist');
        cy.contains('Котлета из метеорита').should('exist');
        cy.contains('Соус Spicy-X').should('exist');
      });
    });

    it('открывает модалку ингредиента и закрывает по крестику', () => {
      cy.get(`[data-id="${MAIN_ID}"]`)
        .find(SELECTORS.ingredientLink)
        .click();
      checkModalVisible(true);
      cy.get(SELECTORS.modal).contains(SELECTORS.modalTitle).should('exist');
      cy.get(SELECTORS.modal).contains('Котлета из метеорита').should('exist');

      closeModal();
    });

    it('закрывает модалку ингредиента по клику на оверлей', () => {
      cy.get(`[data-id="${MAIN_ID}"]`)
        .find(SELECTORS.ingredientLink)
        .click();

      checkModalVisible(true);
      cy.get(SELECTORS.modalOverlay).click({ force: true });
      checkModalVisible(false);
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

      cy.contains(SELECTORS.orderButton).click();

      cy.wait('@createOrder').then(({ request }) => {
        expect(request.headers.authorization).to.equal('test-access-token');
        expect(request.body).to.deep.equal({
          ingredients: [BUN_ID, MAIN_ID, SAUCE_ID, BUN_ID]
        });
      });

      checkModalVisible(true);
      cy.get(SELECTORS.modal).contains('12345').should('exist');

      closeModal();

      cy.get(SELECTORS.constructor).within(() => {
        cy.get(SELECTORS.constructorBunPlaceholder).should(
          'have.length',
          2
        );
        cy.get(SELECTORS.constructorFillingPlaceholder).should('exist');
      });
    });
  });
});