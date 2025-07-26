export default function Die(props) {
	const styles = {
		backgroundColor: props.isHeld ? '#59e391' : undefined,
	};
	return (
		<button
			// onClick={() => hold(id)}
			onClick={props.hold}
			style={styles}
			aria-pressed={props.isHeld}
			aria-label={`Die with value ${props.value}, currently ${
				props.isHeld ? 'held' : 'not held'
			}`}
		>
			{props.value}
		</button>
	);
}
