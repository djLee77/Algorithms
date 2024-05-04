function computePi(pattern) {
  const pi = Array(pattern.length).fill(0);
  let j = 0;
  for (let i = 1; i < pattern.length; i++) {
    while (j > 0 && pattern[i] !== pattern[j]) {
      j = pi[j - 1];
    }
    if (pattern[i] === pattern[j]) {
      j++;
      pi[i] = j;
    }
  }
  return pi;
}

function KMP(S, pattern) {
  const pi = computePi(pattern);
  let j = 0;
  let count = 0;
  for (let i = 0; i < S.length; i++) {
    while (j > 0 && S[i] !== pattern[j]) {
      j = pi[j - 1];
    }
    if (S[i] === pattern[j]) {
      if (j === pattern.length - 1) {
        count++;
        j = pi[j]; // 다음 매칭을 위해 패턴을 슬라이드하지 않고 j를 pi[j]로 설정
      } else {
        j++;
      }
    }
  }
  return count;
}

function solve(N, M, S) {
  let pattern = "I";
  for (let i = 0; i < N; i++) {
    pattern += "OI";
  }
  return KMP(S, pattern);
}

const fs = require("fs");

const [N, M, S] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((item) => item.replace(/\r/, ""));

// 함수 호출
console.log(solve(+N, +M, S)); // 결과값 출력
