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

  /*

   export function transfer(
   target: AccountNr,
   amount: number,
   token: string,
   ): Promise<TransferResult> {
   return postAuthenticatedJson('/accounts/transactions', token, {target, amount}).then(parseJSON)
   }

   export function getTransactions(
   token: string,
   fromDate: string = "",
   toDate: string = "",
   count: number = 3,
   skip: number = 0,
   ): Promise<{result: Array<Transaction>, query: { resultcount: number}}> {
   return getAuthenticatedJson(
   `/accounts/transactions?fromDate=${fromDate}&toDate=${toDate}&count=${count}&skip=${skip}`,
   token).then(parseJSON)
   }

   public register(model:RegistrationInfo):Observable<Account> {
   return this.post('/auth/register', model.toDto())
   .map((response: Response) => {
   let result = response.json();
   if (result) {
   return Account.fromDto(result);
   }
   return null;
   })
   .catch((error:any) => {
   return Observable.of<Account>(null);
   });
   }

   public login(model:LoginInfo):Observable<Credential> {
   return this.post('/auth/login', model.toDto())
   .map((response: Response) => {
   let result = response.json();
   if (result) {
   return Credential.fromDto(result);
   }
   return null;
   })
   .catch((error:any) => {
   return Observable.of<Credential>(null);
   });
   }*/
}
