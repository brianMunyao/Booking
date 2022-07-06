import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { getImage } from '../apis/funcs';
import AppBtn from './AppBtn';

const GameCard = ({ data }) => {
	const team = (lbl, left) => {
		if (left) {
			return (
				<div className="gc-f gc-f-left">
					<span className="gc-f-name">{lbl}</span>
					<img src={getImage(lbl)} alt="home" />
				</div>
			);
		} else {
			return (
				<div className="gc-f gc-f-right">
					<img src={getImage(lbl)} alt="away" />
					<span className="gc-f-name">{lbl}</span>
				</div>
			);
		}
	};

	return (
		<Link to={`/home/available/${data.id}`} state={data}>
			<Container>
				<div className="gc-date-time">
					<span className="gc-date">
						{moment(data.date)
							.format('MMM DD YYYY')
							.toLocaleUpperCase()}
					</span>
					<span className="gc-time">{data.time}</span>
				</div>
				<div className="gc-fixture">
					{team(data.home, true)}
					<span className="gc-vs">VS.</span>
					{team(data.away)}
				</div>
				<AppBtn
					lbl="GET TICKET"
					styles={'gc-book'}
					to={`/home/available/${data.id}`}
				/>
			</Container>
		</Link>
	);
};

const Container = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-top: 1px solid #e4e4e4;
	border-bottom: 1px solid #e4e4e4;
	margin: 0 10px;
	padding: 15px 10px;
	transition: all 0.2s linear;
	&:hover {
		background: #f3f3f3;
	}

	.gc-date-time {
		display: flex;
		flex-direction: column;
		.gc-date {
			font-weight: 600;
			font-size: 15px;
		}
		.gc-time {
			font-size: 14px;
			text-align: center;
			font-weight: 300;
		}
	}

	.gc-fixture {
		display: flex;
		align-items: center;

		.gc-f {
			display: flex;
			align-items: center;
		}
		.gc-f-name {
			padding: 0 10px;
			font-weight: 700;
		}
		.gc-vs {
			padding: 0 8px;
			font-weight: 700;
			font-size: 15px;
			opacity: 0.6;
		}
		img {
			width: 30px;
			height: 30px;
			/* background: crimson; */
		}
	}

	.gc-book {
		background: gold;
		color: black;
	}

	@media (max-width: 540px) {
		flex-direction: column;
		align-items: center;
		.gc-date-time {
			margin-bottom: 10px;
		}

		.gc-fixture {
			margin: 15px 0;
			display: grid;
			grid-template-columns: 1fr 40px 1fr;
			gap: 10px;
			.gc-f-right {
				justify-content: start;
			}
			.gc-f-left {
				justify-content: end;
			}
			.gc-vs {
				text-align: center;
			}
		}

		.gc-book {
			margin-top: 15px;
		}
	}
`;

export default GameCard;
