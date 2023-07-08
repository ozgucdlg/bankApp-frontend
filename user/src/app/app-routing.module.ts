import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddressComponent } from './components/address/address.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './components/login/login.component';
import { RandomComponent } from './components/random/random.component';

const routes: Routes = [
  {path:"user",component:UserComponent},
  {path:"", component:DashboardComponent},
  {path:"address", component:AddressComponent},
  {path:"contact", component:ContactComponent},
  {path:"random", component:RandomComponent},
  {path:"login", component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
