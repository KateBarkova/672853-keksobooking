'use strict';

(function () {
  var ESC_KEYCODE = 27;

  var RoomsToGuests = {
    0: [2],
    1: [1, 2],
    2: [0, 1, 2],
    3: [3]
  };

  var MinPriceToHouses = {
    bungalo: '0',
    flat: '1000',
    house: '5000',
    palace: '10000'
  };

  var dom = window.dom.getElements();
  var adForm = dom.form;
  var form = window.dom.getFormElements(adForm);
  var inputTitle = form.inputTitle;
  var inputPrice = form.inputPrice;
  var inputType = form.inputType;
  var timeIn = form.timeIn;
  var timeOut = form.timeOut;
  var rooms = form.room;
  var capacity = form.capacity;
  var resetButton = form.resetButton;
  var submitButton = form.submitButton;

  var validateFormTitle = function (element) {
    if (element.validity.tooShort) {
      element.setCustomValidity('Заголовок должен состоять минимум из 30 символов');
    } else if (element.validity.tooLong) {
      element.setCustomValidity('Заголовок не должен превышать 100-ти символов');
    } else if (element.validity.valueMissing) {
      element.setCustomValidity('Обязательное поле');
    } else {
      element.setCustomValidity('');
    }
  };

  var onTitleInvalid = function () {
    validateFormTitle(inputTitle);
  };

  var onTitleInput = function () {
    validateFormTitle(inputTitle);
  };

  var validateFormPrice = function (element) {
    if (element.validity.rangeUnderflow) {
      element.setCustomValidity('Минимально допустимая стоимость для данного типа жилья - ' + element.min + ' руб.');
    } else if (element.validity.rangeOverflow) {
      element.setCustomValidity('Максимально допустимая стоимость жилья - 1 000 000 руб.');
    } else if (element.validity.valueMissing) {
      element.setCustomValidity('Обязательное поле');
    } else {
      element.setCustomValidity('');
    }
  };

  var onPriceInvalid = function () {
    validateFormPrice(inputPrice);
  };

  var onPriceInput = function () {
    validateFormPrice(inputPrice);
  };

  var setMinimalPrice = function (typeObjects, price) {
    var selectedType = typeObjects.options[typeObjects.selectedIndex].value;
    price.placeholder = MinPriceToHouses[selectedType];
    price.min = MinPriceToHouses[selectedType];
  };

  var onTypeChange = function () {
    setMinimalPrice(inputType, inputPrice);
  };

  var setChangeTime = function (selectedTime, setTime) {
    var selectedElement = selectedTime.options[selectedTime.selectedIndex].value;
    setTime.value = selectedElement;
  };

  var onTimeInChange = function () {
    setChangeTime(timeIn, timeOut);
  };

  var onTimeOutChange = function () {
    setChangeTime(timeOut, timeIn);
  };

  var setNumberGuest = function () {
    var selectedValue = rooms.selectedIndex;
    var selectedArray = RoomsToGuests[selectedValue];

    Object.keys(capacity.options).forEach(function (index) {
      capacity.options[index].disabled = true;
    });

    for (var i = 0; i < selectedArray.length; i++) {
      capacity.options[selectedArray[i]].disabled = false;
    }
  };

  var validateGuests = function () {
    if (RoomsToGuests[rooms.selectedIndex].indexOf(capacity.selectedIndex) === -1) {
      capacity.valid = false;
      capacity.setCustomValidity('Выберите, пожалуйста, другой вариант количества гостей');
    } else {
      capacity.valid = true;
      capacity.setCustomValidity('');
    }
  };

  var onRoomChange = function () {
    setNumberGuest();
    validateGuests();
  };

  var onCapacityChange = function () {
    validateGuests();
  };

  var clearAll = function () {
    var pinsArray = dom.pins.querySelectorAll('.map__pin');
    dom.map.classList.add('map--faded');
    dom.form.classList.add('ad-form--disabled');

    window.card.remove();

    Object.keys(pinsArray).forEach(function (index) {
      if (!pinsArray[index].classList.contains('map__pin--main')) {
        pinsArray[index].remove();
      }
    });

    dom.form.classList.remove('ad-form--invalid');

    window.mainPin.moveToStart();
    dom.form.reset();
    dom.formFilters.reset();
    window.map.setActiveForm();
    removeFormEventListener();
    window.filter.removeListener();
    window.photoPreview.remove();
  };

  var onResetButtonClick = function (buttonClickEvt) {
    buttonClickEvt.preventDefault();
    clearAll();
  };

  var closePopup = function () {
    var successMessage = document.querySelector('.success');
    successMessage.classList.add('hidden');
  };

  var onPopupEscPress = function (keyboardEvt) {
    if (keyboardEvt.keyCode === ESC_KEYCODE) {
      closePopup();
      document.removeEventListener('keydown', onPopupEscPress);
    }
  };

  var onSuccess = function () {
    var successMessage = document.querySelector('.success');
    successMessage.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    clearAll();
  };

  var onSubmitButtonClick = function () {
    adForm.classList.add('ad-form--invalid');
  };

  var onFormSubmit = function (submitEvt) {
    submitEvt.preventDefault();
    window.backend.upload(new FormData(adForm), onSuccess, window.backend.onError);
  };

  var removeFormEventListener = function () {
    inputTitle.removeEventListener('invalid', onTitleInvalid);
    inputTitle.removeEventListener('input', onTitleInput);

    inputPrice.removeEventListener('invalid', onPriceInvalid);
    inputPrice.removeEventListener('input', onPriceInput);

    inputType.removeEventListener('change', onTypeChange);

    timeIn.removeEventListener('change', onTimeInChange);
    timeOut.removeEventListener('change', onTimeOutChange);

    rooms.removeEventListener('change', onRoomChange);
    capacity.removeEventListener('change', onCapacityChange);


    resetButton.removeEventListener('click', onResetButtonClick);
    submitButton.removeEventListener('click', onSubmitButtonClick);
    adForm.removeEventListener('submit', onFormSubmit);
  };

  var addFormEventListener = function () {
    inputTitle.addEventListener('invalid', onTitleInvalid);
    inputTitle.addEventListener('input', onTitleInput);

    inputPrice.addEventListener('invalid', onPriceInvalid);
    inputPrice.addEventListener('input', onPriceInput);

    inputType.addEventListener('change', onTypeChange);

    timeIn.addEventListener('change', onTimeInChange);
    timeOut.addEventListener('change', onTimeOutChange);

    rooms.addEventListener('change', onRoomChange);
    capacity.addEventListener('change', onCapacityChange);


    resetButton.addEventListener('click', onResetButtonClick);
    submitButton.addEventListener('click', onSubmitButtonClick);
    adForm.addEventListener('submit', onFormSubmit);
  };


  window.validateForm = function () {
    setNumberGuest();
    validateGuests();
    setMinimalPrice(inputType, inputPrice);
    addFormEventListener();
  };

})();
