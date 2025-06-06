import Card from './Card';
import cardEntries from './cardData';

function App() {
	const cardElements = cardEntries.map((card) => {
		return (
			<Card
				img={card.img}
				name={card.name}
				phoneNum={card.phoneNum}
				email={card.email}
			/>
		);
	});
	return (
		<>
			<h1>My Contacts</h1>
			<div className="contacts">{cardElements}</div>
		</>
	);
}

export default App;
