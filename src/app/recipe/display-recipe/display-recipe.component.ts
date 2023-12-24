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
  favorites: any = [];
  isFavorite = false;
  isLoggedIn = false;
  constructor(
    private recipeService: RecipeService,
    private activatedRoute: ActivatedRoute
  ) {}

  recipe: any = null;

  ngOnInit(): void {
    if (localStorage.getItem('isLoggedIn')) {
      this.isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn') + '');
    }

    this.activatedRoute.params.subscribe((params) => {
      const recipeId = params['id'];
      this.recipeService.getRecipeById(recipeId).subscribe((res: any) => {
        // this.organizeData(res.data);
        this.recipe = res.data;
        this.getfavorites();
        // console.log(this.favorites.includes(this.recipe));
      }); // Fetch data from your service or API
    });
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
          this.getfavorites();
          alert('Recipe Added to favorite');
        },
        (error) => {
          alert('Failed To Add! Try Again.');
        }
      );
  }

  removeFromFavorites() {
    console.log('removing from favorite');
    let email = localStorage.getItem('email');
    if (email) {
      this.recipeService
        .removeFromFavorites(JSON.parse(email), this.recipe.id)
        .subscribe((res) => {
          // console.log(res);
          this.getfavorites();
        });
    }
  }

  getfavorites() {
    let email = localStorage.getItem('email');
    if (email) {
      this.recipeService
        .getFavorite(JSON.parse(email))
        .subscribe((res: any) => {
          this.favorites = res.data;
          this.isFavorite =false;
          for (let i = 0; i < this.favorites.length; i++) {
            console.log('inside loop');
            
            if (this.recipe.id == this.favorites[i].id) {
              console.log(true);
              this.isFavorite = true;
              break;
            }
          }
        });
    }
  }
}
