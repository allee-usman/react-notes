export default function Recipe({ recipe }) {
	console.log(recipe);

	return (
		<section className="suggested-recipe-container">
			<h2>Suggested Recipe</h2>
			<p>{recipe}</p>
			{/* <h3>Ingredients:</h3>
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
			<p>Enjoy!</p> */}
		</section>
	);
}
