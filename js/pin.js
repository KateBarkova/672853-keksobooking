'use strict';

(function () {

  var MIN_Y = 130;
  var MAX_Y = 630;

  var PIN_WIDTH = 50;
  var PIN_HEIGTH = 70;


  var START_PIN_Y = 375;
  var START_PIN_X = 570;
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGTH = 87;


  var getCoordinate = function (x, y) {
    return {
      x: Math.round(x - PIN_WIDTH / 2),
      y: Math.round(y - PIN_HEIGTH),
    };
  };

  var renderMapPin = function (pinItem) {
    var dom = window.dom.getDomElements();
    var elementTemplate = dom.template.content;
    var pinTemplate = elementTemplate.querySelector('.map__pin');

    var pinElement = pinTemplate.cloneNode(true);
    var coordinate = getCoordinate(pinItem.location.x, pinItem.location.y);

    pinElement.style.left = coordinate.x + 'px';
    pinElement.style.top = coordinate.y + 'px';
    pinElement.querySelector('img').src = pinItem.author.avatar;
    pinElement.querySelector('img').alt = pinItem.offer.description;

    pinElement.addEventListener('click', function () {
      window.card.renderCard(pinItem);
    });

    return pinElement;
  };

  // Движение пина

  var checkPinPosition = function (coordinateX, coordinateY) {
    var dom = window.dom.getDomElements();
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

  var movePin = function (evt) {
    var dom = window.dom.getDomElements();
    var mainPin = dom.pins.querySelector('.map__pin--main');

    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {

      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
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

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  window.pin = {

    movePinToStart: function () {
      var mainPin = document.querySelector('.map__pin--main');
      mainPin.style.top = START_PIN_Y + 'px';
      mainPin.style.left = START_PIN_X + 'px';
    },

    renderMapPins: function (array) {
      var dom = window.dom.getDomElements();
      var pinList = dom.pins;
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < array.length; i++) {
        fragment.appendChild(renderMapPin(array[i]));
      }

      pinList.appendChild(fragment);
    },

    movePin: movePin
  };

})();
