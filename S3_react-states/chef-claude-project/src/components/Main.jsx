import { useState } from 'react';

function Main() {
	const [ingredients, setNewIngredients] = useState([]);

	const ingredientList = ingredients.map((ingredient) => {
		return <li key={ingredient}>{ingredient}</li>;
	});

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
				<section className="ingredients-list-container">
					<h2>Ingredients on hnad</h2>
					<ul className="ingredients-list">{ingredientList}</ul>
					<div className="get-recipe-container">
						<div>
							<h2>Ready for a recipe?</h2>
							<p>Generate a recipe from your list of ingredients.</p>
						</div>
						<button>Get a recipe</button>
					</div>
				</section>
			)}
		</main>
	);
}
export default Main;
