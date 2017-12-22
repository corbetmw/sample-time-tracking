import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/auth.guard';

import { UserLoginComponent } from './ui/user-login/user-login.component';
import { ReadmePageComponent } from './ui/readme-page/readme-page.component';
import { SamplesListComponent } from './samples/samples-list/samples-list.component';
import { KioskComponent } from './kiosk/kiosk/kiosk.component';


import { CoreModule } from './core/core.module'

const routes: Routes = [
  { path: '', component: ReadmePageComponent },
  { path: 'login', component: UserLoginComponent },
  { path: 'samples', component: SamplesListComponent, canActivate: [AuthGuard]},  
  { path: 'kiosk', component: KioskComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
