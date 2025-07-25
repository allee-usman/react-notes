import { useState, useEffect } from 'react';

export default function Main() {
	const [meme, setMeme] = useState({
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
		setMeme((prevMeme) => {
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

	// console.log(allMemes);
	function getMemeImage() {
		const randomNum = Math.floor(Math.random() * allMemes.length);
		const memeUrl = allMemes[randomNum].url;
		setMeme((prevMeme) => ({
			...prevMeme,
			imageUrl: memeUrl,
		}));
	}

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
				<button onClick={getMemeImage}>Get a new meme image 🖼️</button>
			</div>
			<div className="meme">
				<img src={meme.imageUrl} />
				<span className="top">{meme.topText}</span>
				<span className="bottom">{meme.bottomText}</span>
			</div>
		</main>
	);
}
