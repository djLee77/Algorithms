//숨바꼭질
//가중치가 있는 BFS

class Queue {
  constructor() {
    this.items = {};
    this.head = 0;
    this.tail = 0;
  }
  push(item) {
    this.items[this.tail] = item;
    this.tail++;
  }
  shift() {
    const item = this.items[this.head];
    delete this.items[this.head];
    this.head++;
    return item;
  }
  getLength() {
    return this.tail - this.head;
  }
}

const fs = require('fs');

const [N, M] = fs
  .readFileSync('../input.txt')
  .toString()
  .trim()
  .split(' ')
  .map((item) => +item);

let size = N > M ? N + 2 : M + 2;

const graph = Array.from(Array(size), () => []);

for (let i = 0; i < graph.length - 1; i++) {
  graph[i].push(i + 1);
  graph[i + 1].push(i);
  graph[i].push(i * 2);
}

const bfs = (start, end) => {
  const queue = new Queue();
  if (start === end) return 0;

  const visited = new Array(size).fill(false);
  queue.push([start, 0]);
  visited[start] = true;

  while (queue.getLength() > 0) {
    const [node, w] = queue.shift();

    if (node === end) return w;
    if (node > size - 1) continue;

    for (nextNode of graph[node]) {
      if (!visited[nextNode]) {
        visited[nextNode] = true;
        queue.push([nextNode, w + 1]);
      }
    }
  }

  return 0;
};

console.log(bfs(N, M));
