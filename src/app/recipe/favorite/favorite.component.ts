import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from 'src/app/model/Model';
import { HeaderService } from 'src/app/services/header.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {
  currentUser: any;
  favorites: any = [];


  constructor( private headerService  : HeaderService,private userService : UserService, private router : Router, private recipeService :RecipeService) { }

  ngOnInit(): void {

    this.headerService.setCurrentPage('Favorite Recipes');


    let temp :  any = localStorage.getItem('currentUser') ;
    if(temp != null){
      let user = JSON.parse(temp);
      this.currentUser = user;
    }
    this.getFavorite(this.currentUser.email)

 }
  getFavorite(email: any) {
    this.recipeService.getFavorite(email).subscribe((data : any)=>{
          this.favorites =  data.data;
    })
  }



  displayRecipe(recipe : any){
    localStorage.setItem('currentRecipe' , JSON.stringify(recipe));

    this.router.navigate(['/home/display', recipe.id ? recipe.id : recipe._id]);
  }
}
