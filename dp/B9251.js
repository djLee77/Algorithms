//LCS
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
let max = LCS[LCS.length - 1][LCS[LCS.length - 1].length - 1];
for (let i = LCS[LCS.length - 1].length - 1; i > 0; i--) {
  if (LCS[LCS.length - 1][i] === max) {
    str = A[i - 1] + ' ' + str;
    max--;
  }
}

console.log(LCS);
console.log(str);
console.log(max);
