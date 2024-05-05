//K번째 수
const fs = require('fs');

const [n, k] = fs
  .readFileSync('../input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((item) => +item);

let min = 0;
let max = n * n;

while (min <= max) {
  let mid = Math.floor((min + max) / 2);
  let cnt_of_smaller = 0;
  for (let i = 1; i <= n; i++) {
    cnt_of_smaller += Math.min(Math.floor(mid / i), n);
  }

  if (cnt_of_smaller < k) {
    min = mid + 1;
  } else {
    max = mid - 1;
  }
}

console.log(min);
