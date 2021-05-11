import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage';

import { api } from '../pages/index.js';

import { popupImage, popupDelete } from './constants.js';


const popupImageOpen = new PopupWithImage(popupImage);

export function createNewCard (item, currentUserId) {
  const card = new Card({
    data: item, 
    cardSelector: '.template-element_type_default',
    handleCardClick: () => {
      popupImageOpen.open(item.name, item.link);
    },
    handleDeleteCard: () => {
      const deletePopup = new PopupWithForm({
        popupSelector: popupDelete,
        handleFormSubmit: () => {
          api.deleteCard(item._id)
            .then(() => {
              card.deleteCard();
              deletePopup.close();
            })
            .catch((err) => {
              console.log(`Attention! ${err}`);
           });
        }
      });
      deletePopup.open();
      deletePopup.setEventListeners();
    },
    handleLikeIcon: () => {
      if(card.isLiked()) {
        api.deleteLike(item._id)
          .then((data) => {
            card.displayQuantityLikes(data);
          })
          .catch((err) => {
            console.log(`Attention! ${err}`);
         });
      } else {
        api.getLike(item._id)
          .then((data) => {
            card.displayQuantityLikes(data);
          })
          .catch((err) => {
            console.log(`Attention! ${err}`);
         });
      };
    }
  }, currentUserId);

  const cardElement = card.generateCard();
  
  card.displayQuantityLikes(item);

  return cardElement;
};