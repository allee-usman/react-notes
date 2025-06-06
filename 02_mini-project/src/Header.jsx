import ReactLogo from './assets/react-logo.png';

function Header() {
	return (
		<header className="header">
			<div className="header-logo-container">
				<img src={ReactLogo} alt="React logo" className="header-logo" />
				<span>React Logo</span>
			</div>
			<nav>
				<ul className="nav-list">
					<li><a href='#'>Pricing</a></li>
					<li><a href='#'>About</a></li>
					<li><a href='#'>Contact</a></li>
				</ul>
			</nav>
		</header>
	);
}

export default Header;
