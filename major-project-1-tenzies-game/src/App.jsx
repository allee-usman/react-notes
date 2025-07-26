import Die from './components/Die';
import { useState } from 'react';

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
		return new Array(10).fill(0).map(() => getRandomNumber());
	};

	const [dice, setDice] = useState(generateAllNewDice());

	// console.log(dice);

	const diceElements = dice.map((num, index) => {
		return <Die key={index} value={num} />;
	});

	function rollDice() {
		setDice(generateAllNewDice());
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
