'use strict';

(function () {

  var MIN_Y = 130;
  var MAX_Y = 630;

  var START_PIN_Y = 375;
  var START_PIN_X = 570;
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGTH = 87;

  // Движение пина

  var checkPinPosition = function (coordinateX, coordinateY) {
    var dom = window.dom.getElements();
    var minTop = MIN_Y - MAIN_PIN_HEIGTH;
    var maxTop = MAX_Y - MAIN_PIN_HEIGTH;
    var minLeft = 0;
    var maxLeft = dom.map.offsetWidth - MAIN_PIN_WIDTH;

    if (coordinateX > maxLeft) {
      coordinateX = maxLeft;
    } else if (coordinateX < minLeft) {
      coordinateX = minLeft;
    }

    if (coordinateY > maxTop) {
      coordinateY = maxTop;
    } else if (coordinateY < minTop) {
      coordinateY = minTop;
    }

    return {x: coordinateX, y: coordinateY};
  };

  var movePin = function (event1) {
    var dom = window.dom.getElements();
    var mainPin = dom.pins.querySelector('.map__pin--main');

    event1.preventDefault();

    var startCoords = {
      x: event1.clientX,
      y: event1.clientY
    };

    var onMouseMove = function (event2) {
      event2.preventDefault();

      var shift = {
        x: startCoords.x - event2.clientX,
        y: startCoords.y - event2.clientY
      };

      startCoords = {
        x: event2.clientX,
        y: event2.clientY
      };

      var endCoords = {
        x: mainPin.offsetLeft - shift.x,
        y: mainPin.offsetTop - shift.y
      };

      endCoords = checkPinPosition(endCoords.x, endCoords.y);

      mainPin.style.top = endCoords.y + 'px';
      mainPin.style.left = endCoords.x + 'px';
      dom.address.value = window.map.getAddress(MAIN_PIN_WIDTH, MAIN_PIN_HEIGTH);
    };

    var onMouseUp = function (event3) {
      event3.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  window.mainPin = {

    moveToStart: function () {
      var mainPin = document.querySelector('.map__pin--main');
      mainPin.style.top = START_PIN_Y + 'px';
      mainPin.style.left = START_PIN_X + 'px';
    },

    move: movePin
  };

})();
