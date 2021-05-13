import Popup from "./Popup";

export default class PopupWithConfirm extends Popup {
  constructor(popupElement) {
    super(popupElement);
  };

  setSubmitAction(submitAction) {
    this._handleSubmiteCallback = submitAction;
  };

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleSubmiteCallback();
    });
  };
};