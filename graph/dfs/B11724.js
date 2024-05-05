//연결 요소의 개수
const fs = require('fs');

const [[N, M], ...input] = fs
  .readFileSync('../../input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((item) => item.split(' ').map((v) => +v));

let graph = Array.from(Array(N + 1), () => []);

input.forEach(([from, to]) => {
  graph[from].push(to);
  graph[to].push(from);
});

graph.map((item) => item.sort((a, b) => a - b));

let dfsVisited = Array(N + 1).fill(false);
dfsVisited[0] = true;

const dfs = (node) => {
  dfsVisited[node] = true;
  graph[node].forEach((nextNode) => {
    if (!dfsVisited[nextNode]) {
      dfs(nextNode);
    }
  });
};

let cnt = 0;

while (dfsVisited.includes(false)) {
  cnt++;
  dfs(dfsVisited.indexOf(false));
}

console.log(cnt);
