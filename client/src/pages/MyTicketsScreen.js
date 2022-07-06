import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';

import { getImage } from '../apis/funcs';
import { getMyTickets } from '../apis/users';
import { useCookies } from 'react-cookie';

const MyTicketsScreen = () => {
	const [list, setList] = useState([]);
	const [cookies] = useCookies(['user']);

	const init = useCallback(async () => {
		const res = await getMyTickets(cookies.user[0].id);
		if (res.data) {
			setList(res.data);
		}
	}, [cookies.user]);

	useEffect(() => {
		init();
	}, [init]);

	const team = (lbl) => {
		return (
			<div className="ts-f">
				<img src={getImage(lbl)} alt="logo" />
				<span className="ts-f-name">{lbl}</span>
			</div>
		);
	};

	return (
		<Container>
			<h2>Tickets Bought</h2>
			{list.length > 0 ? (
				<div className="ts-tickets-list">
					{list.map((val, i) => (
						<div className="ts-con" key={i}>
							<div className="ts-date-time">
								<p className="ts-time">{val.time}</p>
								<p className="ts-date">
									{moment(val.date).format('Do MMM YYYY')}
								</p>
							</div>

							<div className="ts-sep"></div>

							<div className="ts-teams">
								{team(val.home)}
								<span className="ts-vs">VS.</span>
								{team(val.away)}
							</div>

							<div className="ts-amt">
								<p className="ts-price-lbl">Amount Paid</p>
								<p className="ts-price">Ksh. {val.price}</p>
							</div>
						</div>
					))}
				</div>
			) : (
				<div className="empty">No bought tickets</div>
			)}
		</Container>
	);
};

const Container = styled.div`
	padding: 10px 20px;
	h2 {
		padding: 0 5px 10px;
		opacity: 0.7;
	}

	.ts-tickets-list {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		gap: 20px;
		.ts-con {
			background: white;
			border-radius: 10px;
			box-shadow: 2px 1px 10px #e3e3e3;
			overflow: hidden;
			display: flex;
			align-items: center;
			flex-direction: column;
			.ts-date-time {
				text-align: center;
				background: #f1f1f1;
				width: 100%;
				padding: 10px;
				border-bottom: 2px solid #e6e6e6;

				.ts-time {
					font-weight: 300;
				}
				.ts-date {
					font-weight: 600;
					color: dodgerblue;
				}
			}
			.ts-teams {
				padding: 8px 0;
				display: flex;
				align-items: center;
				flex-direction: column;
				img {
					height: 30px;
					width: 30px;
				}
				.ts-f-name {
					/* font-size: 30px; */
					font-weight: 600;
					padding: 8px;
					text-align: center;
				}
				.ts-f {
					display: flex;
					align-items: center;
					flex-direction: column;
					width: 100%;
					padding: 10px;
				}
				.ts-vs {
					font-weight: 600;
					opacity: 0.6;
					padding: 10px 0;
				}
			}

			.ts-amt {
				text-align: center;
				padding: 10px;

				.ts-price-lbl {
					font-weight: 400;
					font-size: 14px;
					/* margin: 10px 0 -5px; */
					opacity: 0.6;
				}
				.ts-price {
					font-weight: 700;
					font-size: 20px;
				}
			}
		}
	}
	.empty {
		display: flex;
		min-height: 100px;
		align-items: center;
		justify-content: center;
		font-weight: 600;
		opacity: 0.5;
	}
`;

export default MyTicketsScreen;
