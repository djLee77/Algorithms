// DFS와 BFS
const fs = require('fs');

const [[N, M, start], ...map] = fs
  .readFileSync('../input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((item) => item.split(' ').map((v) => +v));

let graph = Array.from(Array(N + 1), () => []);
let dfsVisited = Array(N + 1).fill(false);
let bfsVisited = Array(N + 1).fill(false);
let dfsResult = [];
let bfsResult = [];

map.forEach(([from, to]) => {
  graph[from].push(to);
  graph[to].push(from);
});

graph.map((item) => item.sort((a, b) => a - b));

const dfs = (node) => {
  dfsVisited[node] = true;
  dfsResult.push(node);

  graph[node].forEach((nextNode) => {
    if (!dfsVisited[nextNode]) {
      dfs(nextNode);
    }
  });
};

const bfs = (start) => {
  let queue = [start];
  bfsVisited[start] = true;

  while (queue.length > 0) {
    let node = queue.shift();
    bfsResult.push(node);
    graph[node].forEach((nextNode) => {
      if (!bfsVisited[nextNode]) {
        bfsVisited[nextNode] = true;
        queue.push(nextNode);
      }
    });
  }
};

dfs(start);
bfs(start);

console.log(dfsResult.join(' '));
console.log(bfsResult.join(' '));
