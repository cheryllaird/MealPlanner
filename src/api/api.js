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
