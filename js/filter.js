'use strict';

(function () {

  var PriceDescription = {
    low: [0, 9999],
    middle: [10000, 50000],
    high: [50001, 1000000000]
  };

  var filter = document.querySelector('.map__filters');
  var type = filter.querySelector('#housing-type');
  var price = filter.querySelector('#housing-price');
  var rooms = filter.querySelector('#housing-rooms');
  var guests = filter.querySelector('#housing-guests');
  var features = filter.querySelectorAll('input[name=features]');


  var updatePins = function () {
    var array = window.houseArray;
    var sameTypeHotels = array.slice();

    if (type.value !== 'any') {
      sameTypeHotels = sameTypeHotels.filter(function (element) {
        return element.offer.type === type.value;
      });
    }

    var samePriceHotels = sameTypeHotels;
    if (price.value !== 'any') {
      samePriceHotels = sameTypeHotels.filter(function (element) {
        return element.offer.price >= PriceDescription[price.value][0] && element.offer.price <= PriceDescription[price.value][1];
      });
    }

    var sameRoomsHotels = samePriceHotels;
    if (rooms.value !== 'any') {
      sameRoomsHotels = samePriceHotels.filter(function (element) {
        return element.offer.rooms.toString() === rooms.value;
      });
    }

    var sameGuestsHotels = sameRoomsHotels;
    if (guests.value !== 'any') {
      sameGuestsHotels = sameRoomsHotels.filter(function (element) {
        return element.offer.guests.toString() === guests.value;
      });
    }

    var featuresChecked = filter.querySelectorAll('input[name=features]:checked');
    var featuresCheckedArray = Object.keys(featuresChecked).map(function (index) {
      return featuresChecked[index].value;
    });

    var sameFeaturesHotels = [];

    Object.keys(sameGuestsHotels).forEach(function (i) {
      var checkArray = [];
      Object.keys(featuresCheckedArray).forEach(function (j) {
        if (sameGuestsHotels[i].offer.features.indexOf(featuresCheckedArray[j]) !== -1) {
          checkArray.push(featuresCheckedArray[j]);
        }
      });

      if (checkArray.length === featuresCheckedArray.length) {
        sameFeaturesHotels.push(sameGuestsHotels[i]);
      }
    });

    window.pins.remove();
    window.card.remove();
    window.pins.render(sameFeaturesHotels);
  };

  var onFilterChange = window.debounce(updatePins);

  window.filter = {
    listenChange: function () {
      type.addEventListener('change', onFilterChange);
      price.addEventListener('change', onFilterChange);
      rooms.addEventListener('change', onFilterChange);
      guests.addEventListener('change', onFilterChange);
      guests.addEventListener('change', onFilterChange);
      Object.keys(features).forEach(function (index) {
        features[index].addEventListener('change', onFilterChange);
      });
    },

    removeListener: function () {
      type.removeEventListener('change', onFilterChange);
      price.removeEventListener('change', onFilterChange);
      rooms.removeEventListener('change', onFilterChange);
      guests.removeEventListener('change', onFilterChange);
      guests.removeEventListener('change', onFilterChange);
      Object.keys(features).forEach(function (index) {
        features[index].removeEventListener('change', onFilterChange);
      });
    }
  };

})();
