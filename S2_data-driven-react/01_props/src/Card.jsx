function Card(props) {
	const { img, name, phoneNum, email } = props;
    
	return (
		<>
			<article className="contact-card">
				<img src={img} alt="Photo of Mr. Whiskerson" />
				<h3>{name}</h3>
				<div className="info-group">
					<span className="material-icons">call</span>
					<p>{phoneNum}</p>
				</div>

				{/* Conditional Rendering */}

				{/* {email && (
					<div className="info-group">
						<span className="material-icons">mail</span>

						<p>{email}</p>
					</div>
				)} */}

				{/* OR alternatively */}

				<div style={{display: email ? "flex" : "none"}} className="info-group">
					<span className="material-icons">mail</span>

					<p>{email}</p>
				</div>
			</article>
		</>
	);
}
//Note: It is recomended to use props.propertyName instead of destructuring props in the function parameters for better readability in larger components. As it helps to understand where the properties are coming from, especially when the component is complex or has many props.

export default Card;
