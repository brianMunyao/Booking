import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../assets/logo.png';

const Logo = ({ link, img = logo, size = 33 }) => {
	if (link) {
		return (
			<Link to="/">
				<img src={img} alt="logo" height={size} />
			</Link>
		);
	}
	return <img src={img} alt="logo" height={size} />;
};

export default Logo;
