function Main() {
	let ingredients = [
		'Oregano',
		'Basil',
		'Garlic',
		'Olive Oil',
		'Salt',
		'Pepper',
		'Tomato Sauce',
		'Chicken Broth',
	];

	const ingredientList = ingredients.map((ingredient) => {
		return <li key={ingredient}>{ingredient}</li>;
	});

	function handleSubmit(event) {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const newIngredient = formData.get('ingredient-field').trim();

		ingredients.push(newIngredient);
		console.log(ingredients);
	}

	return (
		<main>
			<form action="#" onSubmit={handleSubmit}>
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
			<section className="ingredients-list-container">
				<h2>Ingredients on hnad</h2>
				<ul className="ingredients-list">{ingredientList}</ul>
			</section>
		</main>
	);
}
export default Main;
