'use strict';

(function () {
  window.util = {

    getUnique: function (titles) {
      var uniqueEl = titles[this.getRandom(0, titles.length)];
      titles.splice(titles.indexOf(uniqueEl), 1);
      return uniqueEl;
    },

    getRandom: function (min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },

    shuffleArray: function (array) {
      var finalArr = array.slice();
      for (var i = 0; i < finalArr.length; i++) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = finalArr[i];
        finalArr[i] = finalArr[j];
        finalArr[j] = tmp;
      }
      return finalArr;
    },

    toggleDisabled: function (isDisabled, nodes) {
      for (var i = 0; i < nodes.length; i++) {
        nodes[i].disabled = isDisabled;
      }
    },

    setAddress: function () {
      window.elements.inputAddress.setAttribute('value', parseInt(window.elements.mainPin.style.left, 10) + ', ' + parseInt(window.elements.mainPin.style.top, 10));
    }

  };
})();
