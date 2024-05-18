// 1,2,3 만들기
const fs = require('fs');

const [N, ...arr] = fs
  .readFileSync('../input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((item) => +item);

const dp = Array(Math.max(...arr)).fill(0);

dp[1] = 1;
dp[2] = 2;
dp[3] = 4;

for (let i = 4; i <= Math.max(...arr); i++) {
  dp[i] = dp[i - 1] + dp[i - 2] + dp[i - 3];
}

let answer = [];
for (let i = 0; i < N; i++) {
  answer.push(dp[arr[i]]);
}

console.log(answer.join('\n'));
