//LCS 2
const fs = require('fs');

const [A, B] = fs
  .readFileSync('../input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((v) => v.replace(/\r/, '').split(''));

let LCS = new Array(A.length + 1)
  .fill(0)
  .map((v) => (v = new Array(B.length + 1).fill(0)));

for (let i = 1; i <= A.length; i++) {
  for (let j = 1; j <= B.length; j++) {
    if (A[i - 1] == B[j - 1]) {
      LCS[i][j] = LCS[i - 1][j - 1] + 1;
    } else {
      LCS[i][j] = Math.max(LCS[i - 1][j], LCS[i][j - 1]);
    }
  }
}

let str = '';
let i = A.length;
let j = B.length;

while (i > 0 && j > 0) {
  if (LCS[i][j] === LCS[i - 1][j]) {
    i = i - 1;
  } else if (LCS[i][j] === LCS[i][j - 1]) {
    j = j - 1;
  } else {
    i = i - 1;
    j = j - 1;
    str = A[i] + str;
  }
}

console.log(LCS.pop().pop());
console.log(str);
