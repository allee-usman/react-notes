/*
$ props refer to the properties being passd into a component in order for it to work correctly, similar to how a function receives parameters: "from above". A component receiving props is not allowed to modify the props. i.e. they are immutable.

$ State refers to values that are managed by the component simila to varables declared inside a function. Anytime you have changing values that should be saved/displayed, you'll likely be using state.

# "View as a function of state"

# 01 - Render
React runs your function and displays whatever gets returned. The function will only be run again if (1) it receives new props from above, or (2) its internal state values change.

# 02 - setState
Changing a local, non-state variable doesn't cause React to re-render the component. Changing state with a built-in `setState` function does.

## 03 - view = function(state)
Thus, when state changes and React re-runs (re-renders) your component, something new gets returned and replaces what used to be on the page.

*/

import React, { useState } from 'react';

function App() {
	// State - this is what drives our view
	// let result = React.useState();
	// console.log(result); //  [undefined, ƒ()]

	// let result2 = React.useState('Hello');
	// console.log(result2); //  ["Hello", ƒ()]

	//Info: "Hello" is the initial state value just like declaring a variable i.e. `let name = "Hello";`

	// let [age, setAge] = React.useState(18);
	// console.log(age); // 18
	//Info: Here setAge is a function which will re-render the component when called with a new value.

	// call the setAge function to change the state
	// setAge(20); //! if you call the function this way, an error will occur as the component will goes throught infinite loop of re-rendering

	//Recommended: it is a convention to start the name of function with "set"

	//useState array destructuring
	const [count, setCount] = useState(0);
	const [name, setName] = useState('User');

	// Non-state variable - changes won't trigger re-render
	let nonStateVariable = Math.random();

	function incrementNumber() {
		// Note: if you declare count as const, do not increment it as count++ because cont++ => count = count +1 (reassigning) i.e.
		// setCount(count++);

		// setCount(count + 1);

		/**
		 * Note: if you ever need the old value of state
		 * to help you determine the new value of state,
		 * you should pass a callback function to your
		 * state setter function instead of using
		 * state directly. This callback function will
		 * receive the old value of state as its parameter,
		 * which you can then use to determine your new
		 * value of state.
		 */

		// setCount((prevCount) => prevCount + 1);

		// the differnce of this way is, if we write the same statement three times, the value will be incremented 3 times on a single click

		// setCount((prevCount) => prevCount + 1);
		// setCount((prevCount) => prevCount + 1);
		setCount((prevCount) => prevCount + 1);
	}
	function decrementNumber() {
		// But if we directly pass the new state, no matter how many statements, all will be synced together, making the change only once at single click
		// setCount(count - 1);
		// setCount(count - 1);
		// setCount(count - 1);

		setCount((prevCount) => prevCount - 1);
	}
	function switchName() {
		// setName(name === 'User' ? 'React Developer' : 'User');
		setName((prevName) => (prevName === 'User' ? 'React Developer' : 'User'));
	}
	function nonStateChange() {
		nonStateVariable = Math.random().toFixed(4);
		console.log('Changed non-state variable to:', nonStateVariable);
		console.log("But component won't re-render!");
	}

	// This function demonstrates that view = function(state)
	// When state changes, this entire function runs again
	// and returns a new view based on the current state
	console.log('Component rendered! Current count:', count);

	return (
		<div className="app-container">
			<div className="main-card">
				<h2 className="title">View as Function of State Demo</h2>

				<div className="card card-blue">
					<h3 className="card-title">Current State:</h3>
					<p className="state-item">
						Count: <span className="highlight">{count}</span>
					</p>
					<p className="state-item">
						Name: <span className="highlight">{name}</span>
					</p>
					<p className="random-value">
						Random value: {nonStateVariable.toFixed(4)}
					</p>
				</div>

				{/* Dynamic Content */}
				<div className="card card-green">
					<h3 className="card-title">Dynamic Content:</h3>
					<p className="dynamic-message">
						{count === 0 && 'Counter is at zero!'}
						{count > 0 && count < 5 && 'Getting started...'}
						{count >= 5 && count < 10 && "You're doing great!"}
						{count >= 10 && "Wow! You're on fire! 🔥"}
					</p>
				</div>

				<div className="controls-section">
					<div className="button-row">
						<button onClick={incrementNumber} className="btn btn-blue">
							Increment Count
						</button>
						<button onClick={decrementNumber} className="btn btn-red">
							Decrement Count
						</button>
					</div>

					<button onClick={switchName} className="btn btn-green btn-full">
						Toggle Name
					</button>

					<button onClick={nonStateChange} className="btn btn-gray btn-full">
						Change Non-State Variable (No Re-render)
					</button>
				</div>

				<div className="card card-yellow">
					<h3 className="card-title">Key Concepts:</h3>
					<ul className="concept-list">
						<li>
							When you click setState buttons, the entire function runs again
						</li>
						<li>The view updates based on new state values</li>
						<li>Non-state changes don't trigger re-renders</li>
						<li>Check browser console to see render logs</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

export default App;
