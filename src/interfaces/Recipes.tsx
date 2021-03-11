export interface Recipe {
    id?: string;
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

interface Ingredient {
    title: string;
    qty: number;
    measurement: string;
}
