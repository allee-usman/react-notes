import { useState } from 'react';
import WindowTracker from './WindowTracker';

export default function App() {
	/**
	 * Challenge:
	 * 1. Create state called `show`, default to `true`
	 * 2. When the button is clicked, toggle `show`
	 * 3. Only display `<WindowTracker>` if `show` is `true`
	 */
	const [show, setShow] = useState(true);

	function toggleShow() {
		setShow((prevShow) => !prevShow);
	}

	return (
		<main className="container">
			<button onClick={toggleShow}>Toggle WindowTracker</button>
			{show ? <WindowTracker /> : undefined}
		</main>
	);
}
