/**
 * Structures data from error with more relevant data
 *
 * @export
 * @class ApiError
 * @typedef {ApiError}
 * @extends {Error}
 */
export class ApiError extends Error {
  statusCode: number;
  error: unknown;
  data: [] | Record<never, never>;

  constructor(data: Record<never, never> | [], statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
  }
}
