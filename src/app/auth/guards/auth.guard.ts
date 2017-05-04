import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';

import {AuthService} from '../services/auth.service';
import {NavigationService} from '../../core/services/navigation.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private navigationService: NavigationService, private authService: AuthService) {
  }

  canActivate() {
    if (this.authService.hasToken()) {
      return true;
    } else {
      this.navigationService.goToHome();
      return false;
    }
  }
}
