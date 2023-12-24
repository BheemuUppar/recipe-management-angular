import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from 'src/app/model/Model';
import { HeaderService } from 'src/app/services/header.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.css'],
})
export class PopularComponent implements OnInit {
  title = 'RecipeApp';
  searchText = ''
  currentUser: any = {};
  recipes: any = [];
  searchMode: boolean = false;
  isSearchApplied:boolean = false;

  constructor(
    private headerService: HeaderService,
    private recipeService: RecipeService,
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.headerService.setCurrentPage('Popular Recipes');
    let loggedUser = localStorage.getItem('currentUser');
    if (loggedUser != null) {
      this.currentUser = JSON.parse(loggedUser);
    }
    this.getData();
  }

  getData() {
    let objs: string | null = localStorage.getItem('randomRecipes');
    if (objs != null) {
      this.recipes = JSON.parse(objs + '');
    } else {
      this.getRandomRecipes();
    }
  }

  getRandomRecipes() {
    this.searchMode = false;
    this.recipeService.getRandomRecipes().subscribe(
      (data: any) => {
     
        data = data.data;
        for (let i = 0; i < data.recipes?.length; i++) {
          let id = data?.recipes[i].id;
          let title = data?.recipes[i].title;
          let ingredients = [];
          for (
            let j = 0;
            j < data?.recipes[i].extendedIngredients.length;
            j++
          ) {
            ingredients.push(data?.recipes[i].extendedIngredients[j].original);
          }
          let isVeg = data?.recipes[i].vegetarian;
          let thumbnail = data?.recipes[i].image;

          let instructions: any = [];
          for (
            let k = 0;
            k < data?.recipes[i].analyzedInstructions[0].steps.length;
            k++
          ) {
            instructions.push(
              data?.recipes[i].analyzedInstructions[0].steps[k].step
            );
          }

          let time = data.recipes[i].readyInMinutes;

          this.recipes.push(
            new Recipe(
              id,
              title,
              ingredients,
              instructions,
              thumbnail,
              isVeg,
              time
            )
          );
        }
        localStorage.setItem('randomRecipes', JSON.stringify(this.recipes));
      },
      (error) => {
        // alert('in http err')
      }
    );
  }

  displayRecipe(recipe: Recipe) {
    localStorage.setItem('currentRecipe', JSON.stringify(recipe));
    this.userService.updateRecent(recipe).subscribe(() => {
    });
    this.router.navigate(['/home/display', recipe.id]);
  }

  // organize Data
  organizeData(data: any) {
    for (let i = 0; i < data.recipes.length; i++) {
      let id = data?.recipes[i].id;
      let title = data?.recipes[i].title;
      let ingredients = [];
      for (let j = 0; j < data?.recipes[i].extendedIngredients.length; j++) {
        ingredients.push(data?.recipes[i].extendedIngredients[j].original);
      }

      let isVeg = data?.recipes[i].vegitarian;
      let thumbnail = data?.recipes[i].thumbnail;

      let instructions: any = [];
      for (
        let k = 0;
        k < data?.recipes[i].analyzedInstructions[0].steps.length;
        k++
      ) {
        instructions.push(
          data?.recipes[i].analyzedInstructions[0].steps[k].step
        );
      }

      let time = data.recipes[i].readyInMinutes;

      this.recipes.push(
        new Recipe(id, title, ingredients, instructions, thumbnail, isVeg, time)
      );
    }
  }

  addToFav() {
  }

  searchRecipe(input: any) {
    let temp: any = [];
    this.isSearchApplied = true;
    this.searchMode = true;
    this.recipeService.searchRecipe(input).subscribe((data: any) => {
      data = data.data;
      data.results.forEach((recipe: any) => {
        let id = recipe.id;
        let title = recipe.title;
        let isVeg = recipe.vegetarian;
        let time = recipe.readyInMinutes;
        let thumbnail = recipe.image;
        let instructions = recipe.analyzedInstructions[0].steps;
        let ingredients: any = [];
        recipe.extendedIngredients.forEach((ingre: any) => {
          ingredients.push(ingre.name);
        });

        temp.push(
          new Recipe(
            id,
            title,
            ingredients,
            instructions,
            thumbnail,
            isVeg,
            time
          )
        );
        // console.log(new Recipe(id , title, ingredients, instructions, thumbnail , isVeg , time ))
      });
    });
    this.recipes = temp;
  }
  clearSearch() {
    this.getData();
    this.isSearchApplied = false;
    this.searchText = ''
  }
}
