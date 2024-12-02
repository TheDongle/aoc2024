type Test = (a?: number, b?: number) => boolean;

function makeOrderTest(a?: number, b?: number): Test {
  if (a === undefined || b === undefined) {
    return (_a?: number, _b?: number) => true;
  }
  if (b > a) {
    return (a?: number, b?: number) =>
      a === undefined || b === undefined || b > a;
  }
  return (a?: number, b?: number) =>
    a === undefined || b === undefined || a > b;
}

function safeDistance(a?: number, b?: number): boolean {
  if (a === undefined || b === undefined) {
    return true;
  }
  const distance = Math.abs(b - a);
  return 0 < distance && distance < 4;
}

function isSafeLevel(
  prev?: number,
  current?: number,
  next?: number,
): boolean {
  const safeOrder = makeOrderTest(prev, current);
  if (!safeOrder(current, next)) {
    return false;
  }
  if (!(safeDistance(prev, current) && safeDistance(current, next))) {
    return false;
  }
  return true;
}

function isSafeReport(report: number[], isDampenerOn: boolean): boolean {
  for (let i = 0; i < report.length; i++) {
    if (!isSafeLevel(report[i - 1], report[i], report[i + 1])) {
      if (isDampenerOn) {
        return isSafeReport(report.toSpliced(i - 1, 1), false) ||
          isSafeReport(report.toSpliced(i, 1), false) ||
          isSafeReport(report.toSpliced(i + 1, 1), false);
      }
      return false;
    }
  }
  return true;
}

export { isSafeLevel, isSafeReport };
