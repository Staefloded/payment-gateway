import React from 'react';
import ContentWrapper from './ContentWrapper';
import Close from '../assets/socialmediaicons/Close button.svg';
import { ReactComponent as Ussd } from '../assets/socialmediaicons/ussd.svg';
import { ReactComponent as Transfer } from '../assets/socialmediaicons/Transfer.svg';
import { ReactComponent as Qr } from '../assets/socialmediaicons/Qr.svg';
import Lock from '../assets/socialmediaicons/Lock.svg';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

function PaymentHeader() {
	const location = useLocation();
	const paymentData = [
		{
			name: 'Transfer',
			icon: <Transfer />,
			path: '/payment',
		},
		{
			name: 'USSD',
			icon: <Ussd />,
			path: '/payment/ussd',
		},
		{
			name: 'QR Code',
			icon: <Qr />,
			path: '/qr',
		},
	];
	const Box = ({ items }) => (
		<NavLink
			to={items.path}
			className={({ isActive }) =>
				isActive && location.pathname === `${items.path}`
					? 'w-[114px] h-[56px] rounded-[8px] border border-solid border-[#3200C8] bg-white flex justify-between items-center px-[12px] text-[#3200C8]'
					: 'w-[114px] h-[56px] rounded-[8px] border border-solid border-[#E3E6EA] bg-white flex justify-between items-center px-[12px] text-[#565C63]'
			}>
			<p className=' font-normal '>{items.name}</p>
			<div>{items.icon}</div>
		</NavLink>
	);

	return (
		<ContentWrapper>
			<div className='w-[594px] h-[790px] rounded-[18px] bg-white px-6 relative flex flex-col justify-between'>
				<div>
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
								Pay:{' '}
								<span className='text-[#087F7F] font-semibold'> ₦4,500</span>
							</p>
						</div>
					</div>

					<div className='w-full p-[24px] bg-[#FAFAFA] rounded-[8px] border border-solid border-[#E3E6EA] my-[16px]'>
						<div className='flex  justify-center items-center space-x-12'>
							{paymentData.map((item, i) => (
								<Box key={i} items={item} />
							))}
						</div>
					</div>
				</div>
				<div className='flex-1'>
					<Outlet />
				</div>

				<div className='text-center flex items-center space-x-1 w-full justify-center mb-[12px]'>
					<p className='text-[#6B7B8A] font-normal text-[12px]'>
						Secured by{' '}
						<span className='text-[#3200C8] font-semibold'>Clane</span>{' '}
					</p>
					<div className='flex justify-center items-center'>
						<img src={Lock} alt='' />
					</div>
				</div>
			</div>
		</ContentWrapper>
	);
}

export default PaymentHeader;
