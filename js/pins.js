'use strict';

(function () {

  window.pins = {

    renderMapPins: function (array) {
      var dom = window.dom.getDomElements();
      var pinList = dom.pins;
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < array.length; i++) {
        fragment.appendChild(window.pin.renderMapPin(array[i]));
      }

      pinList.appendChild(fragment);
    },

  };

})();
