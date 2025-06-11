import starFilled from './assets/star-filled.png';
import starEmpty from './assets/star-empty.png';

export default function Star(props) {
	return (
		<button
			onClick={props.handleClick}
			// onClick={props.onClick}
			aria-pressed={props.isFilled}
			aria-label={props.isFilled ? 'Remove from favourite' : 'Add to Favourite'}
			className="favorite-button"
		>
			<img
				src={props.isFilled ? starFilled : starEmpty}
				alt={props.isFilled ? 'Filled Star Icon' : 'empty star icon'}
				className="favorite"
			/>
		</button>
	);
}
