const fs = require("fs");

let N = fs.readFileSync("../input.txt").toString().trim();

const dp = {
  1: 1,
  2: 3,
};

for (let i = 3; i <= N; i++) {
  dp[i] = (dp[i - 1] + 2 * dp[i - 2]) % 10007;
}

console.log(dp[N]);
