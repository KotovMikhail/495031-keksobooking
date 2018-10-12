'use strict';

(function () {

  var type = window.elements.filterForm.querySelector('#housing-type');
  var price = window.elements.filterForm.querySelector('#housing-price');
  var rooms = window.elements.filterForm.querySelector('#housing-rooms');
  var guests = window.elements.filterForm.querySelector('#housing-guests');
  var features = window.elements.filterForm.querySelector('#housing-features');


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

  var chooseTypes = function (selectType) {
    return type.value === 'any' || selectType.offer.type === type.value;
  };

  var choosePrices = function (selectPrice) {
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
    window.pin.createPins(window.filteredPins.slice(0, 5));
  };


  window.filter = {
    onFilterChange: window.debounce(onFormFilterChange)
  };

  window.elements.filterForm.addEventListener('change', window.filter.onFilterChange);

})();
