export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popupElement = document.querySelector(popupSelector);

    this.setEventListeners();
    this._handleOverlayClose();
  };

  open() {
    this._popupElement.classList.add('popup_opened');

    document.addEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    });
  };

  close() {
    this._popupElement.classList.remove('popup_opened');

    document.removeEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    });
  };

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened');
      this.close(openedPopup);
    };
  };

  _handleOverlayClose() {
    this._overlayElement = this._popupElement.querySelector('.popup__overlay');
    this._overlayElement.addEventListener('click', () => {
      this.close();
    });
  };

  setEventListeners() {
    const closePopupButton = this._popupElement.querySelector('.popup__close');
    closePopupButton.addEventListener('click', () => {
      this.close();
    });
  };
};