import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';

import { elementFormPopupNewCard, popupEdit, popupEditName, popupEditFamous, popupEditButton, profileName, profileFamous, formSavePopupEdit, popupNewCardButton, popupNewCard, popupNewCardName, popupNewCardLink, popupImage, popupImageClose, someFormElement, cardListSection } from '../utils/constants.js';
import { initialCards } from '../utils/initial-сards.js';


function showPopupEdit () { 
  popupEditName.value = profileName.textContent; 
  popupEditFamous.value = profileFamous.textContent; 
  const popup = new Popup({
    popupSelector: popupEdit,
  });
  popup.open();
}; 

popupEditButton.addEventListener('click', showPopupEdit); 


popupNewCardButton.addEventListener('click', (evt) => {
  const popup = new Popup({
    popupSelector: popupNewCard,
  });
  popup.open();
});


function transferFormPopupEdit (evt) {
  evt.preventDefault();
  profileName.textContent = popupEditName.value;
  profileFamous.textContent = popupEditFamous.value;

  const popup = new Popup({
    popupSelector: popupEdit,
  });
  popup.close();
};

formSavePopupEdit.addEventListener('submit', transferFormPopupEdit);


function addNewElement (evt) {
  evt.preventDefault ();

  const elementsContainer = document.querySelector('.elements');
  const popupNewCardNameTitle = popupNewCardName.value;
  const popupNewCardLinkTitle = popupNewCardLink.value;

  const popupNewCardTitle = {name: popupNewCardNameTitle, link: popupNewCardLinkTitle};

  const newCard = new Card(popupNewCardTitle, '.template-element_type_default');

  elementsContainer.prepend(newCard.generateCard());

  elementFormPopupNewCard.reset();

  const popup = new Popup({
    popupSelector: popupNewCard,
  });
  popup.close();
};

elementFormPopupNewCard.addEventListener('submit', addNewElement);


function closePopupOverlay () {
  const popupList = Array.from(document.querySelectorAll('.popup'));
  
  popupList.forEach(popupElement => {
    const overlayElement = popupElement.querySelector('.popup__overlay');
    overlayElement.addEventListener('click', (evt) => {
      const popup = new Popup({
        popupSelector: popupElement,
      });
      popup.close();
    });
  });
};

closePopupOverlay ();


popupImageClose.addEventListener('click', (evt) => {
  const popup = new Popup({
    popupSelector: popupImage,
  });
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

