import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import { getMonthData } from '../apis/funcs';
import { getMatches } from '../apis/users';
import GroupList from '../components/GroupList';
import Separator from '../components/Separator';

const MainApp = () => {
	const [arr, setArr] = useState([]);

	const init = useCallback(async () => {
		const res = await getMatches();
		if (res.data) {
			setArr(getMonthData(res.data));
		}
	}, []);

	useEffect(() => {
		init();
	}, [init]);

	return (
		<Container>
			{arr.map((v, i) => (
				<>
					<GroupList month={v.month} list={v.data} />
					{i !== arr.length - 1 && <Separator />}
				</>
			))}
		</Container>
	);
};

const Container = styled.div`
	width: 100%;
`;

export default MainApp;
