'use strict';
var mapActive = document.querySelector('.map');
mapActive.classList.remove('map--faded');

var rentCard = {
  author: {
    avatar: [
      'img/avatars/user01.png',
      'img/avatars/user02.png',
      'img/avatars/user03.png',
      'img/avatars/user04.png',
      'img/avatars/user05.png',
      'img/avatars/user06.png',
      'img/avatars/user07.png',
      'img/avatars/user08.png'
    ]
  },
  offer: {
    title: 'Большая уютная квартира',
    address: '{{location.x}}, {{location.y}}',
    price: 1000000,
    type: 'palace, flat, house или bungalo',
    rooms: 5,
    guests: 55555,
    checkin: '12: 00, 13: 00 или 14: 00',
    checkout: '12: 00, 13: 00 или 14: 00',
    features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
    description: 'пустая строка',
    photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg'],
  },
  location: {
    x: 100,
    y: 100
  }
};

var getCards = function (object) {
  return array;
};
