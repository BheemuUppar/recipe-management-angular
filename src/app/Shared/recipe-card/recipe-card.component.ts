import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from 'src/app/model/Model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css'],
})
export class RecipeCardComponent implements OnInit {
  @Input()
  recipe!: Recipe;
  constructor(private userService:UserService,
    private router:Router) {}

  ngOnInit(): void {}
  displayRecipe(recipe : any){
    localStorage.setItem('currentRecipe' , JSON.stringify(recipe));
    this.userService.updateRecent(recipe).subscribe(()=>{
      // alert('added to recent! ')
    })
    // this.router.navigateByUrl('home/display');
    this.router.navigate(['/home/display', recipe.id?recipe.id:recipe._id]);
  }
}
