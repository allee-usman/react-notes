import React from 'react';
import avatar from './assets/user.png';
import './Card.css';
import Star from './Star';

export default function Card() {
	const [contact, setContact] = React.useState({
		firstName: 'Ali',
		lastName: 'Usman',
		phone: '+1 (212) 555-1212',
		email: 'aliusman@example.com',
		isFavorite: false,
	});

	function toggleFavorite() {
		setContact((prevContact) => {
			return {
				...prevContact,
				isFavorite: !prevContact.isFavorite,
			};
		});
	}

	/*
<Star isFilled={contact.isFavorite} onClick={toggleFavorite} /> is not going to work, because onClick is a DOM event while Star is custom React Component. We can only apply onClick to DOM elements.

? Solution?
Pass the `toggleFavorite` function as a prop to the Star component and then apply the `onClick` event on the native DOM element inside the Star component. i.e.
<Star isFilled={contact.isFavorite} handleClick={toggleFavorite} />

By doing this, `Start()` will recieve the `handleClick` function as a prop and apply it to the native DOM element inside it.

Info: If you pass the `toggleFavorite` as `onClick` prop to Star and apply the `onClick` event to native DOM element, it will work now.


*/
	return (
		<main>
			<article className="card">
				<img
					src={avatar}
					className="avatar"
					alt="User profile picture of John Doe"
				/>
				<div className="info">
					{/* <Star isFilled={contact.isFavorite} onClick={toggleFavorite} /> */}
					<Star isFilled={contact.isFavorite} handleClick={toggleFavorite} />
					<h2 className="name">{contact.firstName + ' ' + contact.lastName}</h2>
					<p className="contact">{contact.phone}</p>
					<p className="contact">{contact.email}</p>
				</div>
			</article>
		</main>
	);
}
