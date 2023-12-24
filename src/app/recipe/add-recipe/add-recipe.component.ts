import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Recipe } from 'src/app/model/Model';
import { HeaderService } from 'src/app/services/header.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css'],
})
export class AddRecipeComponent implements OnInit {
  recipeForm!: FormGroup;

  currentUser = {};
  constructor(
    private headerService: HeaderService,
    private formBuilder: FormBuilder,
    private recipeService: RecipeService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.headerService.setCurrentPage('Add Recipe');

    this.recipeForm = this.formBuilder.group({
      title: ['', Validators.required],
      thumbnail: ['', Validators.required],
      isVeg: ['', Validators.required],
      time: ['', Validators.required],
      ingredients: this.formBuilder.array([
        this.formBuilder.group({
          quantity: ['', Validators.required],
          name: ['', Validators.required],
        }),
      ]),
      instructions: this.formBuilder.array([
        this.formBuilder.group({
          description: ['', Validators.required],
        }),
      ]),
    });
  }

  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }
  get instructions() {
    return this.recipeForm.get('instructions') as FormArray;
  }

  // creating ingredient field
  creatIngredientField() {
    const ingredient = this.formBuilder.group({
      quantity: ['', Validators.required],
      name: ['', Validators.required],
    });
    (<FormArray>this.recipeForm.get('ingredients')).push(ingredient);
  }
  // creating instruction field
  addStep() {
    const instruction = this.formBuilder.group({
      description: ['', Validators.required],
    });
    (<FormArray>this.recipeForm.get('instructions')).push(instruction);
  }

  addRecipe() {
    let temp = localStorage.getItem('currentUser');
    if (temp != null) {
      this.currentUser = JSON.parse(temp);
      // let id = this.generateRandomNumber();
      //  let recipe = new Recipe(null,  this.recipeForm.value.title,
      //  this.recipeForm.value.ingredients, this.recipeForm.value.instructions,
      // this.recipeForm.value.thumbnail,this.recipeForm.value.isVeg,this.recipeForm.value.time )
      let recipe = {
        title: this.recipeForm.value.title,
        ingredients: this.recipeForm.value.ingredients.map((ele: any) => {
          return ele.quantity + ' ' + ele.name;
        }),
        instructions: this.recipeForm.value.instructions.map((ele: any) => {
          return ele.description;
        }),
        thumbnail: this.recipeForm.value.thumbnail,
        isVeg: this.recipeForm.value.isVeg == 'vegetarian' ? true : false,
        time: this.recipeForm.value.time,
      };
      this.recipeService.addToMyRecipe(this.currentUser, recipe).subscribe(
        (res) => {
          alert('Recipe Added to my list');
          window.location.reload();
        },
        (error) => {
          alert('Failed To Add! Try Again.');
        }
      );
    }
  }
  // generateRandomNumber(): number {
  //   return Math.floor(Math.random() * 1000000);
  // }

  removeIngredientField(index: number): void {
    const ingredients = this.recipeForm.get('ingredients') as FormArray;
    ingredients.removeAt(index);
  }
  removeInstructionField(index: number): void {
    const ingredients = this.recipeForm.get('instructions') as FormArray;
    ingredients.removeAt(index);
  }
}
