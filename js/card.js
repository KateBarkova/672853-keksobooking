'use strict';

(function () {
  var ESC_KEYCODE = 27;

  var TypeObjects = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
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

  var onCloseButtonClick = function () {
    window.card.remove();
  };

  var onCardEscPress = function (keyboardEvt) {
    if (keyboardEvt.keyCode === ESC_KEYCODE) {
      window.card.remove();
    }
  };

  var getCapacity = function (element) {
    var rooms = element.offer.rooms;
    var guests = element.offer.guests;

    var textRoom = rooms + ' комнат для ';
    if (rooms === 1 || rooms !== 11 && rooms % 10 === 1) {
      textRoom = rooms + ' комната для ';
    } else if (rooms !== 0 && rooms < 5 || rooms > 20 && rooms % 10 > 1 && rooms % 10 < 5) {
      textRoom = rooms + ' комнаты для ';
    }

    var textGuests = guests === 1 ? guests + ' гостя' : guests + ' гостей';

    return textRoom + textGuests;
  };

  window.card = {
    remove: function () {
      var card = document.querySelector('.map__card');
      if (card) {
        card.remove();
        document.removeEventListener('keydown', onCardEscPress);
      }
    },

    render: function (element) {
      window.card.remove();

      var dom = window.dom.getElements();
      var template = dom.template.content;
      var cardTemplate = template.querySelector('.map__card');

      var card = cardTemplate.cloneNode(true);
      var cardItems = window.dom.getTemplateElements(card);

      var checkTime = 'Заезд после ' + element.offer.checkin + ', выезд до ' + element.offer.checkout;

      cardItems.popupAvatar.src = element.author.avatar;
      cardItems.title.textContent = element.offer.title;
      cardItems.price.textContent = element.offer.price + '₽/ночь';
      cardItems.typeHouse.textContent = TypeObjects[element.offer.type];
      cardItems.capacity.textContent = getCapacity(element);
      cardItems.time.textContent = checkTime;
      cardItems.features.textContent = '';
      cardItems.features.appendChild(renderFeatures(element.offer.features));
      cardItems.popupPhotos.textContent = '';
      cardItems.popupPhotos.appendChild(renderPhotos(element.offer.photos));
      cardItems.address.textContent = element.offer.address;
      cardItems.description.textContent = element.offer.description;

      var cardFragment = document.createDocumentFragment();
      cardFragment.appendChild(card);
      dom.map.insertBefore(cardFragment, dom.mapFilters);

      document.addEventListener('keydown', onCardEscPress);
      cardItems.closeButton.addEventListener('click', onCloseButtonClick);
    }
  };

})();
