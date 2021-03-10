const popup = document.querySelector('.popup');

const showPopupButton = document.querySelector('.profile__edit-button');
const closePopupButton = document.querySelector('.popup__close');

const profileName = document.querySelector('.profile__name');
const profileFamous = document.querySelector('.profile__famous');

const popupName = document.querySelector('.popup__input.popup__input_text_name');
const popupFamous = document.querySelector('.popup__input.popup__input_text_famous');

const formSave = document.querySelector('.popup__form');

function showPopup () {
  popup.classList.add('popup_opened');
  popupName.value = profileName.textContent;
  popupFamous.value = profileFamous.textContent;
};

function closePopup () {
  popup.classList.remove('popup_opened');
};

showPopupButton.addEventListener('click', showPopup);
closePopupButton.addEventListener('click', closePopup);

function formPopup (evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileFamous.textContent = popupFamous.value;
  closePopup();
};

formSave.addEventListener('submit', formPopup);

const popupImage = document.querySelector('.popup-image');
const showPopupImageButton = document.querySelector('.profile__add-buttom');
const closePopupImageButton = document.querySelector('.popup-image__close');

function showPopupImage () {
  popupImage.classList.add('popup-image_opened');
};

function closePopupImage () {
  popupImage.classList.remove('popup-image_opened');
};

showPopupImageButton.addEventListener('click', showPopupImage);
closePopupImageButton.addEventListener('click', closePopupImage);

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

const elementsContainer = document.querySelector('.elements');
const templateElement = document.querySelector('.template-element');

function deleteElement (evt) {
  evt.target.closest('.element').remove();
};

function addTaskListeners (task) {
  const deleteButton = task.querySelector('.element__delete');
  deleteButton.addEventListener('click', deleteElement);
};

function createTemplateElement(element) {
  const newElement = templateElement.content.cloneNode(true);
  const elementName = newElement.querySelector('.element__name');
  const elementPhoto = newElement.querySelector('.element__photo');

  newElement.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
  });

  elementName.textContent = element.name;
  elementPhoto.src = element.link;

  return newElement;
};

function renderList() {
  const result = initialCards.map(function(element) {
    const popupImageInputTitleNew = createTemplateElement(element);
    addTaskListeners (popupImageInputTitleNew);
    return popupImageInputTitleNew;
  });

  elementsContainer.prepend(...result);
};

renderList();

const elementForm = document.querySelector('.popup-image__form');

function addElementForm(evt) {
  evt.preventDefault();

  const popupImageInputName = document.querySelector('.popup-image__input_text_name');
  const popupImageInputLink = document.querySelector('.popup-image__input_text_link');

  const popupImageInputNameTitle = popupImageInputName.value;
  const popupImageInputLinkTitle = popupImageInputLink.value;

  const popupImageInputTitleNew = createTemplateElement({name: popupImageInputNameTitle, link: popupImageInputLinkTitle});

  addTaskListeners (popupImageInputTitleNew);

  elementsContainer.prepend(popupImageInputTitleNew);
  
  closePopupImage();
};

elementForm.addEventListener('submit', addElementForm);

const elementPopup = document.querySelector('.element-popup');
const elementPopupButton = document.querySelectorAll('.element__photo');

elementPopupButton.forEach (function (img) {
  img.addEventListener('click', function showElementPopup (evt) {
  elementPopup.classList.add('element-popup_opened');   
  
  const elementPopupNameLast = evt.target.closest('.element').querySelector('.element__name');
  const elementPopupImgLast = evt.target;
  
  const elementPopupName = document.querySelector('.element-popup__name');
  const elementPopupImg = document.querySelector('.element-popup__img');
  
  elementPopupName.textContent = elementPopupNameLast.textContent;
  elementPopupImg.src = elementPopupImgLast.src;
  })
});

const closeElementPopupButton = document.querySelector('.element-popup__close');

function closeElementPopup () {
  elementPopup.classList.remove('element-popup_opened');
};

closeElementPopupButton.addEventListener('click', closeElementPopup);