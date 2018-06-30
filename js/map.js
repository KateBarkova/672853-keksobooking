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

var ROOMS_GUESTS = {
  0: [2],
  1: [1, 2],
  2: [0, 1, 2],
  3: [3]
};

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

var START_PIN_Y = 375;
var START_PIN_X = 570;

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
      photos: shuffleArray(PHOTOS.slice())
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
    mapFilters: document.querySelector('.map__filters-container'),
    form: document.querySelector('.ad-form'),
    address: document.querySelector('#address'),
    fieldsets: document.querySelectorAll('fieldset'),
    popup: document.querySelector('.popup')
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

  for (var i = 0; i < photos.length; i++) {
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
  var card = document.querySelector('.map__card');
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

var changeStateFieldset = function (fieldset, state) {
  Object.keys(fieldset).forEach(function (index) {
    fieldset[index].disabled = state;
  });
};

var getAddress = function (widthPin, heightPin) {
  var mainMapPin = document.querySelector('.map__pin--main');
  var positionX = Math.round(mainMapPin.offsetLeft + widthPin / 2);
  var positionY = Math.round(mainMapPin.offsetTop + heightPin);
  return positionX + ', ' + positionY;
};

var setActiveForm = function () {
  var dom = getDomElements();
  changeStateFieldset(dom.fieldsets, true);
  dom.address.value = getAddress(MAIN_PIN_WIDTH, MAIN_PIN_WIDTH / 2);
};

var getActiveState = function () {
  var dom = getDomElements();

  if (dom.map.classList.contains('map--faded')) {
    dom.map.classList.remove('map--faded');
    dom.form.classList.remove('ad-form--disabled');
    dom.address.value = getAddress(MAIN_PIN_WIDTH, MAIN_PIN_HEIGTH);
    changeStateFieldset(dom.fieldsets, false);

    var mapPinsArray = getMapPinsArray(OBJECT_NUMBER);
    renderMapPins(mapPinsArray);
  }
};

var render = function () {
  var mainMapPin = document.querySelector('.map__pin--main');

  setActiveForm();

  mainMapPin.addEventListener('mousedown', function (evt) {
    movePin(evt);
    getActiveState();
  });

  // movePin();
};

// Валидация

var MIN_PRICE_HOUSE = {
  'Бунгало': '0',
  'Квартира': '1000',
  'Дом': '5000',
  'Дворец': '10000'
};

var validateFormTitle = function (element) {
  if (element.validity.tooShort) {
    element.setCustomValidity('Заголовок должен состоять минимум из 30 символов');
  } else if (element.validity.tooLong) {
    element.setCustomValidity('Заголовок не должен превышать 100-ти символов');
  } else if (element.validity.valueMissing) {
    element.setCustomValidity('Обязательное поле');
  } else {
    element.setCustomValidity('');
  }
};

var validateFormPrice = function (element) {
  if (element.validity.rangeUnderflow) {
    element.setCustomValidity('Минимально допустимая стоимость для данного типа жилья - ' + element.min + ' руб.');
  } else if (element.validity.rangeOverflow) {
    element.setCustomValidity('Максимально допустимая стоимость жилья - 1 000 000 руб.');
  } else if (element.validity.valueMissing) {
    element.setCustomValidity('Обязательное поле');
  } else {
    element.setCustomValidity('');
  }
};

var setMinimalPrice = function (element1, element2) {
  var selectedElement = element1.options[element1.selectedIndex].textContent;
  element2.placeholder = MIN_PRICE_HOUSE[selectedElement];
  element2.min = MIN_PRICE_HOUSE[selectedElement];
};

var setChangeTime = function (element1, element2) {
  var selectedElement = element1.options[element1.selectedIndex].value;
  element2.value = selectedElement;
};

var setNumberGuest = function (rooms, guests) {
  var selectedValue = rooms.selectedIndex;
  var selectedArray = ROOMS_GUESTS[selectedValue];

  Object.keys(guests.options).forEach(function (index) {
    guests.options[index].disabled = true;
  });

  for (var i = 0; i < selectedArray.length; i++) {
    guests.options[selectedArray[i]].disabled = false;
  }
};

var validateGuests = function (rooms, guests) {
  if (ROOMS_GUESTS[rooms.selectedIndex].indexOf(guests.selectedIndex) === -1) {
    guests.valid = false;
    guests.setCustomValidity('Выберите, пожалуйста, другой вариант количества гостей');
  } else {
    guests.valid = true;
    guests.setCustomValidity('');
  }
};

var clearAll = function () {
  var dom = getDomElements();
  var pinArray = dom.pins.querySelectorAll('.map__pin');
  dom.map.classList.add('map--faded');
  dom.form.classList.add('ad-form--disabled');

  if (dom.popup) {
    dom.popup.remove();
  }

  Object.keys(pinArray).forEach(function (index) {
    if (!pinArray[index].classList.contains('map__pin--main')) {
      pinArray[index].remove();
    }
  });

  if (dom.form.classList.contains('ad-form--invalid')) {
    dom.form.classList.remove('ad-form--invalid');
  }
  movePinToStart();
  setActiveForm();
};

var validateForm = function () {
  var dom = getDomElements();
  var form = dom.form;
  var inputTitle = form.querySelector('#title');
  var inputPrice = form.querySelector('#price');
  var inputType = form.querySelector('#type');
  var timeIn = form.querySelector('#timein');
  var timeOut = form.querySelector('#timeout');
  var room = form.querySelector('#room_number');
  var capacity = form.querySelector('#capacity');
  var resetButton = form.querySelector('.ad-form__reset');
  var submitButton = form.querySelector('.ad-form__submit');

  inputTitle.addEventListener('invalid', function () {
    validateFormTitle(inputTitle);
  });

  inputTitle.addEventListener('input', function () {
    validateFormTitle(inputTitle);
  });

  inputPrice.addEventListener('invalid', function () {
    validateFormPrice(inputPrice);
  });

  inputPrice.addEventListener('input', function () {
    validateFormPrice(inputPrice);
  });

  inputType.addEventListener('change', function () {
    setMinimalPrice(inputType, inputPrice);
  });

  timeIn.addEventListener('change', function () {
    setChangeTime(timeIn, timeOut);
  });

  timeOut.addEventListener('change', function () {
    setChangeTime(timeOut, timeIn);
  });

  setNumberGuest(room, capacity);
  validateGuests(room, capacity);

  room.addEventListener('change', function () {
    setNumberGuest(room, capacity);
    validateGuests(room, capacity);
  });

  capacity.addEventListener('change', function () {
    validateGuests(room, capacity);
  });

  resetButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    dom.form.reset();
    clearAll();
  });

  submitButton.addEventListener('click', function () {
    form.classList.add('ad-form--invalid');
  });

};

var checkPinPosition = function (coordinateX, coordinateY) {
  var dom = getDomElements();
  var minTop = MIN_Y - MAIN_PIN_HEIGTH;
  var maxTop = MAX_Y - MAIN_PIN_HEIGTH;
  var minLeft = 0;
  var maxLeft = dom.map.offsetWidth - MAIN_PIN_WIDTH;

  if (coordinateX > maxLeft) {
    coordinateX = maxLeft;
  } else if (coordinateX < minLeft) {
    coordinateX = minLeft;
  }

  if (coordinateY > maxTop) {
    coordinateY = maxTop;
  } else if (coordinateY < minTop) {
    coordinateY = minTop;
  }

  return {x: coordinateX, y: coordinateY};
};

var movePin = function (evt) {
  var dom = getDomElements();
  var mainPin = dom.pins.querySelector('.map__pin--main');

  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (moveEvt) {

    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    var endCoords = {
      x: mainPin.offsetLeft - shift.x,
      y: mainPin.offsetTop - shift.y
    };

    endCoords = checkPinPosition(endCoords.x, endCoords.y);

    mainPin.style.top = endCoords.y + 'px';
    mainPin.style.left = endCoords.x + 'px';
    dom.address.value = getAddress(MAIN_PIN_WIDTH, MAIN_PIN_HEIGTH);
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
};

function movePinToStart() {
  var mainPin = document.querySelector('.map__pin--main');
  mainPin.style.top = START_PIN_Y + 'px';
  mainPin.style.left = START_PIN_X + 'px';
}

render();
validateForm();
