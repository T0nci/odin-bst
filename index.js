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

  function assembleTree(arr) {}

  function buildTree(arr) {
    mergeSort(arr, 0, arr.length - 1, []);
    console.log(arr);

    // Remove duplicates

    assembleTree(arr);
  }

  const root = buildTree(array);
  return {};
}

const example = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const binarySearchTree = Tree(example);
