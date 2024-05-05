//부분 문자열
const fs = require('fs');

const input = fs
  .readFileSync('../input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((item) => item.replace(/\r/, '').split(' '));

for (let i = 0; i < input.length; i++) {
  let [s, t] = input[i];

  let queue = s.split('');

  for (let i = 0; i < t.length; i++) {
    if (queue[0] === t[i]) {
      queue.shift();
    }
  }

  console.log(queue.length > 0 ? 'No' : 'Yes');
}
