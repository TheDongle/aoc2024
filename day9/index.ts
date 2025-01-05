type HardDrive = (number | undefined)[];

function decodeBlock(
  firstCharacter: string,
  firstCharacterIndex: number,
  secondCharacter?: string,
): HardDrive {
  const blockId = parseInt(`${Math.floor(firstCharacterIndex / 2)}`);
  const memoryInUse = parseInt(firstCharacter);
  const memoryFree = parseInt(secondCharacter || "0");
  const blockLength = memoryInUse + memoryFree;
  return Array(blockLength).fill(blockId, 0, blockLength - memoryFree);
}

// function decodeFreeMemory(freeMemoryCharacter: string): undefined[] {
//   return Array(parseInt(freeMemoryCharacter || "0"));
// }

function decodeDiskMap(diskMapInput: string): HardDrive {
  const decodedDiskMapOutput: HardDrive = [];

  for (let index = 0; index < diskMapInput.length; index += 2) {
    decodedDiskMapOutput.push(
      ...decodeBlock(diskMapInput[index], index, diskMapInput[index + 1]),
    );
  }
  return decodedDiskMapOutput;
}

// type SizeToLocationGraph = Map<number, number[]>;

// const examineGraph = (spaceFree: number, graph: SizeToLocationGraph) => {
//   for (const key of graph.keys()) {
//     if (key <= spaceFree) {
//       const values = graph.get(key)!;
//       const ele = values.shift()!;
//       if (values.length === 0) {
//         graph.delete(key);
//       } else {
//         graph.set(key, values);
//       }
//       return ele;
//     }
//   }
//   return -1;
// };

// const makeUnvisitedSet = (diskMapInput: string): Map<number, number> => {
//   const unvisited = new Map<number, number>();
//   for (let i = diskMapInput.length - 1; i >= 0; i -= 2) {
//     unvisited.set(i, parseInt(diskMapInput[i]));
//   }
//   return unvisited;
// };

// const checkSet = (spaceFree: number, set: Map<number, number>) => {
//   for (const [key, val] of set.entries()) {
//     if (val <= spaceFree) {
//       set.delete(key);
//       return key;
//     }
//   }
//   return -1;
// };

// function decodeAndCompactDisk(diskMapInput: string): HardDrive {
//   const decodedStart: HardDrive = [];

//   const unvisitedSet = makeUnvisitedSet(diskMapInput);

//   const freeSpace: undefined[] = [];

//   for (let index = 0; index < diskMapInput.length; index += 2) {
//     if (unvisitedSet.has(index)) {
//       unvisitedSet.delete(index);

//       const spaceChar = diskMapInput[index + 1];

//       const leftBlock = decodeBlock(diskMapInput[index], index);

//       const startingSpace = parseInt(spaceChar) || 0;

//       while (startingSpace - leftBlock.length > 0) {
//         const nextBlockIndex = checkSet(
//           startingSpace - leftBlock.length,
//           unvisitedSet,
//         );
//         if (nextBlockIndex === -1) {
//           break;
//         }
//         const nextBlock = decodeBlock(
//           diskMapInput[nextBlockIndex],
//           nextBlockIndex,
//         );

//         leftBlock.push(...nextBlock);

//         freeSpace.length += parseInt(diskMapInput[nextBlockIndex + 1]) || 0;
//       }
//       decodedStart.push(...leftBlock);
//     }
//   }
//   return decodedStart.concat(freeSpace);
// }

function compactFiles(sparseDrive: HardDrive): HardDrive {
  const compactDrive = sparseDrive.slice();

  let left = 0;
  let right = compactDrive.length - 1;

  while (left < right) {
    if (compactDrive[right] !== undefined) {
      if (compactDrive[left] === undefined) {
        compactDrive[left] = compactDrive[right];
        compactDrive[right] = undefined;
      }
      left++;
    } else {
      right--;
    }
  }
  return compactDrive;
}

function updateFileSystemChecksum(compactedFilesInput: HardDrive): number {
  let checksum = 0;
  let index = 0;
  let currentBlock = compactedFilesInput[0];
  while (currentBlock !== undefined) {
    checksum += currentBlock * index;
    index++;
    currentBlock = compactedFilesInput[index];
  }
  return checksum;
}

function day9(pathToFile: string): number {
  return updateFileSystemChecksum(
    compactFiles(decodeDiskMap(Deno.readTextFileSync(pathToFile))),
  );
}

// function day9Part2(pathToFile: string): number {
//   return updateFileSystemChecksum(
//     decodeAndCompactDisk(Deno.readTextFileSync(pathToFile)),
//   );
// }


export { compactFiles, decodeDiskMap, updateFileSystemChecksum };

export default day9;
