import './index.css';

import Api from '../components/Api.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

import { cardListSection, popupEdit, popupEditName, popupEditAbout, popupEditButton, editPopupForm, profileName, profileAbout, profileAvatar, popupNewCardButton, popupNewCard, newCardPopupForm, popupAvatar, popupAvatarForm } from '../utils/constants.js';
import { createNewCard } from '../utils/utils.js';


export let currentUserId = null;


export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-23',
  headers: {
    authorization: 'ce30702f-aad6-404b-8589-19ddc37b66b8',
    'Content-Type': 'application/json'
  }
});


const userInfo = new UserInfo({
  userInfoName: profileName,
  userInfoAbout: profileAbout,
});


const cardList = new Section({
  renderer: (item) => {
    cardList.addItem(createNewCard(item, currentUserId))
  }
}, cardListSection);


const newPopupEdit = new PopupWithForm({
  popupSelector: popupEdit, 
  handleFormSubmit: (data) => {
    newPopupEdit.loading(true)
    api.setUserInfo(data)
      .then((data) => {
        userInfo.setUserInfo(data);

        newPopupEdit.close();
      })
      .finally(() => {
        newPopupEdit.loading(false);
      })
      .catch((err) => {
        console.log(`Attention! ${err}`);
     });
  }
});

popupEditButton.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();

  popupEditName.value = userData.name;
  popupEditAbout.value = userData.about; 

  editPopupFormValidator.disableSubmitButton();

  newPopupEdit.open();
}); 


const newCard = new PopupWithForm({
  popupSelector: popupNewCard,
  handleFormSubmit: (item) => {
    newCard.loading(true)
    api.newCard(item)
      .then((item) => {
        cardList.addItem(createNewCard(item, currentUserId));
        newCard.close();
      })
      .finally(() => {
        newCard.loading(false);
      })
      .catch((err) => {
        console.log(`Attention! ${err}`);
     });
  }
});

popupNewCardButton.addEventListener('click', () => {

  newCardPopupFormValidator.disableSubmitButton();

  newCard.open();
});


const popupNewAvatar = new PopupWithForm({
  popupSelector: popupAvatar,
  handleFormSubmit: (data) => {
    popupNewAvatar.loading(true);
    api.newAvatar(data.link)
      .then((data) => {
        profileAvatar.style.backgroundImage = `url(${data.avatar})`;
        popupNewAvatar.close();
      })
      .finally(() => {
        popupNewAvatar.loading(false);
      })
      .catch((err) => {
        console.log(`Attention! ${err}`);
     });
  }
});

profileAvatar.addEventListener('click', () => {
  popupNewAvatar.open();
  avatarPopupFormValidator.disableSubmitButton();
});


Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userData, cardData]) => {
    userInfo.setUserInfo(userData);

    profileAvatar.style.backgroundImage = `url(${userData.avatar})`;

    currentUserId = userData._id;

    cardList.renderItems(cardData);
  })
  .catch((err) => {
    console.log(`Attention! ${err}`);
 });


const selectorValidation = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_invalid',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__span-error_visible'
};

const editPopupFormValidator = new FormValidator({
  validationConfig: selectorValidation, 
  formElement: editPopupForm
});

editPopupFormValidator.enableValidation();

const newCardPopupFormValidator = new FormValidator({
  validationConfig: selectorValidation, 
  formElement: newCardPopupForm
});

newCardPopupFormValidator.enableValidation();

const avatarPopupFormValidator = new FormValidator({
  validationConfig: selectorValidation,
  formElement: popupAvatarForm
});

avatarPopupFormValidator.enableValidation();