const fs = require('fs');

class AbsHeap {
  constructor() {
    this.heap = [null];
  }

  push(value) {
    this.heap.push(value);

    let currentIndex = this.heap.length - 1;
    let parentIndex = Math.floor(currentIndex / 2);

    while (
      Math.abs(this.heap[parentIndex]) > Math.abs(this.heap[currentIndex]) &&
      currentIndex !== 1
    ) {
      if (
        parentIndex > 0 &&
        (Math.abs(this.heap[parentIndex]) > Math.abs(this.heap[currentIndex]) ||
          (Math.abs(this.heap[parentIndex]) ===
            Math.abs(this.heap[currentIndex]) &&
            this.heap[parentIndex] > this.heap[currentIndex]))
      ) {
        break;
      }
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
        (rightChildIndex < this.heap.length &&
          Math.abs(this.heap[rightChildIndex]) <
            Math.abs(this.heap[leftChildIndex])) ||
        (Math.abs(this.heap[rightChildIndex]) ===
          Math.abs(this.heap[leftChildIndex]) &&
          this.heap[rightChildIndex] < this.heap[leftChildIndex])
      ) {
        swapIndex = rightChildIndex;
      }

      if (
        Math.abs(this.heap[currentIndex]) < Math.abs(this.heap[swapIndex]) ||
        (Math.abs(this.heap[currentIndex]) === Math.abs(this.heap[swapIndex]) &&
          this.heap[currentIndex] < this.heap[swapIndex])
      ) {
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
}

const [N, ...input] = fs
  .readFileSync('../input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((item) => +item);

const heap = new AbsHeap();

let output = '';

input.forEach((cmd) => {
  if (cmd === 0) {
    output += heap.pop() + '\n';
  } else {
    heap.push(cmd);
  }
});

console.log(output);
