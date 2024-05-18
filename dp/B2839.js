//설탕 배달
const fs = require('fs');

const N = +fs.readFileSync('/dev/stdin').toString().trim();

const dp = Array(N + 1).fill(-1);

dp[3] = 1;
dp[5] = 1;

for (let i = 3; i <= N; i++) {
  if (dp[i] < 0) continue;

  if (dp[i + 3] < 0 || dp[i + 3] > dp[i] + 1) {
    dp[i + 3] = dp[i] + 1;
  }
  if (dp[i + 5] < 0 || dp[i + 3] > dp[i] + 1) {
    dp[i + 5] = dp[i] + 1;
  }
}

console.log(dp[N]);
