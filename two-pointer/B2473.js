//세 용액
const fs = require('fs');

const [[N], arr] = fs
  .readFileSync('../input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((item) => item.split(' ').map(Number));

arr.sort((a, b) => a - b);

let result = [];
let min_abs = Infinity;

for (let left = 0; left < N - 2; left++) {
  let mid = left + 1;
  let right = N - 1;

  while (mid < right) {
    let sum = arr[left] + arr[mid] + arr[right];
    if (Math.abs(sum) < min_abs) {
      min_abs = Math.abs(sum);
      result = [arr[left], arr[mid], arr[right]];
    }

    if (sum > 0) {
      right--;
    } else {
      mid++;
    }
  }
}

console.log(result.join(' '));
