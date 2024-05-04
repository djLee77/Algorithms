const fs = require("fs");

const [[N, M], heightOfTrees] = fs
  .readFileSync("../input.txt")
  .toString()
  .trim()
  .split("\n")
  .map((item) => item.split(" ").map((v) => +v));

heightOfTrees.sort((a, b) => a - b);

let minH = 0;
let maxH = heightOfTrees[heightOfTrees.length - 1];
let bestHeigth = 0;

while (minH < maxH) {
  let midH = Math.floor((maxH + minH) / 2);
  let sumOfWood = 0;
  heightOfTrees.forEach((height) => {
    if (height - midH > 0) {
      sumOfWood += height - midH;
    }
  });

  if (sumOfWood >= M) {
    if (midH > bestHeigth) {
      bestHeigth = midH;
    }
    minH = midH + 1;
  } else {
    maxH = midH;
  }
}

console.log(bestHeigth);
