import {Injectable} from '@angular/core';
import {Router} from "@angular/router";

@Injectable()
export class NavigationService {

  constructor(private router: Router) {
  }

  public goToUrl(url: string): void {
    if (url != this.router.url) {
      this.router.navigateByUrl(url);
    }
  }

  public goToHome(): void {
    this.goToUrl("/welcome");
  }

  public goToDashboard(): void {
    this.goToUrl("/dashboard");
  }

  public goToAllTransactions(): void {
    this.goToUrl("/dashboard/transactions");
  }
}
