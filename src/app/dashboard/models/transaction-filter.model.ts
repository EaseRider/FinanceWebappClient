import {Injectable} from '@angular/core';

@Injectable()
export class TransactionFilter {
  public count: number;
  public fromDate: string;
  public toDate: string;
  public skip: number;

  public constructor(count: number, skip: number, fromDate: string, toDate: string) {
    this.count = count;
    this.fromDate = fromDate;
    this.toDate = toDate;
    this.skip = skip;
  }
}
