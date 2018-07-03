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

  window.card = {
    render: function (element) {
      removeCard();

      var dom = window.dom.getElements();
      var elementTemplate = dom.template.content;
      var cardTemplate = elementTemplate.querySelector('.map__card');

      var card = cardTemplate.cloneNode(true);
      var cardTemplatesElement = window.dom.getTemplatesElement(card);

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
    }
  };

})();
