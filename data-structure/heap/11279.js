//최대 힙

const fs = require('fs');

class MaxHeap {
  constructor() {
    this.heap = [null];
  }

  push(value) {
    this.heap.push(value);

    let currentIndex = this.heap.length - 1;
    let parentIndex = Math.floor(currentIndex / 2);

    while (
      this.heap[parentIndex] < this.heap[currentIndex] &&
      currentIndex !== 1
    ) {
      let tmp = this.heap[parentIndex];
      this.heap[parentIndex] = this.heap[currentIndex];
      this.heap[currentIndex] = tmp;

      currentIndex = parentIndex;
      parentIndex = Math.floor(currentIndex / 2);
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

    let currentIndex = 1;
    let leftChildIndex = 2;
    let rightChildIndex = 3;

    while (leftChildIndex < this.heap.length) {
      let swapIndex = leftChildIndex;
      if (
        rightChildIndex < this.heap.length &&
        this.heap[leftChildIndex] < this.heap[rightChildIndex]
      ) {
        swapIndex = rightChildIndex;
      }

      if (this.heap[swapIndex] < this.heap[currentIndex]) break;

      let tmp = this.heap[currentIndex];
      this.heap[currentIndex] = this.heap[swapIndex];
      this.heap[swapIndex] = tmp;

      currentIndex = swapIndex;
      leftChildIndex = currentIndex * 2;
      rightChildIndex = currentIndex * 2 + 1;
    }

    return value;
  }
}

let [N, ...input] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n')
  .map((item) => +item);

let output = '';
const maxHeap = new MaxHeap();

for (let i = 0; i < N; i++) {
  if (input[i] > 0) maxHeap.push(input[i]);
  if (input[i] === 0) output += maxHeap.pop() + '\n';
}

console.log(output);
