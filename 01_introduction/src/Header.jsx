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
					<a href="#">
						<li>Pricing</li>
					</a>
					<a href="#">
						<li>About</li>
					</a>
					<a href="#">
						<li>Contact</li>
					</a>
				</ul>
			</nav>
		</header>
	);
}
export default Header;
