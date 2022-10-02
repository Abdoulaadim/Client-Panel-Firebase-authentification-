import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddClientComponent } from './component/add-client/add-client.component';
import { DashbordComponent } from './component/dashbord/dashbord.component';
import { DetailsClientComponent } from './component/details-client/details-client.component';
import { EditClientComponent } from './component/edit-client/edit-client.component';
import { LoginComponent } from './component/login/login.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { RegisterComponent } from './component/register/register.component';
import { SettingsComponent } from './component/settings/settings.component';
import { AuthGuardGuard } from './guards/auth-guard.guard';

const routes: Routes = [
  { 
    path: '', 
    component : DashbordComponent , canActivate : [AuthGuardGuard]
  },
  { 
    path: 'login', 
    component :LoginComponent
  },
  { 
   path: 'register',
   component : RegisterComponent
  },
  {
    path: 'client/add',
    component:AddClientComponent, canActivate : [AuthGuardGuard]
  },
  {
    path: 'client/edit/:id',
    component : EditClientComponent, canActivate : [AuthGuardGuard]
  },
  {
    path: 'client/:id',
    component : DetailsClientComponent, canActivate : [AuthGuardGuard]
  },
  {
    path: 'settings',
    component:SettingsComponent , canActivate : [AuthGuardGuard]
  },
  {
    path: '**',
    component:NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuardGuard]
})
export class AppRoutingModule { }
