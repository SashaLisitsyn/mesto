// Здравствуйте. Исправил все замечания, кроме одного: "Если добавить карточку, а затем снова открыть попап добавления карточки, то кнопка добавления активна, хотя инпуты пусты". Никак не могу сообразить, как этот вопрос решить. Объясните, пожалуйста, максимально подробно, как устранить эту проблему (:

import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';

import { popupEdit, popupEditName, popupEditFamous, popupEditButton, profileName, profileFamous, popupNewCardButton, popupNewCard, popupImage, someFormElement, cardListSection } from '../utils/constants.js';
import { initialCards } from '../utils/initial-сards.js';


const userInfo = new UserInfo({
  userInfoName: profileName,
  userInfoFamous: profileFamous,
});


const newPopupEdit = new PopupWithForm(popupEdit, (data) => {
  userInfo.setUserInfo(data);

  newPopupEdit.close();
});


const popupEditOpen = new Popup(popupEdit);

popupEditButton.addEventListener('click', () => {
  const { name, famous } = userInfo.getUserInfo();

  popupEditName.value = name;
  popupEditFamous.value = famous; 

  popupEditOpen.open();
}); 


const popupNewCardOpen = new Popup(popupNewCard);

popupNewCardButton.addEventListener('click', () => {

  popupNewCardOpen.open();
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