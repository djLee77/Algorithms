//골드바흐 파티션
const fs = require('fs');

const input = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n')
  .map((item) => Number(item));

input.shift();

const Eratos = (N) => {
  let arr = Array(N + 1).fill(true);
  let cnt = 0;

  arr[0] = false;
  arr[1] = false;

  for (let i = 2; i <= Math.sqrt(N); i++) {
    for (let j = i * i; j <= N; j += i) {
      arr[j] = false;
    }
  }

  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      if (arr[N - i]) {
        cnt++;
      }
    }
  }

  if (arr[N / 2]) {
    return (cnt = (cnt + 1) / 2);
  } else {
    return (cnt = cnt / 2);
  }
};

let answer = [];

for (let i = 0; i < input.length; i++) {
  answer.push(Eratos(input[i]));
}

console.log(answer.join('\n'));
