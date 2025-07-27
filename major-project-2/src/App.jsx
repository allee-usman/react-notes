import { useState } from 'react';
import { languages } from './languagesData';
import clsx from 'clsx';
import { getFarewellText } from './utils';

export default function AssemblyEndgame() {
	//# state values
	const [currentWord, setCurrentWord] = useState('react');
	const [guessedLetters, setGuessedLetters] = useState([]);
	// console.log(guessedLetters);

	// #derived values
	// const wrongGuessCount = countWrongGuesses();
	// const wrongGuesses = guessedLetters.filter(
	// 	(letter) => !currentWord.includes(letter)
	// );
	// console.log('Wrong Guesses: ', wrongGuesses);

	const wrongGuessCount = guessedLetters.filter(
		(letter) => !currentWord.includes(letter)
	).length;
	// console.log('Wrong Guess Count: ', wrongGuessCount);

	const isGameWon = currentWord
		.split('')
		.every((letter) => guessedLetters.includes(letter));
	const isGameLost = wrongGuessCount >= languages.length - 1;
	const isGameOver = isGameWon || isGameLost ? true : false;

	// #static values
	const alphabet = 'abcdefghijklmnopqrstuvwxyz';

	// Elements arrays
	const languageElements = languages.map((lang, index) => {
		const isLanguageLost = index < wrongGuessCount;
		const styles = {
			backgroundColor: lang.backgroundColor,
			color: lang.color,
		};
		// const classNames = clsx("chip", isLanguageLost && 'lost');
		const classNames = clsx({
			chip: true,
			lost: isLanguageLost,
		});
		return (
			<span className={classNames} style={styles} key={lang.name}>
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

	//# helper functions
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
	// const gameStatusClassName = clsx(
	// 	'game-status',
	// 	isGameWon ? 'won' : 'lost'
	// );

	const gameStatusClassName = clsx('game-status', {
		won: isGameWon,
		lost: isGameLost,
	});
	function renderGameStatus() {
		if (!isGameOver) {
			return null;
		}
		if (isGameWon) {
			return (
				<>
					<h2>You win!</h2>
					<p>Well done! 🎉</p>
				</>
			);
		} else {
			return (
				<>
					<h2>Game Over!</h2>
					<p>You Loose! Better start learning Assembly now. 😭</p>
				</>
			);
		}
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
			<section className={gameStatusClassName}>{renderGameStatus()}</section>
			<section className="language-chips">{languageElements}</section>
			<section className="word">{letterElements}</section>
			<section className="keyboard">{keyboardElements}</section>
			{isGameOver && <button className="new-game">New Game</button>}
		</main>
	);
}
