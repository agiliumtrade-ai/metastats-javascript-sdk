import HttpClient from "./httpClient";


/**
 * Connection URL and request managing client
 */
export default class DomainClient {

  /**
   * Constructs domain client instance
   * @param {HttpClient} httpClient HTTP client
   * @param {string} token authorization token
   * @param {string} domain domain to connect to, default is agiliumtrade.agiliumtrade.ai
   */
  constructor(httpClient: HttpClient, token: string, domain: string);

  /**
   * Returns domain client token
   * @returns {string} client token
   */
  get token(): string;

  /**
   * Sends a MetaStats API request
   * @param {Function} getOpts function to get request options
   * @param {string} accountId account id
   * @returns {Object|string|any} request result
   */
  requestMetastats(getOpts: Function, accountId: string): Promise<any>

}
