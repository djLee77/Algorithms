//최소 힙

const fs = require('fs');

class MinHeap {
  constructor() {
    this.heap = [null];
  }

  push(value) {
    this.heap.push(value);

    let currentNode = this.heap.length - 1;
    let parentNode = Math.floor(currentNode / 2);

    while (
      this.heap[parentNode] > this.heap[currentNode] &&
      currentNode !== 1
    ) {
      let tmp = this.heap[parentNode];
      this.heap[parentNode] = this.heap[currentNode];
      this.heap[currentNode] = tmp;

      currentNode = parentNode;
      parentNode = Math.floor(currentNode / 2);
    }
  }

  pop() {
    if (this.heap.length < 2) {
      return 0;
    }

    if (this.heap.length === 2) {
      return this.heap.pop();
    }

    let value = this.heap[1];
    this.heap[1] = this.heap.pop();

    let currentNode = 1;
    let leftChildNode = 2;
    let rightChildNode = 3;

    while (leftChildNode < this.heap.length) {
      let swapNode = leftChildNode;

      if (
        rightChildNode < this.heap.length &&
        this.heap[rightChildNode] < this.heap[leftChildNode]
      ) {
        swapNode = rightChildNode;
      }

      if (this.heap[currentNode] < this.heap[swapNode]) {
        break;
      }

      let tmp = this.heap[currentNode];
      this.heap[currentNode] = this.heap[swapNode];
      this.heap[swapNode] = tmp;
      currentNode = swapNode;

      leftChildNode = currentNode * 2;
      rightChildNode = currentNode * 2 + 1;
    }
    return value;
  }
}

const minHeap = new MinHeap();
const [N, ...input] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n')
  .map((item) => +item);

let answer = '';

for (let i = 0; i < N; i++) {
  if (input[i] > 0) {
    minHeap.push(input[i]);
  } else {
    answer += minHeap.pop() + '\n';
  }
}

console.log(answer);
