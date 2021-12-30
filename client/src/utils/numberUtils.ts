/**
 * @description Generates a random number between min and max inclusive.
 * @param min Default 0. Specifies the lowest possible value that can be returned.
 * @param max Default 100. Specifies the highest possible value that can be returned.
 * @returns An integer.
 */

export function getRandomNum(min: number = 0, max: number = 100): number {
  const maxActual: number = max + 1;
  return Math.floor(Math.random() * (maxActual - min) + min);
}

export function sumOf(values: number[]): number {
  return values.reduce((a, b) => {
    return a + b;
  }, 0);
}
