//최소 스패닝 트리
const fs = require('fs');

class unionFind {
  constructor(size) {
    this.root = Array.from({ length: size }, (_, index) => index);
    this.rank = Array.from({ length: size }, () => 0);
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

function kruskal(V, edges) {
  const uf = new unionFind(V);
  edges.sort((a, b) => a[2] - b[2]);
  let sumOfMst = 0;

  for (let [from, to, w] of edges) {
    if (uf.find(from) !== uf.find(to)) {
      sumOfMst += w;
      uf.union(from, to);
    }
  }

  return sumOfMst;
}

let [[V, E], ...edges] = fs
  .readFileSync('../../input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((item) => item.split(' ').map((v) => +v));

console.log(kruskal(V, edges));
