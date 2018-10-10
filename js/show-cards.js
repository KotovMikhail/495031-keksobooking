'use strict';

(function () {

  window.showCard = {
    activeCardId: null,
    currentCard: null
  };

  var currentPin = null;

  var removeCard = function () {
    if (window.showCard.currentCard) {
      window.elements.mapSection.removeChild(window.showCard.currentCard);

      window.showCard.currentCard = null;
    }
  };

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.constants.ESC_KEYCODE) {
      removeCard();
      document.removeEventListener('keydown', onPopupEscPress);
      currentPin.classList.remove(window.constants.MAP_PIN_ACTIVE_CLASS);
      window.showCard.activeCardId = null;
      currentPin.blur();
    }
  };

  var removeActiveCard = function () {
    removeCard();

    if (currentPin) {
      currentPin.classList.remove(window.constants.MAP_PIN_ACTIVE_CLASS);
      window.showCard.activeCardId = null;
    }
  };

  var createCard = function (id) {
    window.showCard.activeCardId = id;
    window.showCard.currentCard = window.elements.mapSection.appendChild(window.card.getCardData(window.filteredPins[id]));
    document.addEventListener('keydown', onPopupEscPress);
  };

  var showCard = function (evt) {
    var target = evt.target;
    var pinButton = target.closest('.map__pin:not(.map__pin--main)');
    var buttonClose = target.className === 'popup__close';

    if (buttonClose) {
      removeActiveCard();
      document.removeEventListener('keydown', onPopupEscPress);
    }

    if (!pinButton || (window.showCard.activeCardId === pinButton.dataset.id)) {
      return;
    }

    removeActiveCard();
    currentPin = pinButton;
    createCard(pinButton.dataset.id);
    pinButton.classList.add(window.constants.MAP_PIN_ACTIVE_CLASS);
  };

  window.elements.mapSection.addEventListener('click', showCard);

})();
