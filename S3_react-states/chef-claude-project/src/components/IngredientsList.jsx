export default function IngredientsList({ ingredients, getRecipe, ref }) {
	const ingredientList = ingredients.map((ingredient) => {
		return <li key={ingredient}>{ingredient}</li>;
	});
	return (
		<section className="ingredients-list-container">
			<h2>Ingredients on hnad</h2>
			<ul className="list ingredients-list">{ingredientList}</ul>
			{ingredients.length > 3 && (
				<div className="get-recipe-container" ref={ref}>
					<div>
						<h2>Ready for a recipe?</h2>
						<p>Generate a recipe from your list of ingredients.</p>
					</div>
					<button onClick={getRecipe}>Get a recipe</button>
				</div>
			)}
		</section>
	);
}
