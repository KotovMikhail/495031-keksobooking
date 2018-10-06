'use strict';

(function () {
  var filterForm = document.querySelector('.map__filters');
  var type = filterForm.querySelector('#housing-type');
  var price = filterForm.querySelector('#housing-price');
  var rooms = filterForm.querySelector('#housing-rooms');
  var guests = filterForm.querySelector('#housing-guests');
  var features = filterForm.querySelector('#housing-features');

  var removeMapArea = function () {
    var allPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    allPins.forEach(function (it) {
      it.remove();
    });
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


  var typeSelection = function (selectType) {
    console.log(type.value);
    return selectType.offer.type === type.value;
  };

  var onFilterChange = function () {
    removeMapArea();
    var filteredPins = window.adverts.filter(typeSelection);
    window.pin.createPins(filteredPins);
  };

  filterForm.addEventListener('change', onFilterChange);


})();
