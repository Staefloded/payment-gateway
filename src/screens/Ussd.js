import { Divider, Select } from 'antd';
import React from 'react';
const { Option } = Select;

function Ussd() {
	const banks = [
		{
			name: 'Access bank',
			code: '019010',
		},
		{
			name: 'Wema bank',
			code: '019010',
		},
		{
			name: 'Access bank',
			code: '019010',
		},
		{
			name: 'Access bank',
			code: '019010',
		},
		{
			name: 'Access bank',
			code: '019010',
		},
	];

	return (
		<div className='flex flex-col justify-between h-full'>
			<div>
				<h1 className='text-[#090921] font-medium text-[18px] mb-1'>
					USSD transfer *#
				</h1>
				<Divider className='m-0 p-0' />

				<div className='flex items-center space-x-8 mt-[26px]'>
					<div>
						<p className='text-[#6B7B8A] font-medium text-[16px]'>
							Choose bank
						</p>
						<p className='text-[#6B7B8A] font-normal text-[12px]'>
							To start the payment
						</p>
					</div>
					<div className='flex-1 w-full'>
						<Select
							showSearch
							placeholder='Choose Bank'
							// onChange={bankHandleChange}
							className='sel'
							listItemHeight={10}
							listHeight={250}
							style={{
								width: '100%',
							}}>
							{banks.map((item) => (
								<Option key={item.code} value={item.code}>
									<div className='flex justify-between items-center'>
										<p className='text-[#6B7B8A] font-normal text-[16px]'>
											{item.name}
										</p>
										<span className='text-[#565C63] font-normal text-[16px] py-2 px-[13px] bg-[#F7F7F7] rounded-[8px]'>
											{item.code}
										</span>
									</div>
								</Option>
							))}
						</Select>
					</div>
				</div>
			</div>

			<div className='mb-[107px]'>
				<button className='w-full h-[60px] bg-[#131313] text-white font-semibold text-[16px] text-center rounded-[8px]'>
					I have completed the payment
				</button>
			</div>
		</div>
	);
}

export default Ussd;
