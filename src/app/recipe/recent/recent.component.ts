import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from 'src/app/model/Model';
import { HeaderService } from 'src/app/services/header.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-recent',
  templateUrl: './recent.component.html',
  styleUrls: ['./recent.component.css']
})
export class RecentComponent implements OnInit {
currentUser  :any ={};
recentViews  : any = [];


  constructor(private recipeService  :RecipeService, 
    private headerService : HeaderService,
    private userService:UserService,
    private  router : Router,) { }

  ngOnInit(): void {
    this.headerService.setCurrentPage('Recently Viewed')

    let temp :  any = localStorage.getItem('currentUser') ;
    if(temp != null){
      let user = JSON.parse(temp);
      this.currentUser = user;
    }
    this.getRecent(this.currentUser.email)

 }
  getRecent(email: any) {
    this.recipeService.getRecentViewed(email).subscribe((data : any)=>{
      // for(let key in data){
      //   this.recentViews.push(data[key])
      // }
      this.recentViews = data.data
    })

  }

  displayRecipe(recipe : any){
    localStorage.setItem('currentRecipe' , JSON.stringify(recipe));
    // this.userService.updateRecent(recipe).subscribe(()=>{
      // alert('added to recent! ')
    // })
    // this.router.navigateByUrl('home/display');
    this.router.navigate(['/home/display', recipe.id ? recipe.id : recipe._id]);
  }

}
