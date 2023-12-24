import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './recipe/home/home.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [

{
  path:'',
  component: HomeComponent,
  loadChildren:() => import('./recipe/recipe.module').then(m => m.RecipeModule)
},
{
  path:'login',
  component: LoginComponent
},
{
  path:'register',
  component: RegisterComponent
},
{
  path:'home',
  component: HomeComponent,
  // canActivate:  [AuthGuard],
  loadChildren:() => import('./recipe/recipe.module').then(m => m.RecipeModule)
},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
