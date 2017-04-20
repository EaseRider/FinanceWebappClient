import {NgModule, ModuleWithProviders} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {RequestOptions} from "@angular/http";

import {AuthService, SecurityTokenStore, AuthGuard} from "./services";
import {AuthResourceService, AuthRequestOptions} from "./resources";

import {
    LoginComponent, LogoutComponent,
    RegisterComponent
} from "./components";
import {SharedModule} from "../shared/shared.module";

@NgModule({
    declarations: [
        // TODO: Add declarations here, if additional components are placed within the Auth module
        LoginComponent, LogoutComponent, RegisterComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        // TODO: Add declarations here, if additional components are placed within the Auth module
        LoginComponent, LogoutComponent, RegisterComponent
    ],
    providers: []
})
export class AuthModule {
  constructor() {
    console.log("AuthModule");
  }
    static forRoot(config?: {}): ModuleWithProviders {

        return {
            ngModule: AuthModule,
            providers: [
                // DI Providers (Services, Tokens, Factories...) to be used globally and instantiated only once

                // TODO: Add services/guards/... here, if additional classes are placed within the Auth module
                AuthResourceService,
                AuthService,
                SecurityTokenStore,
                AuthGuard,
                {
                    provide: RequestOptions,
                    useFactory: AuthRequestOptions.createFromTokenStore,
                    deps: [SecurityTokenStore]
                }]
        };
    }
}
