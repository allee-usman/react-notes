import React from 'react';
import avatar from './assets/user.png';
import './ComplexStateObjects.css';
import starFilled from './assets/star-filled.png';
import starEmpty from './assets/star-empty.png';

export default function App() {
	const [contact, setContact] = React.useState({
		firstName: 'John',
		lastName: 'Doe',
		phone: '+1 (212) 555-1212',
		email: 'itsmyrealname@example.com',
		isFavorite: false,
	});
	/**
	 * Challenge: Fill in the values in the markup
	 * using the properties of our state object above
	 * (Ignore `isFavorite` for now)
	 */

	function toggleFavorite() {
		setContact((prevContact) => {
			return {
				...prevContact,
				isFavorite: !prevContact.isFavorite,
			};
		});
	}

	return (
		<main>
			<article className="card">
				<img
					src={avatar}
					className="avatar"
					alt="User profile picture of John Doe"
				/>
				<div className="info">
					<button
						onClick={toggleFavorite}
						aria-pressed={contact.isFavorite}
						aria-label={
							contact.isFavorite ? 'Remove from favourite' : 'Add to Favourite'
						}
						className="favorite-button"
					>
						<img
							src={contact.isFavorite ? starFilled : starEmpty}
							alt={contact.isFavorite ? 'Filled Star Icon' : 'empty star icon'}
							className="favorite"
						/>
					</button>
					<h2 className="name">{contact.firstName + ' ' + contact.lastName}</h2>
					<p className="contact">{contact.phone}</p>
					<p className="contact">{contact.email}</p>
				</div>
			</article>
		</main>
	);
}
