'use strict';

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

var PIN_WIDTH = 50;
var PIN_HEIGTH = 70;
var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGTH = 87;

var shuffledOfferTitles = shuffleArray(OFFER_TITLE);

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * ((max + 1) - min)) + min;
};

function shuffleArrayCondition() {
  return Math.random() - 0.5;
}

function shuffleArray(array) {
  return array.sort(shuffleArrayCondition);
}

var getRandomArray = function (length, min, max) {
  var array = [];
  while (array.length < length) {
    var randomNumber = getRandomNumber(min, max);
    if (array.indexOf(randomNumber) === -1) {
      array.push(randomNumber);
    }
  }
  return array;
};

var getRandomElement = function (array) {
  var randomElement = Math.floor(Math.random() * array.length);
  return randomElement;
};

var featuresArrayOriginal = FEATURES.slice();

var getRandomFeatures = function (featuresArray) {
  var shuffleFeaturesArray = shuffleArray(featuresArray);
  var featuresLength = getRandomNumber(1, featuresArray.length);
  var features = [];
  for (var i = 0; i < featuresLength; i++) {
    features.push(shuffleFeaturesArray[i]);
  }

  var sortfeatures = [];
  for (i = 0; i < featuresArrayOriginal.length; i++) {
    if (features.some(function (element) {
      return element === featuresArrayOriginal[i];
    })) {
      sortfeatures.push(featuresArrayOriginal[i]);
    }
  }
  return sortfeatures;
};

var getMapPin = function (numberHouse) {
  var locationX = getRandomNumber(MIN_X, MAX_X);
  var locationY = getRandomNumber(MIN_Y, MAX_Y);

  return {
    author: {
      avatar: 'img/avatars/user0' + numberHouse + '.png'
    },

    offer: {
      title: shuffledOfferTitles[numberHouse - 1],
      address: locationX + ', ' + locationY,
      price: getRandomNumber(MIN_PRICE, MAX_PRICE),
      type: TYPE[getRandomElement(TYPE)],
      rooms: getRandomNumber(MIN_ROOMS, MAX_ROOMS),
      guests: getRandomNumber(MIN_GUESTS, MAX_GUESTS),
      checkin: CHECK_TIME[getRandomElement(CHECK_TIME)],
      checkout: CHECK_TIME[getRandomElement(CHECK_TIME)],
      features: getRandomFeatures(FEATURES),
      description: '',
      photos: shuffleArray(PHOTOS)
    },

    location: {
      x: locationX,
      y: locationY
    }
  };
};

var getMapPinsArray = function (numberPins) {
  var randomArray = getRandomArray(numberPins, 1, numberPins);
  var mapPinsArray = [];
  for (var i = 0; i < OBJECT_NUMBER; i++) {
    var pin = getMapPin(randomArray[i]);
    mapPinsArray.push(pin);
  }
  return mapPinsArray;
};

function getDomElements() {
  return {
    map: document.querySelector('.map'),
    pins: document.querySelector('.map__pins'),
    template: document.querySelector('template'),
    mapFilters: document.querySelector('.map__filters-container')
  };
}

var getCoordinate = function (x, y) {
  return {
    x: Math.round(x - PIN_WIDTH / 2),
    y: Math.round(y - PIN_HEIGTH),
  };
};

var renderMapPin = function (pinItem) {
  var dom = getDomElements();
  var elementTemplate = dom.template.content;
  var pinTemplate = elementTemplate.querySelector('.map__pin');

  var pinElement = pinTemplate.cloneNode(true);
  var coordinate = getCoordinate(pinItem.location.x, pinItem.location.y);

  pinElement.style.left = coordinate.x + 'px';
  pinElement.style.top = coordinate.y + 'px';
  pinElement.querySelector('img').src = pinItem.author.avatar;
  pinElement.querySelector('img').alt = pinItem.offer.description;

  pinElement.addEventListener('click', function () {
    renderCard(pinItem);
  });

  return pinElement;
};

var renderMapPins = function (array) {
  var dom = getDomElements();
  var pinList = dom.pins;
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(renderMapPin(array[i]));
  }

  pinList.appendChild(fragment);
};

var typeArray = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'
};

var renderFeatures = function (features) {
  var featureFragment = document.createDocumentFragment();
  for (var i = 0; i < features.length; i++) {
    var featureItem = document.createElement('li');
    featureItem.classList.add('popup__feature');
    featureItem.classList.add('popup__feature--' + features[i]);
    featureFragment.appendChild(featureItem);
  }
  return featureFragment;
};

var renderPhotos = function (photos) {
  var photosFragment = document.createDocumentFragment();
  var photoarray = shuffleArray(photos);

  for (var i = 0; i < photos.length; i++) {
    var photoItem = document.createElement('img');
    photoItem.classList.add('popup__photo');
    photoItem.src = photoarray[i];
    photoItem.style.width = '45px';
    photoItem.style.height = '40px';
    photoItem.alt = 'Фото жилья';
    photosFragment.appendChild(photoItem);
  }
  return photosFragment;
};

function getTemplatesElement(parent) {
  return {
    mapCard: parent.querySelector('.map__card'),
    title: parent.querySelector('.popup__title'),
    address: parent.querySelector('.popup__text--address'),
    price: parent.querySelector('.popup__text--price'),
    typeHouse: parent.querySelector('.popup__type'),
    features: parent.querySelector('.popup__features'),
    popupPhotos: parent.querySelector('.popup__photos'),
    popupAvatar: parent.querySelector('.popup__avatar'),
    capacity: parent.querySelector('.popup__text--capacity'),
    time: parent.querySelector('.popup__text--time'),
    description: parent.querySelector('.popup__description'),
    closeButton: parent.querySelector('.popup__close'),
  };
}

var removeCard = function () {
  var card = map.querySelector('.map__card');
  if (card) {
    card.remove();
  }
};

var renderCard = function (element) {
  removeCard();

  var dom = getDomElements();
  var elementTemplate = dom.template.content;
  var cardTemplate = elementTemplate.querySelector('.map__card');

  var card = cardTemplate.cloneNode(true);
  var cardTemplatesElement = getTemplatesElement(card);

  var checkTime = 'Заезд после ' + element.offer.checkin + ', выезд до ' + element.offer.checkout;
  var capacity = element.offer.rooms + ' комнаты для ' + element.offer.guests + ' гостей';

  cardTemplatesElement.popupAvatar.src = element.author.avatar;
  cardTemplatesElement.title.textContent = element.offer.title;
  cardTemplatesElement.price.textContent = element.offer.price + '₽/ночь';
  cardTemplatesElement.typeHouse.textContent = typeArray[element.offer.type];
  cardTemplatesElement.capacity.textContent = capacity;
  cardTemplatesElement.time.textContent = checkTime;
  cardTemplatesElement.features.textContent = '';
  cardTemplatesElement.features.appendChild(renderFeatures(element.offer.features));
  cardTemplatesElement.popupPhotos.textContent = '';
  cardTemplatesElement.popupPhotos.appendChild(renderPhotos(element.offer.photos));
  cardTemplatesElement.address.textContent = element.offer.address;
  cardTemplatesElement.description.textContent = element.offer.description;

  var cardFragment = document.createDocumentFragment();
  cardFragment.appendChild(card);
  dom.map.insertBefore(cardFragment, dom.mapFilters);

  cardTemplatesElement.closeButton.addEventListener('click', function () {
    card.remove();
  });
};

// 1. Активация страницы

var mainMapPin = document.querySelector('.map__pin--main');
var map = document.querySelector('.map');
var form = document.querySelector('.ad-form');
var address = document.querySelector('#address');
var fieldsets = document.querySelectorAll('fieldset');

var changeStateFieldset = function (fieldset, state) {
  Object.keys(fieldset).forEach(function (index) {
    fieldset[index].disabled = state;
  });
};

var getBeginAddress = function (widthPin, heightPin) {
  var positionX = Math.round(mainMapPin.offsetLeft + widthPin / 2);
  var positionY = Math.round(mainMapPin.offsetTop + heightPin / 2);
  return positionX + ', ' + positionY;
};

var setActiveForm = function () {
  changeStateFieldset(fieldsets, true);
  address.value = getBeginAddress(MAIN_PIN_WIDTH, MAIN_PIN_WIDTH);
};

var getAddress = function (widthPin, heightPin) {
  var positionX = Math.round(mainMapPin.offsetLeft + widthPin / 2);
  var positionY = Math.round(mainMapPin.offsetTop + heightPin);
  return positionX + ', ' + positionY;
};

var getActiveState = function () {
  if (map.classList.contains('map--faded')) {
    map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
    address.value = getAddress(MAIN_PIN_WIDTH, MAIN_PIN_HEIGTH);
    changeStateFieldset(fieldsets, false);
    var mapPinsArray = getMapPinsArray(OBJECT_NUMBER);
    renderMapPins(mapPinsArray);
  }
};

var render = function () {
  setActiveForm();

  mainMapPin.addEventListener('mouseup', function () {
    getActiveState();
  });
};

render();
