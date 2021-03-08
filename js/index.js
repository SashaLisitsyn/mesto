let popup = document.querySelector('.popup');

let showPopupButton = document.querySelector('.profile__edit-button');
let closePopupButton = document.querySelector('.popup__close');

let profileName = document.querySelector('.profile__name');
let profileFamous = document.querySelector('.profile__famous');

let popupName = document.querySelector('.popup__input.popup__input_text_name');
let popupFamous = document.querySelector('.popup__input.popup__input_text_famous');

let formSave = document.querySelector('.popup__form');

function showPopup () {
  popup.classList.add('popup_opened');
  popupName.value = profileName.textContent;
  popupFamous.value = profileFamous.textContent;
}

function closePopup () {
  popup.classList.remove('popup_opened');
}

showPopupButton.addEventListener('click', showPopup);
closePopupButton.addEventListener('click', closePopup);

function formPopup (evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileFamous.textContent = popupFamous.value;
  closePopup()
}

formSave.addEventListener('submit', formPopup);
