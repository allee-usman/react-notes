import React, { useState, useRef } from 'react';

export default function CounterComparison() {
	const [stateCount, setStateCount] = useState(0);
	const refCount = useRef(0);

	const incrementState = () => {
		setStateCount(stateCount + 1); // Triggers re-render
	};

	const incrementRef = () => {
		refCount.current = refCount.current + 1; // No re-render
		console.log('Ref count:', refCount.current);
	};

	return (
		<div>
			<h3>State Count (visible): {stateCount}</h3>
			<h3>Ref Count (hidden): {refCount.current}</h3>

			<button onClick={incrementState}>Increment State (re-renders)</button>
			<button onClick={incrementRef}>Increment Ref (no re-render)</button>

			<p>Check console for ref count changes</p>
			<hr />
		</div>
	);
}
