import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from 'src/app/model/Model';
import { HeaderService } from 'src/app/services/header.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-recipes',
  templateUrl: './my-recipes.component.html',
  styleUrls: ['./my-recipes.component.css'],
})
export class MyRecipesComponent implements OnInit {
  currentUser: any;
  myRecipes: any = [];

  constructor(
    private headerService: HeaderService,
    private router: Router,
    private recipeService: RecipeService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.headerService.setCurrentPage('My Recipes');

    let temp: any = localStorage.getItem('currentUser');
    if (temp != null) {
      let user = JSON.parse(temp);
      this.currentUser = user;
      this.getMyRecipes(this.currentUser.email);
    }
  }
  getMyRecipes(email: any) {
    this.recipeService.getMyRecipes(email).subscribe((data: any) => {
     
      this.myRecipes = data.data;
    });
  }



  displayRecipe(recipe: any) {
    localStorage.setItem('currentRecipe', JSON.stringify(recipe));
    this.userService.updateRecent(recipe).subscribe(() => {
      // alert('added to recent! ')
    });
    // this.router.navigateByUrl('home/display');
    this.router.navigate([
      '/home/display',
      recipe?.id ? recipe.id : recipe._id,
    ]);
  }
}
