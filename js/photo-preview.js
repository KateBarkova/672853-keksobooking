'use strict';

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var PHOTO_WIDTH = 70;
  var PHOTO_HEIGHT = 70;
  var avatarChooser = document.querySelector('#avatar');
  var preview = document.querySelector('.ad-form-header__preview img');

  var onAvatarChange = function () {

    var file = avatarChooser.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (index) {
      return fileName.endsWith(index);
    });
    if (matches) {
      var reader = new FileReader();

      var onAvatarLoad = function () {
        preview.src = reader.result;
      };

      reader.addEventListener('load', onAvatarLoad);
      reader.readAsDataURL(file);
    }
  };

  var imageChooser = document.querySelector('#images');
  var previewContainer = document.querySelector('.ad-form__photo');
  var formUpload = document.querySelector('.ad-form__photo-container');

  var createDivContainer = function () {
    var container = document.createElement('div');
    container.classList.add('ad-form__photo');
    formUpload.appendChild(container);
    return container;
  }

  var createPhotoPreview = function (reader) {
    var photo = document.createElement('img');
    photo.classList.add('ad-form__img');
    photo.style.height = PHOTO_WIDTH + 'px';
    photo.style.height = PHOTO_HEIGHT + 'px';
    photo.src = reader.result;

    var photoPreview = document.querySelector('.ad-form__img');

    if (photoPreview) {
      var container = createDivContainer();
      container.appendChild(photo);
      addDragAndDrop();
    } else {
      previewContainer.appendChild(photo);
    }
  }

  var onImagesChange = function () {

    var file = imageChooser.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (index) {
      return fileName.endsWith(index);
    });
    if (matches) {
      var reader = new FileReader();

      var onPhotoLoad = function () {
        createPhotoPreview(reader);
      };

      reader.addEventListener('load', onPhotoLoad);
      reader.readAsDataURL(file);
    }
  };

  var removePreview = function () {
    preview.src = 'img/muffin-grey.svg';
    var photosContainer = formUpload.querySelectorAll('.ad-form__photo');
    Object.keys(photosContainer).forEach(function (index) {
      photosContainer[index].remove();
    });
    createDivContainer();
  };

  var dragSourceElement = null;

  var onPhotoDragStart = function (event) {
    dragSourceElement = event.currentTarget;
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/html', event.currentTarget.innerHTML);
  }

  var onPhotoDrop = function (event) {
    if (event.stopPropagation) {
      event.stopPropagation();
    }

    if (dragSourceElement !== event.currentTarget) {
      dragSourceElement.innerHTML = event.currentTarget.innerHTML;
      event.currentTarget.innerHTML = event.dataTransfer.getData('text/html');
      event.currentTarget.classList.remove('outline');
    }

    return false;
  }

  var onPhotoDragEnter = function (event) {
    event.currentTarget.classList.add('outline');
  }

  var onPhotoDragOver = function (event) {
    if (event.preventDefault) {
      event.preventDefault();
    }
    event.dataTransfer.dropEffect = 'move';

    return false;
  }

  var onPhotoDragLeave = function (event) {
    event.currentTarget.classList.remove('outline');
  }

  var addDragAndDrop = function () {
    var photos = formUpload.querySelectorAll('.ad-form__photo');
    Object.keys(photos).forEach(function (index) {
      photos[index].draggable = true;
      photos[index].addEventListener('dragstart', onPhotoDragStart, false);
      photos[index].addEventListener('dragenter', onPhotoDragEnter, false);
      photos[index].addEventListener('dragover', onPhotoDragOver, false);
      photos[index].addEventListener('dragleave', onPhotoDragLeave, false);
      photos[index].addEventListener('drop', onPhotoDrop, false);
    });
  }

  window.photoPreview = {
    add: function () {
      avatarChooser.addEventListener('change', onAvatarChange);
      imageChooser.addEventListener('change', onImagesChange);
    },

    remove: function () {
      avatarChooser.removeEventListener('change', onAvatarChange);
      imageChooser.removeEventListener('change', onImagesChange);
      removePreview();
    }
  };

})();
