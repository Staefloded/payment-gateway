import React from 'react';
import ContentWrapper from '../shared/components/ContentWrapper';
import Close from '../shared/assets/socialmediaicons/Close button.svg';
import Lock from '../shared/assets/socialmediaicons/Lock.svg';
import SuccessImage from '../shared/assets/successsmall.svg';

function Success() {
	return (
		<ContentWrapper>
			<div className='w-[594px] h-[790px] rounded-[18px] bg-white px-6 relative flex flex-col justify-between'>
				<div className='absolute top-[12px] right-[12px]'>
					<img src={Close} alt='' />
				</div>
				<div className='flex-1 flex flex-col justify-between w-full'>
					<div className='mt-[150px] flex flex-col items-center'>
						<img src={SuccessImage} alt='' />
						<p className='text-[#090921] font-semibold text-[24px] mt-[32px]'>
							Your transfer of NGN 4,500 is successful!
						</p>
					</div>
					<div className='mb-[120px]'>
						<button className='w-full h-[60px] bg-[#131313] text-white font-semibold text-[16px] text-center rounded-[8px]'>
							Close
						</button>
					</div>
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

export default Success;
