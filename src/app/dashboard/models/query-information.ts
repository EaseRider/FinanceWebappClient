/**
 * Created by Galaxus on 23.03.2017.
 */
export class QueryInformation {
  public constructor(public resultcount: number,
                     public count: number,
                     public skip: number,
                     public fromDate: string,
                     public toDate: string) {
  }
}
