const fs = require('fs');

let N = +fs.readFileSync('../input.txt').toString().trim();

let dp = Array(N + 1).fill(Infinity);
dp[0] = 0;

for (let i = 1; i <= Math.sqrt(N); i++) {
  dp[i * i] = 1;
}

for (let i = 2; i <= N; i++) {
  for (let j = 1; j <= Math.sqrt(i); j++) {
    dp[i] = Math.min(dp[i], 1 + dp[i - j * j]);
  }
}

console.log(dp[N]);
