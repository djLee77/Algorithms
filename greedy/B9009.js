//피보나치
//피보나치 수들의 배열은 dp를 이용하여 만들고 이후, 수들의 합은 Greedy를 사용해 구한다.
const fs = require('fs');

const [T, ...arr] = fs
  .readFileSync('../input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((item) => +item);

const solve = (N) => {
  let dp = [0, 1];
  let elements = [];

  let i = 2;
  while (dp[dp.length - 1] < N) {
    dp[i] = dp[i - 1] + dp[i - 2];
    i++;
  }

  while (N > 0 && i >= 0) {
    if (dp[i] <= N) {
      N = N - dp[i];
      elements.push(dp[i]);
    }
    i--;
  }

  return elements;
};

for (let i = 0; i < T; i++) {
  console.log(
    solve(arr[i])
      .sort((a, b) => a - b)
      .join(' ')
  );
}
