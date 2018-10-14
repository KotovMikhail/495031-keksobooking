'use strict';

(function () {

  var createFragmentFeatures = function (facilities) {
    var fragmentFeatures = document.createDocumentFragment();
    facilities.forEach(function (elem) {
      var li = document.createElement('li');
      li.classList.add('popup__feature');
      var classAdded = 'popup__feature--' + elem;
      li.classList.add(classAdded);
      fragmentFeatures.appendChild(li);
    });
    return fragmentFeatures;
  };

  var createFragmentPhotos = function (photos) {
    var fragmentPhotos = document.createDocumentFragment();
    photos.forEach(function (photo) {
      var img = document.createElement('img');
      img.src = photo;
      img.width = window.constants.AVATAR_WIDTH;
      img.height = window.constants.AVATAR_HEIGHT;
      img.classList.add('popup__photo');
      fragmentPhotos.appendChild(img);
    });
    return fragmentPhotos;
  };

  window.card = {
    getCardData: function (item) {
      var cardItem = window.elements.cardTemplate.cloneNode(true);
      var roomPhrase = window.constants.Phrases.ROOM_MORE_THEN_FIVE;
      var roomNum = item.offer.rooms;
      var guestNum = item.offer.guests;
      var guestPhrase = guestNum === window.constants.MIN_GUESTS ? window.constants.Phrases.GUEST : window.constants.Phrases.GUESTS;

      if (roomNum === window.constants.MIN_ROOM) {
        roomPhrase = window.constants.Phrases.ROOM_FOR_ONE;
      } else if (roomNum > window.constants.MIN_ROOM && roomNum < window.constants.MAX_ROOM) {
        roomPhrase = window.constants.Phrases.ROOM_MORE_THEN_ONE;
      }

      cardItem.querySelector('.popup__title').textContent = item.offer.title;
      cardItem.querySelector('.popup__text--address').textContent = item.offer.address;
      cardItem.querySelector('.popup__text--price').textContent = item.offer.price + window.constants.RUBLE_SYMBOL + '/ночь';
      cardItem.querySelector('.popup__type').textContent = window.constants.TypesOfHouses[item.offer.type].translate;
      if (item.offer.guests === 0) {
        cardItem.querySelector('.popup__text--capacity').remove();
      } else {
        cardItem.querySelector('.popup__text--capacity').textContent = roomNum + roomPhrase + '' + guestNum + guestPhrase;
      }

      cardItem.querySelector('.popup__text--time').textContent = window.constants.Phrases.ARRIVAL_LATER + item.offer.checkin + window.constants.Phrases.DEPARTURE_LATER + item.offer.checkout;

      var cardFeatures = cardItem.querySelector('.popup__features');
      if (item.offer.features.length === 0) {
        cardFeatures.remove();
      }
      cardFeatures.innerHTML = '';
      cardFeatures.appendChild(createFragmentFeatures(item.offer.features));
      cardItem.querySelector('.popup__description').textContent = item.offer.description;
      var cardPhotos = cardItem.querySelector('.popup__photos');
      if (item.offer.photos.length === 0) {
        cardPhotos.remove();
      }
      cardPhotos.innerHTML = '';
      cardPhotos.appendChild(createFragmentPhotos(item.offer.photos));
      cardItem.querySelector('.popup__avatar').src = item.author.avatar;
      return cardItem;
    }
  };


})();
