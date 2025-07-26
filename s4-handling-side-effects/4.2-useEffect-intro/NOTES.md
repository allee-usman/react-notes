# React's Core Tasks and Limitations

## What are React's Primary Tasks?

React is designed to handle three fundamental responsibilities in web applications:

### 1. DOM Manipulation and UI Rendering

- **Browser/DOM Integration**: React works seamlessly with the browser's DOM to render user interfaces
- **Virtual DOM**: Creates a virtual representation of the DOM for efficient updates
- **Component Rendering**: Converts JSX and component logic into actual HTML elements on the page

```javascript
// React handles rendering this to the DOM
function App() {
	return (
		<div>
			<h1>Hello World</h1>
			<button>Click me</button>
		</div>
	);
}
```

### 2. State Management Across Render Cycles

- **State Persistence**: Maintains state values between component re-renders
- **Memory Management**: Ensures state is "remembered" from one render to the next
- **State Updates**: Provides mechanisms to update state through hooks like `useState`

```javascript
function Counter() {
	const [count, setCount] = useState(0); // State persists between renders

	return (
		<div>
			<p>Count: {count}</p>
			<button onClick={() => setCount(count + 1)}>Increment</button>
		</div>
	);
}
```

### 3. Reactive UI Updates

- **Automatic Re-rendering**: Triggers component re-renders when state changes
- **Efficient Updates**: Only updates parts of the UI that actually changed
- **Declarative Updates**: You describe what the UI should look like, React handles the how

```javascript
// When state changes, React automatically updates the UI
const [user, setUser] = useState({ name: 'John', age: 25 });

// This will automatically re-render with new data
setUser({ name: 'Jane', age: 30 });
```

## What React Can't Do on Its Own?

React has intentional limitations and cannot handle **side effects** - operations that interact with the outside world beyond the component's render cycle.

### Side Effects Include:

#### 1. Browser Storage Operations

- **localStorage/sessionStorage**: Cannot automatically sync with browser storage
- **IndexedDB**: No built-in database interaction
- **Cookies**: Cannot directly manage cookie operations

```javascript
// ❌ React can't automatically detect localStorage changes
// This won't trigger a re-render if localStorage changes externally
const userPrefs = localStorage.getItem('preferences');
```

#### 2. API and Database Interactions

- **HTTP Requests**: Cannot make API calls during render
- **Database Operations**: No direct database connectivity
- **External Services**: Cannot interact with third-party services

```javascript
// ❌ This would run on every render - problematic!
function UserList() {
	const users = fetch('/api/users'); // Don't do this!
	return <div>{/* render users */}</div>;
}
```

#### 3. Subscriptions and Real-time Connections

- **WebSocket Connections**: Cannot establish persistent connections
- **Event Listeners**: Cannot set up DOM event listeners
- **Timers**: Cannot create intervals or timeouts
- **External Data Sources**: Cannot subscribe to real-time data streams

```javascript
// ❌ These side effects need special handling
const socket = new WebSocket('ws://localhost:8080'); // Side effect
const timer = setInterval(() => {}, 1000); // Side effect
document.addEventListener('click', handler); // Side effect
```

#### 4. Other External Interactions

- **File System Operations**: Cannot read/write files
- **Geolocation**: Cannot access device location
- **Camera/Microphone**: Cannot access media devices
- **Push Notifications**: Cannot send notifications

## How to Handle Side Effects: The `useEffect` Solution

React provides the `useEffect` hook as the primary mechanism for managing side effects safely and predictably.

### Basic `useEffect` Pattern

```javascript
import { useEffect, useState } from 'react';

function DataComponent() {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);

	// Handle side effect safely
	useEffect(() => {
		// Side effect logic goes here
		async function fetchData() {
			try {
				const response = await fetch('/api/data');
				const result = await response.json();
				setData(result);
			} catch (error) {
				console.error('Failed to fetch data:', error);
			} finally {
				setLoading(false);
			}
		}

		fetchData();
	}, []); // Dependency array controls when effect runs

	if (loading) return <div>Loading...</div>;
	return <div>{JSON.stringify(data)}</div>;
}
```

### Common `useEffect` Patterns

#### 1. Data Fetching

```javascript
useEffect(() => {
	// Fetch data on component mount
	fetchUserData(userId).then(setUser);
}, [userId]); // Re-fetch when userId changes
```

#### 2. Setting up Subscriptions

```javascript
useEffect(() => {
	const socket = new WebSocket('ws://localhost:8080');

	socket.onmessage = (event) => {
		setMessages((prev) => [...prev, event.data]);
	};

	// Cleanup subscription
	return () => {
		socket.close();
	};
}, []);
```

#### 3. localStorage Synchronization

```javascript
useEffect(() => {
	// Read from localStorage on mount
	const saved = localStorage.getItem('userPreferences');
	if (saved) {
		setPreferences(JSON.parse(saved));
	}
}, []);

useEffect(() => {
	// Save to localStorage when preferences change
	localStorage.setItem('userPreferences', JSON.stringify(preferences));
}, [preferences]);
```

#### 4. Event Listeners

```javascript
useEffect(() => {
	function handleResize() {
		setWindowWidth(window.innerWidth);
	}

	window.addEventListener('resize', handleResize);

	// Cleanup event listener
	return () => {
		window.removeEventListener('resize', handleResize);
	};
}, []);
```

#### 5. Timers and Intervals

```javascript
useEffect(() => {
	const timer = setInterval(() => {
		setCurrentTime(new Date());
	}, 1000);

	// Cleanup timer
	return () => {
		clearInterval(timer);
	};
}, []);
```

## Key Principles for Side Effects

### 1. **Timing Matters**

- Side effects should not run during render
- Use `useEffect` to run them after render is complete
- Control when effects run with dependency arrays

### 2. **Cleanup is Critical**

- Always clean up subscriptions, timers, and event listeners
- Return a cleanup function from `useEffect`
- Prevents memory leaks and unexpected behavior

### 3. **Dependencies Control Execution**

- Empty array `[]`: Run once on mount
- No array: Run on every render (usually not desired)
- With dependencies `[dep1, dep2]`: Run when dependencies change

### 4. **Error Handling**

- Always handle potential errors in side effects
- Use try-catch blocks for async operations
- Provide fallback UI states

## Summary

| **React Handles**      | **React Cannot Handle (Side Effects)** |
| ---------------------- | -------------------------------------- |
| ✅ DOM Rendering       | ❌ API Calls                           |
| ✅ State Management    | ❌ localStorage                        |
| ✅ UI Updates          | ❌ WebSocket Connections               |
| ✅ Component Lifecycle | ❌ Timers/Intervals                    |
| ✅ Event Handling      | ❌ External Subscriptions              |

**Solution**: Use `useEffect` to safely manage all side effects outside of React's core responsibilities.

This separation of concerns keeps React components predictable and ensures side effects are handled at the right time in the component lifecycle.
