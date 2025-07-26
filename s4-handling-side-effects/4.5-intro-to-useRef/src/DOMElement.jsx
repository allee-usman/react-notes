import React, { useRef } from 'react';

function FocusInput() {
	const inputRef = useRef(null); // returns {current: null}

	const focusInput = () => {
		// Direct DOM manipulation
		inputRef.current.focus(); //inputRef.current points directly to the DOM input element
	};

	return (
		<div>
			<input
				ref={inputRef}
				type="text"
				placeholder="Click button to focus me"
				style={{ padding: '10px' }}
			/>
			<br />
			<br />
			<button style={{ padding: '10px' }} onClick={focusInput}>
				Focus Input
			</button>
			<hr />
		</div>
	);
}
export default FocusInput;
