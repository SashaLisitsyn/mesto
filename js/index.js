const elementsContainer = document.querySelector('.elements');
const templateElement = document.querySelector('.template-element');
const elementFormPopupNewCard = document.querySelector('.popup__form-new-card');

const popupEdit = document.querySelector('.popup_type_edit');
const popupEditName = document.querySelector('.popup__input.popup__input_edit_name');
const popupEditFamous = document.querySelector('.popup__input.popup__input_edit_famous');
const showPopupEditButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileFamous = document.querySelector('.profile__famous');

const formSavePopupEdit = document.querySelector('.popup__form_edit');

const showPopupNewCardButton = document.querySelector('.profile__add-buttom');
const popupNewCard = document.querySelector('.popup_type_new-card');

const popupNewCardName = document.querySelector('.popup__input_new-card_name');
const popupNewCardLink = document.querySelector('.popup__input_new-card_link');

const popupImageName = document.querySelector('.popup__caption');
const popupImagePhoto = document.querySelector('.popup__image');
const popupImage = document.querySelector('.popup_type_image');

const closePopupEditButton = document.querySelector('.popup__close_type');
const closePopupNewCardButton = document.querySelector('.popup__close_new-card');
const popupImageClose = document.querySelector('.popup__close_image');

const popupInputsNewCard = Array.from(document.querySelectorAll('.popup__input_new-card'));
const popupNewCardButton = document.querySelector('.popup__save_new-card')


function openPopup (popup) {
  popup.classList.add('popup_opened');

  toggleButtonState(popupInputsNewCard, popupNewCardButton);
};


showPopupNewCardButton.addEventListener('click', (evt) => {openPopup(popupNewCard)});


function showPopupEdit () { 
  popupEditName.value = profileName.textContent; 
  popupEditFamous.value = profileFamous.textContent; 
  openPopup(popupEdit);
}; 

showPopupEditButton.addEventListener('click', showPopupEdit); 

function transferFormPopupEdit (evt) {
  evt.preventDefault();
  profileName.textContent = popupEditName.value;
  profileFamous.textContent = popupEditFamous.value;
  closePopup(popupEdit);
};

formSavePopupEdit.addEventListener('submit', transferFormPopupEdit);

function addNewElement (evt) {
  evt.preventDefault ();

  const popupNewCardNameTitle = popupNewCardName.value;
  const popupNewCardLinkTitle = popupNewCardLink.value;

  const popupNewCardTitle = createElement({name: popupNewCardNameTitle, link: popupNewCardLinkTitle});

  elementsContainer.prepend(popupNewCardTitle);

  elementFormPopupNewCard.reset();

  closePopup (popupNewCard);
};

elementFormPopupNewCard.addEventListener('submit', addNewElement);


function showImagePopup (evt) {
  popupImageName.textContent = evt.target.alt;
  popupImagePhoto.src = evt.target.src;
  popupImagePhoto.alt = evt.target.alt;
  openPopup(popupImage);
};


function closePopupOverlay () {
  const popupList = Array.from(document.querySelectorAll('.popup'));
  
  popupList.forEach(popupElement => {
    const overlayElement = popupElement.querySelector('.popup__overlay');
    overlayElement.addEventListener('click', (evt) => {closePopup(popupElement)})
  })
}

closePopupOverlay ()


function closePopupEsc (evt) {
  if (evt.key === 'Escape') {
    const popupList = Array.from(document.querySelectorAll('.popup'));

    popupList.forEach(popupElement => {
      closePopup(popupElement)
    })
  }
}

document.body.addEventListener ('keydown', closePopupEsc)


function closePopup (popup) {
  popup.classList.remove('popup_opened');
};

closePopupEditButton.addEventListener('click', (evt) => {closePopup (popupEdit)});

closePopupNewCardButton.addEventListener('click', (evt) => {closePopup (popupNewCard)});

popupImageClose.addEventListener('click', (evt) => {closePopup (popupImage)});


function createElement (element) {
  const newElement = templateElement.content.cloneNode(true);

  const elementName = newElement.querySelector('.element__name');
  const elementPhoto = newElement.querySelector('.element__photo');

  const elementLike = newElement.querySelector('.element__like');
  const elementDelete = newElement.querySelector('.element__delete');

  const popupImageButton = newElement.querySelector('.element__photo');

  elementName.textContent = element.name;
  elementPhoto.src = element.link;
  elementPhoto.alt = element.name;


  elementLike.addEventListener('click', handleLikeIcon);


  elementDelete.addEventListener('click', handleDeleteCard);


  popupImageButton.addEventListener('click', showImagePopup);

  
  return newElement;
};


function renderList () {
  const cards = initialCards.map (createElement);

  elementsContainer.prepend(...cards);
};

renderList ();


function handleLikeIcon (evt) {
  evt.target.classList.toggle('element__like_active');
};


function handleDeleteCard (evt) {
  evt.target.closest('.element').remove();
};
