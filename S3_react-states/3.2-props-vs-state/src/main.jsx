import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import IntroToState from './IntroToState.jsx';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<IntroToState />
	</StrictMode>
);
