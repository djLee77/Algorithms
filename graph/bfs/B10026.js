//적록색약
const input = require('fs')
  .readFileSync('../../input.txt')
  .toString()
  .split('\n');
const N = +input.shift();
const map = input.map((item) => item.replace(/\r/, '').split(''));
const directions = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

let bfsVisited = map.map((item) => item.map(() => false));

const bfs = (startNode, color, isBlind) => {
  const queue = [startNode];

  while (queue.length > 0) {
    const [x, y] = queue.shift();

    directions.forEach(([dx, dy]) => {
      let nx = x + dx;
      let ny = y + dy;

      if (!isBlind || color == 'B') {
        if (
          nx >= 0 &&
          nx < N &&
          ny >= 0 &&
          ny < N &&
          !bfsVisited[nx][ny] &&
          map[nx][ny] == color
        ) {
          bfsVisited[nx][ny] = true;
          queue.push([nx, ny]);
        }
      } else {
        if (
          nx >= 0 &&
          nx < N &&
          ny >= 0 &&
          ny < N &&
          !bfsVisited[nx][ny] &&
          (map[nx][ny] == 'R' || map[nx][ny] == 'G')
        ) {
          bfsVisited[nx][ny] = true;
          queue.push([nx, ny]);
        }
      }
    });
  }

  return 1;
};

let cnt = 0;
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (!bfsVisited[i][j]) {
      cnt += bfs([i, j], map[i][j], false);
    }
  }
}

bfsVisited = map.map((item) => item.map(() => false));

let cnt2 = 0;
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (!bfsVisited[i][j]) {
      cnt2 += bfs([i, j], map[i][j], true);
    }
  }
}

console.log(`${cnt} ${cnt2}`);
