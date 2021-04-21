import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';

import { popupEdit, popupEditName, popupEditFamous, popupEditButton, profileName, profileFamous, popupNewCardButton, popupNewCard, popupImage, popupImageClose, someFormElement, cardListSection } from '../utils/constants.js';
import { initialCards } from '../utils/initial-сards.js';


const userInfo = new UserInfo({
  userInfoName: profileName,
  userInfoFamous: profileFamous,
});


const newPopupEdit = new PopupWithForm(popupEdit, (data) => {
  userInfo.setUserInfo(data);

  newPopupEdit.close();
});


popupEditButton.addEventListener('click', () => {
  const name = profileName.textContent;
  const famous = profileFamous.textContent;

  userInfo.getUserInfo(popupEditName.value = name, popupEditFamous.value = famous);

  const popup = new Popup(popupEdit);
  popup.open();
}); 


popupNewCardButton.addEventListener('click', () => {
  const popup = new Popup(popupNewCard);
  popup.open();
});


popupImageClose.addEventListener('click', () => {
  const popup = new Popup(popupImage);
  popup.close(); 
});


const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, 
      '.template-element_type_default',
      () => {
        const popup = new PopupWithImage(popupImage);
        popup.open(item.name, item.link);
      });

    const cardElement = card.generateCard();

    cardsList.addItem(cardElement);
  }
}, cardListSection);

cardsList.renderItems();


const newCard = new PopupWithForm(popupNewCard, (item) => {
  const card = new Card(item, 
    '.template-element_type_default',
    () => {
      const popup = new PopupWithImage(popupImage);
      popup.open(item.name, item.link);
    });

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