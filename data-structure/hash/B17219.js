//비밀번호 찾기
const fs = require('fs');

const input = fs
  .readFileSync('../input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((item) => item.replace(/\r/, '').split(' '));

const [N, M] = input.shift().map((item) => +item);

let passwords = {};

for (let i = 0; i < N; i++) {
  let [site, password] = input[i];
  passwords[site] = password + '\n';
}

let output = '';

for (let i = N; i < input.length; i++) {
  output += passwords[input[i]];
}

console.log(output);
