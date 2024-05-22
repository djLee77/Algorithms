//LCS
const fs = require('fs');

const [stringA, stringB] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split('\n')
  .map((v) => v.replace(/\r/, '').split(''));

let LCS = new Array(stringA.length + 1)
  .fill(0)
  .map((v) => (v = new Array(stringB.length + 1).fill(0)));

for (let i = 1; i <= stringA.length; i++) {
  for (let j = 1; j <= stringB.length; j++) {
    if (stringA[i - 1] == stringB[j - 1]) {
      LCS[i][j] = LCS[i - 1][j - 1] + 1;
    } else {
      LCS[i][j] = Math.max(LCS[i - 1][j], LCS[i][j - 1]);
    }
  }
}

console.log(LCS.pop().pop());
