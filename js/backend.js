'use strict';

(function () {
  var LOAD_TIMEOUT = 10000;
  var ERROR_TIMEOUT = 3000;
  var SUCCESS_STATUS = 200;
  var URL = 'https://js.dump.academy/keksobooking';

  var onXhrLoad = function (xhr, onLoad, onError) {
    return function () {
      if (xhr.status === SUCCESS_STATUS) {
        onLoad(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    };
  };

  var onXhrError = function (onError) {
    return function () {
      onError('Произошла ошибка соединения');
    };
  };

  var onXhrTimeout = function (onError, xhr) {
    return function () {
      xhr.timeout = LOAD_TIMEOUT;
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    };
  };

  var onXhrUpLoad = function (xhr, onLoad, onError) {
    return function () {
      if (xhr.status === SUCCESS_STATUS) {
        onLoad();
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    };
  };

  window.backend = {
    load: function (url, onLoad, onError) {
      var xhr = new XMLHttpRequest();

      xhr.responseType = 'json';

      xhr.addEventListener('load', onXhrLoad(xhr, onLoad, onError));
      xhr.addEventListener('error', onXhrError(onError));
      xhr.addEventListener('timeout', onXhrTimeout(onError, xhr));

      xhr.open('GET', url);
      xhr.send();
    },

    upload: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', onXhrUpLoad(xhr, onLoad, onError));
      xhr.addEventListener('error', onXhrError(onError));
      xhr.addEventListener('timeout', onXhrTimeout(onError, xhr));

      xhr.open('POST', URL);
      xhr.send(data);
    },

    onError: function (message) {
      var newElement = document.createElement('div');
      newElement.className = 'error-message';
      newElement.textContent = message;

      var dom = window.dom.getElements();
      var pins = dom.pins;
      pins.appendChild(newElement);

      var errorMessage = pins.querySelector('.error-message');

      var removeErrorMessage = function () {
        errorMessage.remove();
      };

      if (errorMessage) {
        setTimeout(removeErrorMessage, ERROR_TIMEOUT);
      }


    }
  };

})();
