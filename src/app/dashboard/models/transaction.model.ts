import {Injectable} from '@angular/core';

@Injectable()
export class TransactionModel {
  amount: number;
  date: Date;
  from: string;
  target: string;
  total: number;

  public static fromDto(data: any): TransactionModel {
    return new TransactionModel(data.amount, data.date, data.from, data.target, data.total);
  }

  public constructor(amount: number, date: Date, from: string, target: string,  total: number) {
    this.amount = Math.round(amount*100) / 100;
    this.date = date;
    this.from = from;
    this.target = target;
    this.total = Math.round(total*100) / 100;
  }

  toDto(): any {
    return {
      amount: this.amount,
      date: this.date,
      from: this.from,
      target: this.target,
      total: this.total,
    };
  }
}
