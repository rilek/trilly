export const parseKv = (x: unknown): string =>
  typeof x === "string" ? `"${x}"` : (x as string);

export const chunk = <T extends unknown>(arr: T[], size: number): T[][] => {
  const res: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    res.push(arr.slice(i, i + size));
  }
  return res;
};

export const second = ([, x]: unknown[]) => x;
