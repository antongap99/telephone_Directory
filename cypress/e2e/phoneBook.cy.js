/// <reference types='cypress'/>

describe('Тестируем телефонный справочник', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
  })
  it('открыть модальное окно', () => {

    // можно использовать get чтобы найти кнопку по селектору
    cy.contains('добавить').click()
    // проверяем открылось ли модальное окно
    cy.get('.form-overlay').should('have.class', 'is-visible')
  });


  it('добавить контакт', () => {
    cy.contains('добавить').click();
    // получим элементы формы
    // и вводим данные
    cy.get('[name="name"]').type('иван');
    cy.get('[name="surname"]').type('Петров');
    cy.get('[name="phone"]').type('89114541214');
    // клик по кнопке добавить
    cy.get('.form-overlay').get('[type="submit"]').click(); 
    // модальное окно должно закрыться
    cy.get('.form-overlay').should('not.have.class', 'is-visible')
    // после в таблице должен появиться новый контакт
    cy.get('tbody').get('.contact').should('contain.html', '<td class="delete"><button class="del-icon"></button></td><td class="contact__name"><span class="name">иван</span></td><td class="contact__surname"><span class="surname">Петров</span></td><td class="contact__phone"><a class="phoneLink" href="tel 89114541214">89114541214</a></td><td class="contact__edit"><button class="editBtn">редактировать</button></td>' )
    
  })

})