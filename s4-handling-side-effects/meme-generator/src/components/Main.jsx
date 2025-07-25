import { useState, useEffect } from 'react';

export default function Main() {
	const [memeText, setMemeText] = useState({
		topText: 'One does not simply',
		bottomText: 'Walk into Mordor',
		imageUrl: 'http://i.imgflip.com/1bij.jpg',
	});

	const [allMemes, setAllMemes] = useState([]);
	const handleChange = (event) => {
		// console.log('Changed!!');
		// console.log(event); //object
		// console.log(event.target.value);

		const { value, name } = event.currentTarget;
		setMemeText((prevMeme) => {
			return {
				...prevMeme,
				[name]: value,
				//Note: To use `[name]: value` make sure name attribute of input element and key of local state(meme) are same.
			};
		});
	};

	useEffect(() => {
		fetch('https://api.imgflip.com/get_memes')
			.then((res) => res.json())
			.then((resData) => setAllMemes(resData.data.memes));
	}, []);

	console.log(allMemes);

	// const randomNum = Math.floor(Math.random() * 10);
	// // console.log(randomNum);

	return (
		<main>
			<div className="form">
				<label>
					Top Text
					<input
						type="text"
						placeholder={memeText.topText}
						name="topText"
						onChange={handleChange}
						value={memeText.topText}
					/>
				</label>

				<label>
					Bottom Text
					<input
						type="text"
						placeholder={memeText.bottomText}
						name="bottomText"
						onChange={handleChange}
						value={memeText.bottomText}
					/>
				</label>
				<button>Get a new meme image 🖼️</button>
			</div>
			<div className="meme">
				<img src={'#'} />
				<span className="top">{memeText.topText}</span>
				<span className="bottom">{memeText.bottomText}</span>
			</div>
		</main>
	);
}
