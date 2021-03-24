const hasInvalidInput = (inputList) => {
  return inputList.some(inputElement => !inputElement.validity.valid);
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__save_invalid');
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove('popup__save_invalid');
    buttonElement.removeAttribute('disabled');
  }
}

const showInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add('popup__input_error');
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add('popup__span-error_visible');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_error');
  errorElement.textContent = '';
  errorElement.classList.remove('popup__span-error_visible');
};

const checkInput = (formElement, inputElement) => {
  if (inputElement.validity.valid) {
    hideInputError (formElement, inputElement)
  } else {
    showInputError (formElement, inputElement)
  };
};

const setInputListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__save');

  inputList.forEach (inputElement => {
      inputElement.addEventListener ('input', () => {
        checkInput(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    }
  )
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));

  formList.forEach(formElement => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setInputListeners(formElement);
  })
};

enableValidation();