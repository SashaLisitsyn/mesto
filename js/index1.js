const popupImage = document.querySelector('.popup-image');
const showPopupImageButton = document.querySelector('.profile__add-buttom');
const closePopupImageButton = document.querySelector('.popup-image__close');

function showPopupImage () {
  popupImage.classList.add('popup-image_opened');
}

function closePopupImage () {
  popupImage.classList.remove('popup-image_opened');
}

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

function createElement(element) {
  return `
    <article class="element">
     <img src="${element.link}" alt="Пикча" class="element__photo">
     <div class="element__name-like">
      <h2 class="element__name">${element.name}</h2>
      <button class="element__button" type="button">
        <img src="images/Like.svg" alt="Пикча" class="element__like">
       </button>
     </div>
    </article>
  `
}

function renderList() {
  const result = initialCards.map(createElement).join('');

  elementsContainer.insertAdjacentHTML('afterbegin', result);
}

renderList();

const elementForm = document.querySelector('.popup-image__form');

function addElementForm(evt) {
  evt.preventDefault();

  const popupImageInputName = document.querySelector('.popup-image__input_text_name');
  const popupImageInputLink = document.querySelector('.popup-image__input_text_link');

  const popupImageInputNameTitle = popupImageInputName.value;
  const popupImageInputLinkTitle = popupImageInputLink.value;

  const popupImageInputTitleNew = createElement({name: popupImageInputNameTitle, link: popupImageInputLinkTitle});

  elementsContainer.insertAdjacentHTML('afterbegin', popupImageInputTitleNew);

  popupImageInputName.value = '';
  popupImageInputLink.value = '';
  
  closePopupImage()
}

elementForm.addEventListener('submit', addElementForm)