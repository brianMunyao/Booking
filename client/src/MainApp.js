import React, { useState } from 'react';
import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom';

import LoginScreen from './pages/LoginScreen';
import SignUpScreen from './pages/SignUpScreen';
import Home from './pages/Home';
import MyTicketsScreen from './pages/MyTicketsScreen';
import NavBar from './components/NavBar';
import styled from 'styled-components';
import GameScreen from './pages/GameScreen';
import banner from './assets/stadium.jpg';

const MainApp = () => {
	const [activeTab, setActiveTab] = useState(1);

	const tabsList = [
		{ id: 1, title: 'FOOTBALL TICKETS', to: '/home/available' },
		{ id: 2, title: 'MY TICKETS', to: '/home/mytickets' },
	];

	const HomeRoutes = () => {
		return (
			<Container>
				<NavBar />
				<div className="ma-banner">
					<img src={banner} alt="banner" />
					<div className="ma-cover">
						<p>Welcome to Anfield</p>
					</div>
				</div>
				<Tabs className="tabs">
					{tabsList.map((v, i) => (
						<Link
							key={i}
							to={v.to}
							onClick={() => setActiveTab(v.id)}>
							<Tab
								key={i}
								active={activeTab === v.id}
								className="tab-item">
								{v.title}
							</Tab>
						</Link>
					))}
				</Tabs>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="available" element={<Home />} />
					<Route path="available/:id" element={<GameScreen />} />
					<Route path="mytickets" element={<MyTicketsScreen />} />
				</Routes>

				<div className="ma-bottom"></div>
			</Container>
		);
	};

	return (
		<BrowserRouter>
			<Routes>
				<Route path="home/*" element={<HomeRoutes />} />
				<Route path="/" element={<Navigate to="/home" />} />
				<Route path="/login" element={<LoginScreen />} />
				<Route path="/signup" element={<SignUpScreen />} />
			</Routes>
		</BrowserRouter>
	);
};

const Container = styled.div`
	.ma-banner {
		width: 100%;
		height: 300px;
		position: relative;
		overflow: hidden;

		img {
			position: absolute;
			width: 100%;
			margin: auto;
			top: -9999px;
			bottom: -9999px;
			left: -9999px;
			right: -9999px;

			@media (max-width: 540px) {
				height: 100%;
				width: auto;
			}
		}
		.ma-cover {
			position: absolute;
			background: #00000044;
			top: 0;
			right: 0;
			left: 0;
			bottom: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			color: white;
			font-weight: 600;
			font-size: 35px;
			letter-spacing: 0.3px;
		}
	}
	.ma-bottom {
		height: 50px;
		/* background: red; */
	}
`;

const Tabs = styled.div`
	display: flex;
	background: #e7e7e7;
	margin-bottom: 10px;
`;

const Tab = styled.div`
	font-weight: 600;
	font-size: 15px;
	padding: 10px;
	background: ${({ active }) => (active ? 'white' : '#e7e7e7')};
	color: ${({ active }) => (active ? 'dodgerblue' : '#5e5e5e')};
	border-bottom: ${({ active }) =>
		active ? '2px solid dodgerblue' : '2px solid transparent'};
`;

export default MainApp;
