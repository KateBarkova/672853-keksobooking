'use strict';

(function () {

  window.dom = {
    getElements: function () {
      return {
        map: document.querySelector('.map'),
        pins: document.querySelector('.map__pins'),
        template: document.querySelector('template'),
        mapFilters: document.querySelector('.map__filters-container'),
        formFilters: document.querySelector('.map__filters'),
        form: document.querySelector('.ad-form'),
        address: document.querySelector('#address'),
        fieldsets: document.querySelectorAll('fieldset'),
        popup: document.querySelector('.popup')
      };
    },

    getTemplateElements: function (parent) {
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
    },

    getFormElements: function (parent) {
      return {
        inputTitle: parent.querySelector('#title'),
        inputPrice: parent.querySelector('#price'),
        inputType: parent.querySelector('#type'),
        timeIn: parent.querySelector('#timein'),
        timeOut: parent.querySelector('#timeout'),
        room: parent.querySelector('#room_number'),
        capacity: parent.querySelector('#capacity'),
        resetButton: parent.querySelector('.ad-form__reset'),
        submitButton: parent.querySelector('.ad-form__submit'),
      };
    }
  };

})();
