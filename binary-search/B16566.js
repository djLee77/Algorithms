//카드 게임
class union_find {
  constructor(size) {
    this.root = Array.from({ length: size }, (_, index) => index);
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
      this.root[rootX] = rootY;
    }
  }
}

const [[N, M, K], blue_cards, red_cards] = require('fs')
  .readFileSync('../input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((item) => item.split(' ').map((v) => +v));

blue_cards.sort((a, b) => a - b);

const binary_search = (target) => {
  let left = 0;
  let right = M - 1;
  let mid = Math.floor((left + right) / 2);

  while (left < right) {
    mid = Math.floor((left + right) / 2);

    if (blue_cards[mid] > target) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return left;
};

const uf = new union_find(M);
let answer = [];
for (let i = 0; i < red_cards.length; i++) {
  let index = binary_search(red_cards[i]);
  answer.push(blue_cards[uf.find(index)]);
  uf.union(uf.find(index), uf.find(index) + 1);
}

console.log(answer.join('\n'));
