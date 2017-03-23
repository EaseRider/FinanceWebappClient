/**
 * Created by Galaxus on 23.03.2017.
 */
export class Transaction {
    public constructor(public from: string,
                       public target: string,
                       public amount: number,
                       public total: number,
                       public date: Date) {
    }
}