import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
export default function Recipe({ recipe }) {
	// console.log(recipe);

	return (
		<section className="suggested-recipe-container" aria-live="polite">
			<h2>Suggested Recipe:</h2>
			<Markdown remarkPlugins={[remarkGfm]}>{recipe}</Markdown>
		</section>
	);
}
