import React from 'react';
import styled from 'styled-components';

import GameCard from './GameCard';

const GroupList = ({ month, list = [] }) => {
	return (
		<Container>
			<p className="month">{month}</p>
			<div className="gl-list">
				{list.map((v, i) => (
					<GameCard data={v} key={i} />
				))}
			</div>
		</Container>
	);
};

const Container = styled.div`
	.month {
		font-weight: 600;
		font-size: 20px;
		padding: 10px;
		color: dodgerblue;
	}
`;

export default GroupList;
