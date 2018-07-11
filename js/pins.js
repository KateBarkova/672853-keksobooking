'use strict';

(function () {

  var OBJECT_NUMBER = 5;

  window.pins = {
    remove: function () {
      var dom = window.dom.getElements();
      var pinsArray = dom.pins.querySelectorAll('.map__pin');

      Object.keys(pinsArray).forEach(function (index) {
        if (!pinsArray[index].classList.contains('map__pin--main')) {
          pinsArray[index].remove();
        }
      });
    },

    render: function (array) {
      if (array.length > OBJECT_NUMBER) {
        var arrayLength = OBJECT_NUMBER;
      } else {
        arrayLength = array.length;
      }

      var dom = window.dom.getElements();
      var pinList = dom.pins;
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < arrayLength; i++) {
        fragment.appendChild(window.renderPin(array[i]));
      }

      pinList.appendChild(fragment);
    }
  };

})();
