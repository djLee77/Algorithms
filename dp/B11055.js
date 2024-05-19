//가장 큰 증가하는 부분 수열
const fs = require('fs');
const [[N], arr] = fs
  .readFileSync('../input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((item) => item.split(' ').map((v) => +v));

let dp = [...arr];

for (let i = 1; i < N; i++) {
  let max = 0;
  let tmp = dp[i];
  for (let j = i - 1; j >= 0; j--) {
    if (arr[i] > arr[j] && dp[j] > max) {
      max = dp[j];
      dp[i] = tmp + dp[j];
    }
  }
}

console.log(Math.max(...dp));
