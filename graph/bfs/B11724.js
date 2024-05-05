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

let bfsVisited = Array(N + 1).fill(false);
bfsVisited[0] = true;

const bfs = (node) => {
  bfsVisited[node] = true;
  const queue = [node];

  while (queue.length > 0) {
    const node = queue.shift();
    graph[node].forEach((nextNode) => {
      if (!bfsVisited[nextNode]) {
        bfsVisited[nextNode] = true;
        queue.push(nextNode);
      }
    });
  }
};

let cnt = 0;

while (bfsVisited.includes(false)) {
  cnt++;
  bfs(bfsVisited.indexOf(false));
}

console.log(cnt);
