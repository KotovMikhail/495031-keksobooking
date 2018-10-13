'use strict';
(function () {

  window.pin = {
    createPins: function (icons) {
      icons.forEach(function (pin, i) {
        var pinElem = window.elements.pinTemplate.cloneNode(true);
        pinElem.children[0].src = pin.author.avatar;
        pinElem.dataset.id = i;
        pinElem.style.left = Math.floor(pin.location.x - window.constants.PIN_WIDTH / 2) + 'px';
        pinElem.style.top = pin.location.y + 'px';
        pinElem.children[0].alt = pin.offer.title;
        window.elements.fragmentPins.appendChild(pinElem);
      });
      window.elements.mapPinList.appendChild(window.elements.fragmentPins);
    }
  };
})();
