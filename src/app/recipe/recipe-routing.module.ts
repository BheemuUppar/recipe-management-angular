import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PopularComponent } from './popular/popular.component';
import { RecentComponent } from './recent/recent.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { MyRecipesComponent } from './my-recipes/my-recipes.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { DisplayRecipeComponent } from './display-recipe/display-recipe.component';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  {
    path:'',
    component: PopularComponent
  },
  {
    path:'popular',
    component: PopularComponent
  },
  {
    path:'recent',
     canActivate:  [AuthGuard],
    component: RecentComponent
  },
  {
    path:'add',
     canActivate:  [AuthGuard],
    component: AddRecipeComponent
  },
  {
    path:'my-recipes',
     canActivate:  [AuthGuard],
    component: MyRecipesComponent
  },
  {
    path:'favorite',
     canActivate:  [AuthGuard],
    component: FavoriteComponent
  },
  {
    path:'display/:id',
    component: DisplayRecipeComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipeRoutingModule { }
