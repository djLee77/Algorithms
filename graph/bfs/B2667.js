const fs = require("fs");

const input = fs.readFileSync("../input.txt").toString().trim().split("\n");

const N = Number(input.shift());

const map = input.map((item) => item.split("").map((v) => +v));

let bfsVisited = Array.from(Array(N), () => Array(N).fill(false));

let cnts = [];
const directions = [
  [1, 0],
  [-1, 0],
  [0, -1],
  [0, 1],
];

const bfs = (sx, sy) => {
  bfsVisited[sx][sy] = true;
  let queue = [[sx, sy]];
  let cnt = 1;

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
        !bfsVisited[nx][ny] &&
        map[nx][ny] === 1
      ) {
        bfsVisited[nx][ny] = true;
        cnt++;
        queue.push([nx, ny]);
      }
    });
  }

  return cnt;
};

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (!bfsVisited[i][j] && map[i][j] === 1) {
      cnts.push(bfs(i, j));
    }
  }
}

console.log(cnts.length);
cnts.sort((a, b) => a - b);
cnts.forEach((answer) => {
  console.log(answer);
});
