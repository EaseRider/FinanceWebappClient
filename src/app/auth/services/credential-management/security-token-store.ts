import {Injectable} from '@angular/core';
import {Account} from "../../models/account";
import {AccountInfo} from "../../models/account-info";

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
      if (token) {
        this.token = {
          token: token
        };
      }
    }
    return this.token;
  }

  public set storedValue(value: SecurityToken) {
    sessionStorage.setItem('token', value.token);
    this.token = value;
  }
}

export interface SecurityToken {
  token: string
}
