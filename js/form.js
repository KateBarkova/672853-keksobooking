'use strict';

(function () {

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

  var setMinimalPrice = function (element1, element2) {
    var selectedElement = element1.options[element1.selectedIndex].value;
    element2.placeholder = MIN_PRICE_HOUSE[selectedElement];
    element2.min = MIN_PRICE_HOUSE[selectedElement];
  };

  var setChangeTime = function (element1, element2) {
    var selectedElement = element1.options[element1.selectedIndex].value;
    element2.value = selectedElement;
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

  var clearAll = function () {
    var dom = window.dom.getElements();
    var pinArray = dom.pins.querySelectorAll('.map__pin');
    dom.map.classList.add('map--faded');
    dom.form.classList.add('ad-form--disabled');

    if (dom.popup) {
      dom.popup.remove();
    }

    Object.keys(pinArray).forEach(function (index) {
      if (!pinArray[index].classList.contains('map__pin--main')) {
        pinArray[index].remove();
      }
    });

    if (dom.form.classList.contains('ad-form--invalid')) {
      dom.form.classList.remove('ad-form--invalid');
    }
    window.mainPin.moveToStart();
    window.map.setActiveForm();
    dom.form.reset();
  };

  var closePopup = function () {
    var successElement = document.querySelector('.success');
    successElement.classList.add('hidden');
  };

  var onPopupEscPress = function (evt) {
    var ESC_KEYCODE = 27;
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
      document.removeEventListener('keydown', onPopupEscPress);
    }
  };

  var onSuccess = function () {
    var successElement = document.querySelector('.success');
    successElement.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    clearAll();
  };

  var validateForm = function () {
    var dom = window.dom.getElements();
    var form = dom.form;
    var inputTitle = form.querySelector('#title');
    var inputPrice = form.querySelector('#price');
    var inputType = form.querySelector('#type');
    var timeIn = form.querySelector('#timein');
    var timeOut = form.querySelector('#timeout');
    var room = form.querySelector('#room_number');
    var capacity = form.querySelector('#capacity');
    var resetButton = form.querySelector('.ad-form__reset');
    var submitButton = form.querySelector('.ad-form__submit');

    inputTitle.addEventListener('invalid', function () {
      validateFormTitle(inputTitle);
    });

    inputTitle.addEventListener('input', function () {
      validateFormTitle(inputTitle);
    });

    inputPrice.addEventListener('invalid', function () {
      validateFormPrice(inputPrice);
    });

    inputPrice.addEventListener('input', function () {
      validateFormPrice(inputPrice);
    });

    inputType.addEventListener('change', function () {
      setMinimalPrice(inputType, inputPrice);
    });

    timeIn.addEventListener('change', function () {
      setChangeTime(timeIn, timeOut);
    });

    timeOut.addEventListener('change', function () {
      setChangeTime(timeOut, timeIn);
    });

    setNumberGuest(room, capacity);
    validateGuests(room, capacity);

    room.addEventListener('change', function () {
      setNumberGuest(room, capacity);
      validateGuests(room, capacity);
    });

    capacity.addEventListener('change', function () {
      validateGuests(room, capacity);
    });

    resetButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      clearAll();
    });

    submitButton.addEventListener('click', function () {
      form.classList.add('ad-form--invalid');
    });

    function checkForm(evt) {
      evt.preventDefault();
      window.backend.upload(new FormData(form), onSuccess, window.backend.onError);
    }


    form.addEventListener('submit', checkForm);

  };

  validateForm();

})();
