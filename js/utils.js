import {descriptionVariables} from './data.js';

const MAGIC_NUMBER = 25;

const makeId = Array.from({length: MAGIC_NUMBER}, (_, i) => i + 1);

const makeUrl = () => {
  const urlArray = [];
  for (let i = 1; i <= MAGIC_NUMBER; i++) {
    urlArray.push(`photos/${i}.jpg`);
  }
  return urlArray;
};

const makeDescription = (length) => {
  const descriptionArray = [];
  for (let i = 1; i <= MAGIC_NUMBER; i++) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    if (!descriptionArray.includes(result)) {
      descriptionArray.push(result);
    }
  }
  return descriptionArray;
};

const makeLikes = () => {
  const minLikes = 15;
  const maxLikes = 200;
  const likesArray = [];
  for (let i = 1; i <= MAGIC_NUMBER; i++) {
    likesArray.push(Math.floor(Math.random() * (maxLikes - minLikes + 1) + minLikes));
  }
  return likesArray;
};

const makeCommentsIds = () => {
  const commentsIdArray = [];
  while(commentsIdArray.length < MAGIC_NUMBER){
    const r = Math.floor(Math.random() * 100) + 1;
    if(commentsIdArray.indexOf(r) === -1) {
      commentsIdArray.push(r);
    }
  }
  return commentsIdArray;
};

const makeCommentsAvatar = () => {
  const commentsAvatarArray = [];
  for (let i = 1; i <= 6; i++) {
    commentsAvatarArray.push(`img/avatar-${i}.svg`);
  }
  return commentsAvatarArray;
};

const makeCommentsMessage = (desc) => {
  const commentsMessageArray = [];
  for (let i = 1; i <= MAGIC_NUMBER; i++) {
    commentsMessageArray.push(desc[Math.floor(Math.random() * (desc.length))]);
  }
  return commentsMessageArray;
};

const makeCommentsName = (length) => {
  const namesArray = [];
  for (let i = 1; i <= MAGIC_NUMBER; i++) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    if (!namesArray.includes(result)) {
      namesArray.push(result);
    }
  }
  return namesArray;
};

const generatedArray = (idArray) => {
  const newArray = [];
  const ids = idArray;
  const url = makeUrl();
  const likes = makeLikes();
  const description = makeDescription(13);
  const commentId = makeCommentsIds();
  const commentAvatar = makeCommentsAvatar();
  const commentMessage = makeCommentsMessage(descriptionVariables);
  const commentName = makeCommentsName(7);
  for (let i = 0; i < MAGIC_NUMBER; i++) {
    newArray.push({'id' : ids[i],
      'url': url[i],
      'description': description[i],
      'likes': likes[i],
      'comments': {
        'id': commentId[i],
        'avatar': commentAvatar[Math.floor(Math.random() * commentAvatar.length)],
        'message': commentMessage[i],
        'name': commentName[i]
      }
    });
  }
  return newArray;
};

export {generatedArray, makeId};
