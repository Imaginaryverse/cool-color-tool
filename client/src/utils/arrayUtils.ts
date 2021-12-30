export function shuffleArray(array: Array<any>): Array<any> {
  return [...array].sort(() => Math.random() - 0.5);
}
