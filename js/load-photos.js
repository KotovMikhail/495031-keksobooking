'use strict';

(function () {

  var avatarChooser = window.elements.avatarContainer.querySelector('input[type=file]');
  var photoChooser = window.elements.photoContainer.querySelector('input[type=file]');
  var photoForm = window.elements.photoContainer.querySelector('.ad-form__photo');

  var createImg = function (tagName, resultReader) {
    var imgElement = document.createElement(tagName);
    imgElement.src = resultReader;
    imgElement.style.width = '70px';
    imgElement.style.height = '70px';
    return imgElement;
  };


  var checkFileType = function (name) {
    return window.constants.FILE_TYPES.some(function (it) {
      return name.endsWith(it);
    });
  };

  var onAvatarLoad = function (evt) {
    var fileChooser = evt.target;
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    if (checkFileType(fileName)) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var result = reader.result;
        window.elements.previewContainer.src = result;
      });
      reader.readAsDataURL(file);
    }
  };

  var onPhotoLoad = function (evt) {
    var fileChooser = evt.target;
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    if (checkFileType(fileName)) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var result = reader.result;

        if (!photoForm.hasChildNodes()) {
          photoForm.appendChild(createImg('img', result));
        } else {
          var divElement = document.createElement('div');
          divElement.classList.add('ad-form__photo');
          divElement.appendChild(createImg('img', result));
          window.elements.photoContainer.appendChild(divElement);
        }
      });
      reader.readAsDataURL(file);
    }
  };


  avatarChooser.addEventListener('change', onAvatarLoad);
  photoChooser.addEventListener('change', onPhotoLoad);
})();
