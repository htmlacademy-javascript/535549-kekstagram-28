import {generatedArray, makeId} from './utils.js';

const data = generatedArray(makeId);
const pictures = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderPictures = () => {
  const picturesFragment = document.createDocumentFragment();

  data.forEach((picture) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').id = picture.id;
    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
    picturesFragment.appendChild(pictureElement);
  });
  pictures.appendChild(picturesFragment);
};

renderPictures();

export {pictures, renderPictures, data};
