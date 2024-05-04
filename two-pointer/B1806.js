const fs = require('fs');

// 입력 데이터 읽기
let [[N, S], arr] = fs
  .readFileSync('../input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

// 포인터와 필요한 변수 초기화
let start = 0,
  end = 0,
  sum = 0,
  minLength = Infinity;

// 두 포인터를 사용하여 최소 길이의 부분 배열 찾기
while (end < N) {
  // sum이 S 이상이 될 때까지 end 포인터를 오른쪽으로 이동시키며 윈도우 확장
  while (end < N && sum < S) {
    sum += arr[end];
    end++;
  }

  // sum이 S 이상일 때, start 포인터를 이동시키며 가장 작은 윈도우 찾기
  while (sum >= S) {
    minLength = Math.min(minLength, end - start);
    sum -= arr[start];
    start++;
  }
}

// 만약 minLength가 업데이트되지 않았다면 유효한 부분 배열을 찾지 못한 것임
const result = minLength === Infinity ? 0 : minLength;

// 결과 출력
console.log(result);
