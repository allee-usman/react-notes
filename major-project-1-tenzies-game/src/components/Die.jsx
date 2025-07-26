export default function Die(props) {
	const styles = {
		backgroundColor: props.isHeld ? '#59e391' : undefined,
	};
	return (
		<button
			// onClick={() => hold(id)}
			onClick={props.hold}
			style={styles}
		>
			{props.value}
		</button>
	);
}
