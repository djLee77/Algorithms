//하이퍼 토마토
class Node {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}

class Queue {
  constructor() {
    this.lastNode = null;
    this.length = 0;
    this.firstNode = null;
  }

  push(v) {
    if (this.length === 0) {
      this.firstNode = new Node(v, null);
      this.lastNode = this.firstNode;
    } else {
      let newNode = new Node(v, null);
      this.lastNode.next = newNode;
      this.lastNode = newNode;
    }
    this.length++;
  }

  pop() {
    if (this.length === 0) return undefined;
    let secondNode = this.firstNode.next;
    let value = this.firstNode.value;
    this.firstNode = secondNode;
    if (this.length === 1) this.lastNode = null;
    this.length--;
    return value;
  }
}

const fs = require('fs');

let [[m, n, o, p, q, r, s, t, u, v, w], ...arr] = fs
  .readFileSync('../../input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((item) => item.split(' ').map((v) => +v));

let map = Array(w)
  .fill(0)
  .map((w_v) =>
    Array(v)
      .fill(0)
      .map((v_v) =>
        Array(u)
          .fill(0)
          .map((u_v) =>
            Array(t)
              .fill(0)
              .map((t_v) =>
                Array(s)
                  .fill(0)
                  .map((s_v) =>
                    Array(r)
                      .fill(0)
                      .map((r_v) =>
                        Array(q)
                          .fill(0)
                          .map((q_v) =>
                            Array(p)
                              .fill(0)
                              .map((p_v) =>
                                Array(o)
                                  .fill(0)
                                  .map((o_v) =>
                                    Array(n)
                                      .fill(0)
                                      .map((n_v) => 0)
                                  )
                              )
                          )
                      )
                  )
              )
          )
      )
  );

let cnt_0 = 0;
let indexes = [];

let arr_index = 0;
for (let i1 = 0; i1 < w; i1++) {
  for (let i2 = 0; i2 < v; i2++) {
    for (let i3 = 0; i3 < u; i3++) {
      for (let i4 = 0; i4 < t; i4++) {
        for (let i5 = 0; i5 < s; i5++) {
          for (let i6 = 0; i6 < r; i6++) {
            for (let i7 = 0; i7 < q; i7++) {
              for (let i8 = 0; i8 < p; i8++) {
                for (let i9 = 0; i9 < o; i9++) {
                  for (let i10 = 0; i10 < n; i10++) {
                    map[i1][i2][i3][i4][i5][i6][i7][i8][i9][i10] =
                      arr[arr_index++];
                    map[i1][i2][i3][i4][i5][i6][i7][i8][i9][i10].forEach(
                      (v, i) => {
                        if (v === 1) {
                          indexes.push([
                            i1,
                            i2,
                            i3,
                            i4,
                            i5,
                            i6,
                            i7,
                            i8,
                            i9,
                            i10,
                            i,
                          ]);
                        }
                        if (v === 0) {
                          cnt_0++;
                        }
                      }
                    );
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

const directions = [
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1],
];

let max_day = 0;
const bfs = (start_indexes) => {
  const queue = new Queue();
  start_indexes.forEach((index) => queue.push([...index]));
  while (queue.length > 0) {
    let [i1, i2, i3, i4, i5, i6, i7, i8, i9, i10, i11] = queue.pop();
    directions.forEach(
      ([di1, di2, di3, di4, di5, di6, di7, di8, di9, di10, di11]) => {
        let ni1 = i1 + di1;
        let ni2 = i2 + di2;
        let ni3 = i3 + di3;
        let ni4 = i4 + di4;
        let ni5 = i5 + di5;
        let ni6 = i6 + di6;
        let ni7 = i7 + di7;
        let ni8 = i8 + di8;
        let ni9 = i9 + di9;
        let ni10 = i10 + di10;
        let ni11 = i11 + di11;

        if (
          ni1 >= 0 &&
          ni2 >= 0 &&
          ni3 >= 0 &&
          ni4 >= 0 &&
          ni5 >= 0 &&
          ni6 >= 0 &&
          ni7 >= 0 &&
          ni8 >= 0 &&
          ni9 >= 0 &&
          ni10 >= 0 &&
          ni11 >= 0 &&
          ni1 < w &&
          ni2 < v &&
          ni3 < u &&
          ni4 < t &&
          ni5 < s &&
          ni6 < r &&
          ni7 < q &&
          ni8 < p &&
          ni9 < o &&
          ni10 < n &&
          ni11 < m &&
          map[ni1][ni2][ni3][ni4][ni5][ni6][ni7][ni8][ni9][ni10][ni11] === 0
        ) {
          map[ni1][ni2][ni3][ni4][ni5][ni6][ni7][ni8][ni9][ni10][ni11] =
            map[i1][i2][i3][i4][i5][i6][i7][i8][i9][i10][i11] + 1;
          if (
            map[ni1][ni2][ni3][ni4][ni5][ni6][ni7][ni8][ni9][ni10][ni11] > 0
          ) {
            max_day =
              map[ni1][ni2][ni3][ni4][ni5][ni6][ni7][ni8][ni9][ni10][ni11];
          }
          queue.push([ni1, ni2, ni3, ni4, ni5, ni6, ni7, ni8, ni9, ni10, ni11]);
          cnt_0--;
        }
      }
    );
  }
};

bfs(indexes);

if (max_day === 0) {
  max_day = 1;
}

console.log(cnt_0 > 0 ? -1 : max_day - 1);
