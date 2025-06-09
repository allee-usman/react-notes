import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import IntroToState from './IntroToState.jsx';
import ComplexStateArrays from './ComplexStateArrays.jsx';
import ComplexStateObjects from './ComplexStateObjects.jsx';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		{/* <IntroToState /> */}
		{/* <ComplexState /> */}
		<ComplexStateObjects />
	</StrictMode>
);
