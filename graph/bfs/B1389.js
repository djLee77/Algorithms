//케빈 베이컨의 6단계 법칙
const fs = require('fs');

const input = fs
  .readFileSync('../input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((item) => item.split(' ').map((item) => Number(item)));

const [N, M] = input.shift();

const graph = Array.from(Array(N + 1), () => []);
const user = {};

input.forEach(([from, to]) => {
  graph[from].push(to);
  graph[to].push(from);
  user[from] = 0;
  user[to] = 0;
});

graph.forEach((g) => g.sort((a, b) => a - b));

const bfs = (start, end) => {
  if (start === end) return 0;

  const visited = new Array(N + 1).fill(false);
  const queue = [[start, 0]];
  visited[start] = true;

  while (queue.length > 0) {
    const [node, w] = queue.shift();

    if (node === end) return w;

    for (nextNode of graph[node]) {
      if (!visited[nextNode]) {
        visited[nextNode] = true;
        queue.push([nextNode, w + 1]);
      }
    }
  }

  return 0;
};

let arr = Object.keys(user).map((item) => +item);
let min = Infinity;
let answer = 0;

Object.entries(user).forEach(([key, value]) => {
  let cnt = 0;

  for (let i = 0; i < arr.length; i++) {
    cnt += bfs(Number(key), arr[i]);
  }

  user[key] = cnt;

  if (min > cnt) {
    min = cnt;
    answer = key;
  }
});

console.log(answer);

/* Array, Object, Date와 같은 일부 객체들은 new 키워드 없이 생성 가능,
 from 내장 함수에 대해 처음알았음 */
