//ATM
const fs = require('fs');

let [[N], T] = fs
  .readFileSync('../input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((item) => item.split(' ').map((v) => +v));

T.sort((a, b) => a - b);

for (let i = 1; i < N; i++) {
  T[i] = T[i] + T[i - 1];
}

console.log(T.reduce((a, c) => a + c, 0));
