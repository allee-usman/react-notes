# useRef Hook - Complete Guide

## What is useRef?

`useRef` is a React hook that creates a **mutable reference object** that persists across component re-renders. It's like having a "box" that can hold any value and won't trigger re-renders when changed.

## Key Characteristics

### useRef vs useState Comparison

| Feature            | useState                        | useRef                        |
| ------------------ | ------------------------------- | ----------------------------- |
| **Mutability**     | Immutable (creates new state)   | Mutable (directly changeable) |
| **Re-renders**     | Triggers re-render when changed | Does NOT trigger re-render    |
| **Access Pattern** | `value` and `setValue()`        | `ref.current`                 |
| **Use Case**       | UI data that affects rendering  | DOM access, timers, counters  |

```javascript
// useState - triggers re-render
const [count, setCount] = useState(0);
setCount(count + 1); // Component re-renders

// useRef - no re-render
const countRef = useRef(0);
countRef.current = countRef.current + 1; // No re-render, direct re-assiging
```

## Common Use Cases

### 1. DOM Element Access

The most common use case - directly accessing DOM elements without IDs.

### 2. Storing Mutable Values

Keeping values that don't need to trigger re-renders (timers, counters, previous values).

### 3. Focus Management

Programmatically focusing inputs, managing keyboard navigation.

### 4. Third-party Library Integration

Storing references to external library instances.

---

## Practical Examples

### Example 1: Basic DOM Access

```javascript
import React, { useRef } from 'react';

function FocusInput() {
	const inputRef = useRef(null);

	const focusInput = () => {
		// Direct DOM manipulation
		inputRef.current.focus();
	};

	return (
		<div>
			<input
				ref={inputRef}
				type="text"
				placeholder="Click button to focus me"
			/>
			<button onClick={focusInput}>Focus Input</button>
		</div>
	);
}
```

**What happens:**

- `inputRef.current` points directly to the DOM input element
- No re-render occurs when we call `focus()`
- Direct DOM manipulation without needing `document.getElementById()`

### Example 2: Counter Without Re-renders

```javascript
import React, { useState, useRef } from 'react';

function CounterComparison() {
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
		</div>
	);
}
```

**Key Learning:** The ref count won't appear updated in the UI until something else causes a re-render, even though the value is actually changing.

### Example 3: Timer Management

```javascript
import React, { useState, useRef, useEffect } from 'react';

function Timer() {
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
		</div>
	);
}
```

**What useRef provides:**

- Stores the timer ID across re-renders
- Allows us to clear the specific timer instance
- Persists the reference even when component re-renders

### Example 4: Previous Value Tracking

```javascript
import React, { useState, useRef, useEffect } from 'react';

function PreviousValue() {
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
		</div>
	);
}
```

### Example 5: Advanced DOM Manipulation

```javascript
import React, { useRef, useState } from 'react';

function ScrollToElement() {
	const topRef = useRef(null);
	const middleRef = useRef(null);
	const bottomRef = useRef(null);

	const scrollToSection = (ref) => {
		ref.current.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		});
	};

	return (
		<div>
			<div style={{ position: 'fixed', top: 0, background: 'white' }}>
				<button onClick={() => scrollToSection(topRef)}>Go to Top</button>
				<button onClick={() => scrollToSection(middleRef)}>Go to Middle</button>
				<button onClick={() => scrollToSection(bottomRef)}>Go to Bottom</button>
			</div>

			<div ref={topRef} style={{ height: '100vh', background: 'lightblue' }}>
				<h2>Top Section</h2>
			</div>
			<div
				ref={middleRef}
				style={{ height: '100vh', background: 'lightgreen' }}
			>
				<h2>Middle Section</h2>
			</div>
			<div
				ref={bottomRef}
				style={{ height: '100vh', background: 'lightcoral' }}
			>
				<h2>Bottom Section</h2>
			</div>
		</div>
	);
}
```

## Complete Working Example - Focus Manager

```javascript
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
```

## Best Practices

### 1. When to Use useRef

```javascript
// ✅ Good use cases
const inputRef = useRef(null); // DOM access
const timerRef = useRef(null); // Store timer IDs
const countRef = useRef(0); // Values that don't affect UI

// ❌ Avoid for UI state
const [visible, setVisible] = useState(false); // Use useState instead
```

### 2. Initial Values

```javascript
// For DOM elements
const elementRef = useRef(null);

// For values
const counterRef = useRef(0);
const dataRef = useRef({ user: null, posts: [] });
```

### 3. Checking if Ref Exists

```javascript
const handleClick = () => {
	if (inputRef.current) {
		inputRef.current.focus(); // Safe to call
	}
};
```

### 4. Don't Read/Write During Render

```javascript
// ❌ Don't do this
function Component() {
	const ref = useRef(0);
	ref.current = ref.current + 1; // Don't mutate during render
	return <div>{ref.current}</div>;
}

// ✅ Do this instead
function Component() {
	const ref = useRef(0);

	const handleClick = () => {
		ref.current = ref.current + 1; // Mutate in event handler
	};

	return <button onClick={handleClick}>Click me</button>;
}
```

## Key Takeaways

1. **No Re-renders**: useRef changes don't trigger component re-renders
2. **Mutable**: You can directly modify `ref.current` without setState
3. **Persistence**: Values persist across re-renders (unlike regular variables)
4. **DOM Access**: Primary use case is accessing DOM elements directly
5. **Timer Management**: Perfect for storing interval/timeout IDs
6. **Previous Values**: Great for tracking previous state values

## Summary Table

| Scenario                | Use useState | Use useRef |
| ----------------------- | ------------ | ---------- |
| UI needs to update      | ✅           | ❌         |
| Direct DOM manipulation | ❌           | ✅         |
| Store timer IDs         | ❌           | ✅         |
| Track previous values   | ❌           | ✅         |
| Form validation state   | ✅           | ❌         |
| Focus management        | ❌           | ✅         |

Remember: **useState for UI state, useRef for everything else that needs to persist!**
