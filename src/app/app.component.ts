import {Component, ViewEncapsulation, Pipe, PipeTransform} from '@angular/core';
import {Router, NavigationEnd} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  private currUrl: string = '/welcome';
  private navigation: any[] = [
    {main: 'welcome', url: '/welcome', name: 'Login'},
    {main: 'welcome', url: '/welcome/register', name: 'Registration'},
    {main: 'dashboard', url: '/dashboard', name: 'Home'},
    {main: 'dashboard', url: '/dashboard/transactions', name: 'Account Transactions'},
  ];

  constructor(private router: Router) {
    router.events.subscribe(router => {
      if (router instanceof NavigationEnd) {
        this.currUrl = router.urlAfterRedirects;
      }
    }, (err) => console.log('ErrorRouter', err), () => console.log('FinishedRouter'));
  }

}
