import TextParser from "../dayTwo/parse.ts";

// Only Part One finished today

// Note for part two - Sorting!


type Rules = Map<number, Set<number>>;
type Manuals = number[][];

export function parseData(path: string): { rules: Rules; manuals: Manuals } {
  const data = new TextParser(path).numberArrays();
  const splitPoint = data.findIndex((x) => x.length === 0);
  const rules: Rules = new Map();
  for (const [first, second] of data.slice(0, splitPoint)) {
    rules.set(first, (rules.get(first) ?? new Set<number>()).add(second));
  }
  return { rules, manuals: data.slice(splitPoint + 1) };
}

export function validMiddlePage(rules: Rules, manual: number[]): number {
  const ruleObserved = new Map<number, number>();
  const pageSeen = new Set<number>();
  for (let i = 0; i < manual.length; i++) {
    const page = manual[i];
    const pageRules = rules.get(page) ?? new Set<number>();
    if (
      i < (ruleObserved.get(page) ?? 0) || !pageRules.isDisjointFrom(pageSeen)
    ) {
      return 0;
    }
    pageRules.forEach((rule) =>
      ruleObserved.set(rule, (ruleObserved.get(rule) ?? 0) + 1)
    );
    pageSeen.add(page);
  }
  return manual[Math.floor(manual.length / 2)];
}

export function menInTheMiddle(path: string): number {
  const { manuals, rules } = parseData(path);
  return manuals.reduce((a, b) => a + validMiddlePage(rules, b), 0);
}
