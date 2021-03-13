//Олег, здравствуйте! Благодарю Вас за то, что указали на многие ошибки и заставили сделать рефакторинг кода. С помощью этого написанный код хорошо уложился в моей голове и многие вещи сталы мне ясны и понятны. У меня к Вам будет несколько просьб. Во-первых, объясните, пожалуйста, МАКСИМАЛЬНО подробно, как сделать так, чтобы все попапы с помощью одной функции открывались, а с помощью второй все попапы закрывались. Во-вторых, я почему-то не могу очистить формы после создания карточек (хотя reset к форме применял); помогите, пожалуйста, решить данную проблему. В-третьих, будьте добры дать мне дополнительную итерацию и дополнительный день для написания кода (я бы хотел максиально детально разобраться в возникших у меня проблемах и, если что, к Вам обратиться). 


// P.S. Проверьте еще раз, пожалуйста, на наличие косяков (вроде бы все исправил за исключением открытия/закрытия попапов и очищения формы).

// И еще раз огромное спасибо за проделанную Вами работу (:


const elementsContainer = document.querySelector('.elements');
const templateElement = document.querySelector('.template-element');


const popupEdit = document.querySelector('.popup_type_edit');
const popupEditName = document.querySelector('.popup__input.popup__input_edit_name');
const popupEditFamous = document.querySelector('.popup__input.popup__input_edit_famous');
const showPopupEditButton = document.querySelector('.profile__edit-button');
const closePopupEditButton = document.querySelector('.popup__close_type');
const profileName = document.querySelector('.profile__name');
const profileFamous = document.querySelector('.profile__famous');
const formSavePopupEdit = document.querySelector('.popup__form_edit');

function showPopupEdit () {
  popupEdit.classList.add('popup_opened');
  popupEditName.value = profileName.textContent;
  popupEditFamous.value = profileFamous.textContent;
};

showPopupEditButton.addEventListener('click', showPopupEdit);

function closePopupEdit () {
  popupEdit.classList.remove('popup_opened');
};

closePopupEditButton.addEventListener('click', closePopupEdit);

function formPopupEdit (evt) {
  evt.preventDefault();
  profileName.textContent = popupEditName.value;
  profileFamous.textContent = popupEditFamous.value;
  closePopupEdit();
};

formSavePopupEdit.addEventListener('submit', formPopupEdit);


const popupNewCard = document.querySelector('.popup_type_new-card');
const showPopupNewCardButton = document.querySelector('.profile__add-buttom');
const closePopupNewCardButton = document.querySelector('.popup__close_new-card');

function showPopupNewCard () {
  popupNewCard.classList.add('popup_opened');
};

showPopupNewCardButton.addEventListener('click', showPopupNewCard);

function closePopupNewCard () {
  popupNewCard.classList.remove('popup_opened');
};

closePopupNewCardButton.addEventListener('click', closePopupNewCard);


function handleLikeIcon (evt) {
  evt.target.classList.toggle('element__like_active');
}


function handleDeleteCard (evt) {
  evt.target.closest('.element').remove();
}


const popupImage = document.querySelector('.popup_type_image');
const popupImageName = document.querySelector('.popup__caption');
const popupImagePhoto = document.querySelector('.popup__image');
const popupImageClose = document.querySelector('.popup__close_image');

function createElement (element) {
  const newElement = templateElement.content.cloneNode(true);

  const elementName = newElement.querySelector('.element__name');
  const elementPhoto = newElement.querySelector('.element__photo');

  const elementLike = newElement.querySelector('.element__like');
  const elementDelete = newElement.querySelector('.element__delete');

  const popupImageButton = newElement.querySelector('.element__photo');

  elementName.textContent = element.name;
  elementPhoto.src = element.link;
  elementPhoto.alt = 'Фото';

  elementLike.addEventListener('click', handleLikeIcon)

  elementDelete.addEventListener('click', handleDeleteCard)

  function showImagePopup (evt) {
    popupImage.classList.add('popup_opened')
    popupImageName.textContent = evt.target.alt;
    popupImagePhoto.src = evt.target.src;
    popupImagePhoto.alt = evt.target.alt;
  }

  popupImageButton.addEventListener('click', showImagePopup);

  function closePopupImage () {
    popupImage.classList.remove('popup_opened');
  };

  popupImageClose.addEventListener('click', closePopupImage);

  return newElement
}


function renderList () {
  const cards = initialCards.map (createElement)

  elementsContainer.prepend(...cards)
}

renderList ()


const popupNewCardName = document.querySelector('.popup__input_new-card_name');
const popupNewCardLink = document.querySelector('.popup__input_new-card_link');

function addNewElement (evt) {
  evt.preventDefault ();

  const popupNewCardNameTitle = popupNewCardName.value;
  const popupNewCardLinkTitle = popupNewCardLink.value;

  const popupNewCardTitle = createElement({name: popupNewCardNameTitle, link: popupNewCardLinkTitle});

  elementsContainer.prepend(popupNewCardTitle)

  closePopupNewCard();
}


const elementFormPopupNewCard = document.querySelector('.popup__form-new-card');

elementFormPopupNewCard.addEventListener('submit', addNewElement);