//특정한 최단 경로
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
rl.on('line', function (line) {
  input.push(line);
}).on('close', function () {
  const [N, E] = input[0].split(' ').map(Number);
  const graph = Array.from({ length: N + 1 }, () => []);
  for (let i = 1; i <= E; i++) {
    const [a, b, c] = input[i].split(' ').map(Number);
    graph[a].push({ to: b, cost: c });
    graph[b].push({ to: a, cost: c });
  }
  const [v1, v2] = input[E + 1].split(' ').map(Number);

  function dijkstra(start) {
    const dist = Array(N + 1).fill(Infinity);
    const queue = [];
    dist[start] = 0;
    queue.push({ to: start, cost: 0 });
    while (queue.length) {
      queue.sort((a, b) => a.cost - b.cost); // 우선순위 큐 역할
      const { to, cost } = queue.shift();
      if (dist[to] < cost) continue;
      for (const next of graph[to]) {
        const nextCost = cost + next.cost;
        if (nextCost < dist[next.to]) {
          dist[next.to] = nextCost;
          queue.push({ to: next.to, cost: nextCost });
        }
      }
    }
    return dist;
  }

  const dist1 = dijkstra(1);
  const distV1 = dijkstra(v1);
  const distV2 = dijkstra(v2);

  const route1 = dist1[v1] + distV1[v2] + distV2[N];
  const route2 = dist1[v2] + distV2[v1] + distV1[N];

  const answer = Math.min(route1, route2);
  console.log(answer >= Infinity ? -1 : answer);

  process.exit();
});
