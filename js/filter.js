'use strict';

(function () {

  var type = window.elements.filterForm.querySelector('#housing-type');
  var price = window.elements.filterForm.querySelector('#housing-price');
  var rooms = window.elements.filterForm.querySelector('#housing-rooms');
  var guests = window.elements.filterForm.querySelector('#housing-guests');
  var features = window.elements.filterForm.querySelector('#housing-features');

  var removeMapArea = function () {

    window.pin.visible.forEach(function (it) {
      it.remove();
    });

    window.showCard.findOpenedAdvert(window.showCard.currentAdvert);

    document.removeEventListener('keydown', window.showCard.removeEscape);
  };

  var chooseTypes = function (selectType) {
    return type.value === 'any' || selectType.offer.type === type.value;
  };

  var choosePrices = function (selectPrice) {
    if (price.value === 'low') {
      return selectPrice.offer.price < window.constants.MIN_OFFER_PRICE;
    } else if (price.value === 'middle') {
      return selectPrice.offer.price >= window.constants.MIN_OFFER_PRICE && selectPrice.offer.price <= window.constants.MAX_OFFER_PRICE;
    } else if (price.value === 'high') {
      return selectPrice.offer.price > window.constants.MAX_OFFER_PRICE;
    } else {
      return true;
    }
  };

  var chooseRooms = function (roomQuantity) {
    return rooms.value === 'any' || roomQuantity.offer.rooms.toString() === rooms.value;
  };

  var chooseGuests = function (selectGuests) {
    return guests.value === 'any' || selectGuests.offer.guests.toString() === guests.value;
  };

  var chooseFeatures = function (selectFeatures) {
    var checkedElem = features.querySelectorAll('input[type=checkbox]:checked');

    var checkedFeatures = [].map.call(checkedElem, function (input) {
      return input.value;
    });

    return checkedFeatures.every(function (currentFeature) {
      return selectFeatures.offer.features.includes(currentFeature);
    });
  };

  var onFormFilterChange = function () {

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

    var flagPin = window.elements.mapPinList.querySelector('.map__pin:not(.map__pin--main)');

    if (flagPin) {
      window.elements.mapSection.addEventListener('click', window.showCard.renderAdvert);
    } else {
      window.elements.mapSection.removeEventListener('click', window.showCard.renderAdvert);
    }

  };

  window.filter = {
    onFormAdvertChange: window.debounce(onFormFilterChange)
  };

  window.elements.filterForm.addEventListener('change', window.filter.onFormAdvertChange);

})();
