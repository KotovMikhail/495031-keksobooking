'use strict';
var map = document.querySelector('.map');
map.classList.remove('map--faded');

var TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var TYPE = ['palace', 'flat', 'house', 'bungalo'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var CHECK_TIME = ['12:00', '13:00', '14:00'];
// var CHECK_OUT = ['12:00', '13:00', '14:00'];
var MIN_PRICE = 1000;
var MAX_PRCIE = 1000000;
var MIN_ROOM = 1;
var MAX_ROOM = 5;
var IMAGE_NUM_RANGE = [1, 2, 3, 4, 5, 6, 7, 8];

var getUnique = function (arr) {
  var uniqueEl = arr[getRandom(0, (arr.length))];
  arr.splice(arr.indexOf(uniqueEl), 1);
  // for (var i = 1; i < imageNumber; i++) {
  //   var img = 'img/avatars/user0' + IMAGE_NUM_RANGE[i] + '.png';
  // }
  return uniqueEl;
};

var getRandom = function (min, max) {
  return Math.floor(Math.random() * max + min);
};

var compareRandom = function () {
  return Math.random() - 0.5;
};

function getRandStringsArr() {
  var finalArr = FEATURES;
  finalArr.length = getRandom(0, FEATURES.length - 1);
  return finalArr;
}

var createObject = function () {

  var obj = {
    author: {
      avatar: 'img/avatars/user0' + getUnique(IMAGE_NUM_RANGE) + '.png'
    },

    offer: {
      title: getUnique(TITLE),
      // address: obj.offer.location.x + ',' + obj.offer.location.y,
      price: getRandom(MIN_PRICE, MAX_PRCIE),
      type: TYPE[getRandom(0, TYPE.length - 1)],
      rooms: getRandom(MIN_ROOM, MAX_ROOM),
      guests: getRandom(1, 1000),
      checkin: CHECK_TIME[getRandom(0, CHECK_TIME.length - 1)],
      checkout: CHECK_TIME[getRandom(0, CHECK_TIME.length - 1)],
      features: getRandStringsArr(),
      description: '',
      photos: PHOTOS.sort(compareRandom),
    },
    location: {
      x: getRandom(),
      y: getRandom(130, 630)
    }
  };
  return obj;

};

createObject();
