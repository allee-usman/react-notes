function Count(props) {
	// console.log('Count: ' + props.number);
	console.log('Count rendered');

	return <h1 className="count">{props.number}</h1>;
}

export default Count;
