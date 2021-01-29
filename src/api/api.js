import { firebase } from '../firebase/config';
import data from "../../data/recipes.json";

export function resetTestData() {
    firebase.database().ref(`/recipes`).remove();
    data.recipes.forEach(addRecipe);
}

export function addRecipe(recipe) {
    const recipes = firebase.database().ref(`/recipes`);
    const updatedRecipes = recipes.push();
    updatedRecipes.set(recipe).then(() => {
        alert(error ? "Failed to save the data to the storage" : "Saved");
    });
}

export function addToMealPlan(sate, recipeId) {
    const formattedDate = date.toISOString().split('T')[0];
    const mealPlan = firebase.database().ref(`/users/${USER_ID}/meal-plan/${formattedDate}`);
    const updatedMealPlan = mealPlan.push();
    // TODO error handling?
    updatedMealPlan.set(recipe.id);
}
