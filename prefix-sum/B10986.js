//나머지 합
const fs = require('fs');

const [[N, M], arr] = fs
  .readFileSync('../input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((item) => item.split(' ').map((v) => +v));

let prefix_sums = Array(N);
prefix_sums = [...arr];

let map = new Map();

let cnt = 0;

if (prefix_sums[0] % M === 0) {
  cnt++;
}
map.set(prefix_sums[0] % M, 1);

for (let i = 1; i < N; i++) {
  prefix_sums[i] = prefix_sums[i] + prefix_sums[i - 1];
  let mod = prefix_sums[i] % M;
  if (!mod) {
    cnt++;
  }

  if (map.has(mod)) {
    map.set(mod, map.get(mod) + 1);
  } else {
    map.set(mod, 1);
  }
}

map.forEach((value) => {
  cnt += (value * (value - 1)) / 2;
});

console.log(cnt);
