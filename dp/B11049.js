//행렬 곱셈 순서
const [[N], ...arr] = require('fs')
  .readFileSync('../input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((item) => item.split(' ').map((v) => +v));

let dp = Array.from({ length: N }, () => Array(N).fill(0));

for (let len = 1; len < N; len++) {
  for (let start = 0; start < N - len; start++) {
    dp[start][start + len] = Infinity;

    for (let t = start; t < start + len; t++) {
      dp[start][start + len] = Math.min(
        dp[start][start + len],
        dp[start][t] +
          dp[t + 1][start + len] +
          arr[start][0] * arr[t][1] * arr[start + len][1]
      );
    }
  }
}

console.log(dp[0][N - 1]);
