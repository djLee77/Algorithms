//수열
const fs = require('fs');

const input = fs
  .readFileSync('../input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((item) => item.split(' ').map((v) => Number(v)));

const [n, k] = input.shift();
const [arr] = input;

let sums = [];
let sum = 0;
let start_index = 0;

for (let i = 0; i < arr.length; i++) {
  if (i < k - 1) {
    sum += arr[i];
  } else if (i == k - 1) {
    sum += arr[i];
    sums.push(sum);
  } else if (i > k - 1) {
    sum = sum - arr[start_index++] + arr[i];
    sums.push(sum);
  }
}

console.log(Math.max(...sums));
