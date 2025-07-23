// import { useState } from 'react';

export default function Header(props) {
	// const [username, setUsername] = useState('Ali');
	return (
		<header>
			<h2>{props.username}</h2>
		</header>
	);
}
