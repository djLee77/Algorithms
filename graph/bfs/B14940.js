//쉬운 최단거리
const fs = require('fs');
const input = fs.readFileSync('../input.txt').toString().trim().split('\n');

const [n, m] = input[0].split(' ').map(Number);
const map = input.slice(1, n + 1).map((row) => row.split(' ').map(Number));
const visited = Array.from(Array(n), () => Array(m).fill(false));
const distances = Array.from(Array(n), () => Array(m).fill(-1));

// 네 방향 탐색을 위한 배열
const directions = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

const bfs = (x, y) => {
  let queue = [[x, y]];
  distances[x][y] = 0;
  visited[x][y] = true;

  while (queue.length > 0) {
    const [x, y] = queue.shift();

    directions.forEach(([dx, dy]) => {
      const nx = x + dx;
      const ny = y + dy;

      if (
        nx >= 0 &&
        nx < n &&
        ny >= 0 &&
        ny < n &&
        !visited[nx][ny] &&
        map[nx][ny] === 1
      ) {
        visited[nx][ny] = true;
        distances[nx][ny] = distances[x][y] + 1;
        queue.push([nx, ny]);
      }
    });
  }
};

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (map[i][j] === 2) {
      bfs(i, j);
      break;
    }
  }
}

for (let i = 0; i < distances.length; i++) {
  for (let j = 0; j < distances[i].length; j++) {
    if (map[i][j] === 0) {
      distances[i][j] = 0;
    } else if (!visited[i][j]) {
      distances[i][j] = -1;
    }
  }
}

console.log(
  distances
    .map((item) => item.join(' '))
    .join('\n')
    .trim()
);
