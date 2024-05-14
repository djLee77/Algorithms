//사이클 게임
const fs = require('fs');

const [[N, M], ...edges] = fs
  .readFileSync('../input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((item) => item.split(' ').map((v) => +v));

class union_find {
  constructor(size) {
    this.root = Array.from({ length: size }, (_, index) => index);
    this.rank = Array.from({ length: size }, () => 0);
  }

  find(x, y) {
    if (this.root[x] !== x) {
      this.root[x] = this.find(this.root[x]);
    }
    return this.root[x];
  }

  union(x, y) {
    let rootX = this.find(x);
    let rootY = this.find(y);
    if (rootX !== rootY) {
      if (this.rank[rootX] > this.rank[rootY]) {
        this.root[rootY] = rootX;
      } else if (this.rank[rootX] < this.rank[rootY]) {
        this.root[rootX] = rootY;
      } else {
        this.root[rootY] = rootX;
        this.rank[rootX]++;
      }
    }
  }
}

const uf = new union_find(N);
let num = 0;

for (let i = 0; i < M; i++) {
  let [x, y] = edges[i];

  if (uf.find(x) !== uf.find(y)) {
    uf.union(x, y);
  } else {
    num = i + 1;
    break;
  }
}

console.log(num);
