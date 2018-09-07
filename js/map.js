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
var MIN_LOCATION_X = 100;
var MAX_LOCATION_X = 900;
var MIN_LOCATION_Y = 130;
var MAX_LOCATION_Y = 630;
var IMAGE_NUM_RANGE = [1, 2, 3, 4, 5, 6, 7, 8];

var getUnique = function (arr) {
  var uniqueEl = arr[getRandom(0, (arr.length))];
  arr.splice(arr.indexOf(uniqueEl), 1);
  return uniqueEl;
};

var getRandom = function (min, max) {
  return Math.floor(Math.random() * max + min);
};

var compareRandom = function () {
  return Math.random() - 0.5;
};

var createObject = function () {
  var locationX = getRandom(MIN_LOCATION_X, MAX_LOCATION_X);
  var locationY = getRandom(MIN_LOCATION_Y, MAX_LOCATION_Y);
  var obj = {
    author: {
      avatar: 'img/avatars/user0' + getUnique(IMAGE_NUM_RANGE) + '.png'
    },

    offer: {
      title: getUnique(TITLE),
      address: locationX + ', ' + locationY,
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

var createCardsArr = function () {
  var cards = [];
  for (var i = 0; i < COUNT_CARDS; i++) {
    cards.push(createObject(i));
  }
  return cards;
};

var objects = createCardsArr();


var mapPinList = document.querySelector('.map__pins'); //куда вставить метки
var pinTemplate = document.querySelector('#pin') //шаблон метки
  .content
  .querySelector('.map__pin');
var mapCard = document.querySelector('.map'); //куда вставить карточку
var cardTemplate = document.querySelector('#card') // шаблон карточки
  .content
  .querySelector('.map__card');

var createPins = function () {
  for (var i = 0; i < objects.length; i++) {
    var fragmentPins = document.createDocumentFragment();
    var pinElem = pinTemplate.cloneNode(true);
    pinElem.children[0].src = objects[i].author.avatar;
    pinElem.style.left = objects[i].location.x + 'px';
    pinElem.style.top = objects[i].location.y + 'px';
    pinElem.children[0].alt = objects[i].offer.title;
    fragmentPins.appendChild(pinElem);
    mapPinList.appendChild(fragmentPins);
  }
};

createPins(objects);

var createItem = function () {
  var cardItem = cardTemplate.cloneNode(true);
  mapCard.insertBefore(cardItem, mapPinList);
  cardItem.querySelector('.popup__title').textContent = objects[0].offer.title;
  cardItem.querySelector('.popup__text--address').textContent = objects[0].offer.address;
  cardItem.querySelector('.popup__text--price').innerHTML = objects[0].offer.price + '&#x20bd/ночь';

};

createItem(objects);
