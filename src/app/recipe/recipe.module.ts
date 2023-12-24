import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipeRoutingModule } from './recipe-routing.module';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { DisplayRecipeComponent } from './display-recipe/display-recipe.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { HomeComponent } from './home/home.component';
import { MyRecipesComponent } from './my-recipes/my-recipes.component';
import { PopularComponent } from './popular/popular.component';
import { RecentComponent } from './recent/recent.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { TopnavComponent } from './topnav/topnav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecipeCardComponent } from '../Shared/recipe-card/recipe-card.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    AddRecipeComponent,
    DisplayRecipeComponent,
    FavoriteComponent,
    // HomeComponent,
    MyRecipesComponent,
    PopularComponent,
    RecentComponent,
    SidenavComponent,
    RecipeCardComponent,
    // FooterComponent,

  ],
  imports: [
    CommonModule,
    RecipeRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class RecipeModule { }
