import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this.setEventListeners();
  };

  open(name, link) {
    super.open();

    this._popupName = this._popupElement.querySelector('.popup__caption');
    this._popupPhoto = this._popupElement.querySelector('.popup__image'); 

    this._popupName.textContent = name;
    this._popupPhoto.src = link;
  };
};