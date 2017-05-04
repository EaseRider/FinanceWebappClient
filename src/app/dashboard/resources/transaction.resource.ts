import {Injectable} from '@angular/core';
import {Response, Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import {ResourceBase} from "../../auth/resources/resource-base";
import {SecurityTokenStore} from "../../auth/services/credential-management/security-token-store";

import {TransactionFilter} from "../models/transaction-filter.model";
import {TransactionModel} from "../models/transaction.model";

@Injectable()
export class TransactionResource extends ResourceBase {
  constructor(http: Http, private tokenstore: SecurityTokenStore) {
    super(http);
  }

  public getTransactions(req: TransactionFilter): Observable<TransactionModel[]> {
    return this.get(`/accounts/transactions?count=${req.count}&fromDate=${req.fromDate}&toDate=${req.toDate}&skip=${req.skip}`)
      .map((response: Response) => {
        const result = response.json().result;
        if (!result) {
            return null;
        }
        return result.map((data) => TransactionModel.fromDto(data));
      })
      .catch((error: any) => {
        return Observable.of<TransactionModel[]>([]);
      });
  }

  public executeTransaction(obj: TransactionModel): Observable<TransactionModel> {
    const body = {amount: obj.amount, target: obj.target};
    return this.post(`/accounts/transactions`, body)
      .map((response: Response) => {
        return TransactionModel.fromDto(response.json()) || null;
      })
      .catch((error: any) => {
        return Observable.of<TransactionModel>(null);
      });
  }
}
