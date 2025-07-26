import Die from './components/Die';
import { useState, useRef, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';
// import { useWindowSize } from 'react-use';

export default function App() {
	const getRandomNumber = () => {
		return Math.ceil(Math.random() * 6);
	};
	const generateAllNewDice = () => {
		console.log('generateAllNewDice was called!');

		// const dice = [];
		// for (let i = 0; i < 10; i++) {
		// 	dice[i] = getRandomNumber();
		// }
		// return dice;
		return new Array(10)
			.fill(0)
			.map(() => ({ id: nanoid(), value: getRandomNumber(), isHeld: false }));
	};

	// const diceArr = generateAllNewDice();

	// const diceObjectArr = diceArr.map((num) => ({
	// 	value: num,
	// 	isHeld: false,
	// }));
	// console.log(diceObjectArr);

	// const [dice, setDice] = useState(diceObjectArr);
	// const [dice, setDice] = useState(generateAllNewDice()); // generateAllNewDice() will run on every render, but set the value on first, for rest of renders, the returning value will be discarded as states are immutable.
	//-- Solution? Lazy initialization
	const [dice, setDice] = useState(() => generateAllNewDice());

	// console.log(dice);
	// function checkGameWon() {
	// 	return dice.every((die) => die.isHeld && die.value === dice[0].value);
	// }
	// console.log(checkGameWon());
	// const gameWon = checkGameWon();

	const gameWon = dice.every(
		(die) => die.isHeld && die.value === dice[0].value
	);

	const diceElements = dice.map((dieObject) => {
		return (
			<Die
				key={dieObject.id}
				value={dieObject.value}
				isHeld={dieObject.isHeld}
				// hold={hold}
				// id={dieObject.id}
				hold={() => hold(dieObject.id)}
			/>
		);
	});

	function rollDice() {
		!gameWon
			? setDice((oldDice) =>
					oldDice.map((die) =>
						die.isHeld ? die : { ...die, value: getRandomNumber() }
					)
			  )
			: setDice(generateAllNewDice());
	}
	function hold(id) {
		setDice((prevDice) => {
			return prevDice.map((die) =>
				id === die.id ? { ...die, isHeld: !die.isHeld } : die
			);
		});
	}

	// const { width, height } = useWindowSize();

	const newGameBtnRef = useRef(null);
	useEffect(() => {
		if (gameWon) {
			newGameBtnRef.current.focus();
		}
	}, [gameWon]);

	return (
		<main>
			{gameWon && <Confetti />}
			<div aria-live="polite" className="sr-only">
				{gameWon && (
					<p>Congratulations, You Won! Press "New Game" to start again.</p>
				)}
			</div>
			<h1 className="title">Tenzies</h1>
			<p className="instructions">
				Roll until all dice are the same. Click each die to freeze it at its
				current value between rolls.
			</p>
			<div className="dice-container">{diceElements}</div>
			<button onClick={rollDice} className="roll-dice-btn" ref={newGameBtnRef}>
				{gameWon ? 'New Game' : 'Roll'}
			</button>
		</main>
	);
}
