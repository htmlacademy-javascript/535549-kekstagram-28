import {data} from './pictures.js';
import {isEscapeKey, isEnterKey} from './utils.js';

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const bigPictureOpenElement = document.querySelector('.pictures');
const bigPictureCloseElement = bigPicture.querySelector('.big-picture__cancel');
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

function openBigPicture (pictureURL, pictureLikesCount, pictureCommentsCount, pictureDescription, pictureCommentArr) {
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = pictureURL;
  bigPicture.querySelector('.big-picture__social').querySelector('.likes-count').textContent = pictureLikesCount;
  bigPicture.querySelector('.big-picture__social').querySelector('.comments-count').textContent = pictureCommentsCount;
  bigPicture.querySelector('.big-picture__social').querySelector('.social__caption').textContent = pictureDescription;
  const socialComments = bigPicture.querySelector('.social__comments').cloneNode(true);
  bigPicture.querySelector('.social__comments').replaceChildren();
  const socialComment = socialComments.querySelector('.social__comment');
  pictureCommentArr.forEach((item) => {
    socialComment.querySelector('img').src = item.avatar;
    socialComment.querySelector('img').alt = item.name;
    socialComment.querySelector('p').textContent = item.message;
    bigPicture.querySelector('.social__comments').appendChild(socialComment);
  });

  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
}
function closeBigPicture () {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

bigPictureOpenElement.addEventListener('click', (evt) => {
  const pictureURL = evt.target.src;
  const pictureId = evt.target.id;
  const pictures = bigPictureOpenElement.querySelectorAll('.picture');

  const pictureObject = data.find((item) => item.id === Number(pictureId));
  const pictureDescription = pictureObject.description;
  const pictureCommentArr = pictureObject.comments;
  let pictureLikesCount;
  let pictureCommentsCount;
  for (const picture of pictures) {
    if (picture.querySelector('img').src === pictureURL) {
      pictureLikesCount = picture.querySelector('.picture__likes').textContent;
      pictureCommentsCount = picture.querySelector('.picture__comments').textContent;
    }
  }
  const commentsCount = bigPicture.querySelector('.social__comment-count');
  commentsCount.classList.add('hidden');

  openBigPicture(pictureURL, pictureLikesCount, pictureCommentsCount, pictureDescription, pictureCommentArr);
});

bigPictureOpenElement.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    openBigPicture();
  }
});

bigPictureCloseElement.addEventListener('click', () => {
  closeBigPicture();
});

bigPictureCloseElement.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    closeBigPicture();
  }
});

export {openBigPicture, closeBigPicture, bigPictureOpenElement, bigPictureCloseElement};
