import React from 'react';

export default function WindowTracker() {
	const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

	// React.useEffect(() => {
	// 	window.addEventListener('resize', () => {
	// 		// const width = window.innerWidth;
	// 		// console.log('Resized!');
	// 		setWindowWidth(window.innerWidth);
	// 	});
	// }, []);

	/*
    ! BUG: The above code although functions correctly, but it have a bug. We add an event listner but never remove it.
    Without cleanup, every time this component re-mounts, a new 'resize' listener is added.
    This means multiple listeners will run on every resize event, causing performance issues, unexpected multiple state updates, and memory leaks over time.
	Imagine the component is mounted/unmounted multiple times (e.g., navigating between pages).
    Each time, a new resize event listener is attached, but the old one is still there.
    This results in duplicate console logs or setWindowWidth calls for every resize.
    Over time, it can slow down your app because unused listeners are still running in memory (memory leak).
    ? Solution - Remove the event listner
    */

	React.useEffect(() => {
		console.log('Resized!');

		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};
		window.addEventListener('resize', handleResize);

		// React store the return value in a var and whenever useEffect's callback job finish React just run the returned function

		// Cleanup event listener - Same function as used above `handleResize` .
		return function () {
			console.log('Cleaning up...');

			window.removeEventListener('resize', handleResize);
		};
	}, []);
	return <h1>Window width: {windowWidth}</h1>;
}
