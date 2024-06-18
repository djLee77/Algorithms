//테트로미노
const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split('\n');

const [n, m] = input.shift().split(' ').map(Number);
const arr = input.map((i) => i.split(' ').map(Number));
const visited = Array.from({ length: n }, () =>
  Array.from({ length: m }, () => 0)
);
const dx = [0, 0, 1, -1];
const dy = [1, -1, 0, 0];
const ddx = [
  [0, 0, 0, 1],
  [0, 1, 2, 1],
  [0, 0, 0, -1],
  [0, -1, 0, 1],
];
const ddy = [
  [0, 1, 2, 1],
  [0, 0, 0, 1],
  [0, 1, 2, 1],
  [0, 1, 1, 1],
];
let ans = 0;

const dfs = (x, y, sum, cnt) => {
  if (cnt === 4) {
    ans = Math.max(ans, sum);
    return;
  }
  for (let i = 0; i < 4; i++) {
    let [nx, ny] = [x + dx[i], y + dy[i]];
    if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;

    if (!visited[nx][ny]) {
      visited[nx][ny] = true;
      dfs(nx, ny, sum + arr[nx][ny], cnt + 1);
      visited[nx][ny] = false;
    }
  }
};

const checkNoDfs = (x, y) => {
  for (let i = 0; i < 4; i++) {
    let flag = false;
    let sum = 0;

    for (let j = 0; j < 4; j++) {
      let nx = x + ddx[i][j];
      let ny = y + ddy[i][j];

      if (nx < 0 || nx >= n || ny < 0 || ny >= m) {
        flag = true;
        break;
      } else {
        sum += arr[nx][ny];
      }
    }
    if (!flag) {
      ans = Math.max(ans, sum);
    }
  }
};

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    visited[i][j] = true;
    dfs(i, j, arr[i][j], 1);
    visited[i][j] = false;
    checkNoDfs(i, j);
  }
}

console.log(ans);
