const fs = require('fs');

const [[N, M], ...map] = fs
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

const bfs = (starts, [[ax, ay], [bx, by], [cx, cy]]) => {
  const queue = [...starts];
  let graph = map.map((v) => [...v]);
  graph[ax][ay] = 1;
  graph[bx][by] = 1;
  graph[cx][cy] = 1;

  while (queue.length > 0) {
    let [x, y] = queue.shift();
    directions.forEach(([dx, dy]) => {
      let nx = x + dx;
      let ny = y + dy;

      if (nx >= 0 && nx < N && ny >= 0 && ny < M && graph[nx][ny] === 0) {
        graph[nx][ny] = 2;
        queue.push([nx, ny]);
      }
    });
  }

  let cnt = 0;
  for (let i = 0; i < graph.length; i++) {
    for (let j = 0; j < graph[i].length; j++) {
      if (graph[i][j] === 0) {
        cnt++;
      }
    }
  }

  return cnt;
};

let barriers = [];
let barrier_1;
let barrier_2;
let barrier_3;

for (let i = 0; i < N * M; i++) {
  if (i < M) {
    barrier_1 = [0, i];
  } else {
    barrier_1 = [Math.floor(i / M), i % M];
  }

  if (map[barrier_1[0]][barrier_1[1]] > 0) {
    continue;
  }

  for (let j = i + 1; j < N * M; j++) {
    if (j < M) {
      barrier_2 = [0, j];
    } else {
      barrier_2 = [Math.floor(j / M), j % M];
    }

    if (map[barrier_2[0]][barrier_2[1]] > 0) {
      continue;
    }

    for (let k = j + 1; k < N * M; k++) {
      if (k < M) {
        barrier_3 = [0, k];
      } else {
        barrier_3 = [Math.floor(k / M), k % M];
      }

      if (map[barrier_3[0]][barrier_3[1]] > 0) {
        continue;
      }

      barriers.push([barrier_1, barrier_2, barrier_3]);
    }
  }
}

let start_indexes = [];
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (map[i][j] === 2) {
      start_indexes.push([i, j]);
    }
  }
}

let max = 0;

barriers.forEach((barrier) => {
  let cnt = bfs(start_indexes, barrier);

  if (cnt > max) {
    max = cnt;
  }
});

console.log(max);
