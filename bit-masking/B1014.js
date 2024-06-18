// 컨닝
let [T, ...input] = require('fs')
  .readFileSync('../input.txt')
  .toString()
  .trim()
  .split('\n');

const seatCheck = (seats, bit) => {
  for (let i = 0; i < seats.length; i++) {
    if (seats[i] === 'x' && bit & (1 << i)) return false;
  }
  return true;
};

const adjCheck = (bit, width) => {
  for (let i = 0; i < width - 1; i++) {
    const val = 3 << i;
    if ((bit & val) === val) return false;
  }
  return true;
};

const bitsCheck = (bit, fbit, width) => {
  for (let i = 0; i < width; i++) {
    if ((1 << i) & fbit) {
      if (i > 0 && (1 << (i - 1)) & bit) return false;
      if ((1 << (i + 1)) & bit) return false;
    }
  }
  return true;
};

const solution = (field, N, M) => {
  const dp = Array.from({ length: N + 1 }, () => Array(1 << M).fill(0));
  const bitsSet = [];

  for (let bit = 0; bit < 1 << M; bit++) {
    if (adjCheck(bit, M)) {
      let cnt = 0;
      for (let i = 0; i < M; i++) {
        if ((1 << i) & bit) cnt++;
      }
      bitsSet.push([bit, cnt]);
    }
  }

  let ans = 0;

  for (let i = 1; i <= N; i++) {
    for (const [bit, bitCount] of bitsSet) {
      if (!seatCheck(field[i - 1], bit)) continue;
      for (const [fbit] of bitsSet) {
        if (bitsCheck(bit, fbit, M)) {
          dp[i][bit] = Math.max(dp[i][bit], dp[i - 1][fbit] + bitCount);
          ans = Math.max(ans, dp[i][bit]);
        }
      }
    }
  }

  console.log(ans);
};

for (let i = 0; i < T; i++) {
  const [N, M] = input
    .shift()
    .split(' ')
    .map((item) => +item);

  let arr = input.splice(0, N).map((item) =>
    item
      .replace(/\r/, '')
      .split('')
      .map((v) => v)
  );

  solution(arr, N, M);
}
