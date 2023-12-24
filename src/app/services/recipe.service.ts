import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Recipe } from '../model/Model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  public currentRecipe: Recipe | undefined;

  constructor(private http: HttpClient) {}

  // searchRecipe(query : string){
  // return this.http.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${environment.spoonacularApiKey}&addRecipeInformation=true&fillIngredients=true&query=${query}`);
  // }
  searchRecipe(query: string) {
    return this.http.get(
      `${environment.spoonacularBaseUrl}/search/recipes?query= ${query}`
    );
  }

  getRandomRecipes() {
    return this.http.get(`${environment.spoonacularBaseUrl}/getRandomRecipes`);
  }

  addToFavoriteList(user: any, recipe: Recipe) {
    let payload = {
      email: user.email,
      recipe: recipe,
    };
    return this.http.post(environment.addToFavorite, payload);
  }
  addToMyRecipe(user: any, recipe: any) {
    let payload = {
      email: user.email,
      recipe: recipe,
    };
    return this.http.post(environment.addToMyRecipes, payload);
  }
  getFavorite(email: any) {
    let payload = {
      email: email,
    };
    return this.http.post(environment.fetchFavorites, payload);
  }
  getMyRecipes(email: any) {
    let payload = {
      email: email,
    };
    return this.http.post(environment.fetchMyRecipes, payload);
  }
  addToRecentViews(user: any, recipe: Recipe) {
    let key = user.email.substring(0, user.email.indexOf('@'));
    return this.http.put(
      `https://recipe-app-bb4fa-default-rtdb.firebaseio.com/users/${key}/recent/${recipe.id}.json`,
      recipe
    );
  }
  getRecentViewed(email: any) {
    let payload = {
      email: email,
    };
    return this.http.post(environment.fetchRecent, payload);
  }
  getRecipeById(id: any) {
    return this.http.get(
      environment.spoonacularBaseUrl + '/getRecipeById?query=' + id
    );
  }
}
