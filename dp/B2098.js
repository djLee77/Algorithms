//외판원 순회
const fs = require('fs');

const [[N], ...map] = fs
  .readFileSync('../input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((item) => item.split(' ').map((v) => +v));

let dp = Array(N)
  .fill(0)
  .map(() => Array(1 << N).fill(-1));

const dfs = (node, visited_digit) => {
  if (visited_digit === (1 << N) - 1) {
    return map[node][0] !== 0 ? map[node][0] : Number.MAX_VALUE;
  }

  if (dp[node][visited_digit] > -1) {
    return dp[node][visited_digit];
  }

  dp[node][visited_digit] = Number.MAX_VALUE;
  for (let next_node = 0; next_node < N; next_node++) {
    if (map[node][next_node] === 0 || visited_digit & (1 << next_node)) {
      continue;
    }

    let next_digit = visited_digit | (1 << next_node);
    dp[node][visited_digit] = Math.min(
      dp[node][visited_digit],
      dfs(next_node, next_digit) + map[node][next_node]
    );
  }

  return dp[node][visited_digit];
};

console.log(dfs(0, 1));
