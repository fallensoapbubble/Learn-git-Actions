// utils.test.js
import utils from './utils.js';

capitalize = utils.capitalize;
arraySum = utils.arraySum;
formatDate=utils.formatDate;
// Test suite for the capitalize function
describe('capitalize', () => {
  test('should capitalize the first letter of a standard string', () => {
    expect(capitalize('hello')).toBe('Hello');
  });

  test('should work with a single-letter string', () => {
    expect(capitalize('a')).toBe('A');
  });

  test('should return the same string if the first letter is already capitalized', () => {
    expect(capitalize('World')).toBe('World');
  });

  // Edge case tests
  test('should throw an error for empty string input', () => {
    expect(() => capitalize('')).toThrow('Input must be a non-empty string.');
  });

  test('should throw an error for non-string input (number)', () => {
    expect(() => capitalize(123)).toThrow('Input must be a non-empty string.');
  });

  test('should throw an error for null or undefined input', () => {
    expect(() => capitalize(null)).toThrow('Input must be a non-empty string.');
    expect(() => capitalize(undefined)).toThrow('Input must be a non-empty string.');
  });
});


// Test suite for the arraySum function
describe('arraySum', () => {
  test('should return the sum of an array of positive numbers', () => {
    expect(arraySum([1, 2, 3])).toBe(6);
  });

  test('should return the sum of an array with negative numbers', () => {
    expect(arraySum([-1, -2, 3])).toBe(0);
  });

  test('should return 0 for an empty array', () => {
    expect(arraySum([])).toBe(0);
  });

  // Edge case tests
  test('should ignore non-numeric values in the array', () => {
    expect(arraySum([1, '2', 3, null, undefined, 'hello'])).toBe(4);
  });

  test('should throw an error if the input is not an array', () => {
    expect(() => arraySum('not an array')).toThrow('Input must be an array.');
    expect(() => arraySum(null)).toThrow('Input must be an array.');
    expect(() => arraySum({a: 1})).toThrow('Input must be an array.');
  });
});


// Test suite for the formatDate function
describe('formatDate', () => {
  test('should format a date object correctly into YYYY-MM-DD', () => {
    const date = new Date('2023-01-15T12:00:00Z'); // Use a specific date to avoid timezone issues
    expect(formatDate(date)).toBe('2023-01-15');
  });

  test('should pad month and day with leading zeros', () => {
    const date = new Date('2024-05-01T12:00:00Z');
    expect(formatDate(date)).toBe('2024-05-01');
  });

  // Edge case tests
  test('should throw an error for an invalid date object', () => {
    const invalidDate = new Date('not a real date');
    expect(() => formatDate(invalidDate)).toThrow('Input must be a valid Date object.');
  });

  test('should throw an error for non-date inputs', () => {
    expect(() => formatDate('2023-01-15')).toThrow('Input must be a valid Date object.');
    expect(() => formatDate(null)).toThrow('Input must be a valid Date object.');
    expect(() => formatDate(12345)).toThrow('Input must be a valid Date object.');
  });
});
