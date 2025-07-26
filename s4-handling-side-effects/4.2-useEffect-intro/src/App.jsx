import React from 'react';

function App() {
	console.log('rendered!!');

	const url = 'https://randomuser.me/api/';

	const [randomUserData, setRandomUserData] = React.useState(null);
	//Use `React.useEffect()` Hook to fix the problem of infinite looping
	//Syntax: React.useEffect(callback, dependencies?) ? means optional

	// React.useEffect(function () {
	// 	console.log('useEffect ran!');

	// 	// fetch(url)
	// 	// 	.then((res) => res.json())
	// 	// 	.then((res) => setRandomUserData(res));
	// });
	// console.log('rendered!!');

	//Note the code flow here. App Rendered -> Normal Execution and hence JSX return and DOM painted on browser -> After that callback of `useEffect` will ran. Hence callaback will still run on every render and cause the same infinite looping problem.
	// Output: rendered!! -> useEffect ran!

	//? To avoid looping, use dependencies array:
	// Dependencies array is set of values that react is going to watch between one render and the next. If any values of the value in this array changes between those two re-render, then react will know it should run this callback fn again.

	// to forcefully re-render the component, we will make a count button
	const [count, setCount] = React.useState(0);

	// React.useEffect(() => {
	// 	console.log('useEffect ran!');

	// 	fetch(url)
	// 		.then((res) => res.json())
	// 		.then((res) => setRandomUserData(res));
	// }, [count]); [0] compared to [1] -> will re-run callback on every increment

	React.useEffect(() => {
		console.log('useEffect ran!');

		fetch(url)
			.then((res) => res.json())
			.then((res) => setRandomUserData(res));
	}, []); // [] compared to [] -> will not re-run callback

	//Remember: Dependecy array will stop useEffect's callback to run on every signle re-render

	return (
		<div>
			<p>Count is: {count}</p>
			<button onClick={() => setCount((count) => count + 1)}>Add +1</button>
			<p>randomUserData:</p>
			<pre>{JSON.stringify(randomUserData, null, 2)}</pre>
		</div>
	);
}

export default App;
