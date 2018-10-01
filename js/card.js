'use strict';
// создаёт карточку и экспротирует её в show-card.js
(function () {

  var createFragmentFeatures = function (facilities) {
    var fragmentFeatures = document.createDocumentFragment();
    for (var i = 0; i < facilities.length; i++) {
      var li = document.createElement('li');
      li.classList.add('popup__feature');
      var classAdded = 'popup__feature--' + facilities[i];
      li.classList.add(classAdded);
      fragmentFeatures.appendChild(li);
    }
    return fragmentFeatures;
  };

  var createFragmentPhotos = function (pins) {
    var fragmentPhotos = document.createDocumentFragment();
    for (var i = 0; i < pins.length; i++) {
      var img = document.createElement('img');
      img.src = pins[i];
      img.width = window.constants.AVATAR_WIDTH;
      img.height = window.constants.AVATAR_HEIGHT;
      img.classList.add('popup__photo');
      fragmentPhotos.appendChild(img);
    }
    return fragmentPhotos;
  };

  window.getCardData = function (item) {
    var cardItem = window.elements.cardTemplate.cloneNode(true);
    var roomPhrase = ' комнат для ';
    var roomNum = item.offer.rooms;
    var guestNum = item.offer.guests;
    var guestPhrase = guestNum === 1 ? ' гостя' : ' гостей';

    if (roomNum === 1) {
      roomPhrase = ' комната для ';
    } else if (roomNum > 1 && roomNum < 5) {
      roomPhrase = ' комнаты для ';
    }

    cardItem.querySelector('.popup__title').textContent = item.offer.title;
    cardItem.querySelector('.popup__text--address').textContent = item.offer.address;
    cardItem.querySelector('.popup__text--price').textContent = item.offer.price + '\u20BD' + '/ночь';
    cardItem.querySelector('.popup__type').textContent = window.constants.TypesOfHouses[item.offer.type].translate;
    cardItem.querySelector('.popup__text--capacity').textContent = roomNum + roomPhrase + ' для ' + guestNum + guestPhrase;
    cardItem.querySelector('.popup__text--time').textContent = 'Заезд после ' + item.offer.checkin + ' выезд после ' + item.offer.checkout;
    var cardFeatures = cardItem.querySelector('.popup__features');
    cardFeatures.innerHTML = '';
    cardFeatures.appendChild(createFragmentFeatures(item.offer.features));
    cardItem.querySelector('.popup__description').textContent = item.offer.description;
    var cardPhotos = cardItem.querySelector('.popup__photos');
    cardPhotos.innerHTML = '';
    cardPhotos.appendChild(createFragmentPhotos(item.offer.photos));
    cardItem.querySelector('.popup__avatar').src = item.author.avatar;
    return cardItem;
  };

})();
