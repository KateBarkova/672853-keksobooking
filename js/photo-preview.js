'use strict';

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var avatarChooser = document.querySelector('#avatar');
  var preview = document.querySelector('.ad-form-header__preview img');

  var onAvatarChange = function () {

    var file = avatarChooser.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
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

  function createDivContainer() {
    var container = document.createElement('div');
    container.classList.add('ad-form__photo');
    formUpload.appendChild(container);
    return container;
  }

  function createPhotoPreview(reader) {
    var photo = document.createElement('img');
    photo.classList.add('ad-form__img');
    photo.height = '70';
    photo.width = '70';
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
    var matches = FILE_TYPES.some(function (i) {
      return fileName.endsWith(i);
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
    Object.keys(photosContainer).forEach(function (it) {
      photosContainer[it].remove();
    });
    createDivContainer();
  };

  var dragSrcEl = null;

  function onPhotoDragStart(evt) {
    dragSrcEl = evt.currentTarget;
    evt.dataTransfer.effectAllowed = 'move';
    evt.dataTransfer.setData('text/html', evt.currentTarget.innerHTML);
  }

  function onPhotoDrop(evt) {
    if (evt.stopPropagation) {
      evt.stopPropagation();
    }

    if (dragSrcEl !== evt.currentTarget) {
      dragSrcEl.innerHTML = evt.currentTarget.innerHTML;
      evt.currentTarget.innerHTML = evt.dataTransfer.getData('text/html');
      evt.currentTarget.classList.remove('over');
    }

    return false;
  }

  function onPhotoDragEnter(evt) {
    evt.currentTarget.classList.add('over');
  }

  function onPhotoDragOver(evt) {
    if (evt.preventDefault) {
      evt.preventDefault();
    }
    evt.dataTransfer.dropEffect = 'move';

    return false;
  }

  function onPhotoDragLeave(evt) {
    evt.currentTarget.classList.remove('over');
  }

  function addDragAndDrop() {
    var photos = formUpload.querySelectorAll('.ad-form__photo');
    Object.keys(photos).forEach(function (i) {
      photos[i].draggable = true;
      photos[i].addEventListener('dragstart', onPhotoDragStart, false);
      photos[i].addEventListener('dragenter', onPhotoDragEnter, false);
      photos[i].addEventListener('dragover', onPhotoDragOver, false);
      photos[i].addEventListener('dragleave', onPhotoDragLeave, false);
      photos[i].addEventListener('drop', onPhotoDrop, false);
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
