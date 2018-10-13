'use strict';

(function () {

  var getXhrData = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case window.constants.SUCCESS_REQ:
          onLoad(xhr.response);
          break;
        case window.constants.FAILED_REQ:
          onError('Неверный запрос');
          break;
        case window.constants.BAD_REQ:
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

      xhr.open('GET', window.constants.URL_GET);
      xhr.send();

    },
    upload: function (data, onLoad, onError) {
      var xhr = getXhrData(onLoad, onError);

      xhr.open('POST', window.constants.URL_POST);
      xhr.send(data);
    }
  };

})();
