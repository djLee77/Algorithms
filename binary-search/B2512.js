const fs = require('fs');

const [[N], arr, [budget]] = fs
  .readFileSync('../input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((item) => item.split(' ').map((v) => +v));

arr.sort((a, b) => a - b);

let min = Math.floor(budget / N);
let max = arr[arr.length - 1];
let mid = Math.floor((min + max) / 2);
let bestMax = 0;

while (min <= max) {
  let sum = 0;
  mid = Math.floor((min + max) / 2);

  arr.forEach((b) => {
    if (b <= mid) {
      sum += b;
    } else {
      sum += mid;
    }
  });

  if (sum > budget) {
    max = mid - 1;
  } else {
    bestMax = mid;
    min = mid + 1;
  }
}

console.log(bestMax);
