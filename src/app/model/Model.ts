export class Recipe {
  title: String;
  id: number;
  ingredients: any[];
  thumbnail: String;
  instructions: any[];
  isVeg: boolean;
  time: any;
  constructor(
    id: any,
    title: String,
    ingredients: any[],
    instructions: any[],
    thumbnail: String,
    isVeg: boolean,
    time: number
  ) {
    this.id = id;
    this.title = title;
    this.ingredients = ingredients;
    this.instructions = instructions;
    this.thumbnail = thumbnail;
    this.isVeg = isVeg;
    this.time = time;
  }
}
