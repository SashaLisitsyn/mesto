import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';

import { popupEdit, popupEditName, popupEditFamous, popupEditButton, profileName, profileFamous, popupNewCardButton, popupNewCard, popupImage, cardListSection, editPopupForm, newCardPopupForm } from '../utils/constants.js';
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
  const { name, famous } = userInfo.getUserInfo();

  popupEditName.value = name;
  popupEditFamous.value = famous; 

  editPopupFormValidator.disableSubmitButton();

  newPopupEdit.open();
}); 


popupNewCardButton.addEventListener('click', () => {

  newCardPopupFormValidator.disableSubmitButton();

  newCard.open();
});


const popupImageOpen = new PopupWithImage(popupImage)

const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, 
      '.template-element_type_default',
      () => {
        popupImageOpen.open(item.name, item.link);
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
      popupImageOpen.open(item.name, item.link);
    });

  const cardElement = card.generateCard();

  cardsList.addItem(cardElement);

  newCard.close();
});


const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_invalid',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__span-error_visible'
}

const editPopupFormValidator = new FormValidator(validationConfig, editPopupForm);
editPopupFormValidator.enableValidation();

const newCardPopupFormValidator = new FormValidator(validationConfig, newCardPopupForm);
newCardPopupFormValidator.enableValidation();


