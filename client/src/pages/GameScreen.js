import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
// import NumberPicker from 'react-widgets/NumberPicker';

import AppBtn from '../components/AppBtn';
import Separator from '../components/Separator';
import { filterItem, getImage, getMonthData, stadium } from '../apis/funcs';
import moment from 'moment';
import GroupList from '../components/GroupList';
import { buyTicket, getMatches, isLoggedIn } from '../apis/users';
import { useCookies } from 'react-cookie';

const GameScreen = () => {
	const [info, setInfo] = useState(null);
	const location = useLocation();
	const navigate = useNavigate();
	const [tOpen, setTOpen] = useState(false);
	// const [tickets, setTickets] = useState(1);
	const [more, setMore] = useState([]);

	const [cookies] = useCookies(['user']);

	const init = useCallback(async (item) => {
		const res = await getMatches();
		if (res.data) {
			setMore(getMonthData(filterItem(res.data, item.id)));
		}
	}, []);

	useEffect(() => {
		const d = location.state;
		setInfo(d);

		init(d);
	}, [location.state, init]);

	const team = (lbl, left) => {
		if (left) {
			return (
				<div className="gs-f gs-f-left">
					<span className="gs-f-name">{lbl}</span>
					<img src={getImage(lbl)} alt="home" />
				</div>
			);
		} else {
			return (
				<div className="gs-f gs-f-right">
					<img src={getImage(lbl)} alt="away" />
					<span className="gs-f-name">{lbl}</span>
				</div>
			);
		}
	};

	const handlePayment = async () => {
		if (isLoggedIn(cookies)) {
			const res = await buyTicket(cookies.user[0].id, info.id);
			if (res.data) {
				alert('Ticket bought successfully');
				navigate('/home/mytickets');
			} else {
				alert('Ticket purchase failed');
			}
		} else {
			navigate('/login');
		}
	};

	return info ? (
		<Container>
			<div className="gs-type-stad">
				<span className="gs-type">{info.type_match}</span>
				<span className="dot"></span>
				<span className="gs-stadium">{stadium}</span>
			</div>
			<p className="gs-date">
				{moment(info.date).format('MMM DD YYYY').toLocaleUpperCase()}
			</p>

			<div className="gs-fixture">
				{team(info.home, true)}
				<div className="gs-time">
					<span className="gs-t-lbl">Kickoff</span>
					<span className="gs-t">{info.time}</span>
				</div>
				{team(info.away)}
			</div>

			<div className="gs-tickets">
				{!tOpen && (
					<AppBtn
						lbl={'BUY TICKET'}
						goldBtn
						onClick={() => setTOpen(true)}
					/>
				)}

				{tOpen && (
					<div className="gs-ticket-con">
						<p className="gs-total-title">Amount Payable</p>
						<p className="gs-total">KSh. {info.price}</p>
						{/* <p className="gs-total">KSh. {price * tickets}</p> */}

						{/* <NumberPicker
							value={tickets}
							onChange={(val) => setTickets(val)}
							step={1}
							min={1}
						/> */}

						<p className="gs-num">1 ticket</p>

						<AppBtn
							lbl={'PURCHASE'}
							goldBtn
							styles="btn"
							onClick={handlePayment}
						/>
					</div>
				)}
			</div>

			<div className="gs-more">
				{more.map((v, i) => (
					<>
						<GroupList month={`${v.month}`} list={v.data} />
						{i !== more.length - 1 && <Separator />}
					</>
				))}
			</div>
		</Container>
	) : (
		<div>loading...</div>
	);
};

const Container = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;

	.gs-type-stad {
		display: flex;
		align-items: center;
		font-size: 14px;
		.gs-type {
			font-weight: 600;
		}
		.gs-stadium {
			font-weight: 300;
		}

		.dot {
			width: 5px;
			height: 5px;
			background: black;
			border-radius: 5px;
			margin: 0 7px;
		}
	}

	.gs-date {
		font-size: 30px;
		font-weight: 700;
		font-style: italic;
		color: dodgerblue;
	}

	.gs-fixture {
		width: 100%;
		display: grid;
		grid-template-columns: 1fr 100px 1fr;
		grid-auto-rows: 160px;
		/* background: darkcyan; */
		@media (max-width: 750px) {
			grid-template-columns: 1fr 70px 1fr;
			grid-auto-rows: 140px;
		}

		img {
			height: 70px;
			width: 70px;
			@media (max-width: 750px) {
				height: 50px;
				width: 50px;
			}
		}
		.gs-f-name {
			font-size: 30px;
			font-weight: 600;
			padding: 10px;
			@media (max-width: 750px) {
				font-size: 25px;
			}
		}
		.gs-f {
			display: flex;
			align-items: center;
			width: 100%;
			padding: 10px;
			@media (max-width: 750px) {
				flex-direction: column;
				text-align: center;
			}
		}
		.gs-f-left {
			justify-content: end;
			@media (max-width: 750px) {
				flex-direction: column-reverse;
				justify-content: start;
			}
		}
		.gs-f-right {
			justify-content: start;
			@media (max-width: 750px) {
				justify-content: start;
			}
		}
		.gs-time {
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			opacity: 0.7;
			@media (max-width: 750px) {
				justify-content: start;
				margin-top: 25px;
			}
			.gs-t-lbl {
				color: dodgerblue;
				font-weight: 600;
				margin-bottom: -5px;
			}
			.gs-t {
				font-weight: 800;
				font-size: 30px;
			}
		}
	}
	.gs-tickets {
		.gs-ticket-con {
			min-width: 300px;
			padding: 15px 30px;
			border: 2px solid gold;
			border-radius: 10px;
			.gs-total-title {
				font-weight: 300;
			}
			.gs-total {
				font-weight: 600;
				margin-bottom: 15px;
				font-size: 23px;
			}
			.gs-num {
				font-size: 17px;
			}
		}
		.btn {
			margin-top: 15px;
		}
	}
	.gs-more {
		margin-top: 40px;
		.month {
			font-weight: 600;
			font-size: 20px;
			padding: 10px;
			color: dodgerblue;
		}
		width: 100%;
	}
`;

export default GameScreen;
