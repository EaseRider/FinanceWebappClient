import {Injectable} from '@angular/core';

@Injectable()
export class AccountModel {
  amount: number;
  accountNr: string;
  name: string;
  owner: any;
  error: string;

  public static fromDto(data: any): AccountModel {
    if (data.error !== undefined) {
      return new AccountModel(null, null, null, null, data.error);
    } else {
      return new AccountModel(data.amount, data.accountNr, data.name, data.owner, null);
    }
  }

  public constructor(amount: number, accountNr: string, name: string,  owner: any, error: string) {
    this.amount = Math.round(amount*100) / 100;
    this.accountNr = accountNr;
    this.name = name;
    this.owner = owner;
    this.error = error;
  }

  toDto(): any {
    return {
      amount: this.amount,
      accountNr: this.accountNr,
      name: this.name,
      owner: this.owner,
      error: this.error
    };
  }
}
