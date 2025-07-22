/*
In react, data flows only downwards. Therefore we cannot pass data between two sibilings components.
i.e we need username in `Header` and `MainContent` component, if we initialize it in `Header`, we cant pass it to `MainContent`.
?Solution:
Move the data upwards to parent of both i.e. App.jsx in this case and then pass the state as props to child.

*/

import Header from './Header';
import MainContent from './MainContent';
import { useState } from 'react';
function App() {
	const [username, setUsername] = useState('Ali');
	return (
		<main>
			<Header username={username} />
			<MainContent username={username} />
		</main>
	);
}

export default App;
