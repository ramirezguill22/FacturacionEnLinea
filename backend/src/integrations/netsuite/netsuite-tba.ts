import { createHmac, randomBytes } from "crypto";

import { config } from "../../config/env";

type OAuthParameters = {
  oauth_consumer_key: string;
  oauth_nonce: string;
  oauth_signature_method: "HMAC-SHA256";
  oauth_timestamp: string;
  oauth_token: string;
  oauth_version: "1.0";
};

function encodeOAuthValue(value: string): string {
  return encodeURIComponent(value).replace(/[!'()*]/g, (character) =>
    `%${character.charCodeAt(0).toString(16).toUpperCase()}`
  );
}

function buildOAuthParameters(): OAuthParameters {
  return {
    oauth_consumer_key: config.netSuite.consumerKey,
    oauth_nonce: randomBytes(16).toString("hex"),
    oauth_signature_method: "HMAC-SHA256",
    oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
    oauth_token: config.netSuite.tokenId,
    oauth_version: "1.0"
  };
}

function getBaseUrl(url: URL): string {
  return `${url.origin}${url.pathname}`;
}

function collectRequestParameters(url: URL, oauthParameters: OAuthParameters): Array<[string, string]> {
  const queryParameters = Array.from(url.searchParams.entries());
  const oauthEntries = Object.entries(oauthParameters);

  return [...queryParameters, ...oauthEntries].sort((left, right) => {
    if (left[0] === right[0]) {
      return left[1].localeCompare(right[1]);
    }

    return left[0].localeCompare(right[0]);
  });
}

function buildParameterString(parameters: Array<[string, string]>): string {
  return parameters
    .map(([key, value]) => `${encodeOAuthValue(key)}=${encodeOAuthValue(value)}`)
    .join("&");
}

function buildSignatureBaseString(method: string, url: URL, oauthParameters: OAuthParameters): string {
  const parameterString = buildParameterString(collectRequestParameters(url, oauthParameters));

  return [method.toUpperCase(), encodeOAuthValue(getBaseUrl(url)), encodeOAuthValue(parameterString)].join(
    "&"
  );
}

function buildSigningKey(): string {
  return `${encodeOAuthValue(config.netSuite.consumerSecret)}&${encodeOAuthValue(config.netSuite.tokenSecret)}`;
}

function buildAuthorizationHeader(
  oauthParameters: OAuthParameters,
  signature: string
): string {
  const headerParameters = {
    realm: config.netSuite.realm || config.netSuite.account,
    ...oauthParameters,
    oauth_signature: signature
  };

  return `OAuth ${Object.entries(headerParameters)
    .map(([key, value]) => `${encodeOAuthValue(key)}="${encodeOAuthValue(value)}"`)
    .join(", ")}`;
}

export function buildNetSuiteTbaAuthorization(method: string, requestUrl: string): string {
  const url = new URL(requestUrl);
  const oauthParameters = buildOAuthParameters();
  const signatureBaseString = buildSignatureBaseString(method, url, oauthParameters);
  const signature = createHmac("sha256", buildSigningKey())
    .update(signatureBaseString)
    .digest("base64");

  return buildAuthorizationHeader(oauthParameters, signature);
}