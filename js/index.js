import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js'

import { initialCards } from './initial-сards.js'


const elementFormPopupNewCard = document.querySelector('.popup__form-new-card');

const popupEdit = document.querySelector('.popup_type_edit');
const popupEditName = document.querySelector('.popup__input.popup__input_edit_name');
const popupEditFamous = document.querySelector('.popup__input.popup__input_edit_famous');
const popupEditButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileFamous = document.querySelector('.profile__famous');

const formSavePopupEdit = document.querySelector('.popup__form_edit');

const popupNewCardButton = document.querySelector('.profile__add-buttom');
const popupNewCard = document.querySelector('.popup_type_new-card');

const popupNewCardName = document.querySelector('.popup__input_new-card_name');
const popupNewCardLink = document.querySelector('.popup__input_new-card_link');

const popupImage = document.querySelector('.popup_type_image');

const closePopupEditButton = document.querySelector('.popup__close_type');
const closePopupNewCardButton = document.querySelector('.popup__close_new-card');
const popupImageClose = document.querySelector('.popup__close_image');


function openPopup (popup) {
  popup.classList.add('popup_opened');

  document.addEventListener('keydown', closePopupEsc)
};

popupNewCardButton.addEventListener('click', (evt) => {openPopup(popupNewCard)});


function showPopupEdit () { 
  popupEditName.value = profileName.textContent; 
  popupEditFamous.value = profileFamous.textContent; 
  openPopup(popupEdit);
}; 

popupEditButton.addEventListener('click', showPopupEdit); 


function transferFormPopupEdit (evt) {
  evt.preventDefault();
  profileName.textContent = popupEditName.value;
  profileFamous.textContent = popupEditFamous.value;
  closePopup(popupEdit);
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

  closePopup (popupNewCard);
};

elementFormPopupNewCard.addEventListener('submit', addNewElement);


function closePopupOverlay () {
  const popupList = Array.from(document.querySelectorAll('.popup'));
  
  popupList.forEach(popupElement => {
    const overlayElement = popupElement.querySelector('.popup__overlay');
    overlayElement.addEventListener('click', (evt) => {closePopup(popupElement)})
  })
}

closePopupOverlay ()


export function closePopupEsc (evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup)
  }
}


function closePopup (popup) {
  popup.classList.remove('popup_opened');

  document.removeEventListener('keydown', closePopupEsc);
};

closePopupEditButton.addEventListener('click', (evt) => {closePopup (popupEdit)});

closePopupNewCardButton.addEventListener('click', (evt) => {closePopup (popupNewCard)});

popupImageClose.addEventListener('click', (evt) => {closePopup (popupImage)});


initialCards.forEach((element) => {
  const card = new Card(element, '.template-element_type_default');
  const cardElement = card.generateCard();
  const elementsContainer = document.querySelector('.elements');

  elementsContainer.prepend(cardElement);
});


const someFormElement = document.querySelectorAll('.popup__form');

someFormElement.forEach((formElement) => {
  const someFormValidator = new FormValidator({
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_invalid',
    inputErrorClass: 'popup__input_error',
    errorClass: 'popup__span-error_visible'
  }, formElement)
  someFormValidator.enableValidation()
})