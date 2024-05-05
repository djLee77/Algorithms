//최단경로
const fs = require('fs');

const [[V, E], [startNode], ...map] = fs
  .readFileSync('../input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((item) => item.split(' ').map((V) => +V));

class MinHeap {
  constructor() {
    this.heap = [null];
  }

  push(value) {
    this.heap.push(value);

    let currentIndex = this.heap.length - 1;
    let parentIndex = Math.floor(currentIndex / 2);

    while (
      currentIndex > 1 &&
      this.heap[parentIndex].cost > this.heap[currentIndex].cost
    ) {
      let tmp = this.heap[currentIndex];
      this.heap[currentIndex] = this.heap[parentIndex];
      this.heap[parentIndex] = tmp;

      currentIndex = parentIndex;
      parentIndex = Math.floor(currentIndex / 2);
    }
  }

  pop() {
    if (this.heap.length === 2) {
      return this.heap.pop();
    }

    let value = this.heap[1];
    this.heap[1] = this.heap.pop();

    let currentIndex = 1;
    let leftChildIndex = 2;
    let rightChildIndex = 3;

    while (leftChildIndex < this.heap.length) {
      let swapIndex = leftChildIndex;

      if (
        rightChildIndex < this.heap.length &&
        this.heap[rightChildIndex].cost < this.heap[leftChildIndex].cost
      ) {
        swapIndex = rightChildIndex;
      }

      if (this.heap[currentIndex].cost < this.heap[swapIndex].cost) {
        break;
      }

      let tmp = this.heap[currentIndex];
      this.heap[currentIndex] = this.heap[swapIndex];
      this.heap[swapIndex] = tmp;

      currentIndex = swapIndex;
      leftChildIndex = swapIndex * 2;
      rightChildIndex = swapIndex * 2 + 1;
    }

    return value;
  }

  length() {
    return this.heap.length - 1;
  }
}

let graph = Array.from(Array(V + 1), () => []);

map.forEach(([u, v, w]) => {
  graph[u].push({ to: v, cost: w });
});

const dijkstra = (start) => {
  let distance = Array(V + 1).fill(Infinity);
  distance[start] = 0;

  const heap = new MinHeap();

  heap.push({ to: start, cost: 0 });

  while (heap.length() > 0) {
    const { to, cost } = heap.pop();

    if (distance[to] < cost) continue;

    graph[to].forEach((nextNode) => {
      const nextCost = cost + nextNode.cost;
      if (distance[nextNode.to] > nextCost) {
        distance[nextNode.to] = nextCost;
        heap.push({ to: nextNode.to, cost: nextCost });
      }
    });
  }

  return distance;
};

const distanceFromStartNode = dijkstra(startNode);

let answer = '';
for (let i = 1; i <= V; i++) {
  if (distanceFromStartNode[i] === Infinity) {
    answer += 'INF' + '\n';
  } else {
    answer += distanceFromStartNode[i] + '\n';
  }
}

console.log(answer);
