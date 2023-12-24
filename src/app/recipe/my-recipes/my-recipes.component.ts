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
      // console.log(data)
      // for(let key in data){

      // let   id  =  data[key].id;
      // let   title  =  data[key].title;
      // let isVeg = (data[key].isVeg == 'vegetarien')?true:false;
      // let time = data[key].time;
      // let thumbnail = data[key].thumbnail;
      // //  for(data[key].i)
      // let ingredients : any = [];

      // for(let ing in data[key].ingredients){
      //   const quantity = data[key].ingredients[ing].quantity;
      //   const name = data[key].ingredients[ing].name;
      //   ingredients.push(quantity+' '+name)
      //         console.log(data[key].ingredients[ing])
      // }
      // let instructions :any =[] ;

      // for(let stepkey in data[key].instructions){
      //   const description = data[key].instructions[stepkey].description;
      //   instructions.push(description)
      // }
      // console.log('Ingredients : ',new Recipe(id, title, ingredients, instructions,thumbnail, isVeg, time))
      // let obj = new Recipe(id, title, ingredients, instructions,thumbnail, isVeg, time)
      //   this.myRecipes.push(obj)
      // }
      this.myRecipes = data.data;
    });
  }

  // displayRecipe(recipe : Recipe){
  //   // this.recipeService.setCurrentRecipe(recipe);

  //   localStorage.setItem('currentRecipe' , JSON.stringify(recipe));
  //   this.userService. getUsers().subscribe((data:any)=>{
  //     for(let key in data){
  //       if(data[key].id == this.currentUser.id){
  //         this.recipeService.addToRecentViews(data[key] , recipe).subscribe((res)=>{
  //           console.log("Recent : ", res);
  //         }, (err)=>{
  //           console.log("Recent Error : ", err);
  //         })
  //       }
  //     }
  //   });
  //   this.router.navigateByUrl('home/display')
  // }

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
