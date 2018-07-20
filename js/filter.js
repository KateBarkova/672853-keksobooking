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

  var filterTypeHotels = function (array) {
    if (type.value !== 'any') {
      array = array.filter(function (element) {
        return element.offer.type === type.value;
      });
    }
    return array;
  };

  var filterPriceHotels = function (array) {
    if (price.value !== 'any') {
      array = array.filter(function (element) {
        return element.offer.price >= PriceDescription[price.value][0] && element.offer.price <= PriceDescription[price.value][1];
      });
    }
    return array;
  };

  var filterRoomsHotels = function (array) {
    if (rooms.value !== 'any') {
      array = array.filter(function (element) {
        return element.offer.rooms.toString() === rooms.value;
      });
    }
    return array;
  };

  var filterGuestsHotels = function (array) {
    if (guests.value !== 'any') {
      array = array.filter(function (element) {
        return element.offer.guests.toString() === guests.value;
      });
    }
    return array;
  };

  var filterFeaturesHotels = function (array) {
    var featuresChecked = filter.querySelectorAll('input[name=features]:checked');
    var featuresCheckedArray = Object.keys(featuresChecked).map(function (index) {
      return featuresChecked[index].value;
    });

    var sameFeaturesHotels = [];

    Object.keys(array).forEach(function (i) {
      var checkArray = [];
      Object.keys(featuresCheckedArray).forEach(function (j) {
        if (array[i].offer.features.indexOf(featuresCheckedArray[j]) !== -1) {
          checkArray.push(featuresCheckedArray[j]);
        }
      });

      if (checkArray.length === featuresCheckedArray.length) {
        sameFeaturesHotels.push(array[i]);
      }
    });

    return sameFeaturesHotels;
  };


  var updatePins = function () {
    var hotels = window.houseArray.slice();

    var sameTypeHotels = filterTypeHotels(hotels);
    var samePriceHotels = filterPriceHotels(sameTypeHotels);
    var sameRoomsHotels = filterRoomsHotels(samePriceHotels);
    var sameGuestsHotels = filterGuestsHotels(sameRoomsHotels);
    var sameFeaturesHotels = filterFeaturesHotels(sameGuestsHotels);

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
