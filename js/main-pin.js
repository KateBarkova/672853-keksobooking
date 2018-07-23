'use strict';

(function () {

  var MIN_Y = 130;
  var MAX_Y = 630;

  var START_PIN_Y = 375;
  var START_PIN_X = 570;
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGTH = 87;

  var mainPinMap = window.map.mainPin;

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

  var movePin = function (mouseDownEvt) {
    var dom = window.dom.getElements();

    mouseDownEvt.preventDefault();

    var startCoords = {
      x: mouseDownEvt.clientX,
      y: mouseDownEvt.clientY
    };

    var onMouseMove = function (mouseMoveEvt) {
      mouseMoveEvt.preventDefault();

      var shift = {
        x: startCoords.x - mouseMoveEvt.clientX,
        y: startCoords.y - mouseMoveEvt.clientY
      };

      startCoords = {
        x: mouseMoveEvt.clientX,
        y: mouseMoveEvt.clientY
      };

      var endCoords = {
        x: mainPinMap.offsetLeft - shift.x,
        y: mainPinMap.offsetTop - shift.y
      };

      endCoords = checkPinPosition(endCoords.x, endCoords.y);

      mainPinMap.style.top = endCoords.y + 'px';
      mainPinMap.style.left = endCoords.x + 'px';
      dom.address.value = window.map.getAddress(MAIN_PIN_WIDTH, MAIN_PIN_HEIGTH);
    };

    var onMouseUp = function (mouseUpEvt) {
      mouseUpEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  window.mainPin = {

    moveToStart: function () {
      mainPinMap.style.top = START_PIN_Y + 'px';
      mainPinMap.style.left = START_PIN_X + 'px';
    },

    move: movePin
  };

})();
