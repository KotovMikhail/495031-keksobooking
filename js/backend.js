'use strict';

(function () {
  var URL_GET = 'https://js.dump.academy/keksobooking/data';
  var URL_POST = 'https://js.dump.academy/keksobooking';

  var getXhrData = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case 200:
          onLoad(xhr.response);
          break;
        case 400:
          onError('Неверный запрос');
          break;
        case 404:
          onError('Ничего не найдено');
          break;
        default:
          onError('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Что-то пошло не так! Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = window.constants.TIMEOUT;

    return xhr;
  };

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = getXhrData(onLoad, onError);

      xhr.open('GET', URL_GET);
      xhr.send();

    },
    upload: function (data, onLoad, onError) {
      var xhr = getXhrData(onLoad, onError);

      xhr.open('POST', URL_POST);
      xhr.send(data);
    }
  };

})();
