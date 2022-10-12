import React from 'react';
import { Outlet } from 'react-router-dom';
import ContentWrapper from './ContentWrapper';
import Close from '../assets/socialmediaicons/Close button.svg';
// import Ussd from '..as'

function PaymentHeader() {

const Box = () => (
	<div className='w-[114px] h-[56px] rounded-[8px] border border-solid border-[#3200C8] bg-white'>
		<p></p>
		<img src="" alt="" />
	</div>
);


	return (
		<ContentWrapper>
			<div className='w-[594px] h-[790px] rounded-[18px] bg-white px-6 relative'>
				<h2 className='text-[#090921] font-semibold text-[24px] mt-[24px]'>
					Payment options
				</h2>
				<div className='absolute top-[12px] right-[12px]'>
					<img src={Close} alt='' />
				</div>

				<div className='flex justify-between items-center'>
					<div className='flex-1'></div>
					<div className='flex-1 flex items-center space-x-6'>
						<p className='text-[#6B7B8A] font-normal text-[18px]'>
							clooney@gmail.com
						</p>
						<p className='text-[#6B7B8A] font-normal text-[18px]'>
							Pay: <span className='text-[#087F7F] font-semibold'> ₦4,500</span>
						</p>
					</div>
				</div>

				<div className='w-full p-[24px] bg-[#FAFAFA] rounded-[8px] border border-solid border-[#E3E6EA] my-[16px]'></div>

				<Outlet />
			</div>
		</ContentWrapper>
	);
}

export default PaymentHeader;
