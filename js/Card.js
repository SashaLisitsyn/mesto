class Card {
  constructor (data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  };


  _getTemplate() {
    const templateElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return templateElement;
  };


  renderList() {
    this._element = this._getTemplate();
    this._handleLikeIconEventListeners();
    this._handleDeleteCardEventListeners();

    this._element.querySelector('.element__name').textContent = this._name;
    this._element.querySelector('.element__photo').src = this._link;

    return this._element;
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
  };

  _handleDeleteCardEventListeners() {
    this._element.querySelector('.element__delete').addEventListener('click', () => {
      this._handleDeleteCard();
    });
  };
};


initialCards.forEach((element) => {
  const card = new Card(element, '.template-element_type_default');
  const cardElement = card.renderList();
  const elementsContainer = document.querySelector('.elements');

  elementsContainer.prepend(cardElement);
});