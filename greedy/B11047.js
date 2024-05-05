//동전 0
const fs = require('fs');

let input = fs.readFileSync('../input.txt').toString().trim().split('\n');

let [N, V] = input
  .shift()
  .split(' ')
  .map((item) => +item);

input = input.map((item) => +item);

let index = input.length - 1;
let cnt = 0;

while (V > 0) {
  if (input[index] > V) {
    index--;
    continue;
  }

  V = V - input[index];
  cnt++;
}

console.log(cnt);
