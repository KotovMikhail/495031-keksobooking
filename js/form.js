'use strict';

(function () {

  window.TypesOfHouses = {
    'bungalo': {
      min: 0,
      placeholder: '0',
      translate: 'Бунгало'
    },
    'flat': {
      min: 1000,
      placeholder: '1000',
      translate: 'Квартира'
    },
    'house': {
      min: 5000,
      placeholder: '5000',
      translate: 'Дом'
    },
    'palace': {
      min: 10000,
      placeholder: '10000',
      translate: 'Дворец'
    }
  };

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

  window.times = {
    timeIn: window.elements.mapForm.querySelector('#timein'),
    timeOut: window.elements.mapForm.querySelector('#timeout'),

    onTimeInChange: function () {
      this.timeOut.value = this.timeIn.value;
    },

    onTimeOutChange: function () {
      this.timeIn.value = this.timeOut.value;
    }
  };

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
