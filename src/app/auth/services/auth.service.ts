import {Injectable, EventEmitter} from '@angular/core';

import {AuthResourceService} from "../resources";
import {LoginInfo, RegistrationInfo, Credential, Account} from "../models";

import {SecurityTokenStore} from "./credential-management";

@Injectable()
export class AuthService {

  public authenticatedUserChange: EventEmitter<Account> = new EventEmitter<Account>();

  public get authenticatedUser(): Account {
    return this.authUser;
  }

  private authUser: Account = null;

  constructor(private resource: AuthResourceService, private tokenStore: SecurityTokenStore) {
    if (tokenStore.storedValue) {
      this.authUser = tokenStore.storedValue.owner;
    }
  }

  public get hasCredentials(): boolean {
    return this.authenticatedUser != null;
  }

  public hasToken(): boolean {
    return this.tokenStore.storedValue != null;
  }

  public register(registerModel:RegistrationInfo, errorHandler:(error:any) => void):void {
    this.resource.register(registerModel, errorHandler).subscribe(
      (data:Account) => {
        if (data !==null){
          this.login(registerModel);
        }
      });
  }

  public login(loginModel: LoginInfo):void {
    this.resource.login(loginModel).subscribe(
      (data: Credential) => {
        this.tokenStore.storedValue = data;
        this.authUser = data != null ? data.owner : null;
        this.authenticatedUserChange.emit(this.authenticatedUser);
      });
  }

  public logout(): void {
    this.tokenStore.storedValue = null;
    this.authUser = null;
    this.authenticatedUserChange.emit(null);
  }
}
