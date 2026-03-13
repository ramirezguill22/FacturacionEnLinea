import "dotenv/config";

type NetSuiteConfig = {
  restletUrl: string;
  account: string;
  realm: string;
  consumerKey: string;
  consumerSecret: string;
  tokenId: string;
  tokenSecret: string;
  timeoutMs: number;
  isConfigured: boolean;
};

type AppConfig = {
  port: number;
  ticketMinLength: number;
  mockFoundTicket: string;
  netSuite: NetSuiteConfig;
};

function readEnvString(value: string | undefined): string {
  return (value ?? "").trim();
}

function parsePositiveInteger(value: string | undefined, fallback: number): number {
  const parsedValue = Number.parseInt(value ?? "", 10);

  if (Number.isNaN(parsedValue) || parsedValue <= 0) {
    return fallback;
  }

  return parsedValue;
}

function buildNetSuiteConfig(): NetSuiteConfig {
  const restletUrl = readEnvString(process.env.NETSUITE_RESTLET_URL);
  const account = readEnvString(process.env.NETSUITE_ACCOUNT);
  const realm = readEnvString(process.env.NETSUITE_REALM);
  const consumerKey = readEnvString(process.env.NETSUITE_CONSUMER_KEY);
  const consumerSecret = readEnvString(process.env.NETSUITE_CONSUMER_SECRET);
  const tokenId = readEnvString(process.env.NETSUITE_TOKEN_ID);
  const tokenSecret = readEnvString(process.env.NETSUITE_TOKEN_SECRET);
  const timeoutMs = parsePositiveInteger(process.env.NETSUITE_TIMEOUT_MS, 15000);

  return {
    restletUrl: restletUrl,
    account: account,
    realm: realm,
    consumerKey: consumerKey,
    consumerSecret: consumerSecret,
    tokenId: tokenId,
    tokenSecret: tokenSecret,
    timeoutMs: timeoutMs,
    isConfigured: Boolean(
      restletUrl &&
        account &&
        realm &&
        consumerKey &&
        consumerSecret &&
        tokenId &&
        tokenSecret
    )
  };
}

export const config: AppConfig = {
  port: parsePositiveInteger(process.env.PORT, 8080),
  ticketMinLength: parsePositiveInteger(process.env.TICKET_MIN_LENGTH, 20),
  mockFoundTicket: (process.env.MOCK_FOUND_TICKET ?? "TICKET-PRUEBA-0000001").trim(),
  netSuite: buildNetSuiteConfig()
};