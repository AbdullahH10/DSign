import { SettingsComponent } from './settings/settings.component';
import { UploadDocumentComponent } from './upload-document/upload-document.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { SigninComponent } from './signin/signin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path:'',component: SignupComponent },
  { path:'signin', component: SigninComponent },
  {
    path: 'dashboard',
    component: UserDashboardComponent,
    children: [{ path: 'upload', component: UploadDocumentComponent, }]
  },
  { path: 'settings', component: SettingsComponent, }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
