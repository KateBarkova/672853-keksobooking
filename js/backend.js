'use strict';

(function () {
  var LOAD_TIMEOUT = 10000;
  var ERROR_TIMEOUT = 3000;

  function onXhrLoad(xhr, onLoad, onError) {
    return function() {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    }
  };

  function onXhrError(onError) {
    return function() {
      onError('Произошла ошибка соединения');
    }
  };

  function onXhrTimeout(onError, xhr) {
    return function() {
      xhr.timeout = LOAD_TIMEOUT;
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    }
  };

  function onXhrUpLoad(xhr, onLoad, onError) {
    return function() {
      if (xhr.status === 200) {
        onLoad();
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    }
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
      var URL = 'https://js.dump.academy/keksobooking';
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

      if (errorMessage) {
        setTimeout(removeErrorMessage, ERROR_TIMEOUT);
      }

      function removeErrorMessage() {
        errorMessage.remove();
      }
    }
  };

})();
