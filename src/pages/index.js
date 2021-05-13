import './index.css';

import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithConfirm from '../components/PopupWithConfirm';

import { cardListSection, popupEdit, popupEditName, popupEditAbout, popupEditButton, popupEditForm, profileName, profileAbout, profileAvatar, profileAvatarImg, popupNewCardButton, popupNewCard, newCardPopupForm, popupTypeAvatar, popupAvatarForm, popupImage, popupDelete, templateElement } from '../utils/constants.js';


let currentUserId = null;


const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-23',
  headers: {
    authorization: 'ce30702f-aad6-404b-8589-19ddc37b66b8',
    'Content-Type': 'application/json'
  }
});


const userInfo = new UserInfo({
  userInfoName: profileName,
  userInfoAbout: profileAbout,
  userAvatar: profileAvatarImg
});


const cardList = new Section({
  renderer: (item) => {
    cardList.addItem(createNewCard(item, currentUserId));
  }
}, cardListSection);


const popupEditProfile = new PopupWithForm({
  popupSelector: popupEdit, 
  handleFormSubmit: (data) => {
    popupEditProfile.renderLoading(true);
    api.setUserInfo(data)
      .then((data) => {
        userInfo.setUserInfo(data);

        popupEditProfile.closeReset();
      })
      .catch((err) => {
        console.log(`Attention! ${err}`);
     })
      .finally(() => {
        popupEditProfile.renderLoading(false);
      });
  }
}, popupEditForm);

popupEditProfile.setEventListeners();

popupEditButton.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();

  popupEditName.value = userData.name;
  popupEditAbout.value = userData.about; 

  editPopupFormValidator.resetValidator();

  popupEditProfile.open();
}); 


const popupAddCard = new PopupWithForm({
  popupSelector: popupNewCard,
  handleFormSubmit: (item) => {
    popupAddCard.renderLoading(true);
    api.newCard(item)
      .then((item) => {
        cardList.addItem(createNewCard(item, currentUserId));
        popupAddCard.closeReset();
      })
      .catch((err) => {
        console.log(`Attention! ${err}`);
     })
      .finally(() => {
        popupAddCard.renderLoading(false);
      });
  }
});

popupAddCard.setEventListeners();

popupNewCardButton.addEventListener('click', () => {

  newCardPopupFormValidator.resetValidator();

  popupAddCard.open();
});


const popupImageOpen = new PopupWithImage(popupImage);

popupImageOpen.setEventListeners();


const popupAvatar = new PopupWithForm({
  popupSelector: popupTypeAvatar,
  handleFormSubmit: (data) => {
    popupAvatar.renderLoading(true);
    api.newAvatar(data)
      .then((data) => {
        userInfo.setUserInfo(data);
        
        popupAvatar.closeReset();
      })
      .catch((err) => {
        console.log(`Attention! ${err}`);
     })
      .finally(() => {
        popupAvatar.renderLoading(false);
      });
  }
});

popupAvatar.setEventListeners();

profileAvatar.addEventListener('click', () => {
  popupAvatar.open();

  popupAvatarForm.reset();

  avatarPopupFormValidator.resetValidator();
});


const deletePopup = new PopupWithConfirm(popupDelete);

deletePopup.setEventListeners();


function createNewCard (item, currentUserId) {
  const card = new Card({
    data: item, 
    cardSelector: templateElement,
    handleCardClick: () => {
      popupImageOpen.open(item.name, item.link);
    },
    handleDeleteCard: () => {
      deletePopup.setSubmitAction(() => {
        api.deleteCard(item._id)
          .then(() => {
            card.deleteCard();
            deletePopup.close();
          });
      });
      deletePopup.open();
    }, 
    handleLikeIcon: () => {
      if(card.isLiked()) {
        api.deleteLike(item._id)
          .then((data) => {
            card.displayQuantityLikes(data);
          })
          .catch((err) => {
            console.log(`Attention! ${err}`);
         });
      } else {
        api.getLike(item._id)
          .then((data) => {
            card.displayQuantityLikes(data);
          })
          .catch((err) => {
            console.log(`Attention! ${err}`);
         });
      };
    }
  }, currentUserId);

  const cardElement = card.generateCard();

  newCardPopupForm.reset();
  
  card.displayQuantityLikes(item);

  return cardElement;
};


Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userData, cardData]) => {
    userInfo.setUserInfo(userData);

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
  formElement: popupEditForm
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