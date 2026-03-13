export class NetSuiteIntegrationError extends Error {
  readonly statusCode: number;

  constructor(message: string, statusCode = 502) {
    super(message);
    this.name = "NetSuiteIntegrationError";
    this.statusCode = statusCode;
  }
}