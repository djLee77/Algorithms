//후위 표기식
const fs = require('fs');

const input = fs
  .readFileSync('../../input.txt')
  .toString()
  .trim()
  .replace(/\r/, '');

const stack = [];

const predence = {
  '*': 2,
  '/': 2,
  '+': 1,
  '-': 1,
};

let output = '';
for (let i = 0; i < input.length; i++) {
  const char = input[i];

  if (char.match(/[A-Z]/)) {
    output += char;
    continue;
  }

  if (char === '(') {
    stack.push(char);
    continue;
  }

  if (char === ')') {
    while (stack[stack.length - 1] !== '(') {
      output += stack.pop();
    }
    stack.pop();
    continue;
  }

  while (
    stack.length > 0 &&
    predence[stack[stack.length - 1]] >= predence[char]
  ) {
    output += stack.pop();
  }

  stack.push(char);
}

while (stack.length > 0) {
  output += stack.pop();
}

console.log(output);
