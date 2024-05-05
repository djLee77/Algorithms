//AC
const fs = require('fs');

const TC = fs.readFileSync('../input.txt').toString().trim().split('\n');

const T = +TC.shift();

const AC = (cmds, arr) => {
  let left = 0;
  let right = arr.length;
  let reverse = false;

  for (let cmd of cmds) {
    if (cmd === 'R') {
      reverse = !reverse;
    } else if (cmd === 'D') {
      if (left === right) {
        return 'error';
      }
      if (reverse) {
        right--;
      } else {
        left++;
      }
    }
  }

  const result = [];
  if (reverse) {
    for (let i = right - 1; i >= left; i--) {
      result.push(arr[i]);
    }
  } else {
    for (let i = left; i < right; i++) {
      result.push(arr[i]);
    }
  }

  return `[${result.join(',')}]`;
};

let output = '';

for (let i = 0; i < T * 3; i += 3) {
  const cmds = TC[i].replace(/\r/, '').split('');
  let arr;
  if (TC[i + 2] === '[]') {
    arr = [];
  } else {
    arr = TC[i + 2].replace('[', '').replace(']', '').split(',').map(Number);
  }
  output += AC(cmds, arr) + '\n';
}

console.log(output);
