import Popup from './Popup.js';


export default class Card {
  constructor (data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  };


  generateCard() {
    this._element = this._getTemplate();
    
    this._handleLikeIconEventListeners();
    this._handleDeleteCardEventListeners();
    this._showImagePopupEventListeners();

    this._element.querySelector('.element__name').textContent = this._name;
    this._element.querySelector('.element__photo').src = this._link;

    return this._element;
  };


  _getTemplate() {
    const templateElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return templateElement;
  };


  _handleLikeIcon() {
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
  };

  _handleLikeIconEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._handleLikeIcon();
    });
  };


  _handleDeleteCard() {
    this._element.querySelector('.element__delete').closest('.element').remove();
    this._element = null;
  };

  _handleDeleteCardEventListeners() {
    this._element.querySelector('.element__delete').addEventListener('click', () => {
      this._handleDeleteCard();
    });
  };


  _showImagePopup() {
    const popupImageName = document.querySelector('.popup__caption');
    const popupImagePhoto = document.querySelector('.popup__image');
    const popupImage = document.querySelector('.popup_type_image');

    const popup = new Popup({
      popupSelector: popupImage,
    });
    popup.open();

    popupImageName.textContent = this._name;
    popupImagePhoto.src = this._link;
    popupImagePhoto.alt = this._name;
  };

  _showImagePopupEventListeners() {
    this._element.querySelector('.element__photo').addEventListener('click', () => {
      this._showImagePopup();
    });
  };
};
