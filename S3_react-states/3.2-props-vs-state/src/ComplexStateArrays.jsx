import { useState } from 'react';
import './complexStateArrays.css';

export default function ComplexState() {
	// const myFavoriteThings = [];
	const [myFavoriteThings, setMyFavoriteThings] = useState([]);
	const allFavoriteThings = [
		'💦🌹',
		'😺',
		'💡🫖',
		'🔥🧤',
		'🟤🎁',
		'🐴',
		'🍎🥧',
		'🚪🔔',
		'🛷🔔',
		'🥩🍝',
	];
	const thingsElements = myFavoriteThings.map((thing) => (
		<p key={thing}>{thing}</p>
	));

	function addFavoriteThing() {
		// myFavoriteThings.push('Test'); // will not update UI because we are modifying it with non-state function(modifying state variable direclty does not trigger re-render in react)

		//Info: Beside the above fact, it is hard and fast rule in react, never ever modify state direclty as it is destructive action i.e `push()` [it modifies the orignal array] just like `count++`

		// console.log(myFavoriteThings);

		// setMyFavoriteThings((prevFavThings) => prevFavThings.push('Test')); // will also not work as `prevFavThimgs` is actually a reference to orignal array `myFavoriteThings`

		// solution? return a brand new array
		// setMyFavoriteThings((prevFavThings) => [...prevFavThings, 'Test']);

		setMyFavoriteThings((prevFavThings) => [
			...prevFavThings,
			allFavoriteThings[prevFavThings.length],
		]);
	}

	function removeFavoriteThing() {
		setMyFavoriteThings((prevFavThings) => {
			let newArr = [...prevFavThings];
			newArr.pop();
			return newArr;
		});
	}

	return (
		<main>
			<button onClick={addFavoriteThing}>Add item</button>
			<button onClick={removeFavoriteThing}>Remove item</button>
			<section aria-live="polite">{thingsElements}</section>
		</main>
	);
}
