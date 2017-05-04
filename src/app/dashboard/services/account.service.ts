import {Injectable, EventEmitter} from '@angular/core';

import {AccountModel} from '../models/account.model';
import {AccountResource} from '../resources/account.resource';

@Injectable()
export class AccountService {
    public accountChange: EventEmitter<AccountModel> = new EventEmitter();
    public targetAccountChange: EventEmitter<AccountModel> = new EventEmitter();
    public targetAccountMessageChange: EventEmitter<string> = new EventEmitter();

    private account: AccountModel;
    private targetAccount: AccountModel;
    private accountResource: AccountResource;

    constructor(accountResource: AccountResource) {
        this.accountResource = accountResource;
    }

    public get getAccountInformation(): AccountModel {
        return this.account;
    }

    public checkAccountNr(accountNr) {
        if (accountNr.length > 2) {
            this.accountResource.checkAccountNr(accountNr).subscribe((data) => {
                this.targetAccount = data || null;
                if (this.targetAccount === null){
                  this.targetAccountMessageChange.emit('Unknown account number specified');
                } else {
                  this.targetAccountChange.emit(this.targetAccount);
                  this.targetAccountMessageChange.emit(this.targetAccount.owner.firstname + ' ' + this.targetAccount.owner.lastname);
                }
            });
        } else {
            this.targetAccountMessageChange.emit('Please specify a target account number.');
        }

    }

    public updateAccount() {
        this.accountResource.getAccount().subscribe((data: AccountModel) => {
            this.account = data || null;
            this.accountChange.emit(this.account);
        });
    }
}
