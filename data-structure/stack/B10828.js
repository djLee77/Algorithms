//스택
const fs = require('fs');

const input = fs
  .readFileSync('../input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((item) => item.replace(/\r/, '').split(' '));

const n = Number(input.shift());
let stack = [];
let output = '';

for (let i = 0; i < input.length; i++) {
  let cmd = input[i][0];

  switch (cmd) {
    case 'push':
      stack.push(+input[i][1]);
      break;
    case 'pop':
      output += stack.length > 0 ? stack.pop() + '\n' : '-1\n';
      break;
    case 'size':
      output += stack.length + '\n';
      break;
    case 'empty':
      output += stack.length > 0 ? '0\n' : '1\n';
      break;
    case 'top':
      output += stack.length > 0 ? stack[stack.length - 1] + '\n' : '-1\n';
      break;
  }
}

console.log(output);
