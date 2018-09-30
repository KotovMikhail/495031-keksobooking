'use strict';
(function () {

  var housePrice = window.elements.mapForm.querySelector('#price');

  window.toggleDisabled = function (isDisabled, nodes) {
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].disabled = isDisabled;
    }
  };

  window.addEventListener('load', function () {
    window.toggleDisabled(true, window.elements.fieldsets);
    window.toggleDisabled(true, window.elements.filterSelects);
    housePrice.setAttribute('placeholder', '1000');
    window.elements.mainPin.addEventListener('mouseup', window.onButtonMouseUp);
    window.setAddress();
  });
})();
