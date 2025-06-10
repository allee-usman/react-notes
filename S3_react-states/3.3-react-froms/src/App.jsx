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
		const email = formData.get('email');
		console.log(email);
		const password = formData.get('password');
		console.log(password);
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
						required
					/>
				</div>
				<div className="input-field">
					<label htmlFor="password">Password:</label>
					<input type="password" id="password" name="password" required />
				</div>
				<button>Submit</button>
			</form>
		</section>
	);
}

export default App;
