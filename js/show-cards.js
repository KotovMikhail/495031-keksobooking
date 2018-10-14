'use strict';

(function () {

  var currentPin = null;

  var removeCard = function () {
    if (window.showCard.currentAdvert) {
      window.elements.mapSection.removeChild(window.showCard.currentAdvert);
      window.showCard.currentAdvert = null;
    }
  };

  var onEscRemoveAdvert = function (evt) {
    if (evt.keyCode === window.constants.ESC_KEYCODE) {
      removeCard();
      document.removeEventListener('keydown', window.showCard.onEscRemoveAdvert);
      currentPin.classList.remove(window.constants.MAP_PIN_ACTIVE_CLASS);
      window.showCard.activeAdvert = null;
      currentPin.blur();
    }
  };

  var removeActiveCard = function () {
    removeCard();
    if (currentPin) {
      currentPin.classList.remove(window.constants.MAP_PIN_ACTIVE_CLASS);
      window.showCard.activeAdvert = null;
    }
  };

  var createCard = function (id) {
    window.showCard.activeAdvert = id;
    window.showCard.currentAdvert = window.elements.mapSection.appendChild(window.card.getCardData(window.filteredPins[id]));
    document.addEventListener('keydown', onEscRemoveAdvert);
  };

  var onPinClick = function (evt) {
    var target = evt.target;
    var pinButton = target.closest('.map__pin:not(.map__pin--main)');
    var buttonClose = target.className === 'popup__close';

    if (buttonClose) {
      removeActiveCard();
      document.removeEventListener('keydown', onEscRemoveAdvert);
    }

    if (!pinButton || (window.showCard.activeAdvert === pinButton.dataset.id)) {
      return;
    }

    removeActiveCard();
    currentPin = pinButton;
    createCard(pinButton.dataset.id);
    pinButton.classList.add(window.constants.MAP_PIN_ACTIVE_CLASS);
  };

  window.showCard = {
    closeOpenedAdvert: function (card) {
      if (card) {
        window.showCard.activeAdvert = null;
        window.showCard.currentAdvert = null;
        window.elements.mapSection.removeChild(card);
      }
    },
    activeAdvert: null,
    onPinClick: onPinClick,
    onEscRemoveAdvert: onEscRemoveAdvert
  };

})();
