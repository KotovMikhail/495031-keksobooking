'use strict';

(function () {

  var imgChooser = window.elements.mapForm.querySelectorAll('input[type=file]');
  var photoForm = window.elements.photoContainer.querySelector('.ad-form__photo');

  var createImg = function (tagname, res) {
    var imgElement = document.createElement(tagname);
    imgElement.src = res;
    imgElement.style.width = '70px';
    imgElement.style.height = '70px';
    return imgElement;
  };

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

        if (fileChooser === imgChooser[0]) {
          window.elements.previewContainer.src = result;
        } else if (!photoForm.hasChildNodes()) {
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

  window.elements.mapForm.addEventListener('change', onLoadChange);
})();
