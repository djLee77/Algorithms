const fs = require('fs');

const [[N], arr] = fs
  .readFileSync('./input.txt')
  .toString()
  .split('\n')
  .map((item) => item.split(' ').map((v) => +v));

let cards = Array(1000001).fill(0);
let scores = Array(1000001).fill(0);

arr.forEach((num) => {
  cards[num] = 1;
});

arr.forEach((num) => {
  for (let i = num * 2; i < 1000001; i += num) {
    if (cards[i] === 1) {
      scores[num]++;
      scores[i]--;
    }
  }
});

let answer = [];

arr.forEach((num) => {
  answer.push(scores[num]);
});

console.log(answer.join(' '));
