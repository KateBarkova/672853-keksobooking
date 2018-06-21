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

var PIN_WIDTH = 40;
var PIN_HEIGTH = 40;

var getRandomNumber = function (min, max) {
  var randNumber = Math.floor(Math.random() * (max - min) + min);
  return randNumber;
};

var getRandomArr = function (length, min, max) {
  var arr = [];
  while (arr.length < length) {
    var randomNumber = getRandomNumber(min, max);
    if (arr.indexOf(randomNumber) === -1) {
      arr.push(randomNumber);
    }
  }
  return arr;
};

var getRandomElement = function (array) {
  var randomElement = Math.floor(Math.random() * array.length);
  return randomElement;
};

var getRandomFeatures = function (featuresArray) {
  var featuresLength = getRandomNumber(1, featuresArray.length);
  var features = [];
  for (var i = 0; i <= featuresLength; i++) {
    features.push(featuresArray[i]);
  }
  return features;
};

var similarAd = [];
var objectItem = {};

var avatarRandomArray = getRandomArr(OBJECT_NUMBER, 1, 9);

var randomArrayForTitle = getRandomArr(OBJECT_NUMBER, 0, 8);
var titleRandomArray = [];
for (var i = 0; i < OBJECT_NUMBER; i++) {
  titleRandomArray[i] = OFFER_TITLE[randomArrayForTitle[i]];
}


for (i = 0; i < OBJECT_NUMBER; i++) {
  var locationX = getRandomNumber(MIN_X, MAX_X);
  var locationY = getRandomNumber(MIN_Y, MAX_Y);

  var randomArrayForPhoto = getRandomArr(3, 0, 3);

  var photoRandomArray = [];
  for (var j = 0; j < 3; j++) {
    photoRandomArray[j] = PHOTOS[randomArrayForPhoto[j]];
  }

  objectItem = {
    'author': {
      'avatar': 'img/avatars/user0' + avatarRandomArray[i] + '.png'
    },

    'offer': {
      'title': titleRandomArray[i],
      'address': locationX + ', ' + locationY,
      'price': getRandomNumber(MIN_PRICE, MAX_PRICE),
      'type': TYPE[getRandomElement(TYPE)],
      'rooms': getRandomNumber(MIN_ROOMS, MAX_ROOMS),
      'guests': getRandomNumber(MIN_GUESTS, MAX_GUESTS),
      'checkin': CHECK_TIME[getRandomElement(CHECK_TIME)],
      'checkout': CHECK_TIME[getRandomElement(CHECK_TIME)],
      'features': getRandomFeatures(FEATURES),
      'description': '',
      'photos': photoRandomArray
    },

    'location': {
      'x': locationX,
      'y': locationY
    },
  };

  similarAd.push(objectItem);
}

var blockMap = document.querySelector('.map');
blockMap.classList.remove('map--faded');

var similarListElement = blockMap.querySelector('.map__pins');
var similarElementTemplate = document.querySelector('template')
.content
.querySelector('.map__pin');


var renderMapPin = function (adItem) {
  var similarElement = similarElementTemplate.cloneNode(true);

  similarElement.style.left = adItem.location.x - PIN_WIDTH / 2 + 'px';
  similarElement.style.top = adItem.location.y - PIN_HEIGTH + 'px';
  similarElement.querySelector('img').src = adItem.author.avatar;
  similarElement.querySelector('img').alt = adItem.offer.description;

  return similarElement;
};

var fragment = document.createDocumentFragment();

for (i = 0; i < similarAd.length; i++) {
  fragment.appendChild(renderMapPin(similarAd[i]));
}

similarListElement.appendChild(fragment);

var typeArray = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'
};

var renderFeatures = function (features) {
  var featureFragment = document.createDocumentFragment();
  for (i = 0; i < features.length; i++) {
    var featureItem = document.createElement('li');
    featureItem.classList.add('popup__feature');
    featureItem.classList.add('popup__feature--' + features[i]);
    featureFragment.appendChild(featureItem);
  }
  return featureFragment;
};

var renderPhotos = function (photos) {
  var photosFragment = document.createDocumentFragment();
  for (i = 0; i < photos.length; i++) {
    var photoItem = document.createElement('img');
    photoItem.classList.add('popup__photo');
    photoItem.src = photos[i];
    photoItem.style.width = '45px';
    photoItem.style.height = '40px';
    photoItem.alt = 'Фото жилья';
    photosFragment.appendChild(photoItem);
  }
  return photosFragment;
};

var renderCard = function (element) {
  var cardTemplate = document.querySelector('template')
  .content.
  querySelector('.map__card');

  var PopupElement = cardTemplate.cloneNode(true);

  PopupElement.querySelector('.popup__avatar').src = element.author.avatar;
  PopupElement.querySelector('.popup__title').textContent = element.offer.title;
  PopupElement.querySelector('.popup__text--price').textContent = element.offer.price + '₽/ночь';
  PopupElement.querySelector('.popup__type').textContent = typeArray[element.offer.type];
  PopupElement.querySelector('.popup__text--capacity').textContent = element.offer.rooms + ' комнаты для ' + element.offer.guests + ' гостей';
  PopupElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + element.offer.checkin + ', выезд до ' + element.offer.checkout;
  PopupElement.querySelector('.popup__features').textContent = '';
  PopupElement.querySelector('.popup__features').appendChild(renderFeatures(element.offer.features));
  PopupElement.querySelector('.popup__photos').textContent = '';
  PopupElement.querySelector('.popup__photos').appendChild(renderPhotos(element.offer.photos));
  PopupElement.querySelector('.popup__text--address').textContent = element.offer.address;
  PopupElement.querySelector('.popup__description').textContent = element.offer.description;

  return PopupElement;
};

var cardFragment = document.createDocumentFragment();
cardFragment.appendChild(renderCard(similarAd[0]));
document.querySelector('.map').insertBefore(cardFragment, document.querySelector('.map__filters-container'));
