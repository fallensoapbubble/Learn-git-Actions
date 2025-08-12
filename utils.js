/**
 * A collection of simple utility functions.
 */
const utils = {
  /**
   * Capitalizes the first letter of a string.
   * @param {string} str The string to capitalize.
   * @returns {string} The capitalized string.
   * @throws {Error} If the input is not a string or is empty.
   */
  capitalize: (str) => {
    if (typeof str !== 'string' || str.length === 0) {
      throw new Error('Input must be a non-empty string.');
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  },

  /**
   * Calculates the sum of all numbers in an array.
   * It ignores non-number elements.
   * @param {Array<any>} arr The array of numbers.
   * @returns {number} The sum of the numbers in the array.
   * @throws {Error} If the input is not an array.
   */
  arraySum: (arr) => {
    if (!Array.isArray(arr)) {
      throw new Error('Input must be an array.');
    }
    return arr.reduce((sum, current) => {
      if (typeof current === 'number' && !isNaN(current)) {
        return sum + current;
      }
      return sum;
    }, 0);
  },

  /**
   * Formats a Date object into YYYY-MM-DD format.
   * @param {Date} date The date object to format.
   * @returns {string} The formatted date string.
   * @throws {Error} If the input is not a valid Date object.
   */
  formatDate: (date) => {
    if (!(date instanceof Date) || isNaN(date)) {
        throw new Error('Input must be a valid Date object.');
    }
    const year = date.getFullYear();
    // Pad month and day with a leading zero if they are single-digit.
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  },
};

// To use this in a Node.js environment with Jest, you need to export it.
// If you were running this in a browser, you wouldn't need the module.exports line.
module.exports = utils;
