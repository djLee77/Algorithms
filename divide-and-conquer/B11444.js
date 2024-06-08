//피보나치 수 6
const fs = require('fs');
const mod = 1000000007n;
const N = BigInt(fs.readFileSync('../input.txt').toString().trim());
let memo = new Map();

const fibo = (N) => {
  if (N === 0n) return 0n;
  if (N === 1n) return 1n;
  if (N === 2n) return 1n;
  if (memo[N] > 0n) return memo[N];

  if (N % 2n === 0n) {
    memo[N] = (fibo(N / 2n) * (fibo(N / 2n + 1n) + fibo(N / 2n - 1n))) % mod;
  }

  if (N % 2n === 1n) {
    memo[N] = (fibo((N + 1n) / 2n) ** 2n + fibo((N - 1n) / 2n) ** 2n) % mod;
  }

  return memo[N];
};

console.log(fibo(N).toString().replace('n', ''));
