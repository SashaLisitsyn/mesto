import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';

import { popupEdit, popupEditName, popupEditFamous, popupEditButton, profileName, profileFamous, formSavePopupEdit, popupNewCardButton, popupNewCard, popupImage, popupImageClose, someFormElement, cardListSection } from '../utils/constants.js';
import { initialCards } from '../utils/initial-сards.js';


function showPopupEdit () { 
  popupEditName.value = profileName.textContent; 
  popupEditFamous.value = profileFamous.textContent; 
  const popup = new Popup(popupEdit);
  popup.open();
}; 

popupEditButton.addEventListener('click', showPopupEdit); 


popupNewCardButton.addEventListener('click', (evt) => {
  const popup = new Popup(popupNewCard);
  popup.open();
});


function transferFormPopupEdit (evt) {
  evt.preventDefault();
  profileName.textContent = popupEditName.value;
  profileFamous.textContent = popupEditFamous.value;

  const popup = new Popup(popupEdit);
  popup.close();
};

formSavePopupEdit.addEventListener('submit', transferFormPopupEdit);


popupImageClose.addEventListener('click', () => {
  const popup = new Popup(popupImage);
  popup.close(); 
});


const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '.template-element_type_default');

    const cardElement = card.generateCard();

    cardsList.addItem(cardElement);
  }
}, cardListSection);

cardsList.renderItems();


const newCard = new PopupWithForm(popupNewCard, (item) => {
  const card = new Card(item, '.template-element_type_default');

  const cardElement = card.generateCard();

  cardsList.addItem(cardElement);

  newCard.close();
});


someFormElement.forEach((formElement) => {
  const someFormValidator = new FormValidator({
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_invalid',
    inputErrorClass: 'popup__input_error',
    errorClass: 'popup__span-error_visible'
  }, formElement);
  someFormValidator.enableValidation();
});