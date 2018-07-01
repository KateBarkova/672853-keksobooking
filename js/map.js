'use strict';

window.map = (function () {

  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGTH = 87;
  var OBJECT_NUMBER = 8;

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
    var dom = window.dom.getDomElements();
    changeStateFieldset(dom.fieldsets, true);
    dom.address.value = getAddress(MAIN_PIN_WIDTH, MAIN_PIN_WIDTH / 2);
  };

  var getActiveState = function () {
    var dom = window.dom.getDomElements();

    if (dom.map.classList.contains('map--faded')) {
      dom.map.classList.remove('map--faded');
      dom.form.classList.remove('ad-form--disabled');
      dom.address.value = getAddress(MAIN_PIN_WIDTH, MAIN_PIN_HEIGTH);
      changeStateFieldset(dom.fieldsets, false);

      var mapPinsArray = window.data.getMapPinsArray(OBJECT_NUMBER);
      window.pin.renderMapPins(mapPinsArray);
    }
  };

  var render = function () {
    var mainMapPin = document.querySelector('.map__pin--main');

    setActiveForm();

    mainMapPin.addEventListener('mousedown', function (evt) {
      window.pin.movePin(evt);
      getActiveState();
    });
  };

  render();

  return {
    setActiveForm: setActiveForm,
    getAddress: getAddress
  };

})();
