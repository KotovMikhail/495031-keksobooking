'use strict';

(function () {


  var Rooms = {
    1: {
      enabled: ['1'],
      textError: 'не более одного гостя'
    },
    2: {
      enabled: ['1', '2'],
      textError: 'не более одного или двух гостей'
    },
    3: {
      enabled: ['1', '2', '3'],
      textError: 'не более одного, двух или трёх гостей'
    },
    100: {
      enabled: ['0'],
      textError: 'не для гостей'
    }
  };

  var roomNumber = window.elements.mapForm.querySelector('#room_number');
  var capacity = window.elements.mapForm.querySelector('#capacity');
  var houseType = window.elements.mapForm.querySelector('#type');
  var housePrice = window.elements.mapForm.querySelector('#price');
  var timeIn = window.elements.mapForm.querySelector('#timein');
  var timeOut = window.elements.mapForm.querySelector('#timeout');

  var onTimeInChange = function () {
    timeOut.value = timeIn.value;
  };

  var onTimeOutChange = function () {
    timeIn.value = timeOut.value;
  };

  timeIn.addEventListener('change', onTimeInChange);
  timeOut.addEventListener('change', onTimeOutChange);

  houseType.addEventListener('change', function () {

    var select = window.TypesOfHouses[houseType.value];

    housePrice.setAttribute('min', select.min);
    housePrice.setAttribute('placeholder', select.placeholder);
  });

  var options = capacity.querySelectorAll('option');


  roomNumber.addEventListener('change', function () {
    var selectType = Rooms[roomNumber.value];
    setOptions(selectType);
    setValidity(selectType);
  });

  var setOptions = function (selectType) {
    var checkValidity = function (value) {
      return selectType.enabled.indexOf(value) === -1;
    };

    options.forEach(function (option) {
      option.disabled = checkValidity(option.value);
    });
  };

  var setValidity = function (selectType) {
    var isValid = selectType.enabled.indexOf(capacity.value) !== -1;
    var customValidity = isValid ? '' : selectType.textError;
    capacity.setCustomValidity(customValidity);
  };

  capacity.addEventListener('change', function () {
    capacity.setCustomValidity('');
  });


})();
