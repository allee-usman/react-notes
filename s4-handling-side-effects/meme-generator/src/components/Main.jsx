import { useState } from 'react';

export default function Main() {
	const [meme, setMeme] = useState({
		topText: 'One does not simply',
		bottomText: 'Walk into Mordor',
		imageUrl: 'http://i.imgflip.com/1bij.jpg',
	});
	const handleChange = (event) => {
		// console.log('Changed!!');
		// console.log(event); //object
		// console.log(event.target.value);

		const { value, name } = event.currentTarget;
		setMeme((prevMeme) => {
			return {
				...prevMeme,
				[name]: value,
				//Note: To use `[name]: value` make sure name attribute of input element and key of local state(meme) are same.
			};
		});
	};

	return (
		<main>
			<div className="form">
				<label>
					Top Text
					<input
						type="text"
						placeholder={meme.topText}
						name="topText"
						onChange={handleChange}
						value={meme.topText}
					/>
				</label>

				<label>
					Bottom Text
					<input
						type="text"
						placeholder={meme.bottomText}
						name="bottomText"
						onChange={handleChange}
						value={meme.bottomText}
					/>
				</label>
				<button>Get a new meme image 🖼️</button>
			</div>
			<div className="meme">
				<img src={meme.imageUrl} />
				<span className="top">{meme.topText}</span>
				<span className="bottom">{meme.bottomText}</span>
			</div>
		</main>
	);
}
