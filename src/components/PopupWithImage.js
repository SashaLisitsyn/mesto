import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this.setEventListeners();
  };

  open(name, link) {
    this._popupElement.classList.add('popup_opened');

    const popupName = document.querySelector('.popup__caption');
    const popupPhoto = document.querySelector('.popup__image');

    popupName.textContent = name;
    popupPhoto.src = link;

    document.addEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    });
  };
};