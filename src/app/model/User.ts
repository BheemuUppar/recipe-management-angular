export class User {
  id: any;
  name: any;
  email: any;
  password: any;
  recentViews: any[];
  myRecipes: any[];
  favorite: any[];

  constructor(
    id: any,
  name: any,
  email: any,
  password: any,
  recentViews: any[],
  myRecipes: any[],
  favorite: any[],
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.recentViews = recentViews;
    this.myRecipes = myRecipes;
    this.favorite = favorite;
  }
}
