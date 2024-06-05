//Dance Dance Revolution
const fs = require('fs');
const arr = fs
  .readFileSync('./input.txt')
  .toString()
  .trim()
  .split(' ')
  .map((v) => +v);

arr.pop();

const costs = [
  [1, 2, 2, 2, 2], //0
  [2, 1, 3, 4, 3], //1
  [2, 3, 1, 3, 4], //2
  [2, 4, 3, 1, 3], //3
  [2, 3, 4, 3, 1], //4
];

let location = [0, 0];
let dp = Array.from({ length: arr.length + 1 }, () =>
  Array.from({ length: 5 }, () => Array(5).fill(Infinity))
);

dp[0][0][0] = 0;

for (let i = 1; i <= arr.length; i++) {
  let move = arr[i - 1];
  for (let right = 0; right < 5; right++) {
    for (let left = 0; left < 5; left++) {
      dp[i][move][right] = Math.min(
        dp[i][move][right],
        dp[i - 1][left][right] + costs[left][move]
      );

      dp[i][left][move] = Math.min(
        dp[i][left][move],
        dp[i - 1][left][right] + costs[right][move]
      );
    }
  }
}

let min = Infinity;
for (let i = 0; i < dp[dp.length - 1].length; i++) {
  for (let j = 0; j < 5; j++) {
    if (dp[dp.length - 1][i][j] < min) {
      min = dp[dp.length - 1][i][j];
    }
  }
}

console.log(min);
