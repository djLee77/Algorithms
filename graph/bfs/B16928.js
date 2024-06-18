//뱀과 사다리 게임
const fs = require('fs');

const [[N, M], ...map] = fs
  .readFileSync('../../input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((item) => item.split(' ').map((v) => +v));

const graph = Array(101).fill(0);

for (let [from, to] of map) {
  graph[from] = to;
}

const bfs = (start) => {
  let bfsVisited = Array(101).fill(Infinity);

  bfsVisited[start] = true;
  const queue = [[start, 0]];

  let return_value = Infinity;

  while (queue.length > 0) {
    let [node, cnt] = queue.shift();

    if (graph[node] > 0) {
      let nextNode = graph[node];
      if (bfsVisited[nextNode] > cnt) {
        queue.push([nextNode, cnt]);
        bfsVisited[nextNode] = cnt;
      }
      continue;
    }

    for (let move = 1; move <= 6; move++) {
      let nextNode = node + move;
      if (bfsVisited[nextNode] > cnt + 1) {
        queue.push([nextNode, cnt + 1]);
        bfsVisited[nextNode] = cnt + 1;
      }
    }
  }

  return bfsVisited[100];
};

console.log(bfs(1));
