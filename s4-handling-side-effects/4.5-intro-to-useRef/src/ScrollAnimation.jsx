import React, { useRef, useState } from 'react';

export default function ScrollToElement() {
	const topRef = useRef(null);
	const middleRef = useRef(null);
	const bottomRef = useRef(null);

	const scrollToSection = (ref) => {
		ref.current.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		});
	};

	return (
		<div>
			<div style={{ position: 'fixed', top: 0, background: 'white' }}>
				<button onClick={() => scrollToSection(topRef)}>Go to Top</button>
				<button onClick={() => scrollToSection(middleRef)}>Go to Middle</button>
				<button onClick={() => scrollToSection(bottomRef)}>Go to Bottom</button>
			</div>

			<div ref={topRef} style={{ height: '100vh', background: 'lightblue' }}>
				<h2>Top Section</h2>
			</div>
			<div
				ref={middleRef}
				style={{ height: '100vh', background: 'lightgreen' }}
			>
				<h2>Middle Section</h2>
			</div>
			<div
				ref={bottomRef}
				style={{ height: '100vh', background: 'lightcoral' }}
			>
				<h2>Bottom Section</h2>
			</div>
		</div>
	);
}
