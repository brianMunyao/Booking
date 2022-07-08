import React, { useState } from 'react';
import styled from 'styled-components';
import { useCookies } from 'react-cookie';
import { IoPersonCircle } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';

import Logo from './Logo';
import logo from '../assets/liverpool.png';
import { isLoggedIn } from '../apis/users';
import AppBtn from './AppBtn';

const NavBar = () => {
	const [cookies, removeCookie] = useCookies(['user']);
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();

	const signout = () => {
		removeCookie('user');
		navigate('/');
	};

	return (
		<Container open={open}>
			<Link to="/">
				<div className="nav-logo">
					<Logo size={35} img={logo} />

					<span className="nb-title">Liverpool</span>
				</div>
			</Link>

			{isLoggedIn(cookies) && (
				<div className="nb-user" onMouseEnter={() => setOpen(true)}>
					<IoPersonCircle color="tomato" size={30} />
					<span>{cookies.user[0].username}</span>
				</div>
			)}

			{isLoggedIn(cookies) && (
				<div
					className="nb-user-hover"
					onMouseLeave={() => setOpen(false)}>
					<p className="nb-u">
						<b>User:</b> {cookies.user[0].username}
					</p>
					<p className="nb-u">
						<b>Mail:</b> {cookies.user[0].email}
					</p>

					<AppBtn lbl="SIGNOUT" onClick={signout} />
				</div>
			)}

			{!isLoggedIn(cookies) && <AppBtn lbl="REGISTER" to="/signup" />}
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 15px;
	background: bisque;

	.nav-logo {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.nb-title {
		text-transform: uppercase;
		margin-left: 10px;
		font-weight: 700;
		font-size: 20px;
		letter-spacing: 0.4px;
	}
	.nb-user {
		border: 2px solid tomato;
		padding: 4px 7px;
		border-radius: 50px;
		display: flex;
		align-items: center;
		cursor: pointer;
		span {
			margin-left: 5px;
		}
	}
	.nb-user-hover {
		position: absolute;
		z-index: 1;
		right: 5px;
		transition: all 0.2s linear;
		transform: ${({ open }) =>
			!open ? 'translateX(120%)' : 'translateX(0)'};
		top: 10px;
		background: white;
		padding: 10px;
		border-radius: 10px;
		p {
			margin: 5px 0;
		}
		div {
			margin-top: 10px;
		}
	}
`;

export default NavBar;
