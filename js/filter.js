'use strict';

(function () {

  var priceDescription = {
    low: [0, 9999],
    middle: [10000, 50000],
    high: [50001, 1000000000]
  };

  var type = document.querySelector('#housing-type');
  var price = document.querySelector('#housing-price');
  var rooms = document.querySelector('#housing-rooms');
  var guests = document.querySelector('#housing-guests');

  var updatePins = function () {
    var array = window.houseArray;

    if (type.value === 'any') {
      var sameTypeHotels = array;
    } else {
      sameTypeHotels = array.filter(function (it) {
        return it.offer.type === type.value;
      });
    }

    if (price.value === 'any') {
      var samePriceHotels = sameTypeHotels;
    } else {
      samePriceHotels = sameTypeHotels.filter(function (it) {
        return it.offer.price >= priceDescription[price.value][0] && it.offer.price <= priceDescription[price.value][1];
      });
    }

    if (rooms.value === 'any') {
      var sameRoomsHotels = samePriceHotels;
    } else {
      sameRoomsHotels = samePriceHotels.filter(function (it) {
        return it.offer.rooms.toString() === rooms.value;
      });
    }

    if (guests.value === 'any') {
      var sameGuestsHotels = sameRoomsHotels;
    } else {
      sameGuestsHotels = sameRoomsHotels.filter(function (it) {
        return it.offer.guests === guests.value;
      });
    }

    window.pins.remove();
    window.card.remove();
    window.pins.render(sameGuestsHotels);
  };

  var onTypeChange = window.debounce(function () {
    updatePins();
  });

  var onPriceChange = window.debounce(function () {
    updatePins();
  });

  var onRoomsChange = window.debounce(function () {
    updatePins();
  });

  var onGuestsChange = window.debounce(function () {
    updatePins();
  });

  window.listenFilterChange = function () {
    type.addEventListener('change', onTypeChange);
    price.addEventListener('change', onPriceChange);
    rooms.addEventListener('change', onRoomsChange);
    guests.addEventListener('change', onGuestsChange);
  };

})();
