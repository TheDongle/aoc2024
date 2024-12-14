// merges two sorted subarrays into one sorted array
function merge(
  arrayToSort: number[],
  compareFn: (arg0: number, arg1: number) => number,
  // starting index of left subarray
  leftPointer?: number,
  // point that subarrays split
  midPointer?: number,
  // combined length of subarrays
  rightPointer?: number,
): number[] {
  // Defaults args mainly exist for testing purposes
  leftPointer ??= 0;
  rightPointer ??= arrayToSort.length;
  midPointer ??= Math.ceil((rightPointer - leftPointer) / 2);
  //
  // Creating subarrays
  //
  // left subarray must be equal to or 1 greater than right subarray
  const leftLength = midPointer - leftPointer;
  const leftSub = arrayToSort.slice(leftPointer, midPointer);

  const rightLength = rightPointer - midPointer;
  const rightSub = arrayToSort.slice(midPointer, rightPointer);
  //
  // Merging subarrays
  //
  let mergedIndex = leftPointer;
  let leftSubIndex = 0;
  let rightSubIndex = 0;

  // Copy the next ordered item from either left or right subarray
  while (leftSubIndex < leftLength && rightSubIndex < rightLength) {
    // order is defined by SortFn argument
    const order = compareFn(leftSub[leftSubIndex], rightSub[rightSubIndex]);
    if (order < 0) {
      arrayToSort[mergedIndex] = leftSub[leftSubIndex];
      leftSubIndex++;
    } else {
      arrayToSort[mergedIndex] = rightSub[rightSubIndex];
      rightSubIndex++;
    }
    mergedIndex++;
  }
  // Either left or right subarray has been exhausted at this point
  // Whatever remains can be copied over as-is
  while (leftSubIndex < leftLength) {
    arrayToSort[mergedIndex] = leftSub[leftSubIndex];
    mergedIndex++;
    leftSubIndex++;
  }
  while (rightSubIndex < rightLength) {
    arrayToSort[mergedIndex] = rightSub[rightSubIndex];
    mergedIndex++;
    rightSubIndex++;
  }
  return arrayToSort;
}

// Splits array into subarrays of one item each
// then merges them all back into a single sorted array
function mergeSort(
  arrayToSort: number[],
  // Works the same as the compareFn in array.sort()
  compareFn: (arg0: number, arg1: number) => number,
  // first item in left subarray
  leftPointer?: number,
  // combined length of subarrays
  rightPointer?: number,
): number[] {
  leftPointer ??= 0;
  rightPointer ??= arrayToSort.length;
  if (leftPointer >= rightPointer - 1) {
    return arrayToSort;
  }
  const midPointer = Math.ceil((leftPointer + rightPointer) / 2);
  mergeSort(arrayToSort, compareFn, leftPointer, midPointer);
  mergeSort(arrayToSort, compareFn, midPointer, rightPointer);
  merge(arrayToSort, compareFn, leftPointer, midPointer, rightPointer);
  return arrayToSort;
}

export { mergeSort };
