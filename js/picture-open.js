import {data} from './pictures.js';
import {isEscapeKey, isEnterKey} from './utils.js';

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const bigPicureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
const bigPictureSocial = bigPicture.querySelector('.big-picture__social');
const bigPictureOpenElement = document.querySelector('.pictures');
const bigPictureCloseElement = bigPicture.querySelector('.big-picture__cancel');
const commentLoaderButton = bigPicture.querySelector('.social__comments-loader');
const socialComments = bigPicture.querySelector('.social__comments');
const COMMENTS_COUNT = 5;


const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};


function openBigPicture (pictureURL, pictureId, pictureLikesCount, pictureCommentsCount, pictureDescription, pictureCommentArr) {
  socialComments.innerHTML = '';
  bigPicureImg.src = pictureURL;
  bigPicureImg.id = pictureId;
  bigPictureSocial.querySelector('.likes-count').textContent = pictureLikesCount;
  bigPictureSocial.querySelector('.comments-count').textContent = pictureCommentsCount;
  bigPictureSocial.querySelector('.social__caption').textContent = pictureDescription;

  pictureCommentArr.forEach((item) => {
    const socialComment = document.createElement('li');
    socialComment.classList.add('social__comment');
    const socialImg = document.createElement('img');
    socialImg.classList.add('social__picture');
    socialImg.src = item.avatar;
    socialImg.alt = item.name;
    const socialText = document.createElement('p');
    socialText.classList.add('social__text');
    socialText.textContent = item.message;
    socialComment.appendChild(socialImg);
    socialComment.appendChild(socialText);
    socialComments.appendChild(socialComment);
  });

  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
}


commentLoaderButton.addEventListener('click', (evt) => {
  const commentsCountTotal = Number(evt.target.parentElement.querySelector('.comments-count').textContent);
  const pictureId = evt.target.parentElement.parentElement.querySelector('.big-picture__img').querySelector('img').id;
  const pictureObject = data.find((item) => item.id === Number(pictureId));
  const pictureCommentArr = pictureObject.comments.slice(0, COMMENTS_COUNT);
  pictureCommentArr.forEach((item) => {
    const socialComment = document.createElement('li');
    socialComment.classList.add('social__comment');
    const socialImg = document.createElement('img');
    socialImg.classList.add('social__picture');
    socialImg.src = item.avatar;
    socialImg.alt = item.name;
    const socialText = document.createElement('p');
    socialText.classList.add('social__text');
    socialText.textContent = item.message;
    socialComment.appendChild(socialImg);
    socialComment.appendChild(socialText);
    socialComments.appendChild(socialComment);
    evt.target.parentElement.querySelector('.shown__comments-count').textContent = socialComments.querySelectorAll('li').length;
    if (commentsCountTotal === Number(socialComments.querySelectorAll('li').length)) {
      commentLoaderButton.classList.add('hidden');
    }
  });
});

bigPictureOpenElement.addEventListener('click', (evt) => {
  const pictureURL = evt.target.src;
  const pictureId = evt.target.id;
  const pictures = bigPictureOpenElement.querySelectorAll('.picture');
  const pictureObject = data.find((item) => item.id === Number(pictureId));
  const pictureDescription = pictureObject.description;
  const pictureCommentArr = pictureObject.comments.slice(0, COMMENTS_COUNT);
  let pictureLikesCount;
  let pictureCommentsCount;
  for (const picture of pictures) {
    if (picture.querySelector('img').src === pictureURL) {
      pictureLikesCount = picture.querySelector('.picture__likes').textContent;
      pictureCommentsCount = picture.querySelector('.picture__comments').textContent;
    }
  }

  openBigPicture(pictureURL, pictureId, pictureLikesCount, pictureCommentsCount, pictureDescription, pictureCommentArr);
});

function closeBigPicture () {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  commentLoaderButton.classList.remove('hidden');
  bigPictureSocial.querySelector('.shown__comments-count').textContent = '5';
  socialComments.innerHTML = '';
  document.removeEventListener('keydown', onDocumentKeydown);
}

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
