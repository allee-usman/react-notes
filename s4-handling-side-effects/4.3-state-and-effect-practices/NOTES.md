# WindowTracker Component - Memory Leak Bug and Solution

## Component Overview

The `WindowTracker` component tracks and displays the current window width, updating in real-time when the user resizes their browser window.

## The Buggy Code (Memory Leak Issue)

```javascript
import React from 'react';

export default function WindowTracker() {
	const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

	// ❌ BUGGY VERSION - DO NOT USE
	React.useEffect(() => {
		window.addEventListener('resize', () => {
			setWindowWidth(window.innerWidth);
		});
	}, []); // Missing cleanup!

	return <h1>Window width: {windowWidth}</h1>;
}
```

## The Problem: Memory Leak

### What's the Bug?

The code adds an event listener but **never removes it**. This creates a memory leak.

### Why is This Problematic?

1. **Multiple Listeners Accumulate**: Every time the component re-mounts, a new 'resize' listener is added
2. **Old Listeners Stay Active**: Previous listeners are never removed, so they keep running
3. **Performance Degradation**: Multiple listeners run on every resize event
4. **Memory Waste**: Unused listeners consume memory indefinitely

### Real-World Scenario

Imagine this component is used on different pages:

- User visits Page A → 1st listener added
- User navigates to Page B → Component unmounts, but listener stays
- User returns to Page A → 2nd listener added (now we have 2!)
- User navigates again → 3rd listener added
- After 10 page visits → 10 listeners all doing the same job!

### Visual Example

```
Mount #1:    [Listener 1]
Mount #2:    [Listener 1] [Listener 2]
Mount #3:    [Listener 1] [Listener 2] [Listener 3]
Mount #4:    [Listener 1] [Listener 2] [Listener 3] [Listener 4]
...and so on
```

Each resize event triggers ALL these listeners!

## The Solution: Cleanup Function

```javascript
import React from 'react';

export default function WindowTracker() {
	const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

	React.useEffect(() => {
		console.log('Setting up resize listener...');

		// Named function for easier cleanup
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};

		// Add the event listener
		window.addEventListener('resize', handleResize);

		// ✅ CLEANUP FUNCTION - This is the key!
		return function cleanup() {
			console.log('Cleaning up resize listener...');
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return <h1>Window width: {windowWidth}</h1>;
}
```

## How the Cleanup Function Works

### React's Cleanup Mechanism

1. **Setup Phase**: React runs the `useEffect` callback
2. **Cleanup Phase**: When component unmounts (or dependencies change), React calls the returned cleanup function
3. **Memory Management**: This ensures proper cleanup and prevents memory leaks

### Cleanup Function Execution

```javascript
// React internally does something like this:
let cleanupFunction;

// On mount or dependency change:
cleanupFunction = useEffectCallback(); // Your effect runs

// On unmount or before next effect:
if (cleanupFunction) {
	cleanupFunction(); // Your cleanup runs
}
```

## Key Concepts

### Why Use Named Functions?

```javascript
// ✅ Good - Same function reference for add/remove
const handleResize = () => {
	/* ... */
};
window.addEventListener('resize', handleResize);
window.removeEventListener('resize', handleResize);

// ❌ Bad - Different function references
window.addEventListener('resize', () => {
	/* ... */
});
window.removeEventListener('resize', () => {
	/* ... */
}); // Won't work!
```

### Cleanup Function Patterns

```javascript
// Pattern 1: Named cleanup function
return function cleanup() {
	window.removeEventListener('resize', handleResize);
};

// Pattern 2: Arrow function
return () => {
	window.removeEventListener('resize', handleResize);
};

// Pattern 3: Direct return
return () => window.removeEventListener('resize', handleResize);
```

## Best Practices

### 1. Always Clean Up Side Effects

```javascript
useEffect(() => {
	// Any side effect that needs cleanup:
	const timer = setInterval(() => {}, 1000);
	const subscription = api.subscribe(callback);
	window.addEventListener('scroll', handleScroll);

	return () => {
		clearInterval(timer);
		subscription.unsubscribe();
		window.removeEventListener('scroll', handleScroll);
	};
}, []);
```

### 3. Common Side Effects That Need Cleanup

| Side Effect         | Setup                    | Cleanup                      |
| ------------------- | ------------------------ | ---------------------------- |
| **Event Listeners** | `addEventListener`       | `removeEventListener`        |
| **Timers**          | `setInterval/setTimeout` | `clearInterval/clearTimeout` |
| **Subscriptions**   | `subscribe()`            | `unsubscribe()`              |
| **WebSockets**      | `new WebSocket()`        | `socket.close()`             |
| **API Requests**    | `fetch()`                | `AbortController.abort()`    |

## Complete Working Example with Debugging

```javascript
import React from 'react';

export default function WindowTracker() {
	const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

	React.useEffect(() => {
		console.log('🔧 WindowTracker: Setting up resize listener');

		const handleResize = () => {
			const newWidth = window.innerWidth;
			console.log('📏 Window resized to:', newWidth);
			setWindowWidth(newWidth);
		};

		window.addEventListener('resize', handleResize);

		// Cleanup function prevents memory leaks
		return function cleanup() {
			console.log('🧹 WindowTracker: Cleaning up resize listener');
			window.removeEventListener('resize', handleResize);
		};
	}, []); // Empty dependency array = run once on mount

	return (
		<div>
			<h1>Window width: {windowWidth}px</h1>
			<p>Try resizing your browser window!</p>
		</div>
	);
}
```

## Summary

- **Problem**: Event listeners without cleanup cause memory leaks
- **Solution**: Always return a cleanup function from `useEffect`
- **Key Rule**: For every `addEventListener`, there must be a corresponding `removeEventListener`
- **Memory Management**: Cleanup functions prevent accumulation of unused event listeners
- **Performance**: Proper cleanup keeps your app fast and responsive

Remember: **What goes up (setup) must come down (cleanup)!**
