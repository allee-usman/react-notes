import Die from './components/Die';
import { useState } from 'react';
import { nanoid } from 'nanoid';

export default function App() {
	const getRandomNumber = () => {
		return Math.ceil(Math.random() * 6);
	};
	const generateAllNewDice = () => {
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
	const [dice, setDice] = useState(generateAllNewDice());

	// console.log(dice);

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
		setDice((oldDice) =>
			oldDice.map((die) =>
				die.isHeld ? die : { ...die, value: getRandomNumber() }
			)
		);
	}
	function hold(id) {
		setDice((prevDice) => {
			return prevDice.map((die) =>
				id === die.id ? { ...die, isHeld: !die.isHeld } : die
			);
		});
	}

	return (
		<main>
			<div className="dice-container">{diceElements}</div>
			<button onClick={rollDice} className="roll-dice-btn">
				Roll
			</button>
		</main>
	);
}
