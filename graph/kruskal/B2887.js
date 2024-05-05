//행성 터널
const fs = require('fs');

class unionFind {
  constructor(size) {
    this.root = Array.from({ length: size }, (_, index) => index);
    this.rank = Array(size).fill(0);
  }

  find(x) {
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
      } else if (this.rank[rootY] > this.rank[rootX]) {
        this.root[rootX] = rootY;
      } else {
        this.root[rootY] = rootX;
        this.rank[rootX]++;
      }
    }
  }
}

const kruskal = (N, edges) => {
  const uf = new unionFind(N);
  edges.sort((a, b) => a[2] - b[2]);
  let sum = 0;

  for (let [from, to, w] of edges) {
    if (uf.find(from) !== uf.find(to)) {
      sum += w;
      uf.union(from, to);
    }
  }

  return sum;
};

const [N, ...map] = fs
  .readFileSync('../../input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((item) => item.split(' ').map((v) => +v));

map.map((item, index) => item.push(index));

const x_sorted_map = [...map.sort((a, b) => a[0] - b[0])];
const y_sorted_map = [...map.sort((a, b) => a[1] - b[1])];
const z_sorted_map = [...map.sort((a, b) => a[2] - b[2])];

let edges = [];

for (let i = 1; i < N; i++) {
  edges.push([
    x_sorted_map[i][3],
    x_sorted_map[i - 1][3],
    Math.abs(x_sorted_map[i][0] - x_sorted_map[i - 1][0]),
  ]);

  edges.push([
    y_sorted_map[i][3],
    y_sorted_map[i - 1][3],
    Math.abs(y_sorted_map[i][1] - y_sorted_map[i - 1][1]),
  ]);

  edges.push([
    z_sorted_map[i][3],
    z_sorted_map[i - 1][3],
    Math.abs(z_sorted_map[i][2] - z_sorted_map[i - 1][2]),
  ]);
}

console.log(kruskal(N, edges));
