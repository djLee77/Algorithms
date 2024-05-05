//수 찾기
const fs = require('fs');

const input = fs
  .readFileSync('../input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((item) => item.split(' ').map((item) => Number(item)));

const N = input[1];
const M = input[3];
const nums = new Array(11).fill(0);

for (let i = 0; i < N.length; i++) {
  nums[N[i]] = 1;
}

let str = '';

for (let i = 0; i < M.length; i++) {
  if (nums[M[i]]) {
    str += 1 + '\n';
  } else {
    str += 0 + '\n';
  }
}

console.log(str);
