// eslint-disable-next-line import/extensions
import { Tree, prettyPrint } from "./index.js";

const arr = [];
const numOfElements = Math.ceil(Math.random() * 10) + 10;
for (let i = 0; i < numOfElements; i += 1) {
  arr.push(Math.floor(Math.random() * 100));
}

const binarySearchTree = Tree(arr);
console.log(binarySearchTree.isBalanced());

for (let i = 0; i < 5; i += 1) {
  binarySearchTree.insert(Math.floor(Math.random() * 1000) + 100);
}
console.log(binarySearchTree.isBalanced());

binarySearchTree.rebalance();
console.log(binarySearchTree.isBalanced());

console.log("levelOrder:");
binarySearchTree.levelOrder((node) => {
  console.log(node.data);
});

console.log("preOrder:");
binarySearchTree.preOrder((node) => {
  console.log(node.data);
});

console.log("postOrder:");
binarySearchTree.postOrder((node) => {
  console.log(node.data);
});

console.log("inOrder:");
binarySearchTree.inOrder((node) => {
  console.log(node.data);
});

prettyPrint(binarySearchTree.root);
