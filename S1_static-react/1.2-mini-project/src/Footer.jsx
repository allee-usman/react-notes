function Footer() {
	return (
		<footer className="footer">
			<small>
				© {new Date().getFullYear()}{' '}
				<strong className="company-name">Ali Usman</strong> development. All
				rights reserved.
			</small>
		</footer>
	);
}
export default Footer;
