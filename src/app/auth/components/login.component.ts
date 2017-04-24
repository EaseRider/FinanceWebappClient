import {ActivatedRoute, Params} from "@angular/router";
import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";

import {NavigationService} from "../../core/services/navigation.service";

import {AuthService} from "../services";
import {LoginInfo} from "../models";

@Component({
  selector: 'wed-login',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

  private backUrl;

  private loginForm: NgForm;
  @ViewChild('loginForm') currentForm: NgForm;

  public login: string;
  public password: string;

  public isProcessing: boolean = false;

  constructor(private autSvc: AuthService, private navigationSvc: NavigationService, route: ActivatedRoute) {
    route.params.subscribe((p: Params) => this.backUrl = p["backUrl"]);
  }

  formErrors = {
    'login': '',
    'password': ''
  };
  validationMessages = {
    'login': {
      'required': 'Please specifify your login name.',
      'minlength': 'At least three characters long.',
    },
    'password': {
      'required': 'Please specifify your password.',
      'minlength': 'At least three characters long.',
    }
  };

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    if (this.currentForm === this.loginForm) {
      return;
    }
    this.loginForm = this.currentForm;
    if (this.loginForm) {
      this.loginForm.valueChanges
        .subscribe(data => this.onValueChanged(data));
    }
  }

  onValueChanged(data?: any) {
    if (!this.loginForm) {
      return;
    }
    const form = this.loginForm.form;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          if (messages[key])
            this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  ngOnInit() {
    this.backUrl = "";
    this.autSvc.authenticatedUserChange.subscribe(
      (credentials) => {
        this.isProcessing = false;
        if (credentials) {
          if (this.backUrl) {
            this.navigationSvc.goToUrl(this.backUrl);
          } else {
            this.navigationSvc.goToDashboard();
          }
        }
      });
  }

  public doLogin(f: NgForm): boolean {
    if (f.valid) {
      this.isProcessing = true;
      this.autSvc.login(new LoginInfo(f.value.login, f.value.password));
    }
    return false;
  }
}
