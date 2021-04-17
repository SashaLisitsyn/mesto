export default class Popup {
  constructor({ popupSelector }) {
    this._popupSelector = popupSelector;

    this.setEventListeners();
  };

  open() {
    this._popupSelector.classList.add('popup_opened');

    document.addEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    });
  };

  close() {
    this._popupSelector.classList.remove('popup_opened');

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

  setEventListeners() {
    const closePopupButton = this._popupSelector.querySelector('.popup__close');
    closePopupButton.addEventListener('click', () => {
      this.close();
    });
  };
};