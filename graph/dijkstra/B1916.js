//최소비용 구하기

const fs = require('fs');

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
      this.heap[currentIndex].cost < this.heap[parentIndex].cost
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
      leftChildIndex = currentIndex * 2;
      rightChildIndex = currentIndex * 2 + 1;
    }

    return value;
  }

  length() {
    return this.heap.length - 1;
  }
}

const [[N], [M], ...map] = fs
  .readFileSync('../../input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((item) => item.split(' ').map((v) => +v));

const [startNode, destination] = map.pop();

let graph = Array.from(Array(N + 1), () => []);
map.forEach(([from, to, w]) => {
  graph[from].push({ to: to, cost: w });
});

const dijkstra = (start) => {
  const heap = new MinHeap();

  let totalCost = Array(N + 1).fill(Infinity);
  totalCost[start] = 0;

  heap.push({ to: start, cost: 0 });

  while (heap.length() > 0) {
    const { to, cost } = heap.pop();

    if (totalCost[to] < cost) continue;

    graph[to].forEach((nextNode) => {
      const nextCost = cost + nextNode.cost;
      if (totalCost[nextNode.to] > nextCost) {
        totalCost[nextNode.to] = nextCost;
        heap.push({ to: nextNode.to, cost: nextCost });
      }
    });
  }

  return totalCost;
};

const minCost = dijkstra(startNode);

console.log(minCost[destination]);
