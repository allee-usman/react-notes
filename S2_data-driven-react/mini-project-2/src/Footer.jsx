function Footer() {
    return (
			<>
				<footer className="footer">
					<small>
						© {new Date().getFullYear()}{' '}
						<strong className="company-name">Travelo</strong> Agency. All
						rights reserved.
					</small>
				</footer>
			</>
		);
}
export default Footer;