//베르트랑 공준
const fs = require('fs');

const input = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n')
  .map((item) => Number(item));

input.pop();

const Eratos = (M, N) => {
  var arr = [];

  arr[0] = false;
  arr[1] = false;

  for (let i = 2; i <= N; i++) {
    arr.push(true);
  }

  for (let i = 2; i * i <= N; i++) {
    if (arr[i]) {
      for (let j = i * i; j <= N; j += i) {
        arr[j] = false;
      }
    }
  }

  let cnt = 0;

  for (let i = M; i < arr.length; i++) {
    if (arr[i]) {
      cnt++;
    }
  }

  return cnt;
};

let answer = [];

for (let i = 0; i < input.length; i++) {
  answer.push(Eratos(input[i] + 1, input[i] * 2));
}

console.log(answer.join('\n'));
