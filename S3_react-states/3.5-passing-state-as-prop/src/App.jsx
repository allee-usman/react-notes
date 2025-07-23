import React from 'react';
import Count from './Count';

export default function App() {
	const [count, setCount] = React.useState(0);

	function add() {
		setCount((prevCount) => prevCount + 1);
	}

	function subtract() {
		setCount((prevCount) => prevCount - 1);
	}

	console.log('App rendered');
	/*
  Info: When click event happen on either of the buttons, both `<App />` and `<Count number={count}/>` will re-render.
  This is because `Count` component is a child of `App` and `App` is re-rendered when state changes, no matter <Count/> is dependent on state change or not.
  */

	return (
		<main className="container">
			<div className="counter">
				<button
					className="minus"
					onClick={subtract}
					aria-label="Decrease count"
				>
					-
				</button>

				{/* <h2 className="count">{count}</h2> */}
				<Count number={count} />

				<button className="plus" onClick={add} aria-label="Increase count">
					+
				</button>
			</div>
		</main>
	);
}
