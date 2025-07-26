# Principles of Functional Programming in React

## Overview

Functional programming principles form the foundation of modern React development. These concepts help create predictable, maintainable, and bug-free applications by promoting immutability, pure functions, and controlled side effects.

## 1. Pure Functions

### Definition

A **pure function** is a function that:

- Given the same input, always produces the same output
- Has no side effects (doesn't modify anything outside its scope)
- Doesn't depend on external state that might change

### React Connection

This principle inspired React's core concept: **"UI as a function of state"**

```javascript
// Pure function example
function greet(name) {
	return `Hello, ${name}!`; // Always returns same output for same input
}

// React component as pure function
function UserCard({ name, email }) {
	return (
		<div>
			<h3>{name}</h3>
			<p>{email}</p>
		</div>
	);
}
```

### Benefits

- Predictable behavior
- Easy to test
- No unexpected side effects
- Enables React's optimization features (memoization, etc.)

## 2. Immutability

### Definition

**Immutability** means that data structures cannot be changed after creation. Instead of modifying existing data, you create new data structures with the desired changes.

### React Implementation

- **Props are immutable**: Components receive props as read-only data
- **State updates require new objects**: You cannot directly mutate state

### Examples

```javascript
// ❌ Wrong - Mutating state directly
function addItem(items, newItem) {
	items.push(newItem); // Mutates original array
	return items;
}

// ✅ Correct - Creating new state
function addItem(items, newItem) {
	return [...items, newItem]; // Returns new array
}

// React state updates
const [users, setUsers] = useState([]);

// ❌ Wrong
users.push(newUser);
setUsers(users);

// ✅ Correct
setUsers([...users, newUser]);
```

### Benefits

- Prevents accidental data corruption
- Enables React's efficient re-rendering
- Makes debugging easier
- Supports time-travel debugging

## 3. Avoiding Side Effects

### Definition

A **side effect** is any operation that affects something outside the function's scope, such as:

- API calls
- DOM manipulation
- Database operations
- Console logging
- Modifying global variables

### The Problem

```javascript
// ❌ Problematic component with side effects
function App() {
	// This runs on every render!
	fetch('/api/items', { method: 'POST', body: JSON.stringify(newItem) });

	return <div>My App</div>;
}
```

**Issue**: If React re-renders this component 1000 times, it will make 1000 POST requests!

### The Solution: Controlled Side Effects

React provides specific hooks to manage side effects safely:

#### 1. useEffect Hook

```javascript
function App() {
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(false);

	// ✅ Controlled side effect for data fetching
	useEffect(() => {
		async function fetchItems() {
			setLoading(true);
			try {
				const response = await fetch('/api/items');
				const data = await response.json();
				setItems(data);
			} catch (error) {
				console.error('Failed to fetch items:', error);
			} finally {
				setLoading(false);
			}
		}

		fetchItems();
	}, []); // Empty dependency array = run once on mount

	return <div>{loading ? <p>Loading...</p> : <ItemList items={items} />}</div>;
}
```

#### 2. Event Handlers for User Actions

```javascript
function AddItemForm() {
	const [items, setItems] = useState([]);
	const [newItem, setNewItem] = useState('');

	// ✅ Side effect triggered by user action
	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch('/api/items', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name: newItem }),
			});

			const addedItem = await response.json();
			setItems([...items, addedItem]); // Immutable update
			setNewItem(''); // Reset form
		} catch (error) {
			console.error('Failed to add item:', error);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<input value={newItem} onChange={(e) => setNewItem(e.target.value)} />
			<button type="submit">Add Item</button>
		</form>
	);
}
```

## Best Practices for Managing Side Effects

### 1. Data Fetching Pattern

```javascript
// GET data and save in state
useEffect(() => {
	// 1. GET the data
	fetch('/api/data')
		.then((response) => response.json())
		.then((data) => {
			// 2. Save the data in state
			setData(data);
		});
}, []);
```

### 2. Cleanup Side Effects

```javascript
useEffect(() => {
	const timer = setInterval(() => {
		console.log('Timer tick');
	}, 1000);

	// Cleanup function
	return () => {
		clearInterval(timer);
	};
}, []);
```

### 3. Dependency Management

```javascript
useEffect(() => {
	fetchUserData(userId);
}, [userId]); // Re-run when userId changes
```

## Key Takeaways

1. **Keep components pure**: Given the same props and state, always render the same output
2. **Never mutate**: Always create new objects/arrays when updating state
3. **Control side effects**: Use `useEffect` for data fetching, subscriptions, and cleanup
4. **Separate concerns**: Keep business logic separate from rendering logic
5. **Think declaratively**: Describe what the UI should look like, not how to achieve it

## Common Patterns

### Loading States

```javascript
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
	async function fetchData() {
		try {
			setLoading(true);
			const result = await api.getData();
			setData(result);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	}

	fetchData();
}, []);
```

### Optimistic Updates

```javascript
const handleAddItem = async (newItem) => {
	// Optimistically update UI
	setItems([...items, { ...newItem, id: Date.now() }]);

	try {
		const savedItem = await api.addItem(newItem);
		// Replace temporary item with server response
		setItems((prev) =>
			prev.map((item) => (item.id === newItem.id ? savedItem : item))
		);
	} catch (error) {
		// Revert on error
		setItems((prev) => prev.filter((item) => item.id !== newItem.id));
		showError('Failed to add item');
	}
};
```

These principles make React applications more predictable, easier to debug, and more performant.
