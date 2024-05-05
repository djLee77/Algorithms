//마인크래프트
const fs = require('fs');

let input = fs
  .readFileSync('../input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((item) => item.split(' ').map((item) => Number(item)));

let [N, M, B] = input.shift();

let blocks = [].concat(...input);
let min_height = Math.min(...blocks);
let inventory = B;
let bestTime = Infinity;
let bestHeight = 0;

for (let H = min_height; H <= 256; H++) {
  let currentTime = 0;
  let currentInventory = inventory;

  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i] < H) {
      currentTime += H - blocks[i]; // 블록 추가
      currentInventory -= H - blocks[i];
    } else if (blocks[i] > H) {
      currentTime += 2 * (blocks[i] - H); // 블록 제거
      currentInventory += blocks[i] - H;
    }
  }

  if (
    currentInventory >= 0 &&
    (currentTime < bestTime || (currentTime === bestTime && H > bestHeight))
  ) {
    bestTime = currentTime;
    bestHeight = H;
  }
}

console.log(`${bestTime} ${bestHeight}`);
