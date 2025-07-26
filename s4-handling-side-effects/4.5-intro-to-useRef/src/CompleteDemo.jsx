import React, { useRef, useState } from 'react';

function FocusManager() {
	const [currentField, setCurrentField] = useState('');

	// Multiple refs for different inputs
	const nameRef = useRef(null);
	const emailRef = useRef(null);
	const passwordRef = useRef(null);
	const submitRef = useRef(null);

	const focusField = (fieldName, ref) => {
		setCurrentField(fieldName);
		ref.current.focus();
	};

	const handleKeyPress = (e, nextRef) => {
		if (e.key === 'Enter') {
			if (nextRef) {
				nextRef.current.focus();
			} else {
				submitRef.current.click(); // Trigger submit
			}
		}
	};

	return (
		<div style={{ padding: '20px' }}>
			<h2>Focus Manager Demo</h2>
			<p>
				Current focused field: <strong>{currentField}</strong>
			</p>

			<div style={{ marginBottom: '10px' }}>
				<input
					ref={nameRef}
					type="text"
					placeholder="Name"
					onFocus={() => setCurrentField('Name')}
					onKeyPress={(e) => handleKeyPress(e, emailRef)}
				/>
				<button onClick={() => focusField('Name', nameRef)}>Focus Name</button>
			</div>

			<div style={{ marginBottom: '10px' }}>
				<input
					ref={emailRef}
					type="email"
					placeholder="Email"
					onFocus={() => setCurrentField('Email')}
					onKeyPress={(e) => handleKeyPress(e, passwordRef)}
				/>
				<button onClick={() => focusField('Email', emailRef)}>
					Focus Email
				</button>
			</div>

			<div style={{ marginBottom: '10px' }}>
				<input
					ref={passwordRef}
					type="password"
					placeholder="Password"
					onFocus={() => setCurrentField('Password')}
					onKeyPress={(e) => handleKeyPress(e, null)}
				/>
				<button onClick={() => focusField('Password', passwordRef)}>
					Focus Password
				</button>
			</div>

			<button
				ref={submitRef}
				onClick={() => alert('Form submitted!')}
				style={{
					backgroundColor: 'green',
					color: 'white',
					padding: '10px 20px',
				}}
			>
				Submit
			</button>
		</div>
	);
}

export default FocusManager;
