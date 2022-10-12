import { useState } from 'react';
import { addDays } from 'date-fns';

function useCalender() {
	const [calender, setCalender] = useState([
		{
			startDate: new Date(),
			endDate: addDays(new Date(), 7),
			key: 'selection',
		},
	]);

	return {
		calender,
		setCalender,
	};
}

export default useCalender;
