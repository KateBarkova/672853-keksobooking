'use strict';

(function () {

  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGTH = 87;

  var changeStateFieldset = function (fieldset, state) {
    Object.keys(fieldset).forEach(function (index) {
      fieldset[index].disabled = state;
    });
  };

  var getAddress = function (widthPin, heightPin) {
    var mainMapPin = document.querySelector('.map__pin--main');
    var positionX = Math.round(mainMapPin.offsetLeft + widthPin / 2);
    var positionY = Math.round(mainMapPin.offsetTop + heightPin);
    return positionX + ', ' + positionY;
  };

  var setActiveForm = function () {
    var dom = window.dom.getElements();
    changeStateFieldset(dom.fieldsets, true);
    dom.address.value = getAddress(MAIN_PIN_WIDTH, MAIN_PIN_WIDTH / 2);
  };

  var getActiveState = function () {
    var dom = window.dom.getElements();

    if (dom.map.classList.contains('map--faded')) {
      dom.map.classList.remove('map--faded');
      dom.form.classList.remove('ad-form--disabled');
      dom.address.value = getAddress(MAIN_PIN_WIDTH, MAIN_PIN_HEIGTH);
      changeStateFieldset(dom.fieldsets, false);
      window.renderPins();
    }
  };

  var onMainPinMouseDown = function (evt) {
    window.mainPin.move(evt);
    getActiveState();
  };

  var render = function () {
    var mainPin = document.querySelector('.map__pin--main');

    setActiveForm();

    mainPin.addEventListener('mousedown', onMainPinMouseDown);
  };

  render();

  window.map = {
    setActiveForm: setActiveForm,
    getAddress: getAddress
  };

})();
