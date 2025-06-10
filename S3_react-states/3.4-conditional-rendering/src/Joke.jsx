/* 
//$ The logic behind && rendering
The working of && operator is, As soon as first expression evaluated false, the second expression get ignored as all expression needs to be truthy in order to final truthy value. So if first is true, the && operator proceed further to check second.
*/

// if (true && console.log('The code is running!')) { // output: The code is running
// }

// if (false && console.log('The code is running!')) { // output:
// }

// if (
// 	true &&
// 	console.log('First statement!') &&
// 	console.log('Second statement!') // output: First statement!
// ) {
// 	//body
// }

// if (
// 	true &&
// 	console.log('First statement!') &&
// 	console.log('Second statement!') &&
// 	console.log('Third statement!') // output: First statement!
// ) {
// 	//body
// }

/*
$Limitations of && operator:
Not efficient when we have to choose one thing to show based on truthiness of an expression i.e.
const [unreadMsgs, setUnreadMsgs] = useState(['a', 'b'])
{unreadMsgs.length > 0 && <h1>You have {unreadMsgs.length} unread messages.</h1>}
{unreadMsgs.length === 0 && <h1>You have no unread messages.</h1>}

#Notice the code repetition above.

The efficient solution to this scanerio is:
# Ternary Operator
{unreadMsgs.length ? <h1>You have {unreadMsgs.length} unread messages.</h1> : <h1>You have no unread messages.</h1>}
 
Recommended: Try to use ternary operator, avoid && if you can, as it comes with some bugs.
*/

import './Joke.css';
import { useState } from 'react';

function Joke(props) {
	const [isShown, setIsShown] = useState(false);

	function toggleShown() {
		setIsShown((prevState) => !prevState);
	}
	// console.log(isShown);

	return (
		<div className="joke-container">
			{props.setup && (
				<p className="setup">
					<strong>{props.setup}</strong>
				</p>
			)}

			{/* <div className="punchline">{isShown ? props.punchline : ''}</div> */}
			{/* {isShown ? <div className="punchline">{props.punchline}</div> : ''} */}
			{/* {isShown === true && <div className="punchline">{props.punchline}</div>} */}
			{isShown && <p className="punchline">{props.punchline}</p>}
			{/* <div className="punchline">{isShown ? props.punchline : ''}</div> */}

			<button onClick={toggleShown}>
				{isShown ? 'Hide' : 'Show'} Punchline
			</button>
			<hr />
		</div>
	);
}

export default Joke;
