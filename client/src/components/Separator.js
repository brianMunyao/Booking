import React from 'react';
import styled from 'styled-components';

const Separator = () => {
	return <Con></Con>;
};

const Con = styled.div`
	background-image: linear-gradient(10deg, blue, red);
	opacity: 0.7;
	margin: 15px 10px;
	height: 5px;
`;
export default Separator;
