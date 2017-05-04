import {Injectable} from '@angular/core';
import {Response, Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import {ResourceBase} from "../../auth/resources/resource-base";
import {SecurityTokenStore} from "../../auth/services/credential-management/security-token-store";

import {AccountModel} from "../models/account.model";

@Injectable()
export class AccountResource extends ResourceBase {
    constructor(http: Http, private tokenstore: SecurityTokenStore) {
        super(http);
    }

    public getAccount(): Observable<AccountModel> {
        return this.get('/accounts')
            .map((response: Response) => {
                const result = response.json();
                if (!result) {
                    return null;
                }
                return AccountModel.fromDto(result);
            })
            .catch((error: any) => {
                return Observable.of<AccountModel>();
            });
    }

    public checkAccountNr(accountNr: number): Observable<AccountModel> {
        return this.get('/accounts/' + accountNr)
            .map((response: Response) => {
                const result = response.json();
                if (!result) {
                    return null;
                }
                return AccountModel.fromDto(result);
            })
            .catch((error: any) => {
                return Observable.of<AccountModel>(null);
            });
    }

}
