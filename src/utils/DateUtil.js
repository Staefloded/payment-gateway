import moment from 'moment';

export const now = new Date();
export const dateIT = moment().format('YYYY-MM-DD');
export const yesterday = moment().subtract(1, 'day').format('YYYY-MM-DD');
export const sevenDaysAgo = moment().subtract(7, 'day').format('YYYY-MM-DD');
export const thirtyDaysAgo = moment().subtract(30, 'day').format('YYYY-MM-DD');
export const startOfYear = moment().startOf('year').format('YYYY-MM-DD');
export const endOfYear = moment().endOf('year').format('YYYY-MM-DD');

export const convertedDate = (dateData = []) => {
	const data = dateData?.map((dat) => {
		let date;
		date = moment(dat._d).format('YYYY-MM-DD');
		return date;
	});

	return data;
};

export const convertTimeDate = (dateData) => {
	const dateTime = moment(dateData).format('h:mmA');
	const dateCalender = moment(dateData).format('MMM D, YYYY');

	return { dateTime, dateCalender };
};
