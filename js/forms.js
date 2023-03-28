const uploadForm = document.querySelector('.img-upload__form');
const hashtagElement = document.querySelector('.text__hashtags');

const regexp = /^#[a-zа-яё0-9]{1,19}$/i;
const pristine = new Pristine(uploadForm);

const defaultConfig = {
  classTo: 'text__hashtags',
  errorTextClass: 'text__hashtags'
};

uploadForm.addEventListener('submit', (evt) => {
  if (!pristine.validate(defaultConfig)) {
    evt.preventDefault();
  }
  if (regexp.test(hashtagElement.value)) {
    evt.preventDefault();
  }
});

const uploadButton = document.querySelector('#upload-file');
const uploadCloseButton = document.querySelector('#upload-cancel');

uploadButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  uploadForm.querySelector('.img-upload__overlay').classList.remove('hidden');
});

uploadCloseButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  uploadForm.querySelector('.img-upload__overlay').classList.add('hidden');
});


export {uploadForm};
