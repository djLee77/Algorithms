//카잉 달력
const fs = require('fs');

const [[T], ...arr] = fs
  .readFileSync('../input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((item) => item.split(' ').map((v) => +v));

const getGCD = (a, b) => {
  let x = Math.max(a, b);
  let y = Math.min(a, b);
  let remainder;
  while (y) {
    remainder = x % y;
    x = y;
    y = remainder;
  }
  return x;
};

const solve = ([M, N, x, y]) => {
  const lcm = (M * N) / getGCD(M, N);
  for (let i = x; i <= lcm; i += M) {
    if (i % N === y && N !== y) {
      return i;
    } else if (i % N === 0 && N === y) {
      return i;
    }
  }

  return -1;
};

let output = '';
for (let i = 0; i < T; i++) {
  output += solve(arr[i]) + '\n';
}

console.log(output);
