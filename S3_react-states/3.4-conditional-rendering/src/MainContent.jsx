import Joke from './Joke';
import jokesData from './jokesData';

function MainContent() {
	const jokeElements = jokesData.map((jokeItem) => {
		return (
			<Joke
				key={jokeItem.id}
				setup={jokeItem.setup}
				punchline={jokeItem.punchline}
			/>
		);
	});

	return <main>{jokeElements}</main>;
}
export default MainContent;
