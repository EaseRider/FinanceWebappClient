/**
 * Created by Galaxus on 10.04.2017.
 */
import {Injectable} from '@angular/core';
import {Response, Http} from "@angular/http";

import {Observable} from "rxjs";

import {Transaction} from "../models";
import {ResourceBase} from "./resource-base";
import {QueryInformation} from "../models/query-information";
import {SecurityTokenStore} from "../../auth/services/credential-management/security-token-store";
import {AccountInfo} from "../../auth/models/account-info";


@Injectable()
export class DashboardResourceService extends ResourceBase {
  constructor(http: Http, private tokenstore: SecurityTokenStore) {
    super(http);
  }

  public getTransactions(req: QueryInformation): Observable<Transaction[]> {
    req = req.forRequest();
    return this.get(`/accounts/transactions?fromDate=${req.fromDateJSON}&toDate=${req.toDateJSON}&count=${req.count}&skip=${req.skip}`)
      .map((response: Response) => {
        let result = response.json().result;
        if (result) {
          return result.map((data) => Transaction.fromDto(data));
        }
        return null;
      })
      .catch((error: any) => {
        return Observable.of<Transaction[]>([]);
      });
  }

  public createTransfer(trans: Transaction): Observable<Transaction> {
    return this.post(`/accounts/transactions`, {target: trans.target, amount: trans.amount})
      .map((response: Response) => {
        let result = response.json();
        if (result) {
          return Transaction.fromDto(result);
        }
        return false;
      })
      .catch((error: any) => {
        return Observable.of<Transaction>(null);
      });
  }

  public validateAccountNumber(accnr: string): Observable<{[key: string]: any}> {
    return this.get(`/accounts/${accnr}`)
      .map((response: Response) => {
        let result = response.json();
        if (result) {
          return Observable.of<{[key: string]: any}>({isAccount: true, account: result});
        }
        return Observable.of<{[key: string]: any}>({isAccount: {isAccount: false, account: null}});
      })
      .catch((error: any) => {
        return Observable.of<{[key: string]: any}>({isAccount: {isAccount: false, account: null}});

      })
  }
}
