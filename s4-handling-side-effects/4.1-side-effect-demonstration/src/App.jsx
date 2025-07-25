import { useState } from 'react';

function App() {
	const url = 'https://randomuser.me/api/';

	const [randomUserData, setRandomUserData] = useState(null);

	// async function fetchUserData() {
	// 	try {
	// 		const response = await fetch('https://randomuser.me/api/');
	// 		const data = await response.json();
	// 		// console.log(data);
	// 		setRandomUserData(data.results[0]);
	// 	} catch (error) {
	// 		console.error('Error:', error);
	// 	}
	// }
	// fetchUserData();

	fetch(url)
		.then((res) => res.json())
		.then((res) => setRandomUserData(res));

	// console.log('rendered!!'); // runs infinielty. WHY?
	/*
   #Reason:
            When a local state changes, react component is re-rendered. In our case, initially the state is set to null. As soon as fetch() response returns, it is then update the local states(re-rendered). For updating the local state, the fetch() will re-run and this goes to infinite loop.
   */

	return (
		<div>
			{/* <button onClick={fetchUserData}>Fetch Data</button> */}
			<pre>{JSON.stringify(randomUserData, null, 2)}</pre>
		</div>
	);
}

export default App;
