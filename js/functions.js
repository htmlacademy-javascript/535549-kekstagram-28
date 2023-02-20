function checkStringLength(sourceString, stringLength) {
  return sourceString.length >= stringLength;
}

function reverseString(sourceString) {
  const cutSpaces = sourceString.replace(/\s/g,'').toLowerCase();
  return cutSpaces === Array.from(cutSpaces).reverse().join('');
}

function extractNumbers(sourseString) {
  return parseInt(sourseString.toString().replace(/\D+/gi, ''), 10);
}

const myPad = (source, count, addition) => {
  if (source.length >= count) {
    return source;
  }
  const preffixLength = count - source.length;
  const sample = addition;
  addition = '';
  while (addition.length < preffixLength - sample.length) {
    addition += sample;
  }
  return sample.slice(0, preffixLength - addition.length) + addition + source;
};

checkStringLength('kek', 2);
reverseString('Лёша на полке клопа нашёл ');
extractNumbers(-15.4);
myPad('q', 4, 'we');
