import moment from "moment";
import { firebase } from "../firebase/config";
import data from "../../data/recipes.json";
import { Recipe } from "../interfaces/Recipes";
import { USER_ID } from "../consts";

export function addRecipe(recipe: Recipe): void {
    const recipes = firebase.database().ref("/recipes");
    const updatedRecipes = recipes.push();
    updatedRecipes.set(recipe).then(() => {
        // alert(error ? "Failed to save the data to the storage" : "Saved");
    });
}

export function resetTestData(): void {
    firebase.database().ref("/recipes").remove();
    data.recipes.forEach(addRecipe);
}

export function addToMealPlan(date: Date, recipeId: string): void {
    const formattedDate = moment(date).format("YYYYMMDD");
    const mealPlan = firebase.database().ref(`/users/${USER_ID}/meal-plan/${formattedDate}`);
    const updatedMealPlan = mealPlan.push();
    firebase.database().ref(`/recipes/${recipeId}`).once("value", (recipeData) => {
        // TODO error handling?
        updatedMealPlan.set(recipeData.val());
    });
}
