const fs = require("fs");

const [[N], [M], ...input] = fs
  .readFileSync("../input.txt")
  .toString()
  .trim()
  .split("\n")
  .map((item) => item.split(" ").map((v) => +v));

let graph = Array.from(Array(N + 1), () => []);

input.forEach(([from, to]) => {
  graph[from].push(to);
  graph[to].push(from);
});

let visited = Array(N + 1);

let cnt = 0;

const dfs = (node) => {
  visited[node] = true;
  cnt++;

  graph[node].forEach((nextNode) => {
    if (!visited[nextNode]) {
      dfs(nextNode);
    }
  });
};

dfs(1);

console.log(cnt - 1);
