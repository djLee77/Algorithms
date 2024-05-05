//리모콘
//브루트포스

const fs = require("fs");

let [N, M, wrongButtons] = fs
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n")
  .map((item) => item.split(" ").map((item) => Number(item)));

if (M[0] === 0) {
  cnt1 = Math.abs(N[0] - 100);
  cnt2 = N[0].toString().length;

  console.log(cnt1 > cnt2 ? cnt2 : cnt1);
} else {
  let cnt1 = Infinity;
  let cnt2 = Infinity;

  cnt1 = Math.abs(N[0] - 100);

  for (let i = 0; i < 1000000; i++) {
    let channel = i.toString();

    if (wrongButtons.some((item) => channel.includes(item.toString()))) {
      continue;
    }

    let cnt = Math.abs(N[0] - i) + channel.length;

    if (cnt2 > cnt) cnt2 = cnt;
  }

  console.log(cnt1 > cnt2 ? cnt2 : cnt1);
}
