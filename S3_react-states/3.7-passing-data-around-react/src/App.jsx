/*
In react, data flows only downwards. Therefore we cannot pass data between two sibilings components.
i.e we need username in `Header` and `MainContent` component, if we initialize it in `Header`, we cant pass it to `MainContent`.
?Solution:
Move the data upwards to parent of both i.e. App.jsx in this case and then pass the state as props to child.

Note: It's best practice to keep you state as locally defined as it needs to be. In other words, if one component needs a state, it is best place to put state. If it's sibiling needs to access that state, then moving it upwards to one level is best way. If you have a state that is truely global to entire application, then look for alternative solution(i.e. context/redux) that are made to solve this problem.

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
