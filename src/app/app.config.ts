import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { OAuthModule, OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from './auth.config';
import { APP_INITIALIZER } from '@angular/core';

export function initializeAuth(oauthService: OAuthService) {
  return async () => {
    oauthService.configure(authConfig);
    await oauthService.loadDiscoveryDocumentAndTryLogin();
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    importProvidersFrom(OAuthModule.forRoot()),

    OAuthService, // ✅ Se declara aquí pero sin inyectar aún

    { 
      provide: APP_INITIALIZER,
      useFactory: initializeAuth, 
      deps: [OAuthService], 
      multi: true 
    }
  ]
};
