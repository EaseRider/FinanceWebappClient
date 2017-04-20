/**
 * Created by Galaxus on 23.03.2017.
 */
export class QueryInformation {
  public constructor(public resultcount: number,
                     public count: number,
                     public skip: number,
                     public fromDate: Date,
                     public fromDateJSON: string,
                     public toDate: Date,
                     public toDateJSON: string,
                      ) {
  }
  public forRequest(): QueryInformation {
    if (this.fromDate) {
      this.fromDateJSON = this.fromDate.toISOString();
    }
    if (this.toDate) {
      this.toDateJSON = this.toDate.toISOString();
    }
    return this;
  }
}
