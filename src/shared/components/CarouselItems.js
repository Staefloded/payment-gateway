import React from 'react';
import { FaQuoteRight } from 'react-icons/fa';

function CarouselItems({ item }) {
	return (
		<>
			<div className='px-[62px] xl:px-5 pt-[24px]'>
				<div className='flex justify-start w-full'>
					<FaQuoteRight
						style={{ color: '#1E3892', width: '24px', height: '24px' }}
					/>
				</div>
				<div className='pl-[24px] my-[11px]'>
					<p className='w-[382px] text-[#1E3892] text-left font-prodisplay'>
						{item.comment}
					</p>
				</div>

				<div className='w-full flex justify-end'>
					<FaQuoteRight
						style={{ color: '#1E3892', width: '24px', height: '24px' }}
					/>
				</div>
			</div>
			<div className='px-[86px] text-left mt-[11px] '>
				<h3 className='text-[20px] text-[#1E3892] my-[4px] font-nunito font-extrabold'>
					{item.name}
				</h3>
				<p className='text-[16px] font-normal text-[#1E3892] font-nunito'>
					{item.title}
				</p>
			</div>
		</>
	);
}

export default CarouselItems;
