'use strict';
(function () {
  var widthMap = window.elements.mapPinList.offsetWidth;
  var errorPopup = window.elements.errorTemplate.cloneNode(true);
  var errorButton = errorPopup.querySelector('.error__button');
  var messageContainer = errorPopup.querySelector('.error__message');

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
        window.elements.inputAddress.setAttribute('value', Math.floor(leftPin) + ', ' + Math.floor(topPin));
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

  window.map = {
    onButtonMouseUp: function () {

      var onLoadSuccess = function (advert) {
        window.adverts = advert;
        window.filteredPins = window.util.shuffleArray(advert).splice(0, window.constants.MAX_QUANTITY_PINS);
        window.pin.createPins(window.filteredPins);
      };

      window.backend.load(onLoadSuccess, onLoadError);

      window.elements.mapSection.classList.remove('map--faded');
      window.elements.advertForm.classList.remove('ad-form--disabled');
      window.util.toggleDisabled(false, window.elements.fieldsets);
      window.util.toggleDisabled(false, window.elements.filterSelects);
      removeonButtonMouseUp();
      window.util.setAddress();
      window.elements.filterForm.addEventListener('change', window.filter.onMapFormChange);
      window.elements.mapSection.addEventListener('click', window.showCard.onPinClick);
      window.elements.filterForm.addEventListener('change', window.filter.onMapFormChange);
    }
  };

  var removeonButtonMouseUp = function () {
    window.elements.mainPin.removeEventListener('mouseup', window.map.onButtonMouseUp);
  };

  var onEscErrorPress = function (evt) {
    if (evt.keyCode === window.constants.ESC_KEYCODE) {
      removeListeners();
    }
  };

  var onEnterErrorClick = function (evt) {
    if (evt.keyCode === window.constants.ENTER_KEYCODE) {
      removeListeners();
    }
  };

  var onButtonErrorClick = function () {
    removeListeners();
  };

  var removeListeners = function () {
    window.elements.mapSection.removeChild(errorPopup);
    errorButton.removeEventListener('keyup', onEnterErrorClick);
    document.removeEventListener('keyup', onEscErrorPress);
    document.removeEventListener('click', onButtonErrorClick);
  };

  var onLoadError = function (errorMessage) {
    messageContainer.textContent = errorMessage;
    errorButton.setAttribute('tabindex', '0');

    errorButton.addEventListener('keyup', onEnterErrorClick);
    document.addEventListener('keyup', onEscErrorPress);
    document.addEventListener('click', onButtonErrorClick);

    window.elements.mapSection.appendChild(errorPopup);
  };

  var onLoadEnabled = function () {
    window.util.toggleDisabled(true, window.elements.fieldsets);
    window.util.toggleDisabled(true, window.elements.filterSelects);
    window.elements.mainPin.addEventListener('mouseup', window.map.onButtonMouseUp);
    window.util.setAddress();
  };

  window.addEventListener('load', onLoadEnabled);
})();
