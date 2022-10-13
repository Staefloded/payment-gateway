import React, { useState, useEffect } from 'react';
import { Divider } from 'antd';
import { encode } from '../utils';
import { useSelector } from 'react-redux';
import QRCode from 'react-qr-code';
import { useNavigate } from 'react-router-dom';

function QR() {
	const [qrString, setQrString] = useState('12345');
	const { accounts } = useSelector((state) => state.Wallet);
	const amount = localStorage.getItem('amount') || 0;
	const navigate = useNavigate();

	useEffect(() => {
		handleQR();
	}, []);

	const handleQR = () => {
		let encodedString = encode({
			accountNumber: accounts?.accountNumber || '1237465930',
			amount: amount,
			currency: 'NGN',
			narration: '',
			beneficiaryName: accounts?.accountName || 'John Smith Jnr',
		});
		setQrString(encodedString);
	};
	return (
		<div className='flex flex-col h-full'>
			<div>
				<h1 className='text-[#090921] font-medium text-[18px] mb-1'>QR Code</h1>
				<Divider className='m-0 p-0' />
			</div>

			<div className='flex flex-col items-center mt-[24px]'>
				<p className='text-[#565C63] font-normal text-[18px] mb-[16px]'>
					Scan QR code below in your bank app to complete this payment
				</p>
				<div className='p-[30px] boxShadow rounded-[8px]'>
					<QRCode value={qrString} />
				</div>
			</div>

			<div className='mt-[40px]'>
				<button
					onClick={() => navigate('/loading')}
					className='w-full h-[60px] bg-[#131313] text-white font-semibold text-[16px] text-center rounded-[8px]'>
					I have completed the payment
				</button>
			</div>
		</div>
	);
}

export default QR;
