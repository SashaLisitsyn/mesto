import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js'

import { someFormElement } from './constants.js';
import { initialCards } from './initial-сards.js';


export const cardsList = initialCards.forEach((element) => {
  const card = new Card(element, '.template-element_type_default');
  const cardElement = card.generateCard();
  const elementsContainer = document.querySelector('.elements');

  elementsContainer.prepend(cardElement);
});

export const validatorList = someFormElement.forEach((formElement) => {
  const someFormValidator = new FormValidator({
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_invalid',
    inputErrorClass: 'popup__input_error',
    errorClass: 'popup__span-error_visible'
  }, formElement)
  someFormValidator.enableValidation()
})