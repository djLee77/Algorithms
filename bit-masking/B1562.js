//계단 수
const VISITED_ALL = 1023;
const CUTTING_NUM = 1000000000;

const N = +require('fs').readFileSync('../input.txt').toString().trim();

let dp = Array.from(Array(N + 1), () =>
  Array.from(Array(10), () => Array(1 << 10).fill(-1))
);

const func = (length, num, visited_bit) => {
  if (length === N) {
    return visited_bit === VISITED_ALL ? 1 : 0;
  }

  if (dp[length][num][visited_bit] > -1) {
    return dp[length][num][visited_bit];
  }

  let cnt = 0;
  if (num + 1 < 10)
    cnt += func(length + 1, num + 1, visited_bit | (1 << (num + 1)));
  if (num - 1 >= 0)
    cnt += func(length + 1, num - 1, visited_bit | (1 << (num - 1)));

  dp[length][num][visited_bit] = cnt % CUTTING_NUM;
  return dp[length][num][visited_bit];
};

let total_cnt = 0;
for (let i = 1; i < 10; i++) {
  total_cnt = (total_cnt + func(1, i, 1 << i)) % CUTTING_NUM;
}

console.log(total_cnt);
