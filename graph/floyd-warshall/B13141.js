//Ignition
const fs = require('fs');

const [[N, M], ...edges] = fs
  .readFileSync('../../input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((item) => item.split(' ').map((v) => +v));

let dist = Array.from({ length: N + 1 }, () => Array(N + 1).fill(-1));
let min_dist = Array.from({ length: N + 1 }, () => Array(N + 1).fill(Infinity));

edges.forEach(([from, to, length]) => {
  if (length > dist[from][to]) {
    dist[from][to] = length;
    dist[to][from] = length;
  }
  if (length < min_dist[from][to]) {
    min_dist[from][to] = length;
    min_dist[to][from] = length;
  }
});

for (let i = 1; i <= N; i++) {
  for (let j = 1; j <= N; j++) {
    if (i === j) min_dist[i][j] = 0;
  }
}

for (let i = 1; i <= N; i++) {
  for (let j = 1; j <= N; j++) {
    for (let k = 1; k <= N; k++) {
      if (min_dist[j][k] > min_dist[j][i] + min_dist[i][k]) {
        min_dist[j][k] = min_dist[j][i] + min_dist[i][k];
      }
    }
  }
}

let shortest_buring_time = Infinity;
for (let start = 1; start <= N; start++) {
  let total_burning_time = 0;
  for (let from = 1; from <= N; from++) {
    for (let to = 1; to <= N; to++) {
      if (dist[from][to] <= 0) continue;

      let edge_len = dist[from][to];
      let remain_len = edge_len - (min_dist[start][to] - min_dist[start][from]);

      if (remain_len > 0) {
        let spent_time = remain_len / 2 + min_dist[start][to];
        total_burning_time = Math.max(total_burning_time, spent_time);
      }
    }
  }

  shortest_buring_time = Math.min(shortest_buring_time, total_burning_time);
}

console.log(shortest_buring_time.toFixed(1));
