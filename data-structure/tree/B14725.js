//개미굴
class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(words) {
    let node = this.root;
    for (let word of words) {
      if (!node.children[word]) {
        node.children[word] = new TrieNode();
      }
      node = node.children[word];
    }
    node.isEndOfWord = true;
  }

  traverse(node = this.root, depth = 0) {
    const keys = Object.keys(node.children).sort();
    let result = '';
    for (let key of keys) {
      result += '--'.repeat(depth) + key + '\n';
      result += this.traverse(node.children[key], depth + 1);
    }
    return result;
  }
}

const fs = require('fs');
const [[SN], ...arr] = fs
  .readFileSync('../../input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((item) => item.replace(/\r/, '').split(' '));

const map = arr.map((item) => item.splice(1));
const N = +SN;
const trie = new Trie();

for (let i = 0; i < N; i++) {
  trie.insert(map[i]);
}

console.log(trie.traverse().trim());
