//안전 영역
const fs = require('fs');

const [[N], ...map] = fs
  .readFileSync('../../input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((item) => item.split(' ').map((v) => +v));

const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

const bfs = (floodingH) => {
  let graph = map.map((item) => [...item]);
  let startNodes = [];
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (graph[i][j] > floodingH) startNodes.push([i, j]);
    }
  }

  let cnt = 0;
  while (startNodes.length > 0) {
    let [x, y] = startNodes.pop();
    let queue = [[x, y]];

    if (graph[x][y] === -1) {
      continue;
    }

    graph[x][y] = -1;
    cnt++;
    while (queue.length > 0) {
      let [x, y] = queue.shift();

      directions.forEach(([dx, dy]) => {
        let nx = x + dx;
        let ny = y + dy;

        if (
          nx >= 0 &&
          nx < N &&
          ny >= 0 &&
          ny < N &&
          graph[nx][ny] > floodingH
        ) {
          graph[nx][ny] = -1;
          queue.push([nx, ny]);
        }
      });
    }
  }

  return cnt;
};

let max = 0;
for (let i = 0; i <= 100; i++) {
  let cnt = bfs(i);

  if (cnt > max) {
    max = cnt;
  }
}

console.log(max);
