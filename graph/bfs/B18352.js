//특정 거리의 도시 찾기
const fs = require('fs');

const [[N, M, K, X], ...map] = fs
  .readFileSync('../../input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((item) => item.split(' ').map((v) => +v));

const graph = Array.from(Array(N + 1), () => []);
let bfsVisited = Array(N + 1).fill(false);

map.forEach(([from, to]) => {
  graph[from].push(to);
});

const target_distance_citys = [];

const bfs = (start) => {
  const queue = [{ node: start, dist: 0 }];
  bfsVisited[start] = true;

  while (queue.length > 0) {
    let { node, dist } = queue.shift();
    if (dist === K) {
      target_distance_citys.push(node);
      continue;
    }

    graph[node].forEach((nextNode) => {
      let nextDist = dist + 1;
      if (!bfsVisited[nextNode] && nextDist <= K) {
        bfsVisited[nextNode] = true;
        queue.push({ node: nextNode, dist: nextDist });
      }
    });
  }
};

bfs(X);

if (target_distance_citys.length <= 0) {
  console.log(-1);
} else {
  console.log(target_distance_citys.sort((a, b) => a - b).join('\n'));
}
