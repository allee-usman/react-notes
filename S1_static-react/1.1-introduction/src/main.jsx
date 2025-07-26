import { StrictMode } from 'react';
import { createElement } from 'react';
import { createRoot } from 'react-dom/client';


// 1. create a root element
const root = createRoot(document.getElementById('root'));

// 2. render the App component inside the root element
// root.render(<h1>Hello, Ali Usman !!</h1>);

// root.render(createElement('h1', null, 'Hello, Ali Usman !!'));

// root.render(
// 	<StrictMode>
// 		<App />
// 	</StrictMode>
// );

//# React is composeable, meaning we can create reusable components and compose them together to build complex UIs. e.g.,
// function Header() {
//     return <h1 className='header'>Hello, Ali Usman !!</h1>;
// }
// function App() {
//     return (
//         <div>
//             <Header />
//         </div>
//     );
// }

//# React is declarative, component-based, and efficient. We have to just tell React what we want to see on the screen, and it will take care of updating the DOM for us.
// root.render(<h1 className='header'>Hello, Ali Usman !!</h1>);

//# Opposite of declarative is imperative, where we have to tell the browser how to do it step by step. e.g.,
// const h1 = document.createElement('h1');
// h1.textContent = 'Hello, Ali Usman !!';
// h1.className = 'header';
// document.getElementById('root').appendChild(h1);

// Static Page Project
// const root = createRoot(document.getElementById('root'));
// root.render(
// 	<main>
// 		<img src="react-logo.png" width="40px" alt="React logo" />
// 		<h1>Fun facts about React!</h1>
// 		<ul>
// 			<li>Was first release in 2013</li>
// 			<li>Was originally created by Jordan Walke</li>
// 			<li>Has well over 200K stars on GitHub</li>
// 			<li>Is maintained by Meta</li>
// 			<li>Powers thousands of enterprise apps, including mobile apps</li>
// 		</ul>
// 	</main>
// );

// Use fragment to avoid adding extra nodes to the DOM
// import { Fragment } from 'react';
// const root = createRoot(document.getElementById('root'));
// root.render(
// 	<Fragment>
// 		<img src="react-logo.png" width="40px" alt="React logo" />
// 		<h1>Fun facts about React!</h1>
// 		<ul>
// 			<li>Was first release in 2013</li>
// 			<li>Was originally created by Jordan Walke</li>
// 			<li>Has well over 200K stars on GitHub</li>
// 			<li>Is maintained by Meta</li>
// 			<li>Powers thousands of enterprise apps, including mobile apps</li>
// 		</ul>
// 	</Fragment>
//   //Note: We can also use the shorthand syntax for Fragment, which is just an empty tag <> </>
// );

// import components
import Header from './Header.jsx';
import MainContent from './MainContent.jsx';
import Footer from './Footer.jsx';


function Page() {
	return (
		<>
			<Header />
			<MainContent />
			<Footer />
		</>
	);
}

root.render(<Page />);
