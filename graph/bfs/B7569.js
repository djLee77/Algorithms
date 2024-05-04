class Deque {
  constructor() {
    this.data = [];
    this.offset = 0;
  }

  push(item) {
    this.data.push(item);
  }

  pop() {
    if (this.data.length === 0) return undefined;
    const item = this.data[this.offset];
    this.offset++; // 다음 요소로 오프셋 이동
    if (this.offset * 2 >= this.data.length) {
      // 메모리 재사용 효율을 높임
      this.data = this.data.slice(this.offset);
      this.offset = 0;
    }
    return item;
  }

  isEmpty() {
    return this.offset >= this.data.length;
  }
}

const queue = new Deque();

const fs = require("fs");

let [[N, M, H], ...arr] = fs
  .readFileSync("../input.txt")
  .toString()
  .trim()
  .split("\n")
  .map((item) => item.split(" ").map((v) => +v));

let map = [];
let CH = H;
while (CH > 0) {
  map.push(arr.splice(0, arr.length / CH--));
}

const directions = [
  [0, 0, 1],
  [0, 0, -1],
  [0, 1, 0],
  [0, -1, 0],
  [1, 0, 0],
  [-1, 0, 0],
];

let start_indexes = [];

for (let z = 0; z < map.length; z++) {
  for (let y = 0; y < map[z].length; y++) {
    for (let x = 0; x < map[z][y].length; x++) {
      if (map[z][y][x] === 1) {
        start_indexes.push([z, y, x]);
      }
    }
  }
}

const bfs = (start_indexes) => {
  const queue = new Deque();
  start_indexes.forEach((index) => queue.push([...index, 0])); // day 정보 추가

  while (!queue.isEmpty()) {
    let [z, y, x, day] = queue.pop();

    directions.forEach(([dz, dy, dx]) => {
      let nz = z + dz;
      let ny = y + dy;
      let nx = x + dx;

      if (
        nz >= 0 &&
        ny >= 0 &&
        nx >= 0 &&
        nz < H &&
        ny < M &&
        nx < N &&
        map[nz][ny][nx] === 0
      ) {
        map[nz][ny][nx] = map[z][y][x] + 1;
        queue.push([nz, ny, nx, day + 1]);
      }
    });
  }
};

bfs(start_indexes);

let day = 0;
for (let z = 0; z < map.length; z++) {
  for (let y = 0; y < map[z].length; y++) {
    if (day === -1) break;
    for (let x = 0; x < map[z][y].length; x++) {
      if (map[z][y][x] === 0) {
        day = -1;
        break;
      }

      if (map[z][y][x] - 1 > day) day = map[z][y][x] - 1;
    }
  }
}

console.log(day);
