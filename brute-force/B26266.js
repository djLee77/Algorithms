//비즈네르 암호 해독
const fs = require('fs');

const [str, code] = fs
  .readFileSync('../input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((item) => item.replace(/\r/, ''));

let key = [];

for (let i = 0; i < str.length; i++) {
  let elementOfKey = (code.charCodeAt(i) - str.charCodeAt(i) + 26) % 26;
  if (elementOfKey === 0) elementOfKey = 26; // Z를 0이 아니라 26으로 매핑
  key.push(String.fromCharCode(elementOfKey + 64));
}

function findSmallestRepeatKey(key) {
  const keyLength = key.length;
  for (let i = 1; i <= keyLength; i++) {
    if (keyLength % i === 0) {
      // i가 keyLength의 약수인 경우만 검사
      let pattern = key.slice(0, i).join('');
      let repeatedPattern = new Array(keyLength / i).fill(pattern).join('');
      if (repeatedPattern === key.join('')) {
        return pattern; // 가장 짧은 패턴을 반환
      }
    }
  }
  return key.join(''); // 전체 키가 패턴인 경우
}

let smallestKey = findSmallestRepeatKey(key);
console.log(smallestKey);
