'use strict';
var map = document.querySelector('.map');
map.classList.remove('map--faded');

var COUNT_CARDS = 8;
var TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var DESCRIPTION = 'Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.';
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

var getRandomFeatures = function (array) {
  array.length = getRandom(1, array.length);
  return array;
};

var featuresArr = getRandomFeatures(FEATURES);

var createObject = function () {
  var cardsArray = [];

  for (var i = 0; i < COUNT_CARDS; i++) {
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
        type: TYPE[getRandom(0, TYPE.length)],
        rooms: getRandom(MIN_ROOM, MAX_ROOM),
        guests: getRandom(1, 10),
        checkin: CHECK_TIME[getRandom(0, CHECK_TIME.length)],
        checkout: CHECK_TIME[getRandom(0, CHECK_TIME.length)],
        features: featuresArr,
        description: DESCRIPTION,
        photos: PHOTOS.sort(compareRandom),
      },
      location: {
        x: locationX,
        y: locationY
      }
    };
    cardsArray.push(obj);
  }

  return cardsArray;
};

var objects = createObject();

var createFragmentFeatures = function (array) {
  var fragmentFeatures = document.createDocumentFragment(array);
  for (var i = 0; i < array.length; i++) {
    var li = document.createElement('li');
    li.classList.add('popup__feature');
    var classAdded = 'popup__feature--' + array[i];
    li.classList.add(classAdded);
    fragmentFeatures.appendChild(li);
  }
  return fragmentFeatures;
};

var createFragmentPhotos = function (array) {
  var fragmentPhotos = document.createDocumentFragment(array);
  for (var i = 0; i < array.length; i++) {
    var img = document.createElement('img');
    img.src = array[i];
    img.width = 45;
    img.height = 40;
    img.classList.add('popup__photo');
    fragmentPhotos.appendChild(img);
  }
  return fragmentPhotos;
};

var mapPinList = document.querySelector('.map__pins'); // куда вставить метки
var pinTemplate = document.querySelector('#pin') // шаблон метки
  .content
  .querySelector('.map__pin');
var mapCard = document.querySelector('.map'); // куда вставить карточку
var cardTemplate = document.querySelector('#card') // шаблон карточки
  .content
  .querySelector('.map__card');

var createPins = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    var fragmentPins = document.createDocumentFragment();
    var pinElem = pinTemplate.cloneNode(true);
    pinElem.children[0].src = arr[i].author.avatar;
    pinElem.style.left = arr[i].location.x + 'px';
    pinElem.style.top = arr[i].location.y + 'px';
    pinElem.children[0].alt = arr[i].offer.title;
    fragmentPins.appendChild(pinElem);
    mapPinList.appendChild(fragmentPins);
  }
};

createPins(objects);

var createItem = function (arr) {
  var fragmentCard = document.createDocumentFragment();
  var cardItem = cardTemplate.cloneNode(true);
  for (var i = 0; i < arr.length; i++) {
    var room = arr[i].offer.rooms;
    var guest = arr[i].offer.guests;
    mapCard.insertBefore(cardItem, mapPinList);
    cardItem.querySelector('.popup__title').textContent = arr[i].offer.title;
    cardItem.querySelector('.popup__text--address').textContent = arr[i].offer.address;
    cardItem.querySelector('.popup__text--price').innerHTML = arr[i].offer.price + '&#x20bd/ночь';
    if (arr[i].offer.type === 'flat') {
      cardItem.querySelector('.popup__type').textContent = 'Квартира';
    } else if (arr[i].offer.type === 'bungalo') {
      cardItem.querySelector('.popup__type').textContent = 'Бунгало';
    } else if (arr[i].offer.type === 'house') {
      cardItem.querySelector('.popup__type').textContent = 'Дом';
    } else {
      cardItem.querySelector('.popup__type').textContent = 'Дворец';
    }

    if (room === 1 && guest === 1) {
      cardItem.querySelector('.popup__text--capacity').textContent = room + ' комната для ' + guest + ' гостя';
    } else if (room === 1 && guest >= 2) {
      cardItem.querySelector('.popup__text--capacity').textContent = room + ' комната для ' + guest + ' гостей';
    } else if (room === 2 && guest >= 2) {
      cardItem.querySelector('.popup__text--capacity').textContent = room + ' комнаты для ' + guest + ' гостей';
    } else if (room === 3 && guest >= 2) {
      cardItem.querySelector('.popup__text--capacity').textContent = room + ' комнаты для ' + guest + ' гостей';
    }

    cardItem.querySelector('.popup__text--time').textContent = 'Заезд после ' + arr[i].offer.checkin + ' выезд после ' + arr[i].offer.checkout;

    var cardFeatures = cardItem.querySelector('.popup__features');
    cardFeatures.innerHTML = '';
    cardFeatures.appendChild(createFragmentFeatures(arr[i].offer.features));
    cardItem.querySelector('.popup__description').textContent = arr[i].offer.description;
    var cardPhotos = cardItem.querySelector('.popup__photos');
    cardPhotos.innerHTML = '';
    cardPhotos.appendChild(createFragmentPhotos(arr[i].offer.photos));
    cardItem.querySelector('.popup__avatar').src = arr[i].author.avatar;

    fragmentCard.appendChild(cardItem);
    mapCard.appendChild(fragmentCard);
  }
};

createItem(objects);
