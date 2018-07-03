'use strict';

(function () {

  window.pins = {

    render: function (array) {
      var dom = window.dom.getElements();
      var pinList = dom.pins;
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < array.length; i++) {
        fragment.appendChild(window.pin.render(array[i]));
      }

      pinList.appendChild(fragment);
    },

  };

})();
