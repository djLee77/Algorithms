//불 끄기
const fs = require('fs');

let map = fs
  .readFileSync('../input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((item) => item.replace(/\r/, '').split(''));

map = map.map((item) => item.map((v) => (v === '#' ? false : true)));

let min = 101;

const toggle = (board, x, y) => {
  if (x >= 0 && x < 10 && y >= 0 && y < 10) {
    board[x][y] = !board[x][y];
  }
};

for (let i = 0; i < 1024; i++) {
  let copy_map = map.map((item) => [...item]);
  let cnt = 0;

  for (let j = 0; j < 10; j++) {
    if (i & (1 << j)) {
      toggle(copy_map, 0, j);
      toggle(copy_map, 1, j);
      toggle(copy_map, 0, j - 1);
      toggle(copy_map, 0, j + 1);
      cnt++;
    }
  }

  for (let row = 1; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      if (copy_map[row - 1][col]) {
        toggle(copy_map, row, col);
        toggle(copy_map, row - 1, col);
        toggle(copy_map, row + 1, col);
        toggle(copy_map, row, col - 1);
        toggle(copy_map, row, col + 1);
        cnt++;
      }
    }
  }

  if (copy_map[9].every((item) => !item)) {
    min = Math.min(min, cnt);
  }
}

console.log(min === 101 ? -1 : min);
