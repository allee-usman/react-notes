import { useState } from 'react';
import RecipeSection from '../components/ClaudeRecipe';
import IngredientsList from '../components/IngredientsList';
import { getRecipeFromMistral } from '../ai';
import { useRef } from 'react';
import { useEffect } from 'react';
function Main() {
	const [ingredients, setNewIngredients] = useState([
		'Chicken',
		'Burger Bun',
		'Egg',
		'Cheese',
		'Tomato',
		'Lettuce',
	]);
	const [recipe, setRecipe] = useState('');
	const recipeSectionRef = useRef(null);
	useEffect(() => {
		if (recipe !== '' && recipeSectionRef.current != null) {
			recipeSectionRef.current.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			});
		}
	}, [recipe]);

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

	async function getRecipe() {
		setRecipe(await getRecipeFromMistral(ingredients));
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
					getRecipe={getRecipe}
					ref={recipeSectionRef}
				/>
			)}
			{recipe && <RecipeSection recipe={recipe} />}
		</main>
	);
}
export default Main;
