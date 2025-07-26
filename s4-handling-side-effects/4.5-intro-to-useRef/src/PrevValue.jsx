import React, { useState, useRef, useEffect } from 'react';

export default function PreviousValue() {
	const [name, setName] = useState('');
	const previousName = useRef('');

	useEffect(() => {
		// Update previous value after render
		previousName.current = name;
	});

	return (
		<div>
			<input
				value={name}
				onChange={(e) => setName(e.target.value)}
				placeholder="Type your name"
			/>
			<p>Current: {name}</p>
			<p>Previous: {previousName.current}</p>
			<hr />
		</div>
	);
}
