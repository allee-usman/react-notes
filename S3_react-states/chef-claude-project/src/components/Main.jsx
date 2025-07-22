import { useState } from 'react';
import RecipeSection from '../components/ClaudeRecipe';
import IngredientsList from '../components/IngredientsList';
function Main() {
	const [ingredients, setNewIngredients] = useState([]);

	function handleFormSubmit(formData) {
		const newIngredient = formData.get('ingredient-field').trim();

		// console.log(formData);
		// console.log(ingredients);

		if (newIngredient) {
			setNewIngredients((prevIngredients) => [
				...prevIngredients,
				newIngredient,
			]);
		}
	}
	const showIngredientSec = ingredients.length ? true : false;
	// console.log(showIngredientSec);
	const [recipeShown, setRecipeShown] = useState(false);

	function toggleShowRecipe() {
		setRecipeShown((prevShowStatus) => !prevShowStatus);
	}

	return (
		<main>
			<form action={handleFormSubmit}>
				<input
					type="text"
					name="ingredient-field"
					id="ingredient-input"
					placeholder="e.g. oregano"
					aria-label="Add ingredient"
					required
				/>
				<button type="submit">+ Add Ingredient</button>
			</form>
			{showIngredientSec && (
				<IngredientsList
					ingredients={ingredients}
					toggleShowRecipe={toggleShowRecipe}
				/>
			)}
			{recipeShown && <RecipeSection />}
		</main>
	);
}
export default Main;
