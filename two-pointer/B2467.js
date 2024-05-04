const fs = require('fs');

const [[N], arr] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n')
  .map((item) => item.split(' ').map((v) => +v));

let min_abs = Infinity;
let a = 0;
let b = 0;

let left = 0;
let right = N - 1;

while (left < right) {
  const sum = arr[left] + arr[right];
  const absSum = Math.abs(sum);

  if (absSum < min_abs) {
    min_abs = absSum; // 가장 작은 절대값을 갱신
    a = arr[left];
    b = arr[right];
  }

  if (sum > 0) {
    right--; // 합이 0보다 크면 우측 포인터를 왼쪽으로 이동
  } else {
    left++; // 합이 0보다 작으면 좌측 포인터를 오른쪽으로 이동
  }
}

console.log(`${a} ${b}`);
