'use strict';
(function () {

  var housePrice = window.elements.mapForm.querySelector('#price');
  var widthMap = window.elements.mapPinList.offsetWidth;
  var inputAddress = window.elements.mapForm.querySelector('#address');
  var pinLeftCoord = parseInt(window.elements.mainPin.style.left, 10);
  var pinTopCoord = parseInt(window.elements.mainPin.style.top, 10);

  var addAddress = function (top, left) {
    inputAddress.setAttribute('value', Math.floor(left) + ', ' + Math.floor(top));
  };

  window.elements.mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      var leftPin = window.constants.PIN_WIDTH / 2 + window.elements.mainPin.offsetLeft;
      var topPin = window.constants.PIN_HEIGHT + window.constants.PIN_ARROW_HEIGHT + window.elements.mainPin.offsetTop;


      if (window.elements.mainPin.offsetLeft - shift.x < 0) {
        window.elements.mainPin.style.left = 0 + 'px';
      } else if (window.elements.mainPin.offsetLeft - shift.x > widthMap - window.constants.PIN_WIDTH) {
        window.elements.mainPin.style.left = widthMap - window.constants.PIN_WIDTH + 'px';
      } else {
        window.elements.mainPin.style.left = (window.elements.mainPin.offsetLeft - shift.x) + 'px';
      }

      if (window.elements.mainPin.offsetTop - shift.y > window.constants.MAX_LOCATION_Y) {
        window.elements.mainPin.style.top = window.constants.MAX_LOCATION_Y + 'px';
      } else if (window.elements.mainPin.offsetTop - shift.y < window.constants.MIN_LOCATION_Y) {
        window.elements.mainPin.style.top = window.constants.MIN_LOCATION_Y + 'px';
      } else {
        window.elements.mainPin.style.top = (window.elements.mainPin.offsetTop - shift.y) + 'px';
      }

      if (!window.elements.mapSection.classList.contains('map--faded')) {
        addAddress(topPin, leftPin);
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var removeOnButtonMouseUp = function () {
    window.elements.mainPin.removeEventListener('mouseup', window.onButtonMouseUp);
  };

  window.onButtonMouseUp = function () {
    inputAddress.readOnly = true;
    window.elements.mapSection.classList.remove('map--faded');
    window.elements.advertForm.classList.remove('ad-form--disabled');
    window.createPins(window.dates);
    toggleDisabled(false, window.elements.fieldsets);
    toggleDisabled(false, window.elements.filterSelects);
    removeOnButtonMouseUp();
    addAddress(pinTopCoord, pinLeftCoord);
  };

  var toggleDisabled = function (isDisabled, nodes) {
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].disabled = isDisabled;
    }
  };

  window.addEventListener('load', function () {
    toggleDisabled(true, window.elements.fieldsets);
    toggleDisabled(true, window.elements.filterSelects);
    housePrice.setAttribute('placeholder', '1000');
    window.elements.mainPin.addEventListener('mouseup', window.onButtonMouseUp);
    addAddress(pinTopCoord, pinLeftCoord);
  });
})();
