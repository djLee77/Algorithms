//바이러스
const fs = require('fs');

const [[V], [E], ...map] = fs
  .readFileSync('../../input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((item) => item.split(' ').map((v) => +v));

let graph = Array.from(Array(V + 1), () => []);

map.forEach(([from, to]) => {
  graph[from].push(to);
  graph[to].push(from);
});

let bfsVisited = Array(V + 1).fill(false);

const bfs = (start) => {
  let cnt = 0;
  const queue = [start];
  bfsVisited[start] = true;

  while (queue.length) {
    const node = queue.shift();

    graph[node].forEach((nextNode) => {
      if (!bfsVisited[nextNode]) {
        bfsVisited[nextNode] = true;
        cnt++;
        queue.push(nextNode);
      }
    });
  }

  return cnt;
};

console.log(bfs(1));
