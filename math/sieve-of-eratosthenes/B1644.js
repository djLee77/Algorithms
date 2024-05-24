//소수의 연속합
const fs = require('fs');

const N = +fs.readFileSync('../../input.txt').toString().trim();

const sieve = Array(N + 1).fill(true);
sieve[0] = false;
sieve[1] = false;

for (let i = 2; i <= Math.sqrt(N); i++) {
  for (let j = i * i; j <= N; j += i) {
    sieve[j] = false;
  }
}

const prime = sieve
  .map((item, index) => (item ? index : -1))
  .filter((value) => value > 0);

let cnt = 0;
if (prime[prime.length - 1] === N) cnt++;

for (let i = prime.length - 2; i >= 0; i--) {
  let sum = prime[i];
  for (let j = i - 1; j >= 0; j--) {
    sum += prime[j];
    if (sum === N) {
      cnt++;
    }

    if (sum > N) {
      break;
    }
  }
}

console.log(cnt);
