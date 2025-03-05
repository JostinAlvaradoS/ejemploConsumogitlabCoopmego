import { Component, inject, signal } from '@angular/core';
import { JsonPipe, NgIf } from '@angular/common';
import { OAuthService } from 'angular-oauth2-oidc';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [JsonPipe, NgIf],
  template: `
    <h1>Angular GitLab OAuth2 Login</h1>
    <button (click)="login()">Login with GitLab</button>
    <button (click)="logout()">Logout</button>

    <h2>User Info</h2>
    <pre *ngIf="userInfo()">{{ userInfo() | json }}</pre>

    <h2>Access Token</h2>
    <pre *ngIf="accessToken()">{{ accessToken() }}</pre>

    <h2>Token Info</h2>
    <pre *ngIf="tokenInfo()">{{ tokenInfo() | json }}</pre>
  `,
})
export class AppComponent {
  private oauthService = inject(OAuthService);
  private http = inject(HttpClient);

  userInfo = signal<Record<string, any> | null>(null);
  accessToken = signal('');
  tokenInfo = signal<Record<string, any> | null>(null);

  constructor() {
    this.userInfo.set(this.oauthService.getIdentityClaims() || null);
    this.accessToken.set(this.oauthService.getAccessToken() || '');
    this.fetchTokenInfo();
  }

  login() {
    this.oauthService.initLoginFlow();
  }

  logout() {
    this.oauthService.logOut();
    this.userInfo.set(null);
    this.accessToken.set('');
    this.tokenInfo.set(null);
  }

  private fetchTokenInfo() {
    const token = this.accessToken();
    if (token) {
      this.http.get('https://gitlab.com/oauth/token/info', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).subscribe(
        (info) => this.tokenInfo.set(info),
        (error) => console.error('Error fetching token info:', error)
      );
    }
  }
}