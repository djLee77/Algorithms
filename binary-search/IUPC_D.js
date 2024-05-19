//엉성한 도토리 측정기
const fs = require('fs');

let [[N], sizes, [Q], acorns] = fs
  .readFileSync('./input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((item) =>
    item
      .replace(/\r/, '')
      .split(' ')
      .map((v) => +v)
  );

// 구멍의 크기를 인덱스를 더해 수정하고, 각 구멍 크기가 이전 구멍 크기보다 작으면 이전 구멍 크기로 수정
sizes = sizes.map((item, index) => item + index);
for (let i = 1; i < N; i++) {
  if (sizes[i] < sizes[i - 1]) {
    sizes[i] = sizes[i - 1];
  }
}

// lower_bound 함수 정의
function lower_bound(arr, target) {
  let left = 0;
  let right = arr.length;
  while (left < right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] >= target) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }
  return left;
}

let answer = [];

// 각 도토리에 대해 lower_bound를 사용하여 적절한 구멍을 찾음
for (let i = 0; i < Q; i++) {
  let index = lower_bound(sizes, acorns[i]);
  answer.push(index + 1);
}

// 결과 출력
console.log(answer.join(' '));
