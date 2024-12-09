type HardDrive = (number | undefined)[];

function decodeDiskMap(diskMapInput: string): HardDrive {
  const decodedDiskMapOutput: HardDrive = [];

  for (let index = 0; index < diskMapInput.length; index += 2) {
    const blockId = parseInt(`${Math.floor(index / 2)}`);
    const memoryInUse = parseInt(diskMapInput[index]);
    const memoryFree = parseInt(diskMapInput[index + 1]) || 0;

    const blockLength = memoryInUse + memoryFree;
    const nextBlock = Array(blockLength).fill(
      blockId,
      0,
      blockLength - memoryFree,
    );

    decodedDiskMapOutput.push(...nextBlock);
  }
  return decodedDiskMapOutput;
}

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

export { compactFiles, decodeDiskMap, updateFileSystemChecksum };

export default day9;
