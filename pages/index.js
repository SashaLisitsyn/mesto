import { Card } from '../components/Card.js';

import { cardsList, validatorList } from '../utils/utils.js'

import { elementFormPopupNewCard, popupEdit, popupEditName, popupEditFamous, popupEditButton, profileName, profileFamous, formSavePopupEdit, popupNewCardButton, popupNewCard, popupNewCardName, popupNewCardLink, popupImage, closePopupEditButton, closePopupNewCardButton, popupImageClose } from '../utils/constants.js'


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