import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import MainContent from './MainContent.jsx';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<MainContent />
	</StrictMode>
);
