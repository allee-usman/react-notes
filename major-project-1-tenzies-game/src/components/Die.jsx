export default function Die({ value, isHeld }) {
	const styles = {
		backgroundColor: isHeld ? '#59e391' : undefined,
	};
	return <button style={styles}>{value}</button>;
}
