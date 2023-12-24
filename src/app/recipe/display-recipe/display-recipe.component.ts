import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/app/model/Model';
import { User } from 'src/app/model/User';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-display-recipe',
  templateUrl: './display-recipe.component.html',
  styleUrls: ['./display-recipe.component.css'],
})
export class DisplayRecipeComponent implements OnInit {
  currentUser!: User;
  constructor(
    private recipeService: RecipeService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((params) => {
      const recipeId = params['id'];
      this.recipeService.getRecipeById(recipeId).subscribe((res: any) => {
        // this.organizeData(res.data);
        this.recipe = res.data;
      }); // Fetch data from your service or API
    });
  }

  recipe: any = null;

  ngOnInit(): void {
    //  let current = localStorage.getItem('currentRecipe');
    //  if(current){
    //   this.recipe = JSON.parse(current)
    //  }
    let temp = localStorage.getItem('currentUser');
    if (temp) {
      this.currentUser = JSON.parse(temp);
    }
  }

  addToFavorite() {
    this.recipeService
      .addToFavoriteList(this.currentUser, this.recipe)
      .subscribe(
        (res) => {
          alert('Recipe Added to favorite');
        },
        (error) => {
          alert('Failed To Add! Try Again.');
        }
      );
  }
  //   organizeData(data : any){
  //     // for(let i = 0 ; i < data.recipes.length; i++){
  //       let id = data.id;
  //       let title = data.title;
  //       let ingredients = [];
  //       for(let j=0; j < data.extendedIngredients.length; j++){
  //           ingredients.push(data.extendedIngredients[j].original);
  //       }

  //       let isVeg = data?.vegan;
  //       let thumbnail = data?.image;

  //       let instructions : any = [];
  //       for(let k=0; k < data?.analyzedInstructions[0].steps.length; k++){

  //         instructions.push(data?.analyzedInstructions[0].steps[k].step);
  //       }
  //       let time = data.readyInMinutes;
  //       this.recipe = new Recipe(id , title, ingredients, instructions, thumbnail , isVeg , time )
  //     // }
  //   }
}
