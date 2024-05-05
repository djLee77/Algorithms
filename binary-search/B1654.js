//랜선 자르기
const fs = require('fs');

let input = +fs.readFileSync('../input.txt').toString().trim();

let num = 1n;

for (let i = 1n; i <= input; i++) {
  num *= i;
}

let str = num.toString().replace('n', '');

let cnt = 0;

for (let i = str.length - 1; i >= 0; i--) {
  if (str[i] === '0') {
    cnt++;
  } else {
    break;
  }
}

console.log(cnt);
