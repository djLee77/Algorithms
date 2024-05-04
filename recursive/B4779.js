const fs = require("fs");

const input = fs
  .readFileSync("../input.txt")
  .toString()
  .trim()
  .split("\n")
  .map((item) => +item);

const lines = input.map((item) => Array(Math.pow(3, item)).fill("-").join(""));

const recFunc = (line) => {
  if (!line.includes("------")) {
    return "- -";
  }

  let cnt = line.length / 3;
  let leftLine = Array(cnt).fill("-").join("");
  let rightLine = leftLine;
  let middleTab = Array(cnt).fill(" ").join("");

  leftLine = recFunc(leftLine);
  rightLine = recFunc(rightLine);

  return leftLine + middleTab + rightLine;
};

lines.forEach((line) => {
  if (line === "-") {
    console.log("-");
  } else {
    console.log(recFunc(line));
  }
});
