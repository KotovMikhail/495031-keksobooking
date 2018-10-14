'use strict';

(function () {

  var type = window.elements.filterForm.querySelector('#housing-type');
  var price = window.elements.filterForm.querySelector('#housing-price');
  var rooms = window.elements.filterForm.querySelector('#housing-rooms');
  var guests = window.elements.filterForm.querySelector('#housing-guests');
  var features = window.elements.filterForm.querySelector('#housing-features');

  var removeMapArea = function () {

    window.pin.visible.forEach(function (pin) {
      pin.remove();
    });

    window.pin.visible = [];

    window.showCard.closeOpenedAdvert(window.showCard.currentAdvert);


  };

  var chooseTypes = function (selectType) {
    return type.value === window.constants.Phrases.ANY || selectType.offer.type === type.value;
  };

  var choosePrices = function (selectPrice) {
    if (price.value === window.constants.Phrases.LOW) {
      return selectPrice.offer.price < window.constants.MIN_OFFER_PRICE;
    } else if (price.value === window.constants.Phrases.MIDDLE) {
      return selectPrice.offer.price >= window.constants.MIN_OFFER_PRICE && selectPrice.offer.price <= window.constants.MAX_OFFER_PRICE;
    } else if (price.value === window.constants.Phrases.HIGH) {
      return selectPrice.offer.price > window.constants.MAX_OFFER_PRICE;
    } else {
      return true;
    }
  };

  var chooseRooms = function (roomQuantity) {
    return rooms.value === window.constants.Phrases.ANY || roomQuantity.offer.rooms.toString() === rooms.value;
  };

  var chooseGuests = function (selectGuests) {
    return guests.value === window.constants.Phrases.ANY || selectGuests.offer.guests.toString() === guests.value;
  };

  var chooseFeatures = function (selectFeatures) {
    var checkedElem = features.querySelectorAll(window.constants.CHECKED_FEATURE);

    var checkedFeatures = [].map.call(checkedElem, function (input) {
      return input.value;
    });

    return checkedFeatures.every(function (currentFeature) {
      return selectFeatures.offer.features.includes(currentFeature);
    });
  };

  var onMapFormChange = function () {

    removeMapArea();

    window.filteredPins = window.adverts.filter(function (filtredData) {
      var adType = chooseTypes(filtredData);
      var adRooms = choosePrices(filtredData);
      var adPrice = chooseRooms(filtredData);
      var adGuests = chooseGuests(filtredData);
      var adFeatures = chooseFeatures(filtredData);
      return adType && adRooms && adPrice && adGuests && adFeatures;
    });

    var shuffledPins = window.util.shuffleArray(window.filteredPins);

    window.pin.createPins(shuffledPins.slice(0, window.constants.MAX_QUANTITY_PINS));

    if (window.filteredPins.length === 0) {
      document.removeEventListener('keydown', window.showCard.onEscRemoveAdvert);
      window.elements.mapSection.removeEventListener('click', window.showCard.onPinClick);
    } else {
      document.addEventListener('keydown', window.showCard.onEscRemoveAdvert);
      window.elements.mapSection.addEventListener('click', window.showCard.onPinClick);
    }

  };

  window.filter = {
    onMapFormChange: window.debounce(onMapFormChange)
  };

})();
