//미로 탐색
const fs = require("fs");

const input = fs.readFileSync("../input.txt").toString().trim().split("\n");

const [N, M] = input
  .shift()
  .split(" ")
  .map((item) => +item);

const map = input.map((item) => item.split("").map((v) => +v));

let distances = Array.from(Array(N), () => Array(M).fill(-1));
let bfsVisited = Array.from(Array(N), () => Array(M).fill(false));

const directions = [
  [0, -1],
  [0, 1],
  [-1, 0],
  [1, 0],
];

const bfs = (sx, sy) => {
  const queue = [[sx, sy]];
  bfsVisited[sx][sy] = true;
  distances[sx][sy] = 0;

  while (queue.length > 0) {
    const [x, y] = queue.shift();

    directions.forEach(([dx, dy]) => {
      let nx = x + dx;
      let ny = y + dy;

      if (
        nx >= 0 &&
        nx < N &&
        ny >= 0 &&
        ny < M &&
        !bfsVisited[nx][ny] &&
        map[nx][ny] === 1
      ) {
        bfsVisited[nx][ny] = true;
        distances[nx][ny] = distances[x][y] + 1;
        queue.push([nx, ny]);
      }
    });
  }
};

bfs(0, 0);

console.log(distances[N - 1][M - 1] + 1);
