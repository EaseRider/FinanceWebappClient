import { NgModule } from '@angular/core';
import {RouterModule, Routes, Router} from '@angular/router';
import {AuthGuard} from "./auth/services/authguard.service";

const appRoutes: Routes = [

  // TODO: Add routing of lazy loaded dashboard Module (with guards) here...
  // TODO: Add routing of eagerly loaded modules here...

  { path: '', redirectTo: '/welcome', pathMatch: 'full'},
  {path: 'dashboard', loadChildren: 'app/dashboard/dashboard.module#DashboardModule', canLoad: [AuthGuard]},
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}

