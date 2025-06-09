import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import IntroToState from './IntroToState.jsx';
import ComplexState from './ComplexState.jsx';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		{/* <IntroToState /> */}
		<ComplexState />
	</StrictMode>
);
