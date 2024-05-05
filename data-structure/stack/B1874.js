//스택 수열
const fs = require('fs');

const input = fs.readFileSync('../input.txt').toString().trim().split('\n');

const T = +input.shift();

const func = (i) => {
  let output = [];

  let [N, M] = input[i].split(' ').map((item) => +item);
  let value = input[i + 1].split(' ').map((item) => +item);
  let arr = new Array(N).fill(0);
  arr[M] = 1;

  while (output.length < N) {
    if (output.includes(1)) break;
    if (value.some((item) => item > value[0])) {
      value.push(value.shift());
      arr.push(arr.shift());
    } else {
      value.shift();
      output.push(arr.shift());
    }
  }

  return output.indexOf(1);
};

for (let i = 0; i < T * 3; i += 2) {
  console.log(func(i) + 1);
}
