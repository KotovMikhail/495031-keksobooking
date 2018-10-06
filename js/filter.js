'use strict';

(function () {
  var filterForm = document.querySelector('.map__filters');
  var type = filterForm.querySelector('#housing-type');
  var price = filterForm.querySelector('#housing-price');
  var rooms = filterForm.querySelector('#housing-rooms');
  var guests = filterForm.querySelector('#housing-guests');
  var features = filterForm.querySelector('#housing-features');

  var removeMapArea = function () {
    var openedCard = window.elements.mapSection.querySelector('.map__card');
    var visiblePins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    visiblePins.forEach(function (it) {
      it.remove();
    });

    if (openedCard) {
      window.showCard.activeCardId = null;
      window.showCard.currentCard = null;
      window.elements.mapSection.removeChild(openedCard);
    }
  };

  var typeSelection = function (selectType) {
    return type.value === 'any' || selectType.offer.type === type.value;
  };

  var priceSelection = function (selectPrice) {
    if (price.value === 'low') {
      return selectPrice.offer.price < 10000;
    } else if (price.value === 'middle') {
      return selectPrice.offer.price >= 10000 && selectPrice.offer.price <= 50000;
    } else if (price.value === 'high') {
      return selectPrice.offer.price > 50000;
    } else {
      return true;
    }
  };

  var roomsSelection = function (roomQuantity) {
    return rooms.value === 'any' || roomQuantity.offer.rooms.toString() === rooms.value;
  };

  var guestsSelection = function (selectGuests) {
    return guests.value === 'any' || selectGuests.offer.guests.toString() === guests.value;
  };

  var featuresSelection = function (selectFeatures) {
    var checkedElem = features.querySelectorAll('input[type=checkbox]:checked');
    var checkedFeatures = [];

    [].forEach.call(checkedElem, function (checkbox) {
      if (checkbox.checked) {
        checkedFeatures.push(checkbox.value);
      }
      return checkedFeatures;
    });

    return checkedFeatures.every(function (currentFeature) {
      return selectFeatures.offer.features.includes(currentFeature);
    });
  };

  var onFilterChange = function () {

    removeMapArea();

    var filteredPins = window.adverts
      .filter(typeSelection)
      .filter(priceSelection)
      .filter(roomsSelection)
      .filter(guestsSelection)
      .filter(featuresSelection);

    window.pin.createPins(filteredPins);
  };

  filterForm.addEventListener('change', window.debounce(onFilterChange));

})();
