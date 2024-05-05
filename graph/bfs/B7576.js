//토마토 (2차원)
const fs = require('fs');

let [[M, N], ...box] = fs
  .readFileSync('../input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((row) => row.split(' ').map(Number));

const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];
let queue = [],
  nextQueue;
let days = 0;

// 초기 익은 토마토 위치 찾기
box.forEach((row, i) =>
  row.forEach((tomato, j) => {
    if (tomato === 1) queue.push([i, j]);
  })
);

// BFS 실행
while (queue.length > 0) {
  nextQueue = [];
  queue.forEach(([x, y]) => {
    directions.forEach(([dx, dy]) => {
      const nx = x + dx,
        ny = y + dy;
      if (nx >= 0 && nx < N && ny >= 0 && ny < M && box[nx][ny] === 0) {
        box[nx][ny] = 1;
        nextQueue.push([nx, ny]);
      }
    });
  });
  queue = nextQueue;
  if (queue.length > 0) days++;
}

// 모든 토마토가 익었는지 확인
const isAllRipe = box.every((row) => row.every((tomato) => tomato !== 0));

console.log(isAllRipe ? days : -1);
