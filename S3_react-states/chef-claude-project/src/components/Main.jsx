function Main() {
	return (
		<main>
			<form action="#">
				<input
					type="text"
					name="input-field"
					id="text-iput"
					placeholder="e.g. oregano"
					aria-label="Add ingredient"
					required
				/>
				<button type="submit">+ Add Ingredient</button>
			</form>
		</main>
	);
}
export default Main;
