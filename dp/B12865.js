//평범한 배낭
const fs = require('fs');

const input = fs
  .readFileSync('../input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((v) => v.split(' ').map((item) => Number(item)));

const [N, K] = input.shift();

let dp = new Array(N + 1).fill(null).map(() => new Array(K + 1).fill(0));

let costs = input.map((v) => v[0]);
let values = input.map((v) => v[1]);

for (let i = 1; i <= N; i++) {
  for (let w = 1; w <= K; w++) {
    if (w - costs[i - 1] >= 0) {
      dp[i][w] = Math.max(
        dp[i - 1][w],
        dp[i - 1][w - costs[i - 1]] + values[i - 1]
      );
    } else {
      dp[i][w] = dp[i - 1][w];
    }
  }
}

console.log(dp[N][K]);
