/**
 * Error which indicates a timeout
 */
export default class TimeoutError extends Error {

  /**
   * Constructs the timeout error
   * @param {string} message error message
   */
  constructor(message: string);
}