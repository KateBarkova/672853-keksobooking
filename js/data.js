'use strict';

window.data = (function () {

  var OFFER_TITLE = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец', 'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];

  var TYPE = [
    'palace',
    'flat',
    'house',
    'bungalo'
  ];

  var CHECK_TIME = [
    '12:00',
    '13:00',
    '14:00'
  ];

  var FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];

  var PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  var OBJECT_NUMBER = 8;

  var MIN_PRICE = 1000;
  var MAX_PRICE = 1000000;

  var MIN_ROOMS = 1;
  var MAX_ROOMS = 5;

  var MIN_GUESTS = 1;
  var MAX_GUESTS = 10;

  var MIN_X = 300;
  var MAX_X = 900;

  var MIN_Y = 130;
  var MAX_Y = 630;

  var shuffledOfferTitles = window.utils.shuffleArray(OFFER_TITLE);
  var featuresArrayOriginal = FEATURES.slice();

  var getRandomFeatures = function (featuresArray) {
    var shuffleFeaturesArray = window.utils.shuffleArray(featuresArray);
    var featuresLength = window.utils.getRandomNumber(1, featuresArray.length);
    var features = [];
    for (var i = 0; i < featuresLength; i++) {
      features.push(shuffleFeaturesArray[i]);
    }

    var sortfeatures = [];
    for (var j = 0; j < featuresArrayOriginal.length; j++) {
      if (features.some(function (element) {
        return element === featuresArrayOriginal[j];
      })) {
        sortfeatures.push(featuresArrayOriginal[j]);
      }
    }
    return sortfeatures;
  };

  var getMapPin = function (numberHouse) {
    var locationX = window.utils.getRandomNumber(MIN_X, MAX_X);
    var locationY = window.utils.getRandomNumber(MIN_Y, MAX_Y);

    return {
      author: {
        avatar: 'img/avatars/user0' + numberHouse + '.png'
      },

      offer: {
        title: shuffledOfferTitles[numberHouse - 1],
        address: locationX + ', ' + locationY,
        price: window.utils.getRandomNumber(MIN_PRICE, MAX_PRICE),
        type: TYPE[window.utils.getRandomElement(TYPE)],
        rooms: window.utils.getRandomNumber(MIN_ROOMS, MAX_ROOMS),
        guests: window.utils.getRandomNumber(MIN_GUESTS, MAX_GUESTS),
        checkin: CHECK_TIME[window.utils.getRandomElement(CHECK_TIME)],
        checkout: CHECK_TIME[window.utils.getRandomElement(CHECK_TIME)],
        features: getRandomFeatures(FEATURES),
        description: '',
        photos: window.utils.shuffleArray(PHOTOS.slice())
      },

      location: {
        x: locationX,
        y: locationY
      }
    };
  };

  return {
    getMapPinsArray: function (numberPins) {
      var randomArray = window.utils.getRandomArray(numberPins, 1, numberPins);
      var mapPinsArray = [];
      for (var i = 0; i < OBJECT_NUMBER; i++) {
        var pin = getMapPin(randomArray[i]);
        mapPinsArray.push(pin);
      }
      return mapPinsArray;
    }
  };

})();
