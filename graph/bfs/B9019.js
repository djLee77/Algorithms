//DSLR
const fs = require('fs');

const [N, ...arr] = fs
  .readFileSync('../../input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((item) => item.split(' ').map((v) => +v));

const cmds = ['D', 'S', 'L', 'R'];

const bfs = (num, target) => {
  const queue = [[num, '']];
  const visited = new Array(10000).fill(false);
  visited[num] = true;

  while (queue.length > 0) {
    const [register, cmd] = queue.shift();

    if (register === target) {
      return cmd;
    }

    let next_register;

    // D command
    next_register = (register * 2) % 10000;
    if (!visited[next_register]) {
      visited[next_register] = true;
      queue.push([next_register, cmd + 'D']);
    }

    // S command
    next_register = register === 0 ? 9999 : register - 1;
    if (!visited[next_register]) {
      visited[next_register] = true;
      queue.push([next_register, cmd + 'S']);
    }

    // L command
    next_register = (register % 1000) * 10 + Math.floor(register / 1000);
    if (!visited[next_register]) {
      visited[next_register] = true;
      queue.push([next_register, cmd + 'L']);
    }

    // R command
    next_register = (register % 10) * 1000 + Math.floor(register / 10);
    if (!visited[next_register]) {
      visited[next_register] = true;
      queue.push([next_register, cmd + 'R']);
    }
  }
};

let output = '';
arr.forEach(([num, target]) => {
  output += bfs(num, target) + '\n';
});

console.log(output);
