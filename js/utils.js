'use strict';

window.utils = (function () {

  function shuffleArrayCondition() {
    return Math.random() - 0.5;
  }

  return {
    getRandomNumber: function (min, max) {
      return Math.floor(Math.random() * ((max + 1) - min)) + min;
    },

    shuffleArray: function (array) {
      return array.sort(shuffleArrayCondition);
    },

    getRandomArray: function (length, min, max) {
      var array = [];
      while (array.length < length) {
        var randomNumber = window.utils.getRandomNumber(min, max);
        if (array.indexOf(randomNumber) === -1) {
          array.push(randomNumber);
        }
      }
      return array;
    },

    getRandomElement: function (array) {
      var randomElement = Math.floor(Math.random() * array.length);
      return randomElement;
    },
  };

})();