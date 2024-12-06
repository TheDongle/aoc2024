function isSafeLevel(prev: number, current: number, next?: number): boolean {
  const distance = Math.abs(current - prev);
  return 0 < distance && distance < 4 &&
    (next === undefined
      ? true
      : (current > prev)
      ? (next > current)
      : (current > next));
}

function isSafeReport(report: number[], tolerance: number): boolean {
  for (let i = 1; i < report.length; i++) {
    if (!isSafeLevel(report[i - 1], report[i], report[i + 1])) {
      if (tolerance === 0) {
        return false;
      }
      return isSafeReport(report.toSpliced(i - 1, 1), tolerance - 1) ||
        isSafeReport(report.toSpliced(i, 1), tolerance - 1) ||
        isSafeReport(report.toSpliced(i + 1, 1), tolerance - 1);
    }
  }
  return true;
}

export { isSafeLevel, isSafeReport };
