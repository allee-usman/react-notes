import Card from './Card';
import cardItems from './cardData';

function MainContent() {
	const cardEntries = cardItems.map((item) => {
		return (
			<Card
				key={item.id} // react requires a unique key for each element in a list to optimize rendering
				// img={item.img}
				// title={item.title}
				// country={item.country}
				// locationLink={item.locationLink}
				// tripDate={item.tripDate}
				// description={item.description}

				// cardItem={item} // Pass the entire item as a prop

				//# Alternatively, you can use the spread operator to pass all properties at once
				{...item} // Spread operator to pass all properties at once
			/>
		);
	});
	return (
		<>
			<main>
				<h1 className="main-title">Popular Events</h1>
				<div className="card-box-container">{cardEntries}</div>
			</main>
		</>
	);
}

export default MainContent;
