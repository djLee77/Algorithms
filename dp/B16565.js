//N포커
const fs = require('fs');
const N = +fs.readFileSync('../input.txt').toString().trim();
const MOD = 10007;

let pascal = Array(53)
  .fill(0)
  .map((item, index) => Array(index));

pascal[0][0] = 1;
pascal[1][0] = 1;
pascal[1][1] = 1;

for (let i = 2; i < 53; i++) {
  for (let j = 0; j <= i; j++) {
    if (j === 0 || j === i) {
      pascal[i][j] = 1;
      continue;
    }

    pascal[i][j] = (pascal[i - 1][j] + pascal[i - 1][j - 1]) % MOD;
  }
}

let cnt = 0;
for (let i = 4; i <= N; i += 4) {
  if ((i / 4) % 2 === 1) {
    cnt += pascal[13][i / 4] * pascal[52 - i][N - i];
  } else {
    cnt -= pascal[13][i / 4] * pascal[52 - i][N - i];
  }

  cnt %= MOD;
}

if (cnt < 0) {
  cnt += MOD;
}

console.log(cnt);
