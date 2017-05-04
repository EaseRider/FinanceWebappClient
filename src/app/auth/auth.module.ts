import {NgModule, ModuleWithProviders} from '@angular/core';
import {RequestOptions} from '@angular/http';

import {AuthService, SecurityTokenStore} from "./services";
import {AuthResourceService, AuthRequestOptions} from "./resources";


import {LoginComponent, LogoutComponent, RegisterComponent} from "./components";
import {SharedModule} from "../shared/shared.module";
import {EqualsToDirective} from "./equals-input.directive";

@NgModule({
  declarations: [
    LoginComponent, LogoutComponent, RegisterComponent, EqualsToDirective
  ],
  imports: [
    SharedModule
  ],
  exports: [
    LoginComponent, LogoutComponent, RegisterComponent
  ],
  providers: []
})
export class AuthModule {
  static forRoot(config?: {}): ModuleWithProviders {

    return {
      ngModule: AuthModule,
      providers: [
        AuthResourceService,
        AuthService,
        SecurityTokenStore,
        {
          provide: RequestOptions,
          useFactory: AuthRequestOptions.createFromTokenStore,
          deps: [SecurityTokenStore]
        }]
    };
  }
}
