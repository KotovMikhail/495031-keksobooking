'use strict';
(function () {

  window.pin = {
    createPins: function (icons) {

      for (var i = 0; i < icons.length; i++) {

        var pinElem = window.elements.pinTemplate.cloneNode(true);
        pinElem.children[0].src = icons[i].author.avatar;
        pinElem.dataset.id = i;
        pinElem.style.left = icons[i].location.x + 'px';
        pinElem.style.top = icons[i].location.y + 'px';
        pinElem.children[0].alt = icons[i].offer.title;
        window.elements.fragmentPins.appendChild(pinElem);

      }
      window.elements.mapPinList.appendChild(window.elements.fragmentPins);
    }
  };
})();
