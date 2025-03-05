
import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  issuer: 'https://gitlab.com',
  redirectUri: window.location.origin + '/auth/callback',
  clientId: '038354d1ac670be72ff3967dc91bc324023913fe4e79e559471fe38a556ddf4f',
  dummyClientSecret: 'gloas-9cedc36ddb573f998175a13b7057f1d75ec26113492753a1b0ecb929bcf69ae9',
  responseType: 'code',
  scope: 'openid',
  showDebugInformation: true,
  strictDiscoveryDocumentValidation: false
};
