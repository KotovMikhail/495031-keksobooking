'use strict';

(function () {
  window.card = {
    createFragmentFeatures: function (facilities) {
      var fragmentFeatures = document.createDocumentFragment();
      for (var i = 0; i < facilities.length; i++) {
        var li = document.createElement('li');
        li.classList.add('popup__feature');
        var classAdded = 'popup__feature--' + facilities[i];
        li.classList.add(classAdded);
        fragmentFeatures.appendChild(li);
      }
      return fragmentFeatures;
    },

    createFragmentPhotos: function (pins) {
      var fragmentPhotos = document.createDocumentFragment();
      for (var i = 0; i < pins.length; i++) {
        var img = document.createElement('img');
        img.src = pins[i];
        img.width = 45;
        img.height = 40;
        img.classList.add('popup__photo');
        fragmentPhotos.appendChild(img);
      }
      return fragmentPhotos;
    },

    createPins: function (icons) {
      for (var i = 0; i < icons.length; i++) {
        var fragmentPins = document.createDocumentFragment();
        var pinElem = window.elements.pinTemplate.cloneNode(true);
        pinElem.children[0].src = icons[i].author.avatar;
        pinElem.dataset.id = i;
        pinElem.style.left = icons[i].location.x + 'px';
        pinElem.style.top = icons[i].location.y + 'px';
        pinElem.children[0].alt = icons[i].offer.title;
        fragmentPins.appendChild(pinElem);
        window.elements.mapPinList.appendChild(fragmentPins);
      }
    },

    getCardData: function (item) {
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
      cardItem.querySelector('.popup__type').textContent = window.TypesOfHouses[item.offer.type].translate;
      cardItem.querySelector('.popup__text--capacity').textContent = roomNum + roomPhrase + ' для ' + guestNum + guestPhrase;
      cardItem.querySelector('.popup__text--time').textContent = 'Заезд после ' + item.offer.checkin + ' выезд после ' + item.offer.checkout;
      var cardFeatures = cardItem.querySelector('.popup__features');
      cardFeatures.innerHTML = '';
      cardFeatures.appendChild(this.createFragmentFeatures(item.offer.features));
      cardItem.querySelector('.popup__description').textContent = item.offer.description;
      var cardPhotos = cardItem.querySelector('.popup__photos');
      cardPhotos.innerHTML = '';
      cardPhotos.appendChild(this.createFragmentPhotos(item.offer.photos));
      cardItem.querySelector('.popup__avatar').src = item.author.avatar;
      window.elements.mapSection.appendChild(cardItem);
      return cardItem;
    }
  };

})();
