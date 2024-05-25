//전깃줄 - 2
const [[N], ...map] = require('fs')
  .readFileSync('../input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((item) => item.split(' ').map((v) => +v));

let sequence = map.sort((a, b) => a[0] - b[0]).map((item) => item[1]);
let lis = [sequence[0]];
let A = [1];

let hash = new Map();
for (let i = 0; i < map.length; i++) {
  hash[map[i][1]] = map[i][0];
}

const binary_search = (n) => {
  let left = 0;
  let right = lis.length - 1;
  let mid = Math.floor((left + right) / 2);

  while (left < right) {
    mid = Math.floor((left + right) / 2);

    if (lis[mid] >= n) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return left;
};

for (let i = 0; i < sequence.length; i++) {
  if (lis[lis.length - 1] < sequence[i]) {
    lis.push(sequence[i]);
    A[i] = lis.length;
  } else {
    let index = binary_search(sequence[i]);
    lis[index] = sequence[i];
    A[i] = index + 1;
  }
}

let max = lis.length;
let real_lis = [];
for (let i = sequence.length - 1; i >= 0; i--) {
  if (A[i] === max) {
    real_lis.push(sequence[i]);
    max--;
  }
}

let removed_sequence = sequence.filter((v) => !real_lis.includes(v));
let A_removed = removed_sequence.map((v) => hash[v]).sort((a, b) => a - b);

console.log(sequence.length - lis.length);
console.log(A_removed.join('\n'));
