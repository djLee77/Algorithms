//구간 합 구하기5
const fs = require('fs');

const [[N, M], ...input] = fs
  .readFileSync('../input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((item) => item.split(' ').map((item) => +item));

const arr = input.splice(0, N);

for (let i = 0; i < arr.length; i++) {
  for (let j = 1; j < arr[i].length; j++) {
    arr[i][j] = arr[i][j - 1] + arr[i][j];
  }
}

let output = '';

for (let i = 0; i < input.length; i++) {
  let [x1, y1, x2, y2] = input[i];
  let sum = 0;
  for (let x = x1 - 1; x < x2; x++) {
    if (y1 > 1) {
      sum += arr[x][y2 - 1] - arr[x][y1 - 2];
    } else {
      sum += arr[x][y2 - 1];
    }
  }

  output += sum + '\n';
}

console.log(output);
