const popupEdit = document.querySelector('.popup_type_edit');

const showPopupEditButton = document.querySelector('.profile__edit-button');
const closePopupEditButton = document.querySelector('.popup__close_type');

const profileName = document.querySelector('.profile__name');
const profileFamous = document.querySelector('.profile__famous');

const popupEditName = document.querySelector('.popup__input.popup__input_edit_name');
const popupEditFamous = document.querySelector('.popup__input.popup__input__edit_famous');

const formSavePopupEdit = document.querySelector('.popup__form_edit');

const elementsContainer = document.querySelector('.elements');
const templateElement = document.querySelector('.template-element');

const popupNewCardName = document.querySelector('.popup__input_new-card_name');
const popupNewCardLink = document.querySelector('.popup__input_new-card_link');

const elementFormPopupNewCard = document.querySelector('.popup__form-new-card');

const popupImage = document.querySelector('.popup_type_image');
const popupImageName = document.querySelector('.popup__caption');
const popupImagePhoto = document.querySelector('.popup__image');
const popupImageClose = document.querySelector('.popup__close_image');

const popupNewCard = document.querySelector('.popup_type_new-card');
const showPopupNewCardButton = document.querySelector('.profile__add-buttom');
const closePopupNewCardButton = document.querySelector('.popup__close_new-card');

function showPopupEdit () {
  popupEdit.classList.add('popup_opened');
  popupEditName.value = profileName.textContent;
  popupEditFamous.value = profileFamous.textContent;
};

showPopupEditButton.addEventListener('click', showPopupEdit);

function closePopupEdit () {
  popupEdit.classList.remove('popup_opened');
};

closePopupEditButton.addEventListener('click', closePopupEdit);

function formPopupEdit (evt) {
  evt.preventDefault();
  profileName.textContent = popupEditName.value;
  profileFamous.textContent = popupEditFamous.value;
  closePopupEdit();
};

formSavePopupEdit.addEventListener('submit', formPopupEdit);

function showPopupNewCard () {
  popupNewCard.classList.add('popup_opened');
};

showPopupNewCardButton.addEventListener('click', showPopupNewCard);

function closePopupNewCard () {
  popupNewCard.classList.remove('popup_opened');
};

closePopupNewCardButton.addEventListener('click', closePopupNewCard);

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

function createElement (element) {
  const newElement = templateElement.content.cloneNode(true);

  const elementName = newElement.querySelector('.element__name');
  const elementPhoto = newElement.querySelector('.element__photo');

  const elementLike = newElement.querySelector('.element__like');
  const elementDelete = newElement.querySelector('.element__delete');

  const popupImageButtons = newElement.querySelectorAll('.element__photo');

  elementName.textContent = element.name;
  elementPhoto.src = element.link;

  function showElementLike (evt) {
    evt.target.classList.toggle('element__like_active');
  }

  elementLike.addEventListener('click', showElementLike)

  function showDeleteElement (evt) {
    evt.target.closest('.element').remove();
  }

  elementDelete.addEventListener('click', showDeleteElement)

  function showImagePopup (evt) {
    popupImage.classList.add('popup_opened')
    const popupImageNameStart = evt.target.closest('.element').querySelector('.element__name');
    const popupImagePhotoStart = evt.target;
  
    popupImageName.textContent = popupImageNameStart.textContent;
    popupImagePhoto.src = popupImagePhotoStart.src;
    popupImagePhoto.alt = popupImagePhotoStart.alt;
  }

  popupImageButtons.forEach (function (img) {
    img.addEventListener('click', showImagePopup);
  })

  function closePopupImage () {
    popupImage.classList.remove('popup_opened');
  };

  popupImageClose.addEventListener('click', closePopupImage);

  return newElement
}

function renderList () {
  const cards = initialCards.map (createElement)

  elementsContainer.prepend(...cards)
}

renderList ()

function addNewElement (evt) {
  evt.preventDefault ();

  const popupNewCardNameTitle = popupNewCardName.value;
  const popupNewCardLinkTitle = popupNewCardLink.value;

  const popupNewCardTitle = createElement({name: popupNewCardNameTitle, link: popupNewCardLinkTitle});

  elementsContainer.prepend(popupNewCardTitle)

  closePopupNewCard();
}

elementFormPopupNewCard.addEventListener('submit', addNewElement);