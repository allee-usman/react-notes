import { useState } from 'react';
import { languages } from './languagesData';
import clsx from 'clsx';

/**
 * Goal: Allow the user to start guessing the letters
 *
 * Challenge: TBA
 *
 * Think: what would be the best way to store the user's
 * guessed letters?
 */

export default function AssemblyEndgame() {
	// state values
	const [currentWord, setCurrentWord] = useState('react');
	const [guessedLetters, setGuessedLetters] = useState([]);
	// console.log(guessedLetters);

	// derived values
	// const wrongGuessCount = countWrongGuesses();
	// const wrongGuesses = guessedLetters.filter(
	// 	(letter) => !currentWord.includes(letter)
	// );
	// console.log('Wrong Guesses: ', wrongGuesses);

	const wrongGuessCount = guessedLetters.filter(
		(letter) => !currentWord.includes(letter)
	).length;
	console.log('Wrong Guess Count: ', wrongGuessCount);

	// static values
	const alphabet = 'abcdefghijklmnopqrstuvwxyz';

	// Elements arrays
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

	const letterElements = currentWord.split('').map((letter, index) => {
		const isGuessed = guessedLetters.includes(letter);
		return <span key={index}>{isGuessed ? letter.toUpperCase() : ''}</span>;
	});

	const keyboardElements = alphabet.split('').map((letter) => {
		const isGuessed = guessedLetters.includes(letter);
		const isCorrect = isGuessed && currentWord.includes(letter);
		const isWrong = isGuessed && !currentWord.includes(letter);

		//Info: clsx allow us to make object of classNames to apply, where keys are name of classes we want to apply and values of those keys are boolean whether to include or not

		const className = clsx({
			'correct-guess': isCorrect,
			'wrong-guess': isWrong,
		});

		// console.log(className);

		return (
			<button
				// className={
				// 	isCorrect ? 'correct-guess' : isWrong ? 'wrong-guess' : undefined
				// }
				className={className}
				onClick={() => savedGuessedLetter(letter)}
				key={letter}
			>
				{letter.toUpperCase()}
			</button>
		);
	});

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

	// function countWrongGuesses() {
	// let count = 0;
	// for (let index = 0; index < guessedLetters.length; index++) {
	// 	// if (!currentWord.includes(guessedLetters[index])) {
	// 	// 	count = count + 1;
	// 	// }
	// 	currentWord.includes(guessedLetters[index]) ? count : count++;
	// }
	// return count;
	// }

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
