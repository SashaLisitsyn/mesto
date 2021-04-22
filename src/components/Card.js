export default class Card {
  constructor (data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this.handleCardClick = handleCardClick;
  };


  generateCard() {
    this._element = this._getTemplate();

    this._setEventListeners();

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

  _handleDeleteCard() {
    this._element.querySelector('.element__delete').closest('.element').remove();
    this._element = null;
  };

  
  _setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._handleLikeIcon();
    });

    this._element.querySelector('.element__delete').addEventListener('click', () => {
      this._handleDeleteCard();
    });

    this._element.querySelector('.element__photo').addEventListener('click', () => {
      this.handleCardClick();
    });
  };
};
