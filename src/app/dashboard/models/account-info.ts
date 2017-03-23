import {Account} from "../../auth/models/account";
/**
 * Created by Galaxus on 23.03.2017.
 */
export class AccountInfo {
    public constructor(public ownerId: string,
                       public accountNr: string,
                       public amount: number,
                       public owner: Account) {
    }
}