'use strict';
var map = document.querySelector('.map');
map.classList.remove('map--faded');

var COUNT_CARDS = 8;
var TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var TYPE = ['palace', 'flat', 'house', 'bungalo'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var CHECK_TIME = ['12:00', '13:00', '14:00'];
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var MIN_ROOM = 1;
var MAX_ROOM = 5;
var MIN_LOCATION_X = 300;
var MAX_LOCATION_X = 900;
var MIN_LOCATION_Y = 130;
var MAX_LOCATION_Y = 630;
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

var locationX = getRandom(MIN_LOCATION_X, MAX_LOCATION_X);
var locationY = getRandom(MIN_LOCATION_Y, MAX_LOCATION_Y);

var createObject = function () {
  var obj = {
    author: {
      avatar: 'img/avatars/user0' + getUnique(IMAGE_NUM_RANGE) + '.png'
    },

    offer: {
      title: getUnique(TITLE),
      address: locationX + locationY,
      price: getRandom(MIN_PRICE, MAX_PRICE),
      type: TYPE[getRandom(0, TYPE.length - 1)],
      rooms: getRandom(MIN_ROOM, MAX_ROOM),
      guests: getRandom(1, 100),
      checkin: CHECK_TIME[getRandom(0, CHECK_TIME.length - 1)],
      checkout: CHECK_TIME[getRandom(0, CHECK_TIME.length - 1)],
      features: getRandom(1, FEATURES.length),
      description: '',
      photos: PHOTOS.sort(compareRandom),
    },
    location: {
      x: locationX,
      y: locationY
    }
  };
  return obj;
};

createObject();

var createCards = function () {
  var cards = [];

  for (var i = 0; i < COUNT_CARDS; i++) {
    cards.push(createObject(i));
  }

  return cards;

};

console.log(createCards(createObject));
