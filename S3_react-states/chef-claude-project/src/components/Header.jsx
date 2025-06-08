import chefClaudeLogo from '../assets/chef-claude-logo.png';

function Header() {
	return (
		<header className="header">
			<div className="header-logo-container">
				<img
					src={chefClaudeLogo}
					alt="chef cluade logo"
					className="header-logo"
				/>
				<span>Chef Claude</span>
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
	);
}
export default Header;
