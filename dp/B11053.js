//가장 긴 증가하는 부분 수열
const fs = require('fs');
const [[N], arr] = fs
  .readFileSync('../input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((item) => item.split(' ').map((v) => +v));

let dp = Array(N).fill(1);

for (let i = 1; i < N; i++) {
  for (let j = i - 1; j >= 0; j--) {
    if (arr[i] > arr[j] && dp[j] >= dp[i]) {
      dp[i] = dp[j] + 1;
    }
  }
}

console.log(Math.max(...dp));
