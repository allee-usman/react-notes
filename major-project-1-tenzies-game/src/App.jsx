import Die from './components/Die';
import { useState } from 'react';
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

export default function App() {
	const [dice, setDice] = useState(generateAllNewDice());
	// console.log(dice);

	const diceElements = dice.map((num) => {
		return <Die key={num} value={num} />;
	});

	return (
		<main>
			<div className="dice-container">{diceElements}</div>
		</main>
	);
}
