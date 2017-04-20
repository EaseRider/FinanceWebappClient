import {Injectable} from '@angular/core';
import {Router} from "@angular/router";

@Injectable()
export class NavigationService {

  constructor(private router: Router) {
  }

  public goToUrl(url:string):void {
    this.router.navigateByUrl(url);
    //this.router.navigate([url]);
  }

  public goToHome():void {
    this.goToUrl("/welcome"); // TODO: adjust routing according this URL
  }

  public goToDashboard():void {
    this.goToUrl("/dashboard"); // TODO: adjust routing according this URL
  }

  public goToAllTransactions():void {
    this.goToUrl("/dashboard/transactions");
  }
}
