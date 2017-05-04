import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable()
export class NavigationService {

  public goToUrl(url: string): void {
    this.router.navigateByUrl(url);
  }

  public goToHome(): void {
    this.goToUrl('/');
  }

  public goToRegister(): void {
    this.goToUrl('/welcome/register');
  }

  public goToDashboard(): void {
    this.goToUrl('/dashboard');
  }

  public goToAllTransactions(): void {
    this.goToUrl('/dashboard/transactions');
  }

  constructor(private router: Router) {
  }
}
