//수들의 합
const fs = require('fs');

let N = Number(fs.readFileSync('../input.txt').toString().trim());

let cnt = 0;
let i = 1;

while (N > 0) {
  N = N - i;
  i++;
  cnt++;
}

console.log(N);
console.log(cnt);

if (N < 0) {
  console.log(cnt - 1);
} else {
  console.log(cnt);
}
