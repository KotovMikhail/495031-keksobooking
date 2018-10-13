'use strict';

(function () {
  window.constants = {
    CHECK_TIMES: ['12:00', '13:00', '14:00'],
    MIN_PRICE: 1000,
    MAX_PRICE: 1000000,
    MIN_ROOM: 1,
    MAX_ROOM: 5,
    MIN_GUESTS: 1,
    MAX_GUESTS: 5,
    MIN_LOCATION_Y: 100,
    MAX_LOCATION_Y: 630,
    PIN_HEIGHT: 65,
    PIN_WIDTH: 65,
    PIN_ARROW_HEIGHT: 22,
    MAP_PIN_ACTIVE_CLASS: 'map__pin--active',
    CHECKED_FEATURE: 'input[type=checkbox]:checked',
    MAFFIN_GREY_SRC: 'img/muffin-grey.svg',
    ESC_KEYCODE: 27,
    AVATAR_WIDTH: 45,
    AVATAR_HEIGHT: 40,
    TIMEOUT: 10000,
    PIN_TOP_COORD: 375,
    PIN_LEFT_COORD: 570,
    CAPACITY_SELECTED: 2,
    ROOM_SELECTED: 0,
    DEBOUNCE_INTERVAL: 500,
    FILE_TYPES: ['gif', 'jpg', 'jpeg', 'png'],
    SUCCESS_REQ: 200,
    FAILED_REQ: 400,
    BAD_REQ: 404,
    URL_GET: 'https://js.dump.academy/keksobooking/data',
    URL_POST: 'https://js.dump.academy/keksobooking',
    MIN_OFFER_PRICE: 10000,
    MAX_OFFER_PRICE: 50000,
    MAX_QUANTITY_PINS: 5,
    RUBLE_SYMBOL: '\u20BD',
    TypesOfHouses: {
      'bungalo': {
        min: 0,
        placeholder: '0',
        translate: 'Бунгало'
      },
      'flat': {
        min: 1000,
        placeholder: '1000',
        translate: 'Квартира'
      },
      'house': {
        min: 5000,
        placeholder: '5000',
        translate: 'Дом'
      },
      'palace': {
        min: 10000,
        placeholder: '10000',
        translate: 'Дворец'
      }
    },
    Rooms: {
      1: {
        enabled: ['1'],
        textError: 'не более одного гостя'
      },
      2: {
        enabled: ['1', '2'],
        textError: 'не более одного или двух гостей'
      },
      3: {
        enabled: ['1', '2', '3'],
        textError: 'не более одного, двух или трёх гостей'
      },
      100: {
        enabled: ['0'],
        textError: 'не для гостей'
      }
    },
    Phrases: {
      any: 'any',
      low: 'low',
      middle: 'middle',
      high: 'high',
      arrivalLater: 'Заезд после ',
      departureLater: ' выезд после ',
      guest: ' гостя',
      guests: ' гостей',
      roomForOne: ' комната для ',
      roomMoreThenOne: ' комнаты для ',
      roomMoreThenFive: ' комнат для '

    }

  };

})();
