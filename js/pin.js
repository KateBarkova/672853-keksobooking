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
      var elementTemplate = dom.template.content;
      var pinTemplate = elementTemplate.querySelector('.map__pin');

      var pinElement = pinTemplate.cloneNode(true);
      var coordinate = getCoordinate(pinItem.location.x, pinItem.location.y);

      pinElement.style.left = coordinate.x + 'px';
      pinElement.style.top = coordinate.y + 'px';
      pinElement.querySelector('img').src = pinItem.author.avatar;
      pinElement.querySelector('img').alt = pinItem.offer.description;

      pinElement.addEventListener('click', function () {
        window.card.render(pinItem);
      });

      return pinElement;
    }
  };

})();
