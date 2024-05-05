//잃어버린 괄호
const fs = require('fs');

const input = fs
  .readFileSync('../input.txt')
  .toString()
  .trim()
  .replace(/\r/, '');

const nums = input.split('-').map((item) =>
  item
    .split('+')
    .map((item) => +item)
    .reduce((a, c) => a + c, 0)
);

let t = nums.shift();

console.log(nums.reduce((a, c) => a - c, t));
