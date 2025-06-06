//Info: Realative path to assests may not work in production build, as vite bundle all the assets into a single file.
//       Use absolute path to public folder for static assets in production build.
//       In development mode, vite serves the assets from the public folder, so relative path works fine.
//       For static assets, use the public folder and import them directly in the component.
//       For dynamic assets, use the src folder and import them using relative path.

// importing static assets

import image1 from './assets/cat-1.jpg';
import image2 from './assets/cat-2.jpg';
import image3 from './assets/cat-3.jpg';
import image4 from './assets/cat-4.jpg';

export default [
	{
		img: image1,
		name: 'Mr. Whiskerson',
		phoneNum: '(212) 555-1234',
		email: 'mr.whiskaz@catnap.meow',
	},
	{
		img: image2,
		name: 'Fluffykins',
		phoneNum: '(212) 555-2345',
		email: 'fluff@me.com',
	},
	{
		img: image3,
		name: 'Felix',
		phoneNum: '(212) 555-4567',
		email: 'thecat@hotmail.com',
	},
	{
		img: image4,
		name: 'Pumpkin',
		phoneNum: '(0800) CAT KING',
		// email="pumpkin@scrimba.com"
		comment: [
			{ author: 'John', text: 'Great cat!' },
			{ author: 'Jane', text: 'So fluffy!' },
		],
	},
];
