import React, { useState } from 'react';
import styled from 'styled-components';
import { useCookies } from 'react-cookie';
import { IoPersonCircle } from 'react-icons/io5';

import Logo from './Logo';
import logo from '../assets/liverpool.png';
import { isLoggedIn } from '../apis/users';
import AppBtn from './AppBtn';

const NavBar = () => {
	const [cookies, removeCookie] = useCookies(['user']);
	const [open, setOpen] = useState(false);

	const signout = () => {
		removeCookie('user');
		window.location.replace('localhost:3000/');
	};

	return (
		<Container open={open}>
			<Logo size={35} img={logo} />

			<span className="nb-title">Liverpool</span>

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
	padding: 15px;
	background: bisque;
	.nb-title {
		text-transform: uppercase;
		margin-left: 10px;
		margin-right: auto;
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
