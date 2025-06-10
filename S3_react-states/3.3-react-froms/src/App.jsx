import './App.css';

function App() {
	// This function will trigger when form is submitted using onSubmit eventt listner.
	function handleFormSubmit(event) {
		event.preventDefault();
		const formElement = event.currentTarget;
		const formData = new FormData(formElement);
		const email = formData.get('email');
		console.log(email);

		// console.log('Form Submitted!');
		formElement.reset();
	}

	// This `signUp()` will get triggered when form submitted, not due to `onSubmit` eventListner but with action attribute

	//Note: This function will not recieve `event` object, but direclty recieve FormData.
	function signUp(formData) {
		// console.log('Form Submitted using action attribute!');
		// const email = formData.get('email');
		// console.log(email);
		// const password = formData.get('password');
		// console.log(password);

		// const description = formData.get('description');
		// console.log(description);

		// const gender = formData.get('gender');
		// console.log(gender);

		// // const hobbies = formData.get('hobbies'); // will return only one of the checked values
		// const hobbies = formData.getAll('hobbies'); // use `getAll()` in order to get all
		// console.log(hobbies);

		// const favColor = formData.getAll('favColor'); //Info: if multiple=false in select, use `get()`. It is also ok to use `getAll()` but the difference will be in this case it returns an array no matter if the select count is 1.
		// console.log(favColor);

		const data = Object.fromEntries(formData); // this will return an object containg name of all the inputs against their values
		console.log(data); // {email: ali@usman.com, password: ali@123, ....}

		//Note: `Object.fromEntries(formData)` returns only single value for each input, so when want to recieve multiple values, we have to do it manually i.e.

		const hobbies = formData.getAll('hobbies');
		const completeData = {
			...data,
			hobbies,
		};
		console.log(completeData);
	}

	return (
		//Note: Cannot specify a encType or method for a form that specifies a function as the action
		<section>
			<h1>Form in React</h1>
			{/* <form method="post" id="my-form" onSubmit={handleFormSubmit}> */}
			<form action={signUp} id="my-form">
				<div className="input-field">
					<label htmlFor="email">Email:</label>
					<input
						type="email"
						id="email"
						name="email"
						placeholder="ali@gmail.com"
						defaultValue="ali@usman.com"
						required
					/>
				</div>
				<div className="input-field">
					<label htmlFor="password">Password:</label>
					<input
						type="password"
						id="password"
						name="password"
						defaultValue="ali@usman1122"
						required
					/>
				</div>

				<div className="input-field">
					<label htmlFor="description">Description:</label>
					<textarea
						name="description"
						id="description"
						defaultValue="this is some description"
					></textarea>
				</div>

				<fieldset>
					<legend>Gender</legend>
					<label>
						<input
							type="radio"
							name="gender"
							defaultValue="male"
							defaultChecked={true}
						/>
						Male
					</label>
					<label>
						<input type="radio" name="gender" defaultValue="female" />
						Female
					</label>
					<label>
						<input type="radio" name="gender" defaultValue="other" />
						Prefer not to say
					</label>
				</fieldset>

				<fieldset>
					<legend>Hobbies</legend>
					{/* Info: we can use multiple `defaultChecked` attribute on checkboxes */}
					<label>
						<input type="checkbox" name="hobbies" defaultValue="cocking" />
						Cocking
					</label>
					<label>
						<input type="checkbox" name="hobbies" defaultValue="reading" />
						Reading
					</label>
					<label>
						<input type="checkbox" name="hobbies" defaultValue="gardening" />
						Gardening
					</label>
				</fieldset>

				<label htmlFor="fav-color">What is your favourite color?</label>
				<select name="favColor" id="fav-color" multiple>
					<option value="" disabled>
						-- Choose a color --
					</option>{' '}
					{/* will not show up if multiple i true */}
					<option value="blue">Blue</option>
					<option value="red">ٌRed</option>
					<option value="green">Green</option>
					<option value="olive">Olive</option>
					<option value="orange">Orange</option>
				</select>

				<button>Submit</button>
			</form>
		</section>
	);
}

export default App;
