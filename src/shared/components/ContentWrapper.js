import React from 'react';

const ContentWrapper = ({ children }) => {
	return (
		<div className='h-screen w-full bg-[#F5F5F5] grid place-items-center'>
			{children}
		</div>
	);
};

export default ContentWrapper;
