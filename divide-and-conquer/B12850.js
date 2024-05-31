//본대 산책2
const mod = 1000000007n;
const fs = require('fs');

const D = +fs.readFileSync('../input.txt').toString().trim();

const arr = [
  [0n, 1n, 1n, 0n, 0n, 0n, 0n, 0n],
  [1n, 0n, 1n, 1n, 0n, 0n, 0n, 0n],
  [1n, 1n, 0n, 1n, 1n, 0n, 0n, 0n],
  [0n, 1n, 1n, 0n, 1n, 1n, 0n, 0n],
  [0n, 0n, 1n, 1n, 0n, 1n, 1n, 0n],
  [0n, 0n, 0n, 1n, 1n, 0n, 0n, 1n],
  [0n, 0n, 0n, 0n, 1n, 0n, 0n, 1n],
  [0n, 0n, 0n, 0n, 0n, 1n, 1n, 0n],
];

const square = (arr1, arr2) => {
  const new_arr = Array.from({ length: 8 }, () => Array(8).fill(0n));
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      for (let k = 0; k < 8; k++) {
        new_arr[i][j] = (new_arr[i][j] + arr1[i][k] * arr2[k][j]) % mod;
      }
    }
  }
  return new_arr;
};

const divide = (arr, N) => {
  if (N == 1) {
    return arr;
  }

  if (N % 2 == 0) {
    let divided_arr = divide(arr, N / 2);
    return square(divided_arr, divided_arr);
  } else {
    return square(divide(arr, N - 1), arr);
  }
};

const result = divide(arr, D);

console.log(result[0][0].toString().replace('n', ''));
