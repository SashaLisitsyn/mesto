import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import Section from '../components/Section.js';

import { someFormElement, cardListSection } from './constants.js';
import { initialCards } from './initial-сards.js';


export const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '.template-element_type_default');

    const cardElement = card.generateCard();

    cardsList.addItem(cardElement);
  }
}, cardListSection);

cardsList.renderItems();


export const validatorList = someFormElement.forEach((formElement) => {
  const someFormValidator = new FormValidator({
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_invalid',
    inputErrorClass: 'popup__input_error',
    errorClass: 'popup__span-error_visible'
  }, formElement);
  someFormValidator.enableValidation();
});