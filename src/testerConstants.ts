import { AccountInfo, AuthenticationResult, AuthError } from '@azure/msal-browser';

export const TEST_ACCESS_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJzY3AiOiJVc2VyLlJlYWQiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9jb250b3NvIiwiYXBwX2Rpc3BsYXluYW1lIjoiYXBwbGljYXRpb24tbmFtZSIsInRpZCI6InRlbmFudC1pZCIsInRlbmFudF9yZWdpb25fc2NvcGUiOiJYWCIsImF1ZCI6IjAwMDAwMDAzLTAwMDAtMDAwMC1jMDAwLTAwMDAwMDAwMDAwMCIsInVuaXF1ZV9uYW1lIjoiam9obi5kb2VAY29udG9zby5jb20iLCJuYmYiOiIxNjU2NTk5NjI2IiwiYXBwaWQiOiJhcHAtaWQiLCJuYW1lIjoiSm9obiBEb2UiLCJleHAiOiIxNjU2NjA0NzY3IiwiaWF0IjoiMTY1NjU5OTYyNiIsImVtYWlsIjoiam9obi5kb2VAY29udG9zby5jb20ifQ.ftOvEUhqEFKWxIcxcYsgstgldO-31hIVwEhQ0hwwqWg';

//
// Token parsed is equal to :
//
/**

 {
  "alg": "HS256"
 }.{
  "aud": "00000003-0000-0000-c000-000000000000",
  "iss": "https://sts.windows.net/contoso",
  "nbf": "1656599626",
  "iat": "1656599626",
  "exp": "1656604767",
  "app_displayname": "application-name",
  "tid": "tenant-id",
  "tenant_region_scope": "XX",
  "unique_name": "john.doe@contoso.com",
  "appid": "app-id",
  "name": "John Doe",
  "email": "john.doe@contoso.com",
  "scp": "User.Read"
}.[Signature]

 
 */

export const defaultTestAccountInfo: AccountInfo = {
  homeAccountId: "home-account-id",
  localAccountId: "local-account-id",
  environment: 'login.windows.net',
  tenantId: "tenant-id",
  username: 'john.doe@contoso.com',
  name: 'John Doe',
};

export const defaultTestAuthenticationResult: AuthenticationResult = {
  authority: 'https://login.microsoftonline.com',
  uniqueId: 'unique-id',
  tenantId: 'tenant-id',
  scopes: ['openid', 'profile'],
  idToken: 'test-id-token',
  idTokenClaims: {},
  accessToken: TEST_ACCESS_TOKEN,
  fromCache: false,
  correlationId: 'test-correlation-id',
  expiresOn: new Date(Date.now() + 3600000),
  account: defaultTestAccountInfo,
  tokenType: 'Bearer',
};

export const defaultTestAuthError: AuthError = {
  errorCode: 'test-error-code',
  errorMessage: 'test-error-message',
  subError: '',
  correlationId: '',
  setCorrelationId: function (correlationId: string): void {
    this.correlationId = correlationId;
  },
  name: 'test-error',
  message: 'test-message',
};
