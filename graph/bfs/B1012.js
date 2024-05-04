const fs = require('fs');

const [[T], ...input] = fs
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

const solution = (M, N, map) => {
  let field = Array.from(Array(M), () => Array(N).fill(0));
  for (let i = 0; i < map.length; i++) {
    let [x, y] = map[i];
    field[x][y] = 1;
  }

  const bfs = (sx, sy) => {
    const queue = [[sx, sy]];
    field[sx][sy] = 0;

    while (queue.length > 0) {
      const [x, y] = queue.shift();

      directions.forEach(([dx, dy]) => {
        let nx = x + dx;
        let ny = y + dy;

        if (nx >= 0 && nx < M && ny >= 0 && ny < N && field[nx][ny]) {
          field[nx][ny] = 0;
          queue.push([nx, ny]);
        }
      });
    }
    return 1;
  };

  let cnt = 0;
  for (let i = 0; i < map.length; i++) {
    let [x, y] = map[i];
    if (field[x][y]) {
      cnt += bfs(x, y);
    }
  }

  return cnt;
};

let start_index = 0;
let answer = '';
for (let i = 0; i < T; i++) {
  const [M, N, K] = input[start_index];
  const map = [];

  for (let j = start_index + 1; j < start_index + 1 + K; j++) {
    map.push(input[j]);
  }

  answer += solution(M, N, [...map]) + '\n';
  start_index = start_index + 1 + K;
}

console.log(answer);
