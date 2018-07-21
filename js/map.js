'use strict';

(function () {

  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGTH = 87;
  var ENTER_KEYCODE = 13;

  var mainPin = document.querySelector('.map__pin--main');

  var changeStateFieldset = function (fieldset, state) {
    Object.keys(fieldset).forEach(function (index) {
      fieldset[index].disabled = state;
    });
  };

  var getAddress = function (widthPin, heightPin) {
    var positionX = Math.round(mainPin.offsetLeft + widthPin / 2);
    var positionY = Math.round(mainPin.offsetTop + heightPin);
    return positionX + ', ' + positionY;
  };

  var setActiveForm = function () {
    var dom = window.dom.getElements();
    changeStateFieldset(dom.fieldsets, true);
    dom.address.value = getAddress(MAIN_PIN_WIDTH, MAIN_PIN_WIDTH / 2);
  };

  var onLoad = function (array) {
    window.houseArray = array.slice();
    window.pins.render(array);
  };

  var getActiveState = function () {
    var dom = window.dom.getElements();

    if (dom.map.classList.contains('map--faded')) {
      dom.map.classList.remove('map--faded');
      dom.form.classList.remove('ad-form--disabled');
      window.validateForm();
      dom.address.value = getAddress(MAIN_PIN_WIDTH, MAIN_PIN_HEIGTH);
      changeStateFieldset(dom.fieldsets, false);
      window.backend.load(onLoad, window.backend.onError);
      window.filter.listenChange();
      window.photoPreview.add();
    }
  };

  var onMainPinEnterPress = function (keyboardEvt) {
    if (keyboardEvt.keyCode === ENTER_KEYCODE) {
      getActiveState();
    }
  };

  var onMainPinMouseDown = function (mouseDownEvt) {
    window.mainPin.move(mouseDownEvt);
    getActiveState();
  };

  var render = function () {
    setActiveForm();
    mainPin.addEventListener('mousedown', onMainPinMouseDown);
    mainPin.addEventListener('keydown', onMainPinEnterPress);
  };

  render();

  window.map = {
    setActiveForm: setActiveForm,
    getAddress: getAddress
  };

})();
