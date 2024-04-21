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
  return {
    root,
  };
}

const example = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const binarySearchTree = Tree(example);

prettyPrint(binarySearchTree.root);
