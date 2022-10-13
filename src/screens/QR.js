import React from 'react';
import { Divider } from 'antd';
import qry from '../shared/assets/socialmediaicons/qryy.svg';

function QR() {
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
					<img src={qry} alt='' />
				</div>
			</div>
		</div>
	);
}

export default QR;
