import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

import {NavigationService} from "../../core/services/navigation.service";
import {AuthService} from "../services";
import {Account} from "../models";

@Component({
  selector: 'logout-button',
  templateUrl: 'logout.component.html'
})
export class LogoutComponent implements OnInit {

  public user: Account;

  constructor(private autSvc: AuthService, private navigationSvc: NavigationService, route: ActivatedRoute) {
  }

  ngOnInit() {
    this.user = this.autSvc.authenticatedUser;
    this.autSvc.authenticatedUserChange.subscribe(
      (credentials) => {
        if (!credentials) {
          this.navigationSvc.goToHome();
        }else{
          this.user = this.autSvc.authenticatedUser;
        }
      });
  }

  public doLogout() {
    this.autSvc.logout();
    this.user = null;
  }
}
