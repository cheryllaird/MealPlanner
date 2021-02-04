export interface Recipe {
    title: string;
    img: string;
    ingredients: Ingredient[];
    serves: number;
    totalTime: number;
    link: string;
}

export interface RecipeList {
    [key: string]: Recipe
}

export interface RecipeData {

}

interface Ingredient {
    title: string;
    qty: number;
    measurement: string;
}
