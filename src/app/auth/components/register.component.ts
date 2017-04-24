import {Router} from "@angular/router";
import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";

import {NavigationService} from "../../core/services/navigation.service";

import {AuthService} from "../services";
import {RegistrationInfo} from "../models";

@Component({
  selector: 'wed-register',
  templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {

  public login: string;
  public password: string;
  public firstname: string;
  public lastname: string;

  public isProcessing: boolean = false;

  private registerForm: NgForm;
  @ViewChild('registerForm') currentForm: NgForm;

  constructor(private autSvc: AuthService, private navigationSvc: NavigationService) {
  }

  ngOnInit() {
    this.autSvc.authenticatedUserChange.subscribe(
      (credentials) => {
        this.isProcessing = false;
        if (credentials) {
          this.navigationSvc.goToDashboard();
        }
      });
  }

  public doRegister(f: NgForm): boolean {
    if (f.valid) {
      this.isProcessing = true;
      this.autSvc.register(new RegistrationInfo(
        f.value.login,
        f.value.password,
        f.value.firstname,
        f.value.lastname));
    }
    return false;
  }

  formErrors = {
    'firstname': '',
    'lastname': '',
    'login': '',
    'password': '',
    'passwordConfirm': ''
  };
  validationMessages = {
    'firstname': {
      'required': 'Please specify your first name.',
      'minlength': 'Please specify your first name. More than 2 chars.',
    },
    'lastname': {
      'required': 'Please specify your last name.',
      'minlength': 'Please specify your last name. More than 2 chars.',
    },
    'login': {
      'required': 'Please specify your login.',
      'minlength': 'Please specify your login. More than 3 chars.',
    },
    'password': {
      'required': 'Please specify your password.',
      'minlength': 'Please specify your password. More than 3 chars.',
    },
    'passwordConfirm': {
      'required': 'Please type password again.',
      'CheckEqualsInput': 'Password confirmation must be equal.',
    },
  };

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    if (this.currentForm === this.registerForm) {
      return;
    }
    this.registerForm = this.currentForm;
    if (this.registerForm) {
      this.registerForm.valueChanges
        .subscribe(data => this.onValueChanged(data));
    }
  }

  onValueChanged(data?: any) {
    if (!this.registerForm) {
      return;
    }
    const form = this.registerForm.form;
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
}
