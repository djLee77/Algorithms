// Z

const fs = require("fs");

const [N, r, c] = fs
  .readFileSync("../input.txt")
  .toString()
  .trim()
  .split(" ")
  .map((item) => Number(item));

const func = (N, r, c) => {
  if (N === 0) {
    return 0;
  }

  return (
    2 * (r % 2) + (c % 2) + 4 * func(N - 1, Math.floor(r / 2), Math.floor(c / 2))
  );
};

console.log(func(N, r, c));
