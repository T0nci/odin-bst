const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

function Tree(array) {
  function mergeSort(arr, start, end, temp) {
    // return because it's already sorted so we don't tamper with it
    if (start === end) return;

    const mid = Math.floor((start + end) / 2);

    mergeSort(arr, start, mid, temp);
    mergeSort(arr, mid + 1, end, temp);

    let left = start;
    let right = mid + 1;
    let tempPointer = 0;
    // Sort left and right into temp
    while (left <= mid && right <= end) {
      if (arr[left] < arr[right]) {
        // eslint-disable-next-line no-param-reassign
        temp[tempPointer] = arr[left];
        left += 1;
      } else {
        // eslint-disable-next-line no-param-reassign
        temp[tempPointer] = arr[right];
        right += 1;
      }

      tempPointer += 1;
    }

    // Make sure to copy any leftover values from one side
    while (left <= mid) {
      // eslint-disable-next-line no-param-reassign
      temp[tempPointer] = arr[left];

      left += 1;
      tempPointer += 1;
    }
    while (right <= end) {
      // eslint-disable-next-line no-param-reassign
      temp[tempPointer] = arr[right];

      right += 1;
      tempPointer += 1;
    }

    let i = 0;
    let j = start;
    // Copy over temp to arr so other merges can do their jobs
    while (j <= end) {
      // eslint-disable-next-line no-param-reassign
      arr[j] = temp[i];

      i += 1;
      j += 1;
    }
  }

  function assembleTree(arr, start, end) {
    if (start > end) return null;

    const middle = Math.floor((start + end) / 2);

    const node = new Node(arr[middle]);

    node.left = assembleTree(arr, start, middle - 1);
    node.right = assembleTree(arr, middle + 1, end);

    return node;
  }

  function buildTree(arr) {
    if (!Array.isArray(arr) || arr.length < 1)
      throw new Error("Tree factory function expects an array!");

    mergeSort(arr, 0, arr.length - 1, []);

    // Remove duplicates
    const cleanArr = arr.reduce((currArr, val) => {
      if (!currArr.includes(val)) currArr.push(val);
      return currArr;
    }, []);

    return assembleTree(cleanArr, 0, cleanArr.length - 1);
  }

  const root = buildTree(array);

  function insert(value) {
    let node = root;

    while (node !== null) {
      if (value < node.data) {
        if (node.left === null) {
          node.left = new Node(value);
          return;
        }
        node = node.left;
      } else if (node.right === null) {
        node.right = new Node(value);
        return;
      } else {
        node = node.right;
      }
    }
  }

  function deleteItem(value) {
    let curr = root;
    const prev = {
      node: null,
      left: false,
    };

    while (curr !== null) {
      if (value === curr.data) {
        if (curr.left === null && curr.right === null) {
          // If no children
          if (prev.left) {
            prev.node.left = null;
          } else {
            prev.node.right = null;
          }
        } else if (curr.left === null) {
          // If right child
          if (prev.left) {
            prev.node.left = curr.right;
          } else {
            prev.node.right = curr.right;
          }
        } else if (curr.right === null) {
          // If left child
          if (prev.left) {
            prev.node.left = curr.left;
          } else {
            prev.node.right = curr.left;
          }
        } else {
          // If both children

          // Find the smallest number after our current number
          prev.node = curr.right;
          while (prev.node.left !== null) {
            prev.node = prev.node.left;
          }

          // Store it, delete it, replace the current number for deletion
          // with it
          const replacementNodeData = prev.node.data;
          deleteItem(replacementNodeData);
          curr.data = replacementNodeData;
        }

        return;
      }

      if (value < curr.data) {
        prev.node = curr;
        prev.left = true;
        curr = curr.left;
      } else {
        prev.node = curr;
        prev.left = false;
        curr = curr.right;
      }
    }
  }

  function find(value) {
    let node = root;

    while (node !== null) {
      if (value === node.data) return node;

      if (value < node.data) node = node.left;
      else node = node.right;
    }

    return null;
  }

  function levelOrder(callback) {
    const returnArray = [];
    if (!callback || typeof callback !== "function") {
      // eslint-disable-next-line no-param-reassign
      callback = (node) => {
        returnArray.push(node.data);
      };
    }

    const q = [root];
    let i = 0;

    while (q[i] !== undefined) {
      callback(q[i]);

      if (q[i].left !== null) q.push(q[i].left);
      if (q[i].right !== null) q.push(q[i].right);

      i += 1;
    }

    if (returnArray.length > 0) return returnArray;

    return true;
  }

  function levelOrderRecursive(callback, arr, q) {
    if (!callback || typeof callback !== "function") {
      // eslint-disable-next-line no-param-reassign
      callback = (node) => {
        arr.push(node.data);
      };
    }

    if (!Array.isArray(arr)) {
      // eslint-disable-next-line no-param-reassign
      arr = [];
    }

    if (!Array.isArray(q)) {
      // eslint-disable-next-line no-param-reassign
      q = [root];
    }

    // Base case
    if (q.length <= 0) {
      if (arr.length > 0) return arr;

      return true;
    }

    callback(q[0]);

    if (q[0].left !== null) q.push(q[0].left);
    if (q[0].right !== null) q.push(q[0].right);

    q.shift();

    // Recursive case
    return levelOrderRecursive(callback, arr, q);
  }

  function inOrder(callback, node, arr) {
    // Base case
    if (node === null) return true;

    // eslint-disable-next-line no-param-reassign
    if (!(node instanceof Node)) node = root;
    // eslint-disable-next-line no-param-reassign
    if (!arr || !Array.isArray(arr)) arr = [];

    inOrder(callback, node.left, arr);

    if (typeof callback !== "function") {
      arr.push(node.data);
    } else {
      callback(node);
    }

    inOrder(callback, node.right, arr);

    return typeof callback !== "function" ? arr : true;
  }

  function preOrder(callback, node, arr) {
    // Base case
    if (node === null) return true;

    // eslint-disable-next-line no-param-reassign
    if (!(node instanceof Node)) node = root;
    // eslint-disable-next-line no-param-reassign
    if (!arr || !Array.isArray(arr)) arr = [];

    if (typeof callback !== "function") {
      arr.push(node.data);
    } else {
      callback(node);
    }

    preOrder(callback, node.left, arr);

    preOrder(callback, node.right, arr);

    return typeof callback !== "function" ? arr : true;
  }

  function postOrder(callback, node, arr) {
    // Base case
    if (node === null) return true;

    // eslint-disable-next-line no-param-reassign
    if (!(node instanceof Node)) node = root;
    // eslint-disable-next-line no-param-reassign
    if (!arr || !Array.isArray(arr)) arr = [];

    postOrder(callback, node.left, arr);

    postOrder(callback, node.right, arr);

    if (typeof callback !== "function") {
      arr.push(node.data);
    } else {
      callback(node);
    }

    return typeof callback !== "function" ? arr : true;
  }

  function height(node) {
    // Base case 1
    if (node.left === null && node.right === null) {
      return 0;
    }

    // Recursive case - -1 if no node to lose final comparison
    const left = (node.left ? height(node.left) : -1) + 1;
    const right = (node.right ? height(node.right) : -1) + 1;

    // Base case 2
    return left >= right ? left : right;
  }

  function depth(node) {
    let temp = root;
    let counter = 0;

    while (temp.data !== node.data) {
      if (temp.data > node.data) {
        temp = temp.left;
      } else {
        temp = temp.right;
      }

      counter += 1;
    }

    return counter;
  }

  function isBalanced() {
    const differenceBetweenHeights = Math.abs(
      height(root.left) - height(root.right),
    );

    return !(differenceBetweenHeights > 1);
  }

  function rebalance() {
    if (isBalanced()) return false;

    const sortedArr = inOrder();

    const newRoot = assembleTree(sortedArr, 0, sortedArr.length - 1);

    root.data = newRoot.data;
    root.left = newRoot.left;
    root.right = newRoot.right;

    return true;
  }

  return {
    root,
    insert,
    deleteItem,
    find,
    levelOrder,
    levelOrderRecursive,
    inOrder,
    preOrder,
    postOrder,
    height,
    depth,
    isBalanced,
    rebalance,
  };
}

const example = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const binarySearchTree = Tree(example);

console.log("insert:");
binarySearchTree.insert(0);
binarySearchTree.insert(21);
binarySearchTree.insert(222);
binarySearchTree.insert(1234);
prettyPrint(binarySearchTree.root);
console.log("--------------------------------------");

console.log("delete:");
binarySearchTree.deleteItem(0);
binarySearchTree.deleteItem(1);
binarySearchTree.deleteItem(8);
binarySearchTree.deleteItem(67);
prettyPrint(binarySearchTree.root);
console.log("--------------------------------------");

console.log("find:");
console.log(binarySearchTree.find(21));
console.log(binarySearchTree.find(9999));
console.log("--------------------------------------");

console.log("levelOrder:");
console.log(binarySearchTree.levelOrder());
console.log(
  binarySearchTree.levelOrderRecursive((node) => {
    console.log(node.data);
  }),
);
console.log("--------------------------------------");

console.log("pre, post, 2 inOrder:");
console.log(binarySearchTree.preOrder());
console.log(binarySearchTree.postOrder());
console.log(binarySearchTree.inOrder());
console.log(
  binarySearchTree.inOrder((node) => {
    console.log(node);
  }),
);
console.log("--------------------------------------");

console.log(`Height: ${binarySearchTree.height(binarySearchTree.find(9))}`);
console.log("--------------------------------------");

console.log(`Depth: ${binarySearchTree.depth(binarySearchTree.find(9))}`);
console.log(`Depth: ${binarySearchTree.depth(binarySearchTree.find(7))}`);
console.log(`Depth: ${binarySearchTree.depth(binarySearchTree.find(1234))}`);
console.log("--------------------------------------");

console.log("isBalanced:");
console.log(binarySearchTree.isBalanced());
binarySearchTree.insert(1290);
prettyPrint(binarySearchTree.root);
console.log(binarySearchTree.isBalanced());
console.log("--------------------------------------");

console.log(
  binarySearchTree.rebalance(),
  `isBalanced: ${binarySearchTree.isBalanced()}`,
);
prettyPrint(binarySearchTree.root);
console.log("--------------------------------------");

export { Tree, prettyPrint };
