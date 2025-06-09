import bikeImage from './assets/bike.jpg';

function App() {
	function handleClick() {
		console.log('I was clicked!');
	}
	function handleMouseOver() {
		console.log('I was hovered!');
	}

	return (
		<main className="container">
			<img src={bikeImage} alt="bike" onMouseOver={handleMouseOver} />
			{/* <button
				onClick={function () {
					console.log('Button clicked!');
				}}
			>
				Click me!
			</button> */}
			{/* Note: Try to make a separate function on the top level, and pass it in event listner */}
			{/* if we pass handleClick(), it will only run once when we hit save. i.e. */}
			{/* <button onClick={handleClick()}>Click Me!</button> */}

			{/* instead pass only name of the functuion i.e. */}
			<button onClick={handleClick}>Click Me!</button>
		</main>
	);
}

export default App;
