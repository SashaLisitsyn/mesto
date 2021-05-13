export default class Card {
  constructor ({data, cardSelector, handleCardClick, handleDeleteCard, handleLikeIcon}, currentId) {
    this._name = data.name;
    this._link = data.link;
    this._ownerId = data.owner._id;
    this._like = data.likes;
    this._currentId = currentId;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeIcon = handleLikeIcon;
  };


  generateCard() {
    this._element = this._getTemplate();

    this._element.querySelector('.element__name').textContent = this._name;
    this._element.querySelector('.element__photo').src = this._link;
    this._element.querySelector('.element__photo').alt = this._name;

    this._setEventListeners();
    this._showDelete();

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
  

  isLiked() {
    return this._isLiked;
  };

  displayQuantityLikes(data) {
    const likeIcon = this._element.querySelector('.element__like');
    const quantityLikes = this._element.querySelector('.element__quantity-likes');

    this._isLiked = data.likes.filter((data) => {
      return data._id === this._currentId;
    }).length > 0;

    if(this._isLiked) {
      likeIcon.classList.add('element__like_active');
      quantityLikes.textContent = data.likes.length;
    } else {
      likeIcon.classList.remove('element__like_active');
      quantityLikes.textContent = data.likes.length;
    };
  };


  deleteCard() {
    this._element.remove();
    this._element = null;
  };

  _showDelete() {
    if (this._ownerId === this._currentId) {
      this._element.querySelector('.element__delete').classList.add('element__delete_show');
    };
  };

  
  _setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._handleLikeIcon();
    });

    this._element.querySelector('.element__delete').addEventListener('click', () => {
      this._handleDeleteCard();
    });

    this._element.querySelector('.element__photo').addEventListener('click', () => {
      this._handleCardClick();
    });
  };
};
