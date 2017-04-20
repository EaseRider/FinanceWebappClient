import {NgModule, ModuleWithProviders} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {ConsolePipe} from "./console.pipe";
import {RouterModule} from "@angular/router";
import {AuthGuard} from "../auth/services/authguard.service";
@NgModule({
    declarations: [
      ConsolePipe
        // TODO: Add declarations here, if additional components are placed within the shared module
    ],
    imports: [
        CommonModule, RouterModule
    ],
    exports: [
        CommonModule, FormsModule, ConsolePipe
        // TODO: Add declarations here, if additional components are placed within the shared module
    ],
    providers: []
})
export class SharedModule {
    // forRoot() isn't needed here...
}
