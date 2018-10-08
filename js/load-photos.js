'use strict';

(function () {

  var avatarChooser = window.elements.avatarContainer.querySelector('input[type=file]');
  var photoChooser = window.elements.photoContainer.querySelector('input[type=file]');
  var photoForm = window.elements.photoContainer.querySelector('.ad-form__photo');

  var onLoadChange = function (evt) {

    var fileChooser = evt.target;
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = window.constants.FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var result = reader.result;

        if (fileChooser === avatarChooser) {
          window.elements.previewContainer.src = result;
        } else {
          var imgElement = document.createElement('img');
          imgElement.src = result;
          imgElement.style.width = '70px';
          imgElement.style.height = '70px';
          photoForm.appendChild(imgElement);
        }

      });
      reader.readAsDataURL(file);
    }
  };

  avatarChooser.addEventListener('change', onLoadChange);
  photoChooser.addEventListener('change', onLoadChange);
})();
