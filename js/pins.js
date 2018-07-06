'use strict';

(function () {


  var URL = 'https://js.dump.academy/keksobooking/data';

  function onLoad(array) {
    var dom = window.dom.getElements();
    var pinList = dom.pins;
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(window.renderPin(array[i]));
    }

    pinList.appendChild(fragment);
  }

  window.renderPins = function () {
    window.backend.load(URL, onLoad, window.backend.onError);
  };

})();
