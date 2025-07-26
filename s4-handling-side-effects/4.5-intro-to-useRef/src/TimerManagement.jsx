import React, { useState, useRef, useEffect } from 'react';

export default function Timer() {
	const [time, setTime] = useState(0);
	const [isRunning, setIsRunning] = useState(false);
	const timerRef = useRef(null);

	useEffect(() => {
		if (isRunning) {
			// Store timer ID in ref
			timerRef.current = setInterval(() => {
				setTime((prevTime) => prevTime + 1);
			}, 1000);
		} else {
			// Clear timer using stored ID
			clearInterval(timerRef.current);
		}

		// Cleanup on unmount
		return () => clearInterval(timerRef.current);
	}, [isRunning]);

	const startTimer = () => setIsRunning(true);
	const stopTimer = () => setIsRunning(false);
	const resetTimer = () => {
		setTime(0);
		setIsRunning(false);
	};

	return (
		<div>
			<h2>Timer: {time}s</h2>
			<button onClick={startTimer}>Start</button>
			<button onClick={stopTimer}>Stop</button>
			<button onClick={resetTimer}>Reset</button>
			<hr />
		</div>
	);
}
