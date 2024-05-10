//도시 분할 계획
const fs = require('fs');

const [[N, M], ...edges] = fs
  .readFileSync('../../input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((item) => item.split(' ').map((v) => +v));

edges.sort((a, b) => a[2] - b[2]);

class union_find {
  constructor(size) {
    this.root = Array.from({ length: size + 1 }, (_, index) => index);
    this.rank = Array.from({ length: size + 1 }, () => 0);
  }

  find(x) {
    if (this.root[x] !== x) {
      this.root[x] = this.find(this.root[x]);
    }

    return this.root[x];
  }

  union(x, y) {
    let root_x = this.root[x];
    let root_y = this.root[y];
    if (root_x !== root_y) {
      if (this.rank[root_x] > this.rank[root_y]) {
        this.root[root_y] = this.root[root_x];
      } else if (this.rank[root_x] < this.rank[root_y]) {
        this.root[root_x] = this.root[root_y];
      } else {
        this.root[root_y] = this.root[root_x];
        this.rank[root_x]++;
      }
    }
  }

  getRoots() {
    return this.root;
  }
}

let max_distance = 0;
let mst = 0;
const uf = new union_find(N);

edges.forEach(([from, to, w]) => {
  if (uf.find(from) !== uf.find(to)) {
    mst += w;
    uf.union(from, to);

    if (w > max_distance) {
      max_distance = w;
    }
  }
});

console.log(mst - max_distance);
