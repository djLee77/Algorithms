//가장 긴 증가하는 부분 수열 2
const fs = require('fs');
const [[N], arr] = fs
  .readFileSync('../input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((item) => item.split(' ').map((v) => +v));

let lis = [arr[0]];
let A = [1];

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

for (let i = 1; i < N; i++) {
  if (lis[lis.length - 1] < arr[i]) {
    lis.push(arr[i]);
    A[i] = lis.length;
  } else {
    let index = binary_search(arr[i]);
    lis[index] = arr[i];
    A[i] = index + 1;
  }
}

let max = lis.length;
let str = '';

for (let i = N - 1; i >= 0; i--) {
  if (A[i] === max) {
    str = arr[i] + ' ' + str;
    max--;
  }
}

console.log(lis.length);
console.log(str);
