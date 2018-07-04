'use strict';

(function () {

  var PIN_WIDTH = 50;
  var PIN_HEIGTH = 70;

  var getCoordinate = function (x, y) {
    return {
      x: Math.round(x - PIN_WIDTH / 2),
      y: Math.round(y - PIN_HEIGTH),
    };
  };

  window.pin = {

    render: function (pinItem) {
      var dom = window.dom.getElements();
      var template = dom.template.content;
      var pinTemplate = template.querySelector('.map__pin');

      var pin = pinTemplate.cloneNode(true);
      var coordinate = getCoordinate(pinItem.location.x, pinItem.location.y);

      pin.style.left = coordinate.x + 'px';
      pin.style.top = coordinate.y + 'px';
      pin.querySelector('img').src = pinItem.author.avatar;
      pin.querySelector('img').alt = pinItem.offer.description;

      pin.addEventListener('click', function () {
        window.card.render(pinItem);
      });

      return pin;
    }
  };

})();
