import { Divider } from 'antd';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import ContentWrapper from '../shared/components/ContentWrapper';

function BillingScreens() {
	const navigate = useNavigate();
	const payHandler = () => {
		navigate('/payment');
	};
	return (
		<ContentWrapper>
			<div className='w-[560px] h-[519px] text-[30px] border border-solid border-red rounded-[16px] bg-white boxShadow px-[112px] flex flex-col justify-between'>
				<div>
					<h2 className='text-[#1A1A1A] font-medium text-6 text-center mt-[68px]'>
						Make Payment
					</h2>
					<Divider className='mt-2 mb-[32px]' />

					<div className='flex justify-between items-center mb-1'>
						<p className='text-[#4D4D4D] font-normal text-[14px] '>
							UI Unicorn Store
						</p>
						<p className='text-[#4D4D4D] font-normal text-[14px] '>
							Order №070490
						</p>
					</div>
					<p className='text-[#1A1A1A] font-semibold text-[32px]'>₦10.00</p>

					<Divider className='mt-[100px]' />
				</div>
				<div className='pb-[110px]'>
					<button
						onClick={payHandler}
						className='w-full h-[44px] bg-[#3200C8] text-white font-semibold text-[16px] text-center rounded-[6px]'>
						Pay
					</button>
				</div>
			</div>
		</ContentWrapper>
	);
}

export default BillingScreens;
