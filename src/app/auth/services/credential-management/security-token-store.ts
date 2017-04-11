import {Injectable} from '@angular/core';

/**
 * TODO: Add localStorage logic here...
 */
@Injectable()
export class SecurityTokenStore {
  private token: SecurityToken;

  constructor() {
  }

  public get storedValue(): SecurityToken {
    if (!this.token) {

      const token = sessionStorage.getItem('token');
      const owner = sessionStorage.getItem('owner');
      if (token && owner) {
        this.token = {
          token: token,
          owner: owner,
        };
      }
    }
    return this.token;
  }

  public set storedValue(value: SecurityToken) {
    sessionStorage.setItem('token', value.token);
    sessionStorage.setItem('owner', value.owner);
    this.token = value;
  }
}

export interface SecurityToken {
  token: string,
  owner: any
}
