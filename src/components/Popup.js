export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popupElement = document.querySelector(popupSelector);

    this.setEventListeners();
    this._handleOverlayClose();
    this._handleEscClose = this._handleEscClose.bind(this);
  };

  open() {
    this._popupElement.classList.add('popup_opened');

    document.addEventListener('keydown', this._handleEscClose);
  };

  close() {
    this._popupElement.classList.remove('popup_opened');

    document.removeEventListener('keydown', this._handleEscClose); 
  };

  loading(data) {
    const submitButtom = this._popupElement.querySelector('.popup__save');
    if (data) {
      submitButtom.textContent = 'Сохранение...';
    } else {
      submitButtom.textContent = 'Сохранить';
    };
  };

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close()
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