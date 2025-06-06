import TravelLogo from './assets/travel-logo.png'

function Header() {
	return (
		<>
			<header className="header">
				<div className="header-logo-container">
					<img src={TravelLogo} alt="React logo" className="header-logo" />
					<span>Travelo</span>
				</div>
				<nav>
					<ul className="nav-list">
						<li>
							<a href="#">Pricing</a>
						</li>
						<li>
							<a href="#">About</a>
						</li>
						<li>
							<a href="#">Contact</a>
						</li>
					</ul>
				</nav>
			</header>
		</>
	);
}
export default Header;