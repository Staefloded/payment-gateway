import { Divider } from 'antd';
import React from 'react';
import Copy from '../shared/assets/socialmediaicons/Copy.svg';
import { CopyToClipboard } from 'react-copy-to-clipboard';

function Transfer() {
	return (
		<div className=''>
			<h1 className='text-[#090921] font-medium text-[18px] mb-1'>
				Transfer NGN4,500
			</h1>
			<Divider className='m-0 p-0' />
			<div className='py-[24px] flex flex-col justify-center items-center w-full bg-white boxShadow rounded-[12px] mt-[48px]'>
				<h3 className='text-[#565C63] font-normal text-[16px] mb-2'>
					Account details
				</h3>
				<div className=' w-[280px]'>
					<Divider className='m-0 p-0' />
				</div>

				<h2 className='text-[#565C63] font-semibold text-[24px] mt-[24px]'>
					Guaranty Trust Bank
				</h2>
				<h2 className='text-[#565C63] font-semibold text-[24px] mt-4'>
					0431570067{' '}
					<span className='inline-block cursor-pointer'>
						<CopyToClipboard text='0431570067'>
							<img src={Copy} alt='' />
						</CopyToClipboard>
					</span>{' '}
				</h2>
				<p className='text-[#BBBBBB] font-normal text-[12px] mt-[24px]'>
					Use this account for this transaction only Account expires in 20
					minutes
				</p>
			</div>
			<div className='mt-[40px]'>
				<button className='w-full h-[60px] bg-[#131313] text-white font-semibold text-[16px] text-center rounded-[8px]'>
					I have completed the payment
				</button>
			</div>
		</div>
	);
}

export default Transfer;
