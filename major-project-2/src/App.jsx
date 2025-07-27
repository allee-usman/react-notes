import { useState } from 'react';
import { languages } from './languagesData';

/**
 * Goal: Allow the user to start guessing the letters
 *
 * Challenge: TBA
 *
 * Think: what would be the best way to store the user's
 * guessed letters?
 */

export default function AssemblyEndgame() {
	const [currentWord, setCurrentWord] = useState('react');
	const [guessedLetters, setGuessedLetters] = useState([]);
	console.log(guessedLetters);

	const alphabet = 'abcdefghijklmnopqrstuvwxyz';

	const languageElements = languages.map((lang) => {
		const styles = {
			backgroundColor: lang.backgroundColor,
			color: lang.color,
		};
		return (
			<span className="chip" style={styles} key={lang.name}>
				{lang.name}
			</span>
		);
	});

	const letterElements = currentWord
		.split('')
		.map((letter, index) => <span key={index}>{letter.toUpperCase()}</span>);

	const keyboardElements = alphabet.split('').map((letter) => (
		<button onClick={() => savedGuessedLetter(letter)} key={letter}>
			{letter.toUpperCase()}
		</button>
	));

	function savedGuessedLetter(newGuess) {
		setGuessedLetters((prevGuesses) =>
			//Method 1
			// prevGuesses.some((guess) => newGuess === guess)
			// 	? prevGuesses
			// 	: [...prevGuesses, newGuess]

			//Alternatively
			prevGuesses.includes(newGuess) ? prevGuesses : [...prevGuesses, newGuess]
		);
	}

	return (
		<main>
			<header>
				<h1>Assembly: Endgame</h1>
				<p>
					Guess the word within 8 attempts to keep the programming world safe
					from Assembly!
				</p>
			</header>
			<section className="game-status">
				<h2>You win!</h2>
				<p>Well done! 🎉</p>
			</section>
			<section className="language-chips">{languageElements}</section>
			<section className="word">{letterElements}</section>
			<section className="keyboard">{keyboardElements}</section>
			<button className="new-game">New Game</button>
		</main>
	);
}
