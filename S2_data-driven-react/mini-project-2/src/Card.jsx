function Card(props) {
	// console.log(props);

	const { img, title, country, locationLink, tripDate, description } = props;
	return (
		<>
			<article className="card-box">
				<div className="card-image-container">
					<img src={img.src} alt={img.alt} className="card-image" />
				</div>
				<div className="card-content">
					<div className="card-location">
						<span className="location-text">
							<span className="material-icons">location_on</span>
							<span>{country}</span>
						</span>
						<a href={locationLink} target="_blank" className="location-link">
							<span className="material-icons">map</span>
							<p>View on Google Map</p>
						</a>
					</div>
					<h2 className="card-title">{title}</h2>
					<div className="card-date">
						<span className="material-icons date-icon">date_range</span>
						<span className="date">{tripDate}</span>
					</div>
					<p className="card-description">{description}</p>
				</div>
			</article>
		</>
	);
}
export default Card;
