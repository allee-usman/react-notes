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
				<section className="ingredients-list-container">
					<h2>Ingredients on hnad</h2>
					<ul className="list ingredients-list">{ingredientList}</ul>
					{ingredients.length > 3 && (
						<div className="get-recipe-container">
							<div>
								<h2>Ready for a recipe?</h2>
								<p>Generate a recipe from your list of ingredients.</p>
							</div>
							<button onClick={toggleShowRecipe}>Get a recipe</button>
						</div>
					)}
				</section>
			)}
			{recipeShown && (
				<section className="suggested-recipe-container">
					<h2>Suggested Recipe</h2>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda
						dolor quis nulla id, excepturi reprehenderit maiores repellat
						dolores tempore quidem inventore quos fugiat dolore natus nobis
						tenetur voluptate in possimus cupiditate at nemo eum. Facere veniam,
						laborum, labore quos asperiores libero eaque sequi vitae quas minima
						recusandae, necessitatibus nam illum?
					</p>
					<h3>Ingredients:</h3>
					<ul className="list">
						<li>Ingredient 1</li>
						<li>Ingredient 2</li>
						<li>Ingredient 3</li>
						<li>Ingredient 4</li>
						<li>Ingredient 5</li>
					</ul>
					<h3>Instructions:</h3>
					<ol className="list">
						<li>Instruction 1</li>
						<li>Instruction 2</li>
						<li>Instruction 3</li>
						<li>Instruction 4</li>
						<li>Instruction 5</li>
					</ol>
					<p>Enjoy!</p>
				</section>
			)}
		</main>
	);
}
export default Main;
