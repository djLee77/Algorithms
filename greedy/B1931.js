//회의실 배정
const fs = require('fs');

let [[N], ...input] = fs
  .readFileSync('../input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((item) => item.split(' ').map((v) => +v));

input.sort((a, b) => {
  if (a[1] === b[1]) {
    return a[0] - b[0];
  } else {
    return a[1] - b[1];
  }
});

let lastEnd = 0;
let cnt = 0;

for (let i = 0; i < N; i++) {
  let [start, end] = input[i];

  if (lastEnd <= start) {
    cnt += 1;
    lastEnd = end;
  }
}

console.log(cnt);
