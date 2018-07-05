'use strict';

(function () {

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

  var removeCard = function () {
    var card = document.querySelector('.map__card');
    if (card) {
      card.remove();
    }
  };

  var onCloseButtonClick =  function () {
    removeCard();
  }

  window.card = {
    render: function (element) {
      removeCard();

      var dom = window.dom.getElements();
      var template = dom.template.content;
      var cardTemplate = template.querySelector('.map__card');

      var card = cardTemplate.cloneNode(true);
      var cardTemplate = window.dom.getTemplateElements(card);

      var checkTime = 'Заезд после ' + element.offer.checkin + ', выезд до ' + element.offer.checkout;
      var capacity = element.offer.rooms + ' комнаты для ' + element.offer.guests + ' гостей';

      cardTemplate.popupAvatar.src = element.author.avatar;
      cardTemplate.title.textContent = element.offer.title;
      cardTemplate.price.textContent = element.offer.price + '₽/ночь';
      cardTemplate.typeHouse.textContent = typeArray[element.offer.type];
      cardTemplate.capacity.textContent = capacity;
      cardTemplate.time.textContent = checkTime;
      cardTemplate.features.textContent = '';
      cardTemplate.features.appendChild(renderFeatures(element.offer.features));
      cardTemplate.popupPhotos.textContent = '';
      cardTemplate.popupPhotos.appendChild(renderPhotos(element.offer.photos));
      cardTemplate.address.textContent = element.offer.address;
      cardTemplate.description.textContent = element.offer.description;

      var cardFragment = document.createDocumentFragment();
      cardFragment.appendChild(card);
      dom.map.insertBefore(cardFragment, dom.mapFilters);

      cardTemplate.closeButton.addEventListener('click', onCloseButtonClick);
    }
  };

})();
