import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const AppBtn = ({ lbl, onClick, to = '#', styles = '', goldBtn }) => {
	let col = { background: 'gold', color: 'black' };

	return onClick ? (
		<Container
			onClick={onClick}
			className={`btn ${styles}`}
			style={goldBtn && col}>
			{lbl}
		</Container>
	) : (
		<Link to={to}>
			<Container className={`btn ${styles}`} style={goldBtn && col}>
				{lbl}
			</Container>
		</Link>
	);
};

const Container = styled.div`
	background: dodgerblue;
	color: white;
	padding: 5px 10px;
	border-radius: 6px;
	font-weight: 600;
	font-size: 14px;
	letter-spacing: 0.3px;
	box-shadow: 1px 3px 10px #e4e4e4;
	transition: all 0.2s linear;
	cursor: pointer;
	width: fit-content;
	margin: auto;

	&:hover {
		box-shadow: 1px 3px 10px #c0c0c0;
	}
`;

export default AppBtn;
