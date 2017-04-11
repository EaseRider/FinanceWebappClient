import {Account} from "./account";
export class AccountInfo {
  constructor(public ownerId: string,
              public accountNr: string,
              public amount: number,
              public owner: Account) {
  }

  public static fromDto(data: any): AccountInfo {
    return new AccountInfo(data.ownerId, data.accountNr, data.amount, Account.fromDto(data.owner));
  }
}
