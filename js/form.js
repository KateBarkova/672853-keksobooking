'use strict';

(function () {
  var ESC_KEYCODE = 27;

  var ROOMS_GUESTS = {
    0: [2],
    1: [1, 2],
    2: [0, 1, 2],
    3: [3]
  };

  var MIN_PRICE_HOUSE = {
    'bungalo': '0',
    'flat': '1000',
    'house': '5000',
    'palace': '10000'
  };

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

  var onTitleInvalid = function (inputTitle) {
    return function () {
      validateFormTitle(inputTitle);
    };
  };

  var onTitleInput = function (inputTitle) {
    return function () {
      validateFormTitle(inputTitle);
    };
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

  var onPriceInvalid = function (inputPrice) {
    return function () {
      validateFormPrice(inputPrice);
    };
  };

  var onPriceInput = function (inputPrice) {
    return function () {
      validateFormPrice(inputPrice);
    };
  };

  var setMinimalPrice = function (element1, element2) {
    var selectedElement = element1.options[element1.selectedIndex].value;
    element2.placeholder = MIN_PRICE_HOUSE[selectedElement];
    element2.min = MIN_PRICE_HOUSE[selectedElement];
  };

  var onTypeChange = function (inputType, inputPrice) {
    return function () {
      setMinimalPrice(inputType, inputPrice);
    };
  };

  var setChangeTime = function (element1, element2) {
    var selectedElement = element1.options[element1.selectedIndex].value;
    element2.value = selectedElement;
  };

  var onTimeChange = function (element1, element2) {
    return function () {
      setChangeTime(element1, element2);
    };
  };

  var setNumberGuest = function (rooms, guests) {
    var selectedValue = rooms.selectedIndex;
    var selectedArray = ROOMS_GUESTS[selectedValue];

    Object.keys(guests.options).forEach(function (index) {
      guests.options[index].disabled = true;
    });

    for (var i = 0; i < selectedArray.length; i++) {
      guests.options[selectedArray[i]].disabled = false;
    }
  };

  var validateGuests = function (rooms, guests) {
    if (ROOMS_GUESTS[rooms.selectedIndex].indexOf(guests.selectedIndex) === -1) {
      guests.valid = false;
      guests.setCustomValidity('Выберите, пожалуйста, другой вариант количества гостей');
    } else {
      guests.valid = true;
      guests.setCustomValidity('');
    }
  };

  var onRoomChange = function (rooms, capacity) {
    return function () {
      setNumberGuest(rooms, capacity);
      validateGuests(rooms, capacity);
    };
  };

  var onCapacityChange = function (rooms, capacity) {
    return function () {
      validateGuests(rooms, capacity);
    };
  };

  var clearAll = function () {
    var dom = window.dom.getElements();
    var pinsArray = dom.pins.querySelectorAll('.map__pin');
    dom.map.classList.add('map--faded');
    dom.form.classList.add('ad-form--disabled');

    window.card.remove();

    Object.keys(pinsArray).forEach(function (index) {
      if (!pinsArray[index].classList.contains('map__pin--main')) {
        pinsArray[index].remove();
      }
    });

    if (dom.form.classList.contains('ad-form--invalid')) {
      dom.form.classList.remove('ad-form--invalid');
    }
    window.mainPin.moveToStart();
    window.map.setActiveForm();
    dom.form.reset();
    dom.formFilters.reset();
  };

  var onResetButtonClick = function (evt) {
    evt.preventDefault();
    clearAll();
  };

  var closePopup = function () {
    var successMessage = document.querySelector('.success');
    successMessage.classList.add('hidden');
  };

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
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

  var validateForm = function () {
    var dom = window.dom.getElements();
    var adForm = dom.form;
    var form = window.dom.getFormElements(adForm);
    var inputTitle = form.inputTitle;
    var inputPrice = form.inputPrice;
    var inputType = form.inputType;
    var timeIn = form.timeIn;
    var timeOut = form.timeOut;
    var room = form.room;
    var capacity = form.capacity;
    var resetButton = form.resetButton;
    var submitButton = form.submitButton;

    function onSubmitButtonClik() {
      adForm.classList.add('ad-form--invalid');
    }


    function onFormSubmit(evt) {
      evt.preventDefault();
      window.backend.upload(new FormData(adForm), onSuccess, window.backend.onError);
    }

    setNumberGuest(room, capacity);
    validateGuests(room, capacity);

    inputTitle.addEventListener('invalid', onTitleInvalid(inputTitle));
    inputTitle.addEventListener('input', onTitleInput(inputTitle));

    inputPrice.addEventListener('invalid', onPriceInvalid(inputPrice));
    inputPrice.addEventListener('input', onPriceInput(inputPrice));

    inputType.addEventListener('change', onTypeChange(inputType, inputPrice));

    timeIn.addEventListener('change', onTimeChange(timeIn, timeOut));
    timeOut.addEventListener('change', onTimeChange(timeOut, timeIn));

    room.addEventListener('change', onRoomChange(room, capacity));
    capacity.addEventListener('change', onCapacityChange(room, capacity));


    resetButton.addEventListener('click', onResetButtonClick);

    submitButton.addEventListener('click', onSubmitButtonClik);

    adForm.addEventListener('submit', onFormSubmit);

  };

  validateForm();

})();
