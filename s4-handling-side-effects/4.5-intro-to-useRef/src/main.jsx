import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import DOMElements from './DOMElement.jsx';
import Muteble from './MutableDemo.jsx';
import TimerMang from './TimerManagement.jsx';
import PreviousValue from './PrevValue.jsx';
import ScrollToElement from './ScrollAnimation.jsx';
import CompleteDemo from './CompleteDemo.jsx';

/*
Refs are similar to state, except:
  1.  You can mutate them directly
  2.  Changing them doesn’t cause a re-render.

They’re commonly used for accessing DOM nodes without needing to assign ids to elements.
#Common Use Cases:
1. DOM Element Access
2. Storing Mutable Values
3. Focus Management
4. Third-party Library Integration
*/

createRoot(document.getElementById('root')).render(
	<StrictMode>
		{/* <DOMElements />
		<Muteble />
		<TimerMang />
		<PreviousValue />
		<ScrollToElement /> */}
		<CompleteDemo />
	</StrictMode>
);
