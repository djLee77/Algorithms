const fs = require("fs");

const [[N, M], startNodes, ...map] = fs
  .readFileSync("../input.txt")
  .toString()
  .trim()
  .split("\n")
  .map((item) => item.split(" ").map((v) => +v));

startNodes.shift();
map.map((item) => item.shift());

let graph = Array.from(Array(N + 1), () => []);

map.forEach((nodes) => {
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      graph[nodes[i]].push(nodes[j]);
      graph[nodes[j]].push(nodes[i]);
    }
  }
});

let dfsVisited = Array(N + 1).fill(false);

const dfs = (node) => {
  dfsVisited[node] = true;

  graph[node].forEach((nextNode) => {
    if (!dfsVisited[nextNode]) {
      dfsVisited[nextNode] = true;
      dfs(nextNode);
    }
  })
};

startNodes.forEach((node) => {
  dfs(node);
})

let cnt = 0;

map.forEach((partyPeople) => {
  let canSpeakLie = true;
  for (let i = 0; i < partyPeople.length; i++) {
    if (dfsVisited[partyPeople[i]]) canSpeakLie = false;
  }

  if (canSpeakLie) cnt++;
})

console.log(cnt);
