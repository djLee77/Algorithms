//부분수열의 합 2
const fs = require('fs');

const [[N, S], sequence] = fs
  .readFileSync('../input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((item) => item.split(' ').map((v) => +v));

let cnt = 0;
let left_sums = [];

const left = (sum, index) => {
  if (index === Math.round(N / 2)) {
    left_sums[sum] ? left_sums[sum]++ : (left_sums[sum] = 1);
    return;
  }

  left(sum, index + 1);
  left(sum + sequence[index], index + 1);
};

const right = (sum, index) => {
  if (index === N) {
    if (left_sums[S - sum] >= 1) {
      cnt += left_sums[S - sum];
    }
    return;
  }

  right(sum, index + 1);
  right(sum + sequence[index], index + 1);
};

left(0, 0);
right(0, Math.round(N / 2));

console.log(S === 0 ? cnt - 1 : cnt);
