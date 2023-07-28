/**
 * Generates a random number between 0 and the given number (inclusive).
 *
 * @param {number} max - The maximum number for the range.
 * @return {number} A random number between 0 and the given number.
 */
export function generateRandomNumber(max: number): number {
  return Math.floor(Math.random() * (max + 1));
}